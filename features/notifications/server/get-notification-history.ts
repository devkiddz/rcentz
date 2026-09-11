import 'server-only';

import { prisma } from '@/lib/prisma';

import type { NotificationHistoryData } from '@/features/notifications/types/notification-history';

function formatRelativeTime(
  date: Date,
  now: Date
) {
  const difference =
    now.getTime() -
    date.getTime();

  const minutes = Math.max(
    0,
    Math.floor(
      difference / 60_000
    )
  );

  if (minutes < 1) {
    return 'Now';
  }

  if (minutes < 60) {
    return `${minutes}m`;
  }

  const hours =
    Math.floor(
      minutes / 60
    );

  if (hours < 24) {
    return `${hours}h`;
  }

  const days =
    Math.floor(
      hours / 24
    );

  if (days < 7) {
    return `${days}d`;
  }

  return new Intl.DateTimeFormat(
    'en-NG',
    {
      day: 'numeric',
      month: 'short'
    }
  ).format(date);
}

function formatCreatedLabel(
  date: Date
) {
  return new Intl.DateTimeFormat(
    'en-NG',
    {
      dateStyle: 'medium',
      timeStyle: 'short',
      timeZone: 'Africa/Lagos'
    }
  ).format(date);
}

export async function getNotificationHistory(
  input: {
    userId: string;
    page?: number;
    pageSize?: number;
  }
): Promise<NotificationHistoryData> {
  const userId =
    input.userId.trim();

  if (!userId) {
    return {
      items: [],
      page: 1,
      pageSize: 20,
      totalPages: 1,
      totalCount: 0,
      unreadCount: 0
    };
  }

  const requestedPage =
    Number.isFinite(input.page)
      ? Math.max(
          1,
          Math.floor(
            input.page ?? 1
          )
        )
      : 1;

  const pageSize =
    Number.isFinite(
      input.pageSize
    )
      ? Math.min(
          50,
          Math.max(
            1,
            Math.floor(
              input.pageSize ?? 20
            )
          )
        )
      : 20;

  const [
    totalCount,
    unreadCount
  ] = await Promise.all([
    prisma.notification.count({
      where: {
        userId
      }
    }),

    prisma.notification.count({
      where: {
        userId,
        readAt: null
      }
    })
  ]);

  const totalPages =
    Math.max(
      1,
      Math.ceil(
        totalCount / pageSize
      )
    );

  const page =
    Math.min(
      requestedPage,
      totalPages
    );

  const notifications =
    await prisma.notification.findMany({
      where: {
        userId
      },

      orderBy: {
        createdAt: 'desc'
      },

      skip:
        (page - 1) *
        pageSize,

      take: pageSize,

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

  const now =
    new Date();

  return {
    items:
      notifications.map(
        notification => {
          return {
            id: notification.id,
            type:
              notification.type,

            title:
              notification.title,

            message:
              notification.message,

            href:
              notification.href,

            entityType:
              notification.entityType,

            entityId:
              notification.entityId,

            unread:
              notification.readAt ===
              null,

            timeLabel:
              formatRelativeTime(
                notification.createdAt,
                now
              ),

            createdLabel:
              formatCreatedLabel(
                notification.createdAt
              )
          };
        }
      ),

    page,
    pageSize,

    totalPages,
    totalCount,

    unreadCount
  };
}