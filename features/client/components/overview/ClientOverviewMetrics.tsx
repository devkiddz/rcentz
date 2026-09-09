import type { LucideIcon } from 'lucide-react';

import Link from 'next/link';

import { CircleDollarSign, FolderKanban, Globe2, Headphones, ListChecks } from 'lucide-react';

import type { ClientOverviewData } from '@/features/client/server/overview/get-client-overview';

type ClientOverviewMetricsProps = {
  summary: ClientOverviewData['summary'];
};

type ClientOverviewMetric = {
  label: string;

  value: string | number;

  note: string;

  href: string;

  icon: LucideIcon;
};

function formatMoney(amount: number, currency: string) {
  return new Intl.NumberFormat('en-NG', {
    style: 'currency',
    currency,
    maximumFractionDigits: 0
  }).format(amount);
}

export function ClientOverviewMetrics({ summary }: ClientOverviewMetricsProps) {
  const metrics: ClientOverviewMetric[] = [
    {
      label: 'Active Projects',

      value: summary.activeProjects,

      note: summary.activeProjects === 0 ? 'No active delivery' : 'Projects currently in delivery',

      href: '/dashboard/projects',

      icon: FolderKanban
    },

    {
      label: 'Action Required',

      value: summary.actionRequired,

      note: summary.actionRequired === 0 ? 'Nothing waiting on you' : 'Items needing your response',

      href: '/dashboard/requests',

      icon: ListChecks
    },

    {
      label: 'Open Support',

      value: summary.openSupport,

      note: summary.openSupport === 0 ? 'No open support cases' : 'Support conversations in progress',

      href: '/dashboard/requests',

      icon: Headphones
    },

    {
      label: 'Outstanding',

      value: formatMoney(summary.outstandingAmount, summary.currency),

      note: summary.outstandingAmount > 0 ? 'Across issued invoices' : 'No outstanding balance',

      href: '/dashboard/billing',

      icon: CircleDollarSign
    },

    {
      label: 'Managed Sites',

      value: summary.managedProjects,

      note: summary.managedProjects === 0 ? 'No active monitoring yet' : 'Projects reporting intelligence',

      href: '/dashboard/projects',

      icon: Globe2
    }
  ];

  return (
    <section
      aria-label="Account metrics"
      className="
        overflow-hidden
        rounded-[18px]
        border
        border-border
        bg-border
      ">
      <div
        className="
          flex
          snap-x
          snap-mandatory
          gap-px
          overflow-x-auto
          [scrollbar-width:none]
          [&::-webkit-scrollbar]:hidden

          xl:grid
          xl:grid-cols-5
          xl:overflow-visible
        ">
        {metrics.map(metric => {
          const Icon = metric.icon;

          return (
            <Link
              key={metric.label}
              href={metric.href}
              className="
                group
                relative
                min-w-[72%]
                shrink-0
                snap-start
                bg-background
                px-4
                py-4

                transition-all
                duration-150

                hover:z-10
                hover:-translate-y-px
                hover:bg-surface-raised

                focus-visible:z-10
                focus-visible:outline-none
                focus-visible:ring-2
                focus-visible:ring-inset
                focus-visible:ring-theme-accent/40

                sm:min-w-[44%]

                xl:min-w-0
                xl:px-5
              ">
              <div className="flex items-center justify-between gap-3">
                <p
                  className="
                    truncate
                    text-xs
                    font-medium
                    text-muted
                    transition-colors
                    duration-150

                    group-hover:text-foreground
                  ">
                  {metric.label}
                </p>

                <div
                  className="
                    flex
                    size-7
                    shrink-0
                    items-center
                    justify-center
                    rounded-xl
                    bg-theme-accent-faint

                    transition-all
                    duration-150

                    group-hover:bg-theme-accent-soft
                  ">
                  <Icon
                    aria-hidden="true"
                    className="
                      size-3.5
                      text-theme-accent
                      transition-transform
                      duration-150

                      group-hover:scale-105
                    "
                  />
                </div>
              </div>

              <p
                className="
                  mt-3
                  truncate
                  text-2xl
                  font-semibold
                  tracking-[-0.04em]
                  text-foreground
                ">
                {metric.value}
              </p>

              <p
                className="
                  mt-1
                  line-clamp-2
                  text-[11px]
                  leading-4
                  text-muted
                ">
                {metric.note}
              </p>

              <span
                aria-hidden="true"
                className="
                  absolute
                  inset-x-0
                  bottom-0
                  h-[2px]
                  origin-left
                  scale-x-0
                  bg-theme-accent

                  transition-transform
                  duration-200

                  group-hover:scale-x-100
                  group-focus-visible:scale-x-100
                "
              />
            </Link>
          );
        })}
      </div>
    </section>
  );
}
