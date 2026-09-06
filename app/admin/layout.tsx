import type { ReactNode } from 'react';

import { AdminShell } from '@/features/admin/components/shell/AdminShell';
import { requireAdmin } from '@/features/auth/server/require-admin';

type AdminLayoutProps = {
  children: ReactNode;
};

export default async function AdminLayout({ children }: AdminLayoutProps) {
  const user = await requireAdmin();

  return (
    <AdminShell
      user={{
        name: user.name,
        email: user.email,
        image: user.image,
        role: user.role
      }}>
      {children}
    </AdminShell>
  );
}
