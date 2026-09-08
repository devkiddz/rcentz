import { notFound } from 'next/navigation';

import { requireAuth } from '@/features/auth/server/require-auth';

import { ClientProjectAnalyticsPage } from '@/features/client/components/projects/ClientProjectAnalyticsPage';

import { getClientProject } from '@/features/client/server/projects/get-client-project';

type DashboardProjectAnalyticsPageProps = {
  params: Promise<{
    projectId: string;
  }>;
};

export default async function DashboardProjectAnalyticsPage({ params }: DashboardProjectAnalyticsPageProps) {
  const user = await requireAuth('/dashboard/projects');

  const { projectId } = await params;

  const project = await getClientProject({
    userId: user.id,
    projectId
  });

  if (!project) {
    notFound();
  }

  return <ClientProjectAnalyticsPage project={project} />;
}
