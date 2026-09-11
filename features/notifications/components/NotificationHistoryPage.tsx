'use client';

import { useTransition } from 'react';

import Link from 'next/link';

import {
  ArrowLeft,
  ArrowRight,
  Bell,
  BriefcaseBusiness,
  CircleDollarSign,
  FolderKanban,
  Headphones,
  Heart,
  MessageCircle,
  MessageSquareText,
  Package,
  ReceiptText,
  Repeat2,
  Sparkles
} from 'lucide-react';

import { useRouter } from 'next/navigation';

import {
  markAdminNotificationRead,
  markAllAdminNotificationsRead
} from '@/features/admin/server/dashboard/admin-header-actions';

import {
  markAllClientNotificationsRead,
  markClientNotificationRead
} from '@/features/client/server/dashboard/client-header-actions';

import type {
  NotificationHistoryData,
  NotificationHistoryItem
} from '@/features/notifications/types/notification-history';

type NotificationHistoryPageProps = {
  mode: 'admin' | 'client';

  data: NotificationHistoryData;
};

function NotificationIcon({ type }: { type: string }) {
  const className = 'size-4';

  switch (type) {
    case 'INVOICE':
      return <ReceiptText aria-hidden="true" className={className} />;

    case 'PAYMENT':
      return <CircleDollarSign aria-hidden="true" className={className} />;

    case 'PROJECT':
    case 'PROJECT_UPDATE':
      return <FolderKanban aria-hidden="true" className={className} />;

    case 'MESSAGE':
      return <MessageSquareText aria-hidden="true" className={className} />;

    case 'SERVICE':
      return <BriefcaseBusiness aria-hidden="true" className={className} />;

    case 'SUBSCRIPTION':
      return <Repeat2 aria-hidden="true" className={className} />;

    case 'ORDER':
    case 'COMMERCE':
      return <Package aria-hidden="true" className={className} />;

    case 'COMMENT':
      return <MessageCircle aria-hidden="true" className={className} />;

    case 'REACTION':
      return <Heart aria-hidden="true" className={className} />;

    case 'TICKET':
    case 'ASSISTANCE':
      return <Headphones aria-hidden="true" className={className} />;

    case 'SYSTEM':
    default:
      return <Sparkles aria-hidden="true" className={className} />;
  }
}

export function NotificationHistoryPage({ mode, data }: NotificationHistoryPageProps) {
  const router = useRouter();

  const [pending, startTransition] = useTransition();

  const isAdmin = mode === 'admin';

  const basePath = isAdmin ? '/admin/notifications' : '/dashboard/notifications';

  const description = isAdmin
    ? 'System and client activity requiring your attention.'
    : 'Billing, project and account activity from Rcentz.';

  async function markOne(notificationId: string) {
    if (isAdmin) {
      return markAdminNotificationRead(notificationId);
    }

    return markClientNotificationRead(notificationId);
  }

  async function markAll() {
    if (isAdmin) {
      return markAllAdminNotificationsRead();
    }

    return markAllClientNotificationsRead();
  }

  function openNotification(notification: NotificationHistoryItem) {
    startTransition(async () => {
      if (notification.unread) {
        await markOne(notification.id);
      }

      if (notification.href) {
        router.push(notification.href);

        return;
      }

      router.refresh();
    });
  }

  function handleMarkAll() {
    startTransition(async () => {
      await markAll();

      router.refresh();
    });
  }

  const firstVisible = data.totalCount === 0 ? 0 : (data.page - 1) * data.pageSize + 1;

  const lastVisible = Math.min(data.page * data.pageSize, data.totalCount);

  return (
    <main className="px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
      <div className="mx-auto w-full max-w-[1100px] space-y-6">
        <section className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-theme-accent">
              Rcentz / Activity
            </p>

            <h1 className="mt-2 text-2xl font-semibold tracking-[-0.04em] text-foreground sm:text-3xl">
              Notifications
            </h1>

            <p className="mt-2 max-w-2xl text-sm leading-6 text-muted">{description}</p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {data.unreadCount > 0 ? (
              <span className="rounded-full border border-border bg-surface-raised px-3 py-2 text-xs font-semibold text-foreground">
                {data.unreadCount} unread
              </span>
            ) : (
              <span className="rounded-full border border-border bg-surface-raised px-3 py-2 text-xs font-medium text-muted">
                All caught up
              </span>
            )}

            {data.unreadCount > 0 ? (
              <button
                type="button"
                disabled={pending}
                onClick={handleMarkAll}
                className="inline-flex h-9 items-center justify-center rounded-xl bg-foreground px-4 text-xs font-semibold text-background transition-opacity hover:opacity-85 disabled:cursor-not-allowed disabled:opacity-50">
                Mark all read
              </button>
            ) : null}
          </div>
        </section>

        <section className="overflow-hidden rounded-2xl border border-border bg-surface">
          <div className="border-b border-border bg-surface-raised px-5 py-4">
            <div className="flex items-center gap-3">
              <div className="flex size-9 items-center justify-center rounded-xl border border-border bg-background">
                <Bell className="size-4 text-theme-accent" />
              </div>

              <div>
                <h2 className="text-sm font-semibold text-foreground">Activity history</h2>

                <p className="mt-0.5 text-xs text-muted">
                  {data.totalCount} notification
                  {data.totalCount === 1 ? '' : 's'}
                </p>
              </div>
            </div>
          </div>

          {data.items.length === 0 ? (
            <div className="px-6 py-16 text-center">
              <div className="mx-auto flex size-12 items-center justify-center rounded-2xl border border-border bg-surface-muted">
                <Bell className="size-5 text-muted" />
              </div>

              <h3 className="mt-4 text-base font-semibold text-foreground">No notifications yet</h3>

              <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-muted">
                New Rcentz activity will appear here as business events occur.
              </p>
            </div>
          ) : (
            <div className="divide-y divide-border">
              {data.items.map(notification => {
                return (
                  <button
                    key={notification.id}
                    type="button"
                    disabled={pending}
                    onClick={() => {
                      openNotification(notification);
                    }}
                    className="group flex w-full items-start gap-4 px-5 py-5 text-left transition-colors hover:bg-surface-muted/70 disabled:cursor-wait disabled:opacity-70">
                    <div
                      className={[
                        'mt-0.5 flex size-10 shrink-0 items-center justify-center rounded-xl border',
                        notification.unread
                          ? 'border-theme-accent/20 bg-theme-accent-faint text-theme-accent'
                          : 'border-border bg-surface-muted text-muted'
                      ].join(' ')}>
                      <NotificationIcon type={notification.type} />
                    </div>

                    <div className="min-w-0 flex-1">
                      <div className="flex flex-col gap-1 sm:flex-row sm:items-start sm:justify-between sm:gap-4">
                        <div className="min-w-0">
                          <div className="flex items-center gap-2">
                            <p
                              className={[
                                'truncate text-[15px]',
                                notification.unread
                                  ? 'font-semibold text-foreground'
                                  : 'font-medium text-foreground'
                              ].join(' ')}>
                              {notification.title}
                            </p>

                            {notification.unread ? (
                              <span
                                aria-label="Unread"
                                className="size-2 shrink-0 rounded-full bg-theme-accent"
                              />
                            ) : null}
                          </div>

                          <p className="mt-1 text-[13px] leading-6 text-muted">{notification.message}</p>
                        </div>

                        <div className="shrink-0 text-left sm:text-right">
                          <p className="text-[11px] font-medium text-muted">{notification.timeLabel}</p>

                          <p className="mt-0.5 text-[10px] text-muted/70">{notification.createdLabel}</p>
                        </div>
                      </div>

                      <div className="mt-3 flex flex-wrap items-center gap-2">
                        <span className="rounded-full border border-border bg-background px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.08em] text-muted">
                          {notification.type.replaceAll('_', ' ')}
                        </span>

                        {notification.entityType ? (
                          <span className="text-[10px] text-muted">{notification.entityType}</span>
                        ) : null}

                        {notification.href ? (
                          <span className="ml-auto inline-flex items-center gap-1 text-[11px] font-semibold text-theme-accent opacity-80 transition-opacity group-hover:opacity-100">
                            Open
                            <ArrowRight className="size-3.5" />
                          </span>
                        ) : null}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          )}

          <div className="flex flex-col gap-3 border-t border-border bg-surface-muted px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-xs text-muted">
              Showing {firstVisible}–{lastVisible} of {data.totalCount}
            </p>

            {data.totalPages > 1 ? (
              <div className="flex items-center gap-2">
                {data.page > 1 ? (
                  <Link
                    href={`${basePath}?page=${data.page - 1}`}
                    className="inline-flex h-9 items-center gap-2 rounded-xl border border-border bg-background px-3 text-xs font-semibold text-foreground transition-colors hover:bg-surface-raised">
                    <ArrowLeft className="size-3.5" />
                    Previous
                  </Link>
                ) : (
                  <span className="inline-flex h-9 items-center gap-2 rounded-xl border border-border bg-background px-3 text-xs font-semibold text-muted opacity-40">
                    <ArrowLeft className="size-3.5" />
                    Previous
                  </span>
                )}

                <span className="px-2 text-xs font-medium text-muted">
                  {data.page} / {data.totalPages}
                </span>

                {data.page < data.totalPages ? (
                  <Link
                    href={`${basePath}?page=${data.page + 1}`}
                    className="inline-flex h-9 items-center gap-2 rounded-xl border border-border bg-background px-3 text-xs font-semibold text-foreground transition-colors hover:bg-surface-raised">
                    Next
                    <ArrowRight className="size-3.5" />
                  </Link>
                ) : (
                  <span className="inline-flex h-9 items-center gap-2 rounded-xl border border-border bg-background px-3 text-xs font-semibold text-muted opacity-40">
                    Next
                    <ArrowRight className="size-3.5" />
                  </span>
                )}
              </div>
            ) : null}
          </div>
        </section>
      </div>
    </main>
  );
}
