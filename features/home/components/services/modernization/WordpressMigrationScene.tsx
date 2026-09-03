'use client';

import {
  Check,
  Code2,
  FileText,
  Globe2,
  ImageIcon,
  Layers3,
  Route,
  Search,
  Zap
} from 'lucide-react';
import { motion, useReducedMotion } from 'motion/react';

const FLOW = [
  { label: 'Content', icon: FileText },
  { label: 'Media', icon: ImageIcon },
  { label: 'Routes', icon: Route },
  { label: 'SEO', icon: Search }
] as const;

export function WordpressMigrationScene() {
  const reduceMotion = useReducedMotion();

  return (
    <div className="grid min-h-[315px] gap-3 px-4 pb-4 sm:px-5 lg:grid-cols-[0.86fr_0.34fr_1.1fr]">
      <div className="relative overflow-hidden rounded-[20px] border border-border bg-background/88 p-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="font-mono text-[6px] uppercase tracking-[0.15em] text-muted">
              Legacy stack
            </p>
            <p className="mt-1.5 text-sm font-semibold">WordPress</p>
          </div>
          <Globe2 className="size-4 text-muted" />
        </div>

        <div className="mt-3 grid h-[215px] grid-cols-[0.36fr_1fr] overflow-hidden rounded-2xl border border-border bg-surface-muted/25">
          <div className="border-r border-border p-2.5">
            <div className="mb-3 flex size-7 items-center justify-center rounded-lg border border-border bg-background/80">
              <span className="font-mono text-[8px] font-semibold">W</span>
            </div>

            {['Pages', 'Posts', 'Media', 'Plugins', 'Themes'].map((item, index) => (
              <motion.div
                key={item}
                className="mb-1.5 rounded-lg border border-border bg-background/70 px-2 py-1.5 font-mono text-[6px] text-muted"
                animate={
                  reduceMotion || index !== 3
                    ? undefined
                    : { borderColor: ['var(--border)', 'var(--theme-accent)', 'var(--border)'] }
                }
                transition={{ duration: 3.5, repeat: Infinity }}>
                {item}
              </motion.div>
            ))}
          </div>

          <div className="p-3">
            <div className="flex items-center justify-between">
              <div className="h-2 w-24 rounded-full bg-border-strong" />
              <span className="rounded-full border border-border px-2 py-1 font-mono text-[6px] text-muted">
                17 plugins
              </span>
            </div>

            <div className="mt-3 h-20 rounded-xl border border-border bg-background/75 p-3">
              <div className="h-2 w-2/3 rounded-full bg-border-strong" />
              <div className="mt-3 h-1.5 w-full rounded-full bg-border" />
              <div className="mt-2 h-1.5 w-4/5 rounded-full bg-border" />
            </div>

            <div className="mt-3 grid grid-cols-3 gap-2">
              {[
                ['146', 'Pages'],
                ['382', 'Media'],
                ['61', 'URLs']
              ].map(([value, label]) => (
                <div key={label} className="rounded-xl border border-border bg-background/70 p-2">
                  <p className="text-xs font-semibold">{value}</p>
                  <p className="mt-1 font-mono text-[5px] uppercase tracking-[0.1em] text-muted">
                    {label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="relative flex min-h-[160px] items-center justify-center overflow-hidden rounded-[20px] border border-border bg-surface-muted/22 p-3">
        <div className="absolute inset-y-5 left-1/2 w-px -translate-x-1/2 bg-border" />

        <div className="relative z-10 space-y-2">
          {FLOW.map(({ label, icon: Icon }, index) => (
            <motion.div
              key={label}
              className="flex w-24 items-center gap-2 rounded-full border border-border bg-background px-2.5 py-2 shadow-lg"
              initial={reduceMotion ? false : { opacity: 0, y: -7 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.12 + index * 0.13 }}>
              <Icon className="size-3 text-muted" />
              <span className="font-mono text-[6px] uppercase tracking-[0.1em] text-muted">
                {label}
              </span>
              <Check className="ml-auto size-3 text-[var(--theme-accent)]" />
            </motion.div>
          ))}
        </div>
      </div>

      <div className="relative overflow-hidden rounded-[20px] border border-border-strong bg-background/94 p-4 shadow-2xl">
        <div className="flex items-center justify-between">
          <div>
            <p className="font-mono text-[6px] uppercase tracking-[0.15em] text-[var(--theme-accent)]">
              Modern stack
            </p>
            <p className="mt-1.5 text-sm font-semibold">Next.js application</p>
          </div>
          <Zap className="size-4 text-[var(--theme-accent)]" />
        </div>

        <div className="mt-3 grid h-[215px] grid-cols-[1fr_0.42fr] gap-2">
          <div className="overflow-hidden rounded-2xl border border-border bg-surface-muted/25">
            <div className="flex h-8 items-center gap-1.5 border-b border-border px-3">
              <span className="size-1.5 rounded-full bg-border-strong" />
              <span className="size-1.5 rounded-full bg-border-strong" />
              <span className="size-1.5 rounded-full bg-border-strong" />
              <div className="ml-2 h-4 flex-1 rounded-full border border-border bg-background/70" />
            </div>

            <div className="grid h-[calc(100%-2rem)] grid-cols-[0.28fr_1fr]">
              <div className="border-r border-border p-2">
                {['Home', 'Work', 'Services', 'Blog'].map(item => (
                  <div key={item} className="mb-1.5 rounded-lg border border-border bg-background/70 px-2 py-1.5 text-[6px] text-muted">
                    {item}
                  </div>
                ))}
              </div>

              <div className="p-3">
                <motion.div
                  className="h-14 rounded-xl bg-[var(--theme-accent-faint)]"
                  animate={reduceMotion ? undefined : { opacity: [0.45, 0.82, 0.45] }}
                  transition={{ duration: 4, repeat: Infinity }}
                />
                <div className="mt-3 grid grid-cols-2 gap-2">
                  <div className="h-12 rounded-xl border border-border bg-background/75" />
                  <div className="h-12 rounded-xl border border-border bg-background/75" />
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            {[
              ['App Router', Code2],
              ['Components', Layers3],
              ['Fast', Zap]
            ].map(([label, Icon]) => (
              <div key={label as string} className="rounded-xl border border-border bg-surface-muted/30 p-2.5">
                <Icon className="size-3.5 text-muted" />
                <p className="mt-2 font-mono text-[6px] uppercase tracking-[0.09em] text-muted">
                  {label as string}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
