import Link from 'next/link';

import type { LucideIcon } from 'lucide-react';

import {
  ArrowUpRight,
  BadgeCheck,
  Blocks,
  BriefcaseBusiness,
  ChartNoAxesCombined,
  Code2,
  CreditCard,
  Database,
  Gamepad2,
  Globe2,
  Landmark,
  Layers3,
  Lightbulb,
  MapPin,
  MonitorSmartphone,
  Package,
  PanelsTopLeft,
  RefreshCw,
  Route,
  ShieldCheck,
  ShoppingBag,
  Smartphone,
  Sparkles,
  TabletSmartphone,
  Truck,
  WalletCards,
  Workflow,
  Wrench
} from 'lucide-react';

import { getTranslations } from 'next-intl/server';

import type { ServiceCardSummary } from '../../server/get-service-categories';

type ServiceRichCardProps = {
  service: ServiceCardSummary;
  categoryName: string;
  index: number;
};

type CategoryVisual = {
  primary: LucideIcon;
  secondary: LucideIcon;
  tertiary: LucideIcon;
  labelKey: string;
};

const typeIcons: Record<string, LucideIcon> = {
  WEBSITE: Globe2,
  WEB_APP: Code2,
  MOBILE_APP: Smartphone,
  SAAS: Layers3,
  ECOMMERCE: ShoppingBag,
  MAINTENANCE: RefreshCw,
  CONSULTING: BriefcaseBusiness
};

const categoryVisuals: Record<string, CategoryVisual> = {
  'Web Development': {
    primary: Globe2,
    secondary: Code2,
    tertiary: PanelsTopLeft,
    labelKey: 'webExperience'
  },

  WordPress: {
    primary: PanelsTopLeft,
    secondary: Globe2,
    tertiary: Blocks,
    labelKey: 'contentPlatform'
  },

  'Mobile & Adaptive Experiences': {
    primary: Smartphone,
    secondary: TabletSmartphone,
    tertiary: MonitorSmartphone,
    labelKey: 'adaptiveExperience'
  },

  'Business Systems': {
    primary: Workflow,
    secondary: Database,
    tertiary: ShieldCheck,
    labelKey: 'operationsSystem'
  },

  'E-commerce': {
    primary: ShoppingBag,
    secondary: CreditCard,
    tertiary: Package,
    labelKey: 'commerceSystem'
  },

  'Financial & Regulated Platforms': {
    primary: Landmark,
    secondary: WalletCards,
    tertiary: ChartNoAxesCombined,
    labelKey: 'financialPlatform'
  },

  'Logistics & Tracking Systems': {
    primary: Truck,
    secondary: Route,
    tertiary: MapPin,
    labelKey: 'trackingSystem'
  },

  'Gaming & Interactive Platforms': {
    primary: Gamepad2,
    secondary: WalletCards,
    tertiary: Sparkles,
    labelKey: 'interactivePlatform'
  },

  'Maintenance & Modernization': {
    primary: Wrench,
    secondary: RefreshCw,
    tertiary: ShieldCheck,
    labelKey: 'modernization'
  },

  'Technical Consulting': {
    primary: Lightbulb,
    secondary: Layers3,
    tertiary: Workflow,
    labelKey: 'technicalDirection'
  }
};

const categoryTechnologies: Record<string, string[]> = {
  'Web Development': ['Next.js', 'React', 'TypeScript'],

  WordPress: ['WordPress', 'Next.js', 'Cloudflare'],

  'Mobile & Adaptive Experiences': ['React', 'Next.js', 'TypeScript'],

  'Business Systems': ['Next.js', 'Prisma', 'PostgreSQL'],

  'E-commerce': ['Next.js', 'PostgreSQL', 'Paystack'],

  'Financial & Regulated Platforms': ['Next.js', 'PostgreSQL', 'Prisma'],

  'Logistics & Tracking Systems': ['Next.js', 'PostgreSQL', 'APIs'],

  'Gaming & Interactive Platforms': ['Next.js', 'PostgreSQL', 'APIs'],

  'Maintenance & Modernization': ['Next.js', 'TypeScript', 'Cloudflare'],

  'Technical Consulting': ['Next.js', 'Prisma', 'PostgreSQL']
};

function humanize(value: string) {
  return value
    .toLowerCase()
    .split('_')
    .map(part => part.charAt(0).toUpperCase() + part.slice(1))
    .join(' ');
}

export async function ServiceRichCard({ service, categoryName, index }: ServiceRichCardProps) {
  const t = await getTranslations('ServiceRichCard');

  const TypeIcon = typeIcons[service.type] ?? MonitorSmartphone;

  const visual = categoryVisuals[categoryName] ?? {
    primary: TypeIcon,
    secondary: Layers3,
    tertiary: Sparkles,
    labelKey: 'digitalSolution'
  };

  const technologies = categoryTechnologies[categoryName] ?? ['Next.js', 'TypeScript', 'PostgreSQL'];

  const PrimaryVisual = visual.primary;
  const SecondaryVisual = visual.secondary;
  const TertiaryVisual = visual.tertiary;

  const serviceTypeKey = service.type.toLowerCase();

  return (
    <article className="group relative flex h-[500px] w-[326px] shrink-0 snap-start flex-col overflow-hidden rounded-[30px] border border-border bg-background shadow-[0_18px_55px_rgba(0,0,0,0.045)] transition-[transform,border-color,box-shadow] duration-300 hover:-translate-y-1.5 hover:border-theme-accent/30 hover:shadow-[0_26px_75px_rgba(0,0,0,0.085)] sm:w-[385px]">
      {/* =========================================
          CATEGORY ILLUSTRATION
          ========================================= */}

      <div className="relative h-[180px] shrink-0 overflow-hidden border-b border-border bg-surface-muted/20">
        <div
          aria-hidden="true"
          className="absolute -right-16 -top-20 size-56 rounded-full bg-theme-accent/10 blur-3xl transition-transform duration-700 group-hover:scale-125"
        />

        <div
          aria-hidden="true"
          className="absolute -bottom-20 -left-10 size-48 rounded-full bg-foreground/[0.035] blur-3xl"
        />

        <div
          aria-hidden="true"
          className="absolute inset-0 opacity-[0.18]"
          style={{
            backgroundImage: `
              linear-gradient(to right, currentColor 1px, transparent 1px),
              linear-gradient(to bottom, currentColor 1px, transparent 1px)
            `,
            backgroundSize: '34px 34px'
          }}
        />

        <div className="absolute left-5 top-5 z-10">
          <span className="font-mono text-[8px] uppercase tracking-[0.14em] text-muted">
            {t('serviceIndex', {
              number: String(index + 1).padStart(2, '0')
            })}
          </span>
        </div>

        {service.featured ? (
          <div className="absolute right-5 top-5 z-10">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-theme-accent/15 bg-background/80 px-2.5 py-1.5 font-mono text-[6px] uppercase tracking-[0.11em] text-theme-accent backdrop-blur">
              <BadgeCheck className="size-3" />
              {t('featured')}
            </span>
          </div>
        ) : null}

        <div className="absolute inset-x-5 bottom-5 top-12">
          <div className="relative h-full">
            <div className="absolute bottom-0 left-0 flex h-[92px] w-[126px] items-center justify-center rounded-[24px] border border-theme-accent/15 bg-background/75 shadow-[0_18px_45px_rgba(0,0,0,0.06)] backdrop-blur">
              <PrimaryVisual className="size-10 text-theme-accent" />
            </div>

            <div className="absolute bottom-5 left-[108px] flex size-14 items-center justify-center rounded-[18px] border border-border bg-background shadow-sm transition-transform duration-500 group-hover:-translate-y-1 group-hover:translate-x-1">
              <SecondaryVisual className="size-5 text-foreground/65" />
            </div>

            <div className="absolute bottom-[66px] left-[142px] flex size-11 items-center justify-center rounded-[15px] border border-border bg-background shadow-sm transition-transform duration-500 group-hover:-translate-y-1">
              <TertiaryVisual className="size-4 text-theme-accent" />
            </div>

            <div className="absolute bottom-1 right-0 max-w-[118px] text-right">
              <p className="font-mono text-[6px] uppercase tracking-[0.12em] text-theme-accent">
                {t('categorySystem')}
              </p>

              <p className="mt-1 text-[10px] font-medium leading-4 text-foreground">
                {t(`visualLabels.${visual.labelKey}`)}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* =========================================
          SERVICE CONTENT
          ========================================= */}

      <div className="flex min-h-0 flex-1 flex-col p-5 sm:p-6">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="font-mono text-[7px] uppercase tracking-[0.13em] text-theme-accent">
              {categoryName}
            </p>

            <h3 className="mt-2 max-w-[310px] text-[20px] font-semibold leading-[1.08] tracking-[-0.04em] text-foreground sm:text-[22px]">
              {service.name}
            </h3>
          </div>

          <div className="flex size-9 shrink-0 items-center justify-center rounded-[13px] border border-border bg-surface-muted/25">
            <TypeIcon className="size-4 text-muted" />
          </div>
        </div>

        {service.shortDescription ? (
          <p className="mt-4 line-clamp-3 text-[12px] leading-[1.75] text-muted sm:text-[13px]">
            {service.shortDescription}
          </p>
        ) : null}

        <div className="mt-5">
          <div className="flex items-center justify-between gap-3">
            <p className="font-mono text-[6px] uppercase tracking-[0.13em] text-muted">
              {t('typicalTechnology')}
            </p>

            <span className="font-mono text-[6px] uppercase tracking-[0.1em] text-theme-accent">
              {t('premiumStack')}
            </span>
          </div>

          <div className="mt-2.5 flex flex-wrap gap-1.5">
            {technologies.map(technology => (
              <span
                key={technology}
                className="rounded-full border border-border bg-surface-muted/25 px-2.5 py-1.5 text-[8px] font-medium text-foreground">
                {technology}
              </span>
            ))}
          </div>
        </div>

        <div className="mt-auto border-t border-border pt-4">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="font-mono text-[6px] uppercase tracking-[0.12em] text-muted">
                {t('serviceType')}
              </p>

              <p className="mt-1 text-[9px] font-medium text-foreground">
                {t.has(`serviceTypes.${serviceTypeKey}`)
                  ? t(`serviceTypes.${serviceTypeKey}`)
                  : humanize(service.type)}
              </p>
            </div>

            <Link
              href={`/services/${service.slug}`}
              className="group/link inline-flex h-10 items-center justify-center gap-2 rounded-full bg-primary px-4 text-[9px] font-medium text-primary-foreground transition-[opacity,transform] duration-200 hover:opacity-85 active:scale-[0.98]">
              {t('viewMore')}

              <ArrowUpRight className="size-3.5 transition-transform duration-300 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5" />
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
}
