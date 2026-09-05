import "server-only";

import { cache } from "react";

import { prisma } from "@/lib/prisma";

const suggestedServiceSelect = {
  id: true,
  name: true,
  slug: true,
  shortDescription: true,
  type: true,
  featured: true,

  category: {
    select: {
      id: true,
      name: true,
      slug: true,
    },
  },
} as const;

type GetSuggestedServicesOptions = {
  serviceId: string;
  categoryId?: string | null;
  limit?: number;
};

export const getSuggestedServices = cache(
  async ({
    serviceId,
    categoryId,
    limit = 8,
  }: GetSuggestedServicesOptions) => {
    const sameCategoryServices = categoryId
      ? await prisma.service.findMany({
          where: {
            status: "ACTIVE",
            id: {
              not: serviceId,
            },
            category: {
              is: {
                id: categoryId,
              },
            },
          },

          select: suggestedServiceSelect,

          orderBy: [
            {
              featured: "desc",
            },
            {
              name: "asc",
            },
          ],

          take: limit,
        })
      : [];

    const remainingSlots = Math.max(
      limit - sameCategoryServices.length,
      0,
    );

    if (remainingSlots === 0) {
      return sameCategoryServices;
    }

    const otherServices = await prisma.service.findMany({
      where: {
        status: "ACTIVE",

        id: {
          notIn: [
            serviceId,
            ...sameCategoryServices.map(
              (service) => service.id,
            ),
          ],
        },

        ...(categoryId
          ? {
              NOT: {
                category: {
                  is: {
                    id: categoryId,
                  },
                },
              },
            }
          : {}),
      },

      select: suggestedServiceSelect,

      orderBy: [
        {
          featured: "desc",
        },
        {
          name: "asc",
        },
      ],

      take: remainingSlots,
    });

    return [
      ...sameCategoryServices,
      ...otherServices,
    ];
  },
);

export type SuggestedService = Awaited<
  ReturnType<typeof getSuggestedServices>
>[number];