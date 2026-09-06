'use client';

import { useMemo } from 'react';

import { useRouter } from 'next/navigation';

import {
  ArrowRight,
  Bell,
  CircleDollarSign,
  FolderKanban,
  MessageSquareText,
  ReceiptText
} from 'lucide-react';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';

import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';

type NotificationIconName = 'project' | 'payment' | 'message' | 'invoice';

type PreviewNotification = {
  id: string;
  title: string;
  message: string;
  time: string;
  unread: boolean;
  iconName: NotificationIconName;
};

const previewNotifications: PreviewNotification[] = [
  {
    id: 'preview-notification-01',
    title: 'Project milestone updated',
    message: 'A project milestone moved into review.',
    time: '12m',
    unread: true,
    iconName: 'project'
  },
  {
    id: 'preview-notification-02',
    title: 'Payment received',
    message: 'A successful payment has been recorded.',
    time: '1h',
    unread: true,
    iconName: 'payment'
  },
  {
    id: 'preview-notification-03',
    title: 'New client message',
    message: 'A client sent a new project conversation message.',
    time: '3h',
    unread: false,
    iconName: 'message'
  },
  {
    id: 'preview-notification-04',
    title: 'Invoice requires attention',
    message: 'An outstanding invoice is approaching its due date.',
    time: '5h',
    unread: false,
    iconName: 'invoice'
  }
];

function NotificationIcon({ iconName }: { iconName: NotificationIconName }) {
  const iconClassName = 'size-3.5';

  switch (iconName) {
    case 'project':
      return <FolderKanban aria-hidden="true" className={iconClassName} />;

    case 'payment':
      return <CircleDollarSign aria-hidden="true" className={iconClassName} />;

    case 'message':
      return <MessageSquareText aria-hidden="true" className={iconClassName} />;

    case 'invoice':
      return <ReceiptText aria-hidden="true" className={iconClassName} />;
  }
}

export function AdminNotificationsMenu() {
  const router = useRouter();

  const unreadCount = useMemo(
    () => previewNotifications.filter(notification => notification.unread).length,
    []
  );

  function handleViewAllNotifications() {
    router.push('/admin/notifications');
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
                  aria-label={`Notifications${unreadCount > 0 ? `, ${unreadCount} unread` : ''}`}
                  className="relative flex size-8 cursor-pointer items-center justify-center rounded-lg text-muted transition-colors hover:bg-surface-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-theme-accent/40"
                />
              }
            />
          }>
          <Bell aria-hidden="true" className="size-4" />

          {unreadCount > 0 ? (
            <>
              <span aria-hidden="true" className="absolute right-1.5 top-1.5 flex size-1.5">
                <span className="absolute inline-flex size-full animate-ping rounded-full bg-theme-accent opacity-50" />

                <span className="relative inline-flex size-1.5 rounded-full bg-theme-accent" />
              </span>

              <span className="sr-only">{unreadCount} unread notifications</span>
            </>
          ) : null}
        </TooltipTrigger>

        <TooltipContent>Notifications</TooltipContent>
      </Tooltip>

      <DropdownMenuContent align="end" sideOffset={8} className="w-[360px] p-0">
        <DropdownMenuLabel className="px-3 py-3">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-[12px] font-semibold text-foreground">Notifications</p>

              <p className="mt-0.5 text-[9px] font-normal text-muted">System and operational activity</p>
            </div>

            <div className="flex items-center gap-2">
              {unreadCount > 0 ? (
                <span className="rounded-full bg-theme-accent-faint px-2 py-0.5 text-[8px] font-semibold text-theme-accent">
                  {unreadCount} unread
                </span>
              ) : null}

              <span className="rounded-full border border-border bg-surface-raised px-2 py-0.5 text-[8px] font-medium uppercase tracking-[0.08em] text-muted">
                Preview
              </span>
            </div>
          </div>
        </DropdownMenuLabel>

        <DropdownMenuSeparator />

        <div className="max-h-[350px] overflow-y-auto py-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {previewNotifications.map(notification => (
            <DropdownMenuItem
              key={notification.id}
              className="cursor-pointer items-start gap-3 rounded-none px-3 py-3">
              <div
                className={`mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-lg ${
                  notification.unread
                    ? 'bg-theme-accent-faint text-theme-accent'
                    : 'bg-surface-muted text-muted'
                }`}>
                <NotificationIcon iconName={notification.iconName} />
              </div>

              <div className="min-w-0 flex-1">
                <div className="flex items-start justify-between gap-3">
                  <p
                    className={`truncate text-[11px] ${
                      notification.unread ? 'font-semibold text-foreground' : 'font-medium text-foreground'
                    }`}>
                    {notification.title}
                  </p>

                  <span className="shrink-0 text-[8px] text-muted">{notification.time}</span>
                </div>

                <p className="mt-1 line-clamp-2 text-[9px] leading-4 text-muted">{notification.message}</p>
              </div>

              {notification.unread ? (
                <span aria-hidden="true" className="mt-2 size-1.5 shrink-0 rounded-full bg-theme-accent" />
              ) : null}
            </DropdownMenuItem>
          ))}
        </div>

        <DropdownMenuSeparator />

        <DropdownMenuItem
          onClick={handleViewAllNotifications}
          className="cursor-pointer justify-between rounded-none px-3 py-2.5">
          <span className="text-[10px] font-medium">View all notifications</span>

          <ArrowRight aria-hidden="true" className="size-3.5" />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
