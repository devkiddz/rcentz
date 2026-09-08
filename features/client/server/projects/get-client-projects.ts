import 'server-only';

import { cache } from 'react';

import { prisma } from '@/lib/prisma';

const clientVisible = [
  'CLIENT',
  'PUBLIC'
] as const;

export const getClientProjects = cache(
  async (userId: string) => {
    return prisma.project.findMany({
      where: {
        clientId: userId
      },

      orderBy: [
        {
          updatedAt: 'desc'
        }
      ],

      select: {
        id: true,
        name: true,
        slug: true,

        description: true,
        purpose: true,

        type: true,
        status: true,
        progress: true,

        startedAt: true,
        expectedEndAt: true,
        completedAt: true,
        updatedAt: true,

        portfolio: {
          select: {
            tagline: true
          }
        },

        milestones: {
          where: {
            visibility: {
              in: [...clientVisible]
            },

            status: {
              notIn: [
                'COMPLETED',
                'CANCELLED'
              ]
            }
          },

          orderBy: [
            {
              sortOrder: 'asc'
            },
            {
              dueDate: 'asc'
            }
          ],

          take: 1,

          select: {
            id: true,
            title: true,
            status: true,
            progress: true,
            dueDate: true
          }
        },

        deliverables: {
          where: {
            visibility: {
              in: [...clientVisible]
            },

            status: {
              notIn: [
                'DELIVERED',
                'ACCEPTED',
                'DEFERRED',
                'CANCELLED'
              ]
            }
          },

          orderBy: [
            {
              sortOrder: 'asc'
            },
            {
              dueDate: 'asc'
            }
          ],

          take: 1,

          select: {
            id: true,
            title: true,
            status: true,
            progress: true,
            dueDate: true
          }
        }
      }
    });
  }
);

export type ClientProjectListItem =
  Awaited<
    ReturnType<typeof getClientProjects>
  >[number];