import { prisma } from '@/lib/prisma';

export async function getHomepageData() {
  const [
    featuredServices,
    featuredPortfolio
  ] = await Promise.all([
    prisma.service.findMany({
      where: {
        status: 'ACTIVE',
        featured: true
      },

      select: {
        id: true,
        name: true,
        slug: true,
        shortDescription: true,
        type: true,

        category: {
          select: {
            name: true,
            slug: true
          }
        },

        prices: {
          select: {
            currency: true,
            priceFrom: true,
            priceTo: true
          },

          orderBy: {
            currency: 'asc'
          }
        }
      },

      orderBy: {
        name: 'asc'
      },

      take: 6
    }),

    prisma.portfolioProfile.findMany({
      where: {
        featured: true,

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
        publishedAt: true,

        project: {
          select: {
            id: true,
            name: true,
            slug: true,
            description: true,
            type: true,
            status: true,
            progress: true,

            technologies: {
              select: {
                name: true,
                slug: true
              },

              orderBy: {
                name: 'asc'
              }
            }
          }
        }
      },

      orderBy: {
        publishedAt: 'desc'
      },

      take: 4
    })
  ]);

  return {
    services: featuredServices.map(service => ({
      id: service.id,
      name: service.name,
      slug: service.slug,
      shortDescription:
        service.shortDescription,
      type: service.type,

      category: service.category
        ? {
            name: service.category.name,
            slug: service.category.slug
          }
        : null,

      prices: service.prices.map(price => ({
        currency: price.currency,
        priceFrom: Number(price.priceFrom),
        priceTo:
          price.priceTo === null
            ? null
            : Number(price.priceTo)
      }))
    })),

    projects: featuredPortfolio.map(
      portfolio => ({
        id: portfolio.project.id,
        name: portfolio.project.name,
        slug: portfolio.project.slug,
        description:
          portfolio.project.description,
        type: portfolio.project.type,
        status: portfolio.project.status,
        progress: portfolio.project.progress,

        tagline: portfolio.tagline,
        summary: portfolio.summary,
        outcome: portfolio.outcome,

        liveUrl: portfolio.liveUrl,
        repositoryUrl:
          portfolio.repositoryUrl,

        publishedAt:
          portfolio.publishedAt?.toISOString() ??
          null,

        technologies:
          portfolio.project.technologies
      })
    )
  };
}

export type HomepageData =
  Awaited<
    ReturnType<typeof getHomepageData>
  >;