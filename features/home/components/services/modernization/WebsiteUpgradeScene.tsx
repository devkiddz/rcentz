'use client';

import {
  BadgeCheck,
  FilePenLine,
  Mail,
  MessageCircleMore,
  Smartphone,
  UserRound
} from 'lucide-react';
import { motion, useReducedMotion } from 'motion/react';

export function WebsiteUpgradeScene() {
  const reduceMotion = useReducedMotion();

  return (
    <div className="grid min-h-[315px] gap-3 px-4 pb-4 sm:px-5 lg:grid-cols-[0.78fr_1.22fr]">
      <div className="overflow-hidden rounded-[20px] border border-border bg-background/88 p-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="font-mono text-[6px] uppercase tracking-[0.15em] text-muted">
              Before
            </p>
            <p className="mt-1.5 text-sm font-semibold">Static brochure</p>
          </div>
          <FilePenLine className="size-4 text-muted" />
        </div>

        <div className="mt-3 h-[215px] overflow-hidden rounded-2xl border border-border bg-surface-muted/25 p-3">
          <div className="flex items-center justify-between">
            <div className="h-2 w-24 rounded-full bg-border-strong" />
            <div className="flex gap-1">
              <span className="h-1.5 w-8 rounded-full bg-border" />
              <span className="h-1.5 w-8 rounded-full bg-border" />
              <span className="h-1.5 w-8 rounded-full bg-border" />
            </div>
          </div>

          <div className="mt-5 h-16 rounded-xl border border-border bg-background/70" />
          <div className="mt-3 grid grid-cols-3 gap-2">
            {[0, 1, 2].map(item => (
              <div key={item} className="h-14 rounded-xl border border-border bg-background/70" />
            ))}
          </div>

          <div className="mt-3 rounded-xl border border-border bg-background/65 px-3 py-2 font-mono text-[6px] uppercase tracking-[0.1em] text-muted">
            Contact us → email
          </div>
        </div>
      </div>

      <div className="overflow-hidden rounded-[20px] border border-border-strong bg-background/94 p-4 shadow-2xl">
        <div className="flex items-center justify-between">
          <div>
            <p className="font-mono text-[6px] uppercase tracking-[0.15em] text-[var(--theme-accent)]">
              After
            </p>
            <p className="mt-1.5 text-sm font-semibold">Active business experience</p>
          </div>
          <BadgeCheck className="size-4 text-[var(--theme-accent)]" />
        </div>

        <div className="mt-3 grid h-[215px] gap-2 sm:grid-cols-[1.05fr_0.95fr]">
          <div className="overflow-hidden rounded-2xl border border-border bg-surface-muted/25">
            <div className="flex h-8 items-center gap-2 border-b border-border px-3">
              <div className="flex size-5 items-center justify-center rounded-full border border-border bg-background">
                <span className="font-mono text-[7px] font-semibold">R</span>
              </div>
              <div className="h-4 flex-1 rounded-full border border-border bg-background/70" />
            </div>

            <div className="p-3">
              <motion.div
                className="rounded-xl border border-border bg-background/75 p-3"
                animate={reduceMotion ? undefined : { y: [0, -3, 0] }}
                transition={{ duration: 5, repeat: Infinity }}>
                <p className="font-mono text-[6px] uppercase tracking-[0.1em] text-muted">
                  Visitor profile
                </p>
                <div className="mt-3 flex items-center gap-3">
                  <div className="flex size-9 items-center justify-center rounded-full border border-border bg-surface-muted">
                    <UserRound className="size-4 text-muted" />
                  </div>
                  <div>
                    <p className="text-[9px] font-medium">New enquiry</p>
                    <p className="mt-0.5 text-[7px] text-muted">Business website</p>
                  </div>
                </div>
              </motion.div>

              <div className="mt-2 grid grid-cols-2 gap-2">
                <div className="rounded-xl border border-border bg-background/70 p-2.5">
                  <MessageCircleMore className="size-3.5 text-muted" />
                  <p className="mt-2 text-[7px] text-muted">Live enquiry</p>
                </div>
                <div className="rounded-xl border border-border bg-background/70 p-2.5">
                  <Mail className="size-3.5 text-muted" />
                  <p className="mt-2 text-[7px] text-muted">Follow-up</p>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2">
            {[
              ['Mobile', Smartphone, 'Intentional'],
              ['Profile', UserRound, 'Known'],
              ['Content', FilePenLine, 'Editable'],
              ['Contact', MessageCircleMore, 'Tracked']
            ].map(([label, Icon, value], index) => (
              <motion.div
                key={label as string}
                className="rounded-xl border border-border bg-surface-muted/25 p-3"
                initial={reduceMotion ? false : { opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.1 + index * 0.08 }}>
                <Icon className="size-3.5 text-muted" />
                <p className="mt-3 font-mono text-[6px] uppercase tracking-[0.1em] text-muted">
                  {label as string}
                </p>
                <p className="mt-1 text-[8px] font-medium">{value as string}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
