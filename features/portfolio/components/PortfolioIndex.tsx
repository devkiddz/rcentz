import Link from 'next/link';
import { ArrowRight, ArrowUpRight } from 'lucide-react';

import { PortfolioMediaCarousel } from '@/features/portfolio/components/PortfolioMediaCarousel';
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
          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted">Work / Rcentz</p>

          <h1 className="mt-4 max-w-3xl text-4xl font-semibold tracking-[-0.045em] sm:text-5xl">
            Systems we&apos;ve actually built.
          </h1>

          <p className="mt-5 max-w-2xl text-sm leading-7 text-muted sm:text-base">
            Published Rcentz projects will appear here as they become available.
          </p>
        </section>
      </main>
    );
  }

  return (
    <main className="relative">
      <section className="rcentz-section pb-12 pt-20 sm:pb-16 sm:pt-24">
        <div className="max-w-5xl">
          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted">Work / Rcentz</p>

          <h1 className="mt-4 max-w-4xl text-4xl font-semibold tracking-[-0.055em] sm:text-5xl lg:text-6xl">
            Systems we&apos;ve actually built.
          </h1>

          <p className="mt-6 max-w-2xl text-sm leading-7 text-muted sm:text-base">
            Real products, real project screens and the engineering stories behind them.
          </p>

          <p className="mt-5 font-mono text-[9px] uppercase tracking-[0.15em] text-muted">
            {projects.length} public {projects.length === 1 ? 'project' : 'projects'}
          </p>
        </div>
      </section>

      <section className="rcentz-section border-t border-border py-8 sm:py-10">
        <article className="group overflow-hidden rounded-[32px] border border-border bg-background/60 backdrop-blur-md transition-[border-color,background-color] duration-300 hover:border-border-strong hover:bg-surface-raised/70">
          <div className="grid lg:grid-cols-[0.72fr_1.28fr]">
            <div className="flex min-h-[460px] flex-col p-6 sm:p-8 lg:min-h-[560px] lg:p-10">
              <div className="flex flex-wrap items-center gap-2">
                <span className="rounded-full border border-theme-accent/20 bg-theme-accent-faint px-3 py-1.5 font-mono text-[8px] uppercase tracking-[0.16em] text-theme-accent">
                  Featured project
                </span>

                <span className="font-mono text-[8px] uppercase tracking-[0.16em] text-muted">
                  {formatLabel(featuredProject.type)}
                </span>

                <span className="size-1 rounded-full bg-border-strong" />

                <span className="font-mono text-[8px] uppercase tracking-[0.16em] text-muted">
                  {formatLabel(featuredProject.status)}
                </span>
              </div>

              <div className="mt-auto pt-16">
                <h2 className="text-4xl font-semibold tracking-[-0.055em] sm:text-5xl">
                  {featuredProject.name}
                </h2>

                {featuredProject.tagline ? (
                  <p className="mt-5 max-w-xl text-base leading-7 text-foreground/80">
                    {featuredProject.tagline}
                  </p>
                ) : null}

                {featuredProject.summary ?? featuredProject.description ? (
                  <p className="mt-5 max-w-xl text-sm leading-7 text-muted">
                    {featuredProject.summary ?? featuredProject.description}
                  </p>
                ) : null}

                <div className="mt-7 flex flex-wrap gap-2">
                  {featuredProject.technologies.slice(0, 5).map(technology => (
                    <span
                      key={technology.slug}
                      className="rounded-full border border-border bg-surface-muted px-2.5 py-1 font-mono text-[8px] text-muted">
                      {technology.name}
                    </span>
                  ))}
                </div>

                <div className="mt-8 flex flex-wrap gap-3">
                  <Link
                    href={`/portfolio/${featuredProject.slug}`}
                    className="inline-flex h-11 items-center gap-2 rounded-full bg-primary px-5 text-[12px] font-medium text-primary-foreground transition-opacity hover:opacity-85">
                    View project
                    <ArrowRight aria-hidden="true" className="size-3.5" />
                  </Link>

                  {featuredProject.liveUrl ? (
                    <a
                      href={featuredProject.liveUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex h-11 items-center gap-2 rounded-full border border-border bg-surface-muted px-5 text-[12px] font-medium transition-[background-color,border-color] hover:border-border-strong hover:bg-secondary">
                      Live system
                      <ArrowUpRight aria-hidden="true" className="size-3.5" />
                    </a>
                  ) : null}
                </div>
              </div>
            </div>

            <div className="order-first min-h-[360px] border-b border-border lg:order-last lg:min-h-[560px] lg:border-b-0 lg:border-l">
              <PortfolioMediaCarousel
                projectName={featuredProject.name}
                media={featuredProject.media}
                className="h-full min-h-[360px] lg:min-h-[560px]"
              />
            </div>
          </div>
        </article>
      </section>

      {remainingProjects.length > 0 ? (
        <section className="rcentz-section border-t border-border py-16 sm:py-20">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted">More work</p>

              <h2 className="mt-3 text-2xl font-semibold tracking-[-0.04em] sm:text-3xl">
                Different products. One engineering discipline.
              </h2>
            </div>

            <p className="max-w-md text-sm leading-6 text-muted">
              Open a project to see the product, its decisions, architecture and development record.
            </p>
          </div>

          <div className="mt-10 grid gap-5 md:grid-cols-2">
            {remainingProjects.map((project, index) => {
              const wide = index % 3 === 0;

              return (
                <article
                  key={project.id}
                  className={[
                    'group overflow-hidden rounded-[28px] border border-border bg-background/58 backdrop-blur-sm',
                    'transition-[background-color,border-color,transform] duration-300',
                    'hover:-translate-y-px hover:border-border-strong hover:bg-surface-raised/70',
                    wide ? 'md:col-span-2 md:grid md:grid-cols-[1.12fr_0.88fr]' : ''
                  ].join(' ')}>
                  <div
                    className={[
                      'min-h-[260px]',
                      wide ? 'border-b border-border md:min-h-[360px] md:border-b-0 md:border-r' : 'border-b border-border'
                    ].join(' ')}>
                    <PortfolioMediaCarousel
                      projectName={project.name}
                      media={project.media}
                      className={wide ? 'h-full min-h-[260px] md:min-h-[360px]' : 'h-full min-h-[260px]'}
                    />
                  </div>

                  <div className="flex min-h-[300px] flex-col p-6 sm:p-7">
                    <div className="flex flex-wrap items-center gap-2">
                      <p className="font-mono text-[8px] uppercase tracking-[0.16em] text-muted">
                        {formatLabel(project.type)}
                      </p>

                      <span className="size-1 rounded-full bg-border-strong" />

                      <p className="font-mono text-[8px] uppercase tracking-[0.16em] text-muted">
                        {formatLabel(project.status)}
                      </p>
                    </div>

                    <h3 className="mt-4 text-2xl font-semibold tracking-[-0.045em]">{project.name}</h3>

                    <p className="mt-3 line-clamp-3 text-sm leading-6 text-muted">
                      {project.tagline ?? project.summary ?? project.description ?? 'Rcentz project.'}
                    </p>

                    <div className="mt-5 flex flex-wrap gap-1.5">
                      {project.technologies.slice(0, 4).map(technology => (
                        <span
                          key={technology.slug}
                          className="rounded-full border border-border bg-surface-muted px-2.5 py-1 font-mono text-[7px] text-muted">
                          {technology.name}
                        </span>
                      ))}
                    </div>

                    <div className="mt-auto flex items-center justify-between gap-4 pt-8">
                      <p className="font-mono text-[8px] uppercase tracking-[0.14em] text-muted">
                        {project.progress}% complete
                      </p>

                      <Link
                        href={`/portfolio/${project.slug}`}
                        aria-label={`View ${project.name} case study`}
                        className="inline-flex size-10 items-center justify-center rounded-full border border-border bg-surface-muted text-muted transition-[background-color,border-color,color,transform] group-hover:translate-x-0.5 hover:border-border-strong hover:bg-secondary hover:text-foreground">
                        <ArrowRight aria-hidden="true" className="size-4" />
                      </Link>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </section>
      ) : null}
    </main>
  );
}
