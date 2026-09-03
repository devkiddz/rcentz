import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

import { HomeProjectCard } from '@/features/home/components/projects/HomeProjectCard';
import type { HomepageData } from '@/features/home/server/get-homepage-data';

type HomeProjectsProps = {
  projects: HomepageData['projects'];
};

export function HomeProjects({ projects }: HomeProjectsProps) {
  const visibleProjects = projects.slice(0, 6);
  const [featured, ...rest] = visibleProjects;

  if (!featured) {
    return null;
  }

  return (
    <section id="work" className="rcentz-section border-t border-border py-20 sm:py-24">
      <div className="max-w-5xl">
        <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted">Selected work</p>

        <h2 className="mt-4 text-3xl font-semibold tracking-[-0.045em] sm:text-4xl lg:text-5xl">
          Built systems, shown as they actually exist.
          <span className="text-muted"> Real project screens, real architecture and real outcomes.</span>
        </h2>

        <p className="mt-6 max-w-2xl text-sm leading-7 text-muted sm:text-base">
          Browse selected Rcentz work through actual product screenshots rather than recreated portfolio
          illustrations.
        </p>
      </div>

      <div className="mt-12">
        <HomeProjectCard project={featured} index={0} featured />
      </div>

      {rest.length ? (
        <div className="mt-4 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {rest.map((project, index) => (
            <HomeProjectCard key={project.id} project={project} index={index + 1} />
          ))}
        </div>
      ) : null}

      <div className="mt-8">
        <Link
          href="/portfolio"
          className={[
            'inline-flex h-10 items-center gap-2 rounded-full',
            'border border-border bg-surface-muted px-4',
            'text-[12px] font-medium text-foreground',
            'transition-[background-color,border-color]',
            'hover:border-border-strong hover:bg-secondary'
          ].join(' ')}>
          Explore all work
          <ArrowRight aria-hidden="true" className="size-3.5" />
        </Link>
      </div>
    </section>
  );
}
