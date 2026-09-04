import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { PortfolioDetail } from '@/features/portfolio/components/detail/PortfolioDetail';
import { getPortfolioProject } from '@/features/portfolio/server/get-portfolio-project';

export const revalidate = 300;

type PortfolioProjectPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export async function generateMetadata({
  params
}: PortfolioProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = await getPortfolioProject(slug);

  if (!project) {
    return {
      title: 'Project not found | Rcentz Systems'
    };
  }

  const title = project.seo?.title ?? `${project.name} | Rcentz Systems`;
  const description =
    project.seo?.description ??
    project.summary ??
    project.tagline ??
    project.description ??
    `Explore ${project.name}, a published Rcentz Systems project.`;

  return {
    title,
    description,
    keywords: project.seo?.keywords ?? undefined,

    alternates: project.seo?.canonicalUrl
      ? {
          canonical: project.seo.canonicalUrl
        }
      : undefined,

    openGraph: {
      title: project.seo?.ogTitle ?? title,
      description: project.seo?.ogDescription ?? description,
      images: project.seo?.ogImage
        ? [
            {
              url: project.seo.ogImage
            }
          ]
        : project.media[0]?.url
          ? [
              {
                url: project.media[0].url
              }
            ]
          : undefined
    }
  };
}

export default async function PortfolioProjectPage({
  params
}: PortfolioProjectPageProps) {
  const { slug } = await params;
  const project = await getPortfolioProject(slug);

  if (!project) {
    notFound();
  }

  return <PortfolioDetail project={project} />;
}
