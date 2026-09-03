'use client';

import {
  BadgeCheck,
  BriefcaseBusiness,
  MessageSquareText,
  UserRound
} from 'lucide-react';
import { motion, useReducedMotion } from 'motion/react';

type TransformationProfileCardProps = {
  name: string;
  role: string;
  status: string;
  compact?: boolean;
};

export function TransformationProfileCard({
  name,
  role,
  status,
  compact = false
}: TransformationProfileCardProps) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      className={[
        'rounded-2xl border border-border bg-background/90 shadow-lg',
        compact ? 'p-3' : 'p-4'
      ].join(' ')}
      animate={
        reduceMotion
          ? undefined
          : {
              y: [0, -3, 0]
            }
      }
      transition={{
        duration: 4.8,
        repeat: Infinity,
        ease: 'easeInOut'
      }}>
      <div className="flex items-center gap-3">
        <div className="flex size-9 shrink-0 items-center justify-center rounded-full border border-border bg-surface-muted">
          <UserRound className="size-4 text-muted" />
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-1.5">
            <p className="truncate text-[10px] font-medium">
              {name}
            </p>
            <BadgeCheck className="size-3 shrink-0 text-[var(--theme-accent)]" />
          </div>

          <p className="mt-0.5 truncate font-mono text-[7px] uppercase tracking-[0.1em] text-muted">
            {role}
          </p>
        </div>
      </div>

      <div className="mt-3 flex items-center justify-between rounded-xl border border-border bg-surface-muted/30 px-3 py-2">
        <div className="flex items-center gap-2">
          <BriefcaseBusiness className="size-3 text-muted" />
          <span className="text-[8px] text-muted">
            {status}
          </span>
        </div>

        <MessageSquareText className="size-3 text-muted" />
      </div>
    </motion.div>
  );
}
