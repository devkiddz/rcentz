'use client';

import { useMemo, useState } from 'react';

import Link from 'next/link';

import { ArrowUpRight, Box, Boxes, ImageIcon, Laptop2, PackageSearch, Sparkles } from 'lucide-react';

import type { ClientProductCatalogueItem } from '@/features/client/server/products/get-client-products';

type ClientProductsPageProps = {
  products: ClientProductCatalogueItem[];
};

type ProductFilter = 'ALL' | 'DIGITAL' | 'PHYSICAL' | 'BUNDLE';

function formatMoney(value: number, currency: string) {
  return new Intl.NumberFormat('en-NG', {
    style: 'currency',
    currency,
    maximumFractionDigits: 0
  }).format(value);
}

function getTypeLabel(type: string) {
  switch (type) {
    case 'DIGITAL':
      return 'Software';

    case 'PHYSICAL':
      return 'Physical';

    case 'BUNDLE':
      return 'Bundle';

    default:
      return 'Product';
  }
}

function getAccessLabel(type: string) {
  switch (type) {
    case 'DIGITAL':
      return 'Digital access';

    case 'PHYSICAL':
      return 'Physical delivery';

    case 'BUNDLE':
      return 'Curated package';

    default:
      return 'Rcentz product';
  }
}

function getConfigurationLabel(variantCount: number) {
  if (variantCount === 0) {
    return 'Standard setup';
  }

  if (variantCount === 1) {
    return '1 configuration';
  }

  return `${variantCount} configurations`;
}

function ProductTypeIcon({ type }: { type: string }) {
  switch (type) {
    case 'DIGITAL':
      return <Laptop2 aria-hidden="true" className="size-3.5" />;

    case 'PHYSICAL':
      return <Box aria-hidden="true" className="size-3.5" />;

    case 'BUNDLE':
      return <Boxes aria-hidden="true" className="size-3.5" />;

    default:
      return <Box aria-hidden="true" className="size-3.5" />;
  }
}

export function ClientProductsPage({ products }: ClientProductsPageProps) {
  const [filter, setFilter] = useState<ProductFilter>('ALL');

  const counts = useMemo(() => {
    return {
      all: products.length,

      digital: products.filter(product => {
        return product.type === 'DIGITAL';
      }).length,

      physical: products.filter(product => {
        return product.type === 'PHYSICAL';
      }).length,

      bundle: products.filter(product => {
        return product.type === 'BUNDLE';
      }).length
    };
  }, [products]);

  const filteredProducts = useMemo(() => {
    if (filter === 'ALL') {
      return products;
    }

    return products.filter(product => {
      return product.type === filter;
    });
  }, [filter, products]);

  const filters: Array<{
    key: ProductFilter;
    label: string;
    count: number;
  }> = [
    {
      key: 'ALL',
      label: 'All',
      count: counts.all
    },
    {
      key: 'DIGITAL',
      label: 'Software',
      count: counts.digital
    },
    {
      key: 'PHYSICAL',
      label: 'Physical',
      count: counts.physical
    },
    {
      key: 'BUNDLE',
      label: 'Bundles',
      count: counts.bundle
    }
  ];

  return (
    <main className="px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
      <div className="mx-auto w-full max-w-[1200px] space-y-7">
        <section>
          <p className="font-mono text-[9px] uppercase tracking-[0.16em] text-theme-accent">Products</p>

          <div className="mt-2 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h1 className="text-xl font-semibold tracking-[-0.04em] text-foreground sm:text-2xl">
                Rcentz product library
              </h1>

              <p className="mt-1 max-w-2xl text-xs leading-5 text-muted">
                Software, digital products, physical equipment and curated solutions available across the
                Rcentz ecosystem.
              </p>
            </div>

            <div className="flex items-center gap-2 text-[9px] text-muted">
              <span className="font-semibold text-foreground">{products.length}</span>

              <span>product{products.length === 1 ? '' : 's'}</span>
            </div>
          </div>
        </section>

        <section
          aria-label="Product filters"
          className="flex gap-2 overflow-x-auto pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {filters.map(item => {
            const active = filter === item.key;

            return (
              <button
                key={item.key}
                type="button"
                onClick={() => setFilter(item.key)}
                className={
                  active
                    ? 'inline-flex h-8 shrink-0 items-center gap-2 rounded-full border border-foreground bg-foreground px-3 text-[9px] font-medium text-background'
                    : 'inline-flex h-8 shrink-0 items-center gap-2 rounded-full border border-border bg-background px-3 text-[9px] font-medium text-muted transition-colors hover:text-foreground'
                }>
                {item.label}

                <span className={active ? 'text-background/60' : 'text-muted'}>{item.count}</span>
              </button>
            );
          })}
        </section>

        {filteredProducts.length > 0 ? (
          <section aria-label="Products" className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {filteredProducts.map(product => {
              return <ProductCard key={product.id} product={product} />;
            })}
          </section>
        ) : (
          <EmptyProductsState filtered={products.length > 0} />
        )}
      </div>
    </main>
  );
}

function ProductCard({ product }: { product: ClientProductCatalogueItem }) {
  const typeLabel = getTypeLabel(String(product.type));

  const accessLabel = getAccessLabel(String(product.type));

  const configurationLabel = getConfigurationLabel(product.variantCount);

  const outOfStock = product.availability.status === 'OUT_OF_STOCK';

  const hasComparePrice = product.compareAtPrice !== null && product.compareAtPrice > product.startingPrice;

  return (
    <Link
      href={`/dashboard/products/${product.slug}`}
      className="group flex min-h-[500px] min-w-0 flex-col overflow-hidden rounded-[22px] border border-border bg-background transition-[border-color,transform] duration-200 hover:-translate-y-0.5 hover:border-foreground/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-theme-accent/40">
      <div className="flex min-h-16 items-center justify-between gap-3 border-b border-border bg-surface-raised px-4 py-3.5">
        <div className="flex min-w-0 items-center gap-3">
          <div className="flex size-8 shrink-0 items-center justify-center rounded-lg border border-border bg-background text-muted">
            <ProductTypeIcon type={String(product.type)} />
          </div>

          <div className="min-w-0">
            <p className="text-[9px] font-semibold uppercase tracking-[0.1em] text-foreground">{typeLabel}</p>

            <p className="mt-0.5 truncate text-[8px] text-muted">
              {product.category?.name ?? 'Rcentz product'}
            </p>
          </div>
        </div>

        <ProductStatus label={product.availability.label} outOfStock={outOfStock} />
      </div>

      <div className="relative h-48 overflow-hidden border-b border-border bg-surface-muted/30">
        {product.image ? (
          <img
            src={product.image.url}
            alt={product.image.alt ?? `${product.name} product image`}
            className="size-full object-cover transition-transform duration-300 group-hover:scale-[1.02]"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="flex size-12 items-center justify-center rounded-2xl border border-border bg-background">
              <ImageIcon aria-hidden="true" className="size-5 text-muted" />
            </div>
          </div>
        )}

        {product.featured ? (
          <div className="absolute left-3 top-3">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-black/50 px-2.5 py-1 text-[8px] font-semibold text-white backdrop-blur-md">
              <Sparkles aria-hidden="true" className="size-3" />
              Featured
            </span>
          </div>
        ) : null}
      </div>

      <div className="flex flex-1 flex-col p-5">
        <div>
          <h2 className="text-[15px] font-semibold tracking-[-0.025em] text-foreground">{product.name}</h2>

          <p className="mt-2 line-clamp-3 text-[10px] leading-5 text-muted">
            {product.shortDescription ?? 'Explore this Rcentz product and its available configurations.'}
          </p>
        </div>

        <div className="mt-5 rounded-xl border border-border bg-surface px-4 py-3.5">
          <p className="text-[8px] font-semibold uppercase tracking-[0.1em] text-muted">
            {product.hasPriceRange ? 'Price range' : 'Price'}
          </p>

          {product.hasPriceRange ? (
            <div className="mt-1.5">
              <p className="text-lg font-semibold tracking-[-0.04em] text-foreground">
                {formatMoney(product.startingPrice, product.currency)}
                {' – '}
                {formatMoney(product.endingPrice, product.currency)}
              </p>

              <p className="mt-1 text-[9px] text-muted">Depends on selected configuration</p>
            </div>
          ) : (
            <div className="mt-1.5 flex flex-wrap items-baseline gap-2">
              <p className="text-lg font-semibold tracking-[-0.04em] text-foreground">
                {formatMoney(product.startingPrice, product.currency)}
              </p>

              {hasComparePrice ? (
                <span className="text-[9px] text-muted line-through">
                  {formatMoney(product.compareAtPrice!, product.currency)}
                </span>
              ) : null}
            </div>
          )}
        </div>

        <div className="mt-3 grid grid-cols-2 gap-2">
          <ProductInfo label="Access" value={accessLabel} />

          <ProductInfo label="Configuration" value={configurationLabel} />
        </div>

        <div className="mt-4 border-t border-border pt-4">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-[8px] uppercase tracking-[0.08em] text-muted">Availability</p>

              <p className="mt-1 text-[10px] font-medium text-foreground">{product.availability.label}</p>
            </div>

            <div className="text-right">
              <p className="text-[8px] uppercase tracking-[0.08em] text-muted">Product type</p>

              <p className="mt-1 text-[10px] font-medium text-foreground">{typeLabel}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="flex min-h-14 items-center justify-between gap-4 border-t border-border bg-surface-muted/40 px-5 py-3">
        <div className="flex min-w-0 items-center gap-2">
          <span
            className={
              outOfStock
                ? 'size-1.5 shrink-0 rounded-full bg-rose-500'
                : 'size-1.5 shrink-0 rounded-full bg-theme-accent'
            }
          />

          <span className="truncate text-[9px] text-muted">
            {product.featured ? 'Featured Rcentz product' : accessLabel}
          </span>
        </div>

        <span className="inline-flex shrink-0 items-center gap-1.5 text-[10px] font-semibold text-theme-accent">
          Explore
          <ArrowUpRight
            aria-hidden="true"
            className="size-3 transition-transform duration-150 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
          />
        </span>
      </div>
    </Link>
  );
}

function ProductStatus({ label, outOfStock }: { label: string; outOfStock: boolean }) {
  return (
    <span className="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-border bg-background px-2.5 py-1">
      <span
        className={outOfStock ? 'size-1.5 rounded-full bg-rose-500' : 'size-1.5 rounded-full bg-theme-accent'}
      />

      <span className="text-[8px] font-semibold text-foreground">{label}</span>
    </span>
  );
}

function ProductInfo({ label, value }: { label: string; value: string }) {
  return (
    <div className="min-w-0 rounded-lg border border-border bg-surface px-3 py-2.5">
      <p className="text-[8px] uppercase tracking-[0.08em] text-muted">{label}</p>

      <p className="mt-1 truncate text-[9px] font-medium text-foreground">{value}</p>
    </div>
  );
}

function EmptyProductsState({ filtered }: { filtered: boolean }) {
  return (
    <section className="overflow-hidden rounded-[22px] border border-border bg-background">
      <div className="border-b border-border bg-surface-raised px-5 py-4">
        <p className="text-xs font-semibold text-foreground">Product library</p>
      </div>

      <div className="flex min-h-[360px] items-center justify-center px-6 text-center">
        <div>
          <div className="mx-auto flex size-12 items-center justify-center rounded-2xl border border-border bg-surface">
            <PackageSearch aria-hidden="true" className="size-5 text-theme-accent" />
          </div>

          <h2 className="mt-4 text-sm font-semibold text-foreground">
            {filtered ? 'No products in this collection' : 'Product library is being prepared'}
          </h2>

          <p className="mx-auto mt-2 max-w-sm text-[10px] leading-5 text-muted">
            {filtered
              ? 'Try another product type to continue exploring the Rcentz catalogue.'
              : 'Active Rcentz software, physical products and bundles will appear here.'}
          </p>
        </div>
      </div>

      <div className="border-t border-border bg-surface-muted/40 px-5 py-3">
        <p className="text-[9px] text-muted">Rcentz products and solutions</p>
      </div>
    </section>
  );
}
