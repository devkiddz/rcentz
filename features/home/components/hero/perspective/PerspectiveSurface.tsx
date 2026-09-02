'use client';

import { motion } from 'motion/react';

export function PerspectiveSurface() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 overflow-hidden rounded-[inherit]">
      <div
        className={[
          'absolute inset-0',
          'bg-[linear-gradient(to_right,var(--theme-accent-faint)_1px,transparent_1px),linear-gradient(to_bottom,var(--theme-accent-faint)_1px,transparent_1px)]',
          'bg-[size:18px_18px]',
          'opacity-45'
        ].join(' ')}
      />

      <motion.span
        animate={{ opacity: [0.12, 0.9, 0.12], scale: [0.7, 1.2, 0.7] }}
        transition={{ duration: 2.8, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute left-[20%] top-[24%] size-1 rounded-full bg-theme-accent shadow-[0_0_10px_var(--theme-accent)]"
      />

      <motion.span
        animate={{ opacity: [0.08, 0.7, 0.08] }}
        transition={{ duration: 3.4, repeat: Infinity, delay: 0.65 }}
        className="absolute bottom-[18%] right-[18%] size-1 rounded-full bg-theme-accent"
      />
    </div>
  );
}
