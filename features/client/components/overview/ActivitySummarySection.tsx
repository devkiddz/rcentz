import type { LucideIcon } from 'lucide-react';

import { CircleAlert, Gauge, MessageSquare, RefreshCw, Ticket, WalletCards } from 'lucide-react';

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

          <SummaryItem
            icon={Gauge}
            label="Current Project"
            value={`${projectProgress}%`}
            description={humanize(projectStatus)}
            progress={projectProgress}
          />

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
  description,
  progress
}: {
  icon: LucideIcon;
  label: string;
  value: string;
  description: string;
  progress?: number;
}) {
  return (
    <div className="relative min-h-[116px] px-5 py-4">
      <div className="flex items-center justify-between gap-3">
        <p className="truncate text-[9px] font-medium text-muted-foreground">{label}</p>

        <Icon aria-hidden="true" className="size-3.5 shrink-0 text-muted-foreground" />
      </div>

      <p className="mt-4 truncate text-lg font-semibold tracking-[-0.035em] text-foreground">{value}</p>

      <p className="mt-1 truncate text-[9px] text-muted-foreground">{description}</p>

      {typeof progress === 'number' ? (
        <div className="absolute inset-x-5 bottom-3 h-1 overflow-hidden rounded-full bg-surface-muted">
          <div
            className="h-full rounded-full bg-theme-accent"
            style={{
              width: `${Math.min(100, Math.max(0, progress))}%`
            }}
          />
        </div>
      ) : null}
    </div>
  );
}
