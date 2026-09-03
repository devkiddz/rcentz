import { Code2 } from 'lucide-react';

import type { PublicPortfolioProject } from '@/features/portfolio/server/get-portfolio-project';

import { CompanyMark } from '@/ui-shell/brand/CompanyMark';

import { resolveTechnologyCompanyMark } from '@/ui-shell/brand/company-marks';

import { ProjectSignalNetwork } from './ProjectSignalNetwork';

type ProjectArchitectureProps = {
  technologies: PublicPortfolioProject['technologies'];
};

export function ProjectArchitecture({ technologies }: ProjectArchitectureProps) {
  if (technologies.length === 0) {
    return null;
  }

  const remainingTechnologies = technologies.slice(6);

  return (
    <section className="mt-20">
      <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <div className="flex items-center gap-2">
            <Code2 aria-hidden="true" className="size-4 text-theme-accent" />

            <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-muted">Architecture</p>
          </div>

          <h2 className="mt-4 max-w-xl text-3xl font-semibold tracking-[-0.05em]">
            Technology connected, not merely listed.
          </h2>
        </div>

        <p className="max-w-md text-sm leading-7 text-muted">
          Each technology belongs to the actual project record and participates in a broader system.
        </p>
      </div>

      <div
        className={[
          'relative',

          'mt-9',

          'overflow-hidden',

          'rounded-[30px]',

          'border',
          'border-border',

          'bg-[#071513]',

          'text-white'
        ].join(' ')}>
        <ProjectSignalNetwork technologies={technologies} expanded />

        {remainingTechnologies.length > 0 ? (
          <div className="relative z-10 border-t border-white/10 p-5 sm:p-6">
            <p className="font-mono text-[8px] uppercase tracking-[0.16em] text-white/35">
              Additional technologies
            </p>

            <div className="mt-4 flex flex-wrap gap-2">
              {remainingTechnologies.map(technology => {
                const company = resolveTechnologyCompanyMark({
                  slug: technology.slug,

                  name: technology.name
                });

                return (
                  <span
                    key={technology.id}
                    className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3 py-2 text-[10px] text-white/65">
                    {company ? <CompanyMark company={company} tone="brand" size={14} /> : null}

                    {technology.name}
                  </span>
                );
              })}
            </div>
          </div>
        ) : null}
      </div>
    </section>
  );
}
