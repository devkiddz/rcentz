import type { PublicPortfolioProject } from '@/features/portfolio/server/get-portfolio-project';

import { PortfolioCaseStudyGrid } from '@/features/portfolio/components/detail/PortfolioCaseStudyGrid';

import { ProjectArchitectureCard } from '@/features/portfolio/components/detail/ProjectArchitectureCard';

import { ProjectHeroCard } from '@/features/portfolio/components/detail/ProjectHeroCard';

import { ProjectMetricsGrid } from '@/features/portfolio/components/detail/ProjectMetricsGrid';

import { ProjectOutcomeCard } from '@/features/portfolio/components/detail/ProjectOutcomeCard';

import { ProjectStoryGrid } from '@/features/portfolio/components/detail/ProjectStoryGrid';

import { ProjectDevelopmentRecord } from '@/features/portfolio/components/detail/ProjectDevelopmentRecord';

import { ProjectFinalCTA } from '@/features/portfolio/components/detail/ProjectFinalCTA';

type PortfolioProjectDetailProps = {
  project: PublicPortfolioProject;
};

export function PortfolioProjectDetail({ project }: PortfolioProjectDetailProps) {
  return (
    <article className="relative pb-24 sm:pb-28 lg:pb-32">
      <PortfolioCaseStudyGrid>
        <ProjectHeroCard project={project} />

        <ProjectMetricsGrid project={project} />

        <ProjectStoryGrid project={project} />

        <ProjectArchitectureCard technologies={project.technologies} />

        {project.updates.length > 0 ? (
          <div className="lg:col-span-12">
            <ProjectDevelopmentRecord updates={project.updates} />
          </div>
        ) : null}

        <ProjectOutcomeCard project={project} />

        <div className="lg:col-span-12">
          <ProjectFinalCTA project={project} />
        </div>
      </PortfolioCaseStudyGrid>
    </article>
  );
}
