'use client';

import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

const data = [
  { time: '08:00', activity: 34 },
  { time: '09:00', activity: 48 },
  { time: '10:00', activity: 42 },
  { time: '11:00', activity: 61 },
  { time: '12:00', activity: 54 },
  { time: '13:00', activity: 76 },
  { time: '14:00', activity: 68 },
  { time: '15:00', activity: 84 }
] as const;

export function OperationsActivityChart() {
  return (
    <div className="relative h-full min-h-[190px] w-full">
      <div className="pointer-events-none absolute right-4 top-3 z-10 rounded-full border border-border bg-background/90 px-3 py-1.5 shadow-sm backdrop-blur">
        <p className="font-mono text-[7px] uppercase tracking-[0.13em] text-muted">Current activity</p>
        <p className="mt-0.5 text-[11px] font-semibold tracking-[-0.02em]">84%</p>
      </div>

      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          data={data}
          margin={{
            top: 26,
            right: 8,
            left: -18,
            bottom: 0
          }}>
          <defs>
            <linearGradient id="operationsActivityFill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="var(--theme-accent)" stopOpacity={0.28} />
              <stop offset="100%" stopColor="var(--theme-accent)" stopOpacity={0.015} />
            </linearGradient>
          </defs>

          <CartesianGrid vertical={false} stroke="var(--border)" strokeOpacity={0.5} strokeDasharray="3 5" />

          <XAxis
            dataKey="time"
            axisLine={false}
            tickLine={false}
            tick={{
              fill: 'var(--muted)',
              fontSize: 8
            }}
            tickMargin={10}
          />

          <YAxis
            domain={[0, 100]}
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
            formatter={value => [`${value}%`, 'Activity']}
          />

          <Area
            type="monotone"
            dataKey="activity"
            stroke="var(--theme-accent)"
            strokeWidth={2.25}
            fill="url(#operationsActivityFill)"
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
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
