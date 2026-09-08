import 'server-only';

import { cache } from 'react';

import { prisma } from '@/lib/prisma';

export const getClientProject = cache(
  async ({
    userId,
    projectId
  }: {
    userId: string;
    projectId: string;
  }) => {
    return prisma.project.findFirst({
      where: {
        id: projectId,
        clientId: userId
      },

      select: {
        id: true,
        name: true,
        slug: true,

        description: true,
        purpose: true,
        vision: true,
        expectedOutcome: true,

        type: true,
        status: true,
        progress: true,

        startedAt: true,
        expectedEndAt: true,
        completedAt: true,
        createdAt: true,
        updatedAt: true,

        portfolio: {
          select: {
            tagline: true,
            liveUrl: true
          }
        },

        infrastructure: {
          select: {
            primaryDomain: true
          }
        },

        analytics: {
          select: {
            views: true,
            uniqueViews: true,
            reactions: true,
            comments: true,
            shares: true,
            downloads: true,
            lastViewedAt: true
          }
        },

        _count: {
          select: {
            milestones: true,
            features: true,
            tasks: true,
            updates: true,
            files: true
          }
        }
      }
    });
  }
);

export type ClientProject =
  NonNullable<
    Awaited<
      ReturnType<
        typeof getClientProject
      >
    >
  >;