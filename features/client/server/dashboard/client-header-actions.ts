'use server';

import { revalidatePath } from 'next/cache';

import { requireAuth } from '@/features/auth/server/require-auth';
import { prisma } from '@/lib/prisma';

export async function markClientNotificationRead(
  notificationId: string,
) {
  const user =
    await requireAuth('/dashboard');

  const id = notificationId.trim();

  if (!id) {
    return {
      success: false as const,
    };
  }

  await prisma.notification.updateMany({
    where: {
      id,
      userId: user.id,
      readAt: null,
    },

    data: {
      readAt: new Date(),
    },
  });

  revalidatePath(
    '/dashboard',
    'layout',
  );

  return {
    success: true as const,
  };
}

export async function markAllClientNotificationsRead() {
  const user =
    await requireAuth('/dashboard');

  await prisma.notification.updateMany({
    where: {
      userId: user.id,
      readAt: null,
    },

    data: {
      readAt: new Date(),
    },
  });

  revalidatePath(
    '/dashboard',
    'layout',
  );

  return {
    success: true as const,
  };
}

export async function markClientConversationRead(
  conversationId: string,
) {
  const user =
    await requireAuth('/dashboard');

  const id =
    conversationId.trim();

  if (!id) {
    return {
      success: false as const,
    };
  }

  await prisma.conversationParticipant.updateMany({
    where: {
      conversationId: id,
      userId: user.id,
      leftAt: null,
    },

    data: {
      lastReadAt: new Date(),
    },
  });

  revalidatePath(
    '/dashboard',
    'layout',
  );

  return {
    success: true as const,
  };
}