import Link from 'next/link';

import { ArrowLeft, CircleDollarSign, ExternalLink, FileText, ReceiptText, UserRound } from 'lucide-react';

import type { AdminInvoiceData } from '@/features/admin/server/invoices/get-admin-invoice';

type AdminInvoicePageProps = {
  invoice: AdminInvoiceData;
};

function formatMoney(amount: number, currency: string) {
  return new Intl.NumberFormat('en-NG', {
    style: 'currency',
    currency,
    maximumFractionDigits: 2
  }).format(amount);
}

function formatQuantity(value: number) {
  return new Intl.NumberFormat('en-NG', {
    maximumFractionDigits: 2
  }).format(value);
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

export function AdminInvoicePage({ invoice }: AdminInvoicePageProps) {
  return (
    <main className="px-4 py-6 sm:px-6 lg:px-8">
      <div className="mx-auto w-full max-w-[1200px] space-y-5">
        <section className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <Link
              href="/admin/invoices"
              className="inline-flex items-center gap-2 text-[10px] font-medium text-muted transition-colors hover:text-foreground">
              <ArrowLeft className="size-3.5" />
              Back to invoices
            </Link>

            <p className="mt-5 font-mono text-[9px] uppercase tracking-[0.16em] text-theme-accent">
              Finance / Invoice
            </p>

            <h1 className="mt-2 text-xl font-semibold tracking-[-0.04em] text-foreground sm:text-2xl">
              {invoice.invoiceNumber}
            </h1>

            <p className="mt-1 text-xs text-muted">Complete administrative billing record.</p>
          </div>

          <div className="flex items-center gap-2">
            {invoice.pdfUrl ? (
              <a
                href={invoice.pdfUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex h-9 items-center gap-2 rounded-xl border border-border bg-background px-3 text-[10px] font-semibold text-foreground transition-colors hover:bg-surface-raised">
                <ExternalLink className="size-3.5" />
                Open PDF
              </a>
            ) : null}

            <StatusBadge status={invoice.effectiveStatus} />
          </div>
        </section>

        <section className="grid gap-4 xl:grid-cols-[1.15fr_0.85fr]">
          <div className="overflow-hidden rounded-[20px] border border-border bg-background">
            <div className="flex items-center justify-between gap-4 border-b border-border bg-surface-raised px-5 py-4">
              <div>
                <p className="text-sm font-semibold text-foreground">Invoice identity</p>

                <p className="mt-1 text-[10px] text-muted">Billing source and client relationship</p>
              </div>

              <FileText className="size-4 text-theme-accent" />
            </div>

            <div className="grid gap-3 p-5 sm:grid-cols-2">
              <InformationCell label="Invoice number" value={invoice.invoiceNumber} />

              <InformationCell label="Status" value={formatStatus(invoice.effectiveStatus)} />

              <InformationCell label="Source" value={invoice.source.label} />

              <InformationCell
                label="Source reference"
                value={invoice.source.reference ?? 'Not applicable'}
              />

              <InformationCell label="Issued" value={formatDate(invoice.issuedAt ?? invoice.createdAt)} />

              <InformationCell label="Due" value={formatDate(invoice.dueAt)} />
            </div>

            <div className="border-t border-border bg-surface-muted/40 px-5 py-3">
              <p className="text-[9px] text-muted">
                Source type: {formatStatus(String(invoice.source.type))}
              </p>
            </div>
          </div>

          <div className="overflow-hidden rounded-[20px] border border-border bg-background">
            <div className="flex items-center justify-between gap-4 border-b border-border bg-surface-raised px-5 py-4">
              <div>
                <p className="text-sm font-semibold text-foreground">Client</p>

                <p className="mt-1 text-[10px] text-muted">Account and billing identity</p>
              </div>

              <UserRound className="size-4 text-theme-accent" />
            </div>

            <div className="p-5">
              <p className="text-[15px] font-semibold text-foreground">{invoice.client.displayName}</p>

              <p className="mt-1 text-[10px] text-muted">{invoice.client.email ?? 'No account email'}</p>

              <div className="mt-5 grid gap-3 sm:grid-cols-2 xl:grid-cols-1">
                <InformationCell
                  label="Invoice customer"
                  value={invoice.customer.name ?? invoice.client.displayName}
                />

                <InformationCell
                  label="Billing email"
                  value={invoice.customer.email ?? invoice.client.email ?? 'Not recorded'}
                />

                <InformationCell label="Phone" value={invoice.customer.phone ?? 'Not recorded'} />
              </div>

              {invoice.customer.billingAddress ? (
                <div className="mt-3 rounded-xl border border-border bg-surface px-3 py-3">
                  <p className="text-[8px] uppercase tracking-[0.08em] text-muted">Billing address</p>

                  <p className="mt-1.5 text-[10px] leading-5 text-foreground">
                    {invoice.customer.billingAddress}
                  </p>
                </div>
              ) : null}
            </div>

            <div className="border-t border-border bg-surface-muted/40 px-5 py-3">
              <p className="text-[9px] text-muted">
                {invoice.client.id ? 'Linked client account' : 'Invoice customer snapshot'}
              </p>
            </div>
          </div>
        </section>

        <section className="overflow-hidden rounded-[20px] border border-border bg-background">
          <div className="flex items-center justify-between gap-4 border-b border-border bg-surface-raised px-5 py-4">
            <div>
              <p className="text-sm font-semibold text-foreground">Invoice items</p>

              <p className="mt-1 text-[10px] text-muted">
                Products, services or project commitments included in this bill.
              </p>
            </div>

            <ReceiptText className="size-4 text-theme-accent" />
          </div>

          {invoice.items.length === 0 ? (
            <div className="px-5 py-12 text-center">
              <p className="text-xs font-medium text-foreground">No line items</p>

              <p className="mt-1 text-[10px] text-muted">This invoice currently has no billing items.</p>
            </div>
          ) : (
            <div>
              <div className="hidden grid-cols-[minmax(0,1fr)_90px_150px_150px] border-b border-border px-5 py-3 text-[8px] font-semibold uppercase tracking-[0.08em] text-muted sm:grid">
                <span>Item</span>
                <span>Quantity</span>
                <span>Unit price</span>
                <span className="text-right">Total</span>
              </div>

              <div className="divide-y divide-border">
                {invoice.items.map(item => {
                  return (
                    <div
                      key={item.id}
                      className="grid gap-3 px-5 py-4 sm:grid-cols-[minmax(0,1fr)_90px_150px_150px] sm:items-center">
                      <div className="min-w-0">
                        <p className="text-[11px] font-semibold text-foreground">{item.name}</p>

                        {item.description ? (
                          <p className="mt-1 text-[9px] leading-4 text-muted">{item.description}</p>
                        ) : null}

                        <p className="mt-1 text-[8px] uppercase tracking-[0.08em] text-muted">
                          {formatStatus(String(item.type))}
                        </p>
                      </div>

                      <ItemValue label="Quantity" value={formatQuantity(item.quantity)} />

                      <ItemValue label="Unit price" value={formatMoney(item.unitPrice, invoice.currency)} />

                      <ItemValue label="Total" value={formatMoney(item.total, invoice.currency)} alignRight />
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          <div className="border-t border-border bg-surface-muted/40 px-5 py-3">
            <p className="text-[9px] text-muted">
              {invoice.items.length} line item{invoice.items.length === 1 ? '' : 's'}
            </p>
          </div>
        </section>

        <section className="grid gap-4 lg:grid-cols-[1fr_380px]">
          <div className="overflow-hidden rounded-[20px] border border-border bg-background">
            <div className="flex items-center justify-between gap-4 border-b border-border bg-surface-raised px-5 py-4">
              <div>
                <p className="text-sm font-semibold text-foreground">Payment position</p>

                <p className="mt-1 text-[10px] text-muted">Current receivable position for this invoice</p>
              </div>

              <CircleDollarSign className="size-4 text-theme-accent" />
            </div>

            <div className="p-5">
              <p className="text-[9px] uppercase tracking-[0.1em] text-muted">Remaining balance</p>

              <p className="mt-2 text-[28px] font-semibold tracking-[-0.05em] text-foreground">
                {formatMoney(invoice.balanceDue, invoice.currency)}
              </p>

              <p className="mt-2 text-[10px] text-muted">
                {invoice.balanceDue === 0
                  ? 'This invoice is fully settled.'
                  : `${formatMoney(invoice.amountPaid, invoice.currency)} has been recorded as paid.`}
              </p>

              <div className="mt-5 grid gap-3 sm:grid-cols-3">
                <InformationCell label="Total invoice" value={formatMoney(invoice.total, invoice.currency)} />

                <InformationCell
                  label="Amount paid"
                  value={formatMoney(invoice.amountPaid, invoice.currency)}
                />

                <InformationCell
                  label="Balance due"
                  value={formatMoney(invoice.balanceDue, invoice.currency)}
                />
              </div>
            </div>

            <div className="border-t border-border bg-surface-muted/40 px-5 py-3">
              <p className="text-[9px] text-muted">
                {invoice.payments.length} recorded payment{invoice.payments.length === 1 ? '' : 's'}
              </p>
            </div>
          </div>

          <div className="overflow-hidden rounded-[20px] border border-border bg-background">
            <div className="border-b border-border bg-surface-raised px-5 py-4">
              <p className="text-sm font-semibold text-foreground">Totals</p>

              <p className="mt-1 text-[10px] text-muted">Invoice calculation</p>
            </div>

            <div className="p-5">
              <TotalRow label="Subtotal" value={formatMoney(invoice.subtotal, invoice.currency)} />

              <TotalRow label="Discount" value={formatMoney(invoice.discount, invoice.currency)} />

              <TotalRow label="Tax" value={formatMoney(invoice.tax, invoice.currency)} />

              <div className="my-3 border-t border-border" />

              <TotalRow label="Total" value={formatMoney(invoice.total, invoice.currency)} strong />

              <TotalRow label="Paid" value={formatMoney(invoice.amountPaid, invoice.currency)} />

              <TotalRow label="Balance" value={formatMoney(invoice.balanceDue, invoice.currency)} strong />
            </div>

            <div className="border-t border-border bg-surface-muted/40 px-5 py-3">
              <p className="text-[9px] text-muted">Currency: {invoice.currency}</p>
            </div>
          </div>
        </section>

        <section className="overflow-hidden rounded-[20px] border border-border bg-background">
          <div className="border-b border-border bg-surface-raised px-5 py-4">
            <p className="text-sm font-semibold text-foreground">Payment history</p>

            <p className="mt-1 text-[10px] text-muted">Transactions recorded against this invoice.</p>
          </div>

          {invoice.payments.length === 0 ? (
            <div className="px-5 py-12 text-center">
              <p className="text-xs font-medium text-foreground">No payments recorded</p>

              <p className="mt-1 text-[10px] text-muted">
                Payment records will appear here when this invoice receives funds.
              </p>
            </div>
          ) : (
            <div className="divide-y divide-border">
              {invoice.payments.map(payment => {
                return (
                  <div
                    key={payment.id}
                    className="grid gap-4 px-5 py-4 sm:grid-cols-[minmax(0,1fr)_160px_150px] sm:items-center">
                    <div className="min-w-0">
                      <p className="text-[11px] font-semibold text-foreground">
                        {formatStatus(String(payment.method))}
                      </p>

                      <p className="mt-1 truncate text-[9px] text-muted">
                        {payment.reference ?? payment.providerReference ?? 'No payment reference'}
                      </p>

                      <p className="mt-1 text-[8px] uppercase tracking-[0.08em] text-muted">
                        {payment.providerName ?? formatStatus(String(payment.provider))}
                      </p>
                    </div>

                    <div>
                      <p className="text-[8px] uppercase tracking-[0.08em] text-muted">Status</p>

                      <div className="mt-1">
                        <StatusBadge status={String(payment.status)} />
                      </div>
                    </div>

                    <div className="sm:text-right">
                      <p className="text-[11px] font-semibold text-foreground">
                        {formatMoney(payment.amount, payment.currency)}
                      </p>

                      <p className="mt-1 text-[9px] text-muted">
                        {formatDate(payment.paidAt ?? payment.createdAt)}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          <div className="border-t border-border bg-surface-muted/40 px-5 py-3">
            <p className="text-[9px] text-muted">Payment history is read-only in this phase.</p>
          </div>
        </section>

        {invoice.notes ? (
          <section className="overflow-hidden rounded-[20px] border border-border bg-background">
            <div className="border-b border-border bg-surface-raised px-5 py-4">
              <p className="text-sm font-semibold text-foreground">Invoice notes</p>
            </div>

            <div className="p-5">
              <p className="whitespace-pre-line text-[10px] leading-5 text-muted">{invoice.notes}</p>
            </div>

            <div className="border-t border-border bg-surface-muted/40 px-5 py-3">
              <p className="text-[9px] text-muted">Client-visible invoice information</p>
            </div>
          </section>
        ) : null}

        <section className="overflow-hidden rounded-[20px] border border-border bg-background">
          <div className="border-b border-border bg-surface-raised px-5 py-4">
            <p className="text-sm font-semibold text-foreground">Record information</p>
          </div>

          <div className="grid gap-3 p-5 sm:grid-cols-2 lg:grid-cols-4">
            <InformationCell label="Created" value={formatDate(invoice.createdAt)} />

            <InformationCell label="Last updated" value={formatDate(invoice.updatedAt)} />

            <InformationCell label="Paid" value={formatDate(invoice.paidAt)} />

            <InformationCell label="Voided" value={formatDate(invoice.voidedAt)} />
          </div>

          <div className="border-t border-border bg-surface-muted/40 px-5 py-3">
            <p className="text-[9px] text-muted">
              Administrative invoice record · mutation controls come in the next phase.
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}

function InformationCell({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border border-border bg-surface px-3 py-3">
      <p className="text-[8px] uppercase tracking-[0.08em] text-muted">{label}</p>

      <p className="mt-1.5 text-[10px] font-medium text-foreground">{value}</p>
    </div>
  );
}

function ItemValue({
  label,
  value,
  alignRight = false
}: {
  label: string;
  value: string;
  alignRight?: boolean;
}) {
  return (
    <div className={alignRight ? 'sm:text-right' : ''}>
      <p className="text-[8px] uppercase tracking-[0.08em] text-muted sm:hidden">{label}</p>

      <p className="mt-1 text-[10px] font-medium text-foreground sm:mt-0">{value}</p>
    </div>
  );
}

function TotalRow({ label, value, strong = false }: { label: string; value: string; strong?: boolean }) {
  return (
    <div className="flex items-center justify-between gap-4 py-1.5">
      <span className={strong ? 'text-[10px] font-semibold text-foreground' : 'text-[10px] text-muted'}>
        {label}
      </span>

      <span
        className={
          strong ? 'text-[10px] font-semibold text-foreground' : 'text-[10px] font-medium text-foreground'
        }>
        {value}
      </span>
    </div>
  );
}

function StatusBadge({ status }: { status: string }) {
  let dotClassName = 'bg-muted';

  if (status === 'PAID' || status === 'SUCCESS') {
    dotClassName = 'bg-theme-accent';
  }

  if (status === 'ISSUED' || status === 'PARTIALLY_PAID' || status === 'PENDING' || status === 'PROCESSING') {
    dotClassName = 'bg-amber-500';
  }

  if (status === 'OVERDUE' || status === 'FAILED' || status === 'VOID' || status === 'CANCELLED') {
    dotClassName = 'bg-rose-500';
  }

  return (
    <span className="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-border bg-background px-2.5 py-1">
      <span className={`size-1.5 rounded-full ${dotClassName}`} />

      <span className="text-[8px] font-semibold text-foreground">{formatStatus(status)}</span>
    </span>
  );
}
