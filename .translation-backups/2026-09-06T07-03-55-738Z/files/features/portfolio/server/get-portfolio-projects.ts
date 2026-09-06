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
          },

          analytics: {
            select: {
              views: true,
              uniqueViews: true,
              shares: true,
              downloads: true,
              lastViewedAt: true
            }
          },

          reactions: {
            select: {
              type: true
            }
          },

          comments: {
            where: {
              status: 'APPROVED'
            },

            select: {
              id: true
            }
          },

          attributions: {
            select: {
              id: true,
              name: true,
              role: true,

              user: {
                select: {
                  name: true
                }
              }
            },

            orderBy: {
              createdAt: 'asc'
            }
          },

          features: {
            where: {
              status: {
                in: ['PROPOSED', 'NOMINATED']
              }
            },

            select: {
              id: true,
              name: true,
              description: true,
              expectedOutcome: true,
              status: true,
              priority: true,
              progress: true,
              nominatedAt: true
            },

            orderBy: [
              {
                nominatedAt: 'desc'
              },
              {
                createdAt: 'desc'
              }
            ],

            take: 3
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

  return portfolios.map(portfolio => {
    const reactionCounts = portfolio.project.reactions.reduce<Record<string, number>>((counts, reaction) => {
      counts[reaction.type] = (counts[reaction.type] ?? 0) + 1;
      return counts;
    }, {});

    return {
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
      media: portfolio.project.media,

      analytics: {
        views: portfolio.project.analytics?.views ?? 0,
        uniqueViews: portfolio.project.analytics?.uniqueViews ?? 0,
        reactions: portfolio.project.reactions.length,
        comments: portfolio.project.comments.length,
        shares: portfolio.project.analytics?.shares ?? 0,
        downloads: portfolio.project.analytics?.downloads ?? 0,
        lastViewedAt: portfolio.project.analytics?.lastViewedAt?.toISOString() ?? null
      },

      reactions: {
        like: reactionCounts.LIKE ?? 0,
        love: reactionCounts.LOVE ?? 0,
        clap: reactionCounts.CLAP ?? 0,
        fire: reactionCounts.FIRE ?? 0,
        insightful: reactionCounts.INSIGHTFUL ?? 0,
        celebrate: reactionCounts.CELEBRATE ?? 0,
        upvote: reactionCounts.UPVOTE ?? 0,
        downvote: reactionCounts.DOWNVOTE ?? 0
      },

      credits: portfolio.project.attributions.map(attribution => ({
        id: attribution.id,
        name: attribution.name ?? attribution.user?.name ?? null,
        role: attribution.role
      })),

      suggestions: portfolio.project.features.map(feature => ({
        id: feature.id,
        name: feature.name,
        description: feature.description,
        expectedOutcome: feature.expectedOutcome,
        status: feature.status,
        priority: feature.priority,
        progress: feature.progress,
        nominatedAt: feature.nominatedAt?.toISOString() ?? null
      }))
    };
  });
}

export type PortfolioProjects = Awaited<ReturnType<typeof getPortfolioProjects>>;

export type PortfolioProject = PortfolioProjects[number];
