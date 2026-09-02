'use client';

import { Code2 } from 'lucide-react';
import { motion, useReducedMotion } from 'motion/react';
import { useEffect, useState } from 'react';

import { PerspectiveSurface } from '@/features/home/components/hero/perspective/PerspectiveSurface';

const CODE_LINES = [
  "export default function Hero() {",
  "  return (",
  '    <section className="hero">',
  '      <h1>We build websites</h1>',
  '      <p>that power business.</p>',
  '      <button>Let’s Talk</button>',
  '    </section>',
  '  );',
  '}'
] as const;

function TypedLine({
  text,
  active,
  done,
  reduceMotion
}: {
  text: string;
  active: boolean;
  done: boolean;
  reduceMotion: boolean;
}) {
  const [value, setValue] = useState(done || reduceMotion ? text : '');

  useEffect(() => {
    if (reduceMotion || done) {
      setValue(text);
      return;
    }

    if (!active) {
      setValue('');
      return;
    }

    let index = 0;
    const interval = window.setInterval(() => {
      index += 1;
      setValue(text.slice(0, index));

      if (index >= text.length) {
        window.clearInterval(interval);
      }
    }, 24);

    return () => {
      window.clearInterval(interval);
    };
  }, [active, done, reduceMotion, text]);

  return (
    <span>
      {value}
      {active && !done && !reduceMotion ? (
        <motion.span
          animate={{ opacity: [0, 1, 0] }}
          transition={{ duration: 0.7, repeat: Infinity }}
          className="ml-0.5 inline-block h-[1em] w-px translate-y-[0.1em] bg-theme-accent"
        />
      ) : null}
    </span>
  );
}

export function CodeTypingPanel() {
  const reduceMotion = Boolean(useReducedMotion());
  const [line, setLine] = useState(0);

  useEffect(() => {
    if (reduceMotion || line >= CODE_LINES.length - 1) {
      return;
    }

    const timeout = window.setTimeout(() => {
      setLine(current => current + 1);
    }, 620);

    return () => {
      window.clearTimeout(timeout);
    };
  }, [line, reduceMotion]);

  const visibleLine = reduceMotion ? CODE_LINES.length - 1 : line;

  return (
    <motion.div
      initial={reduceMotion ? false : { opacity: 0, x: 18, y: 14, scale: 0.94 }}
      animate={{ opacity: 1, x: 0, y: reduceMotion ? 0 : [0, -5, 0], scale: 1 }}
      transition={{
        opacity: { delay: reduceMotion ? 0 : 0.85, duration: 0.65 },
        x: { delay: reduceMotion ? 0 : 0.85, duration: 0.65, ease: [0.22, 1, 0.36, 1] },
        scale: { delay: reduceMotion ? 0 : 0.85, duration: 0.65 },
        y: { duration: 4.8, repeat: Infinity, ease: 'easeInOut', delay: 0.8 }
      }}
      className="relative overflow-hidden rounded-xl border border-border bg-background/98 p-3 shadow-2xl backdrop-blur-2xl">
      <PerspectiveSurface />

      <div className="relative z-10">
        <div className="flex items-center justify-between border-b border-border pb-2">
          <div className="flex items-center gap-2">
            <Code2 className="size-3 text-theme-accent" />
            <span className="font-mono text-[5.5px] text-muted">index.tsx</span>
          </div>

          <div className="flex gap-2 font-mono text-[4.5px] text-muted">
            <span>api.ts</span>
            <span>styles.css</span>
          </div>
        </div>

        <div className="mt-3 space-y-1 font-mono text-[5px] leading-[1.5] lg:text-[5.5px]">
          {CODE_LINES.map((text, index) => (
            <div
              key={`${text}-${index}`}
              className={index <= visibleLine ? 'text-foreground' : 'text-muted/22'}>
              <span className="mr-2 inline-block w-3 text-right text-muted/45">{index + 1}</span>
              <TypedLine
                text={text}
                active={index === visibleLine}
                done={index < visibleLine}
                reduceMotion={reduceMotion}
              />
            </div>
          ))}
        </div>

        <div className="mt-3 flex items-center justify-between border-t border-border pt-2 font-mono text-[4.5px] text-muted">
          <span>Ln {visibleLine + 1}, Col 25</span>
          <span>TypeScript</span>
        </div>
      </div>
    </motion.div>
  );
}
