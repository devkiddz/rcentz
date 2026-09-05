import Link from 'next/link';

import {
  ArrowRight,
  BriefcaseBusiness,
  Code2,
  Globe2,
  Layers3,
  MonitorSmartphone,
  RefreshCw,
  ShoppingBag,
  Smartphone,
  Sparkles
} from 'lucide-react';

import type { LucideIcon } from 'lucide-react';

import type { ServiceSummary } from '../../server/get-services';

interface ServiceSummaryCardProps {
  service: ServiceSummary;
}

const TYPE_ICONS: Record<string, LucideIcon> = {
  WEBSITE: Globe2,
  WEB_APP: Code2,
  MOBILE_APP: Smartphone,
  SAAS: Layers3,
  ECOMMERCE: ShoppingBag,
  MAINTENANCE: RefreshCw,
  CONSULTING: BriefcaseBusiness
};

export function ServiceSummaryCard({ service }: ServiceSummaryCardProps) {
  const Icon = TYPE_ICONS[service.type] ?? MonitorSmartphone;

  return (
    <article className="group relative flex min-h-[230px] flex-col rounded-[22px] border border-border bg-background p-5 transition-[border-color,box-shadow,transform] duration-300 hover:-translate-y-1 hover:border-theme-accent/25 hover:shadow-[0_18px_50px_rgba(0,0,0,0.07)] sm:min-h-[245px] sm:p-6">
      {/* top */}

      <div className="flex items-start justify-between gap-4">
        <div className="flex size-11 items-center justify-center rounded-[13px] border border-theme-accent/15 bg-theme-accent-soft">
          <Icon className="size-5 text-theme-accent" />
        </div>

        {service.featured ? (
          <span className="inline-flex items-center gap-1 rounded-full border border-theme-accent/15 bg-theme-accent-soft px-2 py-1 font-mono text-[6px] uppercase tracking-[0.1em] text-theme-accent">
            <Sparkles className="size-2.5" />
            Featured
          </span>
        ) : null}
      </div>

      {/* content */}

      <div className="mt-5">
        <h3 className="text-[15px] font-semibold leading-5 tracking-[-0.025em] text-foreground sm:text-[16px]">
          {service.name}
        </h3>

        {service.shortDescription ? (
          <p className="mt-2 max-w-[320px] text-[10px] leading-5 text-muted sm:text-[11px]">
            {service.shortDescription}
          </p>
        ) : null}
      </div>

      {/* metadata */}

      <div className="mt-4 flex flex-wrap gap-1.5">
        {service.category ? (
          <span className="rounded-full border border-border bg-surface-muted/30 px-2.5 py-1 font-mono text-[6px] uppercase tracking-[0.1em] text-muted">
            {service.category.name}
          </span>
        ) : null}

        <span className="rounded-full border border-border bg-surface-muted/30 px-2.5 py-1 font-mono text-[6px] uppercase tracking-[0.1em] text-muted">
          {formatType(service.type)}
        </span>
      </div>

      {/* CTA */}

      <div className="mt-auto pt-5">
        <Link
          href={`/services/${service.slug}`}
          className="group/link inline-flex items-center gap-2 text-[10px] font-semibold text-theme-accent sm:text-[11px]">
          View more
          <ArrowRight className="size-3.5 transition-transform duration-300 group-hover/link:translate-x-1" />
        </Link>
      </div>
    </article>
  );
}

function formatType(value: string) {
  return value
    .toLowerCase()
    .split('_')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}
