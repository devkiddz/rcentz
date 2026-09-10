'use server';

import { randomUUID } from 'node:crypto';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

import { prisma } from '@/lib/prisma';

import { requireAdmin } from '@/features/auth/server/require-admin';

export type CreateAdminInvoiceState = {
  error: string | null;
};

type ValidatedInvoiceItem = {
  name: string;
  description: string | null;
  quantity: number;
  unitPrice: number;
  total: number;
};

function getText(formData: FormData, key: string) {
  const value = formData.get(key);

  if (typeof value !== 'string') {
    return '';
  }

  return value.trim();
}

function roundMoney(value: number) {
  return Math.round(value * 100) / 100;
}

function generateInvoiceNumber() {
  const date = new Date()
    .toISOString()
    .slice(0, 10)
    .replaceAll('-', '');

  const suffix = randomUUID()
    .replaceAll('-', '')
    .slice(0, 8)
    .toUpperCase();

  return `INV-${date}-${suffix}`;
}

function parseInvoiceItems(rawItems: string) {
  let parsed: unknown;

  try {
    parsed = JSON.parse(rawItems);
  } catch {
    return null;
  }

  if (!Array.isArray(parsed) || parsed.length === 0 || parsed.length > 50) {
    return null;
  }

  const items: ValidatedInvoiceItem[] = [];

  for (const value of parsed) {
    if (!value || typeof value !== 'object') {
      return null;
    }

    const item = value as Record<string, unknown>;

    const name =
      typeof item.name === 'string'
        ? item.name.trim()
        : '';

    const description =
      typeof item.description === 'string'
        ? item.description.trim()
        : '';

    const quantity = Number(item.quantity);
    const unitPrice = Number(item.unitPrice);

    if (!name || name.length > 200) {
      return null;
    }

    if (description.length > 1000) {
      return null;
    }

    if (
      !Number.isFinite(quantity) ||
      quantity <= 0 ||
      quantity > 100000
    ) {
      return null;
    }

    if (
      !Number.isFinite(unitPrice) ||
      unitPrice < 0 ||
      unitPrice > 100000000000
    ) {
      return null;
    }

    items.push({
      name,
      description: description || null,
      quantity,
      unitPrice: roundMoney(unitPrice),
      total: roundMoney(quantity * unitPrice),
    });
  }

  return items;
}

export async function createAdminInvoice(
  _previousState: CreateAdminInvoiceState,
  formData: FormData
): Promise<CreateAdminInvoiceState> {
  const admin = await requireAdmin();

  const clientId = getText(formData, 'clientId');
  const currency = getText(formData, 'currency').toUpperCase();
  const discount = Number(getText(formData, 'discount') || '0');
  const tax = Number(getText(formData, 'tax') || '0');
  const dueDate = getText(formData, 'dueDate');
  const notes = getText(formData, 'notes');
  const rawItems = getText(formData, 'items');

  if (!clientId) {
    return {
      error: 'Select a client before creating the invoice.',
    };
  }

  if (!['NGN', 'USD', 'GBP', 'EUR'].includes(currency)) {
    return {
      error: 'Select a supported invoice currency.',
    };
  }

  if (!Number.isFinite(discount) || discount < 0) {
    return {
      error: 'Discount must be a valid positive amount.',
    };
  }

  if (!Number.isFinite(tax) || tax < 0) {
    return {
      error: 'Tax must be a valid positive amount.',
    };
  }

  if (notes.length > 5000) {
    return {
      error: 'Invoice notes are too long.',
    };
  }

  const items = parseInvoiceItems(rawItems);

  if (!items) {
    return {
      error: 'Add at least one valid invoice item.',
    };
  }

  const subtotal = roundMoney(
    items.reduce((sum, item) => {
      return sum + item.total;
    }, 0)
  );

  const trustedDiscount = roundMoney(discount);
  const trustedTax = roundMoney(tax);

  if (trustedDiscount > subtotal) {
    return {
      error: 'Discount cannot be greater than the invoice subtotal.',
    };
  }

  const total = roundMoney(
    subtotal - trustedDiscount + trustedTax
  );

  if (total <= 0) {
    return {
      error: 'Invoice total must be greater than zero.',
    };
  }

  let dueAt: Date | null = null;

  if (dueDate) {
    dueAt = new Date(`${dueDate}T12:00:00.000Z`);

    if (Number.isNaN(dueAt.getTime())) {
      return {
        error: 'Enter a valid invoice due date.',
      };
    }
  }

  const client = await prisma.user.findFirst({
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
          phone: true,
          address: true,
          city: true,
          state: true,
          country: true,
        },
      },
    },
  });

  if (!client) {
    return {
      error: 'The selected client is no longer available.',
    };
  }

  const billingAddress: Record<string, string> = {};

  if (client.clientProfile?.address) {
    billingAddress.address = client.clientProfile.address;
  }

  if (client.clientProfile?.city) {
    billingAddress.city = client.clientProfile.city;
  }

  if (client.clientProfile?.state) {
    billingAddress.state = client.clientProfile.state;
  }

  if (client.clientProfile?.country) {
    billingAddress.country = client.clientProfile.country;
  }

  const invoice = await prisma.invoice.create({
    data: {
      clientId: client.id,
      createdById: admin.id,

      invoiceNumber: generateInvoiceNumber(),
      sourceType: 'MANUAL',
      status: 'DRAFT',

      currency,
      subtotal,
      discount: trustedDiscount,
      tax: trustedTax,
      total,
      amountPaid: 0,
      balanceDue: total,

      customerName: client.name,
      customerEmail: client.email,
      customerPhone:
        client.clientProfile?.phone ??
        client.phone ??
        null,

      billingAddress:
        Object.keys(billingAddress).length > 0
          ? billingAddress
          : undefined,

      notes: notes || null,
      dueAt,

      items: {
        create: items.map((item) => {
          return {
            type: 'CUSTOM',
            name: item.name,
            description: item.description,
            quantity: item.quantity,
            unitPrice: item.unitPrice,
            total: item.total,
          };
        }),
      },
    },
    select: {
      id: true,
    },
  });

  revalidatePath('/admin');
  revalidatePath('/admin/invoices');

  redirect(`/admin/invoices/${invoice.id}`);
}