import { prisma } from '@/lib/prisma';
import type { SupportedLocale } from '@/i18n/config';
import { localizeFields } from '@/server/localization/localize-fields';

const homepagePricingSlugs = [
  'business-website-development',
  'ecommerce-store-development',
  'business-management-system'
] as const;

export async function getHomepageData(locale: SupportedLocale = 'en') {
  const [featuredServices, featuredPortfolio, pricingServices] = await Promise.all([
    prisma.service.findMany({
      where: { status: 'ACTIVE', featured: true },
      select: {
        id: true, name: true, slug: true, shortDescription: true, type: true,
        category: { select: { id: true, name: true, slug: true } },
        prices: { select: { currency: true, priceFrom: true, priceTo: true }, orderBy: { currency: 'asc' } }
      },
      orderBy: { name: 'asc' }, take: 6
    }),
    prisma.portfolioProfile.findMany({
      where: { publishedAt: { not: null }, project: { visibility: 'PUBLIC' } },
      select: {
        id: true, tagline: true, summary: true, outcome: true, liveUrl: true, repositoryUrl: true,
        featured: true, publishedAt: true,
        project: {
          select: {
            id: true, name: true, slug: true, description: true, type: true, status: true, progress: true,
            technologies: { select: { name: true, slug: true }, orderBy: { name: 'asc' } },
            media: {
              select: { id: true, url: true, alt: true, caption: true, width: true, height: true, sortOrder: true },
              orderBy: [{ sortOrder: 'asc' }, { createdAt: 'asc' }], take: 5
            }
          }
        }
      },
      orderBy: [{ featured: 'desc' }, { publishedAt: 'desc' }], take: 6
    }),
    prisma.service.findMany({
      where: { status: 'ACTIVE', slug: { in: [...homepagePricingSlugs] } },
      select: {
        id: true, name: true, slug: true, shortDescription: true, type: true,
        category: { select: { id: true, name: true, slug: true } },
        prices: { select: { currency: true, priceFrom: true, priceTo: true }, orderBy: { currency: 'asc' } }
      }
    })
  ]);

  const localizeService = async (service: (typeof featuredServices)[number]) => {
    const copy = await localizeFields({
      entityType: 'Service', entityId: service.id, locale,
      values: { name: service.name, shortDescription: service.shortDescription }
    });
    const category = service.category
      ? await localizeFields({
          entityType: 'ServiceCategory', entityId: service.category.id, locale,
          values: { name: service.category.name }
        })
      : null;
    return {
      id: service.id, name: copy.name, slug: service.slug, shortDescription: copy.shortDescription,
      type: service.type,
      category: service.category ? { name: category?.name ?? service.category.name, slug: service.category.slug } : null,
      prices: service.prices.map(price => ({
        currency: price.currency, priceFrom: Number(price.priceFrom),
        priceTo: price.priceTo === null ? null : Number(price.priceTo)
      }))
    };
  };

  const services = await Promise.all(featuredServices.map(localizeService));

  const projects = await Promise.all(featuredPortfolio.map(async portfolio => {
    const profile = await localizeFields({
      entityType: 'PortfolioProfile', entityId: portfolio.id, locale,
      values: { tagline: portfolio.tagline, summary: portfolio.summary, outcome: portfolio.outcome }
    });
    const projectCopy = await localizeFields({
      entityType: 'Project', entityId: portfolio.project.id, locale,
      values: { description: portfolio.project.description }
    });
    const media = await Promise.all(portfolio.project.media.map(async item => {
      const localized = await localizeFields({
        entityType: 'ProjectMedia', entityId: item.id, locale,
        values: { alt: item.alt, caption: item.caption }
      });
      return { ...item, alt: localized.alt, caption: localized.caption };
    }));
    return {
      id: portfolio.project.id, name: portfolio.project.name, slug: portfolio.project.slug,
      description: projectCopy.description, type: portfolio.project.type, status: portfolio.project.status,
      progress: portfolio.project.progress, tagline: profile.tagline, summary: profile.summary, outcome: profile.outcome,
      liveUrl: portfolio.liveUrl, repositoryUrl: portfolio.repositoryUrl, featured: portfolio.featured,
      publishedAt: portfolio.publishedAt?.toISOString() ?? null,
      technologies: portfolio.project.technologies, media
    };
  }));

  const orderedPricingServices = homepagePricingSlugs
    .map(slug => pricingServices.find(service => service.slug === slug))
    .filter((service): service is NonNullable<typeof service> => Boolean(service));

  const localizedPricing = await Promise.all(orderedPricingServices.map(async service => {
    const copy = await localizeFields({
      entityType: 'Service', entityId: service.id, locale,
      values: { name: service.name, shortDescription: service.shortDescription }
    });
    const category = service.category
      ? await localizeFields({ entityType: 'ServiceCategory', entityId: service.category.id, locale, values: { name: service.category.name } })
      : null;
    return {
      id: service.id, name: copy.name, slug: service.slug, shortDescription: copy.shortDescription,
      type: service.type,
      category: service.category ? { name: category?.name ?? service.category.name, slug: service.category.slug } : null,
      prices: service.prices.map(price => ({
        currency: price.currency, priceFrom: Number(price.priceFrom),
        priceTo: price.priceTo === null ? null : Number(price.priceTo)
      }))
    };
  }));

  return { services, projects, pricingServices: localizedPricing };
}

export type HomepageData = Awaited<ReturnType<typeof getHomepageData>>;
