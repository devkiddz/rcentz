import 'server-only';

import type {
  NotificationType,
  Prisma
} from '@/generated/prisma/client';

import { prisma } from '@/lib/prisma';

export type CreateNotificationInput = {
  userId: string;

  type: NotificationType;

  title: string;
  message: string;

  href?:
    | string
    | null;

  entityType?:
    | string
    | null;

  entityId?:
    | string
    | null;

  metadata?:
    Prisma.InputJsonValue;
};

function normalizeOptionalText(
  value:
    | string
    | null
    | undefined
) {
  if (!value) {
    return null;
  }

  const normalized =
    value.trim();

  return normalized.length >
    0
    ? normalized
    : null;
}

function buildNotificationData(
  input: CreateNotificationInput
): Prisma.NotificationUncheckedCreateInput {
  const userId =
    input.userId.trim();

  const title =
    input.title.trim();

  const message =
    input.message.trim();

  if (!userId) {
    throw new Error(
      'Notification recipient is required.'
    );
  }

  if (!title) {
    throw new Error(
      'Notification title is required.'
    );
  }

  if (!message) {
    throw new Error(
      'Notification message is required.'
    );
  }

  return {
    userId,

    type: input.type,

    title,
    message,

    href:
      normalizeOptionalText(
        input.href
      ),

    entityType:
      normalizeOptionalText(
        input.entityType
      ),

    entityId:
      normalizeOptionalText(
        input.entityId
      ),

    ...(input.metadata !==
    undefined
      ? {
          metadata:
            input.metadata
        }
      : {})
  };
}

export async function createNotification(
  input: CreateNotificationInput
) {
  return prisma.notification.create({
    data:
      buildNotificationData(
        input
      )
  });
}

export async function createNotificationInTransaction(
  tx: Prisma.TransactionClient,
  input: CreateNotificationInput
) {
  return tx.notification.create({
    data:
      buildNotificationData(
        input
      )
  });
}