'use client';

import { motion, useReducedMotion } from 'motion/react';
import { Sparkles } from 'lucide-react';
import { useEffect, useState } from 'react';

import { CommerceCheckoutPanel } from './commerce/CommerceCheckoutPanel';
import { CommerceDetailPanel } from './commerce/CommerceDetailPanel';
import { CommerceDevice } from './commerce/CommerceDevice';
import { CommerceProductVisual } from './commerce/CommerceProductVisual';
import { COMMERCE_PRODUCTS } from './commerce/commerce-products';

const PRODUCT_DURATION = 3800;

export function CommerceEvolutionScene() {
  const reduceMotion = useReducedMotion();

  const [activeProduct, setActiveProduct] = useState(0);

  const product = COMMERCE_PRODUCTS[activeProduct];

  useEffect(() => {
    if (reduceMotion) {
      return;
    }

    const timer = window.setInterval(() => {
      setActiveProduct(current => (current + 1) % COMMERCE_PRODUCTS.length);
    }, PRODUCT_DURATION);

    return () => window.clearInterval(timer);
  }, [reduceMotion]);

  const productSelector = (
    <div
      className={[
        'mt-2 flex gap-2 overflow-x-auto pb-1',
        'scrollbar-none',
        'lg:grid lg:grid-cols-4 lg:gap-1.5 lg:overflow-visible lg:pb-0'
      ].join(' ')}>
      {COMMERCE_PRODUCTS.map((item, index) => (
        <button
          key={item.id}
          type="button"
          onClick={() => setActiveProduct(index)}
          aria-label={`Show ${item.name}`}
          className={[
            'relative w-[108px] shrink-0 overflow-hidden rounded-xl border p-1',
            'transition-colors sm:w-[120px]',
            'lg:w-auto',
            index === activeProduct
              ? 'border-[var(--theme-accent)] bg-[var(--theme-accent-faint)]'
              : 'border-border bg-surface-muted/20'
          ].join(' ')}>
          <CommerceProductVisual product={item} compact />

          <span className="mt-1 block truncate px-1 pb-0.5 text-left font-mono text-[5px] uppercase tracking-[0.07em] text-muted">
            {item.name}
          </span>
        </button>
      ))}
    </div>
  );

  return (
    <div className="relative overflow-hidden px-2 pb-3 sm:px-4 sm:pb-4 lg:min-h-[315px] lg:px-4">
      <motion.div
        aria-hidden="true"
        className="absolute bottom-0 left-[12%] h-36 w-[72%] rounded-full bg-[var(--theme-accent-soft)] blur-3xl"
        animate={
          reduceMotion
            ? undefined
            : {
                opacity: [0.18, 0.48, 0.18]
              }
        }
        transition={{
          duration: 6,
          repeat: Infinity
        }}
      />

      {/* MOBILE / TABLET */}
      <div className="relative rounded-[20px] border border-border-strong bg-background/90 p-2.5 shadow-2xl lg:hidden">
        <div className="mb-2 flex items-center justify-between gap-3 px-1">
          <div>
            <p className="font-mono text-[6px] uppercase tracking-[0.13em] text-[var(--theme-accent)]">
              Synchronized commerce
            </p>

            <p className="mt-1 text-[9px] font-medium">One product. Every surface updated.</p>
          </div>

          <Sparkles className="size-3.5 shrink-0 text-[var(--theme-accent)]" />
        </div>

        <div className="grid grid-cols-[minmax(0,0.92fr)_minmax(0,1.08fr)] items-stretch gap-2">
          <div className="flex min-w-0 items-center justify-center overflow-hidden rounded-[17px] border border-border bg-surface-muted/22 p-1.5 sm:p-2">
            <CommerceDevice product={product} />
          </div>

          <div className="min-w-0">
            <CommerceDetailPanel product={product} />
          </div>
        </div>

        <div className="mt-2">
          <CommerceCheckoutPanel product={product} />
        </div>

        {productSelector}
      </div>

      {/* DESKTOP */}
      <div className="relative hidden min-h-[295px] gap-3 rounded-[22px] border border-border-strong bg-background/90 p-3 shadow-2xl lg:grid lg:grid-cols-[0.48fr_1.2fr_0.58fr]">
        <div className="flex items-center justify-center rounded-[18px] border border-border bg-surface-muted/22 p-3">
          <CommerceDevice product={product} />
        </div>

        <div className="flex min-w-0 flex-col justify-center">
          <div className="mb-2 flex items-center justify-between gap-4">
            <div>
              <p className="font-mono text-[6px] uppercase tracking-[0.13em] text-[var(--theme-accent)]">
                Synchronized commerce
              </p>

              <p className="mt-1 text-[9px] font-medium">Product changes flow through every surface.</p>
            </div>

            <Sparkles className="size-3.5 shrink-0 text-[var(--theme-accent)]" />
          </div>

          <CommerceCheckoutPanel product={product} />

          {productSelector}
        </div>

        <div className="flex items-center">
          <CommerceDetailPanel product={product} />
        </div>
      </div>
    </div>
  );
}
