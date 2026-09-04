import Link from 'next/link';

import { ArrowLeft, ArrowUpRight, GitBranch } from 'lucide-react';

import type { PublicPortfolioProject } from '@/features/portfolio/server/get-portfolio-project';

import { PortfolioDetailHeroIllustration } from './PortfolioDetailHeroIllustration';
import { PortfolioHeroProjectTitle } from './PortfolioHeroProjectTitle';

type PortfolioDetailHeroProps = {
  project: PublicPortfolioProject;
};

function humanize(value: string) {
  return value
    .toLowerCase()
    .split('_')
    .map(part => part.charAt(0).toUpperCase() + part.slice(1))
    .join(' ');
}

export function PortfolioDetailHero({ project }: PortfolioDetailHeroProps) {
  return (
    <section className="relative isolate overflow-hidden px-4 pb-20 pt-5 sm:px-6 sm:pb-24 sm:pt-7 lg:px-8 lg:pb-28">
      {/* Environmental background */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 opacity-60 rcentz-grid-fade" />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-12 h-[360px] w-[720px] -translate-x-1/2 rounded-full bg-theme-accent-faint blur-3xl"
      />

      <div className="relative z-10 mx-auto w-full max-w-[1140px]">
        {/* Back */}
        <Link
          href="/portfolio"
          className="group inline-flex items-center gap-2 font-mono text-[8px] uppercase tracking-[0.15em] text-muted transition-colors hover:text-foreground">
          <ArrowLeft
            aria-hidden="true"
            className="size-3 transition-transform duration-300 group-hover:-translate-x-0.5"
          />
          Back to portfolio
        </Link>

        {/* Hero copy */}
        <div className="mx-auto mt-14 max-w-[900px] text-center sm:mt-16 lg:mt-20">
          {/* Project state */}
          <div className="flex flex-wrap items-center justify-center gap-2">
            <span className="rounded-full border border-border bg-background/55 px-2.5 py-1 font-mono text-[7px] uppercase tracking-[0.15em] text-theme-accent backdrop-blur-xl">
              {humanize(project.type)}
            </span>

            <span className="rounded-full border border-border bg-background/55 px-2.5 py-1 font-mono text-[7px] uppercase tracking-[0.15em] text-muted backdrop-blur-xl">
              {humanize(project.status)}
            </span>

            <span className="rounded-full border border-border bg-background/55 px-2.5 py-1 font-mono text-[7px] uppercase tracking-[0.15em] text-muted backdrop-blur-xl">
              {project.progress}% complete
            </span>
          </div>

          {/* Case-study eyebrow */}
          <p className="mt-7 font-mono text-[9px] uppercase tracking-[0.2em] text-muted sm:text-[10px]">
            {project.featured ? 'Featured project' : 'Project case study'} · Rcentz Systems
          </p>

          {/* Project name — Hero focal point */}
          <PortfolioHeroProjectTitle title={project.name} />

          {/* Project proposition */}
          {project.tagline ? (
            <h2 className="mx-auto mt-6 max-w-[800px] text-balance text-xl font-medium leading-[1.12] tracking-[-0.04em] text-foreground/82 sm:text-2xl lg:text-[2rem]">
              {project.tagline}
            </h2>
          ) : null}

          {/* Summary */}
          <p className="mx-auto mt-6 max-w-[690px] text-balance text-[12px] leading-6 text-muted sm:text-[14px] sm:leading-7 lg:text-[15px]">
            {project.summary ?? project.description ?? 'Published Rcentz project.'}
          </p>

          {/* Actions */}
          {project.liveUrl || project.repositoryUrl ? (
            <div className="mt-8 flex flex-wrap items-center justify-center gap-2.5">
              {project.liveUrl ? (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="group inline-flex h-10 items-center justify-center gap-2 rounded-full bg-primary px-5 text-[12px] font-medium text-primary-foreground transition-[opacity,transform] hover:opacity-90 active:scale-[0.98]">
                  View live
                  <ArrowUpRight
                    aria-hidden="true"
                    className="size-3.5 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                  />
                </a>
              ) : null}

              {project.repositoryUrl ? (
                <a
                  href={project.repositoryUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="group inline-flex h-10 items-center justify-center gap-2 rounded-full border border-border bg-background/45 px-5 text-[12px] font-medium text-foreground backdrop-blur-xl transition-[background-color,border-color,transform] hover:border-border-strong hover:bg-surface-muted active:scale-[0.98]">
                  <GitBranch aria-hidden="true" className="size-3.5" />
                  Source
                  <ArrowUpRight
                    aria-hidden="true"
                    className="size-3 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                  />
                </a>
              ) : null}
            </div>
          ) : null}
        </div>

        {/* Project illustration */}
        <div className="relative mt-14 sm:mt-16 lg:mt-20">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -inset-x-8 -inset-y-10 rounded-[50%] bg-theme-accent-faint blur-3xl"
          />

          <div className="relative">
            <PortfolioDetailHeroIllustration project={project} />
          </div>
        </div>
      </div>
    </section>
  );
}
