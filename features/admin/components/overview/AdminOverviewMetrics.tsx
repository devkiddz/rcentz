import Link from 'next/link';

import { AdminMetricIcon, type AdminMetricIconName, type AdminMetricMotion } from './AdminMetricIcon';

type AdminOverviewMetric = {
  label: string;
  value: number;
  href: string;
  note?: string;
  iconName: AdminMetricIconName;
  motionType: AdminMetricMotion;
};

type AdminOverviewMetricsProps = {
  metrics: AdminOverviewMetric[];
};

export function AdminOverviewMetrics({ metrics }: AdminOverviewMetricsProps) {
  return (
    <section
      aria-label="Overview metrics"
      className="grid overflow-hidden rounded-[18px] border border-border bg-border sm:grid-cols-2 xl:grid-cols-5">
      {metrics.map(metric => (
        <Link
          key={metric.label}
          href={metric.href}
          className="group min-w-0 bg-background px-4 py-4 transition-colors hover:bg-surface-raised focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-theme-accent/40 sm:px-5">
          <div className="flex items-center justify-between gap-4">
            <p className="text-xs font-medium text-muted transition-colors group-hover:text-foreground">
              {metric.label}
            </p>

            <AdminMetricIcon iconName={metric.iconName} motionType={metric.motionType} />
          </div>

          <p className="mt-3 text-2xl font-semibold tracking-[-0.04em] text-foreground">{metric.value}</p>

          <p className="mt-1 text-[11px] leading-4 text-muted">{metric.note ?? 'No activity yet'}</p>
        </Link>
      ))}
    </section>
  );
}
