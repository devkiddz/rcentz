'use client';

import Image from 'next/image';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { useEffect, useState } from 'react';

type ServiceImageSliderProps = {
  images: readonly string[];
  alt: string;
  interval?: number;
  className?: string;
  imageClassName?: string;
};

export function ServiceImageSlider({
  images,
  alt,
  interval = 3600,
  className = '',
  imageClassName = ''
}: ServiceImageSliderProps) {
  const reduceMotion = useReducedMotion();
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (reduceMotion || images.length <= 1) {
      return;
    }

    const timer = window.setInterval(() => {
      setActiveIndex(current => (current + 1) % images.length);
    }, interval);

    return () => window.clearInterval(timer);
  }, [images.length, interval, reduceMotion]);

  const activeImage = images[activeIndex] ?? images[0];

  if (!activeImage) {
    return null;
  }

  return (
    <div className={['relative overflow-hidden bg-surface-muted', className].join(' ')}>
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={activeImage}
          className="absolute inset-0"
          initial={reduceMotion ? false : { opacity: 0, scale: 1.025 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={reduceMotion ? undefined : { opacity: 0, scale: 0.99 }}
          transition={{ duration: 0.55, ease: 'easeOut' }}>
          <Image
            src={activeImage}
            alt={`${alt} ${activeIndex + 1}`}
            fill
            sizes="(max-width: 768px) 90vw, 50vw"
            className={['object-cover', imageClassName].join(' ')}
          />
        </motion.div>
      </AnimatePresence>

      {images.length > 1 ? (
        <div className="absolute bottom-2.5 left-2.5 flex items-center gap-1.5 rounded-full border border-white/15 bg-black/35 px-2 py-1 backdrop-blur-md">
          {images.map((image, index) => (
            <span
              key={image}
              aria-hidden="true"
              className={[
                'block h-1 rounded-full transition-[width,opacity] duration-300',
                index === activeIndex ? 'w-4 bg-white opacity-95' : 'w-1 bg-white opacity-45'
              ].join(' ')}
            />
          ))}
        </div>
      ) : null}
    </div>
  );
}
