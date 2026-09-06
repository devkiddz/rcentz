import 'server-only';

import { cache } from 'react';

import { prisma } from '@/lib/prisma';

export const getOverviewNotifications = cache(
  async (userId: string) => {
    const notifications =
      await prisma.notification.findMany({
        where: {
          userId
        },

        orderBy: {
          createdAt: 'desc'
        },

        take: 20,

        select: {
          id: true,
          type: true,
          title: true,
          message: true,
          href: true,
          entityType: true,
          entityId: true,
          readAt: true,
          createdAt: true
        }
      });

    const unreadCount =
      notifications.filter(
        notification =>
          notification.readAt === null
      ).length;

    return {
      notifications,
      unreadCount,
      total: notifications.length
    };
  }
);

export type OverviewNotifications =
  Awaited<
    ReturnType<
      typeof getOverviewNotifications
    >
  >;

export type OverviewNotification =
  OverviewNotifications['notifications'][number];