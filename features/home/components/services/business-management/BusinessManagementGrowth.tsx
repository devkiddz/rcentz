'use client';

import { ArrowUpRight, Target, TrendingUp, UsersRound } from 'lucide-react';
import { motion, useReducedMotion } from 'motion/react';

import { GrowthMomentumChart } from './charts/GrowthMomentumChart';

const serviceSignals = [
  { label: 'Web applications', strength: 78 },
  { label: 'Business systems', strength: 64 },
  { label: 'Commerce', strength: 52 }
] as const;

export function BusinessManagementGrowth() {
  const reduceMotion = useReducedMotion();

  return (
    <div className="grid h-full gap-4 lg:grid-cols-[250px_minmax(0,1fr)]">
      <motion.aside
        className="flex h-full min-h-0 flex-col rounded-2xl border border-border bg-background/96 p-5 shadow-2xl"
        initial={reduceMotion ? false : { opacity: 0, x: -12 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.45, delay: 0.08 }}>
        <div>
          <p className="font-mono text-[7px] uppercase tracking-[0.15em] text-muted">Growth pulse</p>

          <p className="mt-2 text-sm font-semibold tracking-[-0.03em]">Business direction</p>
        </div>

        <motion.div
          whileHover={reduceMotion ? undefined : { y: -3 }}
          className="mt-5 rounded-[20px] border border-border bg-surface-muted/30 p-4">
          <p className="font-mono text-[7px] uppercase tracking-[0.14em] text-muted">New enquiries</p>

          <div className="mt-3 flex items-end justify-between gap-3">
            <p className="text-3xl font-semibold tracking-[-0.055em]">+28%</p>
            <TrendingUp aria-hidden="true" className="mb-1 size-4 text-[var(--theme-accent)]" />
          </div>

          <p className="mt-3 text-[8px] leading-4 text-muted">Qualified service interest is moving upward.</p>
        </motion.div>

        <div className="mt-3 grid gap-2">
          {[
            ['Returning clients', '62%', UsersRound],
            ['Service interest', '+19%', Target]
          ].map(([label, value, Icon]) => (
            <motion.div
              key={label as string}
              whileHover={reduceMotion ? undefined : { x: 3 }}
              className="flex items-center justify-between rounded-xl border border-border bg-surface-muted/25 p-3">
              <div className="flex items-center gap-2">
                <Icon aria-hidden="true" className="size-3 text-muted" />
                <span className="text-[8px] text-muted">{label as string}</span>
              </div>

              <span className="text-[10px] font-medium">{value as string}</span>
            </motion.div>
          ))}
        </div>

        <div className="mt-auto rounded-xl border border-border bg-surface-muted/25 p-4">
          <p className="font-mono text-[7px] uppercase tracking-[0.12em] text-muted">Signal</p>
          <p className="mt-2 text-[9px] font-medium">Positive movement</p>
        </div>
      </motion.aside>

      <motion.div
        className="flex h-full min-h-0 flex-col overflow-hidden rounded-2xl border border-border bg-background/96 shadow-2xl"
        initial={reduceMotion ? false : { opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45 }}>
        <div className="flex h-10 shrink-0 items-center gap-1.5 border-b border-border px-4">
          <span className="size-1.5 rounded-full bg-border-strong" />
          <span className="size-1.5 rounded-full bg-border-strong" />
          <span className="size-1.5 rounded-full bg-border-strong" />

          <div className="ml-4 flex h-5 flex-1 items-center rounded-full border border-border bg-surface-muted/70 px-3">
            <span className="font-mono text-[7px] text-muted">workspace / growth</span>
          </div>
        </div>

        <div className="flex min-h-0 flex-1 flex-col p-5">
          <div className="flex items-start justify-between gap-5">
            <div>
              <p className="font-mono text-[7px] uppercase tracking-[0.15em] text-muted">
                Growth intelligence
              </p>

              <h4 className="mt-2 text-base font-semibold tracking-[-0.03em]">
                Real charts. Real interaction.
              </h4>

              <p className="mt-2 max-w-md text-[10px] leading-4 text-muted">
                Hover the chart to inspect enquiries and conversion over time. The visual behaves like an
                actual analytics surface rather than a decorative mockup.
              </p>
            </div>

            <TrendingUp aria-hidden="true" className="size-4 shrink-0 text-muted" />
          </div>

          <div className="mt-5 min-h-[210px] flex-1 rounded-[24px] border border-border bg-surface-muted/20 p-2">
            <GrowthMomentumChart />
          </div>

          <div className="mt-4 grid gap-3 md:grid-cols-[1.1fr_0.9fr]">
            <div className="rounded-xl border border-border bg-surface-muted/25 p-4">
              <p className="font-mono text-[7px] uppercase tracking-[0.14em] text-muted">Service demand</p>

              <div className="mt-3 grid grid-cols-3 gap-2">
                {serviceSignals.map((item, index) => (
                  <motion.div
                    key={item.label}
                    whileHover={reduceMotion ? undefined : { y: -3 }}
                    className="relative min-h-20 overflow-hidden rounded-xl border border-border bg-background/75 p-3 text-left">
                    <span className="font-mono text-[7px] uppercase tracking-[0.11em] text-muted">
                      {String(index + 1).padStart(2, '0')}
                    </span>

                    <span className="mt-2 block text-[8px] leading-3 text-muted">{item.label}</span>

                    <span className="mt-3 block text-sm font-semibold tracking-[-0.03em]">
                      {item.strength}
                    </span>

                    <motion.span
                      aria-hidden="true"
                      className="absolute -bottom-6 -right-5 size-16 rounded-full border border-[var(--theme-accent)]/30"
                      whileHover={reduceMotion ? undefined : { scale: 1.25 }}
                    />
                  </motion.div>
                ))}
              </div>
            </div>

            <motion.div
              whileHover={reduceMotion ? undefined : { y: -2 }}
              className="rounded-xl border border-border bg-surface-muted/25 p-4">
              <p className="font-mono text-[7px] uppercase tracking-[0.14em] text-muted">Conversion path</p>

              <div className="mt-3 flex items-center gap-2">
                {['Discover', 'Enquire', 'Start'].map((step, index) => (
                  <div key={step} className="flex min-w-0 flex-1 items-center gap-2">
                    <div className="min-w-0 flex-1 rounded-xl border border-border bg-background/75 px-3 py-3 text-center">
                      <span className="font-mono text-[7px] text-muted">{index + 1}</span>
                      <span className="mt-1 block truncate text-[8px]">{step}</span>
                    </div>

                    {index < 2 ? (
                      <ArrowUpRight aria-hidden="true" className="size-3 shrink-0 rotate-45 text-muted" />
                    ) : null}
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
