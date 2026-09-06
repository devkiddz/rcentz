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

export const getOverviewProjects = cache(async () => {
  const projects = await prisma.project.findMany({
    where: {
      status: {
        in: [...activeProjectStatuses]
      }
    },

    orderBy: [
      {
        updatedAt: 'desc'
      }
    ],

    take: 5,

    select: {
      id: true,
      name: true,
      slug: true,
      status: true,
      progress: true,
      expectedEndAt: true,

      client: {
        select: {
          name: true,
          image: true,
          email: true
        }
      },

      milestones: {
        where: {
          status: {
            in: [
              'PLANNED',
              'IN_PROGRESS',
              'BLOCKED',
              'REVIEW'
            ]
          }
        },

        orderBy: [
          {
            dueDate: 'asc'
          },
          {
            sortOrder: 'asc'
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

  return projects.map(project => {
    const nextMilestone =
      project.milestones[0] ?? null;

    return {
      id: project.id,
      name: project.name,
      slug: project.slug,
      status: project.status,
      progress: project.progress,
      expectedEndAt: project.expectedEndAt,

      client: project.client
        ? {
            name: project.client.name,
            email: project.client.email,
            image: project.client.image
          }
        : null,

      nextMilestone
    };
  });
});

export type OverviewProject =
  Awaited<
    ReturnType<typeof getOverviewProjects>
  >[number];