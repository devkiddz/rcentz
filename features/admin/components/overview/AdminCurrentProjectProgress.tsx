'use client';

import { useState } from 'react';
import Link from 'next/link';
import { AnimatePresence, motion } from 'motion/react';
import {
  Activity,
  AlertTriangle,
  ArrowLeft,
  ArrowRight,
  CalendarDays,
  CheckCircle2,
  CircleDot,
  Clock3,
  FileText,
  Flag,
  Gauge,
  ListTodo,
  ShieldCheck
} from 'lucide-react';

import type { ActiveProjectMonitor } from '@/features/admin/server/overview/get-active-project-monitors';

type AdminCurrentProjectProgressProps = {
  projects: ActiveProjectMonitor[];
};

type ProjectHealthStatus = 'ON_TRACK' | 'ATTENTION' | 'AT_RISK';

type ProgressPresentation = {
  barClassName: string;
  textClassName: string;
  dotClassName: string;
};

function clampProgress(progress: number) {
  return Math.min(Math.max(progress, 0), 100);
}

function formatStatus(status: string) {
  return status
    .toLowerCase()
    .split('_')
    .map(statusPart => statusPart.charAt(0).toUpperCase() + statusPart.slice(1))
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

function formatLastUpdated(date: Date) {
  const now = new Date();
  const differenceInMilliseconds = now.getTime() - date.getTime();
  const differenceInMinutes = Math.floor(differenceInMilliseconds / (1000 * 60));

  if (differenceInMinutes < 1) {
    return 'Just now';
  }

  if (differenceInMinutes < 60) {
    return `${differenceInMinutes}m ago`;
  }

  const differenceInHours = Math.floor(differenceInMinutes / 60);

  if (differenceInHours < 24) {
    return `${differenceInHours}h ago`;
  }

  const differenceInDays = Math.floor(differenceInHours / 24);

  return `${differenceInDays}d ago`;
}

function getProgressPresentation(progress: number): ProgressPresentation {
  if (progress >= 95) {
    return {
      barClassName: 'bg-theme-accent',
      textClassName: 'text-theme-accent',
      dotClassName: 'bg-theme-accent'
    };
  }

  if (progress >= 70) {
    return {
      barClassName: 'bg-sky-500',
      textClassName: 'text-sky-500',
      dotClassName: 'bg-sky-500'
    };
  }

  if (progress >= 40) {
    return {
      barClassName: 'bg-amber-500',
      textClassName: 'text-amber-500',
      dotClassName: 'bg-amber-500'
    };
  }

  return {
    barClassName: 'bg-rose-500',
    textClassName: 'text-rose-500',
    dotClassName: 'bg-rose-500'
  };
}

function getHealthPresentation(status: ProjectHealthStatus) {
  switch (status) {
    case 'AT_RISK':
      return {
        icon: AlertTriangle,
        labelClassName: 'text-rose-500',
        surfaceClassName: 'border-rose-500/20 bg-rose-500/5'
      };

    case 'ATTENTION':
      return {
        icon: Activity,
        labelClassName: 'text-amber-500',
        surfaceClassName: 'border-amber-500/20 bg-amber-500/5'
      };

    case 'ON_TRACK':
    default:
      return {
        icon: ShieldCheck,
        labelClassName: 'text-theme-accent',
        surfaceClassName: 'border-theme-accent/20 bg-theme-accent-faint'
      };
  }
}

function OnlineHealthSignal() {
  return (
    <div className="relative flex size-3 items-center justify-center">
      <motion.span
        aria-hidden="true"
        className="absolute size-3 rounded-full border border-theme-accent"
        animate={{
          scale: [0.9, 1.9],
          opacity: [0.7, 0]
        }}
        transition={{
          duration: 1.8,
          repeat: Infinity,
          ease: 'easeOut'
        }}
      />

      <motion.span
        aria-hidden="true"
        className="relative size-1.5 rounded-full bg-theme-accent"
        animate={{
          scale: [1, 0.85, 1],
          opacity: [1, 0.55, 1]
        }}
        transition={{
          duration: 1.4,
          repeat: Infinity,
          ease: 'easeInOut'
        }}
      />
    </div>
  );
}

function ProjectHealthSignal({ status }: { status: ProjectHealthStatus }) {
  if (status === 'ON_TRACK') {
    return <OnlineHealthSignal />;
  }

  return (
    <span
      aria-hidden="true"
      className={`size-2 rounded-full ${status === 'AT_RISK' ? 'bg-rose-500' : 'bg-amber-500'}`}
    />
  );
}

function ProjectHealthCard({ project }: { project: ActiveProjectMonitor }) {
  const healthPresentation = getHealthPresentation(project.health.status);
  const HealthIcon = healthPresentation.icon;

  return (
    <div className={`rounded-2xl border p-4 ${healthPresentation.surfaceClassName}`}>
      <div className="flex items-center gap-2">
        <HealthIcon aria-hidden="true" className={`size-4 ${healthPresentation.labelClassName}`} />
        <span className="text-[9px] uppercase tracking-[0.12em] text-muted">Project health</span>
      </div>

      <div className="mt-3 flex items-center gap-2.5">
        <ProjectHealthSignal status={project.health.status} />
        <p className={`text-sm font-semibold ${healthPresentation.labelClassName}`}>{project.health.label}</p>
      </div>

      <p className="mt-2 text-[9px] leading-4 text-muted">{project.health.reason}</p>
    </div>
  );
}

function DeliverySignalsCard({ project }: { project: ActiveProjectMonitor }) {
  return (
    <div className="rounded-2xl border border-border bg-surface-raised p-4">
      <div className="flex items-center gap-2">
        <Gauge aria-hidden="true" className="size-4 text-theme-accent" />
        <span className="text-[9px] uppercase tracking-[0.12em] text-muted">Delivery signals</span>
      </div>

      <div className="mt-3 grid grid-cols-2 gap-x-5 gap-y-3">
        <div>
          <p className="text-[8px] text-muted">Overdue</p>
          <p className="mt-1 text-[12px] font-semibold text-foreground">
            {project.deliverySignals.overdueMilestones}
          </p>
        </div>

        <div>
          <p className="text-[8px] text-muted">Due soon</p>
          <p className="mt-1 text-[12px] font-semibold text-foreground">
            {project.deliverySignals.dueSoonMilestones}
          </p>
        </div>

        <div>
          <p className="text-[8px] text-muted">Review</p>
          <p className="mt-1 text-[12px] font-semibold text-foreground">{project.milestoneSummary.review}</p>
        </div>

        <div>
          <p className="text-[8px] text-muted">Blocked</p>
          <p className="mt-1 text-[12px] font-semibold text-foreground">{project.milestoneSummary.blocked}</p>
        </div>
      </div>
    </div>
  );
}

function NextMilestoneCard({ project }: { project: ActiveProjectMonitor }) {
  return (
    <div className="rounded-2xl border border-border bg-surface-raised p-4">
      <div className="flex items-center gap-2">
        <Flag aria-hidden="true" className="size-4 text-theme-accent" />
        <p className="text-[9px] uppercase tracking-[0.12em] text-muted">Next milestone</p>
      </div>

      <p className="mt-3 truncate text-[11px] font-semibold text-foreground">
        {project.nextMilestone?.title ?? 'None'}
      </p>

      <p className="mt-1 text-[9px] text-muted">
        {project.nextMilestone ? formatStatus(project.nextMilestone.status) : 'No pending milestones'}
      </p>
    </div>
  );
}

function PageHealthCard({ project }: { project: ActiveProjectMonitor }) {
  return (
    <div className="rounded-2xl border border-border bg-surface-raised p-4">
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <FileText aria-hidden="true" className="size-4 text-theme-accent" />
          <p className="text-[9px] uppercase tracking-[0.12em] text-muted">Page health</p>
        </div>

        <CheckCircle2 aria-hidden="true" className="size-3.5 text-theme-accent" />
      </div>

      {project.pageSummary.total === 0 ? (
        <>
          <p className="mt-3 text-[11px] font-semibold text-foreground">Not tracked yet</p>
          <p className="mt-1 text-[9px] text-muted">Ready for Project CRUD integration.</p>
        </>
      ) : (
        <div className="mt-3 grid grid-cols-4 gap-2">
          <div>
            <p className="text-[8px] text-muted">Healthy</p>
            <p className="mt-1 text-[11px] font-semibold text-theme-accent">{project.pageSummary.healthy}</p>
          </div>

          <div>
            <p className="text-[8px] text-muted">Active</p>
            <p className="mt-1 text-[11px] font-semibold text-sky-500">{project.pageSummary.inProgress}</p>
          </div>

          <div>
            <p className="text-[8px] text-muted">Attention</p>
            <p className="mt-1 text-[11px] font-semibold text-amber-500">{project.pageSummary.attention}</p>
          </div>

          <div>
            <p className="text-[8px] text-muted">Blocked</p>
            <p className="mt-1 text-[11px] font-semibold text-rose-500">{project.pageSummary.blocked}</p>
          </div>
        </div>
      )}
    </div>
  );
}

function ProjectMilestoneProgress({ project }: { project: ActiveProjectMonitor }) {
  return (
    <div className="rounded-2xl border border-border bg-surface-raised p-4">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-[11px] font-semibold text-foreground">Milestone progress</p>
          <p className="mt-1 text-[9px] text-muted">Delivery stage breakdown</p>
        </div>

        <span className="shrink-0 text-[9px] text-muted">
          {project.milestoneSummary.completed}/{project.milestoneSummary.total} completed
        </span>
      </div>

      {project.milestones.length === 0 ? (
        <div className="flex min-h-28 items-center justify-center text-[10px] text-muted">
          No milestones yet.
        </div>
      ) : (
        <div className="mt-5 space-y-5">
          {project.milestones.map((milestone, milestoneIndex) => {
            const milestoneProgress = clampProgress(milestone.progress);
            const progressPresentation = getProgressPresentation(milestoneProgress);

            return (
              <div key={milestone.id} className="space-y-2.5">
                <div className="flex items-center justify-between gap-4">
                  <div className="flex min-w-0 items-center gap-2">
                    <span className={`size-1.5 shrink-0 rounded-full ${progressPresentation.dotClassName}`} />
                    <span className="shrink-0 text-[9px] font-medium text-muted">
                      M{String(milestoneIndex + 1).padStart(2, '0')}
                    </span>
                    <span className="truncate text-[10px] font-medium text-foreground">
                      {milestone.title}
                    </span>
                  </div>

                  <div className="flex shrink-0 items-center gap-2">
                    <span className="text-[8px] text-muted">{formatStatus(milestone.status)}</span>
                    <span className={`text-[10px] font-semibold ${progressPresentation.textClassName}`}>
                      {milestoneProgress}%
                    </span>
                  </div>
                </div>

                <div className="h-2 overflow-hidden rounded-full bg-surface-muted">
                  <div
                    className={`h-full rounded-full transition-[width] duration-500 ${progressPresentation.barClassName}`}
                    style={{ width: `${milestoneProgress}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

function OverallProgressCard({ project }: { project: ActiveProjectMonitor }) {
  const overallProgress = clampProgress(project.progress);
  const progressPresentation = getProgressPresentation(overallProgress);

  return (
    <div className="rounded-2xl border border-border bg-surface-raised p-4">
      <div className="flex items-end justify-between gap-3">
        <div>
          <p className={`text-4xl font-semibold tracking-[-0.06em] ${progressPresentation.textClassName}`}>
            {overallProgress}%
          </p>
          <p className="mt-1 text-[8px] uppercase tracking-[0.12em] text-muted">Overall progress</p>
        </div>

        <Activity aria-hidden="true" className={`size-5 ${progressPresentation.textClassName}`} />
      </div>

      <div className="mt-4 h-2 overflow-hidden rounded-full bg-surface-muted">
        <div
          className={`h-full rounded-full transition-[width] duration-500 ${progressPresentation.barClassName}`}
          style={{ width: `${overallProgress}%` }}
        />
      </div>
    </div>
  );
}

function ProjectSnapshot({ project }: { project: ActiveProjectMonitor }) {
  return (
    <div className="overflow-hidden rounded-2xl border border-border bg-surface-raised">
      <div className="grid grid-cols-2 sm:grid-cols-4">
        <div className="border-b border-r border-border p-3 sm:border-b-0">
          <div className="flex items-center gap-1.5">
            <FileText className="size-3 text-theme-accent" />
            <span className="text-[9px] text-muted">Pages</span>
          </div>
          <p className="mt-1.5 text-sm font-semibold text-foreground">{project.pageSummary.total}</p>
        </div>

        <div className="border-b border-border p-3 sm:border-b-0 sm:border-r">
          <div className="flex items-center gap-1.5">
            <Flag className="size-3 text-theme-accent" />
            <span className="text-[9px] text-muted">Milestones</span>
          </div>
          <p className="mt-1.5 text-sm font-semibold text-foreground">
            {project.milestoneSummary.completed}/{project.milestoneSummary.total}
          </p>
        </div>

        <div className="border-r border-border p-3">
          <div className="flex items-center gap-1.5">
            <ListTodo className="size-3 text-theme-accent" />
            <span className="text-[9px] text-muted">Tasks</span>
          </div>
          <p className="mt-1.5 text-sm font-semibold text-foreground">
            {project.taskSummary.completed}/{project.taskSummary.total}
          </p>
        </div>

        <div className="p-3">
          <div className="flex items-center gap-1.5">
            <AlertTriangle className="size-3 text-theme-accent" />
            <span className="text-[9px] text-muted">Blocked</span>
          </div>
          <p className="mt-1.5 text-sm font-semibold text-foreground">{project.milestoneSummary.blocked}</p>
        </div>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-4 border-t border-border px-3 py-2.5">
        <span className="flex items-center gap-1.5 text-[9px] text-muted">
          <CalendarDays className="size-3" />
          Target
          <strong className="ml-1 font-medium text-foreground">{formatDate(project.expectedEndAt)}</strong>
        </span>

        <span className="flex items-center gap-1.5 text-[9px] text-muted">
          <Clock3 className="size-3" />
          Updated
          <strong className="ml-1 font-medium text-foreground">{formatLastUpdated(project.updatedAt)}</strong>
        </span>
      </div>
    </div>
  );
}

function ProjectMonitor({ project }: { project: ActiveProjectMonitor }) {
  return (
    <div className="space-y-3">
      {/* 1. Primary health intelligence */}
      <div className="grid gap-3 sm:grid-cols-2">
        <ProjectHealthCard project={project} />
        <DeliverySignalsCard project={project} />
      </div>

      {/* 2. Overall project snapshot */}
      <div className="grid gap-3 lg:grid-cols-[190px_minmax(0,1fr)]">
        <OverallProgressCard project={project} />
        <ProjectSnapshot project={project} />
      </div>

      {/* 3. Immediate action / page condition */}
      <div className="grid gap-3 sm:grid-cols-2">
        <NextMilestoneCard project={project} />
        <PageHealthCard project={project} />
      </div>

      {/* 4. Delivery visualization */}
      <ProjectMilestoneProgress project={project} />
    </div>
  );
}

export function AdminCurrentProjectProgress({ projects }: AdminCurrentProjectProgressProps) {
  const [activeProjectIndex, setActiveProjectIndex] = useState(0);
  const [slideDirection, setSlideDirection] = useState(1);

  if (projects.length === 0) {
    return (
      <section className="flex min-h-[460px] items-center justify-center rounded-[18px] border border-border bg-background">
        <div className="text-center">
          <CircleDot className="mx-auto size-5 text-theme-accent" />
          <p className="mt-3 text-sm font-medium text-foreground">No active projects</p>
          <p className="mt-1 text-[11px] text-muted">Active project monitoring will appear here.</p>
        </div>
      </section>
    );
  }

  const safeProjectIndex = Math.min(activeProjectIndex, projects.length - 1);
  const currentProject = projects[safeProjectIndex];
  const hasMultipleProjects = projects.length > 1;

  function showPreviousProject() {
    setSlideDirection(-1);
    setActiveProjectIndex(currentIndex => (currentIndex === 0 ? projects.length - 1 : currentIndex - 1));
  }

  function showNextProject() {
    setSlideDirection(1);
    setActiveProjectIndex(currentIndex => (currentIndex === projects.length - 1 ? 0 : currentIndex + 1));
  }

  return (
    <section className="flex max-h-[760px] min-h-[760px] flex-col overflow-hidden rounded-[18px] border border-border bg-background">
      {/* Monitor navigation */}
      <div className="flex shrink-0 items-start justify-between gap-4 border-b border-border px-5 py-4">
        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <p className="truncate text-sm font-semibold tracking-[-0.025em] text-foreground">
              {currentProject.name}
            </p>

            <span className="rounded-full bg-theme-accent-faint px-2 py-0.5 text-[9px] font-medium text-theme-accent">
              {formatStatus(currentProject.status)}
            </span>
          </div>

          <div className="mt-1 flex items-center gap-2">
            <span className="text-[10px] text-muted">Active project health monitor</span>
            <span className="size-1 rounded-full bg-border" />
            <span className="text-[10px] font-medium text-foreground">{projects.length} active</span>
          </div>
        </div>

        <div className="flex shrink-0 items-center gap-2">
          <div className="flex items-center rounded-xl border border-border bg-surface-raised p-0.5">
            <button
              type="button"
              onClick={showPreviousProject}
              disabled={!hasMultipleProjects}
              aria-label="Previous active project"
              className="flex size-7 cursor-pointer items-center justify-center rounded-lg text-muted transition-colors hover:bg-surface-muted hover:text-foreground disabled:cursor-default disabled:opacity-35">
              <ArrowLeft className="size-3.5" />
            </button>

            <span className="min-w-12 px-1 text-center text-[9px] font-medium tabular-nums text-muted">
              {safeProjectIndex + 1}
              {' / '}
              {projects.length}
            </span>

            <button
              type="button"
              onClick={showNextProject}
              disabled={!hasMultipleProjects}
              aria-label="Next active project"
              className="flex size-7 cursor-pointer items-center justify-center rounded-lg text-muted transition-colors hover:bg-surface-muted hover:text-foreground disabled:cursor-default disabled:opacity-35">
              <ArrowRight className="size-3.5" />
            </button>
          </div>

          <Link
            href={`/admin/projects/${currentProject.slug}`}
            className="flex items-center gap-1 text-[10px] text-muted transition-colors hover:text-foreground">
            Open
            <ArrowRight className="size-3" />
          </Link>
        </div>
      </div>

      {/* Selected project monitor (Scrollable Viewport) */}
      <div className="min-h-0 flex-1 overflow-y-auto p-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        <AnimatePresence initial={false} mode="wait">
          <motion.div
            key={currentProject.id}
            initial={{
              opacity: 0,
              x: slideDirection > 0 ? 22 : -22
            }}
            animate={{
              opacity: 1,
              x: 0
            }}
            exit={{
              opacity: 0,
              x: slideDirection > 0 ? -22 : 22
            }}
            transition={{
              duration: 0.2,
              ease: 'easeOut'
            }}>
            <ProjectMonitor project={currentProject} />
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
