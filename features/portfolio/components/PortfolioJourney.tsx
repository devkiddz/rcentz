import type { PortfolioProjects } from '@/features/portfolio/server/get-portfolio-projects';

type PortfolioJourneyProps = {
  projects: PortfolioProjects;
};

function humanize(value: string) {
  return value
    .toLowerCase()
    .split('_')
    .map(part => part.charAt(0).toUpperCase() + part.slice(1))
    .join(' ');
}

function formatDate(value: string | null) {
  if (!value) {
    return 'Recorded';
  }

  return new Intl.DateTimeFormat('en', {
    month: 'short',
    year: 'numeric'
  }).format(new Date(value));
}

export function PortfolioJourney({ projects }: PortfolioJourneyProps) {
  const journey = [...projects].sort((a, b) => {
    const aDate = a.startedAt ? new Date(a.startedAt).getTime() : 0;
    const bDate = b.startedAt ? new Date(b.startedAt).getTime() : 0;

    return bDate - aDate;
  });

  if (!journey.length) {
    return null;
  }

  return (
    <section id="journey" className="border-t border-border py-20 sm:py-24">
      <div className="grid gap-10 lg:grid-cols-[0.72fr_1.28fr] lg:gap-14">
        <div className="max-w-md">
          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted">Build journey</p>

          <h2 className="mt-4 text-3xl font-semibold tracking-[-0.045em] sm:text-4xl">
            A record of how the product work has grown.
          </h2>

          <p className="mt-5 text-sm leading-7 text-muted">
            This is project history, not a fabricated employment timeline. Dates, states and technologies come
            from the published Rcentz project records.
          </p>
        </div>

        <div className="overflow-hidden rounded-[28px] border border-border bg-background/55 backdrop-blur-sm">
          {journey.map((project, index) => (
            <article
              key={project.id}
              className={[
                'grid gap-4 p-5 sm:grid-cols-[110px_1fr] sm:p-6',
                index > 0 ? 'border-t border-border' : ''
              ].join(' ')}>
              <div>
                <p className="font-mono text-[8px] uppercase tracking-[0.15em] text-theme-accent">
                  {formatDate(project.startedAt)}
                </p>
                <p className="mt-2 font-mono text-[7px] uppercase tracking-[0.13em] text-muted">
                  {humanize(project.status)}
                </p>
              </div>

              <div className="min-w-0">
                <div className="flex flex-wrap items-baseline justify-between gap-3">
                  <h3 className="text-base font-medium tracking-[-0.02em]">{project.name}</h3>
                  <span className="font-mono text-[8px] uppercase tracking-[0.13em] text-muted">
                    {humanize(project.type)}
                  </span>
                </div>

                <p className="mt-2 text-[11px] leading-5 text-muted">
                  {project.summary ?? project.tagline ?? project.description ?? 'Published Rcentz project.'}
                </p>

                <div className="mt-4 flex flex-wrap gap-1.5">
                  {project.technologies.slice(0, 5).map(technology => (
                    <span
                      key={technology.slug}
                      className="rounded-full border border-border bg-surface-muted px-2 py-1 font-mono text-[7px] text-muted">
                      {technology.name}
                    </span>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
