import { CheckCircle2 } from 'lucide-react';

import type { PublicPortfolioProject } from '@/features/portfolio/server/get-portfolio-project';

import { CaseStudyCard } from './CaseStudyCard';

type ProjectOutcomeCardProps = {
  project: PublicPortfolioProject;
};

export function ProjectOutcomeCard({ project }: ProjectOutcomeCardProps) {
  if (!project.outcome) {
    return null;
  }

  return (
    <div className="lg:col-span-12">
      <CaseStudyCard variant="dark" className={['min-h-[300px]', 'p-6', 'sm:p-8', 'lg:p-10'].join(' ')}>
        <div
          aria-hidden="true"
          className={[
            'pointer-events-none',

            'absolute',
            'inset-0',

            'opacity-45',

            'bg-[linear-gradient(to_right,var(--grid-line)_1px,transparent_1px),linear-gradient(to_bottom,var(--grid-line)_1px,transparent_1px)]',

            '[background-size:108px_108px]'
          ].join(' ')}
        />

        <div className="relative z-10 grid h-full gap-10 lg:grid-cols-[230px_1fr] lg:items-center">
          <div>
            <span
              className={[
                'flex',
                'size-11',

                'items-center',
                'justify-center',

                'rounded-full',

                'border',
                'border-theme-accent/25',

                'bg-theme-accent-faint',

                'text-theme-accent'
              ].join(' ')}>
              <CheckCircle2 aria-hidden="true" className="size-5" />
            </span>

            <p className="mt-5 font-mono text-[9px] uppercase tracking-[0.2em] text-theme-accent">
              Project outcome
            </p>
          </div>

          <p
            className={[
              'max-w-4xl',

              'text-xl',
              'font-medium',

              'leading-9',

              'tracking-[-0.035em]',

              'opacity-80',

              'sm:text-2xl'
            ].join(' ')}>
            {project.outcome}
          </p>
        </div>
      </CaseStudyCard>
    </div>
  );
}
