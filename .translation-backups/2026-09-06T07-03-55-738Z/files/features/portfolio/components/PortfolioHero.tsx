import { ArrowRight } from 'lucide-react';

import type { PortfolioProjects } from '@/features/portfolio/server/get-portfolio-projects';

import { PortfolioHeroScreenshots } from './PortfolioHeroScreenshots';

type PortfolioHeroProps = {
  projects: PortfolioProjects;
};

export function PortfolioHero({ projects }: PortfolioHeroProps) {
  const screenshots = projects.flatMap(project =>
    project.media.map(media => ({
      ...media,
      projectId: project.id,
      projectName: project.name,
      projectSlug: project.slug,
      projectType: project.type
    }))
  );

  return (
    <section className="relative isolate overflow-hidden pb-14 pt-3 sm:pb-16 sm:pt-4 lg:pb-20 lg:pt-5">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-65 rcentz-grid-fade"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-24 top-12 size-72 rounded-full bg-theme-accent-faint blur-3xl"
      />

      <div className="relative z-10 mx-auto w-full max-w-[1140px]">
        <div className="grid items-start lg:min-h-[500px] lg:grid-cols-[0.82fr_1.18fr] lg:items-center lg:gap-5 xl:gap-7">
          <div className="relative z-20 flex flex-col justify-center pt-1 lg:max-w-[445px] lg:pt-0">
            <div className="flex items-center gap-2">
              <span className="size-1.5 rounded-full bg-theme-accent" />

              <p className="font-mono text-[8px] font-medium uppercase tracking-[0.17em] text-muted sm:text-[9px] lg:text-[10px]">
                Portfolio · Products · Systems
              </p>
            </div>

            <h1 className="mt-3 max-w-[420px] text-balance text-[2rem] font-semibold leading-[0.98] tracking-[-0.055em] sm:text-[2.35rem] lg:mt-4 lg:max-w-[455px] lg:text-[3.3rem] lg:leading-[0.97]">
              Built systems,
              <span className="block bg-gradient-to-r from-foreground via-theme-accent to-theme-accent-strong bg-clip-text text-transparent">
                shown as they exist.
              </span>
            </h1>

            <p className="mt-3 max-w-[410px] text-[12px] leading-[1.7] text-muted sm:text-[13px] lg:mt-4 lg:max-w-[435px] lg:text-[15px] lg:leading-6">
              A growing record of real Rcentz work — the products, interfaces, data systems and reusable
              foundations built across commerce, employment and application infrastructure.
            </p>

            <div className="mt-5 flex flex-wrap gap-2">
              <span className="rounded-full border border-border bg-background/55 px-3 py-1.5 font-mono text-[8px] uppercase tracking-[0.13em] text-muted backdrop-blur-xl">
                {projects.length} public {projects.length === 1 ? 'project' : 'projects'}
              </span>

              <span className="rounded-full border border-border bg-background/55 px-3 py-1.5 font-mono text-[8px] uppercase tracking-[0.13em] text-muted backdrop-blur-xl">
                {screenshots.length} real {screenshots.length === 1 ? 'screen' : 'screens'}
              </span>
            </div>

            <div className="mt-6 flex flex-wrap items-center gap-2.5">
              <a
                href="#projects"
                className="group inline-flex h-10 items-center justify-center gap-2 rounded-full bg-primary px-5 text-[12px] font-medium text-primary-foreground transition-[opacity,transform] hover:opacity-90 active:scale-[0.98] lg:text-[13px]">
                Explore projects
                <ArrowRight
                  aria-hidden="true"
                  className="size-3.5 transition-transform duration-300 group-hover:translate-x-0.5"
                />
              </a>

              <a
                href="#journey"
                className="group inline-flex h-10 items-center justify-center gap-2 rounded-full border border-border bg-background/40 px-5 text-[12px] font-medium text-foreground backdrop-blur-xl transition-[background-color,border-color,transform] hover:border-border-strong hover:bg-surface-muted active:scale-[0.98] lg:text-[13px]">
                Build journey
                <ArrowRight
                  aria-hidden="true"
                  className="size-3.5 transition-transform duration-300 group-hover:translate-x-0.5"
                />
              </a>
            </div>

            <div className="mt-6">
              <div className="inline-flex items-center gap-2 rounded-full border border-border bg-background/45 px-3 py-1.5 backdrop-blur-xl">
                <span className="relative flex size-1.5">
                  <span className="absolute inline-flex size-full animate-ping rounded-full bg-theme-accent opacity-40" />
                  <span className="relative inline-flex size-1.5 rounded-full bg-theme-accent" />
                </span>

                <span className="font-mono text-[8px] uppercase tracking-[0.13em] text-muted">
                  Screens sourced from project media
                </span>
              </div>
            </div>
          </div>

          <div className="mt-7 min-w-0 sm:mt-8 lg:mt-0">
            <PortfolioHeroScreenshots screenshots={screenshots} />
          </div>
        </div>
      </div>
    </section>
  );
}
