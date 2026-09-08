'use client';

import type { LucideIcon } from 'lucide-react';

import { CircleAlert, Gauge, MessageSquare, RefreshCw, Ticket, WalletCards } from 'lucide-react';

import { Cell, Pie, PieChart, ResponsiveContainer } from 'recharts';

type ActivitySummarySectionProps = {
  currency: string;
  budget: number;
  billed: number;
  subscriptionStatus: string | null;
  subscriptionPlan: string | null;
  nextBillingAt: Date | string | null;
  unreadMessages: number;
  ticketCount: number;
  openTicketCount: number;
  projectProgress: number;
  projectStatus: string;
};

function formatCurrency(value: number, currency: string) {
  try {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency,
      maximumFractionDigits: 0
    }).format(value);
  } catch {
    return `${currency} ${value.toLocaleString('en-NG')}`;
  }
}

function formatDate(value: Date | string | null) {
  if (!value) {
    return 'No renewal date';
  }

  return new Intl.DateTimeFormat('en-NG', {
    day: 'numeric',
    month: 'short'
  }).format(new Date(value));
}

function humanize(value: string) {
  return value
    .toLowerCase()
    .split('_')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

function clampProgress(value: number) {
  return Math.min(100, Math.max(0, value));
}

export function ActivitySummarySection({
  currency,
  budget,
  billed,
  subscriptionStatus,
  subscriptionPlan,
  nextBillingAt,
  unreadMessages,
  ticketCount,
  openTicketCount,
  projectProgress,
  projectStatus
}: ActivitySummarySectionProps) {
  const availableBalance = Math.max(budget - billed, 0);

  return (
    <section className="overflow-hidden rounded-2xl border border-border bg-surface">
      <div className="overflow-x-auto">
        <div className="grid min-w-[960px] grid-cols-6 divide-x divide-border">
          <SummaryItem
            icon={WalletCards}
            label="Available Balance"
            value={formatCurrency(availableBalance, currency)}
            description={`of ${formatCurrency(budget, currency)} budget`}
          />

          <SummaryItem
            icon={RefreshCw}
            label="Subscription"
            value={subscriptionStatus ? humanize(subscriptionStatus) : 'None'}
            description={
              subscriptionPlan ? `${subscriptionPlan} · ${formatDate(nextBillingAt)}` : 'No active package'
            }
          />

          <SummaryItem
            icon={MessageSquare}
            label="Messages"
            value={String(unreadMessages)}
            description={unreadMessages === 1 ? 'Unread message' : 'Unread messages'}
          />

          <SummaryItem
            icon={Ticket}
            label="Tickets"
            value={String(ticketCount)}
            description="Project reports"
          />

          <CurrentProjectSummary progress={projectProgress} status={projectStatus} />

          <SummaryItem
            icon={CircleAlert}
            label="Open Tickets"
            value={String(openTicketCount)}
            description={openTicketCount > 0 ? 'Requires attention' : 'Nothing pending'}
          />
        </div>
      </div>
    </section>
  );
}

function SummaryItem({
  icon: Icon,
  label,
  value,
  description
}: {
  icon: LucideIcon;
  label: string;
  value: string;
  description: string;
}) {
  return (
    <div className="relative min-h-[116px] px-5 py-4">
      <div className="flex items-center justify-between gap-3">
        <p className="truncate text-[9px] font-medium text-muted-foreground">{label}</p>

        <Icon aria-hidden="true" className="size-3.5 shrink-0 text-muted-foreground" />
      </div>

      <p className="mt-4 truncate text-lg font-semibold tracking-[-0.035em] text-foreground">{value}</p>

      <p className="mt-1 truncate text-[9px] text-muted-foreground">{description}</p>
    </div>
  );
}

function CurrentProjectSummary({ progress, status }: { progress: number; status: string }) {
  const safeProgress = clampProgress(progress);

  const chartData = [
    {
      name: 'Completed',
      value: safeProgress,
      fill: 'var(--theme-accent)'
    },
    {
      name: 'Remaining',
      value: 100 - safeProgress,
      fill: 'var(--surface-muted)'
    }
  ];

  return (
    <div className="relative min-h-[116px] px-5 py-4">
      <div className="flex items-center justify-between gap-3">
        <p className="truncate text-[9px] font-medium text-muted-foreground">Current Project</p>

        <Gauge aria-hidden="true" className="size-3.5 shrink-0 text-muted-foreground" />
      </div>

      <div className="mt-2.5 flex items-center gap-3">
        <div className="relative size-14 shrink-0">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={chartData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                innerRadius={19}
                outerRadius={26}
                startAngle={90}
                endAngle={-270}
                stroke="none"
                isAnimationActive={false}>
                {chartData.map(item => (
                  <Cell key={item.name} fill={item.fill} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>

          <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
            <span className="text-[10px] font-semibold tabular-nums text-foreground">{safeProgress}%</span>
          </div>
        </div>

        <div className="min-w-0">
          <p className="truncate text-sm font-semibold tracking-[-0.025em] text-foreground">
            {safeProgress}%
          </p>

          <p className="mt-1 truncate text-[9px] text-muted-foreground">{humanize(status)}</p>
        </div>
      </div>
    </div>
  );
}
