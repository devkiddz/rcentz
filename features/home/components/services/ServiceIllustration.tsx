'use client';

import Image from 'next/image';

import {
  BarChart3,
  ChartNoAxesCombined,
  CircleCheckBig,
  Code2,
  CreditCard,
  Database,
  PackageCheck,
  ShoppingBag,
  Smartphone,
  UsersRound,
  Workflow
} from 'lucide-react';

import { motion, useReducedMotion } from 'motion/react';

import type { HomepageData } from '@/features/home/server/get-homepage-data';

import { BusinessManagementScene } from './BusinessManagementScene';
import { ModernizationScene } from './modernization/ModernizationScene';

type ServiceIllustrationProps = {
  service: HomepageData['services'][number];

  index: number;
};

function DashboardScene() {
  const reduceMotion = useReducedMotion();

  const bars = [30, 48, 38, 62, 54, 80, 64, 74, 51, 68];

  return (
    <div className="relative min-h-[340px] overflow-hidden">
      <motion.div
        aria-hidden="true"
        className="absolute -bottom-24 left-1/2 h-56 w-[360px] -translate-x-1/2 rounded-full bg-[var(--theme-accent-soft)] blur-3xl"
        animate={
          reduceMotion
            ? undefined
            : {
                opacity: [0.3, 0.74, 0.3],
                scale: [0.94, 1.05, 0.94]
              }
        }
        transition={{
          duration: 6.2,
          repeat: Infinity,
          ease: 'easeInOut'
        }}
      />

      <motion.div
        className="absolute inset-x-[9%] top-[12%] rounded-2xl border border-border bg-background/95 p-4 shadow-2xl"
        animate={
          reduceMotion
            ? undefined
            : {
                y: [0, -4, 0]
              }
        }
        transition={{
          duration: 6.4,
          repeat: Infinity,
          ease: 'easeInOut'
        }}>
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="font-mono text-[9px] uppercase tracking-[0.16em] text-muted">Operations</p>

            <p className="mt-2 text-[15px] font-medium">Business overview</p>
          </div>

          <BarChart3 aria-hidden="true" className="size-[18px] text-muted" />
        </div>

        <div className="mt-4 grid grid-cols-3 gap-2">
          {[
            ['Revenue', '₦8.4m'],
            ['Orders', '382'],
            ['Clients', '64']
          ].map(([label, value]) => (
            <div key={label} className="rounded-xl border border-border bg-surface-muted/35 p-2.5">
              <p className="font-mono text-[7px] uppercase tracking-[0.1em] text-muted">{label}</p>

              <p className="mt-1 text-[13px] font-semibold">{value}</p>
            </div>
          ))}
        </div>

        <div className="mt-3 rounded-xl border border-border bg-surface-muted/55 p-3">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-mono text-[8px] uppercase tracking-[0.14em] text-muted">Live activity</p>

              <p className="mt-1 text-xl font-semibold tracking-[-0.04em]">98.4%</p>
            </div>

            <motion.span
              className="size-2.5 rounded-full bg-[var(--theme-accent)]"
              animate={
                reduceMotion
                  ? undefined
                  : {
                      opacity: [0.35, 1, 0.35]
                    }
              }
              transition={{
                duration: 2,
                repeat: Infinity
              }}
            />
          </div>

          <div className="mt-4 flex h-20 items-end gap-1.5">
            {bars.map((height, barIndex) => (
              <motion.div
                key={`${height}-${barIndex}`}
                className="flex-1 rounded-t-sm bg-foreground/80"
                initial={
                  reduceMotion
                    ? {
                        height: `${height}%`
                      }
                    : {
                        height: '8%'
                      }
                }
                whileInView={{
                  height: `${height}%`
                }}
                viewport={{
                  once: true
                }}
                transition={{
                  duration: 0.5,
                  delay: barIndex * 0.04
                }}
              />
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export function CommerceScene() {
  const reduceMotion = useReducedMotion();

  return (
    <div className="relative min-h-[300px] overflow-hidden">
      <motion.div
        className="absolute inset-x-[8%] top-[10%] overflow-hidden rounded-2xl border border-border bg-background/95 shadow-2xl"
        animate={
          reduceMotion
            ? undefined
            : {
                y: [0, -4, 0]
              }
        }
        transition={{
          duration: 6.4,
          repeat: Infinity,
          ease: 'easeInOut'
        }}>
        <div className="flex items-center justify-between border-b border-border px-4 py-3">
          <div>
            <p className="font-mono text-[9px] uppercase tracking-[0.15em] text-muted">Commerce</p>

            <p className="mt-1 text-[13px] font-medium">Storefront + live operations</p>
          </div>

          <ShoppingBag className="size-[18px] text-muted" />
        </div>

        <div className="grid grid-cols-[1fr_0.48fr] gap-2 p-3">
          <div className="relative h-[142px] overflow-hidden rounded-xl border border-border bg-surface-muted">
            <Image
              src="/portfolio/screenshots/aj-logik/02-store-desktop.webp"
              alt="AJ Logik commerce storefront"
              fill
              sizes="420px"
              className="object-cover object-top"
            />

            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-background/95 via-background/60 to-transparent px-3 pb-2.5 pt-8">
              <p className="text-[10px] font-medium">Product discovery</p>

              <p className="mt-0.5 font-mono text-[6px] uppercase tracking-[0.1em] text-muted">
                Live catalogue
              </p>
            </div>
          </div>

          <div className="space-y-2">
            {[
              [CreditCard, 'Checkout', 'Connected'],
              [PackageCheck, 'Orders', 'Processing'],
              [Database, 'Inventory', 'Synced']
            ].map(([Icon, label, status]) => (
              <div
                key={label as string}
                className="rounded-xl border border-border bg-surface-muted/30 p-2.5">
                <Icon className="size-3.5 text-theme-accent" />

                <p className="mt-2 text-[8px] font-medium">{label as string}</p>

                <p className="mt-0.5 font-mono text-[6px] uppercase tracking-[0.08em] text-muted">
                  {status as string}
                </p>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
}

function MobileScene() {
  const reduceMotion = useReducedMotion();

  return (
    <div className="relative min-h-[300px] overflow-hidden">
      <div className="absolute inset-x-[8%] top-[8%] grid grid-cols-[0.52fr_1fr] items-center gap-4">
        <motion.div
          animate={
            reduceMotion
              ? undefined
              : {
                  y: [0, -4, 0]
                }
          }
          transition={{
            duration: 6.6,
            repeat: Infinity,
            ease: 'easeInOut'
          }}
          className="mx-auto w-[122px] rounded-[24px] border-[4px] border-foreground/85 bg-background p-1.5 shadow-2xl">
          <div className="relative h-[210px] overflow-hidden rounded-[17px] bg-surface-muted">
            <Image
              src="/portfolio/screenshots/rcentz-systems/02-home-mobile.webp"
              alt="Rcentz mobile experience"
              fill
              sizes="122px"
              className="object-cover object-top"
            />
          </div>
        </motion.div>

        <div>
          <div className="flex items-center gap-2">
            <Smartphone className="size-4 text-theme-accent" />

            <p className="font-mono text-[8px] uppercase tracking-[0.13em] text-muted">Adaptive interface</p>
          </div>

          <p className="mt-2 text-[14px] font-medium">One system. Different screen.</p>

          <div className="mt-4 space-y-2">
            {[
              [CircleCheckBig, 'Touch-first navigation', 'Optimized for mobile interaction'],
              [Workflow, 'Shared business logic', 'Same application rules everywhere'],
              [Database, 'Connected live data', 'One source of operational truth']
            ].map(([Icon, title, copy]) => (
              <div
                key={title as string}
                className="flex items-start gap-2.5 rounded-xl border border-border bg-background/80 p-2.5">
                <Icon className="mt-0.5 size-3.5 shrink-0 text-theme-accent" />

                <div>
                  <p className="text-[8px] font-medium">{title as string}</p>

                  <p className="mt-0.5 text-[7px] leading-3.5 text-muted">{copy as string}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function ApiScene() {
  const reduceMotion = useReducedMotion();

  const modules = [
    {
      label: 'Clients',
      meta: 'Accounts',
      icon: UsersRound
    },
    {
      label: 'Projects',
      meta: 'Workflows',
      icon: Workflow
    },
    {
      label: 'Billing',
      meta: 'Payments',
      icon: CreditCard
    },
    {
      label: 'Analytics',
      meta: 'Insights',
      icon: ChartNoAxesCombined
    },
    {
      label: 'Data',
      meta: 'Records',
      icon: Database
    },
    {
      label: 'Automation',
      meta: 'Actions',
      icon: Code2
    }
  ];

  return (
    <div className="relative min-h-[300px] overflow-hidden">
      <div className="absolute inset-[9%] grid grid-cols-3 gap-3">
        {modules.map((module, nodeIndex) => {
          const Icon = module.icon;

          return (
            <motion.div
              key={module.label}
              className={[
                'flex flex-col',
                'justify-between',
                'rounded-2xl',
                'border border-border',
                'bg-background',
                'p-3',
                'shadow-lg'
              ].join(' ')}
              animate={
                reduceMotion
                  ? undefined
                  : {
                      y: [0, nodeIndex % 2 === 0 ? -4 : 4, 0]
                    }
              }
              transition={{
                duration: 6 + nodeIndex * 0.25,
                repeat: Infinity,
                ease: 'easeInOut'
              }}>
              <div className="flex items-center justify-between">
                <span className="flex size-8 items-center justify-center rounded-xl bg-theme-accent-soft">
                  <Icon className="size-3.5 text-theme-accent" />
                </span>

                <span className="size-1.5 rounded-full bg-theme-accent" />
              </div>

              <div className="mt-4">
                <p className="text-[9px] font-medium">{module.label}</p>

                <p className="mt-1 font-mono text-[6px] uppercase tracking-[0.1em] text-muted">
                  {module.meta}
                </p>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

export function ServiceIllustration({ service, index }: ServiceIllustrationProps) {
  const normalizedName = service.name.toLowerCase();

  if (service.slug === 'business-management-system' || normalizedName.includes('business management')) {
    return <BusinessManagementScene />;
  }

  if (service.slug === 'wordpress-to-nextjs-migration' || index === 5) {
    return <ModernizationScene />;
  }

  if (index === 2) {
    return <CommerceScene />;
  }

  if (index === 3) {
    return <MobileScene />;
  }

  if (index === 4) {
    return <ApiScene />;
  }

  return <DashboardScene />;
}
