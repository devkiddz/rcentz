import type { PortfolioProjects as PortfolioProjectList } from '@/features/portfolio/server/get-portfolio-projects';

import { PortfolioAbout } from './PortfolioAbout';
import { PortfolioHero } from './PortfolioHero';
import { PortfolioJourney } from './PortfolioJourney';
import { PortfolioOutcomes } from './PortfolioOutcomes';
import { PortfolioProjects } from './PortfolioProjects';
import { PortfolioTechnologyRail } from './PortfolioTechnologyRail';

type PortfolioIndexProps = {
  projects: PortfolioProjectList;
};

export function PortfolioIndex({ projects }: PortfolioIndexProps) {
  const outcomes = projects
    .filter(project => project.outcome)
    .map(project => ({
      id: project.id,
      projectName: project.name,
      projectType: project.type,
      projectStatus: project.status,
      outcome: project.outcome as string,
      image: project.media[0]?.url ?? null
    }));

  return (
    <main className="relative">
      <PortfolioHero projects={projects} />
      <PortfolioAbout projects={projects} />
      <PortfolioTechnologyRail projects={projects} />
      <PortfolioProjects projects={projects} />
      <PortfolioJourney projects={projects} />
      <PortfolioOutcomes outcomes={outcomes} />
    </main>
  );
}
