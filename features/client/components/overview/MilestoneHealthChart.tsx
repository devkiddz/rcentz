'use client';

import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts';

type MilestoneHealthChartProps = {
  completed: number;
  active: number;
  remaining: number;
  total: number;
};

type MilestoneChartDatum = {
  name: string;
  value: number;
  fill: string;
};

export function MilestoneHealthChart({ completed, active, remaining, total }: MilestoneHealthChartProps) {
  const completion = total > 0 ? Math.round((completed / total) * 100) : 0;

  const milestoneData: MilestoneChartDatum[] = [
    {
      name: 'Completed',
      value: completed,
      fill: 'var(--theme-accent)'
    },
    {
      name: 'Active',
      value: active,
      fill: 'var(--chart-warning)'
    },
    {
      name: 'Remaining',
      value: remaining,
      fill: 'var(--border-strong)'
    }
  ].filter(item => item.value > 0);

  const hasMilestones = total > 0;

  return (
    <div className="flex h-full flex-col p-4 sm:p-5">
      <div>
        <h3 className="text-sm font-semibold text-foreground">Milestone Health</h3>

        <p className="mt-1 text-xs text-muted-foreground">Overall milestone completion</p>
      </div>

      <div className="mt-5 flex flex-1 items-center gap-5">
        <div className="relative size-28 shrink-0">
          {hasMilestones ? (
            <>
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={milestoneData}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    innerRadius={38}
                    outerRadius={52}
                    paddingAngle={3}
                    stroke="none"
                    isAnimationActive>
                    {milestoneData.map(item => (
                      <Cell key={item.name} fill={item.fill} />
                    ))}
                  </Pie>

                  <Tooltip
                    cursor={false}
                    contentStyle={{
                      background: 'var(--popover)',
                      border: '1px solid var(--border)',
                      borderRadius: '0.75rem',
                      color: 'var(--foreground)',
                      fontSize: '12px',
                      boxShadow: '0 10px 30px rgb(0 0 0 / 0.16)'
                    }}
                    itemStyle={{
                      color: 'var(--foreground)'
                    }}
                    labelStyle={{
                      color: 'var(--muted-foreground)'
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>

              <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-lg font-semibold tabular-nums text-foreground">{completion}%</span>

                <span className="text-[10px] text-muted-foreground">complete</span>
              </div>
            </>
          ) : (
            <div className="flex size-full items-center justify-center rounded-full border border-dashed border-border">
              <span className="text-xs text-muted-foreground">No data</span>
            </div>
          )}
        </div>

        <div className="min-w-0 flex-1 space-y-3">
          <MilestoneLegend
            label="Completed"
            value={`${completed}/${total}`}
            indicatorClassName="bg-theme-accent"
          />

          <MilestoneLegend
            label="Active"
            value={String(active)}
            indicatorClassName="bg-[var(--chart-warning)]"
          />

          <MilestoneLegend
            label="Remaining"
            value={String(remaining)}
            indicatorClassName="bg-border-strong"
          />
        </div>
      </div>
    </div>
  );
}

function MilestoneLegend({
  label,
  value,
  indicatorClassName
}: {
  label: string;
  value: string;
  indicatorClassName: string;
}) {
  return (
    <div className="flex items-center justify-between gap-4">
      <div className="flex min-w-0 items-center gap-2">
        <span className={['size-2 shrink-0 rounded-full', indicatorClassName].join(' ')} />

        <span className="truncate text-xs text-muted-foreground">{label}</span>
      </div>

      <span className="shrink-0 text-xs font-semibold tabular-nums text-foreground">{value}</span>
    </div>
  );
}
