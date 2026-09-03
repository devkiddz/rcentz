'use client';

import { BarChart3, Boxes, Code2, ShoppingBag } from 'lucide-react';
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
        className="absolute inset-x-[10%] top-[17%] rounded-2xl border border-border bg-background/95 p-4 shadow-2xl"
        animate={reduceMotion ? undefined : { y: [0, -5, 0] }}
        transition={{
          duration: 5.6,
          repeat: Infinity,
          ease: 'easeInOut'
        }}>
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="font-mono text-[8px] uppercase tracking-[0.16em] text-muted">Operations</p>
            <p className="mt-2 text-sm font-medium">Business overview</p>
          </div>

          <BarChart3 aria-hidden="true" className="size-4 text-muted" />
        </div>

        <div className="mt-5 rounded-xl border border-border bg-surface-muted/60 p-3">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-mono text-[7px] uppercase tracking-[0.14em] text-muted">Live activity</p>
              <p className="mt-1 text-lg font-semibold tracking-[-0.04em]">98.4%</p>
            </div>

            <motion.span
              className="size-2 rounded-full bg-[var(--theme-accent)]"
              animate={reduceMotion ? undefined : { opacity: [0.35, 1, 0.35] }}
              transition={{
                duration: 1.7,
                repeat: Infinity
              }}
            />
          </div>

          <div className="mt-5 flex h-24 items-end gap-1.5">
            {bars.map((height, barIndex) => (
              <motion.div
                key={`${height}-${barIndex}`}
                className="flex-1 rounded-t-sm bg-foreground/80"
                initial={reduceMotion ? { height: `${height}%` } : { height: '8%' }}
                whileInView={{
                  height: `${height}%`
                }}
                viewport={{ once: true }}
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

function CommerceScene() {
  const reduceMotion = useReducedMotion();

  return (
    <div className="relative min-h-[280px] overflow-hidden">
      <motion.div
        className="absolute left-[8%] top-[14%] w-[58%] rounded-2xl border border-border bg-background/95 p-4 shadow-2xl"
        animate={reduceMotion ? undefined : { y: [0, -5, 0] }}
        transition={{
          duration: 5.2,
          repeat: Infinity,
          ease: 'easeInOut'
        }}>
        <div className="flex items-center justify-between">
          <div>
            <p className="font-mono text-[8px] uppercase tracking-[0.15em] text-muted">Store</p>
            <p className="mt-1 text-[11px] font-medium">Products in motion</p>
          </div>

          <ShoppingBag aria-hidden="true" className="size-4 text-muted" />
        </div>

        <div className="mt-4 grid grid-cols-2 gap-2">
          {[0, 1, 2, 3].map(cardIndex => (
            <motion.div
              key={cardIndex}
              className="aspect-[1.15/1] rounded-xl border border-border bg-surface-muted"
              animate={
                reduceMotion
                  ? undefined
                  : {
                      opacity: [0.55, 1, 0.55]
                    }
              }
              transition={{
                duration: 3,
                repeat: Infinity,
                delay: cardIndex * 0.18
              }}
            />
          ))}
        </div>
      </motion.div>
    </div>
  );
}

function ApiScene() {
  const reduceMotion = useReducedMotion();

  return (
    <div className="relative min-h-[280px] overflow-hidden">
      <div className="absolute inset-[12%] grid grid-cols-3 gap-4">
        {[0, 1, 2, 3, 4, 5].map(nodeIndex => (
          <motion.div
            key={nodeIndex}
            className="flex items-center justify-center rounded-2xl border border-border bg-background shadow-lg"
            animate={
              reduceMotion
                ? undefined
                : {
                    y: [0, nodeIndex % 2 === 0 ? -5 : 5, 0]
                  }
            }
            transition={{
              duration: 4.8 + nodeIndex * 0.2,
              repeat: Infinity,
              ease: 'easeInOut'
            }}>
            {nodeIndex % 2 === 0 ? (
              <Code2 aria-hidden="true" className="size-4 text-muted" />
            ) : (
              <Boxes aria-hidden="true" className="size-4 text-muted" />
            )}
          </motion.div>
        ))}
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

  if (index === 4) {
    return <ApiScene />;
  }

  return <DashboardScene />;
}
