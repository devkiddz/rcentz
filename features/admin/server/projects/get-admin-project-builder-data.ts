import 'server-only';

import { cache } from 'react';

import { prisma } from '@/lib/prisma';

export const getAdminProjectBuilderData = cache(async () => {
  const clients = await prisma.user.findMany({
    where: {
      role: 'CLIENT',
      status: 'ACTIVE'
    },

    orderBy: {
      name: 'asc'
    },

    select: {
      id: true,
      name: true,
      email: true,

      clientProfile: {
        select: {
          companyName: true
        }
      }
    }
  });

  return {
    clients: clients.map(client => {
      return {
        id: client.id,
        name: client.name,
        email: client.email,
        companyName: client.clientProfile?.companyName ?? null
      };
    })
  };
});

export type AdminProjectBuilderData = Awaited<
  ReturnType<typeof getAdminProjectBuilderData>
>;