import 'server-only';

import { cache } from 'react';

import { prisma } from '@/lib/prisma';

export const getInvoiceBuilderOptions = cache(async () => {
  const clients = await prisma.user.findMany({
    where: {
      role: 'CLIENT',
      status: 'ACTIVE',
    },

    orderBy: {
      name: 'asc',
    },

    select: {
      id: true,
      name: true,
      email: true,
      phone: true,
      image: true,

      clientProfile: {
        select: {
          companyName: true,
          companyLogo: true,
        },
      },
    },
  });

  return {
    clients: clients.map((client) => {
      return {
        id: client.id,
        displayName: client.clientProfile?.companyName ?? client.name,
        email: client.email,
        phone: client.phone,
        preferredCurrency: 'NGN',
        image: client.clientProfile?.companyLogo ?? client.image,
      };
    }),
  };
});

export type InvoiceBuilderOptions = Awaited<
  ReturnType<typeof getInvoiceBuilderOptions>
>;