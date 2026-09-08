import 'server-only';

import { redirect } from 'next/navigation';

import { resolveSafeRedirect } from '@/features/auth/lib/resolve-safe-redirect';

import { getCurrentUser } from './get-current-user';

export async function requireAuth(nextPath = '/dashboard') {
  const user = await getCurrentUser();

  if (!user) {
    const destination = resolveSafeRedirect(nextPath, '/dashboard');

    redirect(
      `/login?next=${encodeURIComponent(destination)}`
    );
  }

  if (user.status !== 'ACTIVE') {
    redirect('/');
  }

  return user;
}

export type AuthenticatedUser = Awaited<
  ReturnType<typeof requireAuth>
>;