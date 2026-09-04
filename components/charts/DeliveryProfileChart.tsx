'use client';

import {
  Area,
  Bar,
  CartesianGrid,
  ComposedChart,
  Line,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
} from 'recharts';

export type DeliveryProfileDatum = {
  label: string;
  completed: number;
  remaining: number;
  trajectory: number;
};

type DeliveryProfileChartProps = {
  data: DeliveryProfileDatum[];

  height?: number;

  completedLabel?: string;
  remainingLabel?: string;
  trajectoryLabel?: string;

  showLegend?: boolean;
};

export function DeliveryProfileChart({
  data,
  height = 220,
  completedLabel = 'Phase completion',
  remainingLabel = 'Remaining',
  trajectoryLabel = 'Trajectory',
  showLegend = true
}: DeliveryProfileChartProps) {
  return (
    <div>
      <div
        className="
          overflow-hidden
          rounded-xl
          border
          border-border/70
          bg-background/45
          px-2
          pb-2
          pt-4
        "
        style={{
          height
        }}>
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart
            data={data}
            margin={{
              top: 10,
              right: 10,
              left: -12,
              bottom: 0
            }}>
            <defs>
              <linearGradient id="rcentz-delivery-profile-area" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="var(--chart-info)" stopOpacity={0.38} />

                <stop offset="100%" stopColor="var(--chart-info)" stopOpacity={0.04} />
              </linearGradient>
            </defs>

            <CartesianGrid stroke="var(--border)" strokeOpacity={0.65} strokeDasharray="4 4" />

            <XAxis
              dataKey="label"
              interval={0}
              tickLine={false}
              axisLine={{
                stroke: 'var(--border-strong)'
              }}
              tick={{
                fontSize: 9,
                fill: 'var(--muted)'
              }}
            />

            <YAxis
              domain={[0, 100]}
              ticks={[0, 25, 50, 75, 100]}
              tickLine={false}
              axisLine={false}
              width={32}
              tick={{
                fontSize: 10,
                fill: 'var(--muted)'
              }}
            />

            <Tooltip
              cursor={{
                fill: 'var(--theme-accent-faint)'
              }}
              contentStyle={{
                borderRadius: 12,
                border: '1px solid var(--border)',
                background: 'var(--surface)',
                color: 'var(--foreground)',
                fontSize: 11
              }}
              labelStyle={{
                color: 'var(--muted)',
                fontSize: 10,
                marginBottom: 5
              }}
              formatter={(value, name) => [
                value == null ? '—' : `${Math.round(Number(value))}%`,

                String(name ?? '')
              ]}
            />

            {/* Broad visual body */}

            <Area
              type="monotone"
              dataKey="trajectory"
              name={trajectoryLabel}
              stroke="var(--chart-info)"
              strokeWidth={2}
              fill="url(#rcentz-delivery-profile-area)"
              dot={false}
              isAnimationActive
            />

            {/* Phase columns */}

            <Bar
              dataKey="completed"
              name={completedLabel}
              fill="var(--chart-positive)"
              maxBarSize={34}
              radius={[6, 6, 0, 0]}
              opacity={0.84}
              isAnimationActive
            />

            {/* Strong progress curve */}

            <Line
              type="monotone"
              dataKey="completed"
              name={remainingLabel}
              stroke="var(--chart-warning)"
              strokeWidth={2.4}
              dot={{
                r: 3.5,
                fill: 'var(--chart-warning)',
                stroke: 'var(--surface)',
                strokeWidth: 1.5
              }}
              activeDot={{
                r: 5,
                fill: 'var(--chart-warning)',
                stroke: 'var(--surface)',
                strokeWidth: 2
              }}
              isAnimationActive
            />
          </ComposedChart>
        </ResponsiveContainer>
      </div>

      {showLegend ? (
        <div
          className="
            mt-3
            flex
            flex-wrap
            items-center
            justify-center
            gap-x-6
            gap-y-2
          ">
          <ChartLegendItem type="bar" color="var(--chart-positive)" label={completedLabel} />

          <ChartLegendItem type="line" color="var(--chart-warning)" label={remainingLabel} />

          <ChartLegendItem type="area" color="var(--chart-info)" label={trajectoryLabel} />
        </div>
      ) : null}
    </div>
  );
}

type ChartLegendItemProps = {
  label: string;
  color: string;

  type: 'bar' | 'line' | 'area';
};

function ChartLegendItem({ label, color, type }: ChartLegendItemProps) {
  return (
    <div className="flex items-center gap-2">
      {type === 'bar' ? (
        <span
          className="size-2.5 rounded-[3px]"
          style={{
            backgroundColor: color
          }}
        />
      ) : null}

      {type === 'line' ? (
        <span className="relative block h-2.5 w-4">
          <span
            className="
              absolute
              left-0
              top-1/2
              h-[2px]
              w-4
              -translate-y-1/2
              rounded-full
            "
            style={{
              backgroundColor: color
            }}
          />

          <span
            className="
              absolute
              left-1/2
              top-1/2
              size-1.5
              -translate-x-1/2
              -translate-y-1/2
              rounded-full
            "
            style={{
              backgroundColor: color
            }}
          />
        </span>
      ) : null}

      {type === 'area' ? (
        <span
          className="
            size-2.5
            rounded-full
            opacity-80
          "
          style={{
            backgroundColor: color
          }}
        />
      ) : null}

      <span
        className="
          font-mono
          text-[8px]
          font-medium
          uppercase
          tracking-[0.09em]
          text-muted
        ">
        {label}
      </span>
    </div>
  );
}
