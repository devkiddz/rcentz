import { Code2, Globe2, LayoutDashboard, MonitorSmartphone, RefreshCcw, ShoppingBag } from 'lucide-react';

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

export function HomeServiceCard({ service, index, className = '' }: HomeServiceCardProps) {
  const Icon = cardIcons[index % cardIcons.length];

  const isTransformation = service.slug === 'wordpress-to-nextjs-migration' || index === 5;

  const category = isTransformation ? 'Modernization' : (service.category?.name ?? formatType(service.type));

  const title = isTransformation ? 'Modernization & Transformation' : service.name;

  const description = isTransformation
    ? 'Upgrade existing websites, stores and business workflows into faster, smarter and more capable systems.'
    : service.shortDescription;

  return (
    <article
      className={[
        'group relative flex h-full flex-col overflow-hidden rounded-[28px] border border-border',
        'bg-background/62 backdrop-blur-sm',
        'transition-[border-color,background-color,transform] duration-300',
        'hover:-translate-y-0.5 hover:border-border-strong hover:bg-surface-raised/70',
        className
      ].join(' ')}>
      <div className="relative z-10 flex items-start justify-between gap-5 p-6 pb-0 sm:p-7 sm:pb-0">
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <span className="font-mono text-[9px] uppercase tracking-[0.16em] text-muted">{category}</span>

            <span className="size-1 rounded-full bg-border-strong" />

            <span className="font-mono text-[9px] uppercase tracking-[0.16em] text-muted">
              {String(index + 1).padStart(2, '0')}
            </span>
          </div>

          <h3 className="mt-4 max-w-2xl text-2xl font-semibold tracking-[-0.04em] sm:text-[1.75rem]">
            {title}
          </h3>

          {description ? <p className="mt-3 max-w-2xl text-sm leading-6 text-muted">{description}</p> : null}
        </div>

        <div className="flex size-10 shrink-0 items-center justify-center rounded-xl border border-border bg-surface-muted text-muted transition-[background-color,color,border-color] group-hover:border-border-strong group-hover:bg-secondary group-hover:text-foreground">
          <Icon aria-hidden="true" className="size-4" />
        </div>
      </div>

      <div className="mt-4 min-h-0 flex-1 border-t border-border/70">
        <ServiceIllustration service={service} index={index} />
      </div>
    </article>
  );
}
