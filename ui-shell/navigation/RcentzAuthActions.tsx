'use client';

import Link from 'next/link';
import { CircleUserRound, LoaderCircle } from 'lucide-react';

import { authClient } from '@/lib/auth-client';

type RcentzAuthActionsProps = {
  mobile?: boolean;
  onNavigate?: () => void;
};

export function RcentzAuthActions({ mobile = false, onNavigate }: RcentzAuthActionsProps) {
  const { data: session, isPending } = authClient.useSession();

  if (isPending) {
    return (
      <div
        aria-label="Checking account"
        className={['flex items-center', mobile ? 'h-9 w-full px-3' : 'h-8 justify-center px-2'].join(' ')}>
        <LoaderCircle aria-hidden="true" className="size-3.5 animate-spin text-muted" />
      </div>
    );
  }

  if (session?.user) {
    return (
      <Link
        href="/dashboard"
        onClick={onNavigate}
        className={[
          'inline-flex items-center gap-2 rounded-full',

          'border border-border',
          'bg-surface-muted',

          'font-medium text-foreground',

          'transition-[background-color,border-color,color] duration-200',

          'hover:border-border-strong',
          'hover:bg-secondary',

          mobile ? 'h-9 w-full px-3 text-[13px]' : 'h-8 px-2.5 text-[12px]'
        ].join(' ')}>
        <CircleUserRound aria-hidden="true" className="size-3.5" />

        <span>Dashboard</span>
      </Link>
    );
  }

  return (
    <Link
      href="/login"
      onClick={onNavigate}
      className={[
        'inline-flex items-center justify-center rounded-full',

        'border border-transparent',

        'font-medium text-muted',

        'transition-[color,background-color,border-color] duration-200',

        'hover:border-border',
        'hover:bg-surface-muted',
        'hover:text-foreground',

        mobile ? 'h-9 w-full px-3 text-[13px]' : 'h-8 px-2.5 text-[12px]'
      ].join(' ')}>
      Sign in
    </Link>
  );
}
