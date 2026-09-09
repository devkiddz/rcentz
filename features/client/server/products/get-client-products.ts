import 'server-only';

import { cache } from 'react';

import { prisma } from '@/lib/prisma';

const visibleProductStatuses = [
  'ACTIVE',
  'OUT_OF_STOCK'
] as const;

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

  const numericValue =
    Number(
      value.toString()
    );

  return Number.isFinite(
    numericValue
  )
    ? numericValue
    : 0;
}

function getAvailability(
  product: {
    type: string;
    status: string;
    trackInventory: boolean;

    variants: Array<{
      inventory: {
        quantity: number;
        reserved: number;
      } | null;
    }>;
  }
) {
  if (
    product.status ===
    'OUT_OF_STOCK'
  ) {
    return {
      status:
        'OUT_OF_STOCK' as const,
      label:
        'Out of stock'
    };
  }

  if (
    product.type ===
    'DIGITAL'
  ) {
    return {
      status:
        'AVAILABLE' as const,
      label:
        'Available'
    };
  }

  if (
    !product.trackInventory
  ) {
    return {
      status:
        'AVAILABLE' as const,
      label:
        'Available'
    };
  }

  const trackedVariants =
    product.variants.filter(
      variant =>
        variant.inventory !==
        null
    );

  if (
    trackedVariants.length ===
    0
  ) {
    return {
      status:
        'AVAILABLE' as const,
      label:
        'Available'
    };
  }

  const availableUnits =
    trackedVariants.reduce(
      (
        total,
        variant
      ) => {
        const inventory =
          variant.inventory;

        if (!inventory) {
          return total;
        }

        return (
          total +
          Math.max(
            inventory.quantity -
              inventory.reserved,
            0
          )
        );
      },
      0
    );

  if (availableUnits > 0) {
    return {
      status:
        'IN_STOCK' as const,
      label:
        'In stock'
    };
  }

  return {
    status:
      'OUT_OF_STOCK' as const,
    label:
      'Out of stock'
  };
}

export const getClientProducts =
  cache(
    async () => {
      const products =
        await prisma.product.findMany({
          where: {
            status: {
              in: [
                ...visibleProductStatuses
              ]
            }
          },

          orderBy: [
            {
              featured:
                'desc'
            },
            {
              updatedAt:
                'desc'
            }
          ],

          select: {
            id: true,

            name: true,
            slug: true,

            shortDescription:
              true,

            description:
              true,

            type: true,
            status: true,

            price: true,

            compareAtPrice:
              true,

            currency: true,

            sku: true,

            trackInventory:
              true,

            featured: true,

            category: {
              select: {
                id: true,
                name: true,
                slug: true
              }
            },

            media: {
              where: {
                mimeType: {
                  startsWith:
                    'image/'
                }
              },

              orderBy: [
                {
                  sortOrder:
                    'asc'
                },
                {
                  createdAt:
                    'asc'
                }
              ],

              take: 1,

              select: {
                url: true,
                alt: true,
                caption: true
              }
            },

            variants: {
              orderBy: {
                createdAt:
                  'asc'
              },

              select: {
                id: true,

                name: true,

                price: true,

                isDefault:
                  true,

                inventory: {
                  select: {
                    quantity:
                      true,

                    reserved:
                      true
                  }
                }
              }
            }
          }
        });

      return products.map(
        product => {
          const basePrice =
            decimalToNumber(
              product.price
            );

          const variantPrices =
            product.variants
              .filter(
                variant =>
                  variant.price !==
                  null
              )
              .map(
                variant =>
                  decimalToNumber(
                    variant.price
                  )
              );

          const availablePrices =
            [
              basePrice,
              ...variantPrices
            ];

          const startingPrice =
            Math.min(
              ...availablePrices
            );

          const endingPrice =
            Math.max(
              ...availablePrices
            );

          return {
            id:
              product.id,

            name:
              product.name,

            slug:
              product.slug,

            shortDescription:
              product.shortDescription ??
              product.description,

            type:
              product.type,

            status:
              product.status,

            currency:
              product.currency,

            startingPrice,
            endingPrice,

            hasPriceRange:
              startingPrice !==
              endingPrice,

            compareAtPrice:
              product.compareAtPrice
                ? decimalToNumber(
                    product.compareAtPrice
                  )
                : null,

            featured:
              product.featured,

            category:
              product.category,

            image:
              product.media[0] ??
              null,

            availability:
              getAvailability(
                product
              ),

            variantCount:
              product.variants
                .length
          };
        }
      );
    }
  );

export type ClientProductCatalogueItem =
  Awaited<
    ReturnType<
      typeof getClientProducts
    >
  >[number];