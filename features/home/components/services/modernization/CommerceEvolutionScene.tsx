'use client';

import {
  motion,
  useReducedMotion
} from 'motion/react';
import {
  Sparkles
} from 'lucide-react';
import {
  useEffect,
  useState
} from 'react';

import { CommerceCheckoutPanel } from './commerce/CommerceCheckoutPanel';
import { CommerceDetailPanel } from './commerce/CommerceDetailPanel';
import { CommerceDevice } from './commerce/CommerceDevice';
import { CommerceProductVisual } from './commerce/CommerceProductVisual';
import { COMMERCE_PRODUCTS } from './commerce/commerce-products';

const PRODUCT_DURATION = 3800;

export function CommerceEvolutionScene() {
  const reduceMotion = useReducedMotion();
  const [
    activeProduct,
    setActiveProduct
  ] = useState(0);

  const product =
    COMMERCE_PRODUCTS[activeProduct];

  useEffect(() => {
    if (reduceMotion) {
      return;
    }

    const timer = window.setInterval(() => {
      setActiveProduct(
        current =>
          (current + 1) %
          COMMERCE_PRODUCTS.length
      );
    }, PRODUCT_DURATION);

    return () =>
      window.clearInterval(timer);
  }, [reduceMotion]);

  return (
    <div className="relative min-h-[315px] overflow-hidden px-4 pb-4 sm:px-5">
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

      <div className="relative grid min-h-[295px] gap-3 rounded-[22px] border border-border-strong bg-background/90 p-3 shadow-2xl lg:grid-cols-[0.48fr_1.2fr_0.58fr]">
        <div className="flex items-center justify-center rounded-[18px] border border-border bg-surface-muted/22 p-3">
          <CommerceDevice product={product} />
        </div>

        <div className="flex min-w-0 flex-col justify-center">
          <div className="mb-2 flex items-center justify-between gap-4">
            <div>
              <p className="font-mono text-[6px] uppercase tracking-[0.13em] text-[var(--theme-accent)]">
                Synchronized commerce
              </p>

              <p className="mt-1 text-[9px] font-medium">
                Product changes flow through every surface.
              </p>
            </div>

            <Sparkles className="size-3.5 shrink-0 text-[var(--theme-accent)]" />
          </div>

          <CommerceCheckoutPanel
            product={product}
          />

          <div className="mt-2 grid grid-cols-4 gap-1.5">
            {COMMERCE_PRODUCTS.map(
              (item, index) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() =>
                    setActiveProduct(index)
                  }
                  aria-label={`Show ${item.name}`}
                  className={[
                    'relative overflow-hidden rounded-xl border p-1 transition-colors',
                    index === activeProduct
                      ? 'border-[var(--theme-accent)] bg-[var(--theme-accent-faint)]'
                      : 'border-border bg-surface-muted/20'
                  ].join(' ')}>
                  <CommerceProductVisual
                    product={item}
                    compact
                  />

                  <span className="mt-1 block truncate px-1 pb-0.5 text-left font-mono text-[5px] uppercase tracking-[0.07em] text-muted">
                    {item.name}
                  </span>
                </button>
              )
            )}
          </div>
        </div>

        <div className="flex items-center">
          <CommerceDetailPanel
            product={product}
          />
        </div>
      </div>
    </div>
  );
}
