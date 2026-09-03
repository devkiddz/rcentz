'use client';

import {
  motion,
  useReducedMotion
} from 'motion/react';

import { CodeTypingPanel } from '@/features/home/components/hero/perspective/CodeTypingPanel';
import { PerformanceDashboard } from '@/features/home/components/hero/perspective/PerformanceDashboard';
import { RecentOrdersPanel } from '@/features/home/components/hero/perspective/RecentOrdersPanel';
import { SystemStatusDock } from '@/features/home/components/hero/perspective/SystemStatusDock';
import { TopPagesPanel } from '@/features/home/components/hero/perspective/TopPagesPanel';
import { WebsitePreviewPanel } from '@/features/home/components/hero/perspective/WebsitePreviewPanel';

export function RcentzPerspectiveStage({
  phase
}: {
  phase: number;
}) {
  const reduceMotion = Boolean(useReducedMotion());

  return (
    <div className="relative min-h-[540px] overflow-visible sm:min-h-[580px] lg:min-h-[470px]">
      <div className="rcentz-grid-fade absolute inset-0 opacity-38" />

      <div
        aria-hidden="true"
        className={[
          'absolute left-1/2 top-1/2',
          'size-[420px]',
          '-translate-x-1/2',
          '-translate-y-1/2',
          'rounded-full',
          'bg-theme-accent-faint',
          'blur-[110px]',
          'sm:size-[500px]',
          'sm:blur-[125px]',
          'lg:size-[600px]',
          'lg:blur-[145px]'
        ].join(' ')}
      />

      <div
        className="absolute inset-x-[1%] top-[1%] bottom-[1%]"
        style={{
          perspective: '1450px'
        }}>
        <motion.div
          animate={
            reduceMotion
              ? undefined
              : {
                  opacity: [0.26, 0.48, 0.26]
                }
          }
          transition={{
            duration: 6.2,
            repeat: Infinity,
            ease: 'easeInOut'
          }}
          className="absolute bottom-0 left-[53%] h-[18%] w-[92%] -translate-x-1/2 rounded-[50%] border border-theme-accent/14 bg-[radial-gradient(ellipse_at_center,var(--theme-accent-soft),transparent_67%)] shadow-[0_0_72px_var(--theme-accent-faint)]"
        />

        <div className="absolute bottom-[3%] left-[53%] h-[12%] w-[82%] -translate-x-1/2 rounded-[50%] border border-border bg-background/72 shadow-2xl" />

        <motion.div
          animate={reduceMotion ? undefined : { rotate: 360 }}
          transition={{
            duration: 36,
            repeat: Infinity,
            ease: 'linear'
          }}
          className="absolute bottom-[4.8%] left-[53%] h-[8%] w-[76%] -translate-x-1/2 rounded-[50%] border border-theme-accent/20">
          <span className="absolute right-[10%] top-[6%] size-1.5 rounded-full bg-theme-accent shadow-[0_0_18px_var(--theme-accent)]" />
        </motion.div>

        <motion.div
          initial={
            reduceMotion
              ? false
              : {
                  opacity: 0,
                  y: 14,
                  scale: 0.97,
                  rotateX: 6,
                  rotateY: -12
                }
          }
          animate={{
            opacity: 1,
            y: reduceMotion ? 0 : [0, -3, 0],
            scale: 1,
            rotateX: 6,
            rotateY: reduceMotion ? -11.5 : [-12, -10.75, -12],
            rotateZ: 0.8
          }}
          transition={{
            opacity: {
              duration: 0.65
            },
            scale: {
              duration: 0.8,
              ease: [0.22, 1, 0.36, 1]
            },
            y: {
              duration: 6.4,
              repeat: Infinity,
              ease: 'easeInOut'
            },
            rotateY: {
              duration: 7.6,
              repeat: Infinity,
              ease: 'easeInOut'
            }
          }}
          style={{
            transformStyle: 'preserve-3d',
            willChange: reduceMotion ? 'auto' : 'transform, opacity'
          }}
          className={[
            'absolute',
            'left-[55%] top-[4%]',
            'z-30',
            'h-[59%]',
            'w-[84%]',
            '-translate-x-1/2',
            'transform-gpu',
            'lg:left-[57%]',
            'lg:top-[2%]',
            'lg:h-[62%]',
            'lg:w-[78%]'
          ].join(' ')}>
          <PerformanceDashboard phase={phase} />
        </motion.div>

        <motion.div
          animate={reduceMotion ? undefined : { y: [0, -2, 0] }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: 0.5
          }}
          style={{
            transform: 'rotateY(-8deg) rotateZ(2deg) translateZ(95px)',
            willChange: reduceMotion ? 'auto' : 'transform'
          }}
          className="absolute right-0 top-[30%] z-50 w-[31%] lg:right-[1%] lg:top-[29%] lg:w-[29%]">
          <TopPagesPanel />
        </motion.div>

        <div
          style={{
            transform: 'rotateY(8deg) rotateZ(-5deg) translateZ(110px)'
          }}
          className="absolute left-0 bottom-[21%] z-50 w-[38%] lg:left-[1%] lg:bottom-[20%] lg:w-[34%]">
          <RecentOrdersPanel />
        </div>

        <div
          style={{
            transform: 'rotateX(3deg) rotateY(-4deg) rotateZ(3deg) translateZ(125px)'
          }}
          className="absolute left-[34%] bottom-[12%] z-60 w-[31%] lg:left-[37%] lg:bottom-[11%] lg:w-[29%]">
          <WebsitePreviewPanel />
        </div>

        <div
          style={{
            transform: 'rotateY(-7deg) rotateZ(5deg) translateZ(145px)'
          }}
          className="absolute right-0 bottom-[13%] z-60 w-[37%] lg:right-[1%] lg:bottom-[12%] lg:w-[35%]">
          <CodeTypingPanel />
        </div>

        <div
          style={{
            transform: 'rotateX(7deg) rotateY(-2deg) rotateZ(1deg) translateZ(105px)'
          }}
          className="absolute bottom-[1%] left-[53%] z-70 w-[70%] -translate-x-1/2 lg:w-[64%]">
          <SystemStatusDock phase={phase} />
        </div>
      </div>
    </div>
  );
}
