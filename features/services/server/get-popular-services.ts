import 'server-only';

import { cache } from 'react';

import {
  getServiceCategories,
  type ServiceCardSummary
} from './get-service-categories';

const MAX_POPULAR_SERVICES = 8;

const FALLBACK_SERVICE_SLUGS = [
  'broker-trading-dashboard-development',
  'business-management-system',
  'ecommerce-store-development',
  'business-website-development'
] as const;

const FALLBACK_CATEGORY_SLUGS = [
  'financial-regulated-platforms',
  'business-systems',
  'ecommerce',
  'web-development'
] as const;

export type PopularService = {
  service: ServiceCardSummary;
  categoryName: string;
  categorySlug: string;
};

export const getPopularServices = cache(
  async (): Promise<PopularService[]> => {
    const categories =
      await getServiceCategories();

    const catalogue = categories.flatMap(
      category =>
        category.services.map(service => ({
          service,
          categoryName: category.name,
          categorySlug: category.slug
        }))
    );

    if (catalogue.length === 0) {
      return [];
    }

    const selected: PopularService[] = [];

    const selectedIds = new Set<string>();

    function add(
      item:
        | PopularService
        | undefined
        | null
    ) {
      if (!item) {
        return;
      }

      if (
        selectedIds.has(item.service.id)
      ) {
        return;
      }

      selected.push(item);

      selectedIds.add(item.service.id);
    }

    /*
     * 1.
     * Database intent wins first.
     *
     * Service.featured already exists
     * in the catalogue model, so Admin /
     * seed data can influence this surface
     * without layout code knowing anything
     * about ordering.
     */
    catalogue
      .filter(item => item.service.featured)
      .forEach(add);

    /*
     * 2.
     * Strong commercial service
     * fallbacks.
     *
     * These only participate when the
     * catalogue has not already filled
     * the carousel through featured data.
     */
    for (const slug of FALLBACK_SERVICE_SLUGS) {
      if (
        selected.length >=
        MAX_POPULAR_SERVICES
      ) {
        break;
      }

      add(
        catalogue.find(
          item => item.service.slug === slug
        )
      );
    }

    /*
     * 3.
     * Category-level fallback.
     *
     * Financial platforms, business
     * systems, commerce and web
     * development remain commercially
     * useful discovery directions even
     * if individual service slugs change.
     */
    for (const categorySlug of FALLBACK_CATEGORY_SLUGS) {
      if (
        selected.length >=
        MAX_POPULAR_SERVICES
      ) {
        break;
      }

      const categoryServices =
        catalogue.filter(
          item =>
            item.categorySlug ===
            categorySlug
        );

      for (const item of categoryServices) {
        if (
          selected.length >=
          MAX_POPULAR_SERVICES
        ) {
          break;
        }

        add(item);
      }
    }

    /*
     * 4.
     * Never leave the discovery rail
     * artificially empty.
     */
    for (const item of catalogue) {
      if (
        selected.length >=
        MAX_POPULAR_SERVICES
      ) {
        break;
      }

      add(item);
    }

    return selected.slice(
      0,
      MAX_POPULAR_SERVICES
    );
  }
);