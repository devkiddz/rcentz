import { ArrowUpRight, ExternalLink } from 'lucide-react';

import type { PublicPortfolioProject } from '@/features/portfolio/server/get-portfolio-project';

import { CompanyMark } from '@/ui-shell/brand/CompanyMark';

import { getSafePortfolioUrl } from './portfolio-detail-utils';

type ProjectFinalCTAProps = {
  project: PublicPortfolioProject;
};

export function ProjectFinalCTA({ project }: ProjectFinalCTAProps) {
  const liveUrl = getSafePortfolioUrl(project.liveUrl);

  const repositoryUrl = getSafePortfolioUrl(project.repositoryUrl);

  if (!liveUrl && !repositoryUrl) {
    return null;
  }

  return (
    <section
      className={[
        'mt-20',

        'flex',
        'flex-col',

        'gap-7',

        'rounded-[28px]',

        'border',
        'border-border',

        'bg-background/55',

        'p-6',

        'backdrop-blur-md',

        'sm:flex-row',
        'sm:items-center',
        'sm:justify-between',

        'sm:p-8'
      ].join(' ')}>
      <div>
        <p className="font-mono text-[9px] uppercase tracking-[0.18em] text-muted">Explore the project</p>

        <h2 className="mt-3 max-w-lg text-2xl font-semibold tracking-[-0.04em]">
          See the working system beyond the case study.
        </h2>
      </div>

      <div className="flex flex-wrap gap-3">
        {liveUrl ? (
          <a
            href={liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={[
              'group',

              'inline-flex',
              'h-11',

              'items-center',
              'gap-2',

              'rounded-full',

              'bg-primary',

              'px-5',

              'text-[12px]',
              'font-medium',

              'text-primary-foreground',

              'transition-[transform,opacity]',

              'hover:-translate-y-0.5',
              'hover:opacity-90'
            ].join(' ')}>
            Live project
            <ArrowUpRight aria-hidden="true" className="size-3.5" />
          </a>
        ) : null}

        {repositoryUrl ? (
          <a
            href={repositoryUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={[
              'inline-flex',
              'h-11',

              'items-center',
              'gap-3',

              'rounded-full',

              'border',
              'border-border',

              'bg-surface-muted',

              'px-4',

              'transition-[background-color,border-color]',

              'hover:border-border-strong',
              'hover:bg-secondary'
            ].join(' ')}>
            <CompanyMark company="github" presentation="logo" size={14} />

            <ExternalLink aria-hidden="true" className="size-3 text-muted" />
          </a>
        ) : null}
      </div>
    </section>
  );
}
