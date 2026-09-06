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

const DAY_IN_MILLISECONDS =
  24 * 60 * 60 * 1000;

const ATTENTION_WINDOW_DAYS = 7;
const STALE_PROJECT_DAYS = 7;

function getProjectHealth({
  blockedMilestones,
  overdueMilestones,
  reviewMilestones,
  dueSoonMilestones,
  isProjectOverdue,
  isProjectStale
}: {
  blockedMilestones: number;
  overdueMilestones: number;
  reviewMilestones: number;
  dueSoonMilestones: number;
  isProjectOverdue: boolean;
  isProjectStale: boolean;
}) {
  if (
    blockedMilestones > 0 ||
    overdueMilestones > 0 ||
    isProjectOverdue
  ) {
    return {
      status: 'AT_RISK' as const,
      label: 'At risk',
      reason:
        blockedMilestones > 0
          ? `${blockedMilestones} blocked milestone${
              blockedMilestones === 1 ? '' : 's'
            }`
          : overdueMilestones > 0
            ? `${overdueMilestones} overdue milestone${
                overdueMilestones === 1 ? '' : 's'
              }`
            : 'Project target date has passed'
    };
  }

  if (
    reviewMilestones > 0 ||
    dueSoonMilestones > 0 ||
    isProjectStale
  ) {
    return {
      status: 'ATTENTION' as const,
      label: 'Needs attention',
      reason:
        reviewMilestones > 0
          ? `${reviewMilestones} milestone${
              reviewMilestones === 1 ? '' : 's'
            } awaiting review`
          : dueSoonMilestones > 0
            ? `${dueSoonMilestones} milestone${
                dueSoonMilestones === 1 ? '' : 's'
              } due soon`
            : 'Project has not been updated recently'
    };
  }

  return {
    status: 'ON_TRACK' as const,
    label: 'On track',
    reason: 'No immediate delivery risks detected'
  };
}

export const getCurrentProjectProgress = cache(
  async () => {
    const currentProject =
      await prisma.project.findFirst({
        where: {
          status: {
            in: [...activeProjectStatuses]
          }
        },

        orderBy: {
          updatedAt: 'desc'
        },

        select: {
          id: true,
          name: true,
          slug: true,
          status: true,
          progress: true,
          expectedEndAt: true,
          updatedAt: true,

          client: {
            select: {
              name: true,
              image: true
            }
          },

          milestones: {
            orderBy: {
              sortOrder: 'asc'
            },

            select: {
              id: true,
              title: true,
              status: true,
              priority: true,
              progress: true,
              dueDate: true,
              completedAt: true,
              sortOrder: true
            }
          },

          tasks: {
            select: {
              id: true,
              status: true,
              priority: true,
              progress: true,
              dueDate: true
            }
          }
        }
      });

    if (!currentProject) {
      return null;
    }

    const now = new Date();

    const attentionWindowEnd = new Date(
      now.getTime() +
        ATTENTION_WINDOW_DAYS *
          DAY_IN_MILLISECONDS
    );

    const staleProjectThreshold = new Date(
      now.getTime() -
        STALE_PROJECT_DAYS *
          DAY_IN_MILLISECONDS
    );

    const milestoneSummary = {
      total: currentProject.milestones.length,
      completed: 0,
      inProgress: 0,
      review: 0,
      blocked: 0,
      planned: 0,
      cancelled: 0,
      overdue: 0,
      dueSoon: 0
    };

    for (const milestone of currentProject.milestones) {
      switch (milestone.status) {
        case 'COMPLETED':
          milestoneSummary.completed += 1;
          break;

        case 'IN_PROGRESS':
          milestoneSummary.inProgress += 1;
          break;

        case 'REVIEW':
          milestoneSummary.review += 1;
          break;

        case 'BLOCKED':
          milestoneSummary.blocked += 1;
          break;

        case 'PLANNED':
          milestoneSummary.planned += 1;
          break;

        case 'CANCELLED':
          milestoneSummary.cancelled += 1;
          break;
      }

      const milestoneIsActive =
        milestone.status !== 'COMPLETED' &&
        milestone.status !== 'CANCELLED';

      if (
        milestoneIsActive &&
        milestone.dueDate &&
        milestone.dueDate < now
      ) {
        milestoneSummary.overdue += 1;
      }

      if (
        milestoneIsActive &&
        milestone.dueDate &&
        milestone.dueDate >= now &&
        milestone.dueDate <=
          attentionWindowEnd
      ) {
        milestoneSummary.dueSoon += 1;
      }
    }

    const taskSummary = {
      total: currentProject.tasks.length,
      completed: 0,
      open: 0,
      blocked: 0,
      review: 0
    };

    for (const task of currentProject.tasks) {
      switch (task.status) {
        case 'COMPLETED':
          taskSummary.completed += 1;
          break;

        case 'BLOCKED':
          taskSummary.blocked += 1;
          break;

        case 'REVIEW':
          taskSummary.review += 1;
          break;

        case 'TODO':
        case 'IN_PROGRESS':
          taskSummary.open += 1;
          break;
      }
    }

    const nextMilestone =
      currentProject.milestones.find(
        milestone =>
          milestone.status !== 'COMPLETED' &&
          milestone.status !== 'CANCELLED'
      ) ?? null;

    const isProjectOverdue =
      currentProject.expectedEndAt !== null &&
      currentProject.expectedEndAt < now;

    const isProjectStale =
      currentProject.updatedAt <
      staleProjectThreshold;

    const health = getProjectHealth({
      blockedMilestones:
        milestoneSummary.blocked,
      overdueMilestones:
        milestoneSummary.overdue,
      reviewMilestones:
        milestoneSummary.review,
      dueSoonMilestones:
        milestoneSummary.dueSoon,
      isProjectOverdue,
      isProjectStale
    });

    const pageSummary = {
      // Temporary monitoring contract.
      // We will replace this with Project CRUD data later.
      total: 0,
      healthy: 0,
      inProgress: 0,
      attention: 0,
      blocked: 0
    };

    return {
      id: currentProject.id,
      name: currentProject.name,
      slug: currentProject.slug,
      status: currentProject.status,
      progress: currentProject.progress,
      expectedEndAt:
        currentProject.expectedEndAt,
      updatedAt: currentProject.updatedAt,

      client: currentProject.client,

      milestones: currentProject.milestones,

      milestoneSummary,
      taskSummary,
      pageSummary,

      nextMilestone,

      health,

      deliverySignals: {
        isProjectOverdue,
        isProjectStale,
        overdueMilestones:
          milestoneSummary.overdue,
        dueSoonMilestones:
          milestoneSummary.dueSoon
      }
    };
  }
);

export type CurrentProjectProgress =
  NonNullable<
    Awaited<
      ReturnType<
        typeof getCurrentProjectProgress
      >
    >
  >;