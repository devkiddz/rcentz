import 'server-only';

import type { Prisma } from '@/generated/prisma/client';

import {
  buildInvoiceApprovalSnapshot,
} from '@/features/billing/server/invoice-approval-snapshot';

type TransactionClient = Prisma.TransactionClient;

type CreateInvoiceApprovalResult =
  | {
      success: true;
      approvalId: string;
      version: number;
    }
  | {
      success: false;
      error: string;
    };

const closedInvoiceStatuses = [
  'PAID',
  'VOID',
  'CANCELLED',
  'REFUNDED',
];

export async function createInvoiceApprovalRequest(
  tx: TransactionClient,
  input: {
    invoiceId: string;
    requestedById: string;
  }
): Promise<CreateInvoiceApprovalResult> {
  const invoice = await tx.invoice.findUnique({
    where: {
      id: input.invoiceId,
    },

    select: {
      id: true,
      invoiceNumber: true,
      sourceType: true,
      status: true,
      clientId: true,

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
  });

  if (!invoice) {
    return {
      success: false,
      error: 'Invoice not found.',
    };
  }

  if (!invoice.clientId) {
    return {
      success: false,
      error: 'A client must be attached before verification can be requested.',
    };
  }

  if (invoice.status === 'DRAFT') {
    return {
      success: false,
      error: 'Issue the invoice before requesting client verification.',
    };
  }

  if (closedInvoiceStatuses.includes(invoice.status)) {
    return {
      success: false,
      error: 'This invoice is closed and cannot request verification.',
    };
  }

  if (invoice.items.length === 0 || Number(invoice.total) <= 0) {
    return {
      success: false,
      error: 'The invoice must contain a positive billable amount.',
    };
  }

  const acceptedApproval = await tx.clientApproval.findFirst({
    where: {
      invoiceId: invoice.id,
      entityType: 'INVOICE',
      status: 'ACCEPTED',
    },

    select: {
      id: true,
    },
  });

  if (acceptedApproval) {
    return {
      success: false,
      error: 'The original invoice agreement has already been accepted.',
    };
  }

  const pendingApproval = await tx.clientApproval.findFirst({
    where: {
      invoiceId: invoice.id,
      entityType: 'INVOICE',
      status: 'PENDING',
    },

    select: {
      id: true,
    },
  });

  if (pendingApproval) {
    return {
      success: false,
      error: 'This invoice already has a verification request awaiting the client.',
    };
  }

  const latestApproval = await tx.clientApproval.findFirst({
    where: {
      invoiceId: invoice.id,
      entityType: 'INVOICE',
    },

    orderBy: {
      version: 'desc',
    },

    select: {
      version: true,
    },
  });

  const version = (latestApproval?.version ?? 0) + 1;
  const snapshot = buildInvoiceApprovalSnapshot(invoice);

  const approval = await tx.clientApproval.create({
    data: {
      entityType: 'INVOICE',
      status: 'PENDING',
      version,

      clientId: invoice.clientId,
      requestedById: input.requestedById,

      invoiceId: invoice.id,
      projectId: null,

      title: `Verify ${invoice.invoiceNumber}`,
      summary:
        'Please review and confirm this invoice before payment becomes available.',

      snapshot: snapshot as Prisma.InputJsonValue,
    },

    select: {
      id: true,
    },
  });

  await tx.notification.create({
    data: {
      userId: invoice.clientId,
      type: 'INVOICE',

      title: 'Invoice verification required',
      message: `${invoice.invoiceNumber} is ready for your review and approval.`,

      href: `/dashboard/billing/invoices/${invoice.id}`,

      entityType: 'CLIENT_APPROVAL',
      entityId: approval.id,

      metadata: {
        approvalId: approval.id,
        invoiceId: invoice.id,
        invoiceNumber: invoice.invoiceNumber,
        version,
      },
    },
  });

  return {
    success: true,
    approvalId: approval.id,
    version,
  };
}