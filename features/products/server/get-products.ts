import "server-only";

import { rcentzApiGet } from "@/server/rcentz-api/client";

export type RcentzProductStage =
  | "CONCEPT"
  | "PLANNING"
  | "DEVELOPMENT"
  | "TESTING"
  | "BETA"
  | "PRODUCTION"
  | "MAINTENANCE"
  | "PAUSED"
  | "RETIRED";

export type RcentzProductGallery = {
  id: string;
  name: string;
  slug: string;
  description: string | null;

  type:
    | "GENERAL"
    | "PRODUCT"
    | "DEVELOPMENT"
    | "RELEASE"
    | "BRAND"
    | "DOCUMENTATION";

  featured: boolean;
  sortOrder: number;

  publishedAt: string | null;

  media: Array<{
    id: string;
    url: string;
    alt: string | null;
    caption: string | null;
    width: number | null;
    height: number | null;
    sortOrder: number;
  }>;
};

export type RcentzProduct = {
  id: string;

  name: string;
  slug: string;

  tagline: string | null;

  shortDescription: string | null;
  description: string | null;

  aboutNotes: string | null;
  purpose: string | null;
  intendedUse: string | null;
  contribution: string | null;

  stage: RcentzProductStage;

  progress: number | null;

  isReleased: boolean;
  currentVersion: string | null;

  productUrl: string | null;

  featured: boolean;
  sortOrder: number;

  betaAvailable: boolean;
  waitlistEnabled: boolean;

  productionStartedAt: string | null;
  expectedReleaseAt: string | null;

  firstReleasedAt: string | null;
  latestReleasedAt: string | null;

  retiredAt: string | null;
  publishedAt: string | null;

  galleries: RcentzProductGallery[];

  seo: {
    title: string | null;
    description: string | null;
    keywords: string | null;
    canonicalUrl: string | null;
    ogTitle: string | null;
    ogDescription: string | null;
    ogImage: string | null;
    robots: string;
  } | null;
};

export function getProducts() {
  return rcentzApiGet<RcentzProduct[]>(
    "/api/v1/products",
  );
}