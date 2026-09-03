import Link from 'next/link';
import { ArrowRight, ArrowUpRight, CheckCircle2 } from 'lucide-react';

import type { PortfolioProjects } from '@/features/portfolio/server/get-portfolio-projects';

type PortfolioIndexProps = {
  projects: PortfolioProjects;
};

function formatLabel(value: string) {
  return value
    .toLowerCase()
    .split('_')
    .map(part => part.charAt(0).toUpperCase() + part.slice(1))
    .join(' ');
}

function formatDate(value: string | null) {
  if (!value) {
    return null;
  }

  return new Intl.DateTimeFormat('en', {
    month: 'short',
    year: 'numeric'
  }).format(new Date(value));
}

export function PortfolioIndex({ projects }: PortfolioIndexProps) {
  const featuredProjects = projects.filter(project => project.featured);
  const featuredProject = featuredProjects[0] ?? projects[0] ?? null;

  const remainingProjects = featuredProject
    ? projects.filter(project => project.id !== featuredProject.id)
    : [];

  if (!featuredProject) {
    return (
      <main className="relative">
        <section className="rcentz-section py-24 sm:py-28">
          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted">Portfolio</p>

          <h1 className="mt-4 max-w-3xl text-4xl font-semibold tracking-[-0.045em] sm:text-5xl">
            Real systems. Real work.
          </h1>

          <p className="mt-5 max-w-2xl text-sm leading-7 text-muted sm:text-base">
            Published Rcentz projects will appear here as they become available.
          </p>
        </section>
      </main>
    );
  }

  const publishedDate = formatDate(featuredProject.publishedAt);
  const completedDate = formatDate(featuredProject.completedAt);

  return (
    <main className="relative">
      <section className="rcentz-section pb-14 pt-20 sm:pb-16 sm:pt-24">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted">Portfolio</p>

            <h1 className="mt-4 max-w-4xl text-4xl font-semibold tracking-[-0.05em] sm:text-5xl lg:text-6xl">
              Systems built from real problems outward.
            </h1>

            <p className="mt-5 max-w-2xl text-sm leading-7 text-muted sm:text-base">
              Explore real Rcentz projects, the thinking behind them, the technology used to build them and
              the outcomes they were designed to create.
            </p>
          </div>

          <div className="grid grid-cols-3 overflow-hidden rounded-2xl border border-border bg-background/55 backdrop-blur-sm">
            <div className="px-4 py-4 text-center sm:px-5">
              <p className="font-mono text-[9px] uppercase tracking-[0.16em] text-muted">Projects</p>
              <p className="mt-2 text-xl font-semibold tracking-[-0.03em]">{projects.length}</p>
            </div>

            <div className="border-x border-border px-4 py-4 text-center sm:px-5">
              <p className="font-mono text-[9px] uppercase tracking-[0.16em] text-muted">Featured</p>
              <p className="mt-2 text-xl font-semibold tracking-[-0.03em]">{featuredProjects.length}</p>
            </div>

            <div className="px-4 py-4 text-center sm:px-5">
              <p className="font-mono text-[9px] uppercase tracking-[0.16em] text-muted">Published</p>
              <p className="mt-2 text-xl font-semibold tracking-[-0.03em]">
                {projects.filter(project => project.publishedAt).length}
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="rcentz-section border-t border-border py-8 sm:py-10">
        <article
          className={[
            'relative overflow-hidden rounded-[28px] border border-border',
            'bg-background/60 backdrop-blur-md',
            'transition-[border-color,background-color] duration-300',
            'hover:border-border-strong hover:bg-surface-raised/70'
          ].join(' ')}>
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[var(--theme-accent)]/45 to-transparent"
          />

          <div className="grid gap-10 p-6 sm:p-8 lg:grid-cols-[minmax(0,1fr)_280px] lg:p-10">
            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-2">
                <span className="rounded-full border border-border bg-surface-muted px-2.5 py-1 font-mono text-[9px] uppercase tracking-[0.15em] text-muted">
                  Featured
                </span>

                <span className="font-mono text-[9px] uppercase tracking-[0.15em] text-muted">
                  {formatLabel(featuredProject.type)}
                </span>

                <span className="size-1 rounded-full bg-border-strong" />

                <span className="font-mono text-[9px] uppercase tracking-[0.15em] text-muted">
                  {formatLabel(featuredProject.status)}
                </span>
              </div>

              <h2 className="mt-5 max-w-3xl text-3xl font-semibold tracking-[-0.045em] sm:text-4xl">
                {featuredProject.name}
              </h2>

              {featuredProject.tagline ? (
                <p className="mt-4 max-w-2xl text-base leading-7 text-foreground/80">
                  {featuredProject.tagline}
                </p>
              ) : null}

              {featuredProject.summary ? (
                <p className="mt-4 max-w-3xl text-sm leading-7 text-muted">{featuredProject.summary}</p>
              ) : featuredProject.description ? (
                <p className="mt-4 max-w-3xl text-sm leading-7 text-muted">{featuredProject.description}</p>
              ) : null}

              {featuredProject.outcome ? (
                <div className="mt-6 max-w-3xl rounded-2xl border border-border bg-surface-muted/55 p-4">
                  <div className="flex items-start gap-3">
                    <span className="mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full border border-border bg-background">
                      <CheckCircle2 aria-hidden="true" className="size-3.5 text-[var(--theme-accent)]" />
                    </span>

                    <div>
                      <p className="font-mono text-[9px] uppercase tracking-[0.17em] text-muted">Outcome</p>
                      <p className="mt-2 text-sm leading-6 text-foreground/80">{featuredProject.outcome}</p>
                    </div>
                  </div>
                </div>
              ) : null}

              <div className="mt-7 flex flex-wrap gap-2">
                {featuredProject.technologies.slice(0, 8).map(technology => (
                  <span
                    key={technology.slug}
                    className="rounded-full border border-border bg-background/70 px-2.5 py-1 font-mono text-[9px] text-muted">
                    {technology.name}
                  </span>
                ))}
              </div>

              <div className="mt-8 flex flex-wrap items-center gap-3">
                <Link
                  href={`/portfolio/${featuredProject.slug}`}
                  className={[
                    'inline-flex h-10 items-center gap-2 rounded-full',
                    'border border-primary bg-primary px-4',
                    'text-[12px] font-medium text-primary-foreground',
                    'transition-opacity hover:opacity-85'
                  ].join(' ')}>
                  View case study
                  <ArrowRight aria-hidden="true" className="size-3.5" />
                </Link>

                {featuredProject.liveUrl ? (
                  <a
                    href={featuredProject.liveUrl}
                    target="_blank"
                    rel="noreferrer"
                    className={[
                      'inline-flex h-10 items-center gap-2 rounded-full',
                      'border border-border bg-surface-muted px-4',
                      'text-[12px] font-medium text-foreground',
                      'transition-[background-color,border-color]',
                      'hover:border-border-strong hover:bg-secondary'
                    ].join(' ')}>
                    Visit live project
                    <ArrowUpRight aria-hidden="true" className="size-3.5" />
                  </a>
                ) : null}
              </div>
            </div>

            <aside className="grid content-start gap-px overflow-hidden rounded-2xl border border-border bg-border">
              <div className="bg-background/95 p-4">
                <p className="font-mono text-[9px] uppercase tracking-[0.17em] text-muted">Progress</p>

                <div className="mt-3 flex items-end justify-between gap-4">
                  <p className="text-3xl font-semibold tracking-[-0.05em]">{featuredProject.progress}%</p>

                  <p className="font-mono text-[9px] uppercase tracking-[0.14em] text-muted">
                    {formatLabel(featuredProject.status)}
                  </p>
                </div>

                <div className="mt-4 h-1 overflow-hidden rounded-full bg-surface-muted">
                  <div
                    className="h-full rounded-full bg-[var(--theme-accent)]"
                    style={{ width: `${Math.min(Math.max(featuredProject.progress, 0), 100)}%` }}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-px bg-border">
                <div className="bg-background/95 p-4">
                  <p className="font-mono text-[9px] uppercase tracking-[0.16em] text-muted">Published</p>
                  <p className="mt-2 text-[12px] font-medium">{publishedDate ?? 'Active'}</p>
                </div>

                <div className="bg-background/95 p-4">
                  <p className="font-mono text-[9px] uppercase tracking-[0.16em] text-muted">Completed</p>
                  <p className="mt-2 text-[12px] font-medium">{completedDate ?? 'In motion'}</p>
                </div>
              </div>

              <div className="bg-background/95 p-4">
                <p className="font-mono text-[9px] uppercase tracking-[0.16em] text-muted">Technology</p>
                <p className="mt-2 text-sm font-medium">{featuredProject.technologies.length} technologies</p>
              </div>
            </aside>
          </div>
        </article>
      </section>

      {remainingProjects.length > 0 ? (
        <section className="rcentz-section border-t border-border py-16 sm:py-20">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted">More work</p>

              <h2 className="mt-3 text-2xl font-semibold tracking-[-0.04em] sm:text-3xl">
                More systems in motion.
              </h2>
            </div>

            <p className="max-w-md text-sm leading-6 text-muted">
              Each project opens into its own case study with its architecture, development story and
              outcomes.
            </p>
          </div>

          <div className="mt-10 grid gap-4 lg:grid-cols-2">
            {remainingProjects.map(project => (
              <article
                key={project.id}
                className={[
                  'group flex min-h-[320px] flex-col rounded-3xl border border-border',
                  'bg-background/55 p-6 backdrop-blur-sm sm:p-7',
                  'transition-[background-color,border-color] duration-300',
                  'hover:border-border-strong hover:bg-surface-raised/75'
                ].join(' ')}>
                <div className="flex flex-wrap items-center gap-2">
                  <p className="font-mono text-[9px] uppercase tracking-[0.16em] text-muted">
                    {formatLabel(project.type)}
                  </p>

                  <span className="size-1 rounded-full bg-border-strong" />

                  <p className="font-mono text-[9px] uppercase tracking-[0.16em] text-muted">
                    {formatLabel(project.status)}
                  </p>
                </div>

                <h3 className="mt-4 text-2xl font-semibold tracking-[-0.04em]">{project.name}</h3>

                {project.tagline ? (
                  <p className="mt-3 text-sm leading-6 text-foreground/80">{project.tagline}</p>
                ) : null}

                {project.summary ? (
                  <p className="mt-4 line-clamp-4 text-sm leading-7 text-muted">{project.summary}</p>
                ) : project.description ? (
                  <p className="mt-4 line-clamp-4 text-sm leading-7 text-muted">{project.description}</p>
                ) : null}

                <div className="mt-5 flex flex-wrap gap-2">
                  {project.technologies.slice(0, 5).map(technology => (
                    <span
                      key={technology.slug}
                      className="rounded-full border border-border bg-surface-muted px-2.5 py-1 font-mono text-[9px] text-muted">
                      {technology.name}
                    </span>
                  ))}
                </div>

                <div className="mt-auto pt-8">
                  <div className="flex items-center justify-between gap-4 border-t border-border pt-4">
                    <div>
                      <p className="font-mono text-[9px] uppercase tracking-[0.15em] text-muted">Progress</p>
                      <p className="mt-1 text-sm font-medium">{project.progress}%</p>
                    </div>

                    <Link
                      href={`/portfolio/${project.slug}`}
                      aria-label={`View ${project.name} case study`}
                      className={[
                        'inline-flex size-9 items-center justify-center rounded-full',
                        'border border-border bg-surface-muted text-muted',
                        'transition-[background-color,border-color,color,transform]',
                        'group-hover:translate-x-0.5',
                        'hover:border-border-strong hover:bg-secondary hover:text-foreground'
                      ].join(' ')}>
                      <ArrowRight aria-hidden="true" className="size-3.5" />
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>
      ) : null}
    </main>
  );
}
