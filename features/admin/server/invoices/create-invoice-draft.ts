'use server';

import { randomUUID } from 'node:crypto';

import { revalidatePath } from 'next/cache';

import { requireAdmin } from '@/features/auth/server/require-admin';
import { prisma } from '@/lib/prisma';

import type {
  CreateInvoiceDraftInput,
  CreateInvoiceDraftResult,
} from '@/features/admin/types/invoice-draft';

type ResolvedInvoiceItem = {
  type: CreateInvoiceDraftInput['items'][number]['type'];
  name: string;
  description: string;
  quantity: number;
  unitPriceCents: number;
  lineTotalCents: number;
};

function moneyToCents(value: number) {
  return Math.round(value * 100);
}

function centsToMoney(value: number) {
  return (value / 100).toFixed(2);
}

function createInvoiceNumber() {
  const now = new Date();

  const year = now.getUTCFullYear();
  const month = String(now.getUTCMonth() + 1).padStart(2, '0');
  const day = String(now.getUTCDate()).padStart(2, '0');

  const suffix = randomUUID()
    .replaceAll('-', '')
    .slice(0, 8)
    .toUpperCase();

  return `INV-${year}${month}${day}-${suffix}`;
}

function parseDueDate(value: string | null) {
  if (!value) {
    return null;
  }

  const date = new Date(`${value}T00:00:00.000Z`);

  if (Number.isNaN(date.getTime())) {
    return null;
  }

  return date;
}

export async function createInvoiceDraft(
  input: CreateInvoiceDraftInput
): Promise<CreateInvoiceDraftResult> {
  const admin = await requireAdmin();

  const clientId = input.clientId.trim();
  const currency = input.currency.trim().toUpperCase();
  const notes = input.notes.trim();

  if (!clientId) {
    return {
      success: false,
      error: 'Select a client before creating the invoice.',
    };
  }

  if (!/^[A-Z]{3}$/.test(currency)) {
    return {
      success: false,
      error: 'Currency must use a valid three-letter code.',
    };
  }

  if (input.items.length === 0) {
    return {
      success: false,
      error: 'Add at least one invoice item.',
    };
  }

  if (!Number.isFinite(input.discount) || input.discount < 0) {
    return {
      success: false,
      error: 'Discount must be a valid positive amount.',
    };
  }

  if (!Number.isFinite(input.tax) || input.tax < 0) {
    return {
      success: false,
      error: 'Tax must be a valid positive amount.',
    };
  }

  const resolvedItems: ResolvedInvoiceItem[] = [];

  for (const item of input.items) {
    const name = item.name.trim();
    const description = item.description.trim();

    if (!name) {
      return {
        success: false,
        error: 'Every invoice item must have a name.',
      };
    }

    if (!Number.isInteger(item.quantity) || item.quantity < 1) {
      return {
        success: false,
        error: `${name} must have a whole quantity of at least 1.`,
      };
    }

    if (!Number.isFinite(item.unitPrice) || item.unitPrice < 0) {
      return {
        success: false,
        error: `${name} has an invalid unit price.`,
      };
    }

    const unitPriceCents = moneyToCents(item.unitPrice);
    const lineTotalCents = unitPriceCents * item.quantity;

    resolvedItems.push({
      type: item.type,
      name,
      description: description || name,
      quantity: item.quantity,
      unitPriceCents,
      lineTotalCents,
    });
  }

  let subtotalCents = 0;

  for (const item of resolvedItems) {
    subtotalCents += item.lineTotalCents;
  }

  const discountCents = moneyToCents(input.discount);
  const taxCents = moneyToCents(input.tax);

  if (discountCents > subtotalCents) {
    return {
      success: false,
      error: 'Discount cannot be greater than the invoice subtotal.',
    };
  }

  const totalCents = subtotalCents - discountCents + taxCents;

  if (totalCents < 0) {
    return {
      success: false,
      error: 'Invoice total cannot be negative.',
    };
  }

  const dueAt = parseDueDate(input.dueAt);

  if (input.dueAt && !dueAt) {
    return {
      success: false,
      error: 'The invoice due date is invalid.',
    };
  }

  try {
    const invoice = await prisma.$transaction(async (transaction) => {
      const client = await transaction.user.findFirst({
        where: {
          id: clientId,
          role: 'CLIENT',
          status: 'ACTIVE',
        },

        select: {
          id: true,
          name: true,
          email: true,
          phone: true,

          clientProfile: {
            select: {
              companyName: true,
            },
          },
        },
      });

      if (!client) {
        throw new Error('CLIENT_NOT_FOUND');
      }

      const customerName = client.clientProfile?.companyName ?? client.name;

      return transaction.invoice.create({
        data: {
          clientId: client.id,
          createdById: admin.id,

          invoiceNumber: createInvoiceNumber(),

          sourceType: 'MANUAL',
          status: 'DRAFT',

          currency,

          subtotal: centsToMoney(subtotalCents),
          discount: centsToMoney(discountCents),
          tax: centsToMoney(taxCents),
          total: centsToMoney(totalCents),

          amountPaid: '0.00',
          balanceDue: centsToMoney(totalCents),

          customerName,
          customerEmail: client.email,
          customerPhone: client.phone,

          notes: notes || null,
          dueAt,

          items: {
            create: resolvedItems.map((item) => {
              return {
                type: item.type,
                name: item.name,
                description: item.description,
                quantity: item.quantity,
                unitPrice: centsToMoney(item.unitPriceCents),
                total: centsToMoney(item.lineTotalCents),
              };
            }),
          },
        },

        select: {
          id: true,
        },
      });
    });

    revalidatePath('/admin');
    revalidatePath('/admin/invoices');
    revalidatePath('/dashboard/billing');

    return {
      success: true,
      invoiceId: invoice.id,
    };
  } catch (error) {
    if (
      error instanceof Error &&
      error.message === 'CLIENT_NOT_FOUND'
    ) {
      return {
        success: false,
        error: 'The selected client is no longer available.',
      };
    }

    console.error('Failed to create invoice draft:', error);

    return {
      success: false,
      error: 'The invoice could not be created. Please try again.',
    };
  }
}