import 'server-only';

import { cache } from 'react';

import { prisma } from '@/lib/prisma';


function decimalToNumber(
  value: { toString(): string } | null | undefined
) {
  if (value === null || value === undefined) {
    return 0;
  }

  const number = Number(value.toString());

  return Number.isFinite(number) ? number : 0;
}


const nonBillableInvoiceStatuses: string[] = [
  'DRAFT',
  'VOID',
  'CANCELLED',
];

const closedInvoiceStatuses: string[] = [
  'PAID',
  'VOID',
  'CANCELLED',
  'REFUNDED',
];

const activeSubscriptionStatuses: string[] = [
  'TRIALING',
  'ACTIVE',
  'PAST_DUE',
];


type NextPayment = {
  type: 'INVOICE' | 'SUBSCRIPTION';
  id: string;
  label: string;
  amount: number;
  currency: string;
  dueAt: Date | null;
} | null;


export const getClientBilling = cache(async (userId: string) => {
  const now = new Date();

  const [invoices, recentPayments, subscriptions] = await Promise.all([
    prisma.invoice.findMany({
      where: {
        clientId: userId,

        status: {
          not: 'DRAFT',
        },
      },

      orderBy: [
        {
          issuedAt: 'desc',
        },
        {
          createdAt: 'desc',
        },
      ],

      select: {
        id: true,
        invoiceNumber: true,
        sourceType: true,
        status: true,
        currency: true,
        subtotal: true,
        discount: true,
        tax: true,
        total: true,
        amountPaid: true,
        balanceDue: true,
        issuedAt: true,
        dueAt: true,
        paidAt: true,
        pdfUrl: true,
        createdAt: true,
        updatedAt: true,

        items: {
          orderBy: {
            createdAt: 'asc',
          },

          take: 3,

          select: {
            id: true,
            type: true,
            name: true,
            description: true,
            quantity: true,
            unitPrice: true,
            total: true,
          },
        },

        order: {
          select: {
            id: true,
            orderNumber: true,
          },
        },

        quote: {
          select: {
            id: true,
            quoteNumber: true,
          },
        },

        subscription: {
          select: {
            id: true,
            subscriptionNumber: true,

            plan: {
              select: {
                id: true,
                name: true,
              },
            },
          },
        },

        project: {
          select: {
            id: true,
            name: true,
            slug: true,
          },
        },

        serviceRequest: {
          select: {
            id: true,
            title: true,
          },
        },

        _count: {
          select: {
            items: true,
            payments: true,
          },
        },
      },
    }),

    prisma.payment.findMany({
      where: {
        invoice: {
          clientId: userId,
        },
      },

      orderBy: [
        {
          paidAt: 'desc',
        },
        {
          createdAt: 'desc',
        },
      ],

      take: 12,

      select: {
        id: true,
        amount: true,
        currency: true,
        method: true,
        provider: true,
        providerName: true,
        status: true,
        reference: true,
        providerReference: true,
        fee: true,
        netAmount: true,
        initiatedAt: true,
        paidAt: true,
        failedAt: true,
        createdAt: true,

        invoice: {
          select: {
            id: true,
            invoiceNumber: true,
          },
        },
      },
    }),

    prisma.clientSubscription.findMany({
      where: {
        clientId: userId,
      },

      orderBy: [
        {
          nextBillingAt: 'asc',
        },
        {
          createdAt: 'desc',
        },
      ],

      select: {
        id: true,
        subscriptionNumber: true,
        status: true,
        priceAmount: true,
        currency: true,
        intervalUnit: true,
        intervalCount: true,
        setupFee: true,
        autoRenew: true,
        cancelAtPeriodEnd: true,
        currentPeriodStart: true,
        currentPeriodEnd: true,
        nextBillingAt: true,
        trialEndsAt: true,
        startedAt: true,
        createdAt: true,

        plan: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    }),
  ]);


  const resolvedInvoices = invoices.map((invoice) => {
    const subtotal = decimalToNumber(invoice.subtotal);
    const discount = decimalToNumber(invoice.discount);
    const tax = decimalToNumber(invoice.tax);
    const total = decimalToNumber(invoice.total);
    const amountPaid = decimalToNumber(invoice.amountPaid);
    const balanceDue = decimalToNumber(invoice.balanceDue);

    const isClosed = closedInvoiceStatuses.includes(invoice.status);

    const isOverdue =
      !isClosed &&
      balanceDue > 0 &&
      invoice.dueAt !== null &&
      invoice.dueAt < now;

    const effectiveStatus = isOverdue ? 'OVERDUE' : invoice.status;

    let sourceId: string | null = null;
    let sourceLabel = 'Manual invoice';
    let sourceReference: string | null = null;


    switch (invoice.sourceType) {
      case 'ORDER':
        sourceId = invoice.order?.id ?? null;
        sourceLabel = 'Product order';
        sourceReference = invoice.order?.orderNumber ?? null;
        break;

      case 'QUOTE':
        sourceId = invoice.quote?.id ?? null;
        sourceLabel = 'Accepted quote';
        sourceReference = invoice.quote?.quoteNumber ?? null;
        break;

      case 'SUBSCRIPTION':
        sourceId = invoice.subscription?.id ?? null;
        sourceLabel = invoice.subscription?.plan.name ?? 'Subscription';
        sourceReference = invoice.subscription?.subscriptionNumber ?? null;
        break;

      case 'PROJECT':
        sourceId = invoice.project?.id ?? null;
        sourceLabel = invoice.project?.name ?? 'Project';
        sourceReference = invoice.project?.slug ?? null;
        break;

      case 'SERVICE_REQUEST':
        sourceId = invoice.serviceRequest?.id ?? null;
        sourceLabel = invoice.serviceRequest?.title ?? 'Service request';
        break;

      case 'MANUAL':
        break;
    }


    const itemPreview = invoice.items.map((item) => {
      return {
        id: item.id,
        type: item.type,
        name: item.name,
        description: item.description,
        quantity: decimalToNumber(item.quantity),
        unitPrice: decimalToNumber(item.unitPrice),
        total: decimalToNumber(item.total),
      };
    });


    const hiddenItemCount = Math.max(
      invoice._count.items - itemPreview.length,
      0
    );


    return {
      id: invoice.id,
      invoiceNumber: invoice.invoiceNumber,

      source: {
        type: invoice.sourceType,
        id: sourceId,
        label: sourceLabel,
        reference: sourceReference,
      },

      status: invoice.status,
      effectiveStatus,

      currency: invoice.currency,
      subtotal,
      discount,
      tax,
      total,
      amountPaid,
      balanceDue,

      items: itemPreview,
      itemCount: invoice._count.items,
      hiddenItemCount,
      paymentCount: invoice._count.payments,

      issuedAt: invoice.issuedAt,
      dueAt: invoice.dueAt,
      paidAt: invoice.paidAt,
      pdfUrl: invoice.pdfUrl,
      createdAt: invoice.createdAt,
      updatedAt: invoice.updatedAt,
    };
  });


  const resolvedPayments = recentPayments.map((payment) => {
    return {
      id: payment.id,

      invoice: {
        id: payment.invoice.id,
        invoiceNumber: payment.invoice.invoiceNumber,
      },

      amount: decimalToNumber(payment.amount),
      currency: payment.currency,
      method: payment.method,
      provider: payment.provider,
      providerName: payment.providerName,
      status: payment.status,
      reference: payment.reference,
      providerReference: payment.providerReference,

      fee:
        payment.fee === null
          ? null
          : decimalToNumber(payment.fee),

      netAmount:
        payment.netAmount === null
          ? null
          : decimalToNumber(payment.netAmount),

      initiatedAt: payment.initiatedAt,
      paidAt: payment.paidAt,
      failedAt: payment.failedAt,
      createdAt: payment.createdAt,
    };
  });


  const resolvedSubscriptions = subscriptions.map((subscription) => {
    return {
      id: subscription.id,
      subscriptionNumber: subscription.subscriptionNumber,
      status: subscription.status,

      plan: {
        id: subscription.plan.id,
        name: subscription.plan.name,
      },

      priceAmount: decimalToNumber(subscription.priceAmount),
      setupFee: decimalToNumber(subscription.setupFee),
      currency: subscription.currency,

      interval: {
        unit: subscription.intervalUnit,
        count: subscription.intervalCount,
      },

      autoRenew: subscription.autoRenew,
      cancelAtPeriodEnd: subscription.cancelAtPeriodEnd,
      currentPeriodStart: subscription.currentPeriodStart,
      currentPeriodEnd: subscription.currentPeriodEnd,
      nextBillingAt: subscription.nextBillingAt,
      trialEndsAt: subscription.trialEndsAt,
      startedAt: subscription.startedAt,
      createdAt: subscription.createdAt,
    };
  });


  const currencySummaryMap = new Map<
    string,
    {
      currency: string;
      billed: number;
      paid: number;
      outstanding: number;
      overdue: number;
      invoiceCount: number;
      openInvoiceCount: number;
      overdueInvoiceCount: number;
      paidInvoiceCount: number;
    }
  >();


  for (const invoice of resolvedInvoices) {
    const existingSummary = currencySummaryMap.get(invoice.currency);

    const summary = existingSummary ?? {
      currency: invoice.currency,
      billed: 0,
      paid: 0,
      outstanding: 0,
      overdue: 0,
      invoiceCount: 0,
      openInvoiceCount: 0,
      overdueInvoiceCount: 0,
      paidInvoiceCount: 0,
    };

    summary.invoiceCount += 1;

    const isBillable = !nonBillableInvoiceStatuses.includes(invoice.status);

    if (isBillable) {
      summary.billed += invoice.total;
      summary.paid += invoice.amountPaid;
    }


    const hasOutstandingBalance =
      invoice.balanceDue > 0 &&
      !closedInvoiceStatuses.includes(invoice.status);

    if (hasOutstandingBalance) {
      summary.outstanding += invoice.balanceDue;
      summary.openInvoiceCount += 1;
    }


    if (invoice.effectiveStatus === 'OVERDUE') {
      summary.overdue += invoice.balanceDue;
      summary.overdueInvoiceCount += 1;
    }


    if (invoice.status === 'PAID') {
      summary.paidInvoiceCount += 1;
    }

    currencySummaryMap.set(invoice.currency, summary);
  }


  const totalsByCurrency = Array.from(currencySummaryMap.values());


  const primaryCurrency =
    resolvedInvoices[0]?.currency ??
    resolvedSubscriptions[0]?.currency ??
    'NGN';


  const existingPrimarySummary = totalsByCurrency.find((summary) => {
    return summary.currency === primaryCurrency;
  });


  const primarySummary = existingPrimarySummary ?? {
    currency: primaryCurrency,
    billed: 0,
    paid: 0,
    outstanding: 0,
    overdue: 0,
    invoiceCount: 0,
    openInvoiceCount: 0,
    overdueInvoiceCount: 0,
    paidInvoiceCount: 0,
  };


  const activeSubscriptionCount = resolvedSubscriptions.filter(
    (subscription) => {
      return activeSubscriptionStatuses.includes(subscription.status);
    }
  ).length;


  const payableInvoices = resolvedInvoices.filter((invoice) => {
    const hasBalance = invoice.balanceDue > 0;
    const isClosed = closedInvoiceStatuses.includes(invoice.status);
    const hasDueDate = invoice.dueAt !== null;

    return hasBalance && !isClosed && hasDueDate;
  });


  payableInvoices.sort((firstInvoice, secondInvoice) => {
    if (!firstInvoice.dueAt || !secondInvoice.dueAt) {
      return 0;
    }

    return firstInvoice.dueAt.getTime() - secondInvoice.dueAt.getTime();
  });


  const nextInvoicePayment = payableInvoices[0] ?? null;


  const billableSubscriptions = resolvedSubscriptions.filter(
    (subscription) => {
      const isActive = activeSubscriptionStatuses.includes(
        subscription.status
      );

      const hasBillingDate = subscription.nextBillingAt !== null;

      return isActive && hasBillingDate;
    }
  );


  billableSubscriptions.sort((firstSubscription, secondSubscription) => {
    if (!firstSubscription.nextBillingAt || !secondSubscription.nextBillingAt) {
      return 0;
    }

    return (
      firstSubscription.nextBillingAt.getTime() -
      secondSubscription.nextBillingAt.getTime()
    );
  });


  const nextSubscriptionPayment = billableSubscriptions[0] ?? null;

  let nextPayment: NextPayment = null;


  if (nextInvoicePayment) {
    nextPayment = {
      type: 'INVOICE',
      id: nextInvoicePayment.id,
      label: nextInvoicePayment.invoiceNumber,
      amount: nextInvoicePayment.balanceDue,
      currency: nextInvoicePayment.currency,
      dueAt: nextInvoicePayment.dueAt,
    };
  } else if (nextSubscriptionPayment) {
    nextPayment = {
      type: 'SUBSCRIPTION',
      id: nextSubscriptionPayment.id,
      label: nextSubscriptionPayment.plan.name,
      amount: nextSubscriptionPayment.priceAmount,
      currency: nextSubscriptionPayment.currency,
      dueAt: nextSubscriptionPayment.nextBillingAt,
    };
  }


  return {
    generatedAt: now,
    primaryCurrency,

    summary: {
      ...primarySummary,
      activeSubscriptionCount,
    },

    totalsByCurrency,
    nextPayment,
    invoices: resolvedInvoices,
    recentPayments: resolvedPayments,
    subscriptions: resolvedSubscriptions,
  };
});


export type ClientBillingData = Awaited<
  ReturnType<typeof getClientBilling>
>;