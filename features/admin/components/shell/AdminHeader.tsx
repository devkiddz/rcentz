'use client';

import { Menu } from 'lucide-react';

import { SidebarTrigger } from '@/components/ui/sidebar';

import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';

import { AdminAccountMenu } from './AdminAccountMenu';
import { AdminCommandSearch } from './AdminCommandSearch';
import { AdminMessagesMenu } from './AdminMessagesMenu';
import { AdminNotificationsMenu } from './AdminNotificationsMenu';
import { AdminThemeToggle } from './AdminThemeToggle';

type AdminHeaderProps = {
  user: {
    name: string;
    email: string;
    image: string | null;
    role: 'ADMIN' | 'SUPER_ADMIN';
  };
};

export function AdminHeader({ user }: AdminHeaderProps) {
  return (
    <header className="sticky top-0 z-30 bg-background/90 px-3 py-2.5 backdrop-blur-md sm:px-4">
      <div className="flex min-w-0 items-center gap-2">
        <Tooltip>
          <TooltipTrigger
            render={
              <SidebarTrigger
                aria-label="Toggle sidebar"
                className="size-8 shrink-0 cursor-w-resize rounded-lg border-0 bg-transparent text-muted shadow-none transition-colors hover:bg-surface-muted hover:text-foreground"
              />
            }>
            <Menu aria-hidden="true" className="size-4" />
          </TooltipTrigger>

          <TooltipContent>Toggle sidebar</TooltipContent>
        </Tooltip>

        <div className="hidden min-w-0 sm:block">
          <p className="truncate text-[12px] font-medium tracking-[-0.02em] text-foreground">Admin</p>

          <p className="truncate text-[9px] text-muted">Rcentz Systems</p>
        </div>

        <div className="ml-auto flex min-w-0 items-center gap-0.5">
          <AdminCommandSearch />

          <AdminMessagesMenu />

          <AdminNotificationsMenu />

          <AdminThemeToggle />

          <div className="ml-1">
            <AdminAccountMenu user={user} />
          </div>
        </div>
      </div>
    </header>
  );
}
