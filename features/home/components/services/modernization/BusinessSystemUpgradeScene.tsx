'use client';

import Image from 'next/image';

import { BadgeCheck, ClipboardCheck, FolderKanban, MessageSquareText, UsersRound } from 'lucide-react';

import { motion, useReducedMotion } from 'motion/react';

const TEAM = [
  {
    name: 'Client',
    role: 'Project owner',
    image: '/images/services/business-management/black-client-01.jpg'
  },
  {
    name: 'Designer',
    role: 'Interface',
    image: '/images/services/business-management/black-team-01.jpg'
  },
  {
    name: 'Developer',
    role: 'Build',
    image: '/images/services/business-management/black-team-02.jpg'
  }
] as const;

const BEFORE = [
  {
    label: 'Clients.xlsx',
    detail: '12 client records',
    icon: UsersRound
  },
  {
    label: 'Project folders',
    detail: '5 separate folders',
    icon: FolderKanban
  },
  {
    label: 'Task notes',
    detail: '27 manual notes',
    icon: ClipboardCheck
  },
  {
    label: 'WhatsApp',
    detail: 'Daily project chat',
    icon: MessageSquareText
  }
] as const;

export function BusinessSystemUpgradeScene() {
  const reduceMotion = useReducedMotion();

  return (
    <div className="grid min-h-[315px] gap-3 pb-4 lg:grid-cols-[0.72fr_1.28fr] lg:px-4">
      {/* BEFORE */}

      <div className="rounded-[20px] border border-border bg-background/88 p-4">
        <p className="font-mono text-[7px] uppercase tracking-[0.15em] text-muted">Before</p>

        <p className="mt-1.5 text-[15px] font-semibold">Scattered operations</p>

        <div className="mt-3 space-y-2">
          {BEFORE.map((item, index) => {
            const Icon = item.icon;

            return (
              <motion.div
                key={item.label}
                className="flex items-center gap-3 rounded-xl border border-border bg-surface-muted/25 px-3 py-2.5"
                animate={
                  reduceMotion
                    ? undefined
                    : {
                        x: [0, index % 2 ? 2 : -2, 0]
                      }
                }
                transition={{
                  duration: 6 + index * 0.25,
                  repeat: Infinity,
                  ease: 'easeInOut'
                }}>
                <div className="flex size-8 items-center justify-center rounded-lg border border-border bg-background/80">
                  <Icon className="size-3.5 text-muted" />
                </div>

                <div>
                  <p className="text-[9px] font-medium">{item.label}</p>

                  <p className="mt-0.5 font-mono text-[6px] uppercase tracking-[0.08em] text-muted">
                    {item.detail}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* AFTER */}

      <div className="overflow-hidden rounded-[20px] border border-border-strong bg-background/94 p-4 shadow-2xl">
        <div className="flex items-center justify-between">
          <div>
            <p className="font-mono text-[7px] uppercase tracking-[0.15em] text-[var(--theme-accent)]">
              After
            </p>

            <p className="mt-1.5 text-[15px] font-semibold">Connected workspace</p>
          </div>

          <BadgeCheck className="size-[18px] text-[var(--theme-accent)]" />
        </div>

        <div className="mt-3 grid gap-2 sm:grid-cols-[0.42fr_1fr]">
          {/* TEAM */}

          <div className="space-y-2">
            {TEAM.map((member, index) => (
              <motion.div
                key={member.name}
                className="rounded-xl border border-border bg-surface-muted/25 p-2.5"
                initial={
                  reduceMotion
                    ? false
                    : {
                        opacity: 0,
                        x: -6
                      }
                }
                animate={{
                  opacity: 1,
                  x: 0
                }}
                transition={{
                  delay: 0.1 + index * 0.1
                }}>
                <div className="flex items-center gap-2.5">
                  <div className="relative size-8 shrink-0 overflow-hidden rounded-full border border-border bg-background">
                    <Image src={member.image} alt="" fill sizes="32px" className="object-cover" />
                  </div>

                  <div>
                    <p className="text-[9px] font-medium">{member.name}</p>

                    <p className="mt-0.5 font-mono text-[6px] uppercase tracking-[0.08em] text-muted">
                      {member.role}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* WORKSPACE */}

          <div className="grid gap-2 md:grid-cols-[1fr_0.76fr]">
            <div className="rounded-2xl border border-border bg-surface-muted/25 p-3">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-mono text-[7px] uppercase tracking-[0.1em] text-muted">
                    Project workspace
                  </p>

                  <p className="mt-1 text-[11px] font-medium">Website delivery</p>
                </div>

                <FolderKanban className="size-4 text-muted" />
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
                    initial={
                      reduceMotion
                        ? false
                        : {
                            opacity: 0,
                            y: 4
                          }
                    }
                    animate={{
                      opacity: 1,
                      y: 0
                    }}
                    transition={{
                      delay: 0.18 + index * 0.08
                    }}>
                    <span className="text-[8px] text-muted">{label}</span>

                    <span
                      className={[
                        'font-mono',
                        'text-[6px]',
                        'uppercase',
                        'tracking-[0.08em]',

                        status === 'Active' ? 'text-theme-accent' : 'text-muted'
                      ].join(' ')}>
                      {status}
                    </span>
                  </motion.div>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              {/* ACTUAL MESSAGE */}

              <div className="rounded-xl border border-border bg-surface-muted/25 p-3">
                <MessageSquareText className="size-4 text-theme-accent" />

                <p className="mt-2 text-[9px] font-medium">Client update</p>

                <p className="mt-1.5 text-[7px] leading-4 text-muted">
                  Homepage approved. Move checkout into final review.
                </p>

                <p className="mt-2 font-mono text-[5px] uppercase tracking-[0.08em] text-muted">
                  2 minutes ago
                </p>
              </div>

              {/* ACTUAL TASK INFO */}

              <div className="rounded-xl border border-border bg-surface-muted/25 p-3">
                <ClipboardCheck className="size-4 text-theme-accent" />

                <div className="mt-2 flex items-end justify-between">
                  <div>
                    <p className="text-[9px] font-medium">6 tasks ready</p>

                    <p className="mt-1 text-[6px] text-muted">QA · API · Content</p>
                  </div>

                  <span className="font-mono text-[7px] text-theme-accent">75%</span>
                </div>

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
