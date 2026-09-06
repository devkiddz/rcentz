import 'server-only';

import { cache } from 'react';

import { prisma } from '@/lib/prisma';

export const getOverviewMetrics = cache(async () => {
  const [
    serviceRequests,
    activeProjects,
    clients,
    openMilestones,
    pendingQuotes
  ] = await Promise.all([
    prisma.serviceRequest.count({
      where: {
        status: {
          in: [
            'PENDING',
            'REVIEWING',
            'QUOTED',
            'APPROVED'
          ]
        }
      }
    }),

    prisma.project.count({
      where: {
        status: {
          in: [
            'PLANNING',
            'DISCOVERY',
            'DESIGN',
            'DEVELOPMENT',
            'TESTING',
            'REVIEW',
            'DEPLOYMENT',
            'MAINTENANCE'
          ]
        }
      }
    }),

    prisma.user.count({
      where: {
        role: 'CLIENT',
        status: 'ACTIVE'
      }
    }),

    prisma.projectMilestone.count({
      where: {
        status: {
          in: [
            'PLANNED',
            'IN_PROGRESS',
            'BLOCKED',
            'REVIEW'
          ]
        }
      }
    }),

    prisma.quote.count({
      where: {
        status: {
          in: [
            'DRAFT',
            'SENT'
          ]
        }
      }
    })
  ]);

  return {
    serviceRequests,
    activeProjects,
    clients,
    openMilestones,
    pendingQuotes
  };
});

export type OverviewMetrics =
  Awaited<ReturnType<typeof getOverviewMetrics>>;