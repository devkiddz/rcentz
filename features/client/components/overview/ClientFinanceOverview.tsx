import Link from 'next/link';

import {
  ArrowRight,
  CalendarClock,
  CircleDollarSign,
  CreditCard,
  ReceiptText,
  WalletCards
} from 'lucide-react';

import type { ClientOverviewData } from '@/features/client/server/overview/get-client-overview';

type ClientFinanceOverviewProps = {
  finance: ClientOverviewData['finance'];
};

function formatMoney(amount: number, currency: string) {
  return new Intl.NumberFormat('en-NG', {
    style: 'currency',

    currency,

    maximumFractionDigits: 0
  }).format(amount);
}

function formatDate(value: Date | null) {
  if (!value) {
    return 'Not set';
  }

  return new Intl.DateTimeFormat('en', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  }).format(value);
}

function formatStatus(value: string) {
  return value
    .toLowerCase()
    .split('_')
    .map(part => part.charAt(0).toUpperCase() + part.slice(1))
    .join(' ');
}

export function ClientFinanceOverview({ finance }: ClientFinanceOverviewProps) {
  const nextPayment = finance.nextPayment;

  return (
    <section className="overflow-hidden rounded-[18px] border border-border bg-background">
      <div className="flex items-start justify-between gap-4 border-b border-border px-4 py-4 sm:px-5">
        <div>
          <p className="text-sm font-semibold tracking-[-0.025em] text-foreground">Billing</p>

          <p className="mt-1 text-[11px] text-muted">Account finance position</p>
        </div>

        <WalletCards aria-hidden="true" className="size-4 text-theme-accent" />
      </div>

      <div
        className="
          flex
          snap-x
          snap-mandatory
          gap-2
          overflow-x-auto
          px-4
          py-4
          [scrollbar-width:none]
          [&::-webkit-scrollbar]:hidden

          sm:[&>*]:min-w-[44%]

          md:grid
          md:grid-cols-4
          md:overflow-visible
          md:[&>*]:min-w-0

          sm:px-5
        ">
        <FinanceMetric
          icon={ReceiptText}
          label="Billed"
          value={formatMoney(finance.billed, finance.currency)}
          note="Issued account value"
        />

        <FinanceMetric
          icon={CircleDollarSign}
          label="Paid"
          value={formatMoney(finance.paid, finance.currency)}
          note="Recorded payments"
        />

        <FinanceMetric
          icon={CalendarClock}
          label="Outstanding"
          value={formatMoney(finance.outstanding, finance.currency)}
          note={
            finance.overdue > 0
              ? `${formatMoney(finance.overdue, finance.currency)} overdue`
              : 'Nothing overdue'
          }
        />

        <FinanceMetric
          icon={CreditCard}
          label="Active Plans"
          value={finance.activeSubscriptions}
          note="Care and managed services"
        />
      </div>

      <div className="grid border-t border-border lg:grid-cols-[0.8fr_1.2fr]">
        <div className="border-b border-border p-4 sm:p-5 lg:border-b-0 lg:border-r">
          <p className="text-[10px] font-semibold uppercase tracking-[0.1em] text-muted">Next payment</p>

          {nextPayment ? (
            <div className="mt-3">
              <p className="text-[22px] font-semibold tracking-[-0.045em] text-foreground">
                {formatMoney(nextPayment.balanceDue, nextPayment.currency)}
              </p>

              <p className="mt-1 text-[11px] font-medium text-foreground">{nextPayment.projectName}</p>

              <p className="mt-1 text-[9px] text-muted">
                {nextPayment.invoiceNumber}
                {' · '}
                Due {formatDate(nextPayment.dueAt)}
              </p>

              <Link
                href={`/dashboard/projects/${nextPayment.projectId}`}
                className="mt-4 inline-flex items-center gap-1 text-[10px] font-semibold text-theme-accent">
                Open project
                <ArrowRight aria-hidden="true" className="size-3" />
              </Link>
            </div>
          ) : (
            <div className="mt-3 rounded-xl border border-dashed border-border px-4 py-5">
              <p className="text-[11px] font-medium text-foreground">No payment due</p>

              <p className="mt-1 text-[9px] leading-4 text-muted">
                There are no outstanding issued invoices.
              </p>
            </div>
          )}
        </div>

        <div className="p-4 sm:p-5">
          <div className="flex items-center justify-between gap-3">
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.1em] text-muted">
                Recent invoices
              </p>

              <p className="mt-1 text-[9px] text-muted">Latest billing records across your projects</p>
            </div>
          </div>

          {finance.recentInvoices.length === 0 ? (
            <div className="mt-3 rounded-xl border border-dashed border-border px-4 py-5 text-center">
              <p className="text-[10px] text-muted">No invoices yet</p>
            </div>
          ) : (
            <div className="mt-3 divide-y divide-border">
              {finance.recentInvoices.map(invoice => (
                <div
                  key={invoice.id}
                  className="flex items-center justify-between gap-4 py-3 first:pt-0 last:pb-0">
                  <div className="min-w-0">
                    <p className="truncate text-[10px] font-semibold text-foreground">
                      {invoice.invoiceNumber}
                    </p>

                    <p className="mt-0.5 truncate text-[9px] text-muted">
                      {invoice.projectName}
                      {' · '}
                      {formatStatus(String(invoice.status))}
                    </p>
                  </div>

                  <div className="shrink-0 text-right">
                    <p className="text-[10px] font-semibold text-foreground">
                      {formatMoney(invoice.total, invoice.currency)}
                    </p>

                    <p className="mt-0.5 text-[8px] text-muted">
                      {formatDate(invoice.issuedAt ?? invoice.createdAt)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

function FinanceMetric({
  icon: Icon,
  label,
  value,
  note
}: {
  icon: typeof ReceiptText;

  label: string;
  value: string | number;

  note: string;
}) {
  return (
    <div className="min-w-[78%] snap-start rounded-2xl border border-border bg-surface-raised p-4">
      <div className="flex items-center justify-between gap-3">
        <p className="text-[10px] font-medium text-muted">{label}</p>

        <div className="flex size-7 items-center justify-center rounded-lg bg-theme-accent-faint">
          <Icon aria-hidden="true" className="size-3.5 text-theme-accent" />
        </div>
      </div>

      <p className="mt-3 truncate text-lg font-semibold tracking-[-0.04em] text-foreground">{value}</p>

      <p className="mt-1 text-[9px] text-muted">{note}</p>
    </div>
  );
}
