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

export type ProjectTrafficChartPoint = {
  date: string;
  label: string;

  sessions: number;
  pageViews: number;
  clicks: number;
  conversions: number;
  totalEvents: number;
};

type ProjectTrafficChartProps = {
  data: ProjectTrafficChartPoint[];
};

function formatNumber(value: number) {
  return new Intl.NumberFormat('en-NG').format(value);
}

export function ProjectTrafficChart({ data }: ProjectTrafficChartProps) {
  const pageViews = data.reduce((total, point) => total + point.pageViews, 0);

  const sessions = data.reduce((total, point) => total + point.sessions, 0);

  const hasTraffic = data.some(point => point.pageViews > 0 || point.sessions > 0);

  return (
    <div className="overflow-hidden rounded-[18px] border border-border bg-surface">
      <div className="flex flex-col gap-4 border-b border-border px-5 py-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-[9px] font-semibold uppercase tracking-[0.12em] text-muted-foreground">
            Traffic trend
          </p>

          <h3 className="mt-1 text-sm font-semibold tracking-[-0.02em] text-foreground">Website activity</h3>

          <p className="mt-1 text-[9px] leading-4 text-muted-foreground">
            Sessions and page views across the last 30 calendar days.
          </p>
        </div>

        <div className="flex items-center gap-5">
          <ChartSummary label="Views" value={pageViews} markerClassName="bg-theme-accent" />

          <ChartSummary label="Sessions" value={sessions} markerClassName="bg-foreground" />
        </div>
      </div>

      <div className="p-4 sm:p-5">
        {hasTraffic ? (
          <div className="h-[240px] w-full sm:h-[280px]">
            <ResponsiveContainer width="100%" height="100%" minWidth={0}>
              <ComposedChart
                data={data}
                margin={{
                  top: 12,
                  right: 4,
                  bottom: 0,
                  left: -14
                }}>
                <defs>
                  <linearGradient id="projectTrafficPageViews" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="var(--theme-accent)" stopOpacity={0.28} />

                    <stop offset="95%" stopColor="var(--theme-accent)" stopOpacity={0} />
                  </linearGradient>
                </defs>

                <CartesianGrid
                  vertical={false}
                  stroke="var(--border)"
                  strokeOpacity={0.5}
                  strokeDasharray="3 3"
                />

                <XAxis
                  dataKey="label"
                  axisLine={false}
                  tickLine={false}
                  minTickGap={24}
                  tick={{
                    fill: 'var(--muted-foreground)',
                    fontSize: 9
                  }}
                  tickMargin={10}
                />

                <YAxis
                  axisLine={false}
                  tickLine={false}
                  allowDecimals={false}
                  width={38}
                  tick={{
                    fill: 'var(--muted-foreground)',
                    fontSize: 9
                  }}
                />

                <Tooltip
                  cursor={{
                    stroke: 'var(--border)',
                    strokeWidth: 1,
                    strokeDasharray: '4 4'
                  }}
                  contentStyle={{
                    background: 'var(--surface)',
                    border: '1px solid var(--border)',
                    borderRadius: '12px',
                    boxShadow: '0 12px 32px rgba(0, 0, 0, 0.12)',
                    fontSize: '10px'
                  }}
                  labelStyle={{
                    color: 'var(--foreground)',
                    fontSize: '9px',
                    fontWeight: 600,
                    marginBottom: '5px'
                  }}
                  itemStyle={{
                    fontSize: '9px',
                    paddingTop: '2px',
                    paddingBottom: '2px'
                  }}
                  formatter={(value, name) => {
                    const numericValue = typeof value === 'number' ? value : Number(value ?? 0);

                    const label =
                      name === 'pageViews' ? 'Page views' : name === 'sessions' ? 'Sessions' : String(name);

                    return [formatNumber(numericValue), label];
                  }}
                />

                <Area
                  type="monotone"
                  dataKey="pageViews"
                  name="pageViews"
                  stroke="var(--theme-accent)"
                  strokeWidth={2}
                  fill="url(#projectTrafficPageViews)"
                  fillOpacity={1}
                  dot={false}
                  activeDot={{
                    r: 4,
                    strokeWidth: 2,
                    fill: 'var(--surface)',
                    stroke: 'var(--theme-accent)'
                  }}
                  isAnimationActive="auto"
                />

                <Line
                  type="monotone"
                  dataKey="sessions"
                  name="sessions"
                  stroke="var(--foreground)"
                  strokeWidth={1.5}
                  dot={false}
                  activeDot={{
                    r: 3,
                    strokeWidth: 1.5,
                    fill: 'var(--surface)',
                    stroke: 'var(--foreground)'
                  }}
                  isAnimationActive="auto"
                />
              </ComposedChart>
            </ResponsiveContainer>
          </div>
        ) : (
          <EmptyTrafficChart />
        )}

        <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2 border-t border-border pt-3">
          <LegendItem label="Page views" markerClassName="bg-theme-accent" />

          <LegendItem label="Sessions" markerClassName="bg-foreground" />

          <span className="ml-auto text-[8px] text-muted-foreground">Last 30 days</span>
        </div>
      </div>
    </div>
  );
}

function ChartSummary({
  label,
  value,
  markerClassName
}: {
  label: string;
  value: number;
  markerClassName: string;
}) {
  return (
    <div>
      <div className="flex items-center gap-1.5">
        <span aria-hidden="true" className={`size-1.5 rounded-full ${markerClassName}`} />

        <span className="text-[8px] text-muted-foreground">{label}</span>
      </div>

      <p className="mt-1 text-sm font-semibold tracking-[-0.03em] text-foreground">{formatNumber(value)}</p>
    </div>
  );
}

function LegendItem({ label, markerClassName }: { label: string; markerClassName: string }) {
  return (
    <div className="flex items-center gap-1.5">
      <span aria-hidden="true" className={`size-1.5 rounded-full ${markerClassName}`} />

      <span className="text-[8px] text-muted-foreground">{label}</span>
    </div>
  );
}

function EmptyTrafficChart() {
  return (
    <div className="flex h-[240px] items-center justify-center rounded-[14px] border border-dashed border-border bg-surface-muted/20 sm:h-[280px]">
      <div className="max-w-xs px-5 text-center">
        <p className="text-[10px] font-medium text-foreground">Waiting for traffic</p>

        <p className="mt-1 text-[8px] leading-4 text-muted-foreground">
          Traffic will begin appearing here as Rcentz receives sessions and page-view events from this
          website.
        </p>
      </div>
    </div>
  );
}
