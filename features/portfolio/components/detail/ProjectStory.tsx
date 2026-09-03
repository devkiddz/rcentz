import { Compass, Lightbulb, Target } from 'lucide-react';

import type { PublicPortfolioProject } from '@/features/portfolio/server/get-portfolio-project';

type ProjectStoryProps = {
  project: PublicPortfolioProject;
};

export function ProjectStory({ project }: ProjectStoryProps) {
  const hasCaseStudy = Boolean(project.challenge || project.solution);

  const hasFoundation = Boolean(project.purpose || project.vision || project.expectedOutcome);

  if (!hasCaseStudy && !hasFoundation) {
    return null;
  }

  return (
    <section className="mt-20">
      <div className="grid gap-12 lg:grid-cols-[280px_1fr] lg:gap-20">
        <div>
          <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-theme-accent">Project story</p>

          <h2 className="mt-4 max-w-[260px] text-3xl font-semibold tracking-[-0.05em]">
            Built from the problem outward.
          </h2>

          <p className="mt-4 max-w-[260px] text-sm leading-7 text-muted">
            The public case study records why the system exists and how the solution was shaped.
          </p>
        </div>

        <div className="space-y-4">
          {project.challenge ? (
            <StoryPanel icon={Target} index="01" label="Challenge" content={project.challenge} />
          ) : null}

          {project.solution ? (
            <StoryPanel icon={Lightbulb} index="02" label="Solution" content={project.solution} />
          ) : null}

          {hasFoundation ? (
            <div
              className={['rounded-[26px]', 'border', 'border-border', 'bg-surface-muted/30', 'p-6'].join(
                ' '
              )}>
              <div className="flex items-center gap-2">
                <Compass aria-hidden="true" className="size-4 text-theme-accent" />

                <p className="font-mono text-[8px] uppercase tracking-[0.17em] text-muted">Foundation</p>
              </div>

              <div className="mt-7 grid gap-7 md:grid-cols-3">
                {project.purpose ? <FoundationItem label="Purpose" value={project.purpose} /> : null}

                {project.vision ? <FoundationItem label="Vision" value={project.vision} /> : null}

                {project.expectedOutcome ? (
                  <FoundationItem label="Expected outcome" value={project.expectedOutcome} />
                ) : null}
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
}

type StoryPanelProps = {
  icon: typeof Target;
  index: string;
  label: string;
  content: string;
};

function StoryPanel({ icon: Icon, index, label, content }: StoryPanelProps) {
  return (
    <article
      className={[
        'group',

        'grid',
        'gap-5',

        'rounded-[26px]',

        'border',
        'border-border',

        'bg-background/55',

        'p-6',

        'backdrop-blur-md',

        'transition-[transform,border-color,background-color]',

        'hover:-translate-y-0.5',
        'hover:border-border-strong',
        'hover:bg-surface-raised/60',

        'sm:grid-cols-[50px_150px_1fr]'
      ].join(' ')}>
      <span className="font-mono text-[9px] tracking-[0.14em] text-theme-accent">{index}</span>

      <div>
        <Icon aria-hidden="true" className="mb-3 size-4 text-theme-accent" />

        <h3 className="text-sm font-semibold tracking-[-0.02em]">{label}</h3>
      </div>

      <p className="whitespace-pre-line text-sm leading-7 text-muted">{content}</p>
    </article>
  );
}

function FoundationItem({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="font-mono text-[8px] uppercase tracking-[0.16em] text-theme-accent">{label}</p>

      <p className="mt-3 text-sm leading-7 text-muted">{value}</p>
    </div>
  );
}
