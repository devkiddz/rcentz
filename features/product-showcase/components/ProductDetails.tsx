import Link from 'next/link';

import { ArrowUpRight } from 'lucide-react';

import { motion } from 'motion/react';

import type { RcentzProduct } from '@/features/products/server/get-products';

import { formatProductStage, getProductHref, getProductSummary } from '../lib/product-showcase';

import styles from '../styles/ProductShowcase.module.css';

type ProductDetailsProps = {
  product: RcentzProduct;
};

function ProductState({ product }: { product: RcentzProduct }) {
  return (
    <div className={styles.productState}>
      <span className={styles.stage}>
        {product.isReleased ? 'Released' : formatProductStage(product.stage)}
      </span>

      {product.currentVersion ? <span className={styles.meta}>{product.currentVersion}</span> : null}
    </div>
  );
}

function ProductProgress({ product }: { product: RcentzProduct }) {
  /*
    A released product represents a completed
    production cycle in this homepage presentation.

    Therefore released products always display 100%.
  */
  const rawProgress = product.isReleased ? 100 : product.progress;

  if (rawProgress === null) {
    return null;
  }

  const progress = Math.min(Math.max(rawProgress, 0), 100);

  /*
    Keep the physical marker inside the track
    while preserving the truthful displayed value.
  */
  const markerPosition = Math.min(Math.max(progress, 2), 98);

  return (
    <div
      className={styles.progressBlock}
      role="meter"
      aria-label={`${product.name} production progress`}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={progress}>
      <div className={styles.progressHeader}>
        <span>Production</span>

        <span>{product.isReleased ? 'Release complete' : 'Current development'}</span>
      </div>

      <div className={styles.progressTrackArea}>
        <div className={styles.progressTrack}>
          <motion.span
            className={styles.progressFill}
            initial={{
              width: '0%'
            }}
            animate={{
              width: `${progress}%`
            }}
            transition={{
              duration: 0.72,
              ease: [0.22, 1, 0.36, 1]
            }}
          />

          <motion.div
            className={styles.progressMarker}
            initial={{
              left: '2%'
            }}
            animate={{
              left: `${markerPosition}%`
            }}
            transition={{
              duration: 0.72,
              ease: [0.22, 1, 0.36, 1]
            }}>
            <motion.span
              className={styles.progressValue}
              initial={{
                y: 4
              }}
              animate={{
                y: 0
              }}
              transition={{
                duration: 0.3
              }}>
              {progress}%
            </motion.span>

            <span className={styles.progressPoint}>
              <motion.span
                aria-hidden="true"
                className={styles.progressPulse}
                animate={{
                  scale: [1, 1.9, 1.9],
                  opacity: [0.58, 0, 0]
                }}
                transition={{
                  duration: 2.1,
                  repeat: Infinity,
                  ease: 'easeOut',
                  times: [0, 0.72, 1]
                }}
              />
            </span>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

export function ProductDetails({ product }: ProductDetailsProps) {
  const summary = getProductSummary(product);

  return (
    <div className={styles.details}>
      <ProductState product={product} />

      <ProductProgress product={product} />

      <div className={styles.identityMark} />

      <div>
        <h3 className={styles.productName}>{product.name}</h3>

        {product.tagline ? <p className={styles.tagline}>{product.tagline}</p> : null}

        {summary ? <p className={styles.summary}>{summary}</p> : null}
      </div>

      <div className={styles.detailsFooter}>
        <motion.div
          whileHover={{
            y: -2
          }}
          whileTap={{
            scale: 0.98
          }}>
          <Link href={getProductHref(product)} className={styles.exploreAction}>
            Explore product
            <ArrowUpRight aria-hidden="true" className="size-3.5" />
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
