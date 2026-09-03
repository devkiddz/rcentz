import { Activity, Workflow } from 'lucide-react';

import type { PublicPortfolioProject } from '@/features/portfolio/server/get-portfolio-project';

import { formatPortfolioDate, humanizePortfolioValue } from './portfolio-detail-utils';

type ProjectDevelopmentRecordProps = {
  updates: PublicPortfolioProject['updates'];
};

export function ProjectDevelopmentRecord({ updates }: ProjectDevelopmentRecordProps) {
  return (
    <section className="mt-20">
      <div className="flex items-center gap-2">
        <Activity aria-hidden="true" className="size-4 text-theme-accent" />

        <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-muted">Development record</p>
      </div>

      <div className="mt-4 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <h2 className="max-w-xl text-3xl font-semibold tracking-[-0.05em]">How the project has moved.</h2>

        <p className="max-w-md text-sm leading-7 text-muted">
          Only updates explicitly marked public are allowed into this timeline.
        </p>
      </div>

      {updates.length === 0 ? (
        <div
          className={['mt-8', 'rounded-[24px]', 'border', 'border-dashed', 'border-border', 'p-6'].join(' ')}>
          <p className="text-sm text-muted">No public development updates have been published yet.</p>
        </div>
      ) : (
        <div className="relative mt-10">
          <div
            aria-hidden="true"
            className={[
              'absolute',

              'bottom-0',
              'left-[15px]',
              'top-0',

              'w-px',

              'bg-border',

              'sm:left-[19px]'
            ].join(' ')}
          />

          <div className="space-y-5">
            {updates.map(update => (
              <article
                key={update.id}
                className={[
                  'relative',

                  'grid',
                  'grid-cols-[32px_1fr]',

                  'gap-4',

                  'sm:grid-cols-[40px_1fr]'
                ].join(' ')}>
                <span
                  className={[
                    'relative',
                    'z-10',

                    'mt-5',

                    'flex',
                    'size-8',

                    'items-center',
                    'justify-center',

                    'rounded-full',

                    'border',
                    'border-theme-accent/25',

                    'bg-background',

                    'text-theme-accent',

                    'sm:size-10'
                  ].join(' ')}>
                  <Workflow aria-hidden="true" className="size-3.5" />
                </span>

                <div
                  className={[
                    'rounded-[24px]',

                    'border',
                    'border-border',

                    'bg-background/55',

                    'p-5',

                    'backdrop-blur-md',

                    'sm:p-6'
                  ].join(' ')}>
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                    <div>
                      <p className="font-mono text-[8px] uppercase tracking-[0.16em] text-theme-accent">
                        {humanizePortfolioValue(update.type)}
                      </p>

                      <h3 className="mt-2 text-base font-semibold tracking-[-0.025em]">{update.title}</h3>
                    </div>

                    <time className="font-mono text-[8px] uppercase tracking-[0.14em] text-muted">
                      {formatPortfolioDate(update.createdAt, true)}
                    </time>
                  </div>

                  <p className="mt-4 whitespace-pre-line text-sm leading-7 text-muted">
                    {update.description}
                  </p>

                  {update.milestone || update.feature || update.progress !== null ? (
                    <div className="mt-5 flex flex-wrap gap-2">
                      {update.milestone ? (
                        <span className="rounded-full border border-border bg-surface-muted px-3 py-1.5 font-mono text-[8px] text-muted">
                          {update.milestone.title}
                        </span>
                      ) : null}

                      {update.feature ? (
                        <span className="rounded-full border border-border bg-surface-muted px-3 py-1.5 font-mono text-[8px] text-muted">
                          {update.feature.name}
                        </span>
                      ) : null}

                      {update.progress !== null ? (
                        <span
                          className={[
                            'rounded-full',

                            'border',
                            'border-theme-accent/20',

                            'bg-theme-accent-faint',

                            'px-3',
                            'py-1.5',

                            'font-mono',
                            'text-[8px]',

                            'text-theme-accent'
                          ].join(' ')}>
                          {update.progress}%
                        </span>
                      ) : null}
                    </div>
                  ) : null}
                </div>
              </article>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
