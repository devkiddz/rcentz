'use client';

import { useState } from 'react';

import Link from 'next/link';

import {
  ArrowLeft,
  Box,
  Boxes,
  CheckCircle2,
  Download,
  FileArchive,
  ImageIcon,
  Laptop2,
  Package,
  ShieldCheck,
  ShoppingCart,
  Sparkles
} from 'lucide-react';

import type { ClientProduct } from '@/features/client/server/products/get-client-product';

import type { ClientProductOwnership } from '@/features/client/server/products/get-client-product-ownership';

import { ClientProductOwnershipSection } from './ClientProductOwnershipSection';

type ClientProductPageProps = {
  product: ClientProduct;
  ownership: ClientProductOwnership;
};

function formatMoney(value: number, currency: string) {
  return new Intl.NumberFormat('en-NG', {
    style: 'currency',
    currency,
    maximumFractionDigits: 0
  }).format(value);
}

function formatFileSize(bytes: number | null) {
  if (!bytes || bytes <= 0) {
    return null;
  }

  if (bytes < 1024 * 1024) {
    return `${Math.round(bytes / 1024)} KB`;
  }

  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

function getTypeLabel(type: string) {
  switch (type) {
    case 'DIGITAL':
      return 'Software / Digital';

    case 'PHYSICAL':
      return 'Physical Product';

    case 'BUNDLE':
      return 'Product Bundle';

    default:
      return 'Product';
  }
}

function ProductTypeIcon({ type }: { type: string }) {
  const iconClasses = 'size-3.5 text-theme-accent';

  switch (type) {
    case 'DIGITAL':
      return <Laptop2 aria-hidden="true" className={iconClasses} />;

    case 'PHYSICAL':
      return <Box aria-hidden="true" className={iconClasses} />;

    case 'BUNDLE':
      return <Boxes aria-hidden="true" className={iconClasses} />;

    default:
      return <Package aria-hidden="true" className={iconClasses} />;
  }
}

export function ClientProductPage({ product, ownership }: ClientProductPageProps) {
  const [selectedMediaIndex, setSelectedMediaIndex] = useState(0);

  const [selectedVariantId, setSelectedVariantId] = useState<string | null>(
    product.variants.find(variant => variant.isDefault)?.id ?? product.variants[0]?.id ?? null
  );

  const activeMedia = product.media[selectedMediaIndex] ?? product.media[0] ?? null;

  const selectedVariant = product.variants.find(variant => variant.id === selectedVariantId);

  const currentPrice = selectedVariant?.price ?? product.startingPrice;

  const fileSize = formatFileSize(product.digital?.fileSize ?? null);

  function scrollToOwnership() {
    const section = document.getElementById('ownership-section');

    section?.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    });
  }

  return (
    <main className="min-h-screen bg-background px-4 py-6 sm:px-6 sm:py-10 lg:px-8">
      <div className="mx-auto w-full max-w-7xl">
        {/* =================================================
            BACK NAVIGATION
            ================================================= */}

        <nav className="mb-6">
          <Link
            href="/dashboard/products"
            className="inline-flex items-center gap-2 rounded-lg px-3 py-1.5 text-xs font-medium text-muted transition-colors hover:bg-surface hover:text-foreground">
            <ArrowLeft aria-hidden="true" className="size-4" />
            Back to Products
          </Link>
        </nav>

        {/* =================================================
            PRIMARY PRODUCT WORKSPACE
            ================================================= */}

        <section className="grid items-start gap-8 lg:grid-cols-12 lg:gap-12">
          {/* =================================================
              LEFT — STICKY MEDIA GALLERY

              Sticky is intentionally on the whole gallery.
              It remains visible while the right-side product
              information scrolls.

              It releases naturally when this section ends.
              ================================================= */}

          <div
            className="
              min-w-0

              lg:col-span-7
              lg:sticky
              lg:top-20
              lg:z-10
              lg:h-fit
              lg:self-start
            ">
            <div className="space-y-4">
              {/* MAIN MEDIA */}

              <div className="relative overflow-hidden rounded-3xl border border-border bg-surface shadow-sm">
                <div
                  className="
                    relative
                    aspect-[4/3]
                    w-full
                    overflow-hidden
                    bg-surface-muted

                    sm:aspect-[16/10]

                    lg:aspect-[4/3]

                    xl:aspect-[16/10]
                  ">
                  {activeMedia ? (
                    <img
                      src={activeMedia.url}
                      alt={activeMedia.alt ?? `${product.name} product image`}
                      className="size-full object-cover transition-all duration-300"
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center bg-[radial-gradient(ellipse_at_top,var(--theme-accent-faint),transparent_70%)]">
                      <div className="flex size-20 items-center justify-center rounded-3xl border border-border bg-background/80 shadow-sm backdrop-blur-md">
                        <ImageIcon aria-hidden="true" className="size-8 text-muted" />
                      </div>
                    </div>
                  )}

                  {/* MEDIA BADGES */}

                  <div className="absolute left-4 top-4 flex flex-wrap gap-2 sm:left-5 sm:top-5">
                    {product.featured ? (
                      <span className="inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-black/60 px-3.5 py-1.5 text-xs font-medium text-white shadow-lg backdrop-blur-md">
                        <Sparkles aria-hidden="true" className="size-3.5 text-amber-300" />
                        Featured
                      </span>
                    ) : null}

                    {ownership.owned ? (
                      <span className="inline-flex items-center gap-1.5 rounded-full border border-theme-accent/30 bg-theme-accent px-3.5 py-1.5 text-xs font-semibold text-white shadow-md">
                        <CheckCircle2 aria-hidden="true" className="size-3.5" />
                        Owned
                      </span>
                    ) : null}
                  </div>
                </div>
              </div>

              {/* THUMBNAILS */}

              {product.media.length > 1 ? (
                <div className="grid grid-cols-5 gap-3">
                  {product.media.map((image, index) => {
                    const isSelected = selectedMediaIndex === index;

                    return (
                      <button
                        key={image.id}
                        type="button"
                        aria-label={`View ${image.alt ?? product.name}`}
                        aria-pressed={isSelected}
                        onClick={() => setSelectedMediaIndex(index)}
                        className={`group relative aspect-square overflow-hidden rounded-2xl border bg-surface transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-theme-accent/40 ${
                          isSelected
                            ? 'border-theme-accent opacity-100 ring-2 ring-theme-accent/20'
                            : 'border-border opacity-65 hover:opacity-100'
                        }`}>
                        <img
                          src={image.url}
                          alt={image.alt ?? product.name}
                          className="size-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                        />
                      </button>
                    );
                  })}
                </div>
              ) : null}
            </div>
          </div>

          {/* =================================================
              RIGHT — PRODUCT INFORMATION
              ================================================= */}

          <div className="min-w-0 lg:col-span-5">
            <div className="flex flex-col space-y-6">
              {/* TYPE / CATEGORY / STATUS */}

              <div className="flex flex-wrap items-center gap-2">
                <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-surface px-3 py-1.5 text-xs font-medium text-muted">
                  <ProductTypeIcon type={String(product.type)} />

                  {getTypeLabel(String(product.type))}
                </span>

                {product.category ? (
                  <span className="rounded-full border border-border bg-surface px-3 py-1.5 text-xs font-medium text-muted">
                    {product.category.name}
                  </span>
                ) : null}

                <span
                  className={`rounded-full px-3 py-1.5 text-xs font-semibold ${
                    product.availability.status === 'OUT_OF_STOCK'
                      ? 'bg-rose-500/10 text-rose-500'
                      : 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400'
                  }`}>
                  {product.availability.label}
                </span>
              </div>

              {/* TITLE */}

              <div>
                <h1 className="text-3xl font-bold leading-[1.1] tracking-[-0.04em] text-foreground sm:text-4xl">
                  {product.name}
                </h1>

                {product.shortDescription ? (
                  <p className="mt-3 text-[15px] leading-7 text-muted">{product.shortDescription}</p>
                ) : null}
              </div>

              {/* =================================================
                  PRICE / PRIMARY ACTION
                  ================================================= */}

              <div className="space-y-5 rounded-3xl border border-border bg-surface p-5 shadow-sm sm:p-6">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <p className="text-xs font-medium uppercase tracking-wider text-muted">
                      {product.hasPriceRange ? 'Starting from' : 'Price'}
                    </p>

                    <div className="mt-1.5 flex flex-wrap items-baseline gap-3">
                      <span className="text-3xl font-extrabold tracking-[-0.04em] text-foreground">
                        {formatMoney(currentPrice, product.currency)}
                      </span>

                      {product.compareAtPrice && product.compareAtPrice > currentPrice ? (
                        <span className="text-sm font-medium text-muted line-through">
                          {formatMoney(product.compareAtPrice, product.currency)}
                        </span>
                      ) : null}
                    </div>
                  </div>

                  {ownership.owned ? (
                    <span className="inline-flex w-fit items-center gap-1.5 rounded-xl bg-theme-accent-faint px-3 py-2 text-xs font-semibold text-theme-accent">
                      <CheckCircle2 aria-hidden="true" className="size-4" />
                      In Your Library
                    </span>
                  ) : null}
                </div>

                {/* ACTION */}

                <div className="pt-1">
                  {ownership.owned ? (
                    <button
                      type="button"
                      onClick={scrollToOwnership}
                      className="flex w-full items-center justify-center gap-2 rounded-2xl bg-theme-accent px-5 py-3.5 text-sm font-semibold text-white shadow-md transition-all hover:opacity-95 active:scale-[0.99]">
                      <Download aria-hidden="true" className="size-4" />
                      View downloads & access
                    </button>
                  ) : (
                    <button
                      type="button"
                      disabled
                      className="flex w-full cursor-not-allowed items-center justify-center gap-2 rounded-2xl bg-foreground px-5 py-3.5 text-sm font-semibold text-background opacity-70 shadow-md">
                      <ShoppingCart aria-hidden="true" className="size-4" />
                      Purchase flow coming soon
                    </button>
                  )}
                </div>

                <div className="flex items-start gap-2 border-t border-border/60 pt-4 text-xs leading-5 text-muted">
                  <ShieldCheck aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-theme-accent" />

                  <span>Purchases and product access are managed securely through your Rcentz account.</span>
                </div>
              </div>

              {/* =================================================
                  VARIANTS
                  ================================================= */}

              {product.variants.length > 0 ? (
                <div className="space-y-3">
                  <p className="text-xs font-semibold uppercase tracking-wider text-muted">Select Option</p>

                  <div className="grid gap-2">
                    {product.variants.map(variant => {
                      const isSelected = selectedVariantId === variant.id;

                      return (
                        <button
                          key={variant.id}
                          type="button"
                          aria-pressed={isSelected}
                          disabled={!variant.available}
                          onClick={() => setSelectedVariantId(variant.id)}
                          className={`flex items-center justify-between rounded-2xl border p-4 text-left transition-all ${
                            isSelected
                              ? 'border-theme-accent bg-theme-accent-faint/30 ring-1 ring-theme-accent'
                              : 'border-border bg-surface hover:bg-surface-raised'
                          } ${!variant.available ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'}`}>
                          <div className="min-w-0 pr-3">
                            <div className="flex items-center gap-2">
                              <p className="truncate text-sm font-semibold text-foreground">{variant.name}</p>

                              {variant.isDefault ? (
                                <span className="rounded-full bg-surface-muted px-2 py-0.5 text-[10px] font-medium text-muted">
                                  Default
                                </span>
                              ) : null}
                            </div>

                            <p className="mt-1 text-xs text-muted">
                              {variant.available ? 'Available' : 'Unavailable'}
                            </p>
                          </div>

                          <span className="shrink-0 text-sm font-bold text-foreground">
                            {formatMoney(variant.price ?? product.startingPrice, product.currency)}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              ) : null}

              {/* =================================================
                  DIGITAL FILE DETAILS
                  ================================================= */}

              {product.digital ? (
                <div className="space-y-4 rounded-2xl border border-border bg-surface p-5">
                  <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-muted">
                    <FileArchive aria-hidden="true" className="size-4 text-theme-accent" />

                    <span>Digital File Details</span>
                  </div>

                  <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                    <ProductMeta label="Version" value={product.digital.version ?? 'Current'} />

                    <ProductMeta label="Format" value={product.digital.fileType ?? 'Digital'} />

                    {fileSize ? <ProductMeta label="Size" value={fileSize} /> : null}
                  </div>
                </div>
              ) : null}

              {/* =================================================
                  DESCRIPTION
                  ================================================= */}

              {product.description ? (
                <div className="space-y-3 border-t border-border pt-6">
                  <h2 className="text-xs font-semibold uppercase tracking-wider text-muted">
                    About this product
                  </h2>

                  <p className="whitespace-pre-line text-sm leading-7 text-foreground/80">
                    {product.description}
                  </p>
                </div>
              ) : null}

              {/* SKU */}

              {product.sku ? (
                <p className="border-t border-border pt-4 text-xs text-muted">
                  Product SKU: <span className="font-mono font-medium text-foreground">{product.sku}</span>
                </p>
              ) : null}
            </div>
          </div>
        </section>

        {/* =================================================
            OWNERSHIP / DELIVERY
            ================================================= */}

        <div id="ownership-section" className="mt-14 scroll-mt-24 border-t border-border pt-10 sm:mt-16">
          <ClientProductOwnershipSection productType={String(product.type)} ownership={ownership} />
        </div>
      </div>
    </main>
  );
}

function ProductMeta({ label, value }: { label: string; value: string }) {
  return (
    <div className="min-w-0 rounded-xl border border-border/60 bg-surface-muted/50 p-3.5">
      <p className="text-[10px] font-medium uppercase tracking-wider text-muted">{label}</p>

      <p className="mt-1.5 truncate text-xs font-semibold text-foreground">{value}</p>
    </div>
  );
}
