import { getPortfolioProjects } from '@/features/portfolio/server/get-portfolio-projects';
import { PortfolioDetailProjectsCarousel } from './PortfolioDetailProjectsCarousel';

type PortfolioDetailMoreProjectsProps = {
  currentSlug: string;
};

export async function PortfolioDetailMoreProjects({ currentSlug }: PortfolioDetailMoreProjectsProps) {
  const projects = await getPortfolioProjects();

  const relatedProjects = projects.filter(project => project.slug !== currentSlug);

  if (!relatedProjects.length) {
    return null;
  }

  return <PortfolioDetailProjectsCarousel projects={relatedProjects} />;
}
