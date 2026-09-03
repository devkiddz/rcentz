import { Activity, CalendarDays, Layers3, Radio } from 'lucide-react';

import type { PublicPortfolioProject } from '@/features/portfolio/server/get-portfolio-project';

import { formatPortfolioDate, humanizePortfolioValue } from './portfolio-detail-utils';

type ProjectStatsProps = {
  project: PublicPortfolioProject;
};

export function ProjectStats({ project }: ProjectStatsProps) {
  const startedAt = formatPortfolioDate(project.startedAt) ?? 'Not recorded';

  return (
    <section
      className={[
        'mt-5',

        'grid',

        'overflow-hidden',

        'rounded-[24px]',

        'border',
        'border-border',

        'bg-background/55',

        'backdrop-blur-md',

        'sm:grid-cols-2',
        'lg:grid-cols-4'
      ].join(' ')}>
      <ProjectStat icon={Activity} label="Progress" value={`${project.progress}%`} />

      <ProjectStat icon={Radio} label="Status" value={humanizePortfolioValue(project.status)} />

      <ProjectStat icon={CalendarDays} label="Started" value={startedAt} />

      <ProjectStat icon={Layers3} label="Technology" value={`${project.technologies.length} connected`} />
    </section>
  );
}

type ProjectStatProps = {
  icon: typeof Activity;
  label: string;
  value: string;
};

function ProjectStat({ icon: Icon, label, value }: ProjectStatProps) {
  return (
    <div
      className={[
        'flex',
        'items-center',
        'gap-4',

        'border-border',

        'p-5',

        'not-last:border-b',

        'sm:odd:border-r',

        'sm:[&:nth-child(3)]:border-b-0',
        'sm:[&:nth-child(4)]:border-b-0',

        'lg:not-last:border-b-0',
        'lg:not-last:border-r'
      ].join(' ')}>
      <span
        className={[
          'flex',
          'size-10',

          'shrink-0',

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

      <div className="min-w-0">
        <p className="font-mono text-[8px] uppercase tracking-[0.16em] text-muted">{label}</p>

        <p className="mt-1 truncate text-[13px] font-semibold tracking-[-0.02em]">{value}</p>
      </div>
    </div>
  );
}
