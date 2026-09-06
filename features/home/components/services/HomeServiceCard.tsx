import Link from 'next/link';

import {
  ArrowUpRight,
  Code2,
  Globe2,
  LayoutDashboard,
  MonitorSmartphone,
  RefreshCcw,
  ShoppingBag
} from 'lucide-react';

import { getTranslations } from 'next-intl/server';

import type { HomepageData } from '@/features/home/server/get-homepage-data';

import { ServiceIllustration } from './ServiceIllustration';

const cardIcons = [Globe2, LayoutDashboard, ShoppingBag, MonitorSmartphone, Code2, RefreshCcw] as const;

function formatType(value: string) {
  return value
    .toLowerCase()
    .split('_')
    .map(part => part.charAt(0).toUpperCase() + part.slice(1))
    .join(' ');
}

type HomeServiceCardProps = {
  service: HomepageData['services'][number];
  index: number;
  className?: string;
};

export async function HomeServiceCard({ service, index, className = '' }: HomeServiceCardProps) {
  const t = await getTranslations('HomeServiceCard');

  const Icon = cardIcons[index % cardIcons.length];

  const isTransformation = service.slug === 'wordpress-to-nextjs-migration' || index === 5;

  const category = isTransformation
    ? t('modernization')
    : (service.category?.name ?? formatType(service.type));

  const title = isTransformation ? t('modernizationTitle') : service.name;

  const description = isTransformation ? t('modernizationDescription') : service.shortDescription;

  const categoryHref = service.category?.slug ? `/services#${service.category.slug}` : '/services';

  return (
    <article
      className={[
        'group relative flex h-full flex-col overflow-hidden rounded-[28px] border border-border bg-background/62 backdrop-blur-sm transition-[border-color,background-color,transform] duration-300 hover:-translate-y-0.5 hover:border-border-strong hover:bg-surface-raised/70',
        className
      ].join(' ')}>
      <div className="relative z-10 flex items-start justify-between gap-5 p-6 pb-0 sm:p-7 sm:pb-0">
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <Link
              href={categoryHref}
              className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted transition-colors hover:text-theme-accent">
              {category}
            </Link>

            <span className="size-1 rounded-full bg-border-strong" />

            <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted">
              {String(index + 1).padStart(2, '0')}
            </span>
          </div>

          <h3 className="mt-4 max-w-2xl text-[1.65rem] font-semibold leading-[1.12] tracking-[-0.04em] sm:text-[1.95rem]">
            {title}
          </h3>

          {description ? (
            <p className="mt-4 max-w-2xl text-[15px] leading-7 text-muted sm:text-base">{description}</p>
          ) : null}
        </div>

        <Link
          href={categoryHref}
          aria-label={`Explore ${category}`}
          className="flex size-11 shrink-0 items-center justify-center rounded-xl border border-border bg-surface-muted text-muted transition-[background-color,color,border-color,transform] hover:border-theme-accent/30 hover:bg-secondary hover:text-theme-accent active:scale-[0.97]">
          <Icon aria-hidden="true" className="size-[18px]" />
        </Link>
      </div>

      <div className="mt-5 min-h-0 flex-1 border-t border-border/70">
        <ServiceIllustration service={service} index={index} />
      </div>

      <div className="relative z-10 border-t border-border/70 px-6 py-4 sm:px-7">
        <Link
          href={categoryHref}
          className="inline-flex items-center gap-2 text-[11px] font-medium text-foreground transition-colors hover:text-theme-accent">
          Explore category
          <ArrowUpRight aria-hidden="true" className="size-3.5" />
        </Link>
      </div>
    </article>
  );
}
