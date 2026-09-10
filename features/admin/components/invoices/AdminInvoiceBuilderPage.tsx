'use client';

import { useState, useTransition, type ReactNode } from 'react';

import Link from 'next/link';

import { useRouter } from 'next/navigation';

import { ArrowLeft, CircleDollarSign, FilePlus2, Plus, ReceiptText, Trash2, UserRound } from 'lucide-react';

import {
  InvoiceDraftProvider,
  useInvoiceDraft
} from '@/features/admin/components/invoices/InvoiceDraftProvider';

import { createInvoiceDraft } from '@/features/admin/server/invoices/create-invoice-draft';

import type { InvoiceBuilderOptions } from '@/features/admin/server/invoices/get-invoice-builder-options';

import type { InvoiceDraftItemType } from '@/features/admin/types/invoice-draft';

type AdminInvoiceBuilderPageProps = {
  options: InvoiceBuilderOptions;
};

const itemTypes: Array<{
  value: InvoiceDraftItemType;
  label: string;
}> = [
  {
    value: 'CUSTOM',
    label: 'Custom'
  },
  {
    value: 'SERVICE',
    label: 'Service'
  },
  {
    value: 'PRODUCT',
    label: 'Product'
  },
  {
    value: 'PROJECT',
    label: 'Project'
  },
  {
    value: 'PLAN',
    label: 'Plan'
  }
];

function formatMoney(amount: number, currency: string) {
  return new Intl.NumberFormat('en-NG', {
    style: 'currency',
    currency: /^[A-Z]{3}$/.test(currency) ? currency : 'NGN',
    maximumFractionDigits: 2
  }).format(amount);
}

export function AdminInvoiceBuilderPage({ options }: AdminInvoiceBuilderPageProps) {
  return (
    <InvoiceDraftProvider>
      <InvoiceBuilderContent options={options} />
    </InvoiceDraftProvider>
  );
}

function InvoiceBuilderContent({ options }: AdminInvoiceBuilderPageProps) {
  const router = useRouter();

  const [isPending, startTransition] = useTransition();

  const [error, setError] = useState<string | null>(null);

  const {
    clientId,
    currency,
    dueAt,
    discount,
    tax,
    notes,
    items,

    subtotal,
    total,

    setClientId,
    setCurrency,
    setDueAt,
    setDiscount,
    setTax,
    setNotes,

    addItem,
    removeItem,
    updateItem
  } = useInvoiceDraft();

  const selectedClient =
    options.clients.find(client => {
      return client.id === clientId;
    }) ?? null;

  const hasValidItems = items.every(item => {
    return (
      item.name.trim().length > 0 &&
      Number.isInteger(item.quantity) &&
      item.quantity > 0 &&
      Number.isFinite(item.unitPrice) &&
      item.unitPrice >= 0
    );
  });

  const canCreate =
    clientId.length > 0 && currency.length === 3 && items.length > 0 && hasValidItems && !isPending;

  function handleClientChange(nextClientId: string) {
    setClientId(nextClientId);

    const client = options.clients.find(item => {
      return item.id === nextClientId;
    });

    if (client?.preferredCurrency) {
      setCurrency(client.preferredCurrency.toUpperCase());
    }
  }

  function handleCreateDraft() {
    setError(null);

    startTransition(async () => {
      const result = await createInvoiceDraft({
        clientId,

        currency,

        dueAt: dueAt.trim().length > 0 ? dueAt : null,

        discount,
        tax,
        notes,

        items: items.map(item => {
          return {
            type: item.type,
            name: item.name,
            description: item.description,
            quantity: item.quantity,
            unitPrice: item.unitPrice
          };
        })
      });

      if (!result.success) {
        setError(result.error);
        return;
      }

      router.push(`/admin/invoices/${result.invoiceId}`);

      router.refresh();
    });
  }

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
              Finance / New invoice
            </p>

            <h1 className="mt-2 text-xl font-semibold tracking-[-0.04em] text-foreground sm:text-2xl">
              Create invoice draft
            </h1>

            <p className="mt-1 max-w-2xl text-xs leading-5 text-muted">
              Compose a client invoice, review the calculation and save it as a draft before issuing it.
            </p>
          </div>

          <span className="inline-flex w-fit items-center gap-1.5 rounded-full border border-border bg-background px-3 py-1.5">
            <span className="size-1.5 rounded-full bg-theme-accent" />

            <span className="text-[9px] font-semibold text-foreground">Draft mode</span>
          </span>
        </section>

        <div className="grid items-start gap-5 xl:grid-cols-[minmax(0,1fr)_360px]">
          <div className="min-w-0 space-y-5">
            <section className="overflow-hidden rounded-[20px] border border-border bg-background">
              <div className="flex items-center justify-between gap-4 border-b border-border bg-surface-raised px-5 py-4">
                <div>
                  <p className="text-sm font-semibold text-foreground">Invoice details</p>

                  <p className="mt-1 text-[10px] text-muted">Select the client and basic billing terms.</p>
                </div>

                <UserRound className="size-4 text-theme-accent" />
              </div>

              <div className="grid gap-4 p-5 sm:grid-cols-2">
                <Field label="Client">
                  <select
                    value={clientId}
                    onChange={event => {
                      handleClientChange(event.target.value);
                    }}
                    className="h-10 w-full rounded-xl border border-border bg-background px-3 text-[10px] text-foreground outline-none focus:border-foreground/30">
                    <option value="">Select client</option>

                    {options.clients.map(client => {
                      return (
                        <option key={client.id} value={client.id}>
                          {client.displayName} · {client.email}
                        </option>
                      );
                    })}
                  </select>
                </Field>

                <Field label="Currency">
                  <input
                    value={currency}
                    maxLength={3}
                    onChange={event => {
                      const value = event.target.value
                        .toUpperCase()
                        .replace(/[^A-Z]/g, '')
                        .slice(0, 3);

                      setCurrency(value);
                    }}
                    placeholder="NGN"
                    className="h-10 w-full rounded-xl border border-border bg-background px-3 text-[10px] uppercase text-foreground outline-none placeholder:text-muted focus:border-foreground/30"
                  />
                </Field>

                <Field label="Due date">
                  <input
                    type="date"
                    value={dueAt}
                    onChange={event => {
                      setDueAt(event.target.value);
                    }}
                    className="h-10 w-full rounded-xl border border-border bg-background px-3 text-[10px] text-foreground outline-none focus:border-foreground/30"
                  />
                </Field>

                <Field label="Invoice source">
                  <div className="flex h-10 items-center rounded-xl border border-border bg-surface px-3">
                    <span className="text-[10px] font-medium text-foreground">Manual invoice</span>
                  </div>
                </Field>
              </div>

              <div className="border-t border-border bg-surface-muted/40 px-5 py-3">
                <p className="text-[9px] text-muted">
                  {selectedClient
                    ? `Billing ${selectedClient.displayName}`
                    : 'Choose the client responsible for this invoice.'}
                </p>
              </div>
            </section>

            <section className="overflow-hidden rounded-[20px] border border-border bg-background">
              <div className="flex items-center justify-between gap-4 border-b border-border bg-surface-raised px-5 py-4">
                <div>
                  <p className="text-sm font-semibold text-foreground">Line items</p>

                  <p className="mt-1 text-[10px] text-muted">
                    Define exactly what the client is being charged for.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={addItem}
                  className="inline-flex h-8 items-center gap-1.5 rounded-lg border border-border bg-background px-3 text-[9px] font-semibold text-foreground transition-colors hover:bg-surface">
                  <Plus className="size-3" />
                  Add item
                </button>
              </div>

              <div className="space-y-4 p-4 sm:p-5">
                {items.map((item, index) => {
                  const lineTotal = item.quantity * item.unitPrice;

                  return (
                    <div
                      key={item.id}
                      className="overflow-hidden rounded-[16px] border border-border bg-background">
                      <div className="flex items-center justify-between gap-4 border-b border-border bg-surface-raised px-4 py-3">
                        <div>
                          <p className="text-[10px] font-semibold text-foreground">Item {index + 1}</p>

                          <p className="mt-0.5 text-[8px] uppercase tracking-[0.08em] text-muted">
                            {item.type}
                          </p>
                        </div>

                        <button
                          type="button"
                          disabled={items.length === 1}
                          onClick={() => {
                            removeItem(item.id);
                          }}
                          className="flex size-8 items-center justify-center rounded-lg border border-border bg-background text-muted transition-colors hover:text-foreground disabled:cursor-not-allowed disabled:opacity-35"
                          aria-label={`Remove item ${index + 1}`}>
                          <Trash2 className="size-3.5" />
                        </button>
                      </div>

                      <div className="grid gap-4 p-4 sm:grid-cols-2">
                        <Field label="Item type">
                          <select
                            value={item.type}
                            onChange={event => {
                              updateItem(item.id, {
                                type: event.target.value as InvoiceDraftItemType
                              });
                            }}
                            className="h-10 w-full rounded-xl border border-border bg-background px-3 text-[10px] text-foreground outline-none focus:border-foreground/30">
                            {itemTypes.map(option => {
                              return (
                                <option key={option.value} value={option.value}>
                                  {option.label}
                                </option>
                              );
                            })}
                          </select>
                        </Field>

                        <Field label="Item name">
                          <input
                            value={item.name}
                            onChange={event => {
                              updateItem(item.id, {
                                name: event.target.value
                              });
                            }}
                            placeholder="Website maintenance"
                            className="h-10 w-full rounded-xl border border-border bg-background px-3 text-[10px] text-foreground outline-none placeholder:text-muted focus:border-foreground/30"
                          />
                        </Field>

                        <Field label="Quantity">
                          <input
                            type="number"
                            min="1"
                            step="1"
                            value={item.quantity}
                            onChange={event => {
                              updateItem(item.id, {
                                quantity: Number(event.target.value)
                              });
                            }}
                            className="h-10 w-full rounded-xl border border-border bg-background px-3 text-[10px] text-foreground outline-none focus:border-foreground/30"
                          />
                        </Field>

                        <Field label={`Unit price (${currency || 'NGN'})`}>
                          <input
                            type="number"
                            min="0"
                            step="0.01"
                            value={item.unitPrice === 0 ? '' : item.unitPrice}
                            onChange={event => {
                              updateItem(item.id, {
                                unitPrice: Number(event.target.value)
                              });
                            }}
                            placeholder="0.00"
                            className="h-10 w-full rounded-xl border border-border bg-background px-3 text-[10px] text-foreground outline-none placeholder:text-muted focus:border-foreground/30"
                          />
                        </Field>

                        <div className="sm:col-span-2">
                          <Field label="Description">
                            <textarea
                              value={item.description}
                              onChange={event => {
                                updateItem(item.id, {
                                  description: event.target.value
                                });
                              }}
                              rows={3}
                              placeholder="Describe what is included in this charge..."
                              className="w-full resize-none rounded-xl border border-border bg-background px-3 py-3 text-[10px] leading-5 text-foreground outline-none placeholder:text-muted focus:border-foreground/30"
                            />
                          </Field>
                        </div>
                      </div>

                      <div className="flex items-center justify-between gap-4 border-t border-border bg-surface-muted/40 px-4 py-3">
                        <span className="text-[8px] uppercase tracking-[0.08em] text-muted">Line total</span>

                        <span className="text-[10px] font-semibold text-foreground">
                          {formatMoney(lineTotal, currency)}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="border-t border-border bg-surface-muted/40 px-5 py-3">
                <p className="text-[9px] text-muted">
                  {items.length} invoice item{items.length === 1 ? '' : 's'} currently in this draft.
                </p>
              </div>
            </section>

            <section className="overflow-hidden rounded-[20px] border border-border bg-background">
              <div className="border-b border-border bg-surface-raised px-5 py-4">
                <p className="text-sm font-semibold text-foreground">Invoice notes</p>

                <p className="mt-1 text-[10px] text-muted">Optional information attached to the invoice.</p>
              </div>

              <div className="p-5">
                <textarea
                  value={notes}
                  onChange={event => {
                    setNotes(event.target.value);
                  }}
                  rows={5}
                  placeholder="Payment terms, service notes or other client information..."
                  className="w-full resize-none rounded-xl border border-border bg-background px-3 py-3 text-[10px] leading-5 text-foreground outline-none placeholder:text-muted focus:border-foreground/30"
                />
              </div>

              <div className="border-t border-border bg-surface-muted/40 px-5 py-3">
                <p className="text-[9px] text-muted">Notes can be reviewed before the invoice is issued.</p>
              </div>
            </section>
          </div>

          <aside className="min-w-0 space-y-4 xl:sticky xl:top-20">
            <section className="overflow-hidden rounded-[20px] border border-border bg-background">
              <div className="flex items-center justify-between gap-4 border-b border-border bg-surface-raised px-5 py-4">
                <div>
                  <p className="text-sm font-semibold text-foreground">Invoice summary</p>

                  <p className="mt-1 text-[10px] text-muted">Live draft calculation</p>
                </div>

                <CircleDollarSign className="size-4 text-theme-accent" />
              </div>

              <div className="p-5">
                <SummaryRow label="Subtotal" value={formatMoney(subtotal, currency)} />

                <div className="my-4 border-t border-border" />

                <Field label={`Discount (${currency || 'NGN'})`}>
                  <input
                    type="number"
                    min="0"
                    step="0.01"
                    value={discount === 0 ? '' : discount}
                    onChange={event => {
                      setDiscount(Math.max(Number(event.target.value), 0));
                    }}
                    placeholder="0.00"
                    className="h-10 w-full rounded-xl border border-border bg-background px-3 text-[10px] text-foreground outline-none placeholder:text-muted focus:border-foreground/30"
                  />
                </Field>

                <div className="mt-4">
                  <Field label={`Tax (${currency || 'NGN'})`}>
                    <input
                      type="number"
                      min="0"
                      step="0.01"
                      value={tax === 0 ? '' : tax}
                      onChange={event => {
                        setTax(Math.max(Number(event.target.value), 0));
                      }}
                      placeholder="0.00"
                      className="h-10 w-full rounded-xl border border-border bg-background px-3 text-[10px] text-foreground outline-none placeholder:text-muted focus:border-foreground/30"
                    />
                  </Field>
                </div>

                <div className="my-5 border-t border-border" />

                <div className="flex items-end justify-between gap-4">
                  <div>
                    <p className="text-[8px] uppercase tracking-[0.1em] text-muted">Invoice total</p>

                    <p className="mt-2 text-2xl font-semibold tracking-[-0.05em] text-foreground">
                      {formatMoney(total, currency)}
                    </p>
                  </div>

                  <ReceiptText className="size-5 text-muted" />
                </div>
              </div>

              <div className="border-t border-border bg-surface-muted/40 px-5 py-3">
                <p className="text-[9px] text-muted">
                  Preview only. The server recalculates these values before saving.
                </p>
              </div>
            </section>

            {error ? (
              <div className="rounded-xl border border-rose-500/30 bg-background px-4 py-3">
                <p className="text-[10px] leading-5 text-rose-500">{error}</p>
              </div>
            ) : null}

            <button
              type="button"
              disabled={!canCreate}
              onClick={handleCreateDraft}
              className="inline-flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-foreground px-4 text-[10px] font-semibold text-background transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-40">
              <FilePlus2 className="size-4" />

              {isPending ? 'Creating draft...' : 'Create invoice draft'}
            </button>

            <p className="px-2 text-center text-[9px] leading-4 text-muted">
              Creating a draft does not issue or mark the invoice as paid.
            </p>
          </aside>
        </div>
      </div>
    </main>
  );
}

function Field({ label, children }: { label: string; children: ReactNode }) {
  return (
    <label className="block">
      <span className="mb-2 block text-[9px] font-medium text-muted">{label}</span>

      {children}
    </label>
  );
}

function SummaryRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between gap-4">
      <span className="text-[10px] text-muted">{label}</span>

      <span className="text-[10px] font-semibold text-foreground">{value}</span>
    </div>
  );
}
