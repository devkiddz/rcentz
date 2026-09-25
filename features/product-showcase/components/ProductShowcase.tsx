'use client';

import { MotionConfig, motion } from 'motion/react';

import { useState } from 'react';

import type { RcentzProduct } from '@/features/products/server/get-products';

import { getProductAccent } from '../lib/product-identities';

import { ProductDetails } from './ProductDetails';
import { ProductGallery } from './ProductGallery';
import { ProductSelector } from './ProductSelector';

import styles from '../styles/ProductShowcase.module.css';

type ProductShowcaseProps = {
  products: RcentzProduct[];
};

type SelectionState = {
  slug: string;
  direction: 1 | -1;
};

export function ProductShowcase({ products }: ProductShowcaseProps) {
  const initialProduct = products.find(product => product.featured) ?? products[0];

  const [selection, setSelection] = useState<SelectionState>({
    slug: initialProduct?.slug ?? '',
    direction: 1
  });

  if (!initialProduct) {
    return null;
  }

  const selectedIndex = products.findIndex(product => product.slug === selection.slug);

  const safeSelectedIndex = selectedIndex >= 0 ? selectedIndex : 0;

  const selectedProduct = products[safeSelectedIndex] ?? initialProduct;

  const accent = getProductAccent(selectedProduct.slug);

  function selectProduct(product: RcentzProduct) {
    const nextIndex = products.findIndex(candidate => candidate.slug === product.slug);

    if (nextIndex < 0 || nextIndex === safeSelectedIndex) {
      return;
    }

    setSelection({
      slug: product.slug,

      direction: nextIndex > safeSelectedIndex ? 1 : -1
    });
  }

  return (
    <MotionConfig reducedMotion="user">
      <section id="products" className="rcentz-section border-t border-border py-16 sm:py-20">
        <motion.div
          initial={{
            opacity: 0,
            y: 12
          }}
          whileInView={{
            opacity: 1,
            y: 0
          }}
          viewport={{
            once: true,
            amount: 0.25
          }}
          transition={{
            duration: 0.4,
            ease: [0.22, 1, 0.36, 1]
          }}
          className="max-w-3xl">
          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted">Our Products</p>

          <h2 className="mt-3 text-3xl font-semibold tracking-[-0.045em] sm:text-4xl">
            Built by Rcentz. <span className="text-muted">Growing through real use.</span>
          </h2>

          <p className="mt-4 max-w-xl text-sm leading-6 text-muted sm:text-base">
            Products being built, tested and operated across Rcentz.
          </p>
        </motion.div>

        <div data-accent={accent} className={styles.showcase}>
          <div
            role="tablist"
            aria-label="Rcentz products"
            className={['rcentz-scroll-hidden', styles.selectorRail].join(' ')}>
            {products.map(product => (
              <ProductSelector
                key={product.id}
                product={product}
                active={product.slug === selectedProduct.slug}
                onSelect={() => selectProduct(product)}
              />
            ))}
          </div>

          <div className={styles.slideViewport}>
            <motion.div
              key={selectedProduct.id}
              initial={{
                x: selection.direction > 0 ? 42 : -42
              }}
              animate={{
                x: 0
              }}
              transition={{
                duration: 0.22,
                ease: [0.22, 1, 0.36, 1]
              }}
              className={styles.productBody}>
              <ProductDetails product={selectedProduct} />

              <ProductGallery product={selectedProduct} />
            </motion.div>
          </div>
        </div>
      </section>
    </MotionConfig>
  );
}
