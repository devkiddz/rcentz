import 'server-only';

import { cache } from 'react';

import { prisma } from '@/lib/prisma';

export const getAdminInvoiceEditorOptions = cache(async () => {
  const [clients, projects, services] = await Promise.all([
    prisma.user.findMany({
      where: {
        role: 'CLIENT',
      },
      orderBy: {
        name: 'asc',
      },
      select: {
        id: true,
        name: true,
        email: true,
        status: true,
        clientProfile: {
          select: {
            companyName: true,
          },
        },
      },
    }),

    prisma.project.findMany({
      orderBy: {
        name: 'asc',
      },
      select: {
        id: true,
        clientId: true,
        name: true,
        slug: true,
        status: true,
      },
    }),

    prisma.service.findMany({
      where: {
        status: {
          not: 'ARCHIVED',
        },
      },
      orderBy: {
        name: 'asc',
      },
      select: {
        id: true,
        name: true,
        slug: true,
        status: true,
      },
    }),
  ]);

  return {
    clients: clients.map((client) => {
      return {
        id: client.id,
        displayName:
          client.clientProfile?.companyName ??
          client.name,
        email: client.email,
        status: client.status,
      };
    }),

    projects,

    services,
  };
});

export type AdminInvoiceEditorOptions = Awaited<
  ReturnType<typeof getAdminInvoiceEditorOptions>
>;