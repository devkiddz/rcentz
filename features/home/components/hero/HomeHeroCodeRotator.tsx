'use client';

import {
  AnimatePresence,
  motion,
  useReducedMotion
} from 'motion/react';
import {
  useEffect,
  useState
} from 'react';

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

const TYPE_STEP = 2;
const TYPE_SPEED = 42;
const HOLD_DURATION = 1900;

export function HomeHeroCodeRotator() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [typedLength, setTypedLength] = useState(0);
  const reduceMotion = Boolean(useReducedMotion());

  const activeContext = CODE_CONTEXTS[activeIndex];

  useEffect(() => {
    if (reduceMotion || typedLength >= activeContext.code.length) {
      return;
    }

    const timeout = window.setTimeout(() => {
      setTypedLength(current =>
        Math.min(current + TYPE_STEP, activeContext.code.length)
      );
    }, TYPE_SPEED);

    return () => {
      window.clearTimeout(timeout);
    };
  }, [activeContext.code, reduceMotion, typedLength]);

  useEffect(() => {
    if (reduceMotion || typedLength !== activeContext.code.length) {
      return;
    }

    const timeout = window.setTimeout(() => {
      setTypedLength(0);
      setActiveIndex(current => (current + 1) % CODE_CONTEXTS.length);
    }, HOLD_DURATION);

    return () => {
      window.clearTimeout(timeout);
    };
  }, [activeContext.code.length, reduceMotion, typedLength]);

  const visibleTypedLength = reduceMotion
    ? activeContext.code.length
    : typedLength;

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
      <div className="flex h-10 items-center justify-between border-b border-border px-4">
        <div className="flex items-center gap-2">
          <span className="size-1.5 rounded-full bg-theme-accent" />

          <AnimatePresence initial={false} mode="wait">
            <motion.span
              key={activeContext.file}
              initial={reduceMotion ? false : { y: 4, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={reduceMotion ? undefined : { y: -4, opacity: 0 }}
              transition={{
                duration: 0.26,
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
                duration: 0.28
              }}
              className={[
                'h-1 rounded-full',
                index === activeIndex ? 'bg-theme-accent' : 'bg-border-strong'
              ].join(' ')}
            />
          ))}
        </div>
      </div>

      <div className="relative h-[220px] overflow-hidden sm:h-[232px] lg:h-[245px]">
        <AnimatePresence initial={false} mode="wait">
          <motion.div
            key={activeIndex}
            initial={reduceMotion ? false : { y: 12, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={reduceMotion ? undefined : { y: -10, opacity: 0 }}
            transition={{
              duration: 0.38,
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

                {!reduceMotion ? (
                  <motion.span
                    aria-hidden="true"
                    animate={{
                      opacity: [1, 0.18, 1]
                    }}
                    transition={{
                      duration: 0.9,
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

      <div className="flex items-center justify-between border-t border-border px-5 py-3">
        <div className="flex items-center gap-2">
          <span className="relative flex size-1.5">
            <span className="absolute inline-flex size-full animate-ping rounded-full bg-theme-accent opacity-30" />
            <span className="relative inline-flex size-1.5 rounded-full bg-theme-accent" />
          </span>

          <span className="font-mono text-[8px] uppercase tracking-[0.12em] text-muted">
            Rcentz system
          </span>
        </div>

        <span className="font-mono text-[8px] text-muted">
          {String(activeIndex + 1).padStart(2, '0')}/
          {String(CODE_CONTEXTS.length).padStart(2, '0')}
        </span>
      </div>
    </div>
  );
}
