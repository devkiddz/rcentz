'use client';

import type { ReactNode } from 'react';

import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar';

import { AdminHeader } from './AdminHeader';
import { AdminSidebar } from './AdminSidebar';

type AdminShellProps = {
  children: ReactNode;
  user: {
    name: string;
    email: string;
    image: string | null;
    role: 'ADMIN' | 'SUPER_ADMIN';
  };
};

export function AdminShell({ children, user }: AdminShellProps) {
  return (
    <SidebarProvider>
      <AdminSidebar />

      <SidebarInset className="min-w-0 bg-background">
        <AdminHeader user={user} />

        <div className="min-w-0 flex-1">{children}</div>
      </SidebarInset>
    </SidebarProvider>
  );
}
