'use server';

import { revalidatePath } from 'next/cache';

import { prisma } from '@/lib/prisma';

import { requireAuth } from '@/features/auth/server/require-auth';

import { parseInvoiceRevisionItems } from '@/features/billing/server/invoice-revision-snapshot';

type ClientRevisionResult =
  | {
      success: true;
      message: string;
    }
  | {
      success: false;
      error: string;
    };

function decimalToNumber(value: { toString(): string }) {
  const number = Number(value.toString());
  return Number.isFinite(number) ? number : 0;
}

function roundMoney(value: number) {
  return Math.round(value * 100) / 100;
}

function revalidateInvoice(
  invoiceId: string
) {
  revalidatePath('/admin');
  revalidatePath('/admin/invoices');
  revalidatePath(`/admin/invoices/${invoiceId}`);

  revalidatePath('/dashboard/billing');
  revalidatePath(`/dashboard/billing/invoices/${invoiceId}`);
}

export async function acceptInvoiceRevision(
  revisionId: string
): Promise<ClientRevisionResult> {
  const user = await requireAuth('/dashboard/billing');

  const cleanRevisionId = revisionId.trim();

  if (!cleanRevisionId) {
    return {
      success: false,
      error: 'Revision ID is required.',
    };
  }

  const revision =
    await prisma.invoiceRevision.findFirst({
      where: {
        id: cleanRevisionId,
        status: 'PENDING',
        invoice: {
          clientId: user.id,
        },
      },
      select: {
        id: true,
        invoiceId: true,
        proposedById: true,

        proposedCurrency: true,
        proposedSubtotal: true,
        proposedDiscount: true,
        proposedTax: true,
        proposedTotal: true,
        proposedBalanceDue: true,
        proposedDueAt: true,
        proposedItems: true,

        invoice: {
          select: {
            id: true,
            invoiceNumber: true,
          },
        },
      },
    });

  if (!revision) {
    return {
      success: false,
      error: 'This payment update is no longer available for acceptance.',
    };
  }

  const proposedItems =
    parseInvoiceRevisionItems(
      revision.proposedItems
    );

  if (!proposedItems) {
    return {
      success: false,
      error: 'The proposed invoice items are invalid.',
    };
  }

  try {
    await prisma.$transaction(async (transaction) => {
      const currentRevision =
        await transaction.invoiceRevision.findUnique({
          where: {
            id: revision.id,
          },
          select: {
            status: true,
          },
        });

      if (
        !currentRevision ||
        currentRevision.status !== 'PENDING'
      ) {
        throw new Error('REVISION_STATE_CHANGED');
      }

      const invoice =
        await transaction.invoice.findFirst({
          where: {
            id: revision.invoiceId,
            clientId: user.id,
          },
          select: {
            id: true,
            status: true,
            amountPaid: true,
            paidAt: true,

            items: {
              select: {
                id: true,
              },
            },
          },
        });

      if (!invoice) {
        throw new Error('INVOICE_NOT_FOUND');
      }

      if (
        invoice.status === 'VOID' ||
        invoice.status === 'CANCELLED' ||
        invoice.status === 'REFUNDED'
      ) {
        throw new Error('INVOICE_CLOSED');
      }

      const amountPaid = decimalToNumber(
        invoice.amountPaid
      );

      const proposedTotal = decimalToNumber(
        revision.proposedTotal
      );

      if (proposedTotal < amountPaid) {
        throw new Error('REVISION_BELOW_PAID');
      }

      const requestedServiceIds = Array.from(
        new Set(
          proposedItems
            .map((item) => {
              return item.serviceId;
            })
            .filter(
              (serviceId): serviceId is string => {
                return Boolean(serviceId);
              }
            )
        )
      );

      const availableServiceIds = new Set<string>();

      if (requestedServiceIds.length > 0) {
        const services =
          await transaction.service.findMany({
            where: {
              id: {
                in: requestedServiceIds,
              },
            },
            select: {
              id: true,
            },
          });

        for (const service of services) {
          availableServiceIds.add(
            service.id
          );
        }
      }

      const currentItemIds = new Set(
        invoice.items.map((item) => {
          return item.id;
        })
      );

      const retainedItemIds = new Set<string>();

      for (const item of proposedItems) {
        const serviceId =
          item.serviceId &&
          availableServiceIds.has(
            item.serviceId
          )
            ? item.serviceId
            : null;

        if (item.originalId) {
          if (
            !currentItemIds.has(
              item.originalId
            )
          ) {
            throw new Error(
              'INVOICE_ITEMS_CHANGED'
            );
          }

          retainedItemIds.add(
            item.originalId
          );

          await transaction.invoiceItem.update({
            where: {
              id: item.originalId,
            },
            data: {
              type: item.type,
              name: item.name,
              description: item.description,
              quantity: item.quantity,
              unitPrice: item.unitPrice,
              total: item.total,
              serviceId,
            },
          });

          continue;
        }

        await transaction.invoiceItem.create({
          data: {
            invoiceId: invoice.id,
            type: item.type,
            name: item.name,
            description: item.description,
            quantity: item.quantity,
            unitPrice: item.unitPrice,
            total: item.total,
            serviceId,
          },
        });
      }

      const removedItemIds =
        invoice.items
          .map((item) => {
            return item.id;
          })
          .filter((itemId) => {
            return !retainedItemIds.has(
              itemId
            );
          });

      if (removedItemIds.length > 0) {
        await transaction.invoiceItem.deleteMany({
          where: {
            invoiceId: invoice.id,
            id: {
              in: removedItemIds,
            },
          },
        });
      }

      const balanceDue = roundMoney(
        proposedTotal - amountPaid
      );

      let nextStatus:
        | 'ISSUED'
        | 'PARTIALLY_PAID'
        | 'PAID';

      if (
        amountPaid > 0 &&
        balanceDue === 0
      ) {
        nextStatus = 'PAID';
      } else if (amountPaid > 0) {
        nextStatus = 'PARTIALLY_PAID';
      } else {
        nextStatus = 'ISSUED';
      }

      const now = new Date();

      await transaction.invoice.update({
        where: {
          id: invoice.id,
        },
        data: {
          currency:
            revision.proposedCurrency,

          subtotal:
            revision.proposedSubtotal,
          discount:
            revision.proposedDiscount,
          tax: revision.proposedTax,
          total: revision.proposedTotal,

          balanceDue,
          dueAt:
            revision.proposedDueAt,

          status: nextStatus,

          paidAt:
            nextStatus === 'PAID'
              ? invoice.paidAt ?? now
              : null,
        },
      });

      const updatedRevision =
        await transaction.invoiceRevision.updateMany({
          where: {
            id: revision.id,
            status: 'PENDING',
          },
          data: {
            status: 'ACCEPTED',
            acceptedById: user.id,
            acceptedAt: now,
          },
        });

      if (updatedRevision.count !== 1) {
        throw new Error(
          'REVISION_STATE_CHANGED'
        );
      }

      await transaction.notification.create({
        data: {
          userId: revision.proposedById,
          type: 'INVOICE',
          title: 'Invoice update accepted',
          message: `${revision.invoice.invoiceNumber} has been accepted by the client.`,
          href: `/admin/invoices/${invoice.id}`,
          entityType: 'InvoiceRevision',
          entityId: revision.id,
        },
      });
    });
  } catch (error) {
    const code =
      error instanceof Error
        ? error.message
        : '';

    switch (code) {
      case 'REVISION_STATE_CHANGED':
        return {
          success: false,
          error: 'This payment update has already been resolved.',
        };

      case 'INVOICE_NOT_FOUND':
        return {
          success: false,
          error: 'Invoice could not be found.',
        };

      case 'INVOICE_CLOSED':
        return {
          success: false,
          error: 'This invoice is already closed.',
        };

      case 'REVISION_BELOW_PAID':
        return {
          success: false,
          error: 'The revised invoice total is below the amount already paid.',
        };

      case 'INVOICE_ITEMS_CHANGED':
        return {
          success: false,
          error:
            'The invoice changed after this update was proposed. Rcentz must review the revision again.',
        };

      default:
        console.error(
          'Failed to accept invoice revision:',
          error
        );

        return {
          success: false,
          error: 'The payment update could not be accepted.',
        };
    }
  }

  revalidateInvoice(revision.invoiceId);

  return {
    success: true,
    message: 'Payment update accepted.',
  };
}

export async function rejectInvoiceRevision(
  revisionId: string,
  response: string
): Promise<ClientRevisionResult> {
  const user = await requireAuth('/dashboard/billing');

  const cleanRevisionId = revisionId.trim();
  const clientResponse = response.trim();

  if (!cleanRevisionId) {
    return {
      success: false,
      error: 'Revision ID is required.',
    };
  }

  if (clientResponse.length > 2000) {
    return {
      success: false,
      error: 'Your response is too long.',
    };
  }

  const revision =
    await prisma.invoiceRevision.findFirst({
      where: {
        id: cleanRevisionId,
        status: 'PENDING',
        invoice: {
          clientId: user.id,
        },
      },
      select: {
        id: true,
        invoiceId: true,
        proposedById: true,
        invoice: {
          select: {
            invoiceNumber: true,
          },
        },
      },
    });

  if (!revision) {
    return {
      success: false,
      error: 'This payment update is no longer awaiting your response.',
    };
  }

  const updated =
    await prisma.invoiceRevision.updateMany({
      where: {
        id: revision.id,
        status: 'PENDING',
      },
      data: {
        status: 'REJECTED',
        rejectedById: user.id,
        rejectedAt: new Date(),
        clientResponse:
          clientResponse || null,
      },
    });

  if (updated.count !== 1) {
    return {
      success: false,
      error: 'This payment update has already been resolved.',
    };
  }

  await prisma.notification.create({
    data: {
      userId: revision.proposedById,
      type: 'INVOICE',
      title: 'Invoice update rejected',
      message: `${revision.invoice.invoiceNumber} requires further review after the client rejected the proposed update.`,
      href: `/admin/invoices/${revision.invoiceId}`,
      entityType: 'InvoiceRevision',
      entityId: revision.id,
    },
  });

  revalidateInvoice(revision.invoiceId);

  return {
    success: true,
    message: 'Payment update rejected and returned to Rcentz for review.',
  };
}