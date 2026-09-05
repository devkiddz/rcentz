import 'server-only';

import { cache } from 'react';

import { prisma } from '@/lib/prisma';

export const getServices = cache(async () => {
  const services = await prisma.service.findMany({
    where: {
      status: 'ACTIVE'
    },

    select: {
      id: true,
      name: true,
      slug: true,
      shortDescription: true,
      type: true,
      featured: true,

      category: {
        select: {
          name: true,
          slug: true
        }
      }
    },

    orderBy: [
      {
        featured: 'desc'
      },
      {
        createdAt: 'asc'
      }
    ]
  });

  return services;
});

export type ServiceSummary = Awaited<
  ReturnType<typeof getServices>
>[number];