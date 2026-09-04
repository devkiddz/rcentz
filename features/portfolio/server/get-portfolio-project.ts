import { cache } from 'react';

import { prisma } from '@/lib/prisma';

/**
 * Canonical public query for one portfolio project.
 *
 * Public portfolio access requires BOTH:
 * 1. PortfolioProfile.publishedAt !== null
 * 2. Project.visibility === PUBLIC
 *
 * This server boundary owns those rules so presentation
 * components never decide whether a project is public.
 */
export const getPortfolioProject = cache(async (slug: string) => {
  const normalizedSlug = slug.trim();

  if (!normalizedSlug) {
    return null;
  }

  const portfolio = await prisma.portfolioProfile.findFirst({
    where: {
      publishedAt: {
        not: null
      },
      project: {
        slug: normalizedSlug,
        visibility: 'PUBLIC'
      }
    },
    select: {
      id: true,

      tagline: true,
      summary: true,
      challenge: true,
      solution: true,
      outcome: true,

      liveUrl: true,
      repositoryUrl: true,

      featured: true,
      publishedAt: true,
      createdAt: true,
      updatedAt: true,

      project: {
        select: {
          id: true,
          name: true,
          slug: true,

          description: true,
          purpose: true,
          vision: true,
          expectedOutcome: true,

          type: true,
          status: true,
          visibility: true,
          progress: true,

          startedAt: true,
          expectedEndAt: true,
          completedAt: true,
          createdAt: true,
          updatedAt: true,

          technologies: {
            select: {
              id: true,
              name: true,
              slug: true,
              icon: true,
              category: true,
              description: true,
              purpose: true,
              rationale: true,
              sortOrder: true,
              featured: true
            },
            orderBy: [
              {
                sortOrder: 'asc'
              },
              {
                name: 'asc'
              }
            ]
          },

          media: {
            select: {
              id: true,
              url: true,
              publicId: true,
              fileName: true,
              mimeType: true,
              width: true,
              height: true,
              alt: true,
              caption: true,
              sortOrder: true,
              createdAt: true,
              updatedAt: true
            },
            orderBy: [
              {
                sortOrder: 'asc'
              },
              {
                createdAt: 'asc'
              }
            ],
            take: 12
          },

          updates: {
            where: {
              visibility: 'PUBLIC'
            },
            select: {
              id: true,
              title: true,
              description: true,
              type: true,
              progress: true,
              createdAt: true,
              updatedAt: true,

              milestone: {
                select: {
                  id: true,
                  title: true,
                  slug: true
                }
              },

              feature: {
                select: {
                  id: true,
                  name: true,
                  slug: true
                }
              },

              media: {
                select: {
                  id: true,
                  url: true,
                  fileName: true,
                  mimeType: true,
                  width: true,
                  height: true,
                  alt: true,
                  caption: true,
                  sortOrder: true
                },
                orderBy: [
                  {
                    sortOrder: 'asc'
                  },
                  {
                    createdAt: 'asc'
                  }
                ]
              }
            },
            orderBy: {
              createdAt: 'desc'
            }
          },

          analytics: {
            select: {
              views: true,
              uniqueViews: true,
              shares: true,
              downloads: true,
              lastViewedAt: true,
              createdAt: true,
              updatedAt: true
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
            take: 6
          },

          seo: {
            select: {
              title: true,
              description: true,
              keywords: true,
              canonicalUrl: true,
              ogTitle: true,
              ogDescription: true,
              ogImage: true,
              robots: true,
              updatedAt: true
            }
          }
        }
      }
    }
  });

  if (!portfolio) {
    return null;
  }

  const reactionCounts = portfolio.project.reactions.reduce<Record<string, number>>(
    (counts, reaction) => {
      counts[reaction.type] = (counts[reaction.type] ?? 0) + 1;
      return counts;
    },
    {}
  );

  return {
    id: portfolio.project.id,
    portfolioProfileId: portfolio.id,

    name: portfolio.project.name,
    slug: portfolio.project.slug,

    description: portfolio.project.description,
    purpose: portfolio.project.purpose,
    vision: portfolio.project.vision,
    expectedOutcome: portfolio.project.expectedOutcome,

    type: portfolio.project.type,
    status: portfolio.project.status,
    visibility: portfolio.project.visibility,
    progress: portfolio.project.progress,

    tagline: portfolio.tagline,
    summary: portfolio.summary,
    challenge: portfolio.challenge,
    solution: portfolio.solution,
    outcome: portfolio.outcome,

    liveUrl: portfolio.liveUrl,
    repositoryUrl: portfolio.repositoryUrl,

    featured: portfolio.featured,

    publishedAt: portfolio.publishedAt?.toISOString() ?? null,
    startedAt: portfolio.project.startedAt?.toISOString() ?? null,
    expectedEndAt: portfolio.project.expectedEndAt?.toISOString() ?? null,
    completedAt: portfolio.project.completedAt?.toISOString() ?? null,

    createdAt: portfolio.project.createdAt.toISOString(),
    updatedAt: portfolio.project.updatedAt.toISOString(),

    portfolioCreatedAt: portfolio.createdAt.toISOString(),
    portfolioUpdatedAt: portfolio.updatedAt.toISOString(),

    technologies: portfolio.project.technologies,

    media: portfolio.project.media.map(media => ({
      ...media,
      createdAt: media.createdAt.toISOString(),
      updatedAt: media.updatedAt.toISOString()
    })),

    updates: portfolio.project.updates.map(update => ({
      ...update,
      createdAt: update.createdAt.toISOString(),
      updatedAt: update.updatedAt.toISOString()
    })),

    analytics: portfolio.project.analytics
      ? {
          views: portfolio.project.analytics.views,
          uniqueViews: portfolio.project.analytics.uniqueViews,
          shares: portfolio.project.analytics.shares,
          downloads: portfolio.project.analytics.downloads,
          lastViewedAt: portfolio.project.analytics.lastViewedAt?.toISOString() ?? null,
          createdAt: portfolio.project.analytics.createdAt.toISOString(),
          updatedAt: portfolio.project.analytics.updatedAt.toISOString()
        }
      : null,

    engagement: {
      reactions: portfolio.project.reactions.length,
      comments: portfolio.project.comments.length
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
    })),

    seo: portfolio.project.seo
      ? {
          title: portfolio.project.seo.title,
          description: portfolio.project.seo.description,
          keywords: portfolio.project.seo.keywords,
          canonicalUrl: portfolio.project.seo.canonicalUrl,
          ogTitle: portfolio.project.seo.ogTitle,
          ogDescription: portfolio.project.seo.ogDescription,
          ogImage: portfolio.project.seo.ogImage,
          robots: portfolio.project.seo.robots,
          updatedAt: portfolio.project.seo.updatedAt.toISOString()
        }
      : null
  };
});

export type PortfolioProjectDetail = Awaited<ReturnType<typeof getPortfolioProject>>;
export type PublicPortfolioProject = NonNullable<PortfolioProjectDetail>;