'use server';

import {
  revalidatePath
} from 'next/cache';

import { getCurrentUser } from '@/features/auth/server/get-current-user';

import { prisma } from '@/lib/prisma';

type RequestMilestoneRecordInput = {
  projectId: string;
  milestoneId: string;
};

export type RequestMilestoneRecordResult =
  | {
      ok: true;
      recordId: string;
      status: 'REQUESTED';
      recipientEmail: string;
    }
  | {
      ok: false;
      code:
        | 'UNAUTHORIZED'
        | 'NOT_FOUND'
        | 'NOT_COMPLETED'
        | 'ALREADY_EXISTS'
        | 'CREATE_FAILED';
      message: string;
    };

export async function requestMilestoneRecord({
  projectId,
  milestoneId
}: RequestMilestoneRecordInput): Promise<RequestMilestoneRecordResult> {
  const user =
    await getCurrentUser();

  if (
    !user ||
    user.status !== 'ACTIVE'
  ) {
    return {
      ok: false,
      code: 'UNAUTHORIZED',
      message:
        'You must be signed in to request this record.'
    };
  }

  const milestone =
    await prisma.projectMilestone.findFirst({
      where: {
        id: milestoneId,
        projectId,

        project: {
          clientId: user.id
        },

        visibility: {
          in: [
            'CLIENT',
            'PUBLIC'
          ]
        }
      },

      select: {
        id: true,
        projectId: true,
        status: true,

        records: {
          where: {
            status: {
              not: 'CANCELLED'
            }
          },

          orderBy: {
            version: 'desc'
          },

          take: 1,

          select: {
            id: true,
            status: true,
            version: true,
            recipientEmail: true
          }
        }
      }
    });

  if (!milestone) {
    return {
      ok: false,
      code: 'NOT_FOUND',
      message:
        'This milestone could not be found.'
    };
  }

  if (
    milestone.status !==
    'COMPLETED'
  ) {
    return {
      ok: false,
      code: 'NOT_COMPLETED',
      message:
        'Milestone records can be requested after the milestone is completed.'
    };
  }

  const existingRecord =
    milestone.records[0] ??
    null;

  if (existingRecord) {
    return {
      ok: false,
      code: 'ALREADY_EXISTS',
      message:
        existingRecord.status ===
        'SENT'
          ? 'A completed record already exists for this milestone.'
          : 'This milestone record has already been requested.'
    };
  }

  try {
    const record =
      await prisma.$transaction(
        async tx => {
          const latestVersion =
            await tx.projectMilestoneRecord.aggregate({
              where: {
                milestoneId
              },

              _max: {
                version: true
              }
            });

          const version =
            (latestVersion
              ._max
              .version ??
              0) + 1;

          return tx.projectMilestoneRecord.create({
            data: {
              projectId,
              milestoneId,

              requestedById:
                user.id,

              recipientEmail:
                user.email,

              version,

              status:
                'REQUESTED'
            },

            select: {
              id: true,
              status: true,
              recipientEmail: true
            }
          });
        }
      );

    revalidatePath(
      `/dashboard/projects/${projectId}`
    );

    return {
      ok: true,
      recordId:
        record.id,
      status:
        'REQUESTED',
      recipientEmail:
        record.recipientEmail
    };
  } catch {
    return {
      ok: false,
      code: 'CREATE_FAILED',
      message:
        'The milestone record request could not be created. Please try again.'
    };
  }
}