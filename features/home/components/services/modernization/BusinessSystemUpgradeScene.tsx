'use client';

import {
  BadgeCheck,
  ClipboardCheck,
  FolderKanban,
  MessageSquareText,
  UserRound,
  UsersRound
} from 'lucide-react';
import { motion, useReducedMotion } from 'motion/react';

const TEAM = [
  ['Client', 'Project owner'],
  ['Designer', 'Interface'],
  ['Developer', 'Build']
] as const;

export function BusinessSystemUpgradeScene() {
  const reduceMotion = useReducedMotion();

  return (
    <div className="grid min-h-[315px] gap-3 px-4 pb-4 sm:px-5 lg:grid-cols-[0.72fr_1.28fr]">
      <div className="rounded-[20px] border border-border bg-background/88 p-4">
        <p className="font-mono text-[6px] uppercase tracking-[0.15em] text-muted">
          Before
        </p>
        <p className="mt-1.5 text-sm font-semibold">Scattered operations</p>

        <div className="mt-3 space-y-2">
          {[
            ['Clients.xlsx', UsersRound],
            ['Project folders', FolderKanban],
            ['Task notes', ClipboardCheck],
            ['WhatsApp', MessageSquareText]
          ].map(([label, Icon], index) => (
            <motion.div
              key={label as string}
              className="flex items-center gap-3 rounded-xl border border-border bg-surface-muted/25 px-3 py-2.5"
              animate={
                reduceMotion
                  ? undefined
                  : { x: [0, index % 2 ? 3 : -3, 0] }
              }
              transition={{ duration: 5 + index * 0.2, repeat: Infinity, ease: 'easeInOut' }}>
              <div className="flex size-7 items-center justify-center rounded-lg border border-border bg-background/80">
                <Icon className="size-3.5 text-muted" />
              </div>
              <div>
                <p className="text-[8px] font-medium">{label as string}</p>
                <p className="mt-0.5 font-mono text-[5px] uppercase tracking-[0.1em] text-muted">
                  disconnected
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="overflow-hidden rounded-[20px] border border-border-strong bg-background/94 p-4 shadow-2xl">
        <div className="flex items-center justify-between">
          <div>
            <p className="font-mono text-[6px] uppercase tracking-[0.15em] text-[var(--theme-accent)]">
              After
            </p>
            <p className="mt-1.5 text-sm font-semibold">Connected workspace</p>
          </div>
          <BadgeCheck className="size-4 text-[var(--theme-accent)]" />
        </div>

        <div className="mt-3 grid h-[215px] gap-2 sm:grid-cols-[0.42fr_1fr]">
          <div className="space-y-2">
            {TEAM.map(([name, role], index) => (
              <motion.div
                key={name}
                className="rounded-xl border border-border bg-surface-muted/25 p-2.5"
                initial={reduceMotion ? false : { opacity: 0, x: -6 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 + index * 0.1 }}>
                <div className="flex items-center gap-2">
                  <div className="flex size-7 items-center justify-center rounded-full border border-border bg-background">
                    <UserRound className="size-3 text-muted" />
                  </div>
                  <div>
                    <p className="text-[7px] font-medium">{name}</p>
                    <p className="mt-0.5 font-mono text-[5px] uppercase tracking-[0.08em] text-muted">
                      {role}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="grid grid-cols-[1fr_0.76fr] gap-2">
            <div className="rounded-2xl border border-border bg-surface-muted/25 p-3">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-mono text-[6px] uppercase tracking-[0.1em] text-muted">
                    Project workspace
                  </p>
                  <p className="mt-1 text-[9px] font-medium">Website delivery</p>
                </div>
                <FolderKanban className="size-3.5 text-muted" />
              </div>

              <div className="mt-3 space-y-2">
                {[
                  ['Discovery', 'Done'],
                  ['Design', 'Review'],
                  ['Development', 'Active'],
                  ['Launch', 'Queued']
                ].map(([label, status], index) => (
                  <motion.div
                    key={label}
                    className="flex items-center justify-between rounded-lg border border-border bg-background/70 px-2.5 py-2"
                    initial={reduceMotion ? false : { opacity: 0, y: 4 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.18 + index * 0.08 }}>
                    <span className="text-[7px] text-muted">{label}</span>
                    <span className="font-mono text-[5px] uppercase tracking-[0.08em] text-muted">
                      {status}
                    </span>
                  </motion.div>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <div className="rounded-xl border border-border bg-surface-muted/25 p-3">
                <MessageSquareText className="size-3.5 text-muted" />
                <p className="mt-2 text-[7px] font-medium">Client update</p>
                <div className="mt-2 h-1.5 w-full rounded-full bg-border" />
                <div className="mt-1.5 h-1.5 w-3/4 rounded-full bg-border" />
              </div>

              <div className="rounded-xl border border-border bg-surface-muted/25 p-3">
                <ClipboardCheck className="size-3.5 text-muted" />
                <p className="mt-2 text-[7px] font-medium">6 tasks ready</p>
                <div className="mt-2 flex gap-1">
                  {[0, 1, 2, 3].map(item => (
                    <span
                      key={item}
                      className={[
                        'h-1.5 flex-1 rounded-full',
                        item < 3 ? 'bg-[var(--theme-accent)]' : 'bg-border'
                      ].join(' ')}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
