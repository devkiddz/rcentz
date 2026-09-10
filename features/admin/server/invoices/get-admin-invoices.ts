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


const closedInvoiceStatuses: string[] = [
  'PAID',
  'VOID',
  'CANCELLED',
  'REFUNDED',
];


export const getAdminInvoices = cache(async () => {
  const now = new Date();


  const invoices = await prisma.invoice.findMany({
    orderBy: [
      {
        issuedAt: 'desc',
      },
      {
        createdAt: 'desc',
      },
    ],

    take: 100,

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

      issuedAt: true,
      dueAt: true,
      paidAt: true,
      createdAt: true,
      updatedAt: true,

      client: {
        select: {
          id: true,
          name: true,
          email: true,
          image: true,

          clientProfile: {
            select: {
              companyName: true,
              companyLogo: true,
            },
          },
        },
      },

      items: {
        orderBy: {
          createdAt: 'asc',
        },

        take: 2,

        select: {
          id: true,
          name: true,
          description: true,
          type: true,
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
              name: true,
            },
          },
        },
      },

      project: {
        select: {
          id: true,
          name: true,
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
  });


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

    const effectiveStatus = isOverdue
      ? 'OVERDUE'
      : invoice.status;


    let sourceLabel = 'Manual invoice';
    let sourceReference: string | null = null;


    switch (invoice.sourceType) {
      case 'ORDER':
        sourceLabel = 'Product order';
        sourceReference = invoice.order?.orderNumber ?? null;
        break;

      case 'QUOTE':
        sourceLabel = 'Accepted quote';
        sourceReference = invoice.quote?.quoteNumber ?? null;
        break;

      case 'SUBSCRIPTION':
        sourceLabel = invoice.subscription?.plan.name ?? 'Subscription';
        sourceReference = invoice.subscription?.subscriptionNumber ?? null;
        break;

      case 'PROJECT':
        sourceLabel = invoice.project?.name ?? 'Project';
        break;

      case 'SERVICE_REQUEST':
        sourceLabel = invoice.serviceRequest?.title ?? 'Service request';
        break;

      case 'MANUAL':
        break;
    }


    const displayName =
      invoice.client?.clientProfile?.companyName ??
      invoice.client?.name ??
      invoice.customerName ??
      'Unassigned client';


    const email =
      invoice.client?.email ??
      invoice.customerEmail ??
      null;


    const image =
      invoice.client?.clientProfile?.companyLogo ??
      invoice.client?.image ??
      null;


    return {
      id: invoice.id,
      invoiceNumber: invoice.invoiceNumber,

      status: invoice.status,
      effectiveStatus,

      source: {
        type: invoice.sourceType,
        label: sourceLabel,
        reference: sourceReference,
      },

      client: {
        id: invoice.client?.id ?? null,
        displayName,
        email,
        image,
      },

      items: invoice.items,

      itemCount: invoice._count.items,
      paymentCount: invoice._count.payments,

      currency: invoice.currency,
      subtotal,
      discount,
      tax,
      total,
      amountPaid,
      balanceDue,

      issuedAt: invoice.issuedAt,
      dueAt: invoice.dueAt,
      paidAt: invoice.paidAt,
      createdAt: invoice.createdAt,
      updatedAt: invoice.updatedAt,
    };
  });


  const summary = {
    total: resolvedInvoices.length,
    drafts: 0,
    open: 0,
    paid: 0,
    overdue: 0,
  };


  for (const invoice of resolvedInvoices) {
    if (invoice.status === 'DRAFT') {
      summary.drafts += 1;
    }

    if (invoice.status === 'PAID') {
      summary.paid += 1;
    }

    if (invoice.effectiveStatus === 'OVERDUE') {
      summary.overdue += 1;
    }

    const isOpen =
      invoice.balanceDue > 0 &&
      !closedInvoiceStatuses.includes(invoice.status);

    if (isOpen) {
      summary.open += 1;
    }
  }


  const currencyMap = new Map<
    string,
    {
      currency: string;
      billed: number;
      paid: number;
      outstanding: number;
      overdue: number;
    }
  >();


  for (const invoice of resolvedInvoices) {
    const existing = currencyMap.get(invoice.currency);

    const totals = existing ?? {
      currency: invoice.currency,
      billed: 0,
      paid: 0,
      outstanding: 0,
      overdue: 0,
    };


    if (
      invoice.status !== 'DRAFT' &&
      invoice.status !== 'VOID' &&
      invoice.status !== 'CANCELLED'
    ) {
      totals.billed += invoice.total;
      totals.paid += invoice.amountPaid;
    }


    const isOpen =
      invoice.balanceDue > 0 &&
      !closedInvoiceStatuses.includes(invoice.status);

    if (isOpen) {
      totals.outstanding += invoice.balanceDue;
    }


    if (invoice.effectiveStatus === 'OVERDUE') {
      totals.overdue += invoice.balanceDue;
    }


    currencyMap.set(invoice.currency, totals);
  }


  return {
    generatedAt: now,
    summary,
    totalsByCurrency: Array.from(currencyMap.values()),
    invoices: resolvedInvoices,
  };
});


export type AdminInvoicesData = Awaited<
  ReturnType<typeof getAdminInvoices>
>;

export type AdminInvoiceListItem =
  AdminInvoicesData['invoices'][number];