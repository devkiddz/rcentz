'use client';

import { AnimatePresence, motion, useReducedMotion } from 'motion/react';

import type { CommerceProduct } from './commerce-products';

type CommerceProductVisualProps = {
  product: CommerceProduct;
  compact?: boolean;
};

export function CommerceProductVisual({ product, compact = false }: CommerceProductVisualProps) {
  const reduceMotion = useReducedMotion();

  return (
    <div
      className={[
        'relative overflow-hidden rounded-2xl border border-border',
        compact ? 'h-24' : 'h-32'
      ].join(' ')}
      style={{
        backgroundColor: product.visual.background
      }}>
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.div
          key={product.id}
          className="absolute inset-0"
          initial={reduceMotion ? false : { y: '100%' }}
          animate={{ y: 0 }}
          exit={reduceMotion ? undefined : { y: '-100%' }}
          transition={{
            duration: 0.55,
            ease: [0.22, 1, 0.36, 1]
          }}>
          <div
            role="img"
            aria-label={product.name}
            className="absolute inset-0 bg-contain bg-center bg-no-repeat"
            style={{
              backgroundImage: `url("${product.image}")`,
              backgroundColor: product.visual.background,
              transform: `translate3d(
                ${product.visual.x},
                ${product.visual.y},
                0
              ) scale(${product.visual.scale})`,
              transformOrigin: 'center'
            }}
          />
        </motion.div>
      </AnimatePresence>

      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-8 bg-gradient-to-t from-black/10 to-transparent" />
    </div>
  );
}
