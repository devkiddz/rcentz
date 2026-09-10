import 'server-only';

import { cache } from 'react';

import { prisma } from '@/lib/prisma';

import { parseInvoiceApprovalSnapshot } from '@/features/billing/server/invoice-approval-snapshot';
import { parseInvoiceRevisionItems } from '@/features/billing/server/invoice-revision-snapshot';

function decimalToNumber(
  value: { toString(): string } | null | undefined
) {
  if (value === null || value === undefined) {
    return 0;
  }

  const number = Number(value.toString());
  return Number.isFinite(number) ? number : 0;
}

function formatAddress(value: unknown) {
  if (!value) {
    return null;
  }

  if (typeof value === 'string') {
    return value.trim() || null;
  }

  if (
    Array.isArray(value) ||
    typeof value !== 'object'
  ) {
    return null;
  }

  const address =
    value as Record<string, unknown>;

  const parts = [
    address.address,
    address.line1,
    address.line2,
    address.address1,
    address.address2,
    address.street,
    address.city,
    address.state,
    address.postalCode,
    address.zip,
    address.country,
  ];

  const cleanParts = parts.filter((part) => {
    return (
      typeof part === 'string' &&
      part.trim().length > 0
    );
  });

  return cleanParts.length > 0
    ? cleanParts.join(', ')
    : null;
}

const closedInvoiceStatuses = [
  'PAID',
  'VOID',
  'CANCELLED',
  'REFUNDED',
];

const payableStatuses = [
  'ISSUED',
  'PARTIALLY_PAID',
  'OVERDUE',
];

export const getClientInvoice = cache(
  async (
    userId: string,
    invoiceId: string
  ) => {
    const invoice =
      await prisma.invoice.findFirst({
        where: {
          id: invoiceId,
          clientId: userId,

          status: {
            not: 'DRAFT',
          },
        },

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

          customerName: true,
          customerEmail: true,
          customerPhone: true,
          billingAddress: true,

          notes: true,
          pdfUrl: true,

          issuedAt: true,
          dueAt: true,
          paidAt: true,
          createdAt: true,
          updatedAt: true,

          items: {
            orderBy: {
              createdAt: 'asc',
            },

            select: {
              id: true,
              type: true,
              name: true,
              description: true,
              quantity: true,
              unitPrice: true,
              total: true,
              serviceId: true,

              service: {
                select: {
                  id: true,
                  name: true,
                  slug: true,
                },
              },
            },
          },

          approvals: {
            where: {
              entityType: 'INVOICE',
            },

            orderBy: {
              version: 'desc',
            },

            select: {
              id: true,
              version: true,
              status: true,

              title: true,
              summary: true,
              snapshot: true,
              response: true,

              requestedAt: true,
              respondedAt: true,
              cancelledAt: true,
              createdAt: true,

              requestedBy: {
                select: {
                  id: true,
                  name: true,
                },
              },

              respondedBy: {
                select: {
                  id: true,
                  name: true,
                },
              },
            },
          },

          payments: {
            orderBy: [
              {
                paidAt: 'desc',
              },
              {
                createdAt: 'desc',
              },
            ],

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
            },
          },

          revisions: {
            orderBy: {
              revisionNumber: 'desc',
            },

            select: {
              id: true,
              revisionNumber: true,
              status: true,

              title: true,
              explanation: true,
              clientResponse: true,

              previousCurrency: true,
              proposedCurrency: true,

              previousSubtotal: true,
              proposedSubtotal: true,
              previousDiscount: true,
              proposedDiscount: true,
              previousTax: true,
              proposedTax: true,
              previousTotal: true,
              proposedTotal: true,

              amountPaidAtProposal: true,

              previousBalanceDue: true,
              proposedBalanceDue: true,

              previousDueAt: true,
              proposedDueAt: true,

              previousItems: true,
              proposedItems: true,

              createdAt: true,
              acceptedAt: true,
              rejectedAt: true,
              cancelledAt: true,

              proposedBy: {
                select: {
                  name: true,
                },
              },
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
        },
      });

    if (!invoice) {
      return null;
    }

    const subtotal =
      decimalToNumber(invoice.subtotal);

    const discount =
      decimalToNumber(invoice.discount);

    const tax =
      decimalToNumber(invoice.tax);

    const total =
      decimalToNumber(invoice.total);

    const amountPaid =
      decimalToNumber(invoice.amountPaid);

    const balanceDue =
      decimalToNumber(invoice.balanceDue);

    const now = new Date();

    const isClosed =
      closedInvoiceStatuses.includes(
        invoice.status
      );

    const isOverdue =
      !isClosed &&
      balanceDue > 0 &&
      invoice.dueAt !== null &&
      invoice.dueAt < now;

    const effectiveStatus =
      isOverdue
        ? 'OVERDUE'
        : invoice.status;

    let sourceId: string | null = null;
    let sourceLabel = 'Manual invoice';
    let sourceReference:
      | string
      | null = null;

    switch (invoice.sourceType) {
      case 'ORDER':
        sourceId =
          invoice.order?.id ?? null;

        sourceLabel =
          'Product order';

        sourceReference =
          invoice.order
            ?.orderNumber ?? null;
        break;

      case 'QUOTE':
        sourceId =
          invoice.quote?.id ?? null;

        sourceLabel =
          'Accepted quote';

        sourceReference =
          invoice.quote
            ?.quoteNumber ?? null;
        break;

      case 'SUBSCRIPTION':
        sourceId =
          invoice.subscription
            ?.id ?? null;

        sourceLabel =
          invoice.subscription
            ?.plan.name ??
          'Subscription';

        sourceReference =
          invoice.subscription
            ?.subscriptionNumber ??
          null;
        break;

      case 'PROJECT':
        sourceId =
          invoice.project?.id ??
          null;

        sourceLabel =
          invoice.project?.name ??
          'Project';

        sourceReference =
          invoice.project?.slug ??
          null;
        break;

      case 'SERVICE_REQUEST':
        sourceId =
          invoice.serviceRequest
            ?.id ?? null;

        sourceLabel =
          invoice.serviceRequest
            ?.title ??
          'Service request';
        break;

      case 'MANUAL':
        break;
    }

    const items =
      invoice.items.map((item) => {
        return {
          id: item.id,
          type: item.type,
          name: item.name,
          description:
            item.description,

          quantity:
            decimalToNumber(
              item.quantity
            ),

          unitPrice:
            decimalToNumber(
              item.unitPrice
            ),

          total:
            decimalToNumber(
              item.total
            ),

          serviceId:
            item.serviceId,

          service:
            item.service,
        };
      });

    const payments =
      invoice.payments.map(
        (payment) => {
          return {
            id: payment.id,

            amount:
              decimalToNumber(
                payment.amount
              ),

            currency:
              payment.currency,

            method:
              payment.method,

            provider:
              payment.provider,

            providerName:
              payment.providerName,

            status:
              payment.status,

            reference:
              payment.reference,

            providerReference:
              payment.providerReference,

            fee:
              payment.fee === null
                ? null
                : decimalToNumber(
                    payment.fee
                  ),

            netAmount:
              payment.netAmount ===
              null
                ? null
                : decimalToNumber(
                    payment.netAmount
                  ),

            initiatedAt:
              payment.initiatedAt,

            paidAt:
              payment.paidAt,

            failedAt:
              payment.failedAt,

            createdAt:
              payment.createdAt,
          };
        }
      );

    const approvals =
      invoice.approvals.map(
        (approval) => {
          return {
            id: approval.id,
            version:
              approval.version,

            status:
              approval.status,

            title:
              approval.title,

            summary:
              approval.summary,

            response:
              approval.response,

            snapshot:
              parseInvoiceApprovalSnapshot(
                approval.snapshot
              ),

            requestedBy:
              approval.requestedBy,

            respondedBy:
              approval.respondedBy,

            requestedAt:
              approval.requestedAt,

            respondedAt:
              approval.respondedAt,

            cancelledAt:
              approval.cancelledAt,

            createdAt:
              approval.createdAt,
          };
        }
      );

    const revisions =
      invoice.revisions.map(
        (revision) => {
          const previousItems =
            parseInvoiceRevisionItems(
              revision.previousItems
            );

          const proposedItems =
            parseInvoiceRevisionItems(
              revision.proposedItems
            );

          return {
            id: revision.id,

            revisionNumber:
              revision.revisionNumber,

            status:
              revision.status,

            title:
              revision.title,

            explanation:
              revision.explanation,

            clientResponse:
              revision.clientResponse,

            previousCurrency:
              revision.previousCurrency,

            proposedCurrency:
              revision.proposedCurrency,

            previousSubtotal:
              decimalToNumber(
                revision.previousSubtotal
              ),

            proposedSubtotal:
              decimalToNumber(
                revision.proposedSubtotal
              ),

            previousDiscount:
              decimalToNumber(
                revision.previousDiscount
              ),

            proposedDiscount:
              decimalToNumber(
                revision.proposedDiscount
              ),

            previousTax:
              decimalToNumber(
                revision.previousTax
              ),

            proposedTax:
              decimalToNumber(
                revision.proposedTax
              ),

            previousTotal:
              decimalToNumber(
                revision.previousTotal
              ),

            proposedTotal:
              decimalToNumber(
                revision.proposedTotal
              ),

            amountPaidAtProposal:
              decimalToNumber(
                revision.amountPaidAtProposal
              ),

            previousBalanceDue:
              decimalToNumber(
                revision.previousBalanceDue
              ),

            proposedBalanceDue:
              decimalToNumber(
                revision.proposedBalanceDue
              ),

            previousDueAt:
              revision.previousDueAt,

            proposedDueAt:
              revision.proposedDueAt,

            previousItems:
              previousItems ?? [],

            proposedItems:
              proposedItems ?? [],

            proposedBy:
              revision.proposedBy,

            createdAt:
              revision.createdAt,

            acceptedAt:
              revision.acceptedAt,

            rejectedAt:
              revision.rejectedAt,

            cancelledAt:
              revision.cancelledAt,
          };
        }
      );

    const latestApproval =
      approvals[0] ?? null;

    const acceptedApproval =
      approvals.find(
        (approval) => {
          return (
            approval.status ===
            'ACCEPTED'
          );
        }
      ) ?? null;

    const pendingApproval =
      approvals.find(
        (approval) => {
          return (
            approval.status ===
            'PENDING'
          );
        }
      ) ?? null;

    const rejectedApproval =
      !acceptedApproval
        ? approvals.find(
            (approval) => {
              return (
                approval.status ===
                'REJECTED'
              );
            }
          ) ?? null
        : null;

    let agreementState:
      | 'NOT_REQUESTED'
      | 'PENDING'
      | 'ACCEPTED'
      | 'REJECTED';

    if (acceptedApproval) {
      agreementState = 'ACCEPTED';
    } else if (pendingApproval) {
      agreementState = 'PENDING';
    } else if (rejectedApproval) {
      agreementState = 'REJECTED';
    } else {
      agreementState =
        'NOT_REQUESTED';
    }

    const unresolvedRevision =
      revisions.find(
        (revision) => {
          return (
            revision.status ===
              'PENDING' ||
            revision.status ===
              'REJECTED'
          );
        }
      ) ?? null;

    let paymentState:
      | 'READY'
      | 'AGREEMENT_REQUIRED'
      | 'AGREEMENT_PENDING'
      | 'AGREEMENT_REJECTED'
      | 'REVISION_PENDING'
      | 'REVISION_REJECTED'
      | 'SETTLED'
      | 'NOT_PAYABLE';

    if (
      agreementState ===
      'NOT_REQUESTED'
    ) {
      paymentState =
        'AGREEMENT_REQUIRED';
    } else if (
      agreementState ===
      'PENDING'
    ) {
      paymentState =
        'AGREEMENT_PENDING';
    } else if (
      agreementState ===
      'REJECTED'
    ) {
      paymentState =
        'AGREEMENT_REJECTED';
    } else if (
      unresolvedRevision
        ?.status === 'PENDING'
    ) {
      paymentState =
        'REVISION_PENDING';
    } else if (
      unresolvedRevision
        ?.status === 'REJECTED'
    ) {
      paymentState =
        'REVISION_REJECTED';
    } else if (
      balanceDue <= 0
    ) {
      paymentState = 'SETTLED';
    } else if (
      payableStatuses.includes(
        effectiveStatus
      )
    ) {
      paymentState = 'READY';
    } else {
      paymentState =
        'NOT_PAYABLE';
    }

    return {
      id: invoice.id,
      invoiceNumber:
        invoice.invoiceNumber,

      source: {
        type: invoice.sourceType,
        id: sourceId,
        label: sourceLabel,
        reference:
          sourceReference,
      },

      project:
        invoice.project,

      status:
        invoice.status,

      effectiveStatus,

      currency:
        invoice.currency,

      subtotal,
      discount,
      tax,
      total,
      amountPaid,
      balanceDue,

      customer: {
        name:
          invoice.customerName,

        email:
          invoice.customerEmail,

        phone:
          invoice.customerPhone,

        billingAddress:
          formatAddress(
            invoice.billingAddress
          ),
      },

      items,
      payments,

      approvals,
      latestApproval,
      acceptedApproval,
      pendingApproval,
      rejectedApproval,
      agreementState,

      revisions,
      unresolvedRevision,
      paymentState,

      notes:
        invoice.notes,

      pdfUrl:
        invoice.pdfUrl,

      issuedAt:
        invoice.issuedAt,

      dueAt:
        invoice.dueAt,

      paidAt:
        invoice.paidAt,

      createdAt:
        invoice.createdAt,

      updatedAt:
        invoice.updatedAt,
    };
  }
);

export type ClientInvoiceData =
  NonNullable<
    Awaited<
      ReturnType<
        typeof getClientInvoice
      >
    >
  >;