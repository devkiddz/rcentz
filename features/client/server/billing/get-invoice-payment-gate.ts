import 'server-only';

import { prisma } from '@/lib/prisma';

export type InvoicePaymentGate =
  | {
      allowed: true;

      invoice: {
        id: string;
        invoiceNumber: string;
        currency: string;
        balanceDue: number;
      };
    }
  | {
      allowed: false;

      reason:
        | 'NOT_FOUND'
        | 'NOT_PAYABLE'
        | 'NO_BALANCE'
        | 'AGREEMENT_REQUIRED'
        | 'AGREEMENT_PENDING'
        | 'AGREEMENT_REJECTED'
        | 'REVISION_PENDING'
        | 'REVISION_REJECTED';

      message: string;
    };

function decimalToNumber(
  value: { toString(): string }
) {
  const number = Number(value.toString());

  return Number.isFinite(number)
    ? number
    : 0;
}

export async function getInvoicePaymentGate(
  userId: string,
  invoiceId: string
): Promise<InvoicePaymentGate> {
  const invoice = await prisma.invoice.findFirst({
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
      status: true,
      currency: true,
      balanceDue: true,

      approvals: {
        where: {
          entityType: 'INVOICE',
        },

        orderBy: {
          version: 'desc',
        },

        take: 1,

        select: {
          status: true,
        },
      },

      revisions: {
        where: {
          status: {
            in: ['PENDING', 'REJECTED'],
          },
        },

        orderBy: {
          revisionNumber: 'desc',
        },

        take: 1,

        select: {
          status: true,
        },
      },
    },
  });

  if (!invoice) {
    return {
      allowed: false,
      reason: 'NOT_FOUND',
      message: 'Invoice not found.',
    };
  }

  const approval = invoice.approvals[0] ?? null;
  const revision = invoice.revisions[0] ?? null;

  if (!approval || approval.status === 'CANCELLED') {
    return {
      allowed: false,
      reason: 'AGREEMENT_REQUIRED',
      message:
        'This invoice must be verified before payment can begin.',
    };
  }

  if (approval.status === 'PENDING') {
    return {
      allowed: false,
      reason: 'AGREEMENT_PENDING',
      message:
        'Review and verify this invoice before payment can begin.',
    };
  }

  if (approval.status === 'REJECTED') {
    return {
      allowed: false,
      reason: 'AGREEMENT_REJECTED',
      message:
        'This invoice was returned for review and is not currently payable.',
    };
  }

  if (revision?.status === 'PENDING') {
    return {
      allowed: false,
      reason: 'REVISION_PENDING',
      message:
        'Review the pending payment update before payment can continue.',
    };
  }

  if (revision?.status === 'REJECTED') {
    return {
      allowed: false,
      reason: 'REVISION_REJECTED',
      message:
        'A rejected payment update must be resolved before payment can continue.',
    };
  }

  const balanceDue = decimalToNumber(
    invoice.balanceDue
  );

  if (balanceDue <= 0) {
    return {
      allowed: false,
      reason: 'NO_BALANCE',
      message: 'This invoice has no remaining balance.',
    };
  }

  if (
    ![
      'ISSUED',
      'PARTIALLY_PAID',
      'OVERDUE',
    ].includes(invoice.status)
  ) {
    return {
      allowed: false,
      reason: 'NOT_PAYABLE',
      message: 'This invoice is not currently payable.',
    };
  }

  return {
    allowed: true,

    invoice: {
      id: invoice.id,
      invoiceNumber: invoice.invoiceNumber,
      currency: invoice.currency,
      balanceDue,
    },
  };
}