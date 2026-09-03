import { prisma } from '@/lib/prisma';

export async function getPortfolioProjects() {
  const portfolios = await prisma.portfolioProfile.findMany({
    where: {
      publishedAt: {
        not: null
      },

      project: {
        visibility: 'PUBLIC'
      }
    },

    select: {
      tagline: true,
      summary: true,
      outcome: true,

      liveUrl: true,
      repositoryUrl: true,

      featured: true,
      publishedAt: true,
      updatedAt: true,

      project: {
        select: {
          id: true,
          name: true,
          slug: true,

          description: true,

          type: true,
          status: true,
          visibility: true,
          progress: true,

          startedAt: true,
          expectedEndAt: true,
          completedAt: true,
          updatedAt: true,

          technologies: {
            select: {
              name: true,
              slug: true,
              icon: true
            },

            orderBy: {
              name: 'asc'
            }
          },

          media: {
            select: {
              id: true,
              url: true,
              alt: true,
              caption: true,
              width: true,
              height: true,
              sortOrder: true
            },

            orderBy: [
              {
                sortOrder: 'asc'
              },
              {
                createdAt: 'asc'
              }
            ],

            take: 5
          }
        }
      }
    },

    orderBy: [
      {
        featured: 'desc'
      },
      {
        publishedAt: 'desc'
      }
    ]
  });

  return portfolios.map(portfolio => ({
    id: portfolio.project.id,
    name: portfolio.project.name,
    slug: portfolio.project.slug,

    description: portfolio.project.description,

    type: portfolio.project.type,
    status: portfolio.project.status,
    visibility: portfolio.project.visibility,
    progress: portfolio.project.progress,

    tagline: portfolio.tagline,
    summary: portfolio.summary,
    outcome: portfolio.outcome,

    liveUrl: portfolio.liveUrl,
    repositoryUrl: portfolio.repositoryUrl,

    featured: portfolio.featured,

    publishedAt: portfolio.publishedAt?.toISOString() ?? null,
    startedAt: portfolio.project.startedAt?.toISOString() ?? null,
    expectedEndAt: portfolio.project.expectedEndAt?.toISOString() ?? null,
    completedAt: portfolio.project.completedAt?.toISOString() ?? null,

    updatedAt: portfolio.project.updatedAt.toISOString(),
    portfolioUpdatedAt: portfolio.updatedAt.toISOString(),

    technologies: portfolio.project.technologies,
    media: portfolio.project.media
  }));
}

export type PortfolioProjects = Awaited<ReturnType<typeof getPortfolioProjects>>;

export type PortfolioProject = PortfolioProjects[number];
