'use client';

import { Check, Cloud, Database, ShieldCheck, Zap } from 'lucide-react';
import { motion, useReducedMotion } from 'motion/react';

import { PerspectiveSurface } from '@/features/home/components/hero/perspective/PerspectiveSurface';

export function SystemStatusDock({ phase }: { phase: number }) {
  const reduceMotion = Boolean(useReducedMotion());
  const deployments = [4, 8, 13, 18, 23][Math.min(phase, 4)];

  return (
    <motion.div
      initial={reduceMotion ? false : { opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: reduceMotion ? 0 : 0.95, duration: 0.65 }}
      className="relative overflow-hidden rounded-xl border border-theme-accent/18 bg-background/97 px-3 py-2.5 shadow-2xl backdrop-blur-2xl">
      <PerspectiveSurface />

      <div className="relative z-10 flex items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <span className="flex size-7 items-center justify-center rounded-lg bg-theme-accent-soft">
            <ShieldCheck className="size-3 text-theme-accent" />
          </span>

          <div>
            <p className="text-[6.5px] font-semibold">System Status</p>
            <p className="font-mono text-[4.5px] text-theme-accent">
              {phase >= 4 ? 'All Systems Operational' : 'Deployment in progress'}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 border-l border-border pl-3">
          <div>
            <p className="font-mono text-[4.5px] uppercase tracking-[0.08em] text-muted">Deployments</p>
            <p className="mt-0.5 text-[10px] font-semibold">{deployments}</p>
          </div>

          <svg aria-hidden="true" viewBox="0 0 54 20" className="h-5 w-14 text-theme-accent">
            <motion.path
              d="M0 16 L8 12 L15 14 L22 8 L29 11 L36 5 L44 7 L54 2"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              initial={reduceMotion ? false : { pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ delay: reduceMotion ? 0 : 1.1, duration: reduceMotion ? 0 : 1.6 }}
            />
          </svg>
        </div>

        <div className="flex items-center gap-1.5">
          {[Database, Cloud, Check, Zap].map((Icon, index) => (
            <motion.span
              key={index}
              animate={
                reduceMotion
                  ? undefined
                  : {
                      opacity: phase >= index ? [0.55, 1, 0.55] : 0.24
                    }
              }
              transition={{
                duration: 1.8,
                repeat: phase >= index ? Infinity : 0,
                delay: index * 0.18
              }}
              className="flex size-7 items-center justify-center rounded-lg border border-border bg-background/72">
              <Icon className={phase >= index ? 'size-3 text-theme-accent' : 'size-3 text-muted'} />
            </motion.span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
