import 'server-only';

import { cache } from 'react';

import { prisma } from '@/lib/prisma';

function decimalToNumber(
  value:
    | {
        toString(): string;
      }
    | null
    | undefined
) {
  if (
    value === null ||
    value === undefined
  ) {
    return 0;
  }

  const number =
    Number(value.toString());

  return Number.isFinite(number)
    ? number
    : 0;
}

function formatAddress(
  value: unknown
) {
  if (!value) {
    return null;
  }

  if (
    typeof value === 'string'
  ) {
    const trimmed =
      value.trim();

    return trimmed || null;
  }

  if (
    Array.isArray(value) ||
    typeof value !== 'object'
  ) {
    return null;
  }

  const address =
    value as Record<
      string,
      unknown
    >;

  const preferredKeys = [
    'line1',
    'line2',
    'address1',
    'address2',
    'street',
    'city',
    'state',
    'postalCode',
    'zip',
    'country'
  ];

  const parts =
    preferredKeys
      .map(key => {
        const part =
          address[key];

        return typeof part ===
          'string'
          ? part.trim()
          : '';
      })
      .filter(Boolean);

  if (
    parts.length > 0
  ) {
    return Array.from(
      new Set(parts)
    ).join(', ');
  }

  const fallbackParts =
    Object.values(address)
      .filter(
        value =>
          typeof value ===
          'string'
      )
      .map(value =>
        String(value).trim()
      )
      .filter(Boolean);

  return fallbackParts
    .length > 0
    ? Array.from(
        new Set(
          fallbackParts
        )
      ).join(', ')
    : null;
}

function isOwnedOrder(
  order: {
    status: string;

    items: Array<{
      digitalDelivery: {
        status: string;
      } | null;
    }>;

    invoices: Array<{
      status: string;

      payments: Array<{
        status: string;
      }>;
    }>;
  }
) {
  const digitalAccess =
    order.items.some(
      item =>
        item
          .digitalDelivery
          ?.status ===
          'AVAILABLE' ||
        item
          .digitalDelivery
          ?.status ===
          'DOWNLOADED'
    );

  const successfulPayment =
    order.invoices.some(
      invoice =>
        invoice.status ===
          'PAID' ||
        invoice.payments.some(
          payment =>
            payment.status ===
            'SUCCESS'
        )
    );

  const confirmedOrder =
    [
      'CONFIRMED',
      'PROCESSING',
      'COMPLETED'
    ].includes(
      order.status
    );

  return (
    digitalAccess ||
    successfulPayment ||
    confirmedOrder
  );
}

export const getClientProductOwnership =
  cache(
    async (
      userId: string,
      productSlug: string
    ) => {
      const orders =
        await prisma.order.findMany({
          where: {
            userId,

            items: {
              some: {
                variant: {
                  product: {
                    slug:
                      productSlug
                  }
                }
              }
            }
          },

          orderBy: {
            createdAt:
              'desc'
          },

          select: {
            id: true,

            orderNumber:
              true,

            status: true,

            currency: true,

            customerName:
              true,

            customerEmail:
              true,

            customerPhone:
              true,

            shippingAddress:
              true,

            completedAt:
              true,

            createdAt: true,
            updatedAt: true,

            items: {
              where: {
                variant: {
                  product: {
                    slug:
                      productSlug
                  }
                }
              },

              select: {
                id: true,

                productName:
                  true,

                variantName:
                  true,

                quantity: true,

                unitPrice:
                  true,

                total: true,

                variant: {
                  select: {
                    id: true,

                    productId:
                      true,

                    name: true,

                    product: {
                      select: {
                        id: true,
                        slug: true,
                        type: true
                      }
                    }
                  }
                },

                digitalDelivery: {
                  select: {
                    id: true,

                    status: true,

                    downloadCount:
                      true,

                    expiresAt:
                      true,

                    lastDownloadedAt:
                      true,

                    createdAt:
                      true,

                    updatedAt:
                      true,

                    digitalProduct: {
                      select: {
                        version: true,

                        fileName:
                          true,

                        fileType:
                          true,

                        fileSize:
                          true,

                        downloadUrl:
                          true
                      }
                    }
                  }
                }
              }
            },

            fulfillment: {
              select: {
                status: true,

                trackingNumber:
                  true,

                carrier: true,

                shippedAt:
                  true,

                deliveredAt:
                  true,

                shippingAddress:
                  true,

                createdAt:
                  true,

                updatedAt:
                  true
              }
            },

            invoices: {
              orderBy: {
                createdAt:
                  'desc'
              },

              select: {
                id: true,

                invoiceNumber:
                  true,

                status: true,

                currency: true,

                total: true,

                amountPaid:
                  true,

                balanceDue:
                  true,

                billingAddress:
                  true,

                pdfUrl: true,

                issuedAt: true,
                dueAt: true,
                paidAt: true,

                createdAt: true,

                payments: {
                  orderBy: {
                    createdAt:
                      'desc'
                  },

                  select: {
                    id: true,

                    amount: true,

                    currency:
                      true,

                    method: true,

                    provider:
                      true,

                    providerName:
                      true,

                    status: true,

                    reference:
                      true,

                    paidAt: true,

                    initiatedAt:
                      true,

                    createdAt:
                      true
                  }
                }
              }
            }
          }
        });

      const history =
        orders.map(order => {
          const purchaseAmount =
            order.items.reduce(
              (
                total,
                item
              ) =>
                total +
                decimalToNumber(
                  item.total
                ),
              0
            );

          const quantity =
            order.items.reduce(
              (
                total,
                item
              ) =>
                total +
                item.quantity,
              0
            );

          const invoice =
            order.invoices[0] ??
            null;

          const payment =
            invoice
              ?.payments.find(
                payment =>
                  payment.status ===
                  'SUCCESS'
              ) ??
            invoice
              ?.payments[0] ??
            null;

          const digitalDelivery =
            order.items
              .map(
                item =>
                  item.digitalDelivery
              )
              .find(Boolean) ??
            null;

          const billingLocation =
            formatAddress(
              invoice
                ?.billingAddress
            );

          const deliveryLocation =
            formatAddress(
              order
                .fulfillment
                ?.shippingAddress
            ) ??
            formatAddress(
              order.shippingAddress
            );

          const owned =
            isOwnedOrder(
              order
            );

          return {
            id:
              order.id,

            owned,

            orderNumber:
              order.orderNumber,

            orderStatus:
              order.status,

            currency:
              order.currency,

            quantity,

            purchaseAmount,

            purchasedAt:
              order.completedAt ??
              order.createdAt,

            createdAt:
              order.createdAt,

            customer: {
              name:
                order.customerName,

              email:
                order.customerEmail,

              phone:
                order.customerPhone
            },

            billingLocation,

            deliveryLocation,

            item:
              order.items[0]
                ? {
                    productName:
                      order
                        .items[0]
                        .productName,

                    variantName:
                      order
                        .items[0]
                        .variantName,

                    quantity:
                      order
                        .items[0]
                        .quantity,

                    unitPrice:
                      decimalToNumber(
                        order
                          .items[0]
                          .unitPrice
                      )
                  }
                : null,

            invoice:
              invoice
                ? {
                    id:
                      invoice.id,

                    invoiceNumber:
                      invoice.invoiceNumber,

                    status:
                      invoice.status,

                    currency:
                      invoice.currency,

                    total:
                      decimalToNumber(
                        invoice.total
                      ),

                    amountPaid:
                      decimalToNumber(
                        invoice.amountPaid
                      ),

                    balanceDue:
                      decimalToNumber(
                        invoice.balanceDue
                      ),

                    pdfUrl:
                      invoice.pdfUrl,

                    issuedAt:
                      invoice.issuedAt,

                    dueAt:
                      invoice.dueAt,

                    paidAt:
                      invoice.paidAt
                  }
                : null,

            payment:
              payment
                ? {
                    id:
                      payment.id,

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

                    paidAt:
                      payment.paidAt,

                    initiatedAt:
                      payment.initiatedAt
                  }
                : null,

            digitalDelivery:
              digitalDelivery
                ? {
                    id:
                      digitalDelivery.id,

                    status:
                      digitalDelivery.status,

                    downloadCount:
                      digitalDelivery.downloadCount,

                    lastDownloadedAt:
                      digitalDelivery.lastDownloadedAt,

                    expiresAt:
                      digitalDelivery.expiresAt,

                    deliveredAt:
                      digitalDelivery.createdAt,

                    version:
                      digitalDelivery
                        .digitalProduct
                        .version,

                    fileName:
                      digitalDelivery
                        .digitalProduct
                        .fileName,

                    fileType:
                      digitalDelivery
                        .digitalProduct
                        .fileType,

                    fileSize:
                      digitalDelivery
                        .digitalProduct
                        .fileSize,

                    downloadReady:
                      Boolean(
                        digitalDelivery
                          .digitalProduct
                          .downloadUrl
                      )
                  }
                : null,

            fulfillment:
              order.fulfillment
                ? {
                    status:
                      order
                        .fulfillment
                        .status,

                    trackingNumber:
                      order
                        .fulfillment
                        .trackingNumber,

                    carrier:
                      order
                        .fulfillment
                        .carrier,

                    shippedAt:
                      order
                        .fulfillment
                        .shippedAt,

                    deliveredAt:
                      order
                        .fulfillment
                        .deliveredAt,

                    deliveryLocation
                  }
                : null
          };
        });

      const ownedHistory =
        history.filter(
          purchase =>
            purchase.owned
        );

      return {
        owned:
          ownedHistory.length >
          0,

        purchaseCount:
          ownedHistory.length,

        latestPurchase:
          ownedHistory[0] ??
          history[0] ??
          null,

        history
      };
    }
  );

export type ClientProductOwnership =
  Awaited<
    ReturnType<
      typeof getClientProductOwnership
    >
  >;