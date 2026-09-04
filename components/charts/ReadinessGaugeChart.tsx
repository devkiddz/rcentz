'use client';

import { Cell, Pie, PieChart, ResponsiveContainer } from 'recharts';

export type ReadinessGaugeBand = {
  name: string;
  value: number;
  color: string;
};

type ReadinessGaugeChartProps = {
  value: number;

  bands?: ReadinessGaugeBand[];

  label?: string;

  height?: number;

  showLegend?: boolean;
};

const DEFAULT_BANDS: ReadinessGaugeBand[] = [
  {
    name: 'Foundation',
    value: 35,
    color: 'var(--chart-danger)'
  },

  {
    name: 'Build',
    value: 35,
    color: 'var(--chart-warning)'
  },

  {
    name: 'Ready',
    value: 30,
    color: 'var(--chart-positive)'
  }
];

function clampValue(value: number) {
  return Math.max(0, Math.min(100, value));
}

export function ReadinessGaugeChart({
  value,
  bands = DEFAULT_BANDS,
  label = 'Readiness',
  height = 215,
  showLegend = true
}: ReadinessGaugeChartProps) {
  const safeValue = clampValue(value);

  /*
   * 0%   -> 180deg
   * 50%  -> 270deg
   * 100% -> 360deg
   */
  const needleAngle = 180 + (safeValue / 100) * 180;

  return (
    <div>
      <div
        className="
          relative
          mx-auto
          w-full
          max-w-[270px]
        "
        style={{
          height
        }}>
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={bands}
              dataKey="value"
              cx="50%"
              cy="68%"
              innerRadius={65}
              outerRadius={92}
              startAngle={180}
              endAngle={0}
              paddingAngle={1.5}
              stroke="none"
              isAnimationActive>
              {bands.map(band => (
                <Cell key={band.name} fill={band.color} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>

        {/* Needle */}

        <div
          className="
            pointer-events-none
            absolute
            left-1/2
            top-[68%]
            z-10
          ">
          <div
            className="
              absolute
              left-0
              top-1/2
              h-[2px]
              w-[80px]
              origin-left
              rounded-full
              bg-foreground
              shadow-sm
            "
            style={{
              transform: `
                translateY(-50%)
                rotate(${needleAngle}deg)
              `
            }}
          />

          <span
            className="
              absolute
              left-0
              top-1/2
              size-4
              -translate-x-1/2
              -translate-y-1/2
              rounded-full
              border-[3px]
              border-surface
              bg-theme-accent
            "
          />
        </div>

        {/* Reading */}

        <div
          className="
            pointer-events-none
            absolute
            inset-x-0
            bottom-1
            text-center
          ">
          <p
            className="
              text-3xl
              font-semibold
              tracking-[-0.055em]
              text-foreground
            ">
            {safeValue}%
          </p>

          <p
            className="
              mt-1
              font-mono
              text-[8px]
              font-medium
              uppercase
              tracking-[0.1em]
              text-muted
            ">
            {label}
          </p>
        </div>
      </div>

      {showLegend ? (
        <div
          className="
            mt-4
            grid
            grid-cols-3
            gap-1.5
          ">
          {bands.map(band => (
            <div
              key={band.name}
              className="
                  rounded-xl
                  border
                  border-border
                  bg-background/45
                  px-2
                  py-2.5
                  text-center
                ">
              <span
                className="
                    mx-auto
                    block
                    size-2
                    rounded-full
                  "
                style={{
                  backgroundColor: band.color
                }}
              />

              <p
                className="
                    mt-1.5
                    font-mono
                    text-[7px]
                    font-medium
                    uppercase
                    tracking-[0.07em]
                    text-muted
                  ">
                {band.name}
              </p>
            </div>
          ))}
        </div>
      ) : null}
    </div>
  );
}
