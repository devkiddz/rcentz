'use server';

import { revalidatePath } from 'next/cache';

import { prisma } from '@/lib/prisma';

import { requireAuth } from '@/features/auth/server/require-auth';

import {
  invoiceMatchesApprovalSnapshot,
} from '@/features/billing/server/invoice-approval-snapshot';

import type {
  InvoiceMutationResult,
} from '@/features/admin/types/invoice-lifecycle';

export async function acceptInvoiceApproval(
  approvalId: string
): Promise<InvoiceMutationResult> {
  const user = await requireAuth('/dashboard/billing');

  const normalizedApprovalId = approvalId.trim();

  if (!normalizedApprovalId) {
    return {
      success: false,
      error: 'Approval ID is required.',
    };
  }

  const result = await prisma.$transaction(async (tx) => {
    const approval = await tx.clientApproval.findFirst({
      where: {
        id: normalizedApprovalId,
        clientId: user.id,
        entityType: 'INVOICE',
      },

      select: {
        id: true,
        status: true,
        snapshot: true,
        requestedById: true,
        invoiceId: true,

        invoice: {
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

            notes: true,
            dueAt: true,

            project: {
              select: {
                id: true,
                name: true,
              },
            },

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
                    name: true,
                  },
                },
              },
            },
          },
        },
      },
    });

    if (!approval || !approval.invoiceId || !approval.invoice) {
      return {
        success: false as const,
        error: 'Invoice verification request not found.',
      };
    }

    if (approval.status !== 'PENDING') {
      return {
        success: false as const,
        error: 'This verification request is no longer awaiting a response.',
      };
    }

    if (
      ['DRAFT', 'VOID', 'CANCELLED', 'REFUNDED'].includes(
        approval.invoice.status
      )
    ) {
      return {
        success: false as const,
        error: 'This invoice is no longer available for verification.',
      };
    }

    const stillMatches = invoiceMatchesApprovalSnapshot(
      approval.invoice,
      approval.snapshot
    );

    if (!stillMatches) {
      return {
        success: false as const,
        error:
          'This invoice changed after the verification request was created. Please wait for Rcentz to send an updated request.',
      };
    }

    const accepted = await tx.clientApproval.updateMany({
      where: {
        id: approval.id,
        status: 'PENDING',
      },

      data: {
        status: 'ACCEPTED',
        respondedById: user.id,
        respondedAt: new Date(),
        response: null,
      },
    });

    if (accepted.count !== 1) {
      return {
        success: false as const,
        error: 'The verification request changed before your response was saved.',
      };
    }

    await tx.notification.create({
      data: {
        userId: approval.requestedById,
        type: 'INVOICE',

        title: 'Invoice accepted',
        message: `${approval.invoice.invoiceNumber} has been verified by the client.`,

        href: `/admin/invoices/${approval.invoiceId}`,

        entityType: 'CLIENT_APPROVAL',
        entityId: approval.id,
      },
    });

    return {
      success: true as const,
      invoiceId: approval.invoiceId,
    };
  });

  if (!result.success) {
    return {
      success: false,
      error: result.error,
    };
  }

  revalidatePath('/dashboard/billing');
  revalidatePath(
    `/dashboard/billing/invoices/${result.invoiceId}`
  );

  revalidatePath('/admin/invoices');
  revalidatePath(`/admin/invoices/${result.invoiceId}`);

  return {
    success: true,
    message: 'Invoice verified successfully.',
  };
}

export async function rejectInvoiceApproval(
  approvalId: string,
  response: string
): Promise<InvoiceMutationResult> {
  const user = await requireAuth('/dashboard/billing');

  const normalizedApprovalId = approvalId.trim();
  const normalizedResponse = response.trim();

  if (!normalizedApprovalId) {
    return {
      success: false,
      error: 'Approval ID is required.',
    };
  }

  if (normalizedResponse.length > 2000) {
    return {
      success: false,
      error: 'Your response must be 2,000 characters or fewer.',
    };
  }

  const result = await prisma.$transaction(async (tx) => {
    const approval = await tx.clientApproval.findFirst({
      where: {
        id: normalizedApprovalId,
        clientId: user.id,
        entityType: 'INVOICE',
      },

      select: {
        id: true,
        status: true,
        requestedById: true,
        invoiceId: true,

        invoice: {
          select: {
            invoiceNumber: true,
          },
        },
      },
    });

    if (!approval || !approval.invoiceId) {
      return {
        success: false as const,
        error: 'Invoice verification request not found.',
      };
    }

    if (approval.status !== 'PENDING') {
      return {
        success: false as const,
        error: 'This verification request is no longer awaiting a response.',
      };
    }

    const rejected = await tx.clientApproval.updateMany({
      where: {
        id: approval.id,
        status: 'PENDING',
      },

      data: {
        status: 'REJECTED',
        respondedById: user.id,
        respondedAt: new Date(),
        response: normalizedResponse || null,
      },
    });

    if (rejected.count !== 1) {
      return {
        success: false as const,
        error: 'The verification request changed before your response was saved.',
      };
    }

    await tx.notification.create({
      data: {
        userId: approval.requestedById,
        type: 'INVOICE',

        title: 'Invoice rejected',
        message: `${approval.invoice?.invoiceNumber ?? 'An invoice'} was returned by the client for review.`,

        href: `/admin/invoices/${approval.invoiceId}`,

        entityType: 'CLIENT_APPROVAL',
        entityId: approval.id,
      },
    });

    return {
      success: true as const,
      invoiceId: approval.invoiceId,
    };
  });

  if (!result.success) {
    return {
      success: false,
      error: result.error,
    };
  }

  revalidatePath('/dashboard/billing');
  revalidatePath(
    `/dashboard/billing/invoices/${result.invoiceId}`
  );

  revalidatePath('/admin/invoices');
  revalidatePath(`/admin/invoices/${result.invoiceId}`);

  return {
    success: true,
    message: 'Invoice returned to Rcentz for review.',
  };
}