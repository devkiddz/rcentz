'use client';

import { useTransition } from 'react';

import { ArrowRight, MessageSquareText } from 'lucide-react';

import { useRouter } from 'next/navigation';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

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

import { markClientConversationRead } from '@/features/client/server/dashboard/client-header-actions';

import type { ClientHeaderMessage } from '@/features/client/types/client-header';

function getInitials(name: string) {
  return (
    name
      .trim()
      .split(/\s+/)
      .slice(0, 2)
      .map(part => part.charAt(0).toUpperCase())
      .join('') || 'R'
  );
}

export function ClientMessagesMenu({
  messages,
  hasUnread
}: {
  messages: ClientHeaderMessage[];
  hasUnread: boolean;
}) {
  const router = useRouter();

  const [pending, startTransition] = useTransition();

  function openConversation(conversationId: string) {
    startTransition(async () => {
      await markClientConversationRead(conversationId);

      router.push(`/dashboard/messages?conversation=${encodeURIComponent(conversationId)}`);

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
                  aria-label="Messages"
                  className="relative flex size-8 cursor-pointer items-center justify-center rounded-lg text-muted transition-colors hover:bg-surface-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-theme-accent/40"
                />
              }
            />
          }>
          <MessageSquareText aria-hidden="true" className="size-4" />

          {hasUnread ? (
            <span
              aria-hidden="true"
              className="absolute right-1.5 top-1.5 size-1.5 rounded-full bg-theme-accent"
            />
          ) : null}
        </TooltipTrigger>

        <TooltipContent>Messages</TooltipContent>
      </Tooltip>

      <DropdownMenuContent align="end" sideOffset={8} className="w-[350px] overflow-hidden p-0">
        <DropdownMenuGroup>
          <DropdownMenuLabel className="px-4 py-3">
            <div>
              <p className="text-[13px] font-semibold text-foreground">Messages</p>

              <p className="mt-0.5 text-[11px] font-normal text-muted">Recent Rcentz conversations</p>
            </div>
          </DropdownMenuLabel>
        </DropdownMenuGroup>

        <DropdownMenuSeparator />

        {messages.length === 0 ? (
          <div className="px-4 py-8 text-center">
            <MessageSquareText className="mx-auto size-5 text-muted" />

            <p className="mt-2 text-[13px] font-medium text-foreground">No conversations yet</p>

            <p className="mt-1 text-[11px] text-muted">Your conversations with Rcentz will appear here.</p>
          </div>
        ) : (
          <DropdownMenuGroup>
            <div className="max-h-[340px] overflow-y-auto py-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
              {messages.map(message => {
                return (
                  <DropdownMenuItem
                    key={message.id}
                    disabled={pending}
                    onClick={() => {
                      openConversation(message.id);
                    }}
                    className="cursor-pointer gap-3 rounded-none px-4 py-3">
                    <div className="relative shrink-0">
                      <Avatar className="size-9">
                        {message.senderImage ? (
                          <AvatarImage src={message.senderImage} alt={message.senderName} />
                        ) : null}

                        <AvatarFallback className="bg-surface-muted text-[10px] font-semibold">
                          {getInitials(message.senderName)}
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
                          className={[
                            'truncate text-[13px]',
                            message.unread ? 'font-semibold text-foreground' : 'font-medium text-foreground'
                          ].join(' ')}>
                          {message.title}
                        </p>

                        <span className="shrink-0 text-[10px] text-muted">{message.timeLabel}</span>
                      </div>

                      <p className="mt-0.5 text-[10px] font-medium text-muted">{message.senderName}</p>

                      <p className="mt-1 line-clamp-2 text-[11px] leading-5 text-muted">{message.preview}</p>
                    </div>
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
              router.push('/dashboard/messages');
            }}
            className="cursor-pointer justify-between rounded-none px-4 py-3">
            <span className="text-[12px] font-medium">View all messages</span>

            <ArrowRight className="size-4" />
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
