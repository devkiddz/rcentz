'use client';

import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { Check, Wifi } from 'lucide-react';

import type { CommerceProduct } from './commerce-products';
import { CommerceProductVisual } from './CommerceProductVisual';

type CommerceDeviceProps = {
  product: CommerceProduct;
};

export function CommerceDevice({ product }: CommerceDeviceProps) {
  const reduceMotion = useReducedMotion();

  return (
    <div className="relative mx-auto w-full max-w-[132px] rounded-[25px] border-[4px] border-foreground/90 bg-background p-1.5 shadow-2xl sm:max-w-[154px] sm:rounded-[29px] sm:border-[5px] sm:p-2">
      <div className="mb-1.5 flex items-center justify-between px-1 sm:mb-2">
        <span className="font-mono text-[4px] text-muted sm:text-[5px]">09:41</span>

        <div className="h-1.5 w-8 rounded-full bg-foreground/80 sm:w-10" />

        <Wifi className="size-2 text-muted sm:size-2.5" />
      </div>

      <CommerceProductVisual product={product} compact />

      <div className="relative h-[86px] overflow-hidden sm:h-[92px]">
        <AnimatePresence mode="popLayout" initial={false}>
          <motion.div
            key={product.id}
            className="absolute inset-0 px-1 pb-1 pt-2"
            initial={reduceMotion ? false : { y: '100%' }}
            animate={{ y: 0 }}
            exit={reduceMotion ? undefined : { y: '-100%' }}
            transition={{
              duration: 0.55,
              ease: [0.22, 1, 0.36, 1]
            }}>
            <p className="truncate text-[7px] font-medium sm:text-[8px]">{product.name}</p>

            <div className="mt-1 flex items-end justify-between gap-1">
              <p className="truncate text-[12px] font-semibold tracking-[-0.04em] sm:text-sm">
                {product.price}
              </p>

              <span className="shrink-0 font-mono text-[4px] uppercase tracking-[0.08em] text-muted sm:text-[5px]">
                Qty {product.qty}
              </span>
            </div>

            <div className="mt-2.5 flex items-center gap-1.5 rounded-lg bg-[var(--theme-accent)] px-2 py-2 text-background sm:mt-3">
              <Check className="size-2.5 sm:size-3" />

              <span className="font-mono text-[5px] uppercase tracking-[0.09em] sm:text-[6px]">Pay now</span>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
