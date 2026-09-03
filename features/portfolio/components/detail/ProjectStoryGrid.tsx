import { Compass, Lightbulb, Target } from 'lucide-react';

import type { PublicPortfolioProject } from '@/features/portfolio/server/get-portfolio-project';

import { CaseStudyCard } from './CaseStudyCard';

type ProjectStoryGridProps = {
  project: PublicPortfolioProject;
};

export function ProjectStoryGrid({ project }: ProjectStoryGridProps) {
  const challenge = project.challenge ?? project.purpose;

  const solution = project.solution ?? project.vision;

  if (!challenge && !solution && !project.expectedOutcome) {
    return null;
  }

  return (
    <>
      {challenge ? (
        <div className="lg:col-span-5">
          <CaseStudyCard className={['h-full', 'min-h-[390px]', 'p-6', 'sm:p-8'].join(' ')}>
            <div className="flex h-full flex-col">
              <div className="flex items-start justify-between gap-6">
                <div>
                  <p className="font-mono text-[8px] uppercase tracking-[0.18em] text-theme-accent">
                    01 / Challenge
                  </p>

                  <h2 className="mt-4 max-w-sm text-3xl font-semibold tracking-[-0.05em]">
                    Why this system needed to exist.
                  </h2>
                </div>

                <span
                  className={[
                    'flex',
                    'size-11',

                    'shrink-0',

                    'items-center',
                    'justify-center',

                    'rounded-full',

                    'border',
                    'border-theme-accent/20',

                    'bg-theme-accent-faint',

                    'text-theme-accent'
                  ].join(' ')}>
                  <Target aria-hidden="true" className="size-4" />
                </span>
              </div>

              <p
                className={[
                  'mt-auto',
                  'pt-14',

                  'whitespace-pre-line',

                  'text-sm',
                  'leading-7',

                  'text-muted'
                ].join(' ')}>
                {challenge}
              </p>
            </div>
          </CaseStudyCard>
        </div>
      ) : null}

      {solution ? (
        <div className={[challenge ? 'lg:col-span-7' : 'lg:col-span-12'].join(' ')}>
          <CaseStudyCard variant="muted" className={['h-full', 'min-h-[390px]', 'p-6', 'sm:p-8'].join(' ')}>
            <div className="grid h-full gap-10 lg:grid-cols-[1fr_220px]">
              <div className="flex flex-col">
                <div>
                  <p className="font-mono text-[8px] uppercase tracking-[0.18em] text-theme-accent">
                    02 / Solution
                  </p>

                  <h2 className="mt-4 max-w-lg text-3xl font-semibold tracking-[-0.05em]">
                    The system designed around the problem.
                  </h2>
                </div>

                <p
                  className={[
                    'mt-auto',
                    'pt-14',

                    'whitespace-pre-line',

                    'text-sm',
                    'leading-7',

                    'text-muted'
                  ].join(' ')}>
                  {solution}
                </p>
              </div>

              {/* SIMPLE SOLUTION ILLUSTRATION */}

              <div
                className={[
                  'relative',

                  'min-h-[230px]',

                  'overflow-hidden',

                  'rounded-[22px]',

                  'border',
                  'border-border',

                  'bg-background/60'
                ].join(' ')}>
                <div
                  aria-hidden="true"
                  className={[
                    'absolute',
                    'inset-0',

                    'opacity-60',

                    'bg-[linear-gradient(to_right,var(--grid-line)_1px,transparent_1px),linear-gradient(to_bottom,var(--grid-line)_1px,transparent_1px)]',

                    '[background-size:46px_46px]'
                  ].join(' ')}
                />

                <div
                  className={[
                    'absolute',

                    'left-1/2',
                    'top-1/2',

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

                    'text-theme-accent'
                  ].join(' ')}>
                  <Lightbulb aria-hidden="true" className="size-6" />
                </div>

                <span className="absolute left-5 top-5 h-px w-16 bg-border-strong" />
                <span className="absolute bottom-5 right-5 h-px w-16 bg-border-strong" />
              </div>
            </div>
          </CaseStudyCard>
        </div>
      ) : null}

      {project.expectedOutcome ? (
        <div className="lg:col-span-12">
          <CaseStudyCard variant="accent" className="p-6 sm:p-8">
            <div className="grid gap-7 lg:grid-cols-[240px_1fr] lg:items-center">
              <div className="flex items-center gap-3">
                <span
                  className={[
                    'flex',
                    'size-10',

                    'items-center',
                    'justify-center',

                    'rounded-full',

                    'border',
                    'border-theme-accent/25',

                    'bg-background/60',

                    'text-theme-accent'
                  ].join(' ')}>
                  <Compass aria-hidden="true" className="size-4" />
                </span>

                <div>
                  <p className="font-mono text-[8px] uppercase tracking-[0.18em] text-theme-accent">
                    Expected outcome
                  </p>

                  <p className="mt-1 text-[11px] text-muted">Project direction</p>
                </div>
              </div>

              <p className="text-base leading-8 tracking-[-0.02em] text-foreground/80">
                {project.expectedOutcome}
              </p>
            </div>
          </CaseStudyCard>
        </div>
      ) : null}
    </>
  );
}
