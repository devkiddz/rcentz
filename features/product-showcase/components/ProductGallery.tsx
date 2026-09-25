import { ArrowLeft, ArrowRight } from 'lucide-react';

import { AnimatePresence, motion } from 'motion/react';

import { useState } from 'react';

import type { RcentzProduct } from '@/features/products/server/get-products';

import { getProductVisuals } from '../lib/product-showcase';

import { ProductPreviewMock } from './ProductPreviewMock';

import styles from '../styles/ProductShowcase.module.css';

type ProductGalleryProps = {
  product: RcentzProduct;
};

const LAYERS = [styles.galleryFront, styles.galleryMiddle, styles.galleryBack, styles.galleryRear];

export function ProductGallery({ product }: ProductGalleryProps) {
  const visuals = getProductVisuals(product);

  const [activeIndex, setActiveIndex] = useState(0);

  const visible = Array.from(
    {
      length: Math.min(visuals.length, 4)
    },
    (_, layer) => {
      const index = (activeIndex + layer) % visuals.length;

      return {
        visual: visuals[index],
        index,
        layer
      };
    }
  );

  function previous() {
    setActiveIndex(current => (current === 0 ? visuals.length - 1 : current - 1));
  }

  function next() {
    setActiveIndex(current => (current + 1) % visuals.length);
  }

  return (
    <div className={styles.gallery}>
      <div className={styles.galleryControls}>
        <motion.button
          type="button"
          aria-label="Previous gallery visual"
          onClick={previous}
          whileHover={{
            x: -2
          }}
          whileTap={{
            scale: 0.94
          }}
          className={styles.galleryControl}>
          <ArrowLeft className="size-3.5" />
        </motion.button>

        <motion.button
          type="button"
          aria-label="Next gallery visual"
          onClick={next}
          whileHover={{
            x: 2
          }}
          whileTap={{
            scale: 0.94
          }}
          className={styles.galleryControl}>
          <ArrowRight className="size-3.5" />
        </motion.button>
      </div>

      <div className={styles.galleryStage}>
        <AnimatePresence initial={false}>
          {visible
            .slice()
            .reverse()
            .map(({ visual, index, layer }) => (
              <motion.button
                type="button"
                key={visual.id}
                layout
                layoutId={`product-gallery-${product.id}-${visual.id}`}
                aria-label={`Show ${visual.galleryName}`}
                onClick={() => setActiveIndex(index)}
                initial={{
                  y: 18,
                  scale: 0.95
                }}
                animate={{
                  y: 0,
                  scale: 1
                }}
                exit={{
                  y: -10,
                  scale: 0.96
                }}
                whileHover={{
                  y: -7,
                  scale: layer === 0 ? 1.015 : 1.025
                }}
                transition={{
                  layout: {
                    type: 'spring',
                    stiffness: 240,
                    damping: 28,
                    mass: 0.8
                  },

                  y: {
                    type: 'spring',
                    stiffness: 260,
                    damping: 30
                  },

                  scale: {
                    type: 'spring',
                    stiffness: 280,
                    damping: 30
                  }
                }}
                style={{
                  opacity: layer === 0 ? 1 : 0.88
                }}
                className={[styles.galleryCard, LAYERS[layer]].join(' ')}>
                {visual.url ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={visual.url}
                    alt={visual.alt ?? `${product.name} ${visual.galleryName}`}
                    className={styles.galleryImage}
                  />
                ) : (
                  <ProductPreviewMock product={product} visual={visual} />
                )}
              </motion.button>
            ))}
        </AnimatePresence>
      </div>

      <div className={styles.galleryPagination}>
        {visuals.map((visual, index) => (
          <motion.button
            type="button"
            key={visual.id}
            aria-label={`Show ${visual.galleryName}`}
            onClick={() => setActiveIndex(index)}
            whileHover={{
              scale: 1.25
            }}
            whileTap={{
              scale: 0.9
            }}
            className={[styles.galleryDot, index === activeIndex ? styles.galleryDotActive : ''].join(' ')}
          />
        ))}
      </div>
    </div>
  );
}
