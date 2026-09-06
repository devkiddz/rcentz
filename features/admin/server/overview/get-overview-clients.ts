import 'server-only';

import { cache } from 'react';

import { prisma } from '@/lib/prisma';

const activeProjectStatuses = [
  'PLANNING',
  'DISCOVERY',
  'DESIGN',
  'DEVELOPMENT',
  'TESTING',
  'REVIEW',
  'DEPLOYMENT',
  'MAINTENANCE'
] as const;

const openServiceRequestStatuses = [
  'PENDING',
  'REVIEWING',
  'QUOTED',
  'APPROVED'
] as const;

export const getOverviewClients = cache(
  async () => {
    const clients =
      await prisma.user.findMany({
        where: {
          role: 'CLIENT',
          status: 'ACTIVE'
        },

        orderBy: {
          updatedAt: 'desc'
        },

        take: 10,

        select: {
          id: true,
          name: true,
          email: true,
          image: true,
          createdAt: true,
          updatedAt: true,
          lastSeenAt: true,

          clientProfile: {
            select: {
              companyName: true,
              companyLogo: true
            }
          },

          clientProjects: {
            where: {
              status: {
                in: [...activeProjectStatuses]
              }
            },

            select: {
              id: true,
              name: true,
              slug: true,
              status: true,
              progress: true
            }
          },

          serviceRequests: {
            where: {
              status: {
                in: [
                  ...openServiceRequestStatuses
                ]
              }
            },

            select: {
              id: true,
              status: true
            }
          }
        }
      });

    return clients.map(client => {
      const activeProjects =
        client.clientProjects;

      const averageProjectProgress =
        activeProjects.length === 0
          ? 0
          : Math.round(
              activeProjects.reduce(
                (
                  progressTotal,
                  project
                ) =>
                  progressTotal +
                  project.progress,
                0
              ) /
                activeProjects.length
            );

      return {
        id: client.id,
        name: client.name,
        email: client.email,
        image: client.image,
        createdAt: client.createdAt,
        updatedAt: client.updatedAt,
        lastSeenAt: client.lastSeenAt,

        companyName:
          client.clientProfile
            ?.companyName ?? null,

        companyLogo:
          client.clientProfile
            ?.companyLogo ?? null,

        activeProjects,
        activeProjectCount:
          activeProjects.length,

        openRequestCount:
          client.serviceRequests.length,

        averageProjectProgress
      };
    });
  }
);

export type OverviewClient =
  Awaited<
    ReturnType<
      typeof getOverviewClients
    >
  >[number];