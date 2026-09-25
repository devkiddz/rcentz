import { motion } from 'motion/react';

import type { RcentzProduct } from '@/features/products/server/get-products';

import { getProductAccent } from '../lib/product-identities';

import styles from '../styles/ProductShowcase.module.css';

type ProductSelectorProps = {
  product: RcentzProduct;

  active: boolean;

  onSelect: () => void;
};

export function ProductSelector({ product, active, onSelect }: ProductSelectorProps) {
  const accent = getProductAccent(product.slug);

  return (
    <motion.button
      type="button"
      role="tab"
      aria-selected={active}
      data-accent={accent}
      data-active={active ? 'true' : 'false'}
      onClick={onSelect}
      whileHover={{
        y: -2
      }}
      whileTap={{
        scale: 0.97
      }}
      className={styles.selector}>
      {active ? (
        <motion.span
          layoutId="rcentz-product-selector"
          className={styles.selectorActiveSurface}
          transition={{
            type: 'spring',
            stiffness: 420,
            damping: 36
          }}
        />
      ) : null}

      <span className={styles.selectorLabel}>{product.name}</span>
    </motion.button>
  );
}
