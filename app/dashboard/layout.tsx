import type { ReactNode } from 'react';

import { requireAuth } from '@/features/auth/server/require-auth';

import { ClientShell } from '@/features/client/components/shell/ClientShell';

import { DashboardCanvas } from '@/ui-shell/dashboard/DashboardCanvas';

type DashboardLayoutProps = {
  children: ReactNode;
};

export default async function DashboardLayout({ children }: DashboardLayoutProps) {
  const user = await requireAuth('/dashboard');

  return (
    <ClientShell
      user={{
        name: user.name,
        email: user.email,
        image: user.image
      }}>
      <DashboardCanvas>{children}</DashboardCanvas>
    </ClientShell>
  );
}
