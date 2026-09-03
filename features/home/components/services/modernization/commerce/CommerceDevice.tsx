'use client';

import {
  AnimatePresence,
  motion,
  useReducedMotion
} from 'motion/react';
import { Check, Wifi } from 'lucide-react';

import type { CommerceProduct } from './commerce-products';
import { CommerceProductVisual } from './CommerceProductVisual';

type CommerceDeviceProps = {
  product: CommerceProduct;
};

export function CommerceDevice({
  product
}: CommerceDeviceProps) {
  const reduceMotion = useReducedMotion();

  return (
    <div className="relative mx-auto w-[154px] rounded-[29px] border-[5px] border-foreground/90 bg-background p-2 shadow-2xl">
      <div className="mb-2 flex items-center justify-between px-1">
        <span className="font-mono text-[5px] text-muted">
          09:41
        </span>
        <div className="h-1.5 w-10 rounded-full bg-foreground/80" />
        <Wifi className="size-2.5 text-muted" />
      </div>

      <CommerceProductVisual
        product={product}
        compact
      />

      <div className="relative h-[92px] overflow-hidden">
        <AnimatePresence mode="popLayout" initial={false}>
          <motion.div
            key={product.id}
            className="absolute inset-0 px-1 pb-1 pt-2"
            initial={
              reduceMotion
                ? false
                : { y: '100%' }
            }
            animate={{ y: 0 }}
            exit={
              reduceMotion
                ? undefined
                : { y: '-100%' }
            }
            transition={{
              duration: 0.55,
              ease: [0.22, 1, 0.36, 1]
            }}>
            <p className="truncate text-[8px] font-medium">
              {product.name}
            </p>

            <div className="mt-1 flex items-end justify-between">
              <p className="text-sm font-semibold tracking-[-0.04em]">
                {product.price}
              </p>

              <span className="font-mono text-[5px] uppercase tracking-[0.08em] text-muted">
                Qty {product.qty}
              </span>
            </div>

            <div className="mt-3 flex items-center gap-1.5 rounded-lg bg-[var(--theme-accent)] px-2 py-2 text-background">
              <Check className="size-3" />
              <span className="font-mono text-[6px] uppercase tracking-[0.09em]">
                Pay now
              </span>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
