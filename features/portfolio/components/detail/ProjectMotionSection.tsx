'use client';

import type { ReactNode } from 'react';

import { motion, useReducedMotion } from 'motion/react';
type ProjectMotionSectionProps = {
  children: ReactNode;
  delay?: number;
  className?: string;
};

export function ProjectMotionSection({ children, delay = 0, className }: ProjectMotionSectionProps) {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 28,
        scale: 0.992
      }}
      whileInView={{
        opacity: 1,
        y: 0,
        scale: 1
      }}
      viewport={{
        once: true,
        amount: 0.16
      }}
      transition={{
        duration: 0.75,
        delay,
        ease: [0.22, 1, 0.36, 1]
      }}
      className={className}>
      {children}
    </motion.div>
  );
}
