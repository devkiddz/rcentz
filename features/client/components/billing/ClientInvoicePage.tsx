import Link from 'next/link';

import { ArrowLeft, Download, FileClock, History } from 'lucide-react';

import { ClientInvoiceAgreementControls } from '@/features/client/components/billing/ClientInvoiceAgreementControls';
import { ClientInvoiceRevisionControls } from '@/features/client/components/billing/ClientInvoiceRevisionControls';
import { InvoicePrintButton } from '@/features/client/components/billing/InvoicePrintButton';

import type { ClientInvoiceData } from '@/features/client/server/billing/get-client-invoice';

type ClientInvoicePageProps = {
  invoice: ClientInvoiceData;
};

type PaymentRecord = ClientInvoiceData['payments'][number];

type ApprovalRecord = ClientInvoiceData['approvals'][number];

type RevisionRecord = ClientInvoiceData['revisions'][number];

type BillingHistoryEntry =
  | {
      id: string;
      type: 'ISSUED';
      date: Date;
    }
  | {
      id: string;
      type: 'PAYMENT';
      date: Date;
      payment: PaymentRecord;
    }
  | {
      id: string;
      type: 'APPROVAL_REQUESTED';
      date: Date;
      approval: ApprovalRecord;
    }
  | {
      id: string;
      type: 'APPROVAL_ACCEPTED';
      date: Date;
      approval: ApprovalRecord;
    }
  | {
      id: string;
      type: 'APPROVAL_REJECTED';
      date: Date;
      approval: ApprovalRecord;
    }
  | {
      id: string;
      type: 'APPROVAL_CANCELLED';
      date: Date;
      approval: ApprovalRecord;
    }
  | {
      id: string;
      type: 'REVISION_PROPOSED';
      date: Date;
      revision: RevisionRecord;
    }
  | {
      id: string;
      type: 'REVISION_ACCEPTED';
      date: Date;
      revision: RevisionRecord;
    }
  | {
      id: string;
      type: 'REVISION_REJECTED';
      date: Date;
      revision: RevisionRecord;
    }
  | {
      id: string;
      type: 'REVISION_CANCELLED';
      date: Date;
      revision: RevisionRecord;
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

function formatDateTime(value: Date) {
  return new Intl.DateTimeFormat('en-NG', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    hour: 'numeric',
    minute: '2-digit'
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

function buildHistory(invoice: ClientInvoiceData) {
  const history: BillingHistoryEntry[] = [];

  if (invoice.issuedAt) {
    history.push({
      id: `issued-${invoice.id}`,
      type: 'ISSUED',
      date: invoice.issuedAt
    });
  }

  for (const approval of invoice.approvals) {
    history.push({
      id: `approval-requested-${approval.id}`,
      type: 'APPROVAL_REQUESTED',
      date: approval.requestedAt,
      approval
    });

    if (approval.status === 'ACCEPTED' && approval.respondedAt) {
      history.push({
        id: `approval-accepted-${approval.id}`,
        type: 'APPROVAL_ACCEPTED',
        date: approval.respondedAt,
        approval
      });
    }

    if (approval.status === 'REJECTED' && approval.respondedAt) {
      history.push({
        id: `approval-rejected-${approval.id}`,
        type: 'APPROVAL_REJECTED',
        date: approval.respondedAt,
        approval
      });
    }

    if (approval.status === 'CANCELLED' && approval.cancelledAt) {
      history.push({
        id: `approval-cancelled-${approval.id}`,
        type: 'APPROVAL_CANCELLED',
        date: approval.cancelledAt,
        approval
      });
    }
  }

  for (const revision of invoice.revisions) {
    history.push({
      id: `revision-proposed-${revision.id}`,
      type: 'REVISION_PROPOSED',
      date: revision.createdAt,
      revision
    });

    if (revision.acceptedAt) {
      history.push({
        id: `revision-accepted-${revision.id}`,
        type: 'REVISION_ACCEPTED',
        date: revision.acceptedAt,
        revision
      });
    }

    if (revision.rejectedAt) {
      history.push({
        id: `revision-rejected-${revision.id}`,
        type: 'REVISION_REJECTED',
        date: revision.rejectedAt,
        revision
      });
    }

    if (revision.cancelledAt) {
      history.push({
        id: `revision-cancelled-${revision.id}`,
        type: 'REVISION_CANCELLED',
        date: revision.cancelledAt,
        revision
      });
    }
  }

  for (const payment of invoice.payments) {
    history.push({
      id: `payment-${payment.id}`,
      type: 'PAYMENT',
      date: payment.paidAt ?? payment.createdAt,
      payment
    });
  }

  history.sort((first, second) => {
    return second.date.getTime() - first.date.getTime();
  });

  return history;
}

export function ClientInvoicePage({ invoice }: ClientInvoicePageProps) {
  const history = buildHistory(invoice);

  return (
    <main className="px-4 py-6 sm:px-6 sm:py-8 lg:px-8 print:p-0">
      <div className="mx-auto w-full max-w-[1050px] space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-3 print:hidden">
          <Link
            href="/dashboard/billing"
            className="inline-flex items-center gap-2 text-[15px] font-semibold text-muted transition-colors hover:text-foreground">
            <ArrowLeft className="size-4" />
            Back to billing
          </Link>

          <div className="flex items-center gap-2">
            {invoice.pdfUrl ? (
              <a
                href={invoice.pdfUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex h-11 items-center gap-2 rounded-xl border border-border bg-surface px-4 text-[15px] font-semibold text-foreground transition-colors hover:bg-surface-raised">
                <Download className="size-4" />
                Download PDF
              </a>
            ) : null}

            <InvoicePrintButton />
          </div>
        </div>

        {invoice.unresolvedRevision?.status === 'PENDING' ? (
          <section className="overflow-hidden rounded-2xl border border-border bg-background print:hidden">
            <header className="flex flex-col gap-3 border-b border-border bg-surface-raised px-5 py-5 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <p className="text-xl font-semibold text-foreground">Payment update requires your approval</p>

                <p className="mt-1 max-w-2xl text-[15px] leading-7 text-muted">
                  Payment is paused until you accept or reject this change.
                </p>
              </div>

              <FileClock className="size-5 text-theme-accent" />
            </header>

            <div className="grid gap-5 p-5 lg:grid-cols-[minmax(0,1fr)_280px]">
              <div>
                <p className="text-lg font-semibold text-foreground">{invoice.unresolvedRevision.title}</p>

                <p className="mt-2 text-[15px] leading-7 text-muted">
                  {invoice.unresolvedRevision.explanation}
                </p>

                <p className="mt-4 text-[13px] text-muted">
                  Proposed by {invoice.unresolvedRevision.proposedBy.name}
                  {' · '}
                  {formatDateTime(invoice.unresolvedRevision.createdAt)}
                </p>
              </div>

              <div className="rounded-xl border border-border bg-surface-muted/40 p-4">
                <p className="text-[13px] font-semibold uppercase tracking-[0.06em] text-muted">
                  Payment change
                </p>

                <p className="mt-3 text-base text-muted line-through">
                  {formatMoney(
                    invoice.unresolvedRevision.previousTotal,
                    invoice.unresolvedRevision.previousCurrency
                  )}
                </p>

                <p className="mt-1 text-2xl font-semibold tracking-[-0.04em] text-foreground">
                  {formatMoney(
                    invoice.unresolvedRevision.proposedTotal,
                    invoice.unresolvedRevision.proposedCurrency
                  )}
                </p>

                <p className="mt-3 text-[15px] leading-6 text-muted">
                  Proposed balance:{' '}
                  {formatMoney(
                    invoice.unresolvedRevision.proposedBalanceDue,
                    invoice.unresolvedRevision.proposedCurrency
                  )}
                </p>
              </div>
            </div>

            <footer className="border-t border-border bg-surface-muted/40 p-5">
              <ClientInvoiceRevisionControls revisionId={invoice.unresolvedRevision.id} />
            </footer>
          </section>
        ) : null}

        {invoice.unresolvedRevision?.status === 'REJECTED' ? (
          <section className="rounded-2xl border border-border bg-surface-raised p-5 print:hidden">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <p className="text-lg font-semibold text-foreground">Payment remains paused</p>

                <p className="mt-2 max-w-2xl text-[15px] leading-7 text-muted">
                  You rejected revision #{invoice.unresolvedRevision.revisionNumber}. Rcentz must review or
                  close that update before this invoice can continue to payment.
                </p>
              </div>

              <StatusBadge status="REJECTED" />
            </div>

            {invoice.unresolvedRevision.clientResponse ? (
              <div className="mt-4 rounded-xl border border-border bg-background p-4">
                <p className="text-[13px] font-semibold uppercase tracking-[0.06em] text-muted">
                  Your response
                </p>

                <p className="mt-2 text-[15px] leading-7 text-foreground">
                  {invoice.unresolvedRevision.clientResponse}
                </p>
              </div>
            ) : null}
          </section>
        ) : null}

        <article className="overflow-hidden rounded-[24px] border border-border bg-background print:rounded-none print:border-0">
          <header className="border-b border-border px-5 py-7 sm:px-8 sm:py-9">
            <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <div className="flex size-12 items-center justify-center rounded-full bg-foreground text-lg font-bold text-background">
                  R
                </div>

                <p className="mt-4 text-lg font-semibold text-foreground">Rcentz Systems</p>

                <p className="mt-1 text-[15px] text-muted">Technology services and systems</p>
              </div>

              <div className="sm:text-right">
                <p className="font-mono text-[13px] uppercase tracking-[0.14em] text-muted">Invoice</p>

                <h1 className="mt-2 text-3xl font-semibold tracking-[-0.04em] text-foreground">
                  {invoice.invoiceNumber}
                </h1>

                <div className="mt-4 flex flex-wrap gap-2 sm:justify-end">
                  <StatusBadge status={invoice.effectiveStatus} />

                  <StatusBadge status={`Agreement: ${formatStatus(invoice.agreementState)}`} formatted />
                </div>
              </div>
            </div>
          </header>

          <section className="grid border-b border-border md:grid-cols-2">
            <div className="border-b border-border p-5 sm:p-8 md:border-b-0 md:border-r">
              <p className="text-[13px] font-semibold uppercase tracking-[0.08em] text-muted">Bill to</p>

              <p className="mt-3 text-xl font-semibold text-foreground">
                {invoice.customer.name ?? 'Client'}
              </p>

              {invoice.customer.email ? (
                <p className="mt-1 text-[15px] leading-6 text-muted">{invoice.customer.email}</p>
              ) : null}

              {invoice.customer.phone ? (
                <p className="mt-1 text-[15px] leading-6 text-muted">{invoice.customer.phone}</p>
              ) : null}

              {invoice.customer.billingAddress ? (
                <p className="mt-3 max-w-sm text-[15px] leading-7 text-muted">
                  {invoice.customer.billingAddress}
                </p>
              ) : null}
            </div>

            <div className="p-5 sm:p-8">
              <div className="grid grid-cols-2 gap-x-5 gap-y-6">
                <InvoiceInfo label="Issued" value={formatDate(invoice.issuedAt)} />

                <InvoiceInfo label="Due" value={formatDate(invoice.dueAt)} />

                <InvoiceInfo label="Source" value={invoice.source.label} />

                <InvoiceInfo label="Reference" value={invoice.source.reference ?? 'Not applicable'} />

                {invoice.project ? (
                  <div className="col-span-2">
                    <InvoiceInfo label="Project" value={invoice.project.name} />
                  </div>
                ) : null}
              </div>
            </div>
          </section>

          <section className="p-5 sm:p-8">
            <p className="text-xl font-semibold text-foreground">Invoice items</p>

            <p className="mt-1 text-[15px] leading-7 text-muted">
              Services, products or commitments included in this invoice.
            </p>

            <div className="mt-5 overflow-hidden rounded-xl border border-border">
              <div className="hidden grid-cols-[minmax(0,1fr)_80px_150px_150px] border-b border-border bg-surface-raised px-4 py-3.5 text-[13px] font-semibold uppercase tracking-[0.06em] text-muted sm:grid">
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
                      className="grid gap-4 px-4 py-5 sm:grid-cols-[minmax(0,1fr)_80px_150px_150px] sm:items-center">
                      <div className="min-w-0">
                        <p className="text-base font-semibold text-foreground">{item.name}</p>

                        {item.description ? (
                          <p className="mt-1 text-[15px] leading-7 text-muted">{item.description}</p>
                        ) : null}

                        {item.service ? (
                          <p className="mt-2 text-[13px] text-muted">Service · {item.service.name}</p>
                        ) : null}
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
              <p className="text-[13px] font-semibold uppercase tracking-[0.08em] text-muted">
                Payment position
              </p>

              <p className="mt-3 text-4xl font-semibold tracking-[-0.05em] text-foreground">
                {formatMoney(invoice.balanceDue, invoice.currency)}
              </p>

              <p className="mt-2 text-[15px] text-muted">Remaining balance</p>

              <div className="mt-5 rounded-xl border border-border bg-surface-muted/40 p-4 print:hidden">
                <PaymentState invoice={invoice} />
              </div>
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

          {invoice.revisions.length > 0 ? (
            <section className="border-t border-border p-5 sm:p-8">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-xl font-semibold text-foreground">Payment updates</p>

                  <p className="mt-1 text-[15px] leading-7 text-muted">
                    Financial changes proposed after the original invoice agreement.
                  </p>
                </div>

                <FileClock className="size-5 text-theme-accent" />
              </div>

              <div className="mt-5 space-y-3">
                {invoice.revisions.map(revision => {
                  return (
                    <div key={revision.id} className="overflow-hidden rounded-xl border border-border">
                      <div className="flex flex-wrap items-center justify-between gap-3 bg-surface-raised px-4 py-4">
                        <div>
                          <p className="text-base font-semibold text-foreground">
                            Revision #{revision.revisionNumber} · {revision.title}
                          </p>

                          <p className="mt-1 text-[13px] text-muted">{formatDateTime(revision.createdAt)}</p>
                        </div>

                        <StatusBadge status={revision.status} />
                      </div>

                      <div className="grid gap-4 p-4 sm:grid-cols-[1fr_auto]">
                        <div>
                          <p className="text-[15px] leading-7 text-muted">{revision.explanation}</p>

                          {revision.clientResponse ? (
                            <div className="mt-3 rounded-xl border border-border bg-surface p-4">
                              <p className="text-[13px] font-semibold uppercase tracking-[0.06em] text-muted">
                                Your response
                              </p>

                              <p className="mt-2 text-[15px] leading-7 text-foreground">
                                {revision.clientResponse}
                              </p>
                            </div>
                          ) : null}
                        </div>

                        <div className="sm:text-right">
                          <p className="text-[13px] text-muted">Previous → Proposed</p>

                          <p className="mt-1 text-base font-semibold text-foreground">
                            {formatMoney(revision.previousTotal, revision.previousCurrency)}
                            {' → '}
                            {formatMoney(revision.proposedTotal, revision.proposedCurrency)}
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>
          ) : null}

          <section className="border-t border-border p-5 sm:p-8">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xl font-semibold text-foreground">Billing history</p>

                <p className="mt-1 text-[15px] leading-7 text-muted">
                  Invoice, agreement, payment update and payment activity.
                </p>
              </div>

              <History className="size-5 text-theme-accent" />
            </div>

            {history.length === 0 ? (
              <div className="mt-5 rounded-xl border border-dashed border-border px-4 py-6">
                <p className="text-[15px] text-muted">No billing activity has been recorded yet.</p>
              </div>
            ) : (
              <div className="mt-5 divide-y divide-border rounded-xl border border-border">
                {history.map(entry => {
                  return <BillingHistoryRow key={entry.id} entry={entry} />;
                })}
              </div>
            )}
          </section>

          {invoice.notes ? (
            <section className="border-t border-border p-5 sm:p-8">
              <p className="text-[13px] font-semibold uppercase tracking-[0.08em] text-muted">Notes</p>

              <p className="mt-3 whitespace-pre-line text-[15px] leading-7 text-muted">{invoice.notes}</p>
            </section>
          ) : null}

          <footer className="border-t border-border bg-surface-muted/40 px-5 py-5 text-[13px] leading-6 text-muted sm:px-8">
            Generated from your Rcentz Systems billing record.
          </footer>
        </article>

        {invoice.pendingApproval ? (
          <section className="overflow-hidden rounded-2xl border border-border bg-background print:hidden">
            <header className="border-b border-border bg-surface-raised px-5 py-5 sm:px-6">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <p className="text-xl font-semibold text-foreground">Verify this invoice</p>

                  <p className="mt-1 max-w-2xl text-[15px] leading-7 text-muted">
                    You have now reviewed the invoice. Confirm that the billing details match your agreement
                    with Rcentz Systems.
                  </p>
                </div>

                <StatusBadge status="PENDING" />
              </div>
            </header>

            <div className="grid gap-5 p-5 sm:p-6 lg:grid-cols-[minmax(0,1fr)_300px]">
              <div>
                <p className="text-lg font-semibold text-foreground">{invoice.pendingApproval.title}</p>

                {invoice.pendingApproval.summary ? (
                  <p className="mt-2 text-[15px] leading-7 text-muted">{invoice.pendingApproval.summary}</p>
                ) : null}

                <p className="mt-4 text-[13px] text-muted">
                  Version {invoice.pendingApproval.version}
                  {' · '}
                  Requested {formatDateTime(invoice.pendingApproval.requestedAt)}
                </p>
              </div>

              <div className="rounded-xl border border-border bg-surface-muted/40 p-5">
                <p className="text-[13px] font-semibold uppercase tracking-[0.06em] text-muted">
                  Agreement value
                </p>

                <p className="mt-2 text-3xl font-semibold tracking-[-0.04em] text-foreground">
                  {formatMoney(
                    invoice.pendingApproval.snapshot?.total ?? invoice.total,
                    invoice.pendingApproval.snapshot?.currency ?? invoice.currency
                  )}
                </p>

                <p className="mt-2 text-[15px] text-muted">
                  {invoice.pendingApproval.snapshot?.items.length ?? invoice.items.length} billed item
                  {(invoice.pendingApproval.snapshot?.items.length ?? invoice.items.length) === 1 ? '' : 's'}
                </p>
              </div>
            </div>

            <footer className="border-t border-border bg-surface-muted/40 p-5 sm:p-6">
              <ClientInvoiceAgreementControls approvalId={invoice.pendingApproval.id} />
            </footer>
          </section>
        ) : null}

        {invoice.agreementState === 'REJECTED' && invoice.rejectedApproval ? (
          <section className="overflow-hidden rounded-2xl border border-border bg-background print:hidden">
            <header className="border-b border-border bg-surface-raised px-5 py-5 sm:px-6">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <p className="text-lg font-semibold text-foreground">Invoice returned for changes</p>

                  <p className="mt-1 text-[15px] leading-7 text-muted">
                    Rcentz must update and resend this invoice before you can approve or pay it.
                  </p>
                </div>

                <StatusBadge status="REJECTED" />
              </div>
            </header>

            <div className="p-5 sm:p-6">
              {invoice.rejectedApproval.response ? (
                <div className="rounded-xl border border-border bg-surface p-4">
                  <p className="text-[13px] font-semibold uppercase tracking-[0.06em] text-muted">
                    Your response
                  </p>

                  <p className="mt-2 text-[15px] leading-7 text-foreground">
                    {invoice.rejectedApproval.response}
                  </p>
                </div>
              ) : (
                <p className="text-[15px] text-muted">No response note was provided.</p>
              )}
            </div>
          </section>
        ) : null}

        {invoice.agreementState === 'ACCEPTED' && invoice.acceptedApproval ? (
          <section className="flex flex-col gap-3 rounded-2xl border border-border bg-surface-raised p-5 print:hidden sm:flex-row sm:items-center sm:justify-between sm:p-6">
            <div>
              <p className="text-lg font-semibold text-foreground">Invoice verified</p>

              <p className="mt-1 text-[15px] leading-7 text-muted">
                You accepted version {invoice.acceptedApproval.version}
                {invoice.acceptedApproval.respondedAt
                  ? ` on ${formatDateTime(invoice.acceptedApproval.respondedAt)}`
                  : '.'}
              </p>
            </div>

            <StatusBadge status="ACCEPTED" />
          </section>
        ) : null}
      </div>
    </main>
  );
}

function BillingHistoryRow({ entry }: { entry: BillingHistoryEntry }) {
  if (entry.type === 'ISSUED') {
    return (
      <HistoryRow
        title="Invoice issued"
        description="This invoice became available in your billing account."
        date={entry.date}
      />
    );
  }

  if (entry.type === 'PAYMENT') {
    return (
      <HistoryRow
        title={`Payment · ${formatStatus(entry.payment.status)}`}
        description={
          entry.payment.reference ?? entry.payment.providerReference ?? formatStatus(entry.payment.method)
        }
        value={formatMoney(entry.payment.amount, entry.payment.currency)}
        date={entry.date}
      />
    );
  }

  if (entry.type === 'APPROVAL_REQUESTED') {
    return (
      <HistoryRow
        title={`Invoice verification v${entry.approval.version} requested`}
        description="Rcentz requested your confirmation of the invoice agreement."
        value={
          entry.approval.snapshot
            ? formatMoney(entry.approval.snapshot.total, entry.approval.snapshot.currency)
            : undefined
        }
        date={entry.date}
      />
    );
  }

  if (entry.type === 'APPROVAL_ACCEPTED') {
    return (
      <HistoryRow
        title={`Invoice verification v${entry.approval.version} accepted`}
        description="You confirmed the original invoice agreement."
        date={entry.date}
      />
    );
  }

  if (entry.type === 'APPROVAL_REJECTED') {
    return (
      <HistoryRow
        title={`Invoice verification v${entry.approval.version} returned`}
        description={entry.approval.response ?? 'You returned the invoice to Rcentz for changes.'}
        date={entry.date}
      />
    );
  }

  if (entry.type === 'APPROVAL_CANCELLED') {
    return (
      <HistoryRow
        title={`Invoice verification v${entry.approval.version} withdrawn`}
        description="The verification request was closed before acceptance."
        date={entry.date}
      />
    );
  }

  if (entry.type === 'REVISION_PROPOSED') {
    return (
      <HistoryRow
        title={`Revision #${entry.revision.revisionNumber} proposed`}
        description={entry.revision.title}
        value={`${formatMoney(entry.revision.previousTotal, entry.revision.previousCurrency)} → ${formatMoney(
          entry.revision.proposedTotal,
          entry.revision.proposedCurrency
        )}`}
        date={entry.date}
      />
    );
  }

  if (entry.type === 'REVISION_ACCEPTED') {
    return (
      <HistoryRow
        title={`Revision #${entry.revision.revisionNumber} accepted`}
        description="You accepted the updated billing obligation."
        date={entry.date}
      />
    );
  }

  if (entry.type === 'REVISION_REJECTED') {
    return (
      <HistoryRow
        title={`Revision #${entry.revision.revisionNumber} rejected`}
        description={entry.revision.clientResponse ?? 'You returned the payment update to Rcentz for review.'}
        date={entry.date}
      />
    );
  }

  return (
    <HistoryRow
      title={`Revision #${entry.revision.revisionNumber} closed`}
      description="The proposed payment update was closed and the previously accepted invoice terms remained active."
      date={entry.date}
    />
  );
}

function PaymentState({ invoice }: { invoice: ClientInvoiceData }) {
  switch (invoice.paymentState) {
    case 'AGREEMENT_REQUIRED':
      return (
        <>
          <p className="text-base font-semibold text-foreground">Verification required</p>

          <p className="mt-1 text-[15px] leading-7 text-muted">
            Rcentz must send this invoice for verification before payment can begin.
          </p>
        </>
      );

    case 'AGREEMENT_PENDING':
      return (
        <>
          <p className="text-base font-semibold text-foreground">Verify invoice first</p>

          <p className="mt-1 text-[15px] leading-7 text-muted">
            Review the full invoice, then use the verification section below to accept or return it.
          </p>
        </>
      );

    case 'AGREEMENT_REJECTED':
      return (
        <>
          <p className="text-base font-semibold text-foreground">Invoice under review</p>

          <p className="mt-1 text-[15px] leading-7 text-muted">
            You returned this invoice for changes. Payment remains unavailable until Rcentz sends an updated
            agreement.
          </p>
        </>
      );

    case 'REVISION_PENDING':
      return (
        <>
          <p className="text-base font-semibold text-foreground">Payment update approval required</p>

          <p className="mt-1 text-[15px] leading-7 text-muted">
            Review the proposed payment update above before payment can continue.
          </p>
        </>
      );

    case 'REVISION_REJECTED':
      return (
        <>
          <p className="text-base font-semibold text-foreground">Payment paused</p>

          <p className="mt-1 text-[15px] leading-7 text-muted">
            Rcentz is reviewing the payment update you rejected.
          </p>
        </>
      );

    case 'SETTLED':
      return (
        <>
          <p className="text-base font-semibold text-foreground">Invoice settled</p>

          <p className="mt-1 text-[15px] leading-7 text-muted">
            There is no remaining balance on this invoice.
          </p>
        </>
      );

    case 'READY':
      return (
        <>
          <p className="text-base font-semibold text-foreground">Ready for payment</p>

          <p className="mt-1 text-[15px] leading-7 text-muted">
            The invoice agreement is verified and there are no unresolved payment updates blocking payment.
          </p>
        </>
      );

    default:
      return (
        <>
          <p className="text-base font-semibold text-foreground">Payment unavailable</p>

          <p className="mt-1 text-[15px] leading-7 text-muted">
            This invoice is not currently in a payable state.
          </p>
        </>
      );
  }
}

function InvoiceInfo({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-[13px] font-semibold uppercase tracking-[0.06em] text-muted">{label}</p>

      <p className="mt-1.5 text-[15px] font-medium leading-6 text-foreground">{value}</p>
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
  return (
    <div className={alignRight ? 'sm:text-right' : ''}>
      <p className="text-[13px] uppercase tracking-[0.06em] text-muted sm:hidden">{label}</p>

      <p className="mt-1 text-[15px] font-medium text-foreground sm:mt-0">{value}</p>
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
  return (
    <div className="flex items-center justify-between gap-4 py-2.5 text-[15px]">
      <span className={strong ? 'font-semibold text-foreground' : 'text-muted'}>{label}</span>

      <span className={strong ? 'font-semibold text-foreground' : 'font-medium text-foreground'}>
        {value}
      </span>
    </div>
  );
}

function StatusBadge({ status, formatted = false }: { status: string; formatted?: boolean }) {
  return (
    <span className="inline-flex w-fit items-center gap-2 rounded-full border border-border bg-background px-3 py-1.5 text-[13px] font-semibold text-foreground">
      <span className="size-1.5 rounded-full bg-theme-accent" />

      {formatted ? status : formatStatus(status)}
    </span>
  );
}

function HistoryRow({
  title,
  description,
  value,
  date
}: {
  title: string;
  description: string;
  value?: string;
  date: Date;
}) {
  return (
    <div className="flex flex-col gap-3 px-4 py-5 sm:flex-row sm:items-center sm:justify-between">
      <div className="min-w-0">
        <p className="text-base font-semibold text-foreground">{title}</p>

        <p className="mt-1 text-[15px] leading-7 text-muted">{description}</p>
      </div>

      <div className="shrink-0 sm:text-right">
        {value ? <p className="text-base font-semibold text-foreground">{value}</p> : null}

        <p className="mt-1 text-[13px] text-muted">{formatDateTime(date)}</p>
      </div>
    </div>
  );
}
