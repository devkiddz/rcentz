import { Code2, Database, Network } from 'lucide-react';

import type { PublicPortfolioProject } from '@/features/portfolio/server/get-portfolio-project';

import { CompanyMark } from '@/ui-shell/brand/CompanyMark';

import { resolveTechnologyCompanyMark } from '@/ui-shell/brand/company-marks';

import { CaseStudyCard } from './CaseStudyCard';

type ProjectArchitectureCardProps = {
  technologies: PublicPortfolioProject['technologies'];
};

export function ProjectArchitectureCard({ technologies }: ProjectArchitectureCardProps) {
  if (technologies.length === 0) {
    return null;
  }

  return (
    <div className="lg:col-span-12">
      <CaseStudyCard className={['p-6', 'sm:p-8'].join(' ')}>
        <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <div className="flex items-center gap-2">
              <Code2 aria-hidden="true" className="size-4 text-theme-accent" />

              <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-muted">Architecture</p>
            </div>

            <h2 className="mt-4 max-w-xl text-3xl font-semibold tracking-[-0.05em]">
              Technology working as a system.
            </h2>
          </div>

          <p className="max-w-md text-sm leading-7 text-muted">
            Technologies recorded directly against this project.
          </p>
        </div>

        <div className={['mt-9', 'grid', 'gap-4', 'lg:grid-cols-[minmax(0,1fr)_360px]'].join(' ')}>
          {/* TECHNOLOGY GRID */}

          <div className="grid gap-3 sm:grid-cols-2">
            {technologies.map(technology => {
              const company = resolveTechnologyCompanyMark({
                slug: technology.slug,

                name: technology.name
              });

              return (
                <div
                  key={technology.id}
                  className={[
                    'flex',

                    'min-h-[82px]',

                    'items-center',
                    'gap-4',

                    'rounded-[20px]',

                    'border',
                    'border-border',

                    'bg-surface-muted/35',

                    'px-4',

                    'transition-[background-color,border-color,transform]',

                    'hover:-translate-y-px',
                    'hover:border-border-strong',
                    'hover:bg-surface-muted'
                  ].join(' ')}>
                  <span
                    className={[
                      'flex',
                      'size-11',

                      'shrink-0',

                      'items-center',
                      'justify-center',

                      'rounded-xl',

                      'border',
                      'border-border',

                      'bg-background'
                    ].join(' ')}>
                    {company ? (
                      <CompanyMark company={company} tone="brand" size={19} />
                    ) : (
                      <Code2 aria-hidden="true" className="size-4 text-theme-accent" />
                    )}
                  </span>

                  <div>
                    <p className="text-[12px] font-semibold">{technology.name}</p>

                    <p className="mt-1 font-mono text-[7px] uppercase tracking-[0.14em] text-muted">
                      Project technology
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* ARCHITECTURE ILLUSTRATION */}

          <div
            className={[
              'relative',

              'min-h-[360px]',

              'overflow-hidden',

              'rounded-[24px]',

              'border',
              'border-border',

              'bg-surface-muted/35',

              'p-5'
            ].join(' ')}>
            <div
              aria-hidden="true"
              className={[
                'absolute',
                'inset-0',

                'opacity-60',

                'bg-[linear-gradient(to_right,var(--grid-line)_1px,transparent_1px),linear-gradient(to_bottom,var(--grid-line)_1px,transparent_1px)]',

                '[background-size:48px_48px]'
              ].join(' ')}
            />

            <div className="relative z-10 flex h-full flex-col justify-center gap-4">
              <SystemLayer icon={Code2} label="Interface" />

              <Connector />

              <SystemLayer icon={Network} label="Application" />

              <Connector />

              <SystemLayer icon={Database} label="Data" />
            </div>
          </div>
        </div>
      </CaseStudyCard>
    </div>
  );
}

function SystemLayer({ icon: Icon, label }: { icon: typeof Code2; label: string }) {
  return (
    <div
      className={[
        'mx-auto',

        'flex',
        'w-[82%]',

        'items-center',
        'gap-3',

        'rounded-2xl',

        'border',
        'border-border',

        'bg-background/85',

        'p-3',

        'shadow-sm'
      ].join(' ')}>
      <span
        className={[
          'flex',
          'size-9',

          'items-center',
          'justify-center',

          'rounded-xl',

          'bg-theme-accent-faint',

          'text-theme-accent'
        ].join(' ')}>
        <Icon aria-hidden="true" className="size-4" />
      </span>

      <div>
        <p className="text-[11px] font-semibold">{label}</p>

        <p className="mt-0.5 font-mono text-[7px] uppercase tracking-[0.13em] text-muted">Connected layer</p>
      </div>
    </div>
  );
}

function Connector() {
  return <div className="mx-auto h-8 w-px bg-border-strong" />;
}
