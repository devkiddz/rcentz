import Link from 'next/link';

import { ArrowRight, FolderKanban } from 'lucide-react';

import type { ClientProjectMonitor } from '@/features/client/server/projects/get-client-project-monitors';

import { ProjectMonitorCard } from '@/features/dashboard/components/projects/ProjectMonitorCard';

type ClientProjectsPageProps = {
  projects: ClientProjectMonitor[];
};

const inactiveStatuses = new Set(['COMPLETED', 'CANCELLED']);

export function ClientProjectsPage({ projects }: ClientProjectsPageProps) {
  const activeProjects = projects.filter(project => !inactiveStatuses.has(project.status));

  const projectHistory = projects.filter(project => inactiveStatuses.has(project.status));

  return (
    <main className="py-6 sm:py-8">
      <div className="space-y-8">
        <section className="px-1">
          <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-muted">Projects</p>

          <div className="mt-2 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h1 className="text-xl font-semibold tracking-[-0.04em] text-foreground sm:text-2xl">
                Your projects
              </h1>

              <p className="mt-1 max-w-2xl text-xs leading-5 text-muted">
                Monitor project health, delivery and progress from one workspace.
              </p>
            </div>

            <Link
              href="/services"
              className="
                inline-flex
                h-9
                w-fit
                items-center
                justify-center
                gap-2
                rounded-full
                border
                border-theme-accent
                bg-theme-accent
                px-4
                text-[11px]
                font-semibold
                text-black
              ">
              Start a project
              <ArrowRight aria-hidden="true" className="size-3.5" />
            </Link>
          </div>
        </section>

        {projects.length === 0 ? (
          <EmptyProjectsState />
        ) : (
          <>
            <ProjectCollection
              title="Active projects"
              description="Projects currently under Rcentz delivery, monitoring or maintenance."
              projects={activeProjects}
            />

            {projectHistory.length > 0 ? (
              <ProjectCollection
                title="Project history"
                description="Completed or inactive projects associated with your account."
                projects={projectHistory}
                subdued
              />
            ) : null}
          </>
        )}
      </div>
    </main>
  );
}

function ProjectCollection({
  title,
  description,
  projects,
  subdued = false
}: {
  title: string;
  description: string;
  projects: ClientProjectMonitor[];
  subdued?: boolean;
}) {
  if (projects.length === 0) {
    return (
      <section>
        <div className="mb-3 px-1">
          <h2 className="text-sm font-semibold tracking-[-0.025em] text-foreground">{title}</h2>

          <p className="mt-1 text-[10px] text-muted">{description}</p>
        </div>

        <div className="rounded-[18px] border border-dashed border-border bg-surface-muted/20 px-5 py-8 text-center">
          <p className="text-[11px] text-muted">No projects in this section.</p>
        </div>
      </section>
    );
  }

  return (
    <section>
      <div className="mb-3 flex items-end justify-between gap-4 px-1">
        <div>
          <h2 className="text-sm font-semibold tracking-[-0.025em] text-foreground">{title}</h2>

          <p className="mt-1 text-[10px] text-muted">{description}</p>
        </div>

        <span className="text-[9px] font-medium text-muted">{projects.length}</span>
      </div>

      <div className="space-y-5">
        {projects.map(project => (
          <article
            key={project.id}
            className={[
              'rounded-[20px]',
              'border',
              'border-border',
              'bg-background',
              'p-4',
              'sm:p-5',
              subdued ? 'opacity-80' : ''
            ].join(' ')}>
            <div className="mb-4 flex items-center justify-between gap-4">
              <div className="min-w-0">
                <p className="truncate text-sm font-semibold text-foreground">{project.name}</p>

                <p className="mt-1 text-[9px] text-muted">Project health monitor</p>
              </div>

              <Link
                href={`/dashboard/projects/${project.id}`}
                className="flex shrink-0 items-center gap-1 text-[10px] font-medium text-muted transition-colors hover:text-foreground">
                Open project
                <ArrowRight aria-hidden="true" className="size-3" />
              </Link>
            </div>

            <ProjectMonitorCard project={project} />
          </article>
        ))}
      </div>
    </section>
  );
}

function EmptyProjectsState() {
  return (
    <section className="flex min-h-[58vh] items-center justify-center">
      <div className="w-full max-w-lg rounded-[20px] border border-border bg-surface p-7 text-center">
        <div className="mx-auto flex size-11 items-center justify-center rounded-xl border border-border bg-surface-muted">
          <FolderKanban aria-hidden="true" className="size-5 text-muted" />
        </div>

        <h2 className="mt-5 text-lg font-semibold tracking-[-0.03em] text-foreground">No projects yet</h2>

        <p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-muted">
          Your Rcentz project workspace will appear here once a project is connected to your account.
        </p>

        <Link
          href="/services"
          className="mt-6 inline-flex h-9 items-center justify-center gap-2 rounded-full border border-theme-accent bg-theme-accent px-4 text-[11px] font-semibold text-black">
          Start a project
          <ArrowRight aria-hidden="true" className="size-3.5" />
        </Link>
      </div>
    </section>
  );
}
