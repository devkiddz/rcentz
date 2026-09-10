'use client';

import type { ReactNode } from 'react';

import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar';

import { AdminHeader } from './AdminHeader';
import { AdminMobileNav } from './AdminMobileNav';
import { AdminSidebar } from './AdminSidebar';
import { AdminWorkspaceHeader } from './AdminWorkspaceHeader';

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
    <SidebarProvider className="bg-background">
      <AdminSidebar />

      <SidebarInset className="min-w-0 bg-background">
        <AdminHeader user={user} />

        <AdminWorkspaceHeader
          user={{
            name: user.name,
            email: user.email,
            image: user.image
          }}
        />

        <div className="min-w-0 flex-1 pb-24 md:pb-0">{children}</div>
      </SidebarInset>

      <AdminMobileNav />
    </SidebarProvider>
  );
}
