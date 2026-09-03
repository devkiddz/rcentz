import { prisma } from '@/lib/prisma';

/**
 * Canonical public query for one portfolio project.
 *
 * Public portfolio access requires BOTH:
 *
 * 1. PortfolioProfile.publishedAt !== null
 * 2. Project.visibility === PUBLIC
 *
 * This server boundary owns those rules so presentation
 * components never decide whether a project is public.
 */
export async function getPortfolioProject(
  slug: string
) {
  const normalizedSlug =
    slug.trim();

  if (!normalizedSlug) {
    return null;
  }

  const portfolio =
    await prisma.portfolioProfile.findFirst({
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
        /* ==============================================
           PORTFOLIO PRESENTATION
           ============================================== */

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

        /* ==============================================
           CANONICAL PROJECT
           ============================================== */

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

            /* ==========================================
               TECHNOLOGY
               ========================================== */

            technologies: {
              select: {
                id: true,

                name: true,
                slug: true,
                icon: true
              },

              orderBy: {
                name: 'asc'
              }
            },

            /* ==========================================
               MEDIA CANDIDATES

               IMPORTANT:
               MediaAsset currently has no visibility
               field in the schema.

               These records are therefore NOT treated
               as automatically public.

               The case-study presentation must only
               render media after deliberate review /
               curation.
               ========================================== */

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
              ]
            },

            /* ==========================================
               PUBLIC DEVELOPMENT RECORD

               Client/internal updates never leave
               this query.
               ========================================== */

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

            /* ==========================================
               REAL ANALYTICS

               Null remains null.
               We do not fabricate zero-value metrics
               when analytics has not been created.
               ========================================== */

            analytics: {
              select: {
                views: true,
                uniqueViews: true,

                reactions: true,
                comments: true,

                shares: true,
                downloads: true,

                lastViewedAt: true,

                createdAt: true,
                updatedAt: true
              }
            },

            /* ==========================================
               SEO
               ========================================== */

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

  return {
    /* ================================================
       IDENTITY
       ================================================ */

    id:
      portfolio.project.id,

    portfolioProfileId:
      portfolio.id,

    name:
      portfolio.project.name,

    slug:
      portfolio.project.slug,

    /* ================================================
       PROJECT TRUTH
       ================================================ */

    description:
      portfolio.project.description,

    purpose:
      portfolio.project.purpose,

    vision:
      portfolio.project.vision,

    expectedOutcome:
      portfolio.project
        .expectedOutcome,

    type:
      portfolio.project.type,

    status:
      portfolio.project.status,

    visibility:
      portfolio.project.visibility,

    progress:
      portfolio.project.progress,

    /* ================================================
       CASE STUDY
       ================================================ */

    tagline:
      portfolio.tagline,

    summary:
      portfolio.summary,

    challenge:
      portfolio.challenge,

    solution:
      portfolio.solution,

    outcome:
      portfolio.outcome,

    /* ================================================
       EXTERNAL ACTIONS
       ================================================ */

    liveUrl:
      portfolio.liveUrl,

    repositoryUrl:
      portfolio.repositoryUrl,

    featured:
      portfolio.featured,

    /* ================================================
       DATES
       ================================================ */

    publishedAt:
      portfolio.publishedAt
        ?.toISOString() ??
      null,

    startedAt:
      portfolio.project
        .startedAt
        ?.toISOString() ??
      null,

    expectedEndAt:
      portfolio.project
        .expectedEndAt
        ?.toISOString() ??
      null,

    completedAt:
      portfolio.project
        .completedAt
        ?.toISOString() ??
      null,

    createdAt:
      portfolio.project
        .createdAt
        .toISOString(),

    updatedAt:
      portfolio.project
        .updatedAt
        .toISOString(),

    portfolioCreatedAt:
      portfolio.createdAt
        .toISOString(),

    portfolioUpdatedAt:
      portfolio.updatedAt
        .toISOString(),

    /* ================================================
       TECHNOLOGY
       ================================================ */

    technologies:
      portfolio.project
        .technologies,

    /* ================================================
       MEDIA

       Deliberately named mediaCandidates until
       public-media curation is formally established.
       ================================================ */

    mediaCandidates:
      portfolio.project.media.map(
        media => ({
          ...media,

          createdAt:
            media.createdAt
              .toISOString(),

          updatedAt:
            media.updatedAt
              .toISOString()
        })
      ),

    /* ================================================
       PUBLIC DEVELOPMENT RECORD
       ================================================ */

    updates:
      portfolio.project
        .updates.map(
          update => ({
            ...update,

            createdAt:
              update.createdAt
                .toISOString(),

            updatedAt:
              update.updatedAt
                .toISOString()
          })
        ),

    /* ================================================
       ANALYTICS
       ================================================ */

    analytics:
      portfolio.project.analytics
        ? {
            views:
              portfolio.project
                .analytics.views,

            uniqueViews:
              portfolio.project
                .analytics
                .uniqueViews,

            reactions:
              portfolio.project
                .analytics.reactions,

            comments:
              portfolio.project
                .analytics.comments,

            shares:
              portfolio.project
                .analytics.shares,

            downloads:
              portfolio.project
                .analytics.downloads,

            lastViewedAt:
              portfolio.project
                .analytics
                .lastViewedAt
                ?.toISOString() ??
              null,

            createdAt:
              portfolio.project
                .analytics
                .createdAt
                .toISOString(),

            updatedAt:
              portfolio.project
                .analytics
                .updatedAt
                .toISOString()
          }
        : null,

    /* ================================================
       SEO
       ================================================ */

    seo:
      portfolio.project.seo
        ? {
            title:
              portfolio.project
                .seo.title,

            description:
              portfolio.project
                .seo.description,

            keywords:
              portfolio.project
                .seo.keywords,

            canonicalUrl:
              portfolio.project
                .seo.canonicalUrl,

            ogTitle:
              portfolio.project
                .seo.ogTitle,

            ogDescription:
              portfolio.project
                .seo
                .ogDescription,

            ogImage:
              portfolio.project
                .seo.ogImage,

            robots:
              portfolio.project
                .seo.robots,

            updatedAt:
              portfolio.project
                .seo.updatedAt
                .toISOString()
          }
        : null
  };
}

export type PortfolioProjectDetail =
  Awaited<
    ReturnType<
      typeof getPortfolioProject
    >
  >;

export type PublicPortfolioProject =
  NonNullable<
    PortfolioProjectDetail
  >;