import { FolderKanban } from 'lucide-react';

import { requireAuth } from '@/features/auth/server/require-auth';

import { ActivitySummarySection } from '@/features/client/components/overview/ActivitySummarySection';
import { ProjectDetailsSection } from '@/features/client/components/overview/ProjectDetailsSection';
import { getClientOverview } from '@/features/client/server/overview/get-client-overview';

export default async function DashboardPage() {
  const user = await requireAuth('/dashboard');

  const data = await getClientOverview(user.id);

  const project = data.currentProject;

  if (!project) {
    return (
      <main className="py-8">
        <div className="flex min-h-[65vh] items-center justify-center">
          <div className="w-full max-w-lg rounded-2xl border border-border bg-surface p-7 text-center">
            <div className="mx-auto flex size-11 items-center justify-center rounded-xl border border-border bg-surface-muted">
              <FolderKanban aria-hidden="true" className="size-5 text-muted-foreground" />
            </div>

            <h1 className="mt-5 text-lg font-semibold tracking-[-0.03em] text-foreground">
              No project assigned yet
            </h1>

            <p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-muted-foreground">
              Your project workspace will appear here once a Rcentz project has been assigned to your account.
            </p>
          </div>
        </div>
      </main>
    );
  }

  const budget = Number(project.budget ?? 0);

  const billed = data.financialSummary?.total ?? 0;

  const currency = data.financialSummary?.currency ?? project.currency;

  const subscription = project.subscription;

  return (
    <main className="py-6 sm:py-8">
      <div className="space-y-6">
        <section className="px-1">
          <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">
            Project Overview
          </p>

          <div className="mt-2 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h1 className="text-xl font-semibold tracking-[-0.04em] text-foreground sm:text-2xl">
                {project.name}
              </h1>

              <p className="mt-1 max-w-2xl text-xs leading-5 text-muted-foreground">
                {project.description ?? project.purpose ?? 'Your current Rcentz project workspace.'}
              </p>
            </div>
          </div>
        </section>

        <ActivitySummarySection
          currency={currency}
          budget={budget}
          billed={billed}
          subscriptionStatus={subscription?.status ?? null}
          subscriptionPlan={subscription?.plan.name ?? null}
          nextBillingAt={subscription?.nextBillingAt ?? null}
          unreadMessages={0}
          ticketCount={project._count.supportTickets}
          openTicketCount={data.openTicketCount}
          projectProgress={project.progress}
          projectStatus={project.status}
        />

        <ProjectDetailsSection project={project} />
      </div>
    </main>
  );
}
