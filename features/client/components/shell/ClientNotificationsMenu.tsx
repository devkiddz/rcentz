'use client';

import { useTransition } from 'react';

import {
  ArrowRight,
  Bell,
  CircleDollarSign,
  FolderKanban,
  Headphones,
  MessageSquareText,
  Package,
  ReceiptText,
  Sparkles
} from 'lucide-react';

import { useRouter } from 'next/navigation';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';

import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';

import {
  markAllClientNotificationsRead,
  markClientNotificationRead
} from '@/features/client/server/dashboard/client-header-actions';

import type { ClientHeaderNotification } from '@/features/client/types/client-header';

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

    case 'TICKET':
    case 'ASSISTANCE':
      return <Headphones aria-hidden="true" className={className} />;

    case 'ORDER':
    case 'COMMERCE':
      return <Package aria-hidden="true" className={className} />;

    default:
      return <Sparkles aria-hidden="true" className={className} />;
  }
}

export function ClientNotificationsMenu({
  notifications,
  unreadCount
}: {
  notifications: ClientHeaderNotification[];
  unreadCount: number;
}) {
  const router = useRouter();

  const [pending, startTransition] = useTransition();

  function openNotification(notification: ClientHeaderNotification) {
    startTransition(async () => {
      if (notification.unread) {
        await markClientNotificationRead(notification.id);
      }

      router.push(notification.href ?? '/dashboard/notifications');

      router.refresh();
    });
  }

  function markAllRead() {
    startTransition(async () => {
      await markAllClientNotificationsRead();

      router.refresh();
    });
  }

  return (
    <DropdownMenu>
      <Tooltip>
        <TooltipTrigger
          render={
            <DropdownMenuTrigger
              render={
                <button
                  type="button"
                  aria-label={unreadCount > 0 ? `Notifications, ${unreadCount} unread` : 'Notifications'}
                  className="relative flex size-8 cursor-pointer items-center justify-center rounded-lg text-muted transition-colors hover:bg-surface-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-theme-accent/40"
                />
              }
            />
          }>
          <Bell aria-hidden="true" className="size-4" />

          {unreadCount > 0 ? (
            <span aria-hidden="true" className="absolute right-1.5 top-1.5 flex size-1.5">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-theme-accent opacity-50" />

              <span className="relative inline-flex size-1.5 rounded-full bg-theme-accent" />
            </span>
          ) : null}
        </TooltipTrigger>

        <TooltipContent>Notifications</TooltipContent>
      </Tooltip>

      <DropdownMenuContent align="end" sideOffset={8} className="w-[360px] overflow-hidden p-0">
        <DropdownMenuGroup>
          <DropdownMenuLabel className="px-4 py-3">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-[13px] font-semibold text-foreground">Notifications</p>

                <p className="mt-0.5 text-[11px] font-normal text-muted">Your latest Rcentz activity</p>
              </div>

              {unreadCount > 0 ? (
                <button
                  type="button"
                  disabled={pending}
                  onClick={event => {
                    event.preventDefault();
                    event.stopPropagation();

                    markAllRead();
                  }}
                  className="text-[11px] font-semibold text-theme-accent disabled:opacity-50">
                  Mark all read
                </button>
              ) : null}
            </div>
          </DropdownMenuLabel>
        </DropdownMenuGroup>

        <DropdownMenuSeparator />

        {notifications.length === 0 ? (
          <div className="px-4 py-8 text-center">
            <Bell className="mx-auto size-5 text-muted" />

            <p className="mt-2 text-[13px] font-medium text-foreground">No notifications</p>

            <p className="mt-1 text-[11px] text-muted">Your activity will appear here.</p>
          </div>
        ) : (
          <DropdownMenuGroup>
            <div className="max-h-[360px] overflow-y-auto py-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
              {notifications.map(notification => {
                return (
                  <DropdownMenuItem
                    key={notification.id}
                    disabled={pending}
                    onClick={() => {
                      openNotification(notification);
                    }}
                    className="cursor-pointer items-start gap-3 rounded-none px-4 py-3">
                    <div
                      className={[
                        'mt-0.5 flex size-9 shrink-0 items-center justify-center rounded-xl',
                        notification.unread
                          ? 'bg-theme-accent-faint text-theme-accent'
                          : 'bg-surface-muted text-muted'
                      ].join(' ')}>
                      <NotificationIcon type={notification.type} />
                    </div>

                    <div className="min-w-0 flex-1">
                      <div className="flex items-start justify-between gap-3">
                        <p
                          className={[
                            'line-clamp-1 text-[13px]',
                            notification.unread
                              ? 'font-semibold text-foreground'
                              : 'font-medium text-foreground'
                          ].join(' ')}>
                          {notification.title}
                        </p>

                        <span className="shrink-0 text-[10px] text-muted">{notification.timeLabel}</span>
                      </div>

                      <p className="mt-1 line-clamp-2 text-[11px] leading-5 text-muted">
                        {notification.message}
                      </p>
                    </div>

                    {notification.unread ? (
                      <span
                        aria-hidden="true"
                        className="mt-2 size-1.5 shrink-0 rounded-full bg-theme-accent"
                      />
                    ) : null}
                  </DropdownMenuItem>
                );
              })}
            </div>
          </DropdownMenuGroup>
        )}

        <DropdownMenuSeparator />

        <DropdownMenuGroup>
          <DropdownMenuItem
            onClick={() => {
              router.push('/dashboard/notifications');
            }}
            className="cursor-pointer justify-between rounded-none px-4 py-3">
            <span className="text-[12px] font-medium">View all notifications</span>

            <ArrowRight className="size-4" />
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
