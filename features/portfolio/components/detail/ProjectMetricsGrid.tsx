import { Activity, CalendarDays, Layers3, Radio } from 'lucide-react';

import type { PublicPortfolioProject } from '@/features/portfolio/server/get-portfolio-project';

import { CaseStudyCard } from './CaseStudyCard';

import { formatPortfolioDate, humanizePortfolioValue } from './portfolio-detail-utils';

type ProjectMetricsGridProps = {
  project: PublicPortfolioProject;
};

export function ProjectMetricsGrid({ project }: ProjectMetricsGridProps) {
  const startedAt = formatPortfolioDate(project.startedAt) ?? 'Not recorded';

  const metrics = [
    {
      label: 'Progress',
      value: `${project.progress}%`,

      description: 'Recorded project completion',

      icon: Activity
    },

    {
      label: 'Status',
      value: humanizePortfolioValue(project.status),

      description: 'Current project state',

      icon: Radio
    },

    {
      label: 'Started',
      value: startedAt,

      description: 'Project timeline',

      icon: CalendarDays
    },

    {
      label: 'Technology',
      value: `${project.technologies.length}`,

      description: 'Technologies connected',

      icon: Layers3
    }
  ];

  return (
    <>
      {metrics.map(metric => {
        const Icon = metric.icon;

        return (
          <div key={metric.label} className={['lg:col-span-3'].join(' ')}>
            <CaseStudyCard className={['h-full', 'min-h-[175px]', 'p-5', 'sm:p-6'].join(' ')}>
              <div className="flex items-start justify-between gap-5">
                <div>
                  <p className="font-mono text-[8px] uppercase tracking-[0.18em] text-muted">
                    {metric.label}
                  </p>

                  <p className={['mt-5', 'text-3xl', 'font-semibold', 'tracking-[-0.05em]'].join(' ')}>
                    {metric.value}
                  </p>
                </div>

                <span
                  className={[
                    'flex',
                    'size-10',

                    'items-center',
                    'justify-center',

                    'rounded-xl',

                    'border',
                    'border-theme-accent/20',

                    'bg-theme-accent-faint',

                    'text-theme-accent'
                  ].join(' ')}>
                  <Icon aria-hidden="true" className="size-4" />
                </span>
              </div>

              <p className="mt-5 text-[11px] leading-5 text-muted">{metric.description}</p>
            </CaseStudyCard>
          </div>
        );
      })}
    </>
  );
}
