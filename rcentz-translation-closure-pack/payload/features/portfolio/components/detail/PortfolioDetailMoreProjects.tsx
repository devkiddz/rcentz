import { getPortfolioProjects } from '@/features/portfolio/server/get-portfolio-projects';
import { getResolvedLocale } from '@/features/i18n/server/get-resolved-locale';
import { PortfolioDetailProjectsCarousel } from './PortfolioDetailProjectsCarousel';
type Props={currentSlug:string};export async function PortfolioDetailMoreProjects({currentSlug}:Props){const locale=await getResolvedLocale();const projects=await getPortfolioProjects(locale);const related=projects.filter(p=>p.slug!==currentSlug);if(!related.length)return null;return <PortfolioDetailProjectsCarousel projects={related}/>}
