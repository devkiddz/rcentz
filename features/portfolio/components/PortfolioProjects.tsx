import { getTranslations } from 'next-intl/server';

import type { PortfolioProjects as PortfolioProjectList } from '@/features/portfolio/server/get-portfolio-projects';

import { PortfolioProjectCard } from './PortfolioProjectCard';

type PortfolioProjectsProps = {
  projects: PortfolioProjectList;
};

export async function PortfolioProjects({ projects }: PortfolioProjectsProps) {
  const t = await getTranslations('PortfolioProjects');

  if (projects.length === 0) {
    return null;
  }

  return (
    <section id="projects" className="border-t border-border py-20 sm:py-24">
      <div className="mx-auto w-full max-w-[1320px] px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl">
          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted">{t('eyebrow')}</p>

          <h2 className="mt-4 text-3xl font-semibold tracking-[-0.045em] sm:text-4xl lg:text-5xl">
            {t('titlePrimary')} <span className="text-muted">{t('titleSecondary')}</span>
          </h2>

          <p className="mt-6 max-w-2xl text-sm leading-7 text-muted sm:text-base">{t('description')}</p>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:gap-7">
          {projects.map((project, index) => (
            <PortfolioProjectCard
              key={project.id}
              project={project}
              index={index}
              featured={project.featured}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
