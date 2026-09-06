import 'server-only';

import { cache } from 'react';

import { prisma } from '@/lib/prisma';

const activeTaskStatuses = [
  'TODO',
  'IN_PROGRESS',
  'BLOCKED',
  'REVIEW'
] as const;

export const getOverviewTasks = cache(
  async () => {
    const tasks =
      await prisma.projectTask.findMany({
        where: {
          status: {
            in: [...activeTaskStatuses]
          }
        },

        orderBy: [
          {
            updatedAt: 'desc'
          },
          {
            createdAt: 'desc'
          }
        ],

        take: 12,

        select: {
          id: true,
          title: true,
          status: true,
          priority: true,
          progress: true,
          dueDate: true,
          updatedAt: true,

          project: {
            select: {
              id: true,
              name: true,
              slug: true
            }
          },

          assignedTo: {
            select: {
              id: true,
              name: true,
              image: true
            }
          }
        }
      });

    const summary = {
      total: tasks.length,
      todo: 0,
      inProgress: 0,
      review: 0,
      blocked: 0
    };

    for (const task of tasks) {
      switch (task.status) {
        case 'TODO':
          summary.todo += 1;
          break;

        case 'IN_PROGRESS':
          summary.inProgress += 1;
          break;

        case 'REVIEW':
          summary.review += 1;
          break;

        case 'BLOCKED':
          summary.blocked += 1;
          break;
      }
    }

    return {
      tasks,
      summary
    };
  }
);

export type OverviewTasks =
  Awaited<
    ReturnType<typeof getOverviewTasks>
  >;

export type OverviewTask =
  OverviewTasks['tasks'][number];