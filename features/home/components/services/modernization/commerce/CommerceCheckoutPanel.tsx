'use client';

import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { CreditCard, LockKeyhole } from 'lucide-react';

import type { CommerceProduct } from './commerce-products';
import { CommerceProductVisual } from './CommerceProductVisual';

type CommerceCheckoutPanelProps = {
  product: CommerceProduct;
};

export function CommerceCheckoutPanel({ product }: CommerceCheckoutPanelProps) {
  const reduceMotion = useReducedMotion();

  return (
    <div className="overflow-hidden rounded-[16px] border border-border bg-background/94 shadow-xl sm:rounded-[18px]">
      <div className="flex h-8 items-center gap-2 border-b border-border px-3">
        <span className="size-1.5 rounded-full bg-border-strong" />
        <span className="size-1.5 rounded-full bg-border-strong" />
        <span className="size-1.5 rounded-full bg-border-strong" />

        <div className="ml-auto flex items-center gap-1 rounded-full border border-border px-2 py-1">
          <LockKeyhole className="size-2.5 text-muted" />

          <span className="font-mono text-[5px] text-muted">secure checkout</span>
        </div>
      </div>

      <div className="grid sm:grid-cols-[1fr_0.78fr]">
        <div className="p-2.5 sm:p-3">
          <p className="font-mono text-[6px] uppercase tracking-[0.1em] text-muted">Payment method</p>

          <div className="mt-2 grid grid-cols-3 gap-1.5 sm:mt-3 sm:block sm:space-y-2">
            {['Card', 'Bank transfer', 'Wallet'].map((item, index) => (
              <motion.div
                key={item}
                className={[
                  'flex min-w-0 items-center gap-1.5 rounded-xl border px-2 py-2 sm:gap-2 sm:px-3',
                  index === 0 ? 'border-border-strong bg-surface-raised' : 'border-border bg-surface-muted/25'
                ].join(' ')}
                animate={
                  reduceMotion || index !== 0
                    ? undefined
                    : {
                        borderColor: ['var(--border)', 'var(--theme-accent)', 'var(--border)']
                      }
                }
                transition={{
                  duration: 4,
                  repeat: Infinity
                }}>
                <CreditCard className="size-2.5 shrink-0 text-muted sm:size-3" />

                <span className="truncate text-[6px] text-muted sm:text-[7px]">{item}</span>
              </motion.div>
            ))}
          </div>

          <div className="mt-2.5 h-7 rounded-lg bg-[var(--theme-accent)] sm:mt-3" />
        </div>

        <div className="hidden border-l border-border p-3 sm:block">
          <CommerceProductVisual product={product} compact />

          <div className="relative mt-2 h-[48px] overflow-hidden">
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
                <p className="truncate text-[7px] font-medium">{product.name}</p>

                <p className="mt-1 text-[10px] font-semibold">{product.price}</p>

                <p className="mt-1 font-mono text-[5px] uppercase tracking-[0.08em] text-muted">
                  {product.inventory}
                </p>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}
