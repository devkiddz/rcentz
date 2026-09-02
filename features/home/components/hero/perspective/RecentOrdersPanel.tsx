'use client';

import { motion, useReducedMotion } from 'motion/react';

import { PerspectiveSurface } from '@/features/home/components/hero/perspective/PerspectiveSurface';

const ORDERS = [
  ['#10393', 'Sarah J.', '$120.00'],
  ['#10392', 'Michael T.', '$88.00'],
  ['#10391', 'David K.', '$199.00'],
  ['#10390', 'Lisa R.', '$49.00']
] as const;

export function RecentOrdersPanel() {
  const reduceMotion = Boolean(useReducedMotion());

  return (
    <motion.div
      initial={reduceMotion ? false : { opacity: 0, x: -22, y: 10, scale: 0.94 }}
      animate={{ opacity: 1, x: 0, y: reduceMotion ? 0 : [0, -4, 0], scale: 1 }}
      transition={{
        opacity: { delay: reduceMotion ? 0 : 0.45, duration: 0.65 },
        x: { delay: reduceMotion ? 0 : 0.45, duration: 0.65, ease: [0.22, 1, 0.36, 1] },
        scale: { delay: reduceMotion ? 0 : 0.45, duration: 0.65 },
        y: { duration: 4.6, repeat: Infinity, ease: 'easeInOut' }
      }}
      className="relative overflow-hidden rounded-xl border border-border bg-background/96 p-3 shadow-2xl backdrop-blur-2xl">
      <PerspectiveSurface />

      <div className="relative z-10">
        <div className="flex items-center justify-between">
          <p className="text-[7px] font-semibold lg:text-[8px]">Recent Orders</p>
          <span className="size-1.5 rounded-full bg-theme-accent" />
        </div>

        <div className="mt-3 grid grid-cols-[0.72fr_1fr_0.68fr_0.55fr] gap-2 border-b border-border pb-1.5 font-mono text-[4.5px] uppercase tracking-[0.08em] text-muted">
          <span>Order ID</span>
          <span>Customer</span>
          <span>Amount</span>
          <span>Status</span>
        </div>

        <div className="mt-2 space-y-2">
          {ORDERS.map(([id, customer, amount], index) => (
            <motion.div
              key={id}
              initial={reduceMotion ? false : { opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: reduceMotion ? 0 : 0.7 + index * 0.12 }}
              className="grid grid-cols-[0.72fr_1fr_0.68fr_0.55fr] items-center gap-2">
              <span className="font-mono text-[5px] text-muted">{id}</span>
              <span className="truncate text-[5px]">{customer}</span>
              <span className="font-mono text-[5px]">{amount}</span>
              <motion.span
                initial={reduceMotion ? false : { opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: reduceMotion ? 0 : 1.1 + index * 0.14 }}
                className="rounded-full bg-theme-accent-soft px-1.5 py-0.5 text-center font-mono text-[4.5px] text-theme-accent">
                Paid
              </motion.span>
            </motion.div>
          ))}
        </div>

        <div className="mt-3 inline-flex rounded-md border border-border bg-background/70 px-2 py-1 font-mono text-[5px] text-muted">
          View all orders
        </div>
      </div>
    </motion.div>
  );
}
