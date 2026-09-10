'use server';

import { revalidatePath } from 'next/cache';

import { prisma } from '@/lib/prisma';

import { requireAdmin } from '@/features/auth/server/require-admin';

import {
  createInvoiceApprovalRequest,
} from '@/features/billing/server/invoice-approval-engine';

import type {
  InvoiceMutationResult,
} from '@/features/admin/types/invoice-lifecycle';

export async function requestAdminInvoiceApproval(
  invoiceId: string
): Promise<InvoiceMutationResult> {
  const admin = await requireAdmin();

  const normalizedInvoiceId = invoiceId.trim();

  if (!normalizedInvoiceId) {
    return {
      success: false,
      error: 'Invoice ID is required.',
    };
  }

  const result = await prisma.$transaction(async (tx) => {
    return createInvoiceApprovalRequest(tx, {
      invoiceId: normalizedInvoiceId,
      requestedById: admin.id,
    });
  });

  if (!result.success) {
    return result;
  }

  revalidatePath('/admin/invoices');
  revalidatePath(`/admin/invoices/${normalizedInvoiceId}`);

  revalidatePath('/dashboard/billing');
  revalidatePath(
    `/dashboard/billing/invoices/${normalizedInvoiceId}`
  );

  return {
    success: true,
    message: 'Invoice verification request sent to the client.',
  };
}

export async function cancelAdminInvoiceApproval(
  approvalId: string
): Promise<InvoiceMutationResult> {
  const admin = await requireAdmin();

  const normalizedApprovalId = approvalId.trim();

  if (!normalizedApprovalId) {
    return {
      success: false,
      error: 'Approval ID is required.',
    };
  }

  const result = await prisma.$transaction(async (tx) => {
    const approval = await tx.clientApproval.findUnique({
      where: {
        id: normalizedApprovalId,
      },

      select: {
        id: true,
        entityType: true,
        status: true,
        clientId: true,
        invoiceId: true,

        invoice: {
          select: {
            invoiceNumber: true,
          },
        },
      },
    });

    if (
      !approval ||
      approval.entityType !== 'INVOICE' ||
      !approval.invoiceId
    ) {
      return {
        success: false as const,
        error: 'Invoice approval not found.',
      };
    }

    if (approval.status !== 'PENDING') {
      return {
        success: false as const,
        error: 'Only a pending verification request can be cancelled.',
      };
    }

    const updated = await tx.clientApproval.updateMany({
      where: {
        id: approval.id,
        status: 'PENDING',
      },

      data: {
        status: 'CANCELLED',
        cancelledById: admin.id,
        cancelledAt: new Date(),
      },
    });

    if (updated.count !== 1) {
      return {
        success: false as const,
        error: 'The verification request changed before it could be cancelled.',
      };
    }

    await tx.notification.create({
      data: {
        userId: approval.clientId,
        type: 'INVOICE',

        title: 'Invoice verification withdrawn',
        message: `${approval.invoice?.invoiceNumber ?? 'An invoice'} is being reviewed by Rcentz.`,

        href: `/dashboard/billing/invoices/${approval.invoiceId}`,

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

  revalidatePath('/admin/invoices');
  revalidatePath(`/admin/invoices/${result.invoiceId}`);

  revalidatePath('/dashboard/billing');
  revalidatePath(
    `/dashboard/billing/invoices/${result.invoiceId}`
  );

  return {
    success: true,
    message: 'Invoice verification request cancelled.',
  };
}