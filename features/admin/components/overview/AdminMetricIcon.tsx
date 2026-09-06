'use client';

import { BriefcaseBusiness, Clock3, FolderKanban, ReceiptText, UsersRound } from 'lucide-react';

import type { TargetAndTransition, Transition } from 'motion/react';

import { motion } from 'motion/react';

type AdminMetricMotion = 'pulse' | 'breathe' | 'orbit' | 'tick' | 'shimmer';

type AdminMetricIconName = 'requests' | 'projects' | 'clients' | 'milestones' | 'quotes';

type AdminMetricIconProps = {
  iconName: AdminMetricIconName;
  motionType: AdminMetricMotion;
};

type AdminMetricMotionConfiguration = {
  animate: TargetAndTransition;
  transition: Transition;
};

const adminMetricIcons = {
  requests: BriefcaseBusiness,
  projects: FolderKanban,
  clients: UsersRound,
  milestones: Clock3,
  quotes: ReceiptText
};

const iconMotionVariants: Record<AdminMetricMotion, AdminMetricMotionConfiguration> = {
  pulse: {
    animate: {
      scale: [1, 1.08, 1],
      opacity: [0.9, 1, 0.9]
    },
    transition: {
      duration: 2.8,
      repeat: Infinity,
      ease: 'easeInOut'
    }
  },

  breathe: {
    animate: {
      scale: [0.96, 1.06, 0.96]
    },
    transition: {
      duration: 3.6,
      repeat: Infinity,
      ease: 'easeInOut'
    }
  },

  orbit: {
    animate: {
      rotate: [0, 4, 0, -4, 0]
    },
    transition: {
      duration: 4.2,
      repeat: Infinity,
      ease: 'easeInOut'
    }
  },

  tick: {
    animate: {
      rotate: [0, 8, 0]
    },
    transition: {
      duration: 2.6,
      repeat: Infinity,
      ease: 'easeInOut'
    }
  },

  shimmer: {
    animate: {
      opacity: [0.75, 1, 0.75],
      scale: [1, 1.04, 1]
    },
    transition: {
      duration: 3.2,
      repeat: Infinity,
      ease: 'easeInOut'
    }
  }
};

export function AdminMetricIcon({ iconName, motionType }: AdminMetricIconProps) {
  const Icon = adminMetricIcons[iconName];

  const motionConfiguration = iconMotionVariants[motionType];

  return (
    <motion.div
      animate={motionConfiguration.animate}
      transition={motionConfiguration.transition}
      className="relative flex size-8 items-center justify-center">
      <motion.span
        aria-hidden="true"
        animate={{
          scale: [0.9, 1.15, 0.9],
          opacity: [0.08, 0.18, 0.08]
        }}
        transition={{
          duration: 3.4,
          repeat: Infinity,
          ease: 'easeInOut'
        }}
        className="absolute inset-0 rounded-full bg-theme-accent"
      />

      <span className="relative flex size-7 items-center justify-center rounded-full border border-theme-accent/20 bg-theme-accent-faint">
        <Icon aria-hidden="true" className="size-3.5 text-theme-accent" />
      </span>
    </motion.div>
  );
}

export type { AdminMetricIconName, AdminMetricMotion };
