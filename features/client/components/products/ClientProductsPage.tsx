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

function ProductTypeIcon({ type }: { type: string }) {
  switch (type) {
    case 'DIGITAL':
      return <Laptop2 aria-hidden="true" className="size-3" />;

    case 'PHYSICAL':
      return <Box aria-hidden="true" className="size-3" />;

    case 'BUNDLE':
      return <Boxes aria-hidden="true" className="size-3" />;

    default:
      return <Box aria-hidden="true" className="size-3" />;
  }
}

export function ClientProductsPage({ products }: ClientProductsPageProps) {
  const [filter, setFilter] = useState<ProductFilter>('ALL');

  const counts = useMemo(
    () => ({
      all: products.length,

      digital: products.filter(product => product.type === 'DIGITAL').length,

      physical: products.filter(product => product.type === 'PHYSICAL').length,

      bundle: products.filter(product => product.type === 'BUNDLE').length
    }),
    [products]
  );

  const filteredProducts = useMemo(() => {
    if (filter === 'ALL') {
      return products;
    }

    return products.filter(product => product.type === filter);
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
                Software, digital products, physical equipment and curated bundles available across the Rcentz
                ecosystem.
              </p>
            </div>

            <div className="flex items-center gap-2 text-[9px] text-muted">
              <span className="font-semibold text-foreground">{products.length}</span>
              product
              {products.length === 1 ? '' : 's'}
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
                    : 'inline-flex h-8 shrink-0 items-center gap-2 rounded-full border border-border bg-surface px-3 text-[9px] font-medium text-muted transition-colors hover:text-foreground'
                }>
                {item.label}

                <span className={active ? 'text-background/60' : 'text-muted'}>{item.count}</span>
              </button>
            );
          })}
        </section>

        {filteredProducts.length > 0 ? (
          <section aria-label="Products" className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {filteredProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </section>
        ) : (
          <EmptyProductsState filtered={products.length > 0} />
        )}
      </div>
    </main>
  );
}

function ProductCard({ product }: { product: ClientProductCatalogueItem }) {
  const outOfStock = product.availability.status === 'OUT_OF_STOCK';

  return (
    <Link
      href={`/dashboard/products/${product.slug}`}
      className="
        group
        flex
        min-h-[390px]
        min-w-0
        flex-col
        overflow-hidden
        rounded-[22px]
        border
        border-border
        bg-surface

        transition-[border-color,transform]
        duration-200

        hover:-translate-y-0.5
        hover:border-foreground/20

        focus-visible:outline-none
        focus-visible:ring-2
        focus-visible:ring-theme-accent/40
      ">
      <div className="relative h-44 overflow-hidden border-b border-border bg-surface-muted">
        {product.image ? (
          <img
            src={product.image.url}
            alt={product.image.alt ?? `${product.name} product image`}
            className="size-full object-cover transition-transform duration-300 group-hover:scale-[1.02]"
          />
        ) : (
          <>
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,var(--theme-accent-faint),transparent_55%)]" />

            <div className="absolute inset-0 flex items-center justify-center">
              <div className="flex size-12 items-center justify-center rounded-2xl border border-border bg-background/70 backdrop-blur-sm">
                <ImageIcon aria-hidden="true" className="size-5 text-muted" />
              </div>
            </div>
          </>
        )}

        <div className="absolute inset-x-0 top-0 flex items-start justify-between gap-3 p-3.5">
          <div className="flex flex-wrap gap-1.5">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-black/45 px-2.5 py-1 text-[8px] font-semibold text-white backdrop-blur-md">
              <ProductTypeIcon type={String(product.type)} />

              {getTypeLabel(String(product.type))}
            </span>

            {product.featured ? (
              <span className="inline-flex items-center gap-1 rounded-full border border-white/15 bg-black/45 px-2.5 py-1 text-[8px] font-semibold text-white backdrop-blur-md">
                <Sparkles aria-hidden="true" className="size-3" />
                Featured
              </span>
            ) : null}
          </div>

          <span className="flex size-8 shrink-0 items-center justify-center rounded-full border border-white/15 bg-black/45 text-white backdrop-blur-md">
            <ArrowUpRight
              aria-hidden="true"
              className="size-3.5 transition-transform duration-150 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            />
          </span>
        </div>
      </div>

      <div className="flex flex-1 flex-col p-5">
        <div className="min-w-0">
          <p className="text-[9px] font-medium uppercase tracking-[0.11em] text-muted">
            {product.category?.name ?? getTypeLabel(String(product.type))}
          </p>

          <h2 className="mt-1.5 text-[15px] font-semibold tracking-[-0.025em] text-foreground">
            {product.name}
          </h2>

          <p className="mt-2 line-clamp-2 text-[10px] leading-5 text-muted">
            {product.shortDescription ?? 'Explore this Rcentz product.'}
          </p>
        </div>

        <div className="mt-5 border-t border-border pt-4">
          <div className="flex items-end justify-between gap-4">
            <div className="min-w-0">
              <p className="text-[8px] uppercase tracking-[0.1em] text-muted">
                {product.hasPriceRange ? 'Starting from' : 'Price'}
              </p>

              <div className="mt-1 flex flex-wrap items-baseline gap-2">
                <p className="text-lg font-semibold tracking-[-0.04em] text-foreground">
                  {formatMoney(product.startingPrice, product.currency)}
                </p>

                {product.compareAtPrice && product.compareAtPrice > product.startingPrice ? (
                  <span className="text-[9px] text-muted line-through">
                    {formatMoney(product.compareAtPrice, product.currency)}
                  </span>
                ) : null}
              </div>
            </div>

            <span
              className={
                outOfStock
                  ? 'shrink-0 rounded-full bg-rose-500/10 px-2.5 py-1 text-[8px] font-medium text-rose-500'
                  : 'shrink-0 rounded-full bg-theme-accent-faint px-2.5 py-1 text-[8px] font-medium text-theme-accent'
              }>
              {product.availability.label}
            </span>
          </div>
        </div>

        <div className="mt-auto flex items-center justify-between gap-4 pt-5">
          <p className="text-[9px] text-muted">
            {product.variantCount > 0
              ? `${product.variantCount} option${product.variantCount === 1 ? '' : 's'}`
              : 'Standard configuration'}
          </p>

          <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-theme-accent">
            Explore
            <ArrowUpRight aria-hidden="true" className="size-3" />
          </span>
        </div>
      </div>
    </Link>
  );
}

function EmptyProductsState({ filtered }: { filtered: boolean }) {
  return (
    <section className="flex min-h-[420px] items-center justify-center rounded-[22px] border border-dashed border-border bg-surface-muted/10 px-6 text-center">
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
    </section>
  );
}
