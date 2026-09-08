import type { LucideIcon } from 'lucide-react';

import {
  CalendarDays,
  CheckCircle2,
  ChevronDown,
  CircleGauge,
  ExternalLink,
  Flag,
  GitBranch,
  Globe2,
  Layers3,
  ServerCog
} from 'lucide-react';

import type { ClientOverviewProject } from '@/features/client/server/overview/get-client-overview';

type ProjectDetailsSectionProps = {
  project: ClientOverviewProject;
};

function humanize(value: string) {
  return value
    .toLowerCase()
    .split('_')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

function formatDate(value: Date | string | null | undefined) {
  if (!value) {
    return 'Not set';
  }

  return new Intl.DateTimeFormat('en-NG', {
    day: 'numeric',
    month: 'short',
    year: 'numeric'
  }).format(new Date(value));
}

function clampProgress(value: number) {
  return Math.min(100, Math.max(0, value));
}

function getHostname(value: string | null | undefined) {
  if (!value) {
    return null;
  }

  try {
    return new URL(value).hostname;
  } catch {
    return value.replace(/^https?:\/\//, '').split('/')[0];
  }
}

function getServiceProvider(liveUrl: string | null | undefined) {
  if (!liveUrl) {
    return 'Not recorded';
  }

  const hostname = getHostname(liveUrl);

  if (!hostname) {
    return 'Not recorded';
  }

  if (hostname.endsWith('.vercel.app') || hostname === 'vercel.app') {
    return 'Vercel';
  }

  return 'Not recorded';
}

function getCurrentMilestone(project: ClientOverviewProject) {
  return (
    project.milestones.find(milestone => milestone.status === 'IN_PROGRESS') ??
    project.milestones.find(milestone => milestone.status === 'REVIEW') ??
    project.milestones.find(milestone => milestone.status === 'PLANNED') ??
    null
  );
}

function getCurrentDeliverable(project: ClientOverviewProject) {
  return (
    project.deliverables.find(deliverable => deliverable.status === 'IN_PROGRESS') ??
    project.deliverables.find(
      deliverable => deliverable.status === 'REVIEW' || deliverable.status === 'BLOCKED'
    ) ??
    project.deliverables.find(deliverable => deliverable.status === 'PLANNED') ??
    null
  );
}

export function ProjectDetailsSection({ project }: ProjectDetailsSectionProps) {
  const currentMilestone = getCurrentMilestone(project);

  const currentDeliverable = getCurrentDeliverable(project);

  const liveUrl = project.portfolio?.liveUrl ?? null;

  const repositoryUrl = project.portfolio?.repositoryUrl ?? null;

  const domain = getHostname(liveUrl) ?? 'Not published';

  const serviceProvider = getServiceProvider(liveUrl);

  const technologies = project.technologies;

  const hasScopeInformation =
    Boolean(project.purpose) ||
    Boolean(project.expectedOutcome) ||
    Boolean(currentDeliverable?.agreementSummary) ||
    Boolean(currentDeliverable?.rationale) ||
    Boolean(currentDeliverable?.extensionReason);

  return (
    <section className="overflow-hidden rounded-2xl border border-border bg-surface">
      <div className="flex min-h-14 items-center justify-between gap-4 border-b border-border px-5 sm:px-6">
        <div>
          <h2 className="text-xs font-semibold tracking-[-0.02em] text-foreground">Project Details</h2>

          <p className="mt-0.5 hidden text-[9px] text-muted-foreground sm:block">
            Current delivery and project state
          </p>
        </div>

        {liveUrl ? (
          <a
            href={liveUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex h-8 items-center gap-2 rounded-lg border border-border bg-background px-3 text-[10px] font-semibold text-foreground transition-colors hover:bg-surface-muted">
            View Project
            <ExternalLink aria-hidden="true" className="size-3" />
          </a>
        ) : null}
      </div>

      <div className="grid lg:grid-cols-[minmax(0,0.92fr)_minmax(0,1.58fr)]">
        <div className="border-b border-border p-4 sm:p-5 lg:border-b-0 lg:border-r">
          <ProjectPreview project={project} />
        </div>

        <div className="min-w-0 p-5 sm:p-6">
          <div className="grid gap-x-8 gap-y-6 sm:grid-cols-2 lg:grid-cols-4">
            <ProjectMeta label="Started" value={formatDate(project.startedAt)} icon={CalendarDays} />

            <ProjectMeta label="Status" value={humanize(project.status)} icon={Flag} accent />

            <ProjectMeta label="Progress" value={`${clampProgress(project.progress)}%`} icon={CircleGauge} />

            <ProjectMeta
              label="Expected completion"
              value={formatDate(project.expectedEndAt)}
              icon={CalendarDays}
            />
          </div>

          <div className="mt-7 grid gap-7 border-t border-border pt-6 md:grid-cols-2">
            <div className="min-w-0">
              <SectionLabel>Project Access</SectionLabel>

              <div className="mt-3 space-y-3">
                <AccessRow icon={Globe2} label="Domain" value={domain} href={liveUrl} />

                <AccessRow icon={ServerCog} label="Service Provider" value={serviceProvider} />

                <AccessRow icon={Layers3} label="Project ID" value={project.id} mono />

                <AccessRow
                  icon={GitBranch}
                  label="Repository"
                  value={
                    repositoryUrl
                      ? repositoryUrl.replace(/^https?:\/\/(www\.)?github\.com\//, '').replace(/\/$/, '')
                      : 'Not connected'
                  }
                  href={repositoryUrl}
                />
              </div>
            </div>

            <div className="min-w-0">
              <SectionLabel>Current Delivery</SectionLabel>

              <div className="mt-3 space-y-3">
                <DeliveryRow label="Milestone" value={currentMilestone?.title ?? 'No active milestone'} />

                <DeliveryRow
                  label="Deliverable"
                  value={currentDeliverable?.title ?? 'No active deliverable'}
                />
              </div>

              <div className="mt-6">
                <SectionLabel>Technologies</SectionLabel>

                {technologies.length > 0 ? (
                  <div className="mt-3 flex flex-wrap gap-2">
                    {technologies.map(technology => (
                      <TechnologyBadge
                        key={technology.id}
                        name={technology.name}
                        category={technology.category}
                        featured={technology.featured}
                      />
                    ))}
                  </div>
                ) : (
                  <p className="mt-3 text-[10px] text-muted-foreground">No technologies recorded.</p>
                )}
              </div>
            </div>
          </div>

          {currentDeliverable ? (
            <div className="mt-7 border-t border-border pt-6">
              <SectionLabel>Delivery Progress</SectionLabel>

              <div className="mt-3 flex items-center gap-3">
                <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-surface-muted">
                  <div
                    className="h-full rounded-full bg-theme-accent transition-[width]"
                    style={{
                      width: `${clampProgress(currentDeliverable.progress)}%`
                    }}
                  />
                </div>

                <span className="shrink-0 text-[10px] font-semibold tabular-nums text-foreground">
                  {currentDeliverable.progress}%
                </span>
              </div>

              <p className="mt-3 max-w-2xl text-[10px] leading-5 text-muted-foreground">
                {currentDeliverable.summary ??
                  currentDeliverable.description ??
                  'Current deliverable information will appear here as the project progresses.'}
              </p>
            </div>
          ) : null}
        </div>
      </div>

      <details className="group border-t border-border">
        <summary className="flex min-h-14 cursor-pointer list-none items-center gap-3 px-5 transition-colors hover:bg-surface-muted/60 sm:px-6 [&::-webkit-details-marker]:hidden">
          <ChevronDown
            aria-hidden="true"
            className="size-3.5 shrink-0 text-muted-foreground transition-transform duration-200 group-open:rotate-180"
          />

          <div className="min-w-0 flex-1">
            <p className="text-[11px] font-semibold text-foreground">Project Scope & Agreements</p>
          </div>

          <span className="hidden text-[9px] text-muted-foreground sm:block">Delivery context</span>
        </summary>

        <div className="border-t border-border bg-background/40 px-5 py-5 sm:px-6">
          {hasScopeInformation ? (
            <div className="grid gap-6 md:grid-cols-2">
              <ScopeItem
                title="Project Purpose"
                value={project.purpose ?? 'No project purpose has been published.'}
              />

              <ScopeItem
                title="Expected Outcome"
                value={project.expectedOutcome ?? 'No expected outcome has been published.'}
              />

              {currentDeliverable?.agreementSummary ? (
                <ScopeItem title="Current Agreement" value={currentDeliverable.agreementSummary} />
              ) : null}

              {currentDeliverable?.rationale ? (
                <ScopeItem title="Why This Deliverable" value={currentDeliverable.rationale} />
              ) : null}

              {currentDeliverable ? (
                <div className="md:col-span-2">
                  <div className="rounded-xl border border-border bg-surface p-4">
                    <div className="grid gap-4 sm:grid-cols-3">
                      <ScopeDate
                        label="Original deadline"
                        value={formatDate(currentDeliverable.originalDueDate)}
                      />

                      <ScopeDate label="Current deadline" value={formatDate(currentDeliverable.dueDate)} />

                      <ScopeDate label="Delivery status" value={humanize(currentDeliverable.status)} />
                    </div>

                    {currentDeliverable.extensionReason ? (
                      <div className="mt-4 border-t border-border pt-4">
                        <p className="text-[9px] font-medium text-muted-foreground">
                          Why the deadline changed
                        </p>

                        <p className="mt-1.5 text-[10px] leading-5 text-foreground">
                          {currentDeliverable.extensionReason}
                        </p>
                      </div>
                    ) : null}
                  </div>
                </div>
              ) : null}
            </div>
          ) : (
            <p className="text-[10px] leading-5 text-muted-foreground">
              No client-visible scope or agreement information has been published yet.
            </p>
          )}
        </div>
      </details>
    </section>
  );
}

function ProjectPreview({ project }: { project: ClientOverviewProject }) {
  const progress = clampProgress(project.progress);

  return (
    <div className="relative aspect-[16/10] overflow-hidden rounded-xl border border-border bg-background">
      <div className="flex h-8 items-center gap-1.5 border-b border-border px-3">
        <span className="size-1.5 rounded-full bg-muted-foreground/25" />
        <span className="size-1.5 rounded-full bg-muted-foreground/25" />
        <span className="size-1.5 rounded-full bg-muted-foreground/25" />

        <div className="ml-2 h-3.5 flex-1 rounded-md bg-surface-muted" />
      </div>

      <div className="relative flex h-[calc(100%-2rem)] flex-col overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,var(--border)_1px,transparent_1px),linear-gradient(to_bottom,var(--border)_1px,transparent_1px)] bg-[size:28px_28px] opacity-[0.18]" />

        <div className="relative flex flex-1 flex-col justify-between p-5 sm:p-6">
          <div>
            <div className="flex items-center gap-2">
              <div className="flex size-8 items-center justify-center rounded-lg border border-border bg-surface">
                <Layers3 aria-hidden="true" className="size-3.5 text-theme-accent" />
              </div>

              <div>
                <p className="text-[8px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
                  Rcentz Project
                </p>

                <p className="mt-0.5 text-[10px] font-medium text-foreground">Client workspace</p>
              </div>
            </div>

            <h3 className="mt-7 max-w-xs text-lg font-semibold tracking-[-0.04em] text-foreground sm:text-xl">
              {project.name}
            </h3>

            <p className="mt-2 line-clamp-2 max-w-sm text-[9px] leading-4 text-muted-foreground">
              {project.portfolio?.tagline ?? project.description ?? 'Project delivery workspace'}
            </p>
          </div>

          <div>
            <div className="flex items-center justify-between gap-3">
              <span className="text-[8px] font-medium text-muted-foreground">Overall progress</span>

              <span className="text-[9px] font-semibold tabular-nums text-foreground">{progress}%</span>
            </div>

            <div className="mt-2 h-1 overflow-hidden rounded-full bg-surface-muted">
              <div
                className="h-full rounded-full bg-theme-accent"
                style={{
                  width: `${progress}%`
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ProjectMeta({
  label,
  value,
  icon: Icon,
  accent = false
}: {
  label: string;
  value: string;
  icon: LucideIcon;
  accent?: boolean;
}) {
  return (
    <div className="min-w-0">
      <div className="flex items-center gap-1.5">
        <Icon aria-hidden="true" className="size-3 text-muted-foreground" />

        <p className="text-[9px] text-muted-foreground">{label}</p>
      </div>

      <div className="mt-2 flex items-center gap-2">
        {accent ? <span className="size-1.5 shrink-0 rounded-full bg-theme-accent" /> : null}

        <p className="truncate text-[11px] font-semibold text-foreground">{value}</p>
      </div>
    </div>
  );
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return <p className="text-[9px] font-medium text-muted-foreground">{children}</p>;
}

function AccessRow({
  icon: Icon,
  label,
  value,
  href,
  mono = false
}: {
  icon: LucideIcon;
  label: string;
  value: string;
  href?: string | null;
  mono?: boolean;
}) {
  return (
    <div className="flex min-w-0 items-start gap-3">
      <div className="flex w-28 shrink-0 items-center gap-2">
        <Icon aria-hidden="true" className="size-3 shrink-0 text-muted-foreground" />

        <span className="text-[9px] text-muted-foreground">{label}</span>
      </div>

      {href ? (
        <a
          href={href}
          target="_blank"
          rel="noreferrer"
          className="flex min-w-0 items-center gap-1.5 text-[10px] font-semibold text-foreground transition-colors hover:text-theme-accent">
          <span className="truncate">{value}</span>

          <ExternalLink aria-hidden="true" className="size-3 shrink-0" />
        </a>
      ) : (
        <span
          className={[
            'min-w-0 truncate text-[10px] font-semibold text-foreground',
            mono ? 'font-mono text-[9px]' : ''
          ].join(' ')}>
          {value}
        </span>
      )}
    </div>
  );
}

function DeliveryRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex min-w-0 items-center gap-3">
      <span className="w-16 shrink-0 text-[9px] text-muted-foreground">{label}</span>

      <div className="flex min-w-0 items-center gap-2">
        <CheckCircle2 aria-hidden="true" className="size-3 shrink-0 text-theme-accent" />

        <span className="truncate text-[10px] font-semibold text-foreground">{value}</span>
      </div>
    </div>
  );
}

function TechnologyBadge({
  name,
  category,
  featured
}: {
  name: string;
  category: string | null;
  featured: boolean;
}) {
  return (
    <div
      title={category ? `${name} · ${category}` : name}
      className={[
        'inline-flex items-center gap-1.5 rounded-md border px-2 py-1',
        featured ? 'border-theme-accent/20 bg-theme-accent/5' : 'border-border bg-background'
      ].join(' ')}>
      <span
        className={['size-1.5 rounded-full', featured ? 'bg-theme-accent' : 'bg-muted-foreground/40'].join(
          ' '
        )}
      />

      <span className="text-[9px] font-medium text-foreground">{name}</span>
    </div>
  );
}

function ScopeItem({ title, value }: { title: string; value: string }) {
  return (
    <div>
      <p className="text-[9px] font-medium text-muted-foreground">{title}</p>

      <p className="mt-2 text-[10px] leading-5 text-foreground">{value}</p>
    </div>
  );
}

function ScopeDate({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-[8px] text-muted-foreground">{label}</p>

      <p className="mt-1 text-[10px] font-semibold text-foreground">{value}</p>
    </div>
  );
}
