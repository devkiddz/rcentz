'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';

import { CheckSquare2, LogOut, Plus } from 'lucide-react';

import { authClient } from '@/lib/auth-client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

import { Button } from '@/components/ui/button';

type AdminOverviewHeaderProps = {
  user: {
    name: string;
    email: string;
    image: string | null;
  };
};

function getInitials(name: string) {
  return name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map(part => part.charAt(0).toUpperCase())
    .join('');
}

export function AdminOverviewHeader({ user }: AdminOverviewHeaderProps) {
  const router = useRouter();

  const firstName = user.name.trim().split(/\s+/)[0] || user.name;

  async function handleLogout() {
    await authClient.signOut();

    router.push('/login');
    router.refresh();
  }

  return (
    <section className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
      <div className="flex min-w-0 items-center gap-3">
        <Avatar className="size-10 shrink-0 ring-1 ring-border">
          {user.image ? <AvatarImage src={user.image} alt={user.name} /> : null}

          <AvatarFallback className="bg-surface-muted text-xs font-semibold">
            {getInitials(user.name)}
          </AvatarFallback>
        </Avatar>

        <div className="min-w-0">
          <p className="font-mono text-[9px] uppercase tracking-[0.16em] text-theme-accent">
            Operations Overview
          </p>

          <h1 className="mt-1 truncate text-base font-semibold tracking-[-0.03em] text-foreground sm:text-lg">
            Welcome back, {firstName}
          </h1>

          <p className="mt-1 hidden truncate text-[11px] text-muted sm:block">
            Monitor activity across Rcentz Systems.
          </p>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-1.5">
        <Button
          nativeButton={false}
          variant="ghost"
          render={<Link href="/admin/tasks/new" />}
          className="h-8 cursor-pointer rounded-xl bg-surface-muted/55 px-2.5 text-xs font-medium shadow-none transition-all duration-150 hover:-translate-y-px hover:bg-surface-muted">
          <span className="flex size-5 items-center justify-center rounded-lg bg-background/80">
            <CheckSquare2 aria-hidden="true" className="size-3.5" />
          </span>
          Create task
        </Button>

        <Button
          nativeButton={false}
          render={<Link href="/admin/projects/new" />}
          className="h-8 cursor-pointer rounded-xl px-2.5 text-xs font-medium shadow-sm transition-all duration-150 hover:-translate-y-px">
          <span className="flex size-5 items-center justify-center rounded-lg bg-black/10">
            <Plus aria-hidden="true" className="size-3.5" />
          </span>
          New project
        </Button>

        <Button
          type="button"
          variant="ghost"
          onClick={handleLogout}
          className="h-8 cursor-pointer rounded-xl px-2.5 text-xs font-medium text-muted transition-colors hover:bg-surface-muted hover:text-foreground">
          <LogOut aria-hidden="true" className="size-3.5" />
          Logout
        </Button>
      </div>
    </section>
  );
}
