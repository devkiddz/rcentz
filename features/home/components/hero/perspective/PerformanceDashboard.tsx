'use client';

import {
  Activity,
  Database,
  LayoutDashboard,
  ServerCog,
  TrendingUp,
  UsersRound
} from 'lucide-react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';

import { PerspectiveSurface } from '@/features/home/components/hero/perspective/PerspectiveSurface';

type PerformanceDashboardProps = {
  phase: number;
};

const READINESS = [48, 61, 72, 84, 96] as const;

const METRICS = [
  {
    label: 'Revenue',
    values: ['$8.4K', '$12.8K', '$18.6K', '$21.9K', '$24.7K'],
    growth: ['+4.2%', '+8.1%', '+12.4%', '+18.9%', '+24.6%'],
    icon: TrendingUp
  },
  {
    label: 'Orders',
    values: ['420', '680', '940', '1,240', '1,560'],
    growth: ['+2.8%', '+4.4%', '+5.6%', '+7.2%', '+8.7%'],
    icon: LayoutDashboard
  },
  {
    label: 'Customers',
    values: ['610', '980', '1,420', '1,880', '2,345'],
    growth: ['+4.8%', '+8.6%', '+10.1%', '+12.7%', '+15.6%'],
    icon: UsersRound
  },
  {
    label: 'Conversion',
    values: ['1.82%', '2.16%', '2.74%', '3.08%', '3.42%'],
    growth: ['+2.1%', '+4.7%', '+7.9%', '+9.5%', '+11.3%'],
    icon: Activity
  }
] as const;

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'] as const;

const PRIMARY_POINTS = [
  [0, 92],
  [38, 78],
  [76, 84],
  [114, 63],
  [152, 74],
  [190, 52],
  [228, 65],
  [266, 38],
  [304, 49],
  [342, 31],
  [380, 44],
  [420, 16]
] as const;

const SECONDARY_POINTS = [
  [0, 105],
  [38, 98],
  [76, 100],
  [114, 87],
  [152, 92],
  [190, 78],
  [228, 83],
  [266, 69],
  [304, 74],
  [342, 60],
  [380, 66],
  [420, 50]
] as const;

function pointsToPath(points: readonly (readonly [number, number])[]) {
  return points.reduce((path, [x, y], index) => {
    if (index === 0) {
      return `M${x} ${y}`;
    }

    const [previousX, previousY] = points[index - 1];
    const controlX = (previousX + x) / 2;

    return `${path} C${controlX} ${previousY}, ${controlX} ${y}, ${x} ${y}`;
  }, '');
}

function PerformanceChart({ reduceMotion }: { reduceMotion: boolean }) {
  const primaryPath = pointsToPath(PRIMARY_POINTS);
  const secondaryPath = pointsToPath(SECONDARY_POINTS);

  return (
    <div className="relative min-h-[184px] overflow-hidden rounded-xl border border-border bg-background/72 p-3.5">
      <PerspectiveSurface />

      <div className="relative z-10 flex items-start justify-between">
        <div>
          <p className="text-[9px] font-semibold lg:text-[10px]">Performance Overview</p>
          <p className="mt-0.5 font-mono text-[5px] uppercase tracking-[0.12em] text-muted lg:text-[6px]">
            This month
          </p>
        </div>

        <motion.span
          animate={reduceMotion ? undefined : { opacity: [0.45, 1, 0.45] }}
          transition={{ duration: 1.8, repeat: Infinity }}
          className="flex items-center gap-1 rounded-full border border-theme-accent/16 bg-theme-accent-soft px-2 py-1 font-mono text-[5px] text-theme-accent">
          <span className="size-1 rounded-full bg-theme-accent" />
          LIVE
        </motion.span>
      </div>

      <div className="absolute inset-x-3 bottom-3 top-11">
        <svg
          aria-hidden="true"
          viewBox="0 0 460 132"
          preserveAspectRatio="none"
          className="absolute inset-0 size-full overflow-visible text-theme-accent">
          {[20, 48, 76, 104].map((y, index) => (
            <g key={y}>
              <line
                x1="28"
                x2="456"
                y1={y}
                y2={y}
                stroke="currentColor"
                strokeWidth="0.55"
                opacity="0.09"
                strokeDasharray="3 7"
              />
              <text
                x="0"
                y={y + 2}
                fill="currentColor"
                opacity="0.42"
                fontSize="6"
                fontFamily="monospace">
                {400 - index * 100}
              </text>
            </g>
          ))}

          <motion.path
            d={secondaryPath}
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
            strokeLinecap="round"
            opacity="0.28"
            initial={reduceMotion ? false : { pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: reduceMotion ? 0 : 2.6, delay: reduceMotion ? 0 : 0.25 }}
          />

          <motion.path
            d={primaryPath}
            fill="none"
            stroke="currentColor"
            strokeWidth="2.4"
            strokeLinecap="round"
            initial={reduceMotion ? false : { pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: reduceMotion ? 0 : 2.2, ease: [0.22, 1, 0.36, 1] }}
          />

          {PRIMARY_POINTS.map(([x, y], index) => (
            <motion.circle
              key={`${x}-${y}`}
              cx={x}
              cy={y}
              r="2.3"
              fill="currentColor"
              initial={reduceMotion ? false : { opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: reduceMotion ? 0 : 0.9 + index * 0.08 }}
            />
          ))}

          {MONTHS.map((month, index) => (
            <text
              key={month}
              x={index * 38}
              y="129"
              fill="currentColor"
              opacity="0.44"
              fontSize="5.4"
              fontFamily="monospace">
              {month}
            </text>
          ))}

          <motion.g
            animate={reduceMotion ? undefined : { opacity: [0.55, 1, 0.55] }}
            transition={{ duration: 1.7, repeat: Infinity }}>
            <rect
              x="302"
              y="22"
              width="46"
              height="17"
              rx="7"
              fill="var(--background)"
              stroke="currentColor"
              strokeWidth="0.6"
              opacity="0.96"
            />
            <text
              x="310"
              y="33.5"
              fill="currentColor"
              fontSize="7"
              fontWeight="700"
              fontFamily="monospace">
              +24.6%
            </text>
          </motion.g>
        </svg>
      </div>
    </div>
  );
}

function ReadinessRing({
  value,
  reduceMotion
}: {
  value: number;
  reduceMotion: boolean;
}) {
  const radius = 31;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (value / 100) * circumference;

  return (
    <div className="relative flex min-h-[184px] flex-col overflow-hidden rounded-xl border border-border bg-background/72 p-3.5">
      <PerspectiveSurface />

      <div className="relative z-10 flex items-start justify-between">
        <div>
          <p className="text-[9px] font-semibold lg:text-[10px]">Overall Performance</p>
          <p className="mt-0.5 font-mono text-[5px] uppercase tracking-[0.12em] text-muted">
            Production score
          </p>
        </div>

        <ServerCog className="size-3 text-theme-accent" />
      </div>

      <div className="relative z-10 flex flex-1 items-center justify-center">
        <svg aria-hidden="true" viewBox="0 0 84 84" className="size-[90px] -rotate-90 text-theme-accent">
          <circle
            cx="42"
            cy="42"
            r={radius}
            fill="none"
            stroke="currentColor"
            strokeWidth="8"
            opacity="0.11"
          />

          <motion.circle
            cx="42"
            cy="42"
            r={radius}
            fill="none"
            stroke="currentColor"
            strokeWidth="8"
            strokeLinecap="round"
            strokeDasharray={circumference}
            initial={reduceMotion ? false : { strokeDashoffset: circumference }}
            animate={{ strokeDashoffset: offset }}
            transition={{ duration: reduceMotion ? 0 : 1, ease: [0.22, 1, 0.36, 1] }}
          />
        </svg>

        <AnimatePresence mode="wait">
          <motion.div
            key={value}
            initial={reduceMotion ? false : { opacity: 0, scale: 0.82 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.08 }}
            className="absolute text-center">
            <p className="text-[15px] font-semibold">{value}%</p>
            <p className="mt-0.5 font-mono text-[5px] text-theme-accent">+12.3%</p>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

export function PerformanceDashboard({ phase }: PerformanceDashboardProps) {
  const reduceMotion = Boolean(useReducedMotion());
  const safePhase = Math.min(phase, 4);
  const readiness = READINESS[safePhase];

  return (
    <div className="relative h-full overflow-hidden rounded-[22px] border border-theme-accent/18 bg-background/94 shadow-[0_40px_90px_rgba(0,0,0,0.52)] backdrop-blur-2xl">
      <PerspectiveSurface />

      <div className="relative z-10 flex h-full flex-col">
        <div className="flex h-10 shrink-0 items-center border-b border-border px-4">
          <div className="flex gap-1.5">
            <span className="size-1.5 rounded-full bg-border-strong" />
            <span className="size-1.5 rounded-full bg-border-strong" />
            <motion.span
              animate={reduceMotion ? undefined : { opacity: [0.45, 1, 0.45] }}
              transition={{ duration: 1.8, repeat: Infinity }}
              className="size-1.5 rounded-full bg-theme-accent"
            />
          </div>

          <div className="mx-auto flex items-center gap-2 rounded-full border border-border bg-background/72 px-3 py-1">
            <Activity className="size-2.5 text-theme-accent" />
            <span className="font-mono text-[6px] text-muted">Performance Overview</span>
          </div>

          <span className="flex size-5 items-center justify-center rounded-md border border-theme-accent/15 bg-theme-accent-soft">
            <ServerCog className="size-2.5 text-theme-accent" />
          </span>
        </div>

        <div className="grid shrink-0 grid-cols-[1.52fr_0.68fr] gap-3 p-3.5 lg:grid-cols-[0.68fr_1.52fr]">
          <div className="order-2 lg:order-1">
            <ReadinessRing value={readiness} reduceMotion={reduceMotion} />
          </div>

          <div className="order-1 lg:order-2">
            <PerformanceChart reduceMotion={reduceMotion} />
          </div>
        </div>

        <div className="grid flex-1 grid-cols-4 border-t border-border">
          {METRICS.map((metric, index) => {
            const Icon = metric.icon;
            const value = metric.values[safePhase];
            const growth = metric.growth[safePhase];

            return (
              <motion.div
                key={metric.label}
                initial={reduceMotion ? false : { opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: reduceMotion ? 0 : 0.25 + index * 0.08 }}
                className="relative border-r border-border p-3 last:border-r-0">
                <PerspectiveSurface />

                <div className="relative z-10">
                  <Icon className="size-3.5 text-theme-accent" />

                  <AnimatePresence mode="wait">
                    <motion.p
                      key={value}
                      initial={reduceMotion ? false : { opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -4 }}
                      className="mt-2.5 text-[11px] font-semibold lg:text-[12px]">
                      {value}
                    </motion.p>
                  </AnimatePresence>

                  <div className="mt-1 flex items-center justify-between gap-2">
                    <p className="truncate font-mono text-[5px] uppercase tracking-[0.09em] text-muted lg:text-[6px]">
                      {metric.label}
                    </p>
                    <span className="font-mono text-[5px] text-theme-accent">{growth}</span>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
