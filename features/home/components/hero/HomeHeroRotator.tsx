'use client';

import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { useEffect, useState } from 'react';

const HERO_CONTEXTS = [
  'Custom SaaS platforms engineered around real business workflows and operations.',

  'Commerce systems connecting products, customers, transactions and administration.',

  'Client platforms keeping projects, communication and business data connected.',

  'Reusable software foundations designed for products that need room to scale.',

  'Digital systems built around how real businesses actually operate.'
];

const ROTATION_DELAY = 4200;

export function HomeHeroRotator() {
  const [activeIndex, setActiveIndex] = useState(0);

  const reduceMotion = useReducedMotion();

  useEffect(() => {
    if (reduceMotion) {
      return;
    }

    const interval = window.setInterval(() => {
      setActiveIndex(current => (current + 1) % HERO_CONTEXTS.length);
    }, ROTATION_DELAY);

    return () => {
      window.clearInterval(interval);
    };
  }, [reduceMotion]);

  return (
    <div className="mt-6 max-w-[425px]">
      <div
        className="relative h-[78px] overflow-hidden sm:h-[84px]"
        style={{
          perspective: '700px'
        }}>
        <AnimatePresence initial={false} mode="popLayout">
          <motion.p
            key={activeIndex}
            initial={
              reduceMotion
                ? false
                : {
                    y: 22,
                    rotateX: -35,
                    opacity: 0
                  }
            }
            animate={{
              y: 0,
              rotateX: 0,
              opacity: 1
            }}
            exit={
              reduceMotion
                ? undefined
                : {
                    y: -22,
                    rotateX: 35,
                    opacity: 0
                  }
            }
            transition={{
              duration: 0.6,
              ease: [0.22, 1, 0.36, 1]
            }}
            style={{
              transformOrigin: 'center',
              backfaceVisibility: 'hidden'
            }}
            className={[
              'absolute inset-x-0 top-0',
              'max-w-[415px]',
              'text-[14px] leading-6 text-muted',
              'sm:text-[15px] sm:leading-7'
            ].join(' ')}>
            {HERO_CONTEXTS[activeIndex]}
          </motion.p>
        </AnimatePresence>
      </div>

      <div aria-hidden="true" className="mt-1 flex items-center gap-1.5">
        {HERO_CONTEXTS.map((_, index) => (
          <motion.span
            key={index}
            animate={{
              width: index === activeIndex ? 18 : 6,
              opacity: index === activeIndex ? 1 : 0.45
            }}
            transition={{
              duration: 0.35
            }}
            className={[
              'h-0.5 rounded-full',
              index === activeIndex ? 'bg-theme-accent' : 'bg-border-strong'
            ].join(' ')}
          />
        ))}
      </div>
    </div>
  );
}
