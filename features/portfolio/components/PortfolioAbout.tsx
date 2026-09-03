import { Code2, Database, Layers3, Rocket } from 'lucide-react';

import type { PortfolioProjects } from '@/features/portfolio/server/get-portfolio-projects';

type PortfolioAboutProps = {
  projects: PortfolioProjects;
};

const principles = [
  {
    icon: Code2,
    label: 'Modern application interfaces',
    detail: 'React, Next.js and TypeScript across published work.'
  },
  {
    icon: Database,
    label: 'Database-backed truth',
    detail: 'Real project records, workflows and operational data.'
  },
  {
    icon: Layers3,
    label: 'Reusable system foundations',
    detail: 'Architecture designed to extend instead of restart.'
  },
  {
    icon: Rocket,
    label: 'Production-minded delivery',
    detail: 'Build, test, deploy, stabilize and continue refining.'
  }
];

export function PortfolioAbout({ projects }: PortfolioAboutProps) {
  const technologies = new Set(
    projects.flatMap(project => project.technologies.map(technology => technology.slug))
  );

  return (
    <section className="border-t border-border py-20 sm:py-24">
      <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-14">
        <div className="max-w-xl">
          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted">How the work is built</p>

          <h2 className="mt-4 text-3xl font-semibold tracking-[-0.045em] sm:text-4xl lg:text-5xl">
            Products are the surface.
            <span className="text-muted"> Systems are what make them last.</span>
          </h2>

          <p className="mt-6 text-sm leading-7 text-muted sm:text-base">
            Rcentz projects are developed around the complete product: interface, data, authentication,
            workflows, operations and deployment. The portfolio records the results without separating the
            visible product from the engineering underneath it.
          </p>

          <div className="mt-7 flex flex-wrap gap-2">
            <span className="rounded-full border border-border bg-surface-muted px-2.5 py-1 font-mono text-[8px] text-muted">
              {projects.length} published projects
            </span>
            <span className="rounded-full border border-border bg-surface-muted px-2.5 py-1 font-mono text-[8px] text-muted">
              {technologies.size} recorded technologies
            </span>
          </div>
        </div>

        <div className="grid gap-3 sm:grid-cols-2">
          {principles.map(item => (
            <article
              key={item.label}
              className="rounded-[22px] border border-border bg-background/55 p-5 backdrop-blur-sm">
              <div className="flex size-9 items-center justify-center rounded-xl border border-border bg-theme-accent-faint">
                <item.icon aria-hidden="true" className="size-4 text-theme-accent" />
              </div>

              <h3 className="mt-5 text-sm font-medium">{item.label}</h3>
              <p className="mt-2 text-[11px] leading-5 text-muted">{item.detail}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
