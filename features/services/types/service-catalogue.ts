export interface ServiceCataloguePrice {
  currency: string;
  priceFrom: number;
  priceTo: number | null;
}

export interface ServiceCatalogueItem {
  id: string;
  name: string;
  slug: string;
  shortDescription: string | null;
  type: string;
  featured: boolean;
  prices: ServiceCataloguePrice[];
}

export interface ServiceCatalogueCategory {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  image: string | null;
  services: ServiceCatalogueItem[];
}
