import { ArrowUpRight } from 'lucide-react';

import type { HomepageData } from '@/features/home/server/get-homepage-data';

type HomeProjectsProps = {
  projects: HomepageData['projects'];
};

export function HomeProjects({ projects }: HomeProjectsProps) {
  return (
    <section id="work" className="rcentz-section border-t border-border py-20">
      <div>
        <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted">Selected work</p>

        <h2 className="mt-3 text-2xl font-semibold tracking-[-0.035em] sm:text-3xl">
          Systems already in motion.
        </h2>

        <p className="mt-4 max-w-xl text-sm leading-6 text-muted">
          Real Rcentz projects, their current state and the technologies behind them.
        </p>
      </div>

      <div className="mt-10 space-y-3">
        {projects.map(project => (
          <article
            key={project.id}
            className={[
              'group rounded-2xl border border-border',
              'bg-background/55 p-6 backdrop-blur-sm',
              'transition-[background-color,border-color]',
              'hover:border-border-strong hover:bg-surface-raised/80'
            ].join(' ')}>
            <div className="grid gap-6 md:grid-cols-[1fr_auto] md:items-start">
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <p className="font-mono text-[9px] uppercase tracking-[0.16em] text-muted">
                    {project.type}
                  </p>

                  <span className="size-1 rounded-full bg-border-strong" />

                  <p className="font-mono text-[9px] uppercase tracking-[0.16em] text-muted">
                    {project.status}
                  </p>
                </div>

                <h3 className="mt-3 text-xl font-semibold tracking-[-0.03em]">{project.name}</h3>

                {project.tagline ? (
                  <p className="mt-3 max-w-2xl text-sm leading-6 text-muted">{project.tagline}</p>
                ) : null}

                <div className="mt-5 flex flex-wrap gap-2">
                  {project.technologies.slice(0, 6).map(technology => (
                    <span
                      key={technology.slug}
                      className="rounded-full border border-border bg-surface-muted px-2.5 py-1 font-mono text-[9px] text-muted">
                      {technology.name}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex items-center gap-3 md:flex-col md:items-end">
                <span className="font-mono text-[10px] text-muted">{project.progress}%</span>

                {project.liveUrl ? (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={`Open ${project.name}`}
                    className={[
                      'inline-flex size-8 items-center justify-center rounded-full',
                      'border border-border bg-surface-muted',
                      'text-muted',
                      'transition-[background-color,border-color,color]',
                      'hover:border-border-strong hover:bg-secondary hover:text-foreground'
                    ].join(' ')}>
                    <ArrowUpRight aria-hidden="true" className="size-3.5" />
                  </a>
                ) : null}
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
