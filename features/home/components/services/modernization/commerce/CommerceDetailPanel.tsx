'use client';

import {
  AnimatePresence,
  motion,
  useReducedMotion
} from 'motion/react';
import {
  PackageCheck,
  UserRound
} from 'lucide-react';

import type { CommerceProduct } from './commerce-products';

type CommerceDetailPanelProps = {
  product: CommerceProduct;
};

export function CommerceDetailPanel({
  product
}: CommerceDetailPanelProps) {
  const reduceMotion = useReducedMotion();

  return (
    <div className="space-y-2">
      <div className="rounded-[18px] border border-border bg-background/90 p-3 shadow-lg">
        <div className="flex items-center gap-3">
          <div className="flex size-8 items-center justify-center rounded-full border border-border bg-surface-muted">
            <UserRound className="size-3.5 text-muted" />
          </div>

          <div>
            <p className="text-[8px] font-medium">
              Customer profile
            </p>
            <p className="mt-0.5 font-mono text-[5px] uppercase tracking-[0.1em] text-muted">
              Returning buyer
            </p>
          </div>
        </div>
      </div>

      <div className="overflow-hidden rounded-[18px] border border-border bg-background/90 p-3 shadow-lg">
        <div className="flex items-center justify-between">
          <div>
            <p className="font-mono text-[6px] uppercase tracking-[0.1em] text-muted">
              Live order
            </p>
            <p className="mt-1 text-[9px] font-medium">
              Order summary
            </p>
          </div>

          <PackageCheck className="size-3.5 text-[var(--theme-accent)]" />
        </div>

        <div className="relative mt-3 h-[92px] overflow-hidden">
          <AnimatePresence mode="popLayout" initial={false}>
            <motion.div
              key={product.id}
              className="absolute inset-0 space-y-2"
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
              <div className="flex items-center justify-between text-[7px]">
                <span className="text-muted">
                  Product
                </span>
                <span className="max-w-[90px] truncate font-medium">
                  {product.name}
                </span>
              </div>

              <div className="flex items-center justify-between text-[7px]">
                <span className="text-muted">
                  Inventory
                </span>
                <span>{product.inventory}</span>
              </div>

              <div className="flex items-center justify-between text-[7px]">
                <span className="text-muted">
                  Qty
                </span>
                <span>{product.qty}</span>
              </div>

              <div className="border-t border-border pt-2 text-right text-[10px] font-semibold">
                {product.price}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
