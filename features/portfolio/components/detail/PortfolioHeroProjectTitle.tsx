'use client';

import { motion, useReducedMotion } from 'motion/react';

type PortfolioHeroProjectTitleProps = {
  title: string;
};

export function PortfolioHeroProjectTitle({ title }: PortfolioHeroProjectTitleProps) {
  const reduceMotion = Boolean(useReducedMotion());

  const words = title.split(' ');

  return (
    <div className="relative mx-auto mt-4 w-full max-w-[940px] px-2 sm:px-4">
      {/* Ambient energy field */}
      <motion.div
        aria-hidden="true"
        initial={false}
        animate={
          reduceMotion
            ? { opacity: 0.08 }
            : {
                opacity: [0.04, 0.1, 0.05, 0.12, 0.04],
                scaleX: [0.88, 1, 1.06, 0.96, 0.88],
                scaleY: [0.78, 0.92, 1, 0.9, 0.78]
              }
        }
        transition={reduceMotion ? undefined : { duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        className="pointer-events-none absolute left-1/2 top-1/2 h-[85%] w-[118%] -translate-x-1/2 -translate-y-1/2 rounded-[50%] bg-theme-accent/12 blur-[52px]"
      />

      {/* Main Project Name */}
      <h1
        aria-label={title}
        className="relative text-center text-[2.25rem] font-semibold leading-[1.12] tracking-[-0.04em] text-foreground [overflow-wrap:anywhere] min-[400px]:text-[2.8rem] sm:text-[4.2rem] lg:text-[5.6rem]">
        <span
          aria-hidden="true"
          className="relative inline-flex flex-wrap justify-center gap-x-[0.25em] gap-y-[0.1em] [perspective:800px]">
          {words.map((word, wordIdx) => {
            const charOffset = words.slice(0, wordIdx).reduce((acc, curr) => acc + curr.length, 0);

            return (
              <span key={`word-${wordIdx}`} className="inline-flex flex-wrap whitespace-normal">
                {Array.from(word).map((character, charIdx) => {
                  const globalIdx = charOffset + charIdx;

                  return (
                    <span
                      key={`char-${globalIdx}`}
                      className="relative inline-block overflow-visible pb-[0.06em]">
                      <motion.span
                        initial={
                          reduceMotion
                            ? false
                            : {
                                opacity: 0,
                                y: '0.65em',
                                rotateX: -55,
                                filter: 'blur(8px)'
                              }
                        }
                        animate={{
                          opacity: 1,
                          y: 0,
                          rotateX: 0,
                          filter: 'blur(0px)'
                        }}
                        transition={{
                          duration: 0.75,
                          delay: reduceMotion ? 0 : 0.06 + globalIdx * 0.035,
                          ease: [0.22, 1, 0.36, 1]
                        }}
                        style={{
                          transformOrigin: '50% 100%',
                          transformStyle: 'preserve-3d'
                        }}
                        className="inline-block">
                        {character}
                      </motion.span>
                    </span>
                  );
                })}
              </span>
            );
          })}
        </span>

        {/* Dynamic Multi-Tone Sweep Overlay Layer */}
        {!reduceMotion ? (
          <motion.span
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 flex flex-wrap justify-center gap-x-[0.25em] gap-y-[0.1em] text-center text-transparent bg-clip-text [-webkit-background-clip:text] [-webkit-text-fill-color:transparent]"
            style={{
              backgroundImage: `
                linear-gradient(
                  102deg,
                  transparent 0%,
                  transparent 36%,
                  var(--theme-accent) 42%,
                  #f97316 46%,
                  var(--foreground) 50%,
                  #ef4444 54%,
                  var(--theme-accent-strong) 58%,
                  transparent 64%,
                  transparent 100%
                )
              `,
              backgroundSize: '300% 100%',
              backgroundRepeat: 'no-repeat'
            }}
            initial={{ backgroundPosition: '185% 50%' }}
            animate={{
              backgroundPosition: ['185% 50%', '150% 50%', '92% 50%', '35% 50%', '-35% 50%', '-95% 50%']
            }}
            transition={{
              duration: 3.6,
              delay: 1.5,
              repeat: Infinity,
              repeatDelay: 6.2,
              times: [0, 0.12, 0.3, 0.55, 0.8, 1],
              ease: [0.4, 0, 0.2, 1]
            }}>
            {words.map((word, wordIdx) => (
              <span key={`sweep-word-${wordIdx}`} className="inline-flex flex-wrap whitespace-normal">
                {word}
              </span>
            ))}
          </motion.span>
        ) : null}
      </h1>

      {/* System rail */}
      <div
        aria-hidden="true"
        className="relative mx-auto mt-6 h-px w-[68%] max-w-[500px] overflow-hidden bg-border/80">
        {!reduceMotion ? (
          <motion.span
            initial={{ x: '-140%', opacity: 0 }}
            animate={{
              x: ['-140%', '-95%', '-20%', '85%', '175%', '245%'],
              opacity: [0, 0.65, 1, 1, 0.65, 0]
            }}
            transition={{
              duration: 3.6,
              delay: 1.45,
              repeat: Infinity,
              repeatDelay: 6.2,
              times: [0, 0.12, 0.3, 0.55, 0.8, 1],
              ease: [0.4, 0, 0.2, 1]
            }}
            className="absolute inset-y-0 left-0 w-[38%] bg-gradient-to-r from-transparent via-orange-500 to-red-500 shadow-[0_0_20px_#f97316]"
          />
        ) : null}
      </div>
    </div>
  );
}
