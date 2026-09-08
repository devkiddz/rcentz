'use client';

import { useMemo, useState } from 'react';

import Link from 'next/link';

import {
  Activity,
  ArrowUpRight,
  Eye,
  Layers3,
  ListChecks,
  Milestone,
  MousePointerClick,
  Plus,
  Radio
} from 'lucide-react';

import type { ClientProjectMonitor } from '@/features/client/server/projects/get-client-project-monitors';

type ClientProjectsPageProps = {
  projects: ClientProjectMonitor[];
};

type ProjectFilter = 'ALL' | 'ACTIVE' | 'MANAGED' | 'COMPLETED';

const completedStatuses = new Set(['COMPLETED', 'CANCELLED']);

function formatLabel(value: string | null) {
  if (!value) {
    return 'Unknown';
  }

  return value
    .toLowerCase()
    .split('_')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

function formatNumber(value: number) {
  return new Intl.NumberFormat('en-NG').format(value);
}

function formatRelativeDate(value: Date | string) {
  const date = value instanceof Date ? value : new Date(value);

  const now = Date.now();

  const difference = now - date.getTime();

  const minutes = Math.floor(difference / 60_000);

  if (minutes < 1) {
    return 'Just now';
  }

  if (minutes < 60) {
    return `${minutes}m ago`;
  }

  const hours = Math.floor(minutes / 60);

  if (hours < 24) {
    return `${hours}h ago`;
  }

  const days = Math.floor(hours / 24);

  if (days < 7) {
    return `${days}d ago`;
  }

  return new Intl.DateTimeFormat('en-NG', {
    day: 'numeric',
    month: 'short'
  }).format(date);
}

function getAnalyticsLabel(project: ClientProjectMonitor) {
  if (!project.analytics.available) {
    return 'Analytics unavailable';
  }

  if (project.analytics.status !== 'ACTIVE') {
    return `Analytics ${formatLabel(project.analytics.status).toLowerCase()}`;
  }

  if (project.analytics.totalEvents === 0) {
    return 'Analytics active · Awaiting traffic';
  }

  return 'Analytics active';
}

export function ClientProjectsPage({ projects }: ClientProjectsPageProps) {
  const [filter, setFilter] = useState<ProjectFilter>('ALL');

  const counts = useMemo(() => {
    const active = projects.filter(project => !completedStatuses.has(project.status)).length;

    const managed = projects.filter(
      project => project.analytics.available && project.analytics.status === 'ACTIVE'
    ).length;

    const completed = projects.filter(project => completedStatuses.has(project.status)).length;

    return {
      all: projects.length,

      active,
      managed,
      completed
    };
  }, [projects]);

  const filteredProjects = useMemo(() => {
    switch (filter) {
      case 'ACTIVE':
        return projects.filter(project => !completedStatuses.has(project.status));

      case 'MANAGED':
        return projects.filter(
          project => project.analytics.available && project.analytics.status === 'ACTIVE'
        );

      case 'COMPLETED':
        return projects.filter(project => completedStatuses.has(project.status));

      case 'ALL':
      default:
        return projects;
    }
  }, [filter, projects]);

  const filters: Array<{
    key: ProjectFilter;
    label: string;
    count: number;
  }> = [
    {
      key: 'ALL',
      label: 'All',
      count: counts.all
    },
    {
      key: 'ACTIVE',
      label: 'Active',
      count: counts.active
    },
    {
      key: 'MANAGED',
      label: 'Managed',
      count: counts.managed
    },
    {
      key: 'COMPLETED',
      label: 'Completed',
      count: counts.completed
    }
  ];

  return (
    <main className="py-6 sm:py-8">
      <div className="space-y-7">
        <section className="px-1">
          <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">
            Projects
          </p>

          <div className="mt-2 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h1 className="text-xl font-semibold tracking-[-0.04em] text-foreground sm:text-2xl">
                Your projects
              </h1>

              <p className="mt-1 max-w-2xl text-xs leading-5 text-muted-foreground">
                Everything Rcentz is building, managing and monitoring for you.
              </p>
            </div>

            <div className="flex items-center gap-2 text-[9px] text-muted-foreground">
              <span className="font-semibold text-foreground">{projects.length}</span>
              project
              {projects.length === 1 ? '' : 's'}
            </div>
          </div>
        </section>

        <section className="flex gap-2 overflow-x-auto px-1 pb-1">
          {filters.map(item => {
            const active = filter === item.key;

            return (
              <button
                key={item.key}
                type="button"
                onClick={() => setFilter(item.key)}
                className={
                  active
                    ? 'inline-flex h-8 shrink-0 items-center gap-2 rounded-full border border-foreground bg-foreground px-3 text-[9px] font-medium text-background'
                    : 'inline-flex h-8 shrink-0 items-center gap-2 rounded-full border border-border bg-surface px-3 text-[9px] font-medium text-muted-foreground transition-colors hover:text-foreground'
                }>
                {item.label}

                <span className={active ? 'text-background/60' : 'text-muted-foreground'}>{item.count}</span>
              </button>
            );
          })}
        </section>

        <section>
          <div
            className="grid justify-start gap-4"
            style={{
              gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 300px), 360px))'
            }}>
            {filteredProjects.map(project => (
              <ProjectTile key={project.id} project={project} />
            ))}

            <RequestProjectTile />
          </div>
        </section>
      </div>
    </main>
  );
}

function ProjectTile({ project }: { project: ClientProjectMonitor }) {
  const hasScreenshot = Boolean(project.screenshot?.url);

  return (
    <Link
      href={`/dashboard/projects/${project.id}`}
      className="group flex min-h-[430px] flex-col overflow-hidden rounded-[22px] border border-border bg-surface transition-[border-color,transform] duration-200 hover:-translate-y-0.5 hover:border-foreground/20">
      <div
        className="relative h-28 overflow-hidden border-b border-border bg-surface-muted"
        style={
          hasScreenshot
            ? {
                backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0.05), rgba(0,0,0,0.48)), url("${project.screenshot?.url}")`,

                backgroundSize: 'cover',

                backgroundPosition: 'center'
              }
            : undefined
        }>
        {!hasScreenshot ? (
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,var(--theme-accent-faint),transparent_55%)]" />
        ) : null}

        <div className="absolute inset-x-0 top-0 flex items-start justify-between gap-3 p-4">
          <span className="rounded-full border border-white/15 bg-black/35 px-2.5 py-1 text-[8px] font-semibold uppercase tracking-[0.1em] text-white backdrop-blur-md">
            {formatLabel(project.status)}
          </span>

          <span className="flex size-8 items-center justify-center rounded-full border border-white/15 bg-black/35 text-white backdrop-blur-md">
            <ArrowUpRight
              aria-hidden="true"
              className="size-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            />
          </span>
        </div>
      </div>

      <div className="flex flex-1 flex-col p-5">
        <div>
          <p className="text-[9px] font-medium uppercase tracking-[0.12em] text-muted-foreground">
            {formatLabel(project.type)}
          </p>

          <h2 className="mt-1 truncate text-base font-semibold tracking-[-0.025em] text-foreground">
            {project.name}
          </h2>

          <p className="mt-1 truncate text-[9px] text-muted-foreground">
            {project.domain ?? 'Rcentz managed project'}
          </p>
        </div>

        <div className="mt-5">
          <div className="flex items-center justify-between gap-3">
            <span className="text-[9px] font-medium text-muted-foreground">Delivery progress</span>

            <span className="text-[10px] font-semibold text-foreground">{project.progress}%</span>
          </div>

          <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-surface-muted">
            <div
              className="h-full rounded-full bg-theme-accent"
              style={{
                width: `${Math.max(0, Math.min(100, project.progress))}%`
              }}
            />
          </div>
        </div>

        <div className="mt-5 grid grid-cols-3 divide-x divide-border rounded-[14px] border border-border bg-background/40">
          <DeliveryMetric icon={Milestone} label="Milestones" value={project.milestoneSummary.total} />

          <DeliveryMetric icon={Layers3} label="Features" value={project.featureCount} />

          <DeliveryMetric icon={ListChecks} label="Tasks" value={project.taskSummary.total} />
        </div>

        <div className="mt-5 border-t border-border pt-4">
          <div className="mb-3 flex items-center justify-between gap-3">
            <div className="flex items-center gap-1.5">
              <Activity aria-hidden="true" className="size-3 text-theme-accent" />

              <p className="text-[9px] font-semibold uppercase tracking-[0.1em] text-muted-foreground">
                Live performance
              </p>
            </div>

            <span className="max-w-[145px] truncate text-[8px] text-muted-foreground">
              {getAnalyticsLabel(project)}
            </span>
          </div>

          <div className="grid grid-cols-3 gap-2">
            <AnalyticsMetric
              icon={Radio}
              label="Sessions"
              value={project.analytics.available ? formatNumber(project.analytics.sessions) : '—'}
            />

            <AnalyticsMetric
              icon={Eye}
              label="Views"
              value={project.analytics.available ? formatNumber(project.analytics.pageViews) : '—'}
            />

            <AnalyticsMetric
              icon={MousePointerClick}
              label="Clicks"
              value={project.analytics.available ? formatNumber(project.analytics.clicks) : '—'}
            />
          </div>
        </div>

        <div className="mt-auto flex items-end justify-between gap-4 pt-5">
          <div className="min-w-0">
            <div className="flex items-center gap-1.5">
              <span
                className={[
                  'size-1.5 rounded-full',

                  project.health.status === 'ON_TRACK' ? 'bg-theme-accent' : '',

                  project.health.status === 'ATTENTION' ? 'bg-amber-500' : '',

                  project.health.status === 'AT_RISK' ? 'bg-red-500' : ''
                ].join(' ')}
              />

              <p className="text-[9px] font-medium text-foreground">{project.health.label}</p>
            </div>

            <p className="mt-1 truncate text-[8px] text-muted-foreground">
              Updated {formatRelativeDate(project.updatedAt)}
            </p>
          </div>

          <span className="shrink-0 text-[9px] font-medium text-muted-foreground transition-colors group-hover:text-foreground">
            Open project
          </span>
        </div>
      </div>
    </Link>
  );
}

function DeliveryMetric({
  icon: Icon,
  label,
  value
}: {
  icon: typeof Milestone;

  label: string;
  value: number;
}) {
  return (
    <div className="min-w-0 px-3 py-3">
      <div className="flex items-center gap-1.5 text-muted-foreground">
        <Icon aria-hidden="true" className="size-3" />

        <span className="truncate text-[7px] uppercase tracking-[0.08em]">{label}</span>
      </div>

      <p className="mt-1 text-sm font-semibold tracking-[-0.03em] text-foreground">{formatNumber(value)}</p>
    </div>
  );
}

function AnalyticsMetric({
  icon: Icon,
  label,
  value
}: {
  icon: typeof Radio;

  label: string;
  value: string;
}) {
  return (
    <div className="rounded-[12px] bg-surface-muted/45 px-3 py-3">
      <div className="flex items-center gap-1 text-muted-foreground">
        <Icon aria-hidden="true" className="size-2.5" />

        <span className="text-[7px] uppercase tracking-[0.08em]">{label}</span>
      </div>

      <p className="mt-1.5 text-sm font-semibold tracking-[-0.035em] text-foreground">{value}</p>
    </div>
  );
}

function RequestProjectTile() {
  return (
    <Link
      href="/services"
      className="group flex min-h-[430px] flex-col justify-between rounded-[22px] border border-dashed border-border bg-surface-muted/15 p-5 transition-colors hover:border-theme-accent/60 hover:bg-theme-accent-faint">
      <div>
        <div className="flex size-11 items-center justify-center rounded-[14px] border border-border bg-surface text-muted-foreground transition-colors group-hover:text-theme-accent">
          <Plus aria-hidden="true" className="size-5" />
        </div>

        <p className="mt-8 text-[9px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
          New workspace
        </p>

        <h2 className="mt-2 text-lg font-semibold tracking-[-0.035em] text-foreground">
          Request a new project
        </h2>

        <p className="mt-2 max-w-[260px] text-[10px] leading-5 text-muted-foreground">
          Have another product, website or system in mind? Start a new Rcentz project.
        </p>
      </div>

      <div className="flex items-center justify-between border-t border-border pt-4">
        <span className="text-[9px] font-medium text-foreground">Request project</span>

        <ArrowUpRight
          aria-hidden="true"
          className="size-3.5 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-foreground"
        />
      </div>
    </Link>
  );
}
