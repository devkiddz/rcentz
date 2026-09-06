import 'server-only';

import { redirect } from 'next/navigation';

import { getCurrentUser } from './get-current-user';

export async function requireAdmin() {
  const user = await getCurrentUser();

  if (!user) {
    redirect('/adminlogin/login?next=/admin');
  }

  if (user.status !== 'ACTIVE') {
    redirect('/');
  }

  if (
    user.role !== 'ADMIN' &&
    user.role !== 'SUPER_ADMIN'
  ) {
    redirect('/dashboard');
  }

  return {
    ...user,
    role: user.role
  };
}

export type AdminUser = Awaited<
  ReturnType<typeof requireAdmin>
>;