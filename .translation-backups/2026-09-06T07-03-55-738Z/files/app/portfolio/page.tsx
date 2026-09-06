import { PortfolioIndex } from '@/features/portfolio/components/PortfolioIndex';
import { getPortfolioProjects } from '@/features/portfolio/server/get-portfolio-projects';

export const revalidate = 300;

export default async function PortfolioPage() {
  const projects = await getPortfolioProjects();

  return <PortfolioIndex projects={projects} />;
}
