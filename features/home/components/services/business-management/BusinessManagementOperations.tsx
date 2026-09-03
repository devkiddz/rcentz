'use client';

import { Activity, ArrowUpRight, BriefcaseBusiness, CheckCircle2, MessageSquareText } from 'lucide-react';
import { motion, useReducedMotion } from 'motion/react';

import { OperationsActivityChart } from './charts/OperationsActivityChart';

const projects = [
  { name: 'AJ Logik', stage: 'Development', progress: 86 },
  { name: 'JobRcentz', stage: 'Review', progress: 72 },
  { name: 'Rcentz System', stage: 'Development', progress: 54 }
] as const;

const requests = ['Business dashboard', 'Commerce platform', 'Website modernization'] as const;

const activity = [
  'Project milestone approved',
  'Client update published',
  'New service request received'
] as const;

export function BusinessManagementOperations() {
  const reduceMotion = useReducedMotion();

  return (
    <div className="grid h-full gap-4 lg:grid-cols-[minmax(0,1fr)_270px]">
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
            <span className="font-mono text-[7px] text-muted">workspace / operations</span>
          </div>
        </div>

        <div className="flex min-h-0 flex-1 flex-col p-5">
          <div className="flex items-start justify-between gap-5">
            <div>
              <p className="font-mono text-[7px] uppercase tracking-[0.15em] text-muted">Project delivery</p>

              <h4 className="mt-2 text-base font-semibold tracking-[-0.03em]">
                Work stays visible as it moves.
              </h4>

              <p className="mt-2 max-w-md text-[10px] leading-4 text-muted">
                Project state, requests and activity share one operational surface instead of disappearing
                across disconnected tools.
              </p>
            </div>

            <BriefcaseBusiness aria-hidden="true" className="size-4 shrink-0 text-muted" />
          </div>

          <div className="mt-5 grid gap-3 md:grid-cols-3">
            {projects.map((project, index) => (
              <motion.div
                key={project.name}
                whileHover={reduceMotion ? undefined : { y: -3 }}
                className="rounded-xl border border-border bg-surface-muted/35 p-4 transition-[background-color,border-color] hover:border-border-strong hover:bg-surface-raised/70">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-[10px] font-medium">{project.name}</p>
                    <p className="mt-1 font-mono text-[7px] uppercase tracking-[0.12em] text-muted">
                      {project.stage}
                    </p>
                  </div>

                  <span className="font-mono text-[8px] text-muted">{project.progress}%</span>
                </div>

                <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-surface-muted">
                  <motion.div
                    className="h-full rounded-full bg-[var(--theme-accent)]"
                    initial={reduceMotion ? { width: `${project.progress}%` } : { width: 0 }}
                    animate={{ width: `${project.progress}%` }}
                    transition={{ duration: 0.8, delay: index * 0.1 }}
                  />
                </div>

                <motion.span
                  className="mt-3 inline-flex rounded-full border border-border bg-background px-2 py-1 font-mono text-[7px] text-muted shadow-sm"
                  animate={reduceMotion ? undefined : { y: [0, -2, 0], opacity: [0.72, 1, 0.72] }}
                  transition={{ duration: 3.8 + index * 0.4, repeat: Infinity, ease: 'easeInOut' }}>
                  {project.stage}
                </motion.span>
              </motion.div>
            ))}
          </div>

          <div className="mt-auto grid gap-3 pt-5 md:grid-cols-2">
            <div className="rounded-xl border border-border bg-surface-muted/30 p-4">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <p className="font-mono text-[7px] uppercase tracking-[0.14em] text-muted">
                    Client requests
                  </p>
                  <p className="mt-1 text-[10px] font-medium">What is coming in</p>
                </div>

                <MessageSquareText aria-hidden="true" className="size-3.5 text-muted" />
              </div>

              <div className="mt-3 space-y-2">
                {requests.map(item => (
                  <motion.div
                    key={item}
                    whileHover={reduceMotion ? undefined : { x: 3 }}
                    className="flex items-center justify-between gap-3 border-t border-border pt-2 first:border-0 first:pt-0">
                    <span className="text-[8px] text-muted">{item}</span>
                    <ArrowUpRight aria-hidden="true" className="size-3 text-muted" />
                  </motion.div>
                ))}
              </div>
            </div>

            <div className="rounded-xl border border-border bg-surface-muted/30 p-4">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <p className="font-mono text-[7px] uppercase tracking-[0.14em] text-muted">
                    Recent activity
                  </p>
                  <p className="mt-1 text-[10px] font-medium">System timeline</p>
                </div>

                <Activity aria-hidden="true" className="size-3.5 text-muted" />
              </div>

              <div className="mt-3 space-y-2">
                {activity.map(item => (
                  <motion.div
                    key={item}
                    whileHover={reduceMotion ? undefined : { x: 3 }}
                    className="flex items-center gap-2">
                    <CheckCircle2
                      aria-hidden="true"
                      className="size-2.5 shrink-0 text-[var(--theme-accent)]"
                    />
                    <span className="text-[8px] text-muted">{item}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      <motion.aside
        className="flex h-full min-h-0 flex-col rounded-2xl border border-border bg-background/96 p-4 shadow-2xl"
        initial={reduceMotion ? false : { opacity: 0, x: 12 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.45, delay: 0.08 }}>
        <div>
          <p className="font-mono text-[7px] uppercase tracking-[0.15em] text-muted">Operational pulse</p>

          <p className="mt-2 text-sm font-semibold tracking-[-0.03em]">Live movement</p>
        </div>

        <div className="mt-4 min-h-0 flex-1 rounded-[22px] border border-border bg-surface-muted/20 p-2">
          <OperationsActivityChart />
        </div>

        <div className="mt-3 grid grid-cols-2 gap-2">
          <motion.div
            whileHover={reduceMotion ? undefined : { y: -2 }}
            className="rounded-xl border border-border bg-surface-muted/30 p-3">
            <p className="font-mono text-[7px] uppercase tracking-[0.12em] text-muted">Approvals</p>
            <p className="mt-2 text-base font-semibold tracking-[-0.03em]">04</p>
          </motion.div>

          <motion.div
            whileHover={reduceMotion ? undefined : { y: -2 }}
            className="rounded-xl border border-border bg-surface-muted/30 p-3">
            <p className="font-mono text-[7px] uppercase tracking-[0.12em] text-muted">Messages</p>
            <p className="mt-2 text-base font-semibold tracking-[-0.03em]">16</p>
          </motion.div>
        </div>
      </motion.aside>
    </div>
  );
}
