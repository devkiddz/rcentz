'use client';

import { AnimatePresence, motion, useReducedMotion } from 'motion/react';

import { useEffect, useState } from 'react';

const CODE_CONTEXTS = [
  {
    file: 'system.ts',

    code: `const rcentz = createSystem({
  architecture: 'modular',
  application: 'Next.js',
  database: 'PostgreSQL',
  deployment: 'production'
})

return rcentz.launch()`
  },

  {
    file: 'homepage.ts',

    code: `const homepage =
  await getHomepageData()

return {
  services: homepage.services,
  projects: homepage.projects
}`
  },

  {
    file: 'project.ts',

    code: `const project = {
  milestones: 'tracked',
  progress: 'measured',
  activity: 'recorded',
  visibility: 'controlled'
}`
  },

  {
    file: 'services.ts',

    code: `const services = await db.service.findMany({
  status: 'ACTIVE',
  featured: true,
  include: {
    prices: true
  }
})`
  }
];

/*
 * A brief pause before typing starts.
 */
const INITIAL_WAKE_DELAY = 5500;

/*
 * Two characters per tick remains smooth,
 * while avoiding unnecessary render churn.
 */
const TYPE_STEP = 2;

const TYPE_SPEED = 48;

/*
 * This is the important change.
 *
 * Once a file finishes typing it sits there.
 * The next file does not immediately arrive.
 */
const MIN_HOLD_DURATION = 10500;

const MAX_HOLD_DURATION = 16500;

function getHoldDuration() {
  return Math.round(MIN_HOLD_DURATION + Math.random() * (MAX_HOLD_DURATION - MIN_HOLD_DURATION));
}

export function HomeHeroCodeRotator() {
  const [activeIndex, setActiveIndex] = useState(0);

  const [typedLength, setTypedLength] = useState(0);

  const [awake, setAwake] = useState(false);

  const reduceMotion = Boolean(useReducedMotion());

  const activeContext = CODE_CONTEXTS[activeIndex];

  /*
   * INITIAL STILLNESS
   */
  useEffect(() => {
    if (reduceMotion) {
      return;
    }

    const timeout = window.setTimeout(() => {
      setAwake(true);
    }, INITIAL_WAKE_DELAY);

    return () => {
      window.clearTimeout(timeout);
    };
  }, [reduceMotion]);

  /*
   * TYPE CURRENT FILE
   */
  useEffect(() => {
    if (reduceMotion || !awake || typedLength >= activeContext.code.length) {
      return;
    }

    const timeout = window.setTimeout(() => {
      setTypedLength(current =>
        Math.min(
          current + TYPE_STEP,

          activeContext.code.length
        )
      );
    }, TYPE_SPEED);

    return () => {
      window.clearTimeout(timeout);
    };
  }, [activeContext.code, awake, reduceMotion, typedLength]);

  /*
   * LONG QUIET PERIOD
   *
   * After typing completes the code remains
   * visible for 10.5–16.5 seconds.
   */
  useEffect(() => {
    if (reduceMotion || !awake || typedLength !== activeContext.code.length) {
      return;
    }

    const holdDuration = getHoldDuration();

    const timeout = window.setTimeout(() => {
      setTypedLength(0);

      setActiveIndex(current => (current + 1) % CODE_CONTEXTS.length);
    }, holdDuration);

    return () => {
      window.clearTimeout(timeout);
    };
  }, [activeContext.code.length, awake, reduceMotion, typedLength]);

  const visibleTypedLength = reduceMotion ? activeContext.code.length : typedLength;

  const typedCode = activeContext.code.slice(0, visibleTypedLength);

  return (
    <div
      className={[
        'relative overflow-hidden',
        'rounded-2xl',
        'border border-border',
        'bg-background/88',
        'shadow-2xl',
        'backdrop-blur-xl'
      ].join(' ')}>
      {/* =============================
          WINDOW HEADER
          ============================= */}

      <div className="flex h-10 items-center justify-between border-b border-border px-4">
        <div className="flex items-center gap-2">
          <span className="size-1.5 rounded-full bg-theme-accent" />

          <AnimatePresence initial={false} mode="wait">
            <motion.span
              key={activeContext.file}
              initial={
                reduceMotion
                  ? false
                  : {
                      y: 4,
                      opacity: 0
                    }
              }
              animate={{
                y: 0,
                opacity: 1
              }}
              exit={
                reduceMotion
                  ? undefined
                  : {
                      y: -4,
                      opacity: 0
                    }
              }
              transition={{
                duration: 0.3,

                ease: [0.22, 1, 0.36, 1]
              }}
              className="font-mono text-[9px] text-muted">
              {activeContext.file}
            </motion.span>
          </AnimatePresence>
        </div>

        <div className="flex items-center gap-1.5">
          {CODE_CONTEXTS.map((context, index) => (
            <motion.span
              key={context.file}
              animate={{
                width: index === activeIndex ? 14 : 5,

                opacity: index === activeIndex ? 1 : 0.4
              }}
              transition={{
                duration: 0.35
              }}
              className={[
                'h-1 rounded-full',

                index === activeIndex ? 'bg-theme-accent' : 'bg-border-strong'
              ].join(' ')}
            />
          ))}
        </div>
      </div>

      {/* =============================
          CODE STAGE
          ============================= */}

      <div className="relative h-[220px] overflow-hidden sm:h-[232px] lg:h-[245px]">
        <AnimatePresence initial={false} mode="wait">
          <motion.div
            key={activeIndex}
            initial={
              reduceMotion
                ? false
                : {
                    y: 10,
                    opacity: 0
                  }
            }
            animate={{
              y: 0,
              opacity: 1
            }}
            exit={
              reduceMotion
                ? undefined
                : {
                    y: -8,
                    opacity: 0
                  }
            }
            transition={{
              duration: 0.45,

              ease: [0.22, 1, 0.36, 1]
            }}
            style={{
              willChange: reduceMotion ? 'auto' : 'transform, opacity'
            }}
            className="absolute inset-0 transform-gpu p-5">
            <pre
              className={[
                'whitespace-pre-wrap',
                'font-mono',
                'text-[10px]',
                'leading-[1.8]',
                'text-muted',
                'sm:text-[11px]'
              ].join(' ')}>
              <code>
                {typedCode}

                {!reduceMotion && awake && typedLength < activeContext.code.length ? (
                  <motion.span
                    aria-hidden="true"
                    animate={{
                      opacity: [1, 0.18, 1]
                    }}
                    transition={{
                      duration: 1,

                      repeat: Infinity,

                      ease: 'easeInOut'
                    }}
                    className="ml-0.5 inline-block h-[1em] w-[2px] translate-y-[2px] bg-theme-accent"
                  />
                ) : null}
              </code>
            </pre>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* =============================
          STATUS
          ============================= */}

      <div className="flex items-center justify-between border-t border-border px-5 py-3">
        <div className="flex items-center gap-2">
          <span className="relative flex size-1.5">
            <span className="absolute inline-flex size-full animate-ping rounded-full bg-theme-accent opacity-25" />

            <span className="relative inline-flex size-1.5 rounded-full bg-theme-accent" />
          </span>

          <span className="font-mono text-[8px] uppercase tracking-[0.12em] text-muted">Rcentz system</span>
        </div>

        <span className="font-mono text-[8px] text-muted">
          {String(activeIndex + 1).padStart(2, '0')}/{String(CODE_CONTEXTS.length).padStart(2, '0')}
        </span>
      </div>
    </div>
  );
}
