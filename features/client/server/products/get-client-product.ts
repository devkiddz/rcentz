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
      'DIGITAL' ||
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
        if (
          !variant.inventory
        ) {
          return total;
        }

        return (
          total +
          Math.max(
            variant.inventory
              .quantity -
              variant.inventory
                .reserved,
            0
          )
        );
      },
      0
    );

  return availableUnits > 0
    ? {
        status:
          'IN_STOCK' as const,

        label:
          'In stock'
      }
    : {
        status:
          'OUT_OF_STOCK' as const,

        label:
          'Out of stock'
      };
}

export const getClientProduct =
  cache(
    async (
      slug: string
    ) => {
      const product =
        await prisma.product.findFirst({
          where: {
            slug,

            status: {
              in: [
                ...visibleProductStatuses
              ]
            }
          },

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
                slug: true,

                description:
                  true
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

              select: {
                id: true,

                url: true,
                alt: true,
                caption: true,

                width: true,
                height: true
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

                sku: true,

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
            },

            digital: {
              select: {
                description:
                  true,

                version: true,

                fileSize: true,

                fileType: true
              }
            }
          }
        });

      if (!product) {
        return null;
      }

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
          product.shortDescription,

        description:
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

        sku:
          product.sku,

        featured:
          product.featured,

        category:
          product.category,

        media:
          product.media,

        variants:
          product.variants.map(
            variant => {
              const availableUnits =
                variant.inventory
                  ? Math.max(
                      variant
                        .inventory
                        .quantity -
                        variant
                          .inventory
                          .reserved,
                      0
                    )
                  : null;

              return {
                id:
                  variant.id,

                name:
                  variant.name,

                sku:
                  variant.sku,

                price:
                  variant.price
                    ? decimalToNumber(
                        variant.price
                      )
                    : null,

                isDefault:
                  variant.isDefault,

                available:
                  availableUnits ===
                    null ||
                  availableUnits >
                    0
              };
            }
          ),

        digital:
          product.digital,

        availability:
          getAvailability(
            product
          )
      };
    }
  );

export type ClientProduct =
  NonNullable<
    Awaited<
      ReturnType<
        typeof getClientProduct
      >
    >
  >;