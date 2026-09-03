'use client';

import Link from 'next/link';

import type { LucideIcon } from 'lucide-react';

import {
  ArrowRight,
  BarChart3,
  Boxes,
  Check,
  CreditCard,
  Database,
  FileText,
  Globe2,
  LayoutDashboard,
  MessageSquare,
  PackageCheck,
  PanelsTopLeft,
  ShoppingBag,
  ShoppingCart,
  Users,
  Workflow
} from 'lucide-react';

import { useEffect, useMemo, useState } from 'react';

import type { HomepageData } from '@/features/home/server/get-homepage-data';

type HomePricingProps = {
  services: HomepageData['pricingServices'];
};

type FlowStep = {
  label: string;
  description: string;
  icon: LucideIcon;
};

type PricingPresentation = {
  label: string;
  headline: string;
  points: readonly string[];
  flow: readonly FlowStep[];
};

const presentation: Record<string, PricingPresentation> = {
  'business-website-development': {
    label: 'Web presence',

    headline: 'Build a business experience people can trust.',

    points: ['Responsive business website', 'Service and enquiry journeys', 'Performance-ready foundation'],

    flow: [
      {
        label: 'Business',
        description: 'Purpose, services and content.',
        icon: FileText
      },
      {
        label: 'Experience',
        description: 'Responsive pages and navigation.',
        icon: PanelsTopLeft
      },
      {
        label: 'Enquiries',
        description: 'Visitor actions become opportunities.',
        icon: MessageSquare
      },
      {
        label: 'Growth',
        description: 'A foundation ready to expand.',
        icon: Globe2
      }
    ]
  },

  'ecommerce-store-development': {
    label: 'Commerce',

    headline: 'Turn products into a connected buying journey.',

    points: [
      'Product discovery and catalogue',
      'Cart and checkout foundation',
      'Payment and order workflows'
    ],

    flow: [
      {
        label: 'Products',
        description: 'Catalogue and discovery.',
        icon: ShoppingBag
      },
      {
        label: 'Cart',
        description: 'Intent becomes an order.',
        icon: ShoppingCart
      },
      {
        label: 'Payment',
        description: 'Secure payment integration.',
        icon: CreditCard
      },
      {
        label: 'Fulfilment',
        description: 'Orders continue into operations.',
        icon: PackageCheck
      }
    ]
  },

  'business-management-system': {
    label: 'Business system',

    headline: 'Bring operations into one working environment.',

    points: [
      'Custom operational workflows',
      'Users, records and permissions',
      'Dashboards and structured data'
    ],

    flow: [
      {
        label: 'Users',
        description: 'People enter through real roles.',
        icon: Users
      },
      {
        label: 'Workflow',
        description: 'Operations move through defined steps.',
        icon: Workflow
      },
      {
        label: 'Data',
        description: 'Activity becomes structured records.',
        icon: Database
      },
      {
        label: 'Dashboard',
        description: 'Information becomes usable insight.',
        icon: LayoutDashboard
      }
    ]
  }
};

function formatNaira(value: number) {
  return new Intl.NumberFormat('en-NG', {
    style: 'currency',
    currency: 'NGN',
    maximumFractionDigits: 0
  }).format(value);
}

function formatUsd(value: number) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0
  }).format(value);
}

export function HomePricing({ services }: HomePricingProps) {
  const availableServices = useMemo(
    () => services.filter(service => Boolean(presentation[service.slug])),
    [services]
  );

  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (availableServices.length <= 1) {
      return;
    }

    const media = window.matchMedia('(prefers-reduced-motion: reduce)');

    if (media.matches) {
      return;
    }

    const delay = 10500 + Math.floor(Math.random() * 4500);

    const timeout = window.setTimeout(() => {
      setActiveIndex(current => (current + 1) % availableServices.length);
    }, delay);

    return () => {
      window.clearTimeout(timeout);
    };
  }, [activeIndex, availableServices.length]);

  if (availableServices.length === 0) {
    return null;
  }

  const service = availableServices[activeIndex];

  const config = presentation[service.slug];

  const ngn = service.prices.find(price => price.currency === 'NGN');

  const usd = service.prices.find(price => price.currency === 'USD');

  return (
    <section className={['rcentz-section', 'border-t', 'border-border', 'py-20', 'sm:py-24'].join(' ')}>
      <div className="max-w-4xl">
        <p className={['font-mono', 'text-[10px]', 'uppercase', 'tracking-[0.2em]', 'text-muted'].join(' ')}>
          Starting points
        </p>

        <h2
          className={[
            'mt-4',

            'text-3xl',
            'font-semibold',

            'tracking-[-0.045em]',

            'sm:text-4xl',
            'lg:text-5xl'
          ].join(' ')}>
          Start with the system you need today.
          <span className="text-muted"> Leave room for what comes next.</span>
        </h2>

        <p className={['mt-6', 'max-w-2xl', 'text-sm', 'leading-7', 'text-muted', 'sm:text-base'].join(' ')}>
          Real entry pricing from the Rcentz service catalogue. Scope expands according to integrations,
          workflows, content and operational complexity.
        </p>
      </div>

      {/* SERVICE SELECTOR */}

      <div className={['mt-10', 'flex', 'gap-2', 'overflow-x-auto', 'pb-1'].join(' ')}>
        {availableServices.map((item, index) => {
          const itemConfig = presentation[item.slug];

          const active = index === activeIndex;

          return (
            <button
              key={item.id}
              type="button"
              onClick={() => setActiveIndex(index)}
              className={[
                'relative',

                'h-10',

                'shrink-0',

                'overflow-hidden',

                'rounded-full',

                'border',

                'px-4',

                'text-[12px]',
                'font-medium',

                'transition-[background-color,border-color,color]',

                'duration-300',

                active
                  ? ['border-border-strong', 'bg-background/75', 'text-foreground'].join(' ')
                  : [
                      'border-border/55',
                      'bg-background/25',
                      'text-muted',
                      'hover:border-border',
                      'hover:bg-background/48',
                      'hover:text-foreground'
                    ].join(' ')
              ].join(' ')}>
              {itemConfig.label}

              {active ? (
                <span
                  aria-hidden="true"
                  className={[
                    'absolute',
                    'bottom-0',
                    'left-1/2',

                    'h-px',
                    'w-8',

                    '-translate-x-1/2',

                    'bg-[var(--theme-accent)]'
                  ].join(' ')}
                />
              ) : null}
            </button>
          );
        })}
      </div>

      {/* ===================================================
          PROJECT START ENGINE
          =================================================== */}

      <div
        className={[
          'relative',

          'mt-5',

          'overflow-hidden',

          'rounded-[32px]',

          'border',
          'border-border',

          'bg-background/48',

          'backdrop-blur-xl'
        ].join(' ')}>
        <div
          aria-hidden="true"
          className={[
            'pointer-events-none',

            'absolute',

            'right-[-120px]',
            'top-[-160px]',

            'size-[420px]',

            'rounded-full',

            'bg-theme-accent-faint',

            'opacity-70',

            'blur-[95px]'
          ].join(' ')}
        />

        <div className={['relative', 'z-10', 'grid', 'lg:grid-cols-[0.9fr_1.1fr]'].join(' ')}>
          {/* COMMERCIAL SIDE */}

          <div
            className={[
              'flex',
              'flex-col',

              'border-b',
              'border-border',

              'p-6',

              'sm:p-8',
              'lg:border-b-0',
              'lg:border-r',
              'lg:p-10'
            ].join(' ')}>
            <p
              className={['font-mono', 'text-[9px]', 'uppercase', 'tracking-[0.18em]', 'text-muted'].join(
                ' '
              )}>
              {config.label}
            </p>

            <h3
              className={[
                'mt-4',

                'max-w-xl',

                'text-2xl',
                'font-semibold',

                'tracking-[-0.045em]',

                'sm:text-3xl'
              ].join(' ')}>
              {config.headline}
            </h3>

            <p className={['mt-5', 'max-w-lg', 'text-sm', 'leading-7', 'text-muted'].join(' ')}>
              {service.shortDescription}
            </p>

            <div className="mt-8">
              <p
                className={['font-mono', 'text-[9px]', 'uppercase', 'tracking-[0.17em]', 'text-muted'].join(
                  ' '
                )}>
                Starting from
              </p>

              {ngn ? (
                <p
                  className={['mt-2', 'text-4xl', 'font-semibold', 'tracking-[-0.06em]', 'sm:text-5xl'].join(
                    ' '
                  )}>
                  {formatNaira(ngn.priceFrom)}
                </p>
              ) : null}

              {usd ? (
                <p className={['mt-2', 'text-[12px]', 'text-muted'].join(' ')}>
                  International projects from{' '}
                  <span className="font-medium text-foreground">{formatUsd(usd.priceFrom)}</span>
                </p>
              ) : null}
            </div>

            <div className={['mt-8', 'space-y-3'].join(' ')}>
              {config.points.map(point => (
                <div key={point} className={['flex', 'items-start', 'gap-3'].join(' ')}>
                  <span
                    className={[
                      'mt-0.5',

                      'flex',
                      'size-5',

                      'shrink-0',

                      'items-center',
                      'justify-center',

                      'rounded-full',

                      'border',
                      'border-[var(--theme-accent)]/25',

                      'bg-theme-accent-faint'
                    ].join(' ')}>
                    <Check
                      aria-hidden="true"
                      className={['size-3', 'text-[var(--theme-accent)]'].join(' ')}
                    />
                  </span>

                  <p className={['text-[12px]', 'leading-5', 'text-foreground/78'].join(' ')}>{point}</p>
                </div>
              ))}
            </div>

            <div className="mt-auto pt-9">
              <Link
                href="/services"
                className={[
                  'inline-flex',
                  'h-10',

                  'items-center',
                  'gap-2',

                  'rounded-full',

                  'border',
                  'border-primary',

                  'bg-primary',

                  'px-4',

                  'text-[12px]',
                  'font-medium',
                  'text-primary-foreground',

                  'transition-[opacity,transform]',

                  'hover:opacity-85',
                  'active:scale-[0.98]'
                ].join(' ')}>
                Explore this service
                <ArrowRight aria-hidden="true" className="size-3.5" />
              </Link>
            </div>
          </div>

          {/* SYSTEM PREVIEW */}

          <div
            className={['relative', 'min-h-[500px]', 'overflow-hidden', 'p-6', 'sm:p-8', 'lg:p-10'].join(
              ' '
            )}>
            {/* GRID */}

            <div
              aria-hidden="true"
              className={[
                'pointer-events-none',

                'absolute',
                'inset-0',

                'opacity-[0.24]',

                '[background-image:linear-gradient(to_right,var(--border)_1px,transparent_1px),linear-gradient(to_bottom,var(--border)_1px,transparent_1px)]',

                '[background-size:32px_32px]'
              ].join(' ')}
            />

            <div className={['relative', 'z-10'].join(' ')}>
              <div className={['flex', 'items-center', 'justify-between', 'gap-4'].join(' ')}>
                <div>
                  <p
                    className={[
                      'font-mono',
                      'text-[9px]',
                      'uppercase',
                      'tracking-[0.17em]',
                      'text-muted'
                    ].join(' ')}>
                    Starting architecture
                  </p>

                  <p className={['mt-2', 'text-sm', 'font-medium'].join(' ')}>
                    How the system begins to move.
                  </p>
                </div>

                <span
                  className={[
                    'inline-flex',
                    'items-center',
                    'gap-2',

                    'rounded-full',

                    'border',
                    'border-border',

                    'bg-background/60',

                    'px-3',
                    'py-1.5'
                  ].join(' ')}>
                  <span className={['relative', 'flex', 'size-1.5'].join(' ')}>
                    <span
                      className={[
                        'absolute',
                        'inline-flex',
                        'size-full',

                        'animate-ping',

                        'rounded-full',

                        'bg-[var(--theme-accent)]',

                        'opacity-35'
                      ].join(' ')}
                    />

                    <span
                      className={[
                        'relative',
                        'inline-flex',
                        'size-1.5',

                        'rounded-full',

                        'bg-[var(--theme-accent)]'
                      ].join(' ')}
                    />
                  </span>

                  <span
                    className={[
                      'font-mono',
                      'text-[8px]',
                      'uppercase',
                      'tracking-[0.14em]',
                      'text-muted'
                    ].join(' ')}>
                    Live preview
                  </span>
                </span>
              </div>

              <div className={['relative', 'mt-10', 'pl-10'].join(' ')}>
                {/* SYSTEM RAIL */}

                <div
                  aria-hidden="true"
                  className={['absolute', 'bottom-6', 'left-[15px]', 'top-6', 'w-px', 'bg-border'].join(' ')}
                />

                <span
                  aria-hidden="true"
                  className={[
                    'rcentz-pricing-signal',

                    'absolute',

                    'left-[11px]',
                    'top-5',

                    'size-[9px]',

                    'rounded-full',

                    'border-2',
                    'border-background',

                    'bg-[var(--theme-accent)]',

                    'shadow-[0_0_20px_var(--theme-accent)]'
                  ].join(' ')}
                />

                <div className="space-y-4">
                  {config.flow.map((step, index) => {
                    const Icon = step.icon;

                    return (
                      <article
                        key={step.label}
                        style={{
                          animationDelay: `${index * 1.15}s`
                        }}
                        className={[
                          'rcentz-pricing-node',

                          'group',

                          'relative',

                          'rounded-2xl',

                          'border',
                          'border-border',

                          'bg-background/72',

                          'p-4',

                          'backdrop-blur-xl',

                          'transition-[background-color,border-color,transform]',

                          'hover:translate-x-1',
                          'hover:border-border-strong',
                          'hover:bg-background/92'
                        ].join(' ')}>
                        <span
                          aria-hidden="true"
                          className={[
                            'absolute',

                            'left-[-32px]',
                            'top-1/2',

                            'size-2',

                            '-translate-y-1/2',

                            'rounded-full',

                            'border',
                            'border-background',

                            'bg-border-strong'
                          ].join(' ')}
                        />

                        <div className={['flex', 'items-start', 'gap-3'].join(' ')}>
                          <span
                            className={[
                              'flex',
                              'size-9',

                              'shrink-0',

                              'items-center',
                              'justify-center',

                              'rounded-xl',

                              'border',
                              'border-border',

                              'bg-background/65',

                              'text-muted',

                              'transition-colors',

                              'group-hover:text-[var(--theme-accent)]'
                            ].join(' ')}>
                            <Icon aria-hidden="true" className="size-4" />
                          </span>

                          <div>
                            <p className={['text-[13px]', 'font-medium'].join(' ')}>{step.label}</p>

                            <p className={['mt-1', 'text-[11px]', 'leading-5', 'text-muted'].join(' ')}>
                              {step.description}
                            </p>
                          </div>
                        </div>
                      </article>
                    );
                  })}
                </div>
              </div>

              {/* MINI SYSTEM STATUS */}

              <div
                className={[
                  'mt-8',

                  'grid',
                  'grid-cols-3',

                  'overflow-hidden',

                  'rounded-2xl',

                  'border',
                  'border-border',

                  'bg-border'
                ].join(' ')}>
                <div className="bg-background/85 p-3">
                  <Boxes aria-hidden="true" className="size-3.5 text-muted" />

                  <p className="mt-2 text-[11px] font-medium">Modular</p>
                </div>

                <div className="bg-background/85 p-3">
                  <BarChart3 aria-hidden="true" className="size-3.5 text-muted" />

                  <p className="mt-2 text-[11px] font-medium">Measurable</p>
                </div>

                <div className="bg-background/85 p-3">
                  <Workflow aria-hidden="true" className="size-3.5 text-muted" />

                  <p className="mt-2 text-[11px] font-medium">Connected</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <p className={['mt-8', 'max-w-2xl', 'text-[11px]', 'leading-6', 'text-muted'].join(' ')}>
        Starting prices are guidance, not fixed quotes. Final project cost reflects actual scope,
        integrations, workflows, data requirements and delivery complexity.
      </p>

      <style>{`
        @keyframes rcentz-pricing-signal {
          0% {
            top: 20px;
            opacity: 0;
          }

          8% {
            opacity: 1;
          }

          82% {
            opacity: 1;
          }

          100% {
            top: calc(100% - 28px);
            opacity: 0;
          }
        }

        @keyframes rcentz-pricing-node {
          0%,
          72%,
          100% {
            border-color: var(--border);
          }

          78% {
            border-color:
              color-mix(
                in srgb,
                var(--theme-accent)
                45%,
                var(--border)
              );
          }
        }

        .rcentz-pricing-signal {
          animation:
            rcentz-pricing-signal
            7.5s
            cubic-bezier(
              0.22,
              1,
              0.36,
              1
            )
            infinite;
        }

        .rcentz-pricing-node {
          animation:
            rcentz-pricing-node
            7.5s
            ease
            infinite;
        }

        @media (prefers-reduced-motion: reduce) {
          .rcentz-pricing-signal,
          .rcentz-pricing-node {
            animation: none;
          }
        }
      `}</style>
    </section>
  );
}
