import Link from 'next/link';

import { ArrowLeft, Download } from 'lucide-react';

import { InvoicePrintButton } from '@/features/client/components/billing/InvoicePrintButton';

import type { ClientInvoiceData } from '@/features/client/server/billing/get-client-invoice';

type ClientInvoicePageProps = {
  invoice: ClientInvoiceData;
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

export function ClientInvoicePage({ invoice }: ClientInvoicePageProps) {
  return (
    <main className="px-4 py-6 sm:px-6 sm:py-8 lg:px-8 print:p-0">
      <div className="mx-auto w-full max-w-[1000px]">
        <div className="mb-5 flex flex-wrap items-center justify-between gap-3 print:hidden">
          <Link
            href="/dashboard/billing"
            className="inline-flex items-center gap-2 text-[10px] font-semibold text-muted transition-colors hover:text-foreground">
            <ArrowLeft className="size-3.5" />
            Back to billing
          </Link>

          <div className="flex items-center gap-2">
            {invoice.pdfUrl ? (
              <a
                href={invoice.pdfUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex h-9 items-center gap-2 rounded-xl border border-border bg-surface px-3 text-[10px] font-semibold text-foreground transition-colors hover:bg-surface-raised">
                <Download className="size-3.5" />
                Download PDF
              </a>
            ) : null}

            <InvoicePrintButton />
          </div>
        </div>

        <article className="overflow-hidden rounded-[24px] border border-border bg-background print:rounded-none print:border-0">
          <header className="border-b border-border px-5 py-6 sm:px-8 sm:py-8">
            <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <div className="flex size-10 items-center justify-center rounded-full bg-foreground text-sm font-bold text-background">
                  R
                </div>

                <p className="mt-3 text-sm font-semibold text-foreground">Rcentz Systems</p>

                <p className="mt-1 text-[10px] text-muted">Technology services and systems</p>
              </div>

              <div className="sm:text-right">
                <p className="font-mono text-[9px] uppercase tracking-[0.16em] text-muted">Invoice</p>

                <h1 className="mt-2 text-xl font-semibold tracking-[-0.04em] text-foreground">
                  {invoice.invoiceNumber}
                </h1>

                <span className="mt-3 inline-flex rounded-full bg-theme-accent-faint px-2.5 py-1 text-[8px] font-semibold text-theme-accent">
                  {formatStatus(invoice.effectiveStatus)}
                </span>
              </div>
            </div>
          </header>

          <section className="grid border-b border-border md:grid-cols-2">
            <div className="border-b border-border p-5 sm:p-8 md:border-b-0 md:border-r">
              <p className="text-[9px] font-semibold uppercase tracking-[0.12em] text-muted">Bill to</p>

              <p className="mt-3 text-sm font-semibold text-foreground">
                {invoice.customer.name ?? 'Client'}
              </p>

              {invoice.customer.email ? (
                <p className="mt-1 text-[10px] text-muted">{invoice.customer.email}</p>
              ) : null}

              {invoice.customer.phone ? (
                <p className="mt-1 text-[10px] text-muted">{invoice.customer.phone}</p>
              ) : null}

              {invoice.customer.billingAddress ? (
                <p className="mt-2 max-w-sm text-[10px] leading-5 text-muted">
                  {invoice.customer.billingAddress}
                </p>
              ) : null}
            </div>

            <div className="p-5 sm:p-8">
              <div className="grid grid-cols-2 gap-4">
                <InvoiceInfo label="Issued" value={formatDate(invoice.issuedAt ?? invoice.createdAt)} />

                <InvoiceInfo label="Due" value={formatDate(invoice.dueAt)} />

                <InvoiceInfo label="Source" value={invoice.source.label} />

                <InvoiceInfo label="Reference" value={invoice.source.reference ?? 'Not applicable'} />
              </div>
            </div>
          </section>

          <section className="p-5 sm:p-8">
            <div>
              <p className="text-sm font-semibold text-foreground">Invoice items</p>

              <p className="mt-1 text-[10px] text-muted">
                Services, products or commitments included in this invoice.
              </p>
            </div>

            <div className="mt-5 overflow-hidden rounded-xl border border-border">
              <div className="hidden grid-cols-[minmax(0,1fr)_80px_130px_130px] border-b border-border bg-surface-raised px-4 py-3 text-[8px] font-semibold uppercase tracking-[0.08em] text-muted sm:grid">
                <span>Item</span>
                <span>Qty</span>
                <span>Unit price</span>
                <span className="text-right">Total</span>
              </div>

              <div className="divide-y divide-border">
                {invoice.items.map(item => {
                  return (
                    <div
                      key={item.id}
                      className="grid gap-3 px-4 py-4 sm:grid-cols-[minmax(0,1fr)_80px_130px_130px] sm:items-center">
                      <div className="min-w-0">
                        <p className="text-[11px] font-semibold text-foreground">{item.name}</p>

                        {item.description ? (
                          <p className="mt-1 text-[9px] leading-4 text-muted">{item.description}</p>
                        ) : null}

                        <p className="mt-1 text-[8px] uppercase tracking-[0.08em] text-muted">
                          {formatStatus(item.type)}
                        </p>
                      </div>

                      <InvoiceItemValue label="Qty" value={formatQuantity(item.quantity)} />

                      <InvoiceItemValue
                        label="Unit price"
                        value={formatMoney(item.unitPrice, invoice.currency)}
                      />

                      <InvoiceItemValue
                        label="Total"
                        value={formatMoney(item.total, invoice.currency)}
                        alignRight
                      />
                    </div>
                  );
                })}
              </div>
            </div>
          </section>

          <section className="grid border-t border-border md:grid-cols-[1fr_360px]">
            <div className="border-b border-border p-5 sm:p-8 md:border-b-0 md:border-r">
              <p className="text-[9px] font-semibold uppercase tracking-[0.12em] text-muted">
                Payment position
              </p>

              <p className="mt-3 text-[28px] font-semibold tracking-[-0.05em] text-foreground">
                {formatMoney(invoice.balanceDue, invoice.currency)}
              </p>

              <p className="mt-1 text-[10px] text-muted">Remaining balance</p>

              {invoice.balanceDue === 0 ? (
                <p className="mt-4 text-[10px] font-medium text-theme-accent">
                  This invoice has been fully settled.
                </p>
              ) : (
                <p className="mt-4 text-[10px] text-muted">
                  {formatMoney(invoice.amountPaid, invoice.currency)} has been recorded as paid.
                </p>
              )}
            </div>

            <div className="p-5 sm:p-8">
              <InvoiceTotalRow label="Subtotal" value={formatMoney(invoice.subtotal, invoice.currency)} />

              <InvoiceTotalRow label="Discount" value={formatMoney(invoice.discount, invoice.currency)} />

              <InvoiceTotalRow label="Tax" value={formatMoney(invoice.tax, invoice.currency)} />

              <div className="my-3 border-t border-border" />

              <InvoiceTotalRow label="Total" value={formatMoney(invoice.total, invoice.currency)} strong />

              <InvoiceTotalRow label="Paid" value={formatMoney(invoice.amountPaid, invoice.currency)} />

              <InvoiceTotalRow
                label="Balance"
                value={formatMoney(invoice.balanceDue, invoice.currency)}
                strong
              />
            </div>
          </section>

          <section className="border-t border-border p-5 sm:p-8">
            <div>
              <p className="text-sm font-semibold text-foreground">Payment history</p>

              <p className="mt-1 text-[10px] text-muted">Payments recorded against this invoice.</p>
            </div>

            {invoice.payments.length === 0 ? (
              <div className="mt-4 rounded-xl border border-dashed border-border px-4 py-6">
                <p className="text-[10px] text-muted">No payment has been recorded against this invoice.</p>
              </div>
            ) : (
              <div className="mt-4 divide-y divide-border rounded-xl border border-border">
                {invoice.payments.map(payment => {
                  return (
                    <div
                      key={payment.id}
                      className="flex flex-col gap-3 px-4 py-4 sm:flex-row sm:items-center sm:justify-between">
                      <div>
                        <p className="text-[11px] font-semibold text-foreground">
                          {formatStatus(payment.method)}
                        </p>

                        <p className="mt-1 text-[9px] text-muted">
                          {payment.reference ?? payment.providerReference ?? 'No reference'}
                          {' · '}
                          {formatStatus(payment.status)}
                        </p>
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
          </section>

          {invoice.notes ? (
            <section className="border-t border-border p-5 sm:p-8">
              <p className="text-[9px] font-semibold uppercase tracking-[0.12em] text-muted">Notes</p>

              <p className="mt-3 whitespace-pre-line text-[10px] leading-5 text-muted">{invoice.notes}</p>
            </section>
          ) : null}

          <footer className="border-t border-border px-5 py-5 text-[9px] text-muted sm:px-8">
            Generated from your Rcentz Systems billing record.
          </footer>
        </article>
      </div>
    </main>
  );
}

function InvoiceInfo({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-[8px] uppercase tracking-[0.08em] text-muted">{label}</p>

      <p className="mt-1 text-[10px] font-medium text-foreground">{value}</p>
    </div>
  );
}

function InvoiceItemValue({
  label,
  value,
  alignRight = false
}: {
  label: string;
  value: string;
  alignRight?: boolean;
}) {
  const classes = alignRight ? 'sm:text-right' : '';

  return (
    <div className={classes}>
      <p className="text-[8px] uppercase tracking-[0.08em] text-muted sm:hidden">{label}</p>

      <p className="mt-1 text-[10px] font-medium text-foreground sm:mt-0">{value}</p>
    </div>
  );
}

function InvoiceTotalRow({
  label,
  value,
  strong = false
}: {
  label: string;
  value: string;
  strong?: boolean;
}) {
  const labelClasses = strong ? 'font-semibold text-foreground' : 'text-muted';

  const valueClasses = strong ? 'font-semibold text-foreground' : 'font-medium text-foreground';

  return (
    <div className="flex items-center justify-between gap-4 py-1.5 text-[10px]">
      <span className={labelClasses}>{label}</span>

      <span className={valueClasses}>{value}</span>
    </div>
  );
}
