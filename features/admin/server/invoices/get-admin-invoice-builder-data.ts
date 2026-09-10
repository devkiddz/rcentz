import 'server-only';

import { cache } from 'react';

import { prisma } from '@/lib/prisma';

export const getAdminInvoiceBuilderData = cache(async () => {
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
      clientProfile: {
        select: {
          companyName: true,
          phone: true,
          address: true,
          city: true,
          state: true,
          country: true,
        },
      },
    },
  });

  return {
    clients: clients.map((client) => {
      const profile = client.clientProfile;

      const address = [
        profile?.address,
        profile?.city,
        profile?.state,
        profile?.country,
      ]
        .filter(Boolean)
        .join(', ');

      return {
        id: client.id,
        name: client.name,
        email: client.email,
        companyName: profile?.companyName ?? null,
        phone: profile?.phone ?? client.phone ?? null,
        address: address || null,
      };
    }),
  };
});

export type AdminInvoiceBuilderData = Awaited<
  ReturnType<typeof getAdminInvoiceBuilderData>
>;