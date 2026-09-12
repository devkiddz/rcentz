import Link from 'next/link';

import { ArrowRight, CalendarClock, CreditCard, ReceiptText, WalletCards } from 'lucide-react';

import type { ClientBillingData } from '@/features/client/server/billing/get-client-billing';

type ClientBillingPageProps = {
  billing: ClientBillingData;
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

  return new Intl.DateTimeFormat('en-NG', {
    day: 'numeric',
    month: 'short',
    year: 'numeric'
  }).format(value);
}

function formatStatus(value: string) {
  return value
    .toLowerCase()
    .split('_')
    .map(word => {
      return word.charAt(0).toUpperCase() + word.slice(1);
    })
    .join(' ');
}

export function ClientBillingPage({ billing }: ClientBillingPageProps) {
  const summary = billing.summary;
  const nextPayment = billing.nextPayment;

  return (
    <main className="px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
      <div className="mx-auto w-full max-w-[var(--section-max)] space-y-7">
        <section>
          <p className="font-mono text-[9px] uppercase tracking-[0.16em] text-theme-accent">Billing</p>

          <h1 className="mt-2 text-xl font-semibold tracking-[-0.04em] text-foreground sm:text-2xl">
            Account finance
          </h1>

          <p className="mt-1 max-w-2xl text-xs leading-5 text-muted">
            Understand what you have paid for, what remains outstanding and what may be billed next.
          </p>
        </section>

        <section className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
          <BillingMetric
            label="Total billed"
            value={formatMoney(summary.billed, summary.currency)}
            note={`${summary.invoiceCount} billing record${summary.invoiceCount === 1 ? '' : 's'}`}
            footer="Issued account value"
          />

          <BillingMetric
            label="Total paid"
            value={formatMoney(summary.paid, summary.currency)}
            note={`${summary.paidInvoiceCount} fully settled`}
            footer="Recorded payments"
          />

          <BillingMetric
            label="Outstanding"
            value={formatMoney(summary.outstanding, summary.currency)}
            note={`${summary.openInvoiceCount} open invoice${summary.openInvoiceCount === 1 ? '' : 's'}`}
            footer="Remaining obligation"
          />

          <BillingMetric
            label="Overdue"
            value={formatMoney(summary.overdue, summary.currency)}
            note={`${summary.overdueInvoiceCount} overdue invoice${summary.overdueInvoiceCount === 1 ? '' : 's'}`}
            footer="Past due balance"
          />
        </section>

        <section className="grid gap-4 lg:grid-cols-[0.8fr_1.2fr]">
          <div className="overflow-hidden rounded-[20px] border border-border bg-background">
            <div className="flex items-start justify-between gap-4 border-b border-border bg-surface-raised px-5 py-4">
              <div>
                <p className="text-sm font-semibold text-foreground">Next payment</p>

                <p className="mt-1 text-[10px] text-muted">Nearest recorded financial obligation</p>
              </div>

              <CalendarClock className="size-4 text-theme-accent" />
            </div>

            <div className="p-5">
              {nextPayment ? (
                <>
                  <p className="text-2xl font-semibold tracking-[-0.05em] text-foreground">
                    {formatMoney(nextPayment.amount, nextPayment.currency)}
                  </p>

                  <p className="mt-2 text-[11px] font-semibold text-foreground">{nextPayment.label}</p>

                  <p className="mt-1 text-[10px] text-muted">Due {formatDate(nextPayment.dueAt)}</p>
                </>
              ) : (
                <div className="rounded-xl border border-dashed border-border px-4 py-6">
                  <p className="text-xs font-medium text-foreground">No payment currently due</p>

                  <p className="mt-1 text-[10px] leading-5 text-muted">
                    There are no outstanding invoices or scheduled subscription charges.
                  </p>
                </div>
              )}
            </div>

            <div className="border-t border-border bg-surface-muted/40 px-5 py-3">
              {nextPayment?.type === 'INVOICE' ? (
                <Link
                  href={`/dashboard/billing/invoices/${nextPayment.id}`}
                  className="inline-flex items-center gap-1.5 text-[10px] font-semibold text-theme-accent">
                  View full invoice
                  <ArrowRight className="size-3" />
                </Link>
              ) : nextPayment?.type === 'SUBSCRIPTION' ? (
                <p className="text-[10px] font-medium text-muted">Upcoming subscription billing</p>
              ) : (
                <p className="text-[10px] text-muted">Your next obligation will appear here.</p>
              )}
            </div>
          </div>

          <div className="overflow-hidden rounded-[20px] border border-border bg-background">
            <div className="flex items-start justify-between gap-4 border-b border-border bg-surface-raised px-5 py-4">
              <div>
                <p className="text-sm font-semibold text-foreground">Billing position</p>

                <p className="mt-1 text-[10px] text-muted">Current account commitment</p>
              </div>

              <ReceiptText className="size-4 text-theme-accent" />
            </div>

            <div className="grid gap-3 p-5 sm:grid-cols-2">
              <PositionCard
                label="Remaining to pay"
                value={formatMoney(summary.outstanding, summary.currency)}
                note={`Across ${summary.openInvoiceCount} open invoice${summary.openInvoiceCount === 1 ? '' : 's'}`}
                footer="Outstanding balance"
              />

              <PositionCard
                label="Active plans"
                value={String(summary.activeSubscriptionCount)}
                note="Subscriptions and retainers"
                footer="Recurring commitments"
              />
            </div>

            <div className="border-t border-border bg-surface-muted/40 px-5 py-3">
              <p className="text-[10px] text-muted">
                Billing figures are calculated from your recorded Rcentz invoices and payments.
              </p>
            </div>
          </div>
        </section>

        <section>
          <div>
            <p className="text-sm font-semibold text-foreground">Invoices</p>

            <p className="mt-1 text-[10px] text-muted">
              What you were charged for, what you paid and what remains.
            </p>
          </div>

          {billing.invoices.length === 0 ? (
            <div className="mt-4 overflow-hidden rounded-[20px] border border-border bg-background">
              <div className="border-b border-border bg-surface-raised px-5 py-4">
                <p className="text-xs font-semibold text-foreground">Invoice records</p>
              </div>

              <div className="px-6 py-12 text-center">
                <p className="text-xs font-medium text-foreground">No invoices yet</p>

                <p className="mt-1 text-[10px] text-muted">Issued invoices will appear here.</p>
              </div>

              <div className="border-t border-border bg-surface-muted/40 px-5 py-3">
                <p className="text-[10px] text-muted">No billing history available.</p>
              </div>
            </div>
          ) : (
            <div className="mt-4 grid gap-4 lg:grid-cols-2">
              {billing.invoices.map(invoice => {
                return <InvoiceCard key={invoice.id} invoice={invoice} />;
              })}
            </div>
          )}
        </section>

        <section className="grid gap-4 lg:grid-cols-2">
          <div className="overflow-hidden rounded-[20px] border border-border bg-background">
            <div className="flex items-start justify-between gap-4 border-b border-border bg-surface-raised px-5 py-4">
              <div>
                <p className="text-sm font-semibold text-foreground">Recent payments</p>

                <p className="mt-1 text-[10px] text-muted">Previous money recorded against invoices</p>
              </div>

              <WalletCards className="size-4 text-theme-accent" />
            </div>

            <div className="p-4 sm:p-5">
              {billing.recentPayments.length === 0 ? (
                <div className="rounded-xl border border-dashed border-border px-4 py-8 text-center">
                  <p className="text-[10px] text-muted">No payment records yet.</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {billing.recentPayments.slice(0, 6).map(payment => {
                    return (
                      <Link
                        key={payment.id}
                        href={`/dashboard/billing/invoices/${payment.invoice.id}`}
                        className="group block overflow-hidden rounded-xl border border-border bg-background transition-colors hover:border-foreground/20">
                        <div className="flex items-center justify-between gap-3 border-b border-border bg-surface-raised px-4 py-3">
                          <div className="min-w-0">
                            <p className="truncate text-[10px] font-semibold text-foreground">
                              {payment.invoice.invoiceNumber}
                            </p>

                            <p className="mt-0.5 text-[8px] uppercase tracking-[0.08em] text-muted">
                              Payment record
                            </p>
                          </div>

                          <StatusBadge
                            label={formatStatus(payment.status)}
                            active={payment.status === 'SUCCESS'}
                          />
                        </div>

                        <div className="px-4 py-4">
                          <p className="text-lg font-semibold tracking-[-0.04em] text-foreground">
                            {formatMoney(payment.amount, payment.currency)}
                          </p>

                          <div className="mt-3 grid grid-cols-2 gap-3">
                            <SmallInfo label="Method" value={formatStatus(payment.method)} />

                            <SmallInfo label="Paid" value={formatDate(payment.paidAt ?? payment.createdAt)} />
                          </div>

                          <p className="mt-3 truncate text-[9px] text-muted">
                            Reference: {payment.reference ?? 'Not recorded'}
                          </p>
                        </div>

                        <div className="flex items-center justify-between gap-3 border-t border-border bg-surface-muted/40 px-4 py-3">
                          <span className="text-[9px] text-muted">Open related invoice</span>

                          <ArrowRight className="size-3 text-theme-accent transition-transform group-hover:translate-x-0.5" />
                        </div>
                      </Link>
                    );
                  })}
                </div>
              )}
            </div>

            <div className="border-t border-border bg-surface-muted/40 px-5 py-3">
              <p className="text-[10px] text-muted">Showing your latest recorded transactions.</p>
            </div>
          </div>

          <div className="overflow-hidden rounded-[20px] border border-border bg-background">
            <div className="flex items-start justify-between gap-4 border-b border-border bg-surface-raised px-5 py-4">
              <div>
                <p className="text-sm font-semibold text-foreground">Service plans</p>

                <p className="mt-1 text-[10px] text-muted">Recurring and managed service commitments</p>
              </div>

              <CreditCard className="size-4 text-theme-accent" />
            </div>

            <div className="p-4 sm:p-5">
              {billing.subscriptions.length === 0 ? (
                <div className="rounded-xl border border-dashed border-border px-4 py-8 text-center">
                  <p className="text-[10px] text-muted">No subscriptions yet.</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {billing.subscriptions.slice(0, 6).map(subscription => {
                    return (
                      <div
                        key={subscription.id}
                        className="overflow-hidden rounded-xl border border-border bg-background">
                        <div className="flex items-start justify-between gap-3 border-b border-border bg-surface-raised px-4 py-3">
                          <div className="min-w-0">
                            <p className="truncate text-[10px] font-semibold text-foreground">
                              {subscription.plan.name}
                            </p>

                            <p className="mt-0.5 truncate text-[8px] uppercase tracking-[0.08em] text-muted">
                              {subscription.subscriptionNumber}
                            </p>
                          </div>

                          <StatusBadge
                            label={formatStatus(subscription.status)}
                            active={subscription.status === 'ACTIVE' || subscription.status === 'TRIALING'}
                          />
                        </div>

                        <div className="px-4 py-4">
                          <p className="text-lg font-semibold tracking-[-0.04em] text-foreground">
                            {formatMoney(subscription.priceAmount, subscription.currency)}
                          </p>

                          <p className="mt-1 text-[9px] text-muted">Recurring service commitment</p>

                          <div className="mt-3 grid grid-cols-2 gap-3">
                            <SmallInfo
                              label="Billing cycle"
                              value={`Every ${subscription.interval.count} ${subscription.interval.unit.toLowerCase()}`}
                            />

                            <SmallInfo label="Next billing" value={formatDate(subscription.nextBillingAt)} />
                          </div>
                        </div>

                        <div className="flex items-center justify-between gap-3 border-t border-border bg-surface-muted/40 px-4 py-3">
                          <span className="text-[9px] text-muted">
                            {subscription.autoRenew ? 'Auto renewal enabled' : 'Manual renewal'}
                          </span>

                          <span className="size-1.5 rounded-full bg-theme-accent" />
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            <div className="border-t border-border bg-surface-muted/40 px-5 py-3">
              <p className="text-[10px] text-muted">Active subscriptions and managed service plans.</p>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}

type InvoiceItem = ClientBillingData['invoices'][number];

function InvoiceCard({ invoice }: { invoice: InvoiceItem }) {
  const primaryItem = invoice.items[0] ?? null;

  return (
    <Link
      href={`/dashboard/billing/invoices/${invoice.id}`}
      className="group overflow-hidden rounded-[20px] border border-border bg-background transition-[border-color,transform] hover:-translate-y-0.5 hover:border-foreground/20">
      <div className="flex items-start justify-between gap-4 border-b border-border bg-surface-raised px-5 py-4">
        <div className="min-w-0">
          <p className="text-[9px] font-semibold uppercase tracking-[0.12em] text-muted">
            {invoice.invoiceNumber}
          </p>

          <p className="mt-1 truncate text-[10px] text-muted">{invoice.source.label}</p>
        </div>

        <StatusBadge
          label={formatStatus(invoice.effectiveStatus)}
          active={invoice.effectiveStatus === 'PAID' || invoice.effectiveStatus === 'ISSUED'}
        />
      </div>

      <div className="p-5">
        <h2 className="text-sm font-semibold tracking-[-0.02em] text-foreground">
          {primaryItem?.name ?? invoice.source.label}
        </h2>

        <p className="mt-1 text-[10px] text-muted">
          {invoice.itemCount} item{invoice.itemCount === 1 ? '' : 's'}
          {invoice.source.reference ? (
            <>
              {' · '}
              {invoice.source.reference}
            </>
          ) : null}
        </p>

        {primaryItem?.description ? (
          <p className="mt-3 line-clamp-2 text-[10px] leading-5 text-muted">{primaryItem.description}</p>
        ) : null}

        {invoice.items.length > 1 ? (
          <div className="mt-4 rounded-xl border border-border bg-surface px-3 py-3">
            <p className="text-[8px] font-semibold uppercase tracking-[0.08em] text-muted">Also included</p>

            <div className="mt-2 space-y-1.5">
              {invoice.items.slice(1).map(item => {
                return (
                  <p key={item.id} className="truncate text-[9px] text-foreground">
                    {item.name}
                  </p>
                );
              })}

              {invoice.hiddenItemCount > 0 ? (
                <p className="text-[9px] text-muted">
                  + {invoice.hiddenItemCount} more item{invoice.hiddenItemCount === 1 ? '' : 's'}
                </p>
              ) : null}
            </div>
          </div>
        ) : null}

        <div className="mt-5 grid grid-cols-3 overflow-hidden rounded-xl border border-border">
          <InvoiceMoney label="Total" value={formatMoney(invoice.total, invoice.currency)} />

          <InvoiceMoney label="Paid" value={formatMoney(invoice.amountPaid, invoice.currency)} />

          <InvoiceMoney label="Balance" value={formatMoney(invoice.balanceDue, invoice.currency)} />
        </div>
      </div>

      <div className="flex items-center justify-between gap-4 border-t border-border bg-surface-muted/40 px-5 py-3">
        <div>
          <p className="text-[8px] uppercase tracking-[0.08em] text-muted">
            {invoice.paidAt ? 'Paid' : 'Due'}
          </p>

          <p className="mt-0.5 text-[9px] font-medium text-foreground">
            {invoice.paidAt ? formatDate(invoice.paidAt) : formatDate(invoice.dueAt)}
          </p>
        </div>

        <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-theme-accent">
          View full invoice
          <ArrowRight className="size-3 transition-transform group-hover:translate-x-0.5" />
        </span>
      </div>
    </Link>
  );
}

function BillingMetric({
  label,
  value,
  note,
  footer
}: {
  label: string;
  value: string | number;
  note: string;
  footer: string;
}) {
  return (
    <div className="overflow-hidden rounded-[18px] border border-border bg-background">
      <div className="border-b border-border bg-surface-raised px-4 py-3">
        <p className="text-[10px] font-semibold text-foreground">{label}</p>
      </div>

      <div className="px-4 py-4">
        <p className="text-lg font-semibold tracking-[-0.04em] text-foreground">{value}</p>

        <p className="mt-1 text-[9px] text-muted">{note}</p>
      </div>

      <div className="border-t border-border bg-surface-muted/40 px-4 py-2.5">
        <p className="text-[8px] uppercase tracking-[0.08em] text-muted">{footer}</p>
      </div>
    </div>
  );
}

function PositionCard({
  label,
  value,
  note,
  footer
}: {
  label: string;
  value: string;
  note: string;
  footer: string;
}) {
  return (
    <div className="overflow-hidden rounded-xl border border-border bg-background">
      <div className="border-b border-border bg-surface-raised px-4 py-3">
        <p className="text-[9px] font-semibold text-foreground">{label}</p>
      </div>

      <div className="px-4 py-4">
        <p className="text-lg font-semibold tracking-[-0.04em] text-foreground">{value}</p>

        <p className="mt-1 text-[9px] text-muted">{note}</p>
      </div>

      <div className="border-t border-border bg-surface-muted/40 px-4 py-2.5">
        <p className="text-[8px] uppercase tracking-[0.08em] text-muted">{footer}</p>
      </div>
    </div>
  );
}

function InvoiceMoney({ label, value }: { label: string; value: string }) {
  return (
    <div className="min-w-0 border-r border-border bg-background px-3 py-3 last:border-r-0">
      <p className="text-[8px] uppercase tracking-[0.08em] text-muted">{label}</p>

      <p className="mt-1 truncate text-[10px] font-semibold text-foreground">{value}</p>
    </div>
  );
}

function SmallInfo({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg border border-border bg-surface px-3 py-2.5">
      <p className="text-[8px] uppercase tracking-[0.08em] text-muted">{label}</p>

      <p className="mt-1 truncate text-[9px] font-medium text-foreground">{value}</p>
    </div>
  );
}

function StatusBadge({ label, active = false }: { label: string; active?: boolean }) {
  return (
    <span className="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-border bg-background px-2.5 py-1">
      <span className={active ? 'size-1.5 rounded-full bg-theme-accent' : 'size-1.5 rounded-full bg-muted'} />

      <span className="text-[8px] font-semibold text-foreground">{label}</span>
    </span>
  );
}
