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


function formatAddress(value: unknown) {
  if (!value) {
    return null;
  }

  if (typeof value === 'string') {
    const address = value.trim();

    return address || null;
  }

  if (Array.isArray(value) || typeof value !== 'object') {
    return null;
  }

  const address = value as Record<string, unknown>;

  const addressParts = [
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

  const cleanParts = addressParts.filter((part) => {
    return typeof part === 'string' && part.trim().length > 0;
  });

  if (cleanParts.length === 0) {
    return null;
  }

  return cleanParts.join(', ');
}


const closedInvoiceStatuses: string[] = [
  'PAID',
  'VOID',
  'CANCELLED',
  'REFUNDED',
];


export const getClientInvoice = cache(
  async (userId: string, invoiceId: string) => {
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


    const subtotal = decimalToNumber(invoice.subtotal);
    const discount = decimalToNumber(invoice.discount);
    const tax = decimalToNumber(invoice.tax);
    const total = decimalToNumber(invoice.total);
    const amountPaid = decimalToNumber(invoice.amountPaid);
    const balanceDue = decimalToNumber(invoice.balanceDue);


    const now = new Date();

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


    const items = invoice.items.map((item) => {
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


    const payments = invoice.payments.map((payment) => {
      return {
        id: payment.id,
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

      customer: {
        name: invoice.customerName,
        email: invoice.customerEmail,
        phone: invoice.customerPhone,
        billingAddress: formatAddress(invoice.billingAddress),
      },

      items,
      payments,

      notes: invoice.notes,
      pdfUrl: invoice.pdfUrl,

      issuedAt: invoice.issuedAt,
      dueAt: invoice.dueAt,
      paidAt: invoice.paidAt,
      createdAt: invoice.createdAt,
      updatedAt: invoice.updatedAt,
    };
  }
);


export type ClientInvoiceData = NonNullable<
  Awaited<ReturnType<typeof getClientInvoice>>
>;