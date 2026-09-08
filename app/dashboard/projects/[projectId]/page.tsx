import { notFound } from 'next/navigation';

import { requireAuth } from '@/features/auth/server/require-auth';

import { ClientProjectPage } from '@/features/client/components/projects/ClientProjectPage';
import { getClientProject } from '@/features/client/server/projects/get-client-project';

type DashboardProjectPageProps = {
  params: Promise<{
    projectId: string;
  }>;
};

export default async function DashboardProjectPage({ params }: DashboardProjectPageProps) {
  const user = await requireAuth('/dashboard/projects');

  const { projectId } = await params;

  const project = await getClientProject({
    userId: user.id,
    projectId
  });

  if (!project) {
    notFound();
  }

  return <ClientProjectPage project={project} />;
}
