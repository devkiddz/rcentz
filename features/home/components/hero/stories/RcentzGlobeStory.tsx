'use client';

import { Boxes, BriefcaseBusiness, Layers3, ShoppingBag } from 'lucide-react';
import { motion, useReducedMotion } from 'motion/react';
import { useEffect, useState } from 'react';

const PRODUCT_NODES = [
  {
    label: 'Commerce',
    meta: 'Transactions',
    icon: ShoppingBag,

    finalLeft: '16%',
    finalTop: '17%'
  },
  {
    label: 'Projects',
    meta: 'Operations',
    icon: Layers3,

    finalLeft: '84%',
    finalTop: '17%'
  },
  {
    label: 'Services',
    meta: 'Business',
    icon: BriefcaseBusiness,

    finalLeft: '16%',
    finalTop: '77%'
  },
  {
    label: 'Platforms',
    meta: 'Products',
    icon: Boxes,

    finalLeft: '84%',
    finalTop: '77%'
  }
];

const FIRST_CARD_DELAY = 900;
const CARD_RELEASE_DELAY = 2100;

const GOLDEN_ANGLE = Math.PI * (3 - Math.sqrt(5));

const GLOBE_POINTS = Array.from(
  {
    length: 560
  },
  (_, index) => {
    const y = 1 - (index / 559) * 2;

    const radius = Math.sqrt(Math.max(0, 1 - y * y));

    const theta = GOLDEN_ANGLE * index;

    const x = Math.cos(theta) * radius;

    const z = Math.sin(theta) * radius;

    return {
      x: 260 + x * 226,

      y: 260 + y * 226,

      opacity: z > 0 ? 0.82 : 0.12,

      radius: z > 0 ? 1.55 : 0.78
    };
  }
);

export function RcentzGlobeStory() {
  /*
    -1 means:
    Core is visible first,
    but no product has yet been released.
  */
  const [activeNode, setActiveNode] = useState(-1);

  const reduceMotion = useReducedMotion();

  useEffect(() => {
    if (reduceMotion || activeNode >= PRODUCT_NODES.length - 1) {
      return;
    }

    const timeout = window.setTimeout(
      () => {
        setActiveNode(current => current + 1);
      },
      activeNode === -1 ? FIRST_CARD_DELAY : CARD_RELEASE_DELAY
    );

    return () => {
      window.clearTimeout(timeout);
    };
  }, [activeNode, reduceMotion]);

  const visibleActiveNode = reduceMotion ? PRODUCT_NODES.length - 1 : activeNode;

  return (
    <div className="relative min-h-[390px] overflow-visible">
      {/* =====================================================
          GLOBE
          ===================================================== */}

      <div
        className={[
          'absolute',
          'left-1/2 top-1/2',
          'size-[390px]',
          '-translate-x-1/2',
          '-translate-y-1/2',
          'sm:size-[420px]',
          'lg:size-[450px]'
        ].join(' ')}>
        {/* AMBIENT LIGHT */}

        <div
          aria-hidden="true"
          className={['absolute inset-[7%]', 'rounded-full', 'bg-theme-accent-faint', 'blur-[80px]'].join(
            ' '
          )}
        />

        {/* SPHERE */}

        <div
          className={[
            'absolute inset-0',
            'overflow-hidden',
            'rounded-full',
            'border',
            'border-theme-accent/18'
          ].join(' ')}>
          {/* ROTATING PARTICLE FIELD */}

          <motion.svg
            aria-hidden="true"
            viewBox="0 0 520 520"
            animate={
              reduceMotion
                ? undefined
                : {
                    rotate: 360
                  }
            }
            transition={{
              duration: 42,
              repeat: Infinity,
              ease: 'linear'
            }}
            style={{
              transformOrigin: '50% 50%'
            }}
            className="absolute inset-0 size-full">
            <g className="text-theme-accent">
              {GLOBE_POINTS.map((point, index) => (
                <circle
                  key={index}
                  cx={point.x}
                  cy={point.y}
                  r={point.radius}
                  fill="currentColor"
                  opacity={point.opacity}
                />
              ))}
            </g>
          </motion.svg>

          {/* GLOBE GEOMETRY */}

          <svg
            aria-hidden="true"
            viewBox="0 0 520 520"
            className="absolute inset-0 size-full text-theme-accent">
            <ellipse
              cx="260"
              cy="260"
              rx="225"
              ry="62"
              fill="none"
              stroke="currentColor"
              strokeWidth="0.7"
              opacity="0.14"
            />

            <ellipse
              cx="260"
              cy="260"
              rx="225"
              ry="132"
              fill="none"
              stroke="currentColor"
              strokeWidth="0.7"
              opacity="0.1"
            />

            <ellipse
              cx="260"
              cy="260"
              rx="82"
              ry="225"
              fill="none"
              stroke="currentColor"
              strokeWidth="0.7"
              opacity="0.12"
            />

            <ellipse
              cx="260"
              cy="260"
              rx="148"
              ry="225"
              fill="none"
              stroke="currentColor"
              strokeWidth="0.7"
              opacity="0.08"
            />
          </svg>

          {/* SPHERE DEPTH */}

          <div
            className={[
              'absolute inset-0',
              'rounded-full',
              'bg-[radial-gradient(circle_at_35%_30%,transparent_28%,var(--background)_122%)]',
              'opacity-30'
            ].join(' ')}
          />
        </div>

        {/* HORIZONTAL ORBIT */}

        <motion.div
          animate={
            reduceMotion
              ? undefined
              : {
                  rotate: 360
                }
          }
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: 'linear'
          }}
          className={[
            'absolute',
            'left-1/2 top-1/2',
            'h-[48%] w-[113%]',
            '-translate-x-1/2',
            '-translate-y-1/2',
            'rounded-[50%]',
            'border',
            'border-theme-accent/20'
          ].join(' ')}>
          <span
            className={[
              'absolute',
              'right-[8%] top-[7%]',
              'size-2.5',
              'rounded-full',
              'bg-theme-accent',
              'shadow-[0_0_24px_var(--theme-accent)]'
            ].join(' ')}
          />
        </motion.div>

        {/* VERTICAL ORBIT */}

        <motion.div
          animate={
            reduceMotion
              ? undefined
              : {
                  rotate: -360
                }
          }
          transition={{
            duration: 32,
            repeat: Infinity,
            ease: 'linear'
          }}
          className={[
            'absolute',
            'left-1/2 top-1/2',
            'h-[108%] w-[44%]',
            '-translate-x-1/2',
            '-translate-y-1/2',
            'rounded-[50%]',
            'border',
            'border-theme-accent/14'
          ].join(' ')}
        />
      </div>

      {/* =====================================================
          RCENTZ CORE

          Everything begins here.
          ===================================================== */}

      <div
        className={['absolute', 'left-1/2 top-1/2', 'z-30', '-translate-x-1/2', '-translate-y-1/2'].join(
          ' '
        )}>
        <motion.div
          animate={
            reduceMotion
              ? undefined
              : {
                  scale: [1, 1.035, 1]
                }
          }
          transition={{
            duration: 4.2,
            repeat: Infinity,
            ease: 'easeInOut'
          }}
          className={[
            'relative',
            'flex size-[132px]',
            'flex-col',
            'items-center',
            'justify-center',
            'rounded-full',
            'border',
            'border-theme-accent/32',
            'bg-background/78',
            'shadow-2xl',
            'backdrop-blur-2xl'
          ].join(' ')}>
          {/* CORE ENERGY */}

          <motion.span
            animate={
              reduceMotion
                ? undefined
                : {
                    scale: [0.92, 1.18, 0.92],
                    opacity: [0.1, 0.42, 0.1]
                  }
            }
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: 'easeInOut'
            }}
            className={['absolute', 'inset-[-13px]', 'rounded-full', 'border', 'border-theme-accent/22'].join(
              ' '
            )}
          />

          {/* COMPACT CORE IDENTITY */}

          <div className="relative flex flex-col items-center">
            <p
              className={[
                'bg-gradient-to-r',
                'from-foreground',
                'via-theme-accent',
                'to-theme-accent-strong',
                'bg-clip-text',
                'text-[14px]',
                'font-semibold',
                'leading-none',
                'tracking-[-0.035em]',
                'text-transparent'
              ].join(' ')}>
              Rcentz Core
            </p>

            <p className="mt-1 font-mono text-[6px] uppercase leading-none tracking-[0.13em] text-muted">
              One foundation
            </p>

            <div className="mt-2 flex items-center gap-1.5">
              <span className="relative flex size-1.5">
                <span className="absolute inline-flex size-full animate-ping rounded-full bg-theme-accent opacity-30" />

                <span className="relative inline-flex size-1.5 rounded-full bg-theme-accent" />
              </span>

              <span className="font-mono text-[6px] uppercase leading-none tracking-[0.1em] text-muted">
                ecosystem active
              </span>
            </div>
          </div>
        </motion.div>
      </div>

      {/* =====================================================
          PRODUCT CARDS

          Every card originates INSIDE RCENTZ CORE,
          then travels to its permanent destination.
          ===================================================== */}

      {PRODUCT_NODES.map((node, index) => {
        const Icon = node.icon;

        const visible = index <= visibleActiveNode;

        const current = index === visibleActiveNode;

        return (
          <motion.div
            key={node.label}
            initial={false}
            animate={{
              /*
                  All four begin from the exact
                  Rcentz Core coordinates.
                */
              left: visible ? node.finalLeft : '50%',

              top: visible ? node.finalTop : '50%',

              opacity: visible ? 1 : 0,

              scale: current ? 1.04 : visible ? 1 : 0.3
            }}
            transition={{
              left: {
                duration: 1.3,
                ease: [0.22, 1, 0.36, 1]
              },

              top: {
                duration: 1.3,
                ease: [0.22, 1, 0.36, 1]
              },

              opacity: {
                duration: 0.55
              },

              scale: {
                duration: 0.8,
                ease: [0.22, 1, 0.36, 1]
              }
            }}
            className={['absolute z-40', '-translate-x-1/2', '-translate-y-1/2'].join(' ')}>
            <div
              className={[
                'relative',
                'flex min-w-[158px]',
                'items-center gap-3',
                'rounded-xl',
                'border',
                current ? 'border-theme-accent/40' : 'border-border',
                'bg-background/90',
                'px-3.5 py-3',
                'shadow-xl',
                'backdrop-blur-2xl'
              ].join(' ')}>
              {/* SIGNAL PIN */}

              <motion.span
                animate={
                  current && !reduceMotion
                    ? {
                        scale: [0.8, 1.4, 0.8],
                        opacity: [0.4, 1, 0.4]
                      }
                    : undefined
                }
                transition={{
                  duration: 1.6,
                  repeat: Infinity,
                  ease: 'easeInOut'
                }}
                className={[
                  'absolute',
                  '-bottom-[5px]',
                  'left-1/2',
                  'size-2',
                  '-translate-x-1/2',
                  'rounded-full',
                  'bg-theme-accent',
                  'shadow-[0_0_16px_var(--theme-accent)]'
                ].join(' ')}
              />

              <span
                className={[
                  'flex size-9',
                  'shrink-0',
                  'items-center',
                  'justify-center',
                  'rounded-lg',
                  'bg-theme-accent-soft'
                ].join(' ')}>
                <Icon className="size-4 text-theme-accent" />
              </span>

              <div>
                <p className="text-[10px] font-medium">{node.label}</p>

                <p className="mt-1 font-mono text-[6px] uppercase tracking-[0.11em] text-muted">
                  {node.meta}
                </p>
              </div>
            </div>
          </motion.div>
        );
      })}

      {/* =====================================================
          CONCLUSION
          ===================================================== */}

      {visibleActiveNode === PRODUCT_NODES.length - 1 ? (
        <motion.div
          initial={{
            y: 8,
            opacity: 0
          }}
          animate={{
            y: 0,
            opacity: 1
          }}
          transition={{
            delay: 1.25,
            duration: 0.7
          }}
          className={['absolute', 'bottom-[1%]', 'left-1/2 z-50', '-translate-x-1/2', 'text-center'].join(
            ' '
          )}>
          <p className="font-mono text-[6px] uppercase tracking-[0.16em] text-muted">Rcentz ecosystem</p>

          <p className="mt-1 text-[9px] font-medium text-theme-accent">All systems connected.</p>
        </motion.div>
      ) : null}
    </div>
  );
}
