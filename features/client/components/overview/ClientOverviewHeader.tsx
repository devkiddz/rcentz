import Link from 'next/link';

import { ArrowRight, FolderKanban } from 'lucide-react';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

type ClientOverviewHeaderProps = {
  user: {
    name: string;
    email: string;
    image: string | null;
  };

  projectCount: number;
};

function getInitials(name: string) {
  return name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map(part => part.charAt(0).toUpperCase())
    .join('');
}

export function ClientOverviewHeader({ user, projectCount }: ClientOverviewHeaderProps) {
  const firstName = user.name.trim().split(/\s+/)[0] ?? user.name;

  return (
    <section className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
      <div className="flex min-w-0 items-center gap-3">
        <Avatar className="size-9 shrink-0 ring-1 ring-border sm:size-10">
          {user.image ? <AvatarImage src={user.image} alt={user.name} /> : null}

          <AvatarFallback className="bg-surface-muted text-[11px] font-semibold sm:text-xs">
            {getInitials(user.name)}
          </AvatarFallback>
        </Avatar>

        <div className="min-w-0">
          <p className="font-mono text-[8px] uppercase tracking-[0.16em] text-theme-accent sm:text-[9px]">
            Account Overview
          </p>

          <h1 className="mt-1 truncate text-[15px] font-semibold tracking-[-0.03em] text-foreground sm:text-lg">
            Welcome back, {firstName}
          </h1>

          <p className="mt-1 hidden truncate text-[11px] text-muted sm:block">
            Monitor your projects, requests, support and billing.
          </p>
        </div>
      </div>

      <Link
        href="/dashboard/projects"
        className="inline-flex h-8 w-fit items-center gap-2 rounded-xl border border-border bg-surface-raised px-3 text-[11px] font-medium text-foreground transition-all hover:-translate-y-px hover:bg-surface-muted">
        <FolderKanban aria-hidden="true" className="size-3.5 text-theme-accent" />

        {projectCount === 1 ? 'View project' : 'View projects'}

        <ArrowRight aria-hidden="true" className="size-3" />
      </Link>
    </section>
  );
}
