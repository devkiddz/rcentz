import { Activity, CircleUserRound, Database } from 'lucide-react';

import { DeliveryProfileChart, type DeliveryProfileDatum } from '@/components/charts/DeliveryProfileChart';

import { ReadinessGaugeChart } from '@/components/charts/ReadinessGaugeChart';

import type { PublicPortfolioProject } from '@/features/portfolio/server/get-portfolio-project';

type PortfolioDetailHeroIllustrationProps = {
  project: PublicPortfolioProject;
};

type ProjectStage = {
  eyebrow: string;
  title: string;
  detail: string;
};

function humanize(value: string) {
  return value
    .toLowerCase()
    .split('_')
    .map(part => part.charAt(0).toUpperCase() + part.slice(1))
    .join(' ');
}

function clampProgress(value: number) {
  return Math.max(0, Math.min(100, value));
}

function getProjectStage(status: string): ProjectStage {
  switch (status) {
    case 'PLANNING':
      return {
        eyebrow: 'Foundation',
        title: 'Planning the system',
        detail: 'Scope and structure are being established.'
      };

    case 'DISCOVERY':
      return {
        eyebrow: 'Discovery',
        title: 'Understanding the system',
        detail: 'Requirements and workflows are being mapped.'
      };

    case 'DESIGN':
      return {
        eyebrow: 'Design',
        title: 'Shaping the experience',
        detail: 'Product structure and interface direction are active.'
      };

    case 'DEVELOPMENT':
      return {
        eyebrow: 'Build',
        title: 'System in development',
        detail: 'Core product capability is actively being implemented.'
      };

    case 'TESTING':
      return {
        eyebrow: 'Validation',
        title: 'System under testing',
        detail: 'The build is being verified against expected behaviour.'
      };

    case 'REVIEW':
      return {
        eyebrow: 'Review',
        title: 'System under review',
        detail: 'The current implementation is being evaluated and refined.'
      };

    case 'DEPLOYMENT':
      return {
        eyebrow: 'Shipping',
        title: 'Preparing for release',
        detail: 'The product is moving through deployment and release.'
      };

    case 'MAINTENANCE':
      return {
        eyebrow: 'Live system',
        title: 'Operating and evolving',
        detail: 'The product is live and continuing through maintenance.'
      };

    case 'COMPLETED':
      return {
        eyebrow: 'Delivered',
        title: 'Build completed',
        detail: 'The recorded project scope has reached completion.'
      };

    case 'ON_HOLD':
      return {
        eyebrow: 'Paused',
        title: 'Build currently on hold',
        detail: 'Project progress is preserved while work is paused.'
      };

    case 'CANCELLED':
      return {
        eyebrow: 'Closed',
        title: 'Project closed',
        detail: 'The project is no longer moving through active delivery.'
      };

    default:
      return {
        eyebrow: 'Project',
        title: humanize(status),
        detail: 'Current state is sourced from the project record.'
      };
  }
}

function projectTypeLabel(type: string) {
  switch (type) {
    case 'ECOMMERCE':
      return 'Commerce system';

    case 'SAAS':
      return 'SaaS platform';

    case 'WEB_APP':
      return 'Web application';

    case 'WEBSITE':
      return 'Website system';

    case 'MOBILE_APP':
      return 'Mobile application';

    case 'DESKTOP_APP':
      return 'Desktop application';

    case 'API':
      return 'API system';

    case 'MAINTENANCE':
      return 'Maintained system';

    case 'CONSULTING':
      return 'Consulting project';

    case 'BRANDING':
      return 'Brand system';

    case 'GRAPHIC_DESIGN':
      return 'Design project';

    default:
      return humanize(type);
  }
}

function formatCompactNumber(value: number | null | undefined) {
  if (value === null || value === undefined) {
    return '—';
  }

  return new Intl.NumberFormat('en', {
    notation: value >= 1000 ? 'compact' : 'standard',
    maximumFractionDigits: 1
  }).format(value);
}

function formatUpdateDate(value: string) {
  return new Intl.DateTimeFormat('en', {
    month: 'short',
    day: 'numeric'
  }).format(new Date(value));
}

/**
 * Illustration-only delivery segmentation.
 *
 * These phases are not fabricated historical milestones.
 * Every value is derived from the canonical project.progress.
 */
function getDeliveryProfile(progress: number): DeliveryProfileDatum[] {
  const safeProgress = clampProgress(progress);

  const phases = ['Foundation', 'Structure', 'Build', 'Integrate', 'Validate', 'Release'];

  const phaseSize = 100 / phases.length;

  return phases.map((label, index) => {
    const phaseStart = index * phaseSize;
    const phaseEnd = phaseStart + phaseSize;

    const completed = clampProgress(((safeProgress - phaseStart) / phaseSize) * 100);

    const trajectory = safeProgress <= phaseStart ? 0 : safeProgress >= phaseEnd ? 100 : completed;

    return {
      label,
      completed,
      remaining: 100 - completed,
      trajectory
    };
  });
}

export function PortfolioDetailHeroIllustration({ project }: PortfolioDetailHeroIllustrationProps) {
  const progress = clampProgress(project.progress);
  const stage = getProjectStage(project.status);

  const recentUpdates = project.updates.slice(0, 5);
  const visibleTechnologies = project.technologies.slice(0, 4);

  const deliveryProfile = getDeliveryProfile(progress);

  const metrics = [
    {
      label: 'Public updates',
      value: String(project.updates.length)
    },
    {
      label: 'Technologies',
      value: String(project.technologies.length)
    },
    {
      label: 'Project media',
      value: String(project.media.length)
    },
    {
      label: 'Credits',
      value: String(project.credits.length)
    }
  ];

  return (
    <div
      aria-hidden="true"
      className="relative overflow-hidden rounded-[28px] border border-border bg-surface-raised text-foreground shadow-2xl sm:rounded-[32px]">
      <div className="pointer-events-none absolute inset-0 opacity-45 rcentz-grid" />

      <div className="pointer-events-none absolute -left-20 top-10 size-72 rounded-full bg-theme-accent/10 blur-3xl" />

      <div className="pointer-events-none absolute -right-24 bottom-0 size-80 rounded-full bg-theme-accent/10 blur-3xl" />

      <div className="relative p-3 sm:p-5 lg:p-6">
        <div className="overflow-hidden rounded-[22px] border border-border bg-surface/95 shadow-xl">
          {/* Illustration header */}

          <div className="flex h-12 items-center gap-4 border-b border-border px-4 sm:px-5">
            <div className="flex items-center gap-1.5">
              <span className="size-1.5 rounded-full bg-border-strong" />
              <span className="size-1.5 rounded-full bg-border-strong" />
              <span className="size-1.5 rounded-full bg-theme-accent/80" />
            </div>

            <p className="font-mono text-[10px] font-medium uppercase tracking-[0.12em] text-muted">
              {project.name} · project overview
            </p>

            <div className="ml-auto hidden items-center gap-2 sm:flex">
              <span className="size-1.5 rounded-full bg-theme-accent" />

              <span className="font-mono text-[10px] font-medium uppercase tracking-[0.1em] text-muted">
                {stage.eyebrow}
              </span>
            </div>
          </div>

          <div className="grid min-h-[510px] md:min-h-[570px] lg:grid-cols-[minmax(0,1fr)_230px] lg:min-h-[610px]">
            {/* Main */}

            <div className="min-w-0 p-3 sm:p-4 lg:p-5">
              {/* Identity */}

              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.12em] text-theme-accent">
                    {projectTypeLabel(project.type)}
                  </p>

                  <p className="mt-1.5 text-[16px] font-medium tracking-[-0.02em] text-foreground">
                    {stage.title}
                  </p>
                </div>

                <div className="flex items-center gap-2 rounded-full border border-border bg-surface-muted/35 px-3 py-2">
                  <span className="size-1.5 rounded-full bg-theme-accent" />

                  <span className="font-mono text-[9px] font-medium uppercase tracking-[0.09em] text-muted">
                    {humanize(project.status)}
                  </span>
                </div>
              </div>

              {/* Charts — untouched */}

              <div className="mt-4 grid gap-3 xl:grid-cols-[1.35fr_0.65fr]">
                <div className="relative overflow-hidden rounded-[18px] border border-border bg-surface-muted/35 p-4 sm:p-5">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-[14px] font-semibold text-foreground">Delivery profile</p>

                      <p className="mt-1 font-mono text-[9px] font-medium uppercase tracking-[0.09em] text-muted">
                        Current system progression
                      </p>
                    </div>

                    <div className="text-right">
                      <p className="text-2xl font-semibold tracking-[-0.04em] text-foreground">{progress}%</p>

                      <p className="font-mono text-[9px] uppercase tracking-[0.09em] text-muted">overall</p>
                    </div>
                  </div>

                  <div className="mt-5">
                    <DeliveryProfileChart
                      data={deliveryProfile}
                      height={220}
                      completedLabel="Phase completion"
                      remainingLabel="Progress curve"
                      trajectoryLabel="Trajectory"
                    />
                  </div>
                </div>

                <div className="rounded-[18px] border border-border bg-surface-muted/35 p-4 sm:p-5">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-[14px] font-semibold text-foreground">Project readiness</p>

                      <p className="mt-1 font-mono text-[9px] font-medium uppercase tracking-[0.09em] text-muted">
                        Delivery state
                      </p>
                    </div>

                    <span className="size-2 rounded-full bg-theme-accent" />
                  </div>

                  <div className="mt-2">
                    <ReadinessGaugeChart value={progress} height={215} />
                  </div>
                </div>
              </div>

              {/* Project metrics */}

              <div className="mt-3 grid grid-cols-2 gap-3 xl:grid-cols-4">
                {metrics.map(metric => (
                  <div
                    key={metric.label}
                    className="rounded-[16px] border border-border bg-surface-muted/35 p-3.5">
                    <p className="font-mono text-[9px] font-medium uppercase tracking-[0.08em] text-muted">
                      {metric.label}
                    </p>

                    <p className="mt-2 text-[1.4rem] font-semibold tracking-[-0.04em] text-foreground">
                      {metric.value}
                    </p>
                  </div>
                ))}
              </div>

              {/* Project information */}

              <div className="mt-3 grid gap-3 xl:grid-cols-[1fr_1fr]">
                <div className="rounded-[18px] border border-border bg-surface-muted/35 p-4">
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <p className="text-[13px] font-semibold text-foreground">Build state</p>

                      <p className="mt-1 font-mono text-[9px] font-medium uppercase tracking-[0.08em] text-muted">
                        {stage.eyebrow}
                      </p>
                    </div>

                    <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.08em] text-theme-accent">
                      {progress}%
                    </span>
                  </div>

                  <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-5">
                    <InfoCell label="Status" value={humanize(project.status)} />

                    <InfoCell label="Updates" value={String(project.updates.length)} />

                    <InfoCell label="Media" value={String(project.media.length)} />

                    <InfoCell label="Credits" value={String(project.credits.length)} />

                    <InfoCell label="Type" value={humanize(project.type)} />
                  </div>

                  <p className="mt-3 text-[11px] leading-5 text-muted">{stage.detail}</p>
                </div>

                <div className="rounded-[18px] border border-border bg-surface-muted/35 p-4">
                  <div className="flex items-center justify-between">
                    <p className="text-[13px] font-semibold text-foreground">Recorded technology</p>

                    <Database className="size-4 text-theme-accent" />
                  </div>

                  {visibleTechnologies.length > 0 ? (
                    <div className="mt-4 grid grid-cols-2 gap-2">
                      {visibleTechnologies.map(technology => (
                        <div
                          key={technology.id}
                          className="min-w-0 rounded-xl border border-border bg-background/55 px-3 py-3">
                          <p className="truncate text-[11px] font-medium text-foreground/85">
                            {technology.name}
                          </p>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="mt-4 text-[11px] leading-5 text-muted">
                      No project technologies have been recorded yet.
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Public activity */}

            <aside className="hidden border-l border-border p-4 lg:block">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-[13px] font-semibold text-foreground">Public activity</p>

                  <p className="mt-1 font-mono text-[9px] font-medium uppercase tracking-[0.08em] text-muted">
                    Development record
                  </p>
                </div>

                <Activity className="size-4 text-theme-accent" />
              </div>

              {recentUpdates.length > 0 ? (
                <div className="mt-4 space-y-2">
                  {recentUpdates.map(update => (
                    <div
                      key={update.id}
                      className="rounded-[14px] border border-border bg-surface-muted/30 p-3">
                      <div className="flex items-start gap-2.5">
                        <span className="mt-0.5 flex size-7 shrink-0 items-center justify-center rounded-full border border-theme-accent/20 bg-theme-accent/8">
                          <Activity className="size-3 text-theme-accent" />
                        </span>

                        <div className="min-w-0">
                          <p className="line-clamp-2 text-[11px] font-medium leading-[1.45] text-foreground/85">
                            {update.title}
                          </p>

                          <p className="mt-1 font-mono text-[8px] uppercase tracking-[0.06em] text-muted">
                            {humanize(update.type)} · {formatUpdateDate(update.createdAt)}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="mt-4 rounded-[14px] border border-dashed border-border p-4 text-center">
                  <Activity className="mx-auto size-4 text-muted" />

                  <p className="mt-3 text-[11px] leading-5 text-muted">
                    No public development updates recorded yet.
                  </p>
                </div>
              )}

              {/* Engagement */}

              <div className="mt-3 rounded-[16px] border border-border bg-surface-muted/35 p-4">
                <div className="flex items-center justify-between">
                  <p className="text-[12px] font-semibold text-foreground/85">Engagement</p>

                  <CircleUserRound className="size-3.5 text-muted" />
                </div>

                <div className="mt-4 grid grid-cols-2 gap-4">
                  <MetricCell label="Views" value={formatCompactNumber(project.analytics?.views)} />

                  <MetricCell label="Reactions" value={formatCompactNumber(project.engagement.reactions)} />

                  <MetricCell label="Comments" value={formatCompactNumber(project.engagement.comments)} />

                  <MetricCell label="Shares" value={formatCompactNumber(project.analytics?.shares)} />
                </div>
              </div>
            </aside>
          </div>
        </div>
      </div>
    </div>
  );
}

type InfoCellProps = {
  label: string;
  value: string;
};

function InfoCell({ label, value }: InfoCellProps) {
  return (
    <div className="min-w-0 rounded-xl border border-border bg-background/55 p-2.5">
      <p className="font-mono text-[8px] font-medium uppercase tracking-[0.06em] text-muted">{label}</p>

      <p className="mt-2 truncate text-[12px] font-medium text-foreground">{value}</p>
    </div>
  );
}

type MetricCellProps = {
  label: string;
  value: string;
};

function MetricCell({ label, value }: MetricCellProps) {
  return (
    <div>
      <p className="font-mono text-[9px] font-medium uppercase tracking-[0.07em] text-muted">{label}</p>

      <p className="mt-1.5 text-lg font-semibold text-foreground">{value}</p>
    </div>
  );
}
