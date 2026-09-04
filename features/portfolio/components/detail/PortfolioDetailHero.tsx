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
    <section className="relative isolate overflow-hidden px-2 md:px-4 pb-16 pt-5 sm:pb-24 sm:pt-7 lg:px-8 lg:pb-28">
      {/* ENVIRONMENTAL BACKGROUND */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 opacity-60 rcentz-grid-fade" />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-10 h-[320px] w-[520px] -translate-x-1/2 rounded-full bg-theme-accent-faint blur-3xl sm:top-12 sm:h-[360px] sm:w-[720px]"
      />

      <div className="relative z-10 mx-auto w-full max-w-[1140px]">
        {/* BACK */}
        <Link
          href="/portfolio"
          className="group inline-flex items-center gap-2 font-mono text-[8px] uppercase tracking-[0.15em] text-muted transition-colors hover:text-foreground">
          <ArrowLeft
            aria-hidden="true"
            className="size-3 transition-transform duration-300 group-hover:-translate-x-0.5"
          />
          Back to portfolio
        </Link>

        {/* HERO COPY */}
        <div className="mt-10 max-w-[900px] text-left sm:mx-auto sm:mt-16 sm:text-center lg:mt-20">
          {/* PROJECT STATE */}
          <div className="flex flex-wrap items-center justify-start gap-2 sm:justify-center">
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

          {/* CASE STUDY EYEBROW */}
          <p className="mt-6 font-mono text-[8px] uppercase tracking-[0.18em] text-muted sm:mt-7 sm:text-[10px] sm:tracking-[0.2em]">
            {project.featured ? 'Featured project' : 'Project case study'} · Rcentz Systems
          </p>

          {/* PROJECT NAME */}
          <div className="mt-2 sm:mt-0">
            <PortfolioHeroProjectTitle title={project.name} />
          </div>

          {/* PROJECT PROPOSITION */}
          {project.tagline ? (
            <h2 className="mt-5 max-w-[800px] text-xl font-medium leading-[1.18] tracking-[-0.04em] text-foreground/82 sm:mx-auto sm:mt-6 sm:text-balance sm:text-2xl sm:leading-[1.12] lg:text-[2rem]">
              {project.tagline}
            </h2>
          ) : null}

          {/* SUMMARY */}
          <p className="mt-5 max-w-[690px] text-[13px] leading-6 text-muted sm:mx-auto sm:mt-6 sm:text-balance sm:text-[14px] sm:leading-7 lg:text-[15px]">
            {project.summary ?? project.description ?? 'Published Rcentz project.'}
          </p>

          {/* ACTIONS */}
          {project.liveUrl || project.repositoryUrl ? (
            <div className="mt-7 flex flex-wrap items-center justify-start gap-2.5 sm:mt-8 sm:justify-center">
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
                  className="group inline-flex h-10 items-center justify-center gap-2 rounded-full border border-border bg-background/45 md:px-5 text-[12px] font-medium text-foreground backdrop-blur-xl transition-[background-color,border-color,transform] hover:border-border-strong hover:bg-surface-muted active:scale-[0.98]">
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

        {/* PROJECT ILLUSTRATION */}
        <div className="relative mt-12 sm:mt-16 lg:mt-20">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -inset-x-4 -inset-y-8 rounded-[45%] bg-theme-accent-faint blur-3xl sm:-inset-x-8 sm:-inset-y-10 sm:rounded-[50%]"
          />

          <div className="relative">
            <PortfolioDetailHeroIllustration project={project} />
          </div>
        </div>
      </div>
    </section>
  );
}
