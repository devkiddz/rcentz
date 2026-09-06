'use client';

import { useMemo } from 'react';

import { useRouter } from 'next/navigation';

import { ArrowRight, MessageSquareText } from 'lucide-react';

import { Avatar, AvatarFallback } from '@/components/ui/avatar';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';

import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';

type PreviewMessage = {
  id: string;
  senderName: string;
  senderInitials: string;
  message: string;
  time: string;
  unread: boolean;
};

const previewMessages: PreviewMessage[] = [
  {
    id: 'preview-message-01',
    senderName: 'Atlas Studio',
    senderInitials: 'AS',
    message: 'Can we review the latest project delivery update?',
    time: '8m',
    unread: true
  },
  {
    id: 'preview-message-02',
    senderName: 'Nova Retail',
    senderInitials: 'NR',
    message: 'The revised milestone looks good from our side.',
    time: '42m',
    unread: true
  },
  {
    id: 'preview-message-03',
    senderName: 'Northstar Labs',
    senderInitials: 'NL',
    message: 'Please confirm the next available review window.',
    time: '2h',
    unread: false
  }
];

export function AdminMessagesMenu() {
  const router = useRouter();

  const unreadCount = useMemo(() => previewMessages.filter(message => message.unread).length, []);

  function handleViewAllMessages() {
    router.push('/admin/messages');
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
                  aria-label={`Messages${unreadCount > 0 ? `, ${unreadCount} unread` : ''}`}
                  className="relative flex size-8 cursor-pointer items-center justify-center rounded-lg text-muted transition-colors hover:bg-surface-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-theme-accent/40"
                />
              }
            />
          }>
          <MessageSquareText aria-hidden="true" className="size-4" />

          {unreadCount > 0 ? (
            <>
              <span
                aria-hidden="true"
                className="absolute right-1.5 top-1.5 size-1.5 rounded-full bg-theme-accent"
              />

              <span className="sr-only">{unreadCount} unread messages</span>
            </>
          ) : null}
        </TooltipTrigger>

        <TooltipContent>Messages</TooltipContent>
      </Tooltip>

      <DropdownMenuContent align="end" sideOffset={8} className="w-[340px] p-0">
        <DropdownMenuLabel className="px-3 py-3">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-[12px] font-semibold text-foreground">Messages</p>

              <p className="mt-0.5 text-[9px] font-normal text-muted">Recent client conversations</p>
            </div>

            <span className="rounded-full border border-border bg-surface-raised px-2 py-0.5 text-[8px] font-medium uppercase tracking-[0.08em] text-muted">
              Preview
            </span>
          </div>
        </DropdownMenuLabel>

        <DropdownMenuSeparator />

        <div className="max-h-[330px] overflow-y-auto py-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {previewMessages.map(message => (
            <DropdownMenuItem key={message.id} className="cursor-pointer gap-3 rounded-none px-3 py-3">
              <div className="relative shrink-0">
                <Avatar className="size-8">
                  <AvatarFallback className="bg-surface-muted text-[9px] font-semibold">
                    {message.senderInitials}
                  </AvatarFallback>
                </Avatar>

                {message.unread ? (
                  <span
                    aria-hidden="true"
                    className="absolute -right-0.5 -top-0.5 size-2 rounded-full border-2 border-popover bg-theme-accent"
                  />
                ) : null}
              </div>

              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between gap-3">
                  <p
                    className={`truncate text-[11px] ${
                      message.unread ? 'font-semibold text-foreground' : 'font-medium text-foreground'
                    }`}>
                    {message.senderName}
                  </p>

                  <span className="shrink-0 text-[8px] text-muted">{message.time}</span>
                </div>

                <p className="mt-1 line-clamp-2 text-[9px] leading-4 text-muted">{message.message}</p>
              </div>
            </DropdownMenuItem>
          ))}
        </div>

        <DropdownMenuSeparator />

        <DropdownMenuItem
          onClick={handleViewAllMessages}
          className="cursor-pointer justify-between rounded-none px-3 py-2.5">
          <span className="text-[10px] font-medium">View all messages</span>

          <ArrowRight aria-hidden="true" className="size-3.5" />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
