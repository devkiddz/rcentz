'use client';

import Link from 'next/link';
import { useState } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { ArrowUpRight, CheckCircle2, RefreshCw, Wrench } from 'lucide-react';

import { MaintenanceModernizationIllustration } from './hero/MaintenanceModernizationIllustration';

const CAPABILITIES = [
  { id: 'repairs', label: 'Website repairs', detail: 'Fix bug backlogs, broken routes & layout issues' },
  { id: 'legacy', label: 'Legacy modernization', detail: 'Migrate monolithic apps to Next.js App Router' },
  { id: 'rebuild', label: 'Redesign & rebuild', detail: 'Modernize UI/UX while preserving business data' },
  { id: 'performance', label: 'Performance upgrades', detail: 'Optimize Core Web Vitals, speed & asset load' }
] as const;

export function MaintenanceModernizationStory() {
  const reduceMotion = Boolean(useReducedMotion());
  const [activeCapability, setActiveCapability] = useState<string>(CAPABILITIES[0].id);

  const activeDetail = CAPABILITIES.find(c => c.id === activeCapability)?.detail ?? CAPABILITIES[0].detail;

  return (
    <section className="relative overflow-hidden py-6 sm:py-10">
      <div className="grid items-center gap-10 sm:gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-12">
        {/* LEFT COLUMN: STORY & CONTROLS */}
        <div className="min-w-0 max-w-[520px] text-left">
          {/* CATEGORY BADGE */}
          <div className="flex items-center gap-2.5">
            <span className="font-mono text-[7px] font-semibold uppercase tracking-[0.16em] text-theme-accent sm:text-[8.5px] sm:tracking-[0.18em]">
              06 · Maintenance & Modernization
            </span>
            <span className="h-px w-8 bg-theme-accent/40" />
          </div>

          {/* HEADLINE */}
          <h2 className="mt-4 max-w-[480px] text-[2.1rem] font-semibold leading-[0.98] tracking-[-0.055em] text-foreground sm:mt-5 sm:text-[3.1rem] lg:text-[3.6rem]">
            Repair what is broken. <span className="text-muted">Modernize what remains.</span>
          </h2>

          {/* DESCRIPTION */}
          <p className="mt-4 max-w-[475px] text-[12.5px] leading-6 text-muted sm:mt-5 sm:text-[14px] sm:leading-7">
            Rcentz repairs, rebuilds and modernizes existing websites and applications while preserving the
            critical business content, data schema, and core functionality that drive your operations.
          </p>

          {/* INTERACTIVE CAPABILITIES LIST */}
          <div className="mt-6 sm:mt-7">
            <p className="font-mono text-[6.5px] font-semibold uppercase tracking-[0.14em] text-theme-accent sm:text-[7px]">
              Core Specializations
            </p>

            <div className="mt-3 flex flex-wrap gap-2">
              {CAPABILITIES.map(capability => {
                const isActive = capability.id === activeCapability;

                return (
                  <button
                    key={capability.id}
                    type="button"
                    onClick={() => setActiveCapability(capability.id)}
                    className={[
                      'group relative inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-[8.5px] font-medium transition-all duration-300 backdrop-blur-lg sm:px-3.5 sm:text-[9.5px]',
                      isActive
                        ? 'border-theme-accent/40 bg-theme-accent-soft text-theme-accent shadow-sm ring-1 ring-theme-accent/20'
                        : 'border-border bg-surface-muted/30 text-muted hover:border-border-strong hover:bg-surface-muted/60 hover:text-foreground'
                    ].join(' ')}>
                    {isActive ? (
                      <CheckCircle2 className="size-3 text-theme-accent" />
                    ) : (
                      <span className="size-1 rounded-full bg-border-strong group-hover:bg-theme-accent" />
                    )}
                    {capability.label}
                  </button>
                );
              })}
            </div>

            {/* CAPABILITY DETAIL CARD */}
            <motion.div
              key={activeCapability}
              initial={reduceMotion ? false : { opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.25 }}
              className="mt-3.5 flex items-center gap-2.5 rounded-[12px] border border-border/80 bg-background/60 p-3 backdrop-blur-md">
              <div className="flex size-7 shrink-0 items-center justify-center rounded-[8px] bg-theme-accent-soft text-theme-accent">
                <Wrench className="size-3.5" />
              </div>
              <p className="text-[10.5px] leading-4 text-foreground sm:text-[11px]">{activeDetail}</p>
            </motion.div>
          </div>

          {/* CTA & LIVE STATUS */}
          <div className="mt-7 flex flex-wrap items-center gap-4 sm:mt-8">
            <Link
              href="/services/category/maintenance-modernization"
              className="group inline-flex h-10 items-center justify-center gap-2 rounded-full bg-theme-accent px-5 text-[11px] font-medium text-white shadow-sm transition-[opacity,transform] hover:opacity-90 active:scale-[0.98] sm:text-[12px]">
              Explore Modernization
              <ArrowUpRight
                aria-hidden="true"
                className="size-3.5 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              />
            </Link>

            <div className="flex items-center gap-2 border-l border-border pl-4">
              <RefreshCw className="size-3.5 animate-spin text-theme-accent [animation-duration:8s]" />
              <span className="font-mono text-[7px] uppercase tracking-wider text-muted sm:text-[7.5px]">
                Zero Downtime Migration
              </span>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: ILLUSTRATION */}
        <div className="relative min-w-0">
          <MaintenanceModernizationIllustration />
        </div>
      </div>
    </section>
  );
}
