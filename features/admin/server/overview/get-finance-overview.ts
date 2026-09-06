import 'server-only';

import { cache } from 'react';

import { prisma } from '@/lib/prisma';

const receivableInvoiceStatuses = [
  'ISSUED',
  'PARTIALLY_PAID',
  'OVERDUE'
] as const;

const trackedSubscriptionStatuses = [
  'PENDING',
  'TRIALING',
  'ACTIVE',
  'PAST_DUE',
  'PAUSED'
] as const;

function decimalToNumber(
  value:
    | { toString(): string }
    | null
    | undefined
) {
  if (value === null || value === undefined) {
    return 0;
  }

  const numericValue = Number(
    value.toString()
  );

  return Number.isFinite(numericValue)
    ? numericValue
    : 0;
}

export const getFinanceOverview = cache(
  async () => {
    const now = new Date();

    const monthStart = new Date(
      now.getFullYear(),
      now.getMonth(),
      1
    );

    const [
      successfulPayments,
      recentPayments,
      receivableInvoices,
      subscriptions
    ] = await Promise.all([
      prisma.payment.findMany({
        where: {
          status: 'SUCCESS',
          paidAt: {
            gte: monthStart
          }
        },

        select: {
          amount: true,
          fee: true,
          netAmount: true,
          currency: true
        }
      }),

      prisma.payment.findMany({
        orderBy: {
          createdAt: 'desc'
        },

        take: 10,

        select: {
          id: true,
          amount: true,
          currency: true,
          fee: true,
          netAmount: true,
          method: true,
          provider: true,
          status: true,
          paidAt: true,
          createdAt: true,

          payer: {
            select: {
              id: true,
              name: true,
              email: true,
              image: true,

              clientProfile: {
                select: {
                  companyName: true,
                  companyLogo: true
                }
              }
            }
          },

          invoice: {
            select: {
              id: true,
              invoiceNumber: true
            }
          }
        }
      }),

      prisma.invoice.findMany({
        where: {
          status: {
            in: [
              ...receivableInvoiceStatuses
            ]
          },
          balanceDue: {
            gt: 0
          }
        },

        orderBy: [
          {
            dueAt: 'asc'
          },
          {
            createdAt: 'desc'
          }
        ],

        take: 12,

        select: {
          id: true,
          invoiceNumber: true,
          status: true,
          currency: true,
          total: true,
          amountPaid: true,
          balanceDue: true,
          dueAt: true,
          issuedAt: true,
          createdAt: true,

          client: {
            select: {
              id: true,
              name: true,
              email: true,
              image: true,

              clientProfile: {
                select: {
                  companyName: true,
                  companyLogo: true
                }
              }
            }
          }
        }
      }),

      prisma.clientSubscription.findMany({
        where: {
          status: {
            in: [
              ...trackedSubscriptionStatuses
            ]
          }
        },

        orderBy: [
          {
            nextBillingAt: 'asc'
          },
          {
            createdAt: 'desc'
          }
        ],

        take: 12,

        select: {
          id: true,
          subscriptionNumber: true,
          status: true,
          priceAmount: true,
          currency: true,
          intervalUnit: true,
          intervalCount: true,
          autoRenew: true,
          cancelAtPeriodEnd: true,
          currentPeriodEnd: true,
          nextBillingAt: true,
          trialEndsAt: true,

          client: {
            select: {
              id: true,
              name: true,
              email: true,
              image: true,

              clientProfile: {
                select: {
                  companyName: true,
                  companyLogo: true
                }
              }
            }
          },

          plan: {
            select: {
              id: true,
              name: true
            }
          }
        }
      })
    ]);

    let grossRevenue = 0;
    let netRevenue = 0;
    let feesDeducted = 0;

    for (const payment of successfulPayments) {
      const amount =
        decimalToNumber(payment.amount);

      const fee =
        decimalToNumber(payment.fee);

      const storedNetAmount =
        payment.netAmount
          ? decimalToNumber(
              payment.netAmount
            )
          : amount - fee;

      grossRevenue += amount;
      feesDeducted += fee;
      netRevenue += storedNetAmount;
    }

    let outstandingAmount = 0;
    let overdueAmount = 0;

    for (const invoice of receivableInvoices) {
      const balance =
        decimalToNumber(
          invoice.balanceDue
        );

      outstandingAmount += balance;

      const isOverdue =
        invoice.status === 'OVERDUE' ||
        (invoice.dueAt !== null &&
          invoice.dueAt < now);

      if (isOverdue) {
        overdueAmount += balance;
      }
    }

    const subscriptionSummary = {
      total: subscriptions.length,
      pending: 0,
      trialing: 0,
      active: 0,
      pastDue: 0,
      paused: 0
    };

    for (const subscription of subscriptions) {
      switch (subscription.status) {
        case 'PENDING':
          subscriptionSummary.pending += 1;
          break;

        case 'TRIALING':
          subscriptionSummary.trialing += 1;
          break;

        case 'ACTIVE':
          subscriptionSummary.active += 1;
          break;

        case 'PAST_DUE':
          subscriptionSummary.pastDue += 1;
          break;

        case 'PAUSED':
          subscriptionSummary.paused += 1;
          break;
      }
    }

    const paymentSummary = {
      total: recentPayments.length,
      successful: 0,
      pending: 0,
      failed: 0,
      processing: 0
    };

    for (const payment of recentPayments) {
      switch (payment.status) {
        case 'SUCCESS':
          paymentSummary.successful += 1;
          break;

        case 'PENDING':
          paymentSummary.pending += 1;
          break;

        case 'FAILED':
          paymentSummary.failed += 1;
          break;

        case 'PROCESSING':
        case 'REQUIRES_ACTION':
          paymentSummary.processing += 1;
          break;
      }
    }

    return {
      currency:
        successfulPayments[0]?.currency ??
        receivableInvoices[0]?.currency ??
        subscriptions[0]?.currency ??
        'NGN',

      summary: {
        grossRevenue,
        netRevenue,
        feesDeducted,
        outstandingAmount,
        overdueAmount,
        outstandingInvoices:
          receivableInvoices.length
      },

      paymentSummary,
      subscriptionSummary,

      payments: recentPayments.map(
        payment => ({
          id: payment.id,
          invoiceId:
            payment.invoice.id,
          invoiceNumber:
            payment.invoice.invoiceNumber,

          amount: decimalToNumber(
            payment.amount
          ),

          fee: decimalToNumber(
            payment.fee
          ),

          netAmount:
            payment.netAmount !== null
              ? decimalToNumber(
                  payment.netAmount
                )
              : null,

          currency: payment.currency,
          method: payment.method,
          provider: payment.provider,
          status: payment.status,
          paidAt: payment.paidAt,
          createdAt: payment.createdAt,

          payer: payment.payer
            ? {
                id: payment.payer.id,
                name: payment.payer.name,
                email:
                  payment.payer.email,
                image:
                  payment.payer
                    .clientProfile
                    ?.companyLogo ??
                  payment.payer.image,

                displayName:
                  payment.payer
                    .clientProfile
                    ?.companyName ??
                  payment.payer.name
              }
            : null
        })
      ),

      receivables:
        receivableInvoices.map(
          invoice => ({
            id: invoice.id,
            invoiceNumber:
              invoice.invoiceNumber,
            status: invoice.status,
            currency: invoice.currency,

            total: decimalToNumber(
              invoice.total
            ),

            amountPaid:
              decimalToNumber(
                invoice.amountPaid
              ),

            balanceDue:
              decimalToNumber(
                invoice.balanceDue
              ),

            dueAt: invoice.dueAt,
            issuedAt: invoice.issuedAt,
            createdAt: invoice.createdAt,

            isOverdue:
              invoice.status ===
                'OVERDUE' ||
              (invoice.dueAt !== null &&
                invoice.dueAt < now),

            client: invoice.client
              ? {
                  id: invoice.client.id,
                  name:
                    invoice.client.name,
                  email:
                    invoice.client.email,

                  image:
                    invoice.client
                      .clientProfile
                      ?.companyLogo ??
                    invoice.client.image,

                  displayName:
                    invoice.client
                      .clientProfile
                      ?.companyName ??
                    invoice.client.name
                }
              : null
          })
        ),

      subscriptions:
        subscriptions.map(
          subscription => ({
            id: subscription.id,

            subscriptionNumber:
              subscription.subscriptionNumber,

            status:
              subscription.status,

            amount: decimalToNumber(
              subscription.priceAmount
            ),

            currency:
              subscription.currency,

            intervalUnit:
              subscription.intervalUnit,

            intervalCount:
              subscription.intervalCount,

            autoRenew:
              subscription.autoRenew,

            cancelAtPeriodEnd:
              subscription.cancelAtPeriodEnd,

            currentPeriodEnd:
              subscription.currentPeriodEnd,

            nextBillingAt:
              subscription.nextBillingAt,

            trialEndsAt:
              subscription.trialEndsAt,

            plan: {
              id: subscription.plan.id,
              name:
                subscription.plan.name
            },

            client: {
              id: subscription.client.id,
              name:
                subscription.client.name,
              email:
                subscription.client.email,

              image:
                subscription.client
                  .clientProfile
                  ?.companyLogo ??
                subscription.client.image,

              displayName:
                subscription.client
                  .clientProfile
                  ?.companyName ??
                subscription.client.name
            }
          })
        )
    };
  }
);

export type FinanceOverview =
  Awaited<
    ReturnType<
      typeof getFinanceOverview
    >
  >;

export type FinanceReceivable =
  FinanceOverview['receivables'][number];

export type FinancePayment =
  FinanceOverview['payments'][number];

export type FinanceSubscription =
  FinanceOverview['subscriptions'][number];