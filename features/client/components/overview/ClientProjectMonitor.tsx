'use client';

import { useState } from 'react';

import Link from 'next/link';

import {
  ArrowLeft,
  ArrowRight,
  CalendarDays,
  CircleDot,
  Globe2,
  ImageIcon,
  MousePointerClick,
  Radio,
  UsersRound
} from 'lucide-react';

import type { ClientOverviewProject } from '@/features/client/server/overview/get-client-overview';

type ClientProjectMonitorProps = {
  projects: ClientOverviewProject[];
};

function formatStatus(status: string) {
  return status
    .toLowerCase()
    .split('_')
    .map(part => part.charAt(0).toUpperCase() + part.slice(1))
    .join(' ');
}

function formatDate(date: Date | null) {
  if (!date) {
    return 'Not set';
  }

  return new Intl.DateTimeFormat('en', {
    month: 'short',
    day: 'numeric'
  }).format(date);
}

function healthClasses(status: ClientOverviewProject['health']['status']) {
  switch (status) {
    case 'AT_RISK':
      return 'bg-rose-500/10 text-rose-500';

    case 'ATTENTION':
      return 'bg-amber-500/10 text-amber-500';

    default:
      return 'bg-theme-accent-faint text-theme-accent';
  }
}

export function ClientProjectMonitor({ projects }: ClientProjectMonitorProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  if (projects.length === 0) {
    return (
      <section className="flex min-h-[520px] items-center justify-center rounded-[18px] border border-border bg-background">
        <div className="text-center">
          <CircleDot aria-hidden="true" className="mx-auto size-5 text-theme-accent" />

          <p className="mt-3 text-sm font-medium text-foreground">No project monitoring yet</p>

          <p className="mt-1 text-[11px] text-muted">Project health will appear here once delivery begins.</p>
        </div>
      </section>
    );
  }

  const safeIndex = Math.min(activeIndex, projects.length - 1);

  const project = projects[safeIndex];

  const hasMultipleProjects = projects.length > 1;

  function showPreviousProject() {
    setActiveIndex(currentIndex => (currentIndex === 0 ? projects.length - 1 : currentIndex - 1));
  }

  function showNextProject() {
    setActiveIndex(currentIndex => (currentIndex === projects.length - 1 ? 0 : currentIndex + 1));
  }

  const projectProgress = Math.min(Math.max(project.progress, 0), 100);

  return (
    <section className="flex min-h-[720px] flex-col overflow-hidden rounded-[18px] border border-border bg-background">
      <div className="flex shrink-0 items-start justify-between gap-3 border-b border-border px-4 py-4 sm:px-5">
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <p className="truncate text-sm font-semibold tracking-[-0.025em] text-foreground">
              {project.name}
            </p>

            <span
              className={[
                'rounded-full',
                'px-2',
                'py-0.5',
                'text-[9px]',
                'font-medium',
                healthClasses(project.health.status)
              ].join(' ')}>
              {project.health.label}
            </span>
          </div>

          <div className="mt-1 flex items-center gap-2">
            <span className="text-[10px] text-muted">Project health monitor</span>

            <span className="size-1 rounded-full bg-border" />

            <span className="text-[10px] font-medium text-foreground">{projects.length} tracked</span>
          </div>
        </div>

        <div className="flex shrink-0 items-center rounded-xl border border-border bg-surface-raised p-0.5">
          <button
            type="button"
            onClick={showPreviousProject}
            disabled={!hasMultipleProjects}
            aria-label="Previous project"
            className="flex size-7 cursor-pointer items-center justify-center rounded-lg text-muted transition-colors hover:bg-surface-muted hover:text-foreground disabled:cursor-default disabled:opacity-35">
            <ArrowLeft aria-hidden="true" className="size-3.5" />
          </button>

          <span className="min-w-12 px-1 text-center text-[9px] font-medium tabular-nums text-muted">
            {safeIndex + 1}
            {' / '}
            {projects.length}
          </span>

          <button
            type="button"
            onClick={showNextProject}
            disabled={!hasMultipleProjects}
            aria-label="Next project"
            className="flex size-7 cursor-pointer items-center justify-center rounded-lg text-muted transition-colors hover:bg-surface-muted hover:text-foreground disabled:cursor-default disabled:opacity-35">
            <ArrowRight aria-hidden="true" className="size-3.5" />
          </button>
        </div>
      </div>

      <div className="flex-1 p-4 sm:p-5">
        <div className="flex flex-col gap-5">
          <ProjectScreenshot project={project} />

          <div className="grid gap-4 sm:grid-cols-[145px_minmax(0,1fr)] sm:items-center">
            <div className="flex justify-center">
              <div
                className="relative flex size-32 items-center justify-center rounded-full"
                style={{
                  background: `conic-gradient(
                    var(--theme-accent) ${projectProgress}%,
                    var(--border) 0
                  )`
                }}>
                <div className="absolute inset-[7px] rounded-full bg-background" />

                <div className="relative z-10 text-center">
                  <p className="text-[26px] font-semibold tracking-[-0.055em] text-foreground">
                    {projectProgress}%
                  </p>

                  <p className="mt-0.5 text-[8px] uppercase tracking-[0.1em] text-muted">progress</p>
                </div>
              </div>
            </div>

            <div className="min-w-0">
              <p className="text-[10px] font-semibold uppercase tracking-[0.1em] text-muted">
                Delivery position
              </p>

              <p className="mt-2 text-[13px] font-semibold text-foreground">{project.health.reason}</p>

              <div className="mt-3 grid gap-2 sm:grid-cols-2">
                <InfoCell label="Status" value={formatStatus(String(project.status))} />

                <InfoCell label="Target" value={formatDate(project.expectedEndAt)} />

                <InfoCell
                  label="Current milestone"
                  value={project.nextMilestone?.title ?? 'No open milestone'}
                />

                <InfoCell label="Website" value={project.domain ?? project.liveUrl ?? 'Not connected'} />
              </div>
            </div>
          </div>

          <div className="border-t border-border pt-4">
            <div className="flex items-center justify-between gap-3">
              <div>
                <div className="flex items-center gap-2">
                  <Radio
                    aria-hidden="true"
                    className={
                      project.analytics.available ? 'size-3.5 text-theme-accent' : 'size-3.5 text-muted'
                    }
                  />

                  <p className="text-[11px] font-semibold text-foreground">Website Intelligence</p>
                </div>

                <p className="mt-1 text-[9px] text-muted">
                  {project.analytics.available ? 'Live management signals' : 'Analytics not active'}
                </p>
              </div>

              {project.analytics.available ? (
                <span className="rounded-full bg-theme-accent-faint px-2 py-1 text-[8px] font-semibold text-theme-accent">
                  Monitoring
                </span>
              ) : null}
            </div>

            <div className="mt-3 grid grid-cols-3 overflow-hidden rounded-xl border border-border bg-border">
              <AnalyticsMetric icon={UsersRound} label="Sessions" value={project.analytics.sessions} />

              <AnalyticsMetric icon={Globe2} label="Views" value={project.analytics.pageViews} />

              <AnalyticsMetric icon={MousePointerClick} label="Clicks" value={project.analytics.clicks} />
            </div>
          </div>

          <div className="flex items-center justify-between gap-4 border-t border-border pt-4">
            <div className="flex items-center gap-1.5 text-[9px] text-muted">
              <CalendarDays aria-hidden="true" className="size-3" />
              Latest project state
            </div>

            <Link
              href={`/dashboard/projects/${project.id}`}
              className="inline-flex items-center gap-1 text-[10px] font-semibold text-theme-accent transition-opacity hover:opacity-75">
              Open project
              <ArrowRight aria-hidden="true" className="size-3" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

function ProjectScreenshot({ project }: { project: ClientOverviewProject }) {
  if (!project.screenshot) {
    return (
      <div className="flex min-h-[180px] items-center justify-center overflow-hidden rounded-2xl border border-border bg-surface-raised sm:min-h-[210px]">
        <div className="text-center">
          <div className="mx-auto flex size-10 items-center justify-center rounded-full border border-border bg-surface-muted">
            <ImageIcon aria-hidden="true" className="size-4 text-muted" />
          </div>

          <p className="mt-3 text-[10px] font-medium text-foreground">No project screenshot</p>

          <p className="mt-1 text-[9px] text-muted">Project media will appear here.</p>
        </div>
      </div>
    );
  }

  return (
    <figure className="relative overflow-hidden rounded-2xl border border-border bg-surface-raised">
      <div className="relative aspect-[16/8] min-h-[180px] overflow-hidden sm:min-h-[210px]">
        <img
          src={project.screenshot.url}
          alt={project.screenshot.alt ?? `${project.name} screenshot`}
          className="size-full object-cover object-top"
        />

        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/65 to-transparent"
        />

        <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-4">
          <div className="min-w-0">
            <p className="truncate text-[12px] font-semibold text-white">{project.name}</p>

            <p className="mt-1 truncate text-[9px] text-white/70">
              {project.screenshot.caption ?? project.domain ?? 'Project preview'}
            </p>
          </div>

          <span className="shrink-0 rounded-full border border-white/15 bg-black/35 px-2.5 py-1 text-[8px] font-medium text-white backdrop-blur-md">
            {formatStatus(String(project.status))}
          </span>
        </div>
      </div>
    </figure>
  );
}

function InfoCell({ label, value }: { label: string; value: string }) {
  return (
    <div className="min-w-0 rounded-xl border border-border bg-surface-raised px-3 py-2.5">
      <p className="text-[8px] uppercase tracking-[0.08em] text-muted">{label}</p>

      <p className="mt-1 truncate text-[10px] font-medium text-foreground">{value}</p>
    </div>
  );
}

function AnalyticsMetric({
  icon: Icon,
  label,
  value
}: {
  icon: typeof UsersRound;
  label: string;
  value: number;
}) {
  return (
    <div className="bg-background px-3 py-3 text-center">
      <Icon aria-hidden="true" className="mx-auto size-3.5 text-theme-accent" />

      <p className="mt-2 text-[15px] font-semibold tracking-[-0.03em] text-foreground">
        {value.toLocaleString()}
      </p>

      <p className="mt-0.5 text-[8px] text-muted">{label}</p>
    </div>
  );
}
