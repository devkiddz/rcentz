import Link from 'next/link';

import { ArrowLeft, ArrowUpRight, CheckCircle2, ExternalLink, Layers3 } from 'lucide-react';

import type { PublicPortfolioProject } from '@/features/portfolio/server/get-portfolio-project';

import { CompanyMark } from '@/ui-shell/brand/CompanyMark';

import { resolveTechnologyCompanyMark } from '@/ui-shell/brand/company-marks';

import { CaseStudyCard } from './CaseStudyCard';

import { getSafePortfolioUrl, humanizePortfolioValue } from './portfolio-detail-utils';

type ProjectHeroCardProps = {
  project: PublicPortfolioProject;
};

export function ProjectHeroCard({ project }: ProjectHeroCardProps) {
  const liveUrl = getSafePortfolioUrl(project.liveUrl);

  const repositoryUrl = getSafePortfolioUrl(project.repositoryUrl);

  const technologies = project.technologies.slice(0, 8);

  return (
    <div className="lg:col-span-12">
      <Link
        href="/portfolio"
        className={[
          'group',

          'mb-5',

          'inline-flex',

          'items-center',
          'gap-2',

          'text-[12px]',
          'font-medium',

          'text-muted',

          'transition-colors',

          'hover:text-foreground'
        ].join(' ')}>
        <ArrowLeft
          aria-hidden="true"
          className={['size-3.5', 'transition-transform', 'group-hover:-translate-x-0.5'].join(' ')}
        />
        Back to portfolio
      </Link>

      <CaseStudyCard className={['min-h-[560px]', 'bg-surface/65'].join(' ')}>
        {/* STRUCTURAL ENVIRONMENT */}

        <div
          aria-hidden="true"
          className={[
            'pointer-events-none',

            'absolute',
            'inset-0',

            'opacity-55',

            'bg-[linear-gradient(to_right,var(--grid-line)_1px,transparent_1px),linear-gradient(to_bottom,var(--grid-line)_1px,transparent_1px)]',

            '[background-size:110px_110px]'
          ].join(' ')}
        />

        <div
          aria-hidden="true"
          className={[
            'pointer-events-none',

            'absolute',

            'right-[-120px]',
            'top-[-140px]',

            'size-[430px]',

            'rounded-full',

            'bg-theme-accent-faint',

            'blur-[120px]'
          ].join(' ')}
        />

        <div
          className={['relative', 'z-10', 'grid', 'min-h-[560px]', 'lg:grid-cols-[minmax(0,1fr)_430px]'].join(
            ' '
          )}>
          {/* =================================================
              PROJECT STORY
              ================================================= */}

          <div className={['flex', 'flex-col', 'p-6', 'sm:p-8', 'lg:p-10'].join(' ')}>
            <div className="flex flex-wrap items-center gap-2">
              <span
                className={[
                  'inline-flex',

                  'items-center',
                  'gap-2',

                  'rounded-full',

                  'border',
                  'border-theme-accent/20',

                  'bg-theme-accent-faint',

                  'px-3',
                  'py-1.5',

                  'font-mono',

                  'text-[8px]',
                  'uppercase',

                  'tracking-[0.16em]',

                  'text-theme-accent'
                ].join(' ')}>
                <span className="size-1.5 rounded-full bg-theme-accent" />

                {humanizePortfolioValue(project.type)}
              </span>

              <span
                className={[
                  'rounded-full',

                  'border',
                  'border-border',

                  'bg-background/65',

                  'px-3',
                  'py-1.5',

                  'font-mono',

                  'text-[8px]',
                  'uppercase',

                  'tracking-[0.16em]',

                  'text-muted'
                ].join(' ')}>
                {humanizePortfolioValue(project.status)}
              </span>

              {project.featured ? (
                <span
                  className={[
                    'inline-flex',

                    'items-center',
                    'gap-1.5',

                    'rounded-full',

                    'border',
                    'border-border',

                    'bg-background/65',

                    'px-3',
                    'py-1.5',

                    'font-mono',

                    'text-[8px]',
                    'uppercase',

                    'tracking-[0.16em]',

                    'text-muted'
                  ].join(' ')}>
                  <CheckCircle2 aria-hidden="true" className="size-3 text-theme-accent" />
                  Featured
                </span>
              ) : null}
            </div>

            <div className="mt-auto pt-20">
              <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-theme-accent">
                Rcentz case study
              </p>

              <h1
                className={[
                  'mt-4',

                  'max-w-4xl',

                  'text-[3rem]',
                  'font-semibold',

                  'leading-[0.92]',

                  'tracking-[-0.065em]',

                  'sm:text-[4.3rem]',
                  'lg:text-[5.2rem]'
                ].join(' ')}>
                {project.name}
              </h1>

              {project.tagline ? (
                <p
                  className={[
                    'mt-6',

                    'max-w-2xl',

                    'text-lg',

                    'leading-8',

                    'tracking-[-0.025em]',

                    'text-foreground/72'
                  ].join(' ')}>
                  {project.tagline}
                </p>
              ) : null}

              {(project.summary ?? project.description) ? (
                <p className={['mt-5', 'max-w-2xl', 'text-sm', 'leading-7', 'text-muted'].join(' ')}>
                  {project.summary ?? project.description}
                </p>
              ) : null}

              {liveUrl || repositoryUrl ? (
                <div className="mt-8 flex flex-wrap gap-3">
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
                        'justify-center',

                        'gap-2',

                        'rounded-full',

                        'bg-primary',

                        'px-5',

                        'text-[12px]',
                        'font-medium',

                        'text-primary-foreground'
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

                        'px-4'
                      ].join(' ')}>
                      <CompanyMark company="github" presentation="logo" size={14} />

                      <ExternalLink aria-hidden="true" className="size-3 text-muted" />
                    </a>
                  ) : null}
                </div>
              ) : null}
            </div>
          </div>

          {/* =================================================
              VISUAL / SYSTEM BOARD
              ================================================= */}

          <div
            className={[
              'relative',

              'border-t',
              'border-border',

              'bg-surface-muted/35',

              'p-5',

              'lg:border-l',
              'lg:border-t-0',

              'sm:p-6'
            ].join(' ')}>
            <div className={['flex', 'items-center', 'justify-between', 'gap-4'].join(' ')}>
              <div>
                <p className="font-mono text-[8px] uppercase tracking-[0.17em] text-muted">Project system</p>

                <p className="mt-2 text-[12px] font-semibold">Technology map</p>
              </div>

              <span
                className={[
                  'flex',
                  'size-10',

                  'items-center',
                  'justify-center',

                  'rounded-full',

                  'border',
                  'border-theme-accent/20',

                  'bg-theme-accent-faint',

                  'text-theme-accent'
                ].join(' ')}>
                <Layers3 aria-hidden="true" className="size-4" />
              </span>
            </div>

            <div
              className={[
                'relative',

                'mt-6',

                'min-h-[390px]',

                'overflow-hidden',

                'rounded-[24px]',

                'border',
                'border-border',

                'bg-background/72',

                'p-4'
              ].join(' ')}>
              <div
                aria-hidden="true"
                className={[
                  'absolute',
                  'inset-0',

                  'opacity-55',

                  'bg-[linear-gradient(to_right,var(--grid-line)_1px,transparent_1px),linear-gradient(to_bottom,var(--grid-line)_1px,transparent_1px)]',

                  '[background-size:58px_58px]'
                ].join(' ')}
              />

              {/* CENTRAL SYSTEM */}

              <div
                className={[
                  'absolute',

                  'left-1/2',
                  'top-1/2',

                  'z-10',

                  'flex',
                  'size-24',

                  '-translate-x-1/2',
                  '-translate-y-1/2',

                  'items-center',
                  'justify-center',

                  'rounded-full',

                  'border',
                  'border-theme-accent/25',

                  'bg-theme-accent-faint',

                  'text-center'
                ].join(' ')}>
                <div>
                  <p className="text-[11px] font-semibold">{project.name}</p>

                  <p className="mt-1 font-mono text-[7px] uppercase tracking-[0.12em] text-muted">Core</p>
                </div>
              </div>

              {/* TECHNOLOGY CARDS */}

              <div className={['relative', 'z-20', 'grid', 'grid-cols-2', 'gap-3'].join(' ')}>
                {technologies.map((technology, index) => {
                  const company = resolveTechnologyCompanyMark({
                    slug: technology.slug,

                    name: technology.name
                  });

                  return (
                    <div
                      key={technology.id}
                      className={[
                        'flex',

                        'min-h-16',

                        'items-center',
                        'gap-3',

                        'rounded-2xl',

                        'border',
                        'border-border',

                        'bg-background/85',

                        'px-3',

                        'shadow-sm',

                        index === 2 || index === 3 ? 'mt-28' : ''
                      ].join(' ')}>
                      <span
                        className={[
                          'flex',
                          'size-8',

                          'shrink-0',

                          'items-center',
                          'justify-center',

                          'rounded-xl',

                          'border',
                          'border-border',

                          'bg-surface-muted'
                        ].join(' ')}>
                        {company ? (
                          <CompanyMark company={company} tone="brand" size={15} />
                        ) : (
                          <span className="size-1.5 rounded-full bg-theme-accent" />
                        )}
                      </span>

                      <span className="truncate text-[10px] font-medium">{technology.name}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </CaseStudyCard>
    </div>
  );
}
