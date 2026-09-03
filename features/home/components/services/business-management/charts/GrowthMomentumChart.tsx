'use client';

import {
  Area,
  CartesianGrid,
  ComposedChart,
  Line,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
} from 'recharts';

const data = [
  { period: 'Jan', enquiries: 18, conversion: 12 },
  { period: 'Feb', enquiries: 24, conversion: 15 },
  { period: 'Mar', enquiries: 22, conversion: 16 },
  { period: 'Apr', enquiries: 31, conversion: 20 },
  { period: 'May', enquiries: 36, conversion: 22 },
  { period: 'Jun', enquiries: 41, conversion: 26 },
  { period: 'Jul', enquiries: 48, conversion: 29 },
  { period: 'Aug', enquiries: 56, conversion: 34 }
] as const;

export function GrowthMomentumChart() {
  return (
    <div className="relative h-full min-h-[210px] w-full">
      <div className="pointer-events-none absolute right-4 top-3 z-10 rounded-full border border-border bg-background/90 px-3 py-1.5 shadow-sm backdrop-blur">
        <p className="font-mono text-[7px] uppercase tracking-[0.13em] text-muted">Growth momentum</p>
        <p className="mt-0.5 text-[11px] font-semibold tracking-[-0.02em]">+28% enquiries</p>
      </div>

      <ResponsiveContainer width="100%" height="100%">
        <ComposedChart
          data={data}
          margin={{
            top: 28,
            right: 8,
            left: -18,
            bottom: 0
          }}>
          <defs>
            <linearGradient id="growthEnquiriesFill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="var(--theme-accent)" stopOpacity={0.24} />
              <stop offset="100%" stopColor="var(--theme-accent)" stopOpacity={0.01} />
            </linearGradient>
          </defs>

          <CartesianGrid vertical={false} stroke="var(--border)" strokeOpacity={0.5} strokeDasharray="3 5" />

          <XAxis
            dataKey="period"
            axisLine={false}
            tickLine={false}
            tick={{
              fill: 'var(--muted)',
              fontSize: 8
            }}
            tickMargin={10}
          />

          <YAxis
            domain={[0, 60]}
            axisLine={false}
            tickLine={false}
            tick={{
              fill: 'var(--muted)',
              fontSize: 8
            }}
            width={30}
          />

          <Tooltip
            cursor={{
              stroke: 'var(--border-strong)',
              strokeWidth: 1,
              strokeDasharray: '3 4'
            }}
            contentStyle={{
              background: 'var(--background)',
              border: '1px solid var(--border)',
              borderRadius: 12,
              boxShadow: '0 16px 40px rgba(0,0,0,0.12)',
              fontSize: 11
            }}
            labelStyle={{
              color: 'var(--muted)',
              fontFamily: 'var(--font-geist-mono)'
            }}
            itemStyle={{
              color: 'var(--foreground)'
            }}
          />

          <Area
            type="monotone"
            dataKey="enquiries"
            name="Enquiries"
            stroke="var(--theme-accent)"
            strokeWidth={2.25}
            fill="url(#growthEnquiriesFill)"
            activeDot={{
              r: 4.5,
              fill: 'var(--theme-accent)',
              stroke: 'var(--background)',
              strokeWidth: 2
            }}
            dot={{
              r: 2.5,
              fill: 'var(--background)',
              stroke: 'var(--theme-accent)',
              strokeWidth: 1.5
            }}
          />

          <Line
            type="monotone"
            dataKey="conversion"
            name="Conversion"
            stroke="var(--foreground)"
            strokeOpacity={0.72}
            strokeWidth={1.7}
            dot={false}
            activeDot={{
              r: 4,
              fill: 'var(--foreground)',
              stroke: 'var(--background)',
              strokeWidth: 2
            }}
          />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  );
}
