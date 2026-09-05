import "server-only";

import { cache } from "react";

import { prisma } from "@/lib/prisma";

export const getServiceCategories = cache(async () => {
  return prisma.serviceCategory.findMany({
    where: {
      services: {
        some: {
          status: "ACTIVE",
        },
      },
    },
    select: {
      id: true,
      name: true,
      slug: true,
      description: true,
      services: {
        where: {
          status: "ACTIVE",
        },
        select: {
          id: true,
          name: true,
          slug: true,
          shortDescription: true,
          type: true,
          featured: true,
        },
        orderBy: [
          {
            featured: "desc",
          },
          {
            createdAt: "asc",
          },
        ],
      },
    },
    orderBy: {
      createdAt: "asc",
    },
  });
});

export type ServiceCategorySummary = Awaited<
  ReturnType<typeof getServiceCategories>
>[number];

export type ServiceCardSummary =
  ServiceCategorySummary["services"][number];
