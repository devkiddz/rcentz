import type { PublicPortfolioProject } from '@/features/portfolio/server/get-portfolio-project';

import { PortfolioDetailGallery } from './PortfolioDetailGallery';
import { PortfolioDetailHero } from './PortfolioDetailHero';
import { PortfolioDetailMoreProjects } from './PortfolioDetailMoreProjects';
import { PortfolioDetailTechnology } from './PortfolioDetailTechnology';
import { PortfolioDetailTechnologyFloat } from './PortfolioDetailTechnologyFloat';

type PortfolioDetailProps = {
  project: PublicPortfolioProject;
};

export function PortfolioDetail({ project }: PortfolioDetailProps) {
  return (
    <main className="relative">
      <PortfolioDetailHero project={project} />

      <PortfolioDetailTechnologyFloat technologies={project.technologies} />

      <PortfolioDetailTechnology technologies={project.technologies} />

      <PortfolioDetailGallery project={project} />

      <PortfolioDetailMoreProjects currentSlug={project.slug} />
    </main>
  );
}
