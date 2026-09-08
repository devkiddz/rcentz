'use client';

import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts';

type ProjectFundingDonutProps = {
  paid: number;
  outstanding: number;
  currency: string;
};

type FundingDatum = {
  name: string;
  value: number;
  fill: string;
};

function formatMoney(value: number, currency: string) {
  try {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency,
      maximumFractionDigits: 0
    }).format(value);
  } catch {
    return `${currency} ${new Intl.NumberFormat('en-NG').format(value)}`;
  }
}

export function ProjectFundingDonut({ paid, outstanding, currency }: ProjectFundingDonutProps) {
  const total = paid + outstanding;

  const percentage = total > 0 ? Math.round((paid / total) * 100) : 0;

  const data: FundingDatum[] = [
    {
      name: 'Paid',
      value: paid,
      fill: 'var(--theme-accent)'
    },
    {
      name: 'Outstanding',
      value: outstanding,
      fill: 'var(--border-strong)'
    }
  ].filter(item => item.value > 0);

  return (
    <div className="grid items-center gap-7 md:grid-cols-[190px_minmax(0,1fr)] lg:grid-cols-[180px_minmax(0,1fr)] xl:grid-cols-[195px_minmax(0,1fr)]">
      <div className="relative mx-auto size-[158px] sm:size-[172px] xl:size-[182px]">
        {total > 0 ? (
          <>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={data}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  innerRadius="66%"
                  outerRadius="88%"
                  paddingAngle={3}
                  stroke="none"
                  isAnimationActive>
                  {data.map(item => (
                    <Cell key={item.name} fill={item.fill} />
                  ))}
                </Pie>

                <Tooltip
                  cursor={false}
                  formatter={value => formatMoney(Number(value ?? 0), currency)}
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
                />
              </PieChart>
            </ResponsiveContainer>

            <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-[28px] font-semibold tracking-[-0.06em] text-foreground sm:text-[30px]">
                {percentage}%
              </span>

              <span className="mt-0.5 text-[10px] font-semibold uppercase tracking-[0.12em] text-muted-foreground">
                Paid
              </span>
            </div>
          </>
        ) : (
          <div className="flex size-full items-center justify-center rounded-full border border-dashed border-border">
            <div className="text-center">
              <p className="text-2xl font-semibold tracking-[-0.04em] text-foreground">0%</p>

              <p className="mt-1 text-[10px] font-medium uppercase tracking-[0.1em] text-muted-foreground">
                No billing
              </p>
            </div>
          </div>
        )}
      </div>

      <div className="min-w-0 divide-y divide-border">
        <FundingLegend
          label="Paid"
          value={formatMoney(paid, currency)}
          indicatorClassName="bg-theme-accent"
        />

        <FundingLegend
          label="Outstanding"
          value={formatMoney(outstanding, currency)}
          indicatorClassName="bg-border-strong"
        />

        <FundingLegend label="Total billed" value={formatMoney(total, currency)} />
      </div>
    </div>
  );
}

function FundingLegend({
  label,
  value,
  indicatorClassName
}: {
  label: string;
  value: string;
  indicatorClassName?: string;
}) {
  return (
    <div className="flex items-center justify-between gap-5 py-4 first:pt-0 last:pb-0">
      <div className="flex min-w-0 items-center gap-2.5">
        {indicatorClassName ? (
          <span className={['size-2.5 shrink-0 rounded-full', indicatorClassName].join(' ')} />
        ) : null}

        <span className="text-[12px] text-muted-foreground">{label}</span>
      </div>

      <span className="shrink-0 text-[13px] font-semibold tabular-nums text-foreground sm:text-sm">
        {value}
      </span>
    </div>
  );
}
