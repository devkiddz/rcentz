import type { PortfolioProjects as PortfolioProjectList } from '@/features/portfolio/server/get-portfolio-projects';

import { PortfolioProjectCard } from './PortfolioProjectCard';

type PortfolioProjectsProps = {
  projects: PortfolioProjectList;
};

export function PortfolioProjects({ projects }: PortfolioProjectsProps) {
  const [featured, ...rest] = projects;

  if (!featured) {
    return null;
  }

  return (
    <section id="projects" className="border-t border-border py-20 sm:py-24">
      <div className="max-w-5xl">
        <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted">Published work</p>

        <h2 className="mt-4 text-3xl font-semibold tracking-[-0.045em] sm:text-4xl lg:text-5xl">
          Real project screens.
          <span className="text-muted"> Real architecture and recorded outcomes.</span>
        </h2>

        <p className="mt-6 max-w-2xl text-sm leading-7 text-muted sm:text-base">
          Each project below is driven from the same public project records used across Rcentz, including its
          technologies, state, media and public links.
        </p>
      </div>

      <div className="mt-12">
        <PortfolioProjectCard project={featured} index={0} featured />
      </div>

      {rest.length > 0 ? (
        <div className="mt-4 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {rest.map((project, index) => (
            <PortfolioProjectCard key={project.id} project={project} index={index + 1} />
          ))}
        </div>
      ) : null}
    </section>
  );
}
