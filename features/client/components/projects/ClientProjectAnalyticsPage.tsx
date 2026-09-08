import Link from 'next/link';

import { Activity, ArrowLeft, BarChart3, MousePointerClick, Radio, TrendingUp } from 'lucide-react';

import type { ClientProject } from '@/features/client/server/projects/get-client-project';

type ClientProjectAnalyticsPageProps = {
  project: ClientProject;
};

function formatLabel(value: string) {
  return value
    .toLowerCase()
    .split('_')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

export function ClientProjectAnalyticsPage({ project }: ClientProjectAnalyticsPageProps) {
  return (
    <main className="py-6 sm:py-8">
      <div className="space-y-7">
        <section className="px-1">
          <Link
            href={`/dashboard/projects/${project.id}`}
            className="inline-flex items-center gap-1.5 text-[9px] font-medium text-muted-foreground transition-colors hover:text-foreground">
            <ArrowLeft aria-hidden="true" className="size-3" />

            {project.name}
          </Link>

          <div className="mt-3 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                Analytics
              </p>

              <h1 className="mt-2 text-xl font-semibold tracking-[-0.04em] text-foreground sm:text-2xl">
                Project performance
              </h1>

              <p className="mt-1 max-w-2xl text-xs leading-5 text-muted-foreground">
                Visits, engagement, functions and conversion intelligence for {project.name}.
              </p>
            </div>

            <span className="w-fit rounded-full border border-border bg-surface-muted px-2.5 py-1 text-[8px] font-semibold uppercase tracking-[0.1em] text-muted-foreground">
              {formatLabel(project.status)}
            </span>
          </div>
        </section>

        <PerformanceStrength />

        <ProjectAnalysis project={project} />
      </div>
    </main>
  );
}

function PerformanceStrength() {
  const cards = [
    {
      title: 'Traffic strength',
      icon: TrendingUp,
      description: 'Visits, page views and traffic movement.'
    },
    {
      title: 'Engagement strength',
      icon: Activity,
      description: 'Interaction quality and user engagement.'
    },
    {
      title: 'Function performance',
      icon: MousePointerClick,
      description: 'Clicks, actions and key feature usage.'
    }
  ];

  return (
    <section>
      <div className="mb-3 px-1">
        <h2 className="text-sm font-semibold tracking-[-0.02em] text-foreground">Performance strength</h2>

        <p className="mt-1 text-[10px] text-muted-foreground">Current product performance intelligence.</p>
      </div>

      <div className="grid gap-3 md:grid-cols-3">
        {cards.map(card => {
          const Icon = card.icon;

          return (
            <article
              key={card.title}
              className="relative overflow-hidden rounded-[18px] border border-border bg-surface p-5">
              <div
                aria-hidden="true"
                className="pointer-events-none absolute right-[-35px] top-[-35px] size-28 rounded-full bg-theme-accent-faint blur-3xl"
              />

              <div className="relative">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex size-9 items-center justify-center rounded-xl border border-border bg-surface-muted/50">
                    <Icon aria-hidden="true" className="size-4 text-theme-accent" />
                  </div>

                  <span className="rounded-full border border-border bg-background/60 px-2.5 py-1 text-[8px] text-muted-foreground">
                    Awaiting data
                  </span>
                </div>

                <p className="mt-5 text-[10px] font-medium text-muted-foreground">{card.title}</p>

                <div className="mt-1 flex items-end gap-2">
                  <p className="text-2xl font-semibold tracking-[-0.05em] text-foreground">—</p>

                  <span className="pb-1 text-[8px] text-muted-foreground">not measured</span>
                </div>

                <p className="mt-3 text-[9px] leading-4 text-muted-foreground">{card.description}</p>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}

function ProjectAnalysis({ project }: { project: ClientProject }) {
  return (
    <section className="overflow-hidden rounded-[20px] border border-border bg-surface">
      <div className="flex flex-col gap-4 border-b border-border px-5 py-5 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="flex items-center gap-2">
            <BarChart3 aria-hidden="true" className="size-4 text-theme-accent" />

            <h2 className="text-sm font-semibold text-foreground">Project analysis</h2>
          </div>

          <p className="mt-1.5 max-w-xl text-[10px] leading-4 text-muted-foreground">
            Performance analysis remains available while this project is under Rcentz care.
          </p>
        </div>

        <span className="w-fit rounded-full border border-border bg-surface-muted/40 px-2.5 py-1 text-[8px] text-muted-foreground">
          {project.name}
        </span>
      </div>

      <div className="grid lg:grid-cols-[minmax(0,1.6fr)_minmax(280px,0.7fr)]">
        <div className="min-w-0 p-5">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-[9px] font-medium uppercase tracking-[0.12em] text-muted-foreground">
                Performance trend
              </p>

              <p className="mt-1 text-[10px] text-muted-foreground">
                Visits and interaction activity over time.
              </p>
            </div>

            <span className="text-[8px] text-muted-foreground">Awaiting analytics</span>
          </div>

          <div className="mt-5 flex h-[190px] items-center justify-center rounded-[16px] border border-dashed border-border bg-surface-muted/20">
            <div className="max-w-sm px-5 text-center">
              <BarChart3 aria-hidden="true" className="mx-auto size-5 text-muted-foreground" />

              <p className="mt-3 text-[11px] font-medium text-foreground">
                Performance data will appear here
              </p>

              <p className="mt-1.5 text-[9px] leading-4 text-muted-foreground">
                Live Rcentz events and external analytics will feed this project-specific analysis.
              </p>
            </div>
          </div>
        </div>

        <div className="border-t border-border p-5 lg:border-l lg:border-t-0">
          <p className="text-[9px] font-medium uppercase tracking-[0.12em] text-muted-foreground">
            Analysis coverage
          </p>

          <div className="mt-4 divide-y divide-border">
            <AnalysisMetric label="Visits" description="Sessions and project traffic" />

            <AnalysisMetric label="Pages" description="Views and high-performing routes" />

            <AnalysisMetric label="Clicks" description="Tracked calls to action" />

            <AnalysisMetric label="Functions" description="Key feature and action usage" />

            <AnalysisMetric label="Conversions" description="Important completed actions" />

            <AnalysisMetric label="Traffic sources" description="How visitors reach the project" />
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-3 border-t border-border bg-surface-muted/20 px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-start gap-2.5">
          <Radio aria-hidden="true" className="mt-0.5 size-3.5 shrink-0 text-theme-accent" />

          <div>
            <p className="text-[9px] font-medium text-foreground">Analytics collection ready</p>

            <p className="mt-0.5 text-[8px] leading-4 text-muted-foreground">
              This page will only display performance metrics collected for this specific project.
            </p>
          </div>
        </div>

        <span className="shrink-0 rounded-full border border-border bg-background px-2.5 py-1 text-[8px] text-muted-foreground">
          Project scoped
        </span>
      </div>
    </section>
  );
}

function AnalysisMetric({ label, description }: { label: string; description: string }) {
  return (
    <div className="flex items-center justify-between gap-4 py-3 first:pt-0 last:pb-0">
      <div className="min-w-0">
        <p className="text-[10px] font-medium text-foreground">{label}</p>

        <p className="mt-0.5 truncate text-[8px] text-muted-foreground">{description}</p>
      </div>

      <span className="text-[10px] font-semibold text-muted-foreground">—</span>
    </div>
  );
}
