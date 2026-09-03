'use client';

import { motion, useReducedMotion } from 'motion/react';
import { Network } from 'lucide-react';

import type { PublicPortfolioProject } from '@/features/portfolio/server/get-portfolio-project';

import { CompanyMark } from '@/ui-shell/brand/CompanyMark';

import { resolveTechnologyCompanyMark } from '@/ui-shell/brand/company-marks';

type ProjectSignalNetworkProps = {
  technologies: PublicPortfolioProject['technologies'];

  expanded?: boolean;
};

const nodePositions = [
  {
    x: 18,
    y: 18
  },
  {
    x: 82,
    y: 18
  },
  {
    x: 12,
    y: 56
  },
  {
    x: 88,
    y: 56
  },
  {
    x: 27,
    y: 84
  },
  {
    x: 73,
    y: 84
  }
] as const;

export function ProjectSignalNetwork({ technologies, expanded = false }: ProjectSignalNetworkProps) {
  const shouldReduceMotion = useReducedMotion();

  const visibleTechnologies = technologies.slice(0, 6);

  return (
    <div className={['relative', expanded ? 'min-h-[430px]' : 'min-h-[320px]', 'overflow-hidden'].join(' ')}>
      {/* GRID */}

      <div
        aria-hidden="true"
        className={[
          'pointer-events-none',

          'absolute',
          'inset-0',

          'opacity-60',

          'bg-[linear-gradient(to_right,rgb(106_243_219/0.065)_1px,transparent_1px),linear-gradient(to_bottom,rgb(106_243_219/0.065)_1px,transparent_1px)]',

          expanded ? '[background-size:72px_72px]' : '[background-size:54px_54px]'
        ].join(' ')}
      />

      {/* CENTER GLOW */}

      <motion.div
        aria-hidden="true"
        animate={
          shouldReduceMotion
            ? undefined
            : {
                opacity: [0.06, 0.15, 0.06],

                scale: [0.92, 1.08, 0.92]
              }
        }
        transition={{
          duration: 7,
          repeat: Infinity,
          ease: 'easeInOut'
        }}
        className={[
          'pointer-events-none',

          'absolute',
          'left-1/2',
          'top-1/2',

          'size-[220px]',

          '-translate-x-1/2',
          '-translate-y-1/2',

          'rounded-full',

          'bg-[#6af3db]',

          'blur-[110px]'
        ].join(' ')}
      />

      {/* CONNECTION GRAPH */}

      <svg
        aria-hidden="true"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        className="absolute inset-0 size-full">
        {visibleTechnologies.map((technology, index) => {
          const position = nodePositions[index];

          return (
            <g key={technology.id}>
              {/* GLOW UNDERLAY */}

              <line
                x1="50"
                y1="50"
                x2={position.x}
                y2={position.y}
                stroke="rgba(106,243,219,0.12)"
                strokeWidth="1.7"
                vectorEffect="non-scaling-stroke"
              />

              {/* CRISP CONNECTION */}

              <motion.line
                x1="50"
                y1="50"
                x2={position.x}
                y2={position.y}
                stroke="rgba(106,243,219,0.38)"
                strokeWidth="0.7"
                vectorEffect="non-scaling-stroke"
                strokeDasharray="3 5"
                initial={{
                  pathLength: 0,
                  opacity: 0
                }}
                animate={{
                  pathLength: 1,
                  opacity: 1
                }}
                transition={{
                  duration: 1.4,
                  delay: 0.25 + index * 0.12
                }}
              />

              {!shouldReduceMotion ? (
                <motion.circle
                  r="0.7"
                  fill="#aefaf0"
                  initial={{
                    cx: 50,
                    cy: 50,
                    opacity: 0
                  }}
                  animate={{
                    cx: [50, position.x],

                    cy: [50, position.y],

                    opacity: [0, 1, 0]
                  }}
                  transition={{
                    duration: 4.8 + index * 0.35,

                    delay: 1.2 + index * 0.85,

                    repeat: Infinity,

                    repeatDelay: 2.5 + index * 0.35,

                    ease: 'linear'
                  }}
                />
              ) : null}
            </g>
          );
        })}
      </svg>

      {/* CORE */}

      <motion.div
        initial={
          shouldReduceMotion
            ? undefined
            : {
                scale: 0.7,
                opacity: 0
              }
        }
        animate={{
          scale: 1,
          opacity: 1
        }}
        transition={{
          duration: 0.8,
          delay: 0.2
        }}
        className={[
          'absolute',

          'left-1/2',
          'top-1/2',

          'z-20',

          'flex',

          expanded ? 'size-24' : 'size-20',

          '-translate-x-1/2',
          '-translate-y-1/2',

          'items-center',
          'justify-center',

          'rounded-full',

          'border',
          'border-[#6af3db]/30',

          'bg-[#071513]/90',

          'text-[#6af3db]',

          'shadow-[0_0_0_8px_rgba(106,243,219,0.025),0_0_55px_rgba(106,243,219,0.13)]',

          'backdrop-blur-xl'
        ].join(' ')}>
        <motion.div
          animate={
            shouldReduceMotion
              ? undefined
              : {
                  rotate: [0, 360]
                }
          }
          transition={{
            duration: 30,
            repeat: Infinity,
            ease: 'linear'
          }}>
          <Network aria-hidden="true" className={expanded ? 'size-7' : 'size-6'} />
        </motion.div>

        {!shouldReduceMotion ? (
          <motion.span
            aria-hidden="true"
            animate={{
              scale: [1, 1.7, 1],

              opacity: [0.5, 0, 0.5]
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: 'easeOut'
            }}
            className={['absolute', 'inset-0', 'rounded-full', 'border', 'border-[#6af3db]/30'].join(' ')}
          />
        ) : null}
      </motion.div>

      {/* TECHNOLOGY NODES */}

      {visibleTechnologies.map((technology, index) => {
        const position = nodePositions[index];

        const company = resolveTechnologyCompanyMark({
          slug: technology.slug,

          name: technology.name
        });

        return (
          <motion.div
            key={technology.id}
            initial={
              shouldReduceMotion
                ? undefined
                : {
                    scale: 0.8,
                    opacity: 0
                  }
            }
            animate={{
              scale: 1,
              opacity: 1
            }}
            transition={{
              duration: 0.6,
              delay: 0.7 + index * 0.12
            }}
            style={{
              left: `${position.x}%`,

              top: `${position.y}%`
            }}
            className={['absolute', 'z-20', '-translate-x-1/2', '-translate-y-1/2'].join(' ')}>
            <motion.div
              animate={
                shouldReduceMotion
                  ? undefined
                  : {
                      y: [0, index % 2 === 0 ? -4 : 4, 0]
                    }
              }
              transition={{
                duration: 5.5 + index * 0.4,

                repeat: Infinity,

                ease: 'easeInOut'
              }}
              className={[
                'group',

                'flex',

                expanded ? 'min-w-[132px]' : 'min-w-[105px]',

                'items-center',
                'gap-2.5',

                'rounded-full',

                'border',
                'border-white/10',

                'bg-[#071513]/88',

                'px-3',
                'py-2',

                'backdrop-blur-xl',

                'transition-[border-color,background-color,transform]',

                'hover:border-[#6af3db]/30',
                'hover:bg-[#0c211e]'
              ].join(' ')}>
              <span
                className={[
                  'flex',
                  'size-7',

                  'shrink-0',

                  'items-center',
                  'justify-center',

                  'rounded-full',

                  'border',
                  'border-white/10',

                  'bg-white/[0.04]'
                ].join(' ')}>
                {company ? (
                  <CompanyMark company={company} tone="brand" size={14} />
                ) : (
                  <span className="size-1.5 rounded-full bg-[#6af3db]" />
                )}
              </span>

              <span className="max-w-[90px] truncate text-[9px] font-medium text-white/72">
                {technology.name}
              </span>
            </motion.div>
          </motion.div>
        );
      })}
    </div>
  );
}
