'use client';

import { useState, useTransition } from 'react';

import { Dialog } from '@base-ui/react/dialog';

import { Check, CheckCircle2, MessageSquarePlus, RotateCcw, X } from 'lucide-react';

import { useRouter } from 'next/navigation';

import {
  acceptInvoiceApproval,
  rejectInvoiceApproval
} from '@/features/client/server/billing/invoice-approval-actions';

export function ClientInvoiceAgreementControls({ approvalId }: { approvalId: string }) {
  const router = useRouter();

  const [pending, startTransition] = useTransition();

  const [showNote, setShowNote] = useState(false);

  const [confirmOpen, setConfirmOpen] = useState(false);

  const [response, setResponse] = useState('');

  const [error, setError] = useState<string | null>(null);

  function handleAccept() {
    setError(null);

    startTransition(async () => {
      const result = await acceptInvoiceApproval(approvalId);

      if (!result.success) {
        setError(result.error);
        setConfirmOpen(false);
        return;
      }

      setConfirmOpen(false);

      router.refresh();
    });
  }

  function handleReject() {
    setError(null);

    startTransition(async () => {
      const result = await rejectInvoiceApproval(approvalId, response);

      if (!result.success) {
        setError(result.error);
        return;
      }

      router.refresh();
    });
  }

  function handleCloseNote() {
    setShowNote(false);
    setResponse('');
    setError(null);
  }

  return (
    <>
      <div className="space-y-4">
        <div className="flex flex-wrap items-center gap-2">
          <Dialog.Root open={confirmOpen} onOpenChange={setConfirmOpen}>
            <Dialog.Trigger
              render={
                <button
                  type="button"
                  disabled={pending}
                  className="inline-flex h-11 items-center gap-2 rounded-xl bg-foreground px-5 text-[15px] font-semibold text-background transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
                />
              }>
              <Check className="size-4" />
              Accept Invoice
            </Dialog.Trigger>

            <Dialog.Portal>
              <Dialog.Backdrop className="fixed inset-0 z-[90] bg-black/50 backdrop-blur-[2px]" />

              <Dialog.Popup className="fixed left-1/2 top-1/2 z-[100] w-[calc(100%-2rem)] max-w-[520px] -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-2xl border border-border bg-background shadow-2xl outline-none">
                <header className="flex items-start justify-between gap-4 border-b border-border bg-surface-raised px-5 py-5 sm:px-6">
                  <div className="flex min-w-0 items-start gap-3">
                    <div className="flex size-10 shrink-0 items-center justify-center rounded-xl border border-border bg-background">
                      <CheckCircle2 className="size-5 text-theme-accent" />
                    </div>

                    <div>
                      <Dialog.Title className="text-lg font-semibold tracking-[-0.02em] text-foreground">
                        Confirm invoice verification
                      </Dialog.Title>

                      <Dialog.Description className="mt-1 text-[14px] leading-6 text-muted">
                        You are about to confirm this invoice as the billing agreement you reviewed.
                      </Dialog.Description>
                    </div>
                  </div>

                  <Dialog.Close
                    render={
                      <button
                        type="button"
                        disabled={pending}
                        aria-label="Close confirmation"
                        className="inline-flex size-9 shrink-0 items-center justify-center rounded-lg text-muted transition-colors hover:bg-surface hover:text-foreground disabled:opacity-50"
                      />
                    }>
                    <X className="size-4" />
                  </Dialog.Close>
                </header>

                <div className="px-5 py-6 sm:px-6">
                  <p className="text-base font-semibold text-foreground">
                    Have you reviewed the invoice details?
                  </p>

                  <p className="mt-2 text-[15px] leading-7 text-muted">
                    By confirming, you acknowledge that the items, amounts and billing details shown in this
                    invoice match your agreement with Rcentz Systems.
                  </p>

                  <div className="mt-5 rounded-xl border border-border bg-surface-muted/40 p-4">
                    <p className="text-[14px] leading-6 text-muted">
                      If something needs to be corrected, close this window and use{' '}
                      <span className="font-semibold text-foreground">Return for Changes</span> instead.
                    </p>
                  </div>

                  {error ? (
                    <p className="mt-4 text-[14px] leading-6 text-red-600 dark:text-red-400">{error}</p>
                  ) : null}
                </div>

                <footer className="flex flex-col-reverse gap-2 border-t border-border bg-surface-muted/40 px-5 py-4 sm:flex-row sm:justify-end sm:px-6">
                  <Dialog.Close
                    render={
                      <button
                        type="button"
                        disabled={pending}
                        className="inline-flex h-11 items-center justify-center rounded-xl border border-border bg-background px-5 text-[15px] font-semibold text-foreground transition-colors hover:bg-surface disabled:cursor-not-allowed disabled:opacity-50"
                      />
                    }>
                    Cancel
                  </Dialog.Close>

                  <button
                    type="button"
                    disabled={pending}
                    onClick={handleAccept}
                    className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-foreground px-5 text-[15px] font-semibold text-background transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50">
                    <Check className="size-4" />

                    {pending ? 'Confirming...' : 'Confirm Invoice'}
                  </button>
                </footer>
              </Dialog.Popup>
            </Dialog.Portal>
          </Dialog.Root>

          <button
            type="button"
            disabled={pending}
            onClick={handleReject}
            className="inline-flex h-11 items-center gap-2 rounded-xl border border-border bg-background px-5 text-[15px] font-semibold text-foreground transition-colors hover:bg-surface disabled:cursor-not-allowed disabled:opacity-50">
            <RotateCcw className="size-4" />
            Return for Changes
          </button>

          {!showNote ? (
            <button
              type="button"
              disabled={pending}
              onClick={() => {
                setShowNote(true);
                setError(null);
              }}
              className="inline-flex h-11 items-center gap-2 rounded-xl border border-border bg-transparent px-4 text-[15px] font-medium text-muted transition-colors hover:bg-surface hover:text-foreground disabled:cursor-not-allowed disabled:opacity-50">
              <MessageSquarePlus className="size-4" />
              Add a note
            </button>
          ) : null}
        </div>

        {showNote ? (
          <div className="overflow-hidden rounded-xl border border-border bg-background">
            <div className="flex items-center justify-between gap-3 border-b border-border bg-surface-raised px-4 py-3">
              <div>
                <p className="text-[15px] font-semibold text-foreground">Add a note</p>

                <p className="mt-1 text-[13px] text-muted">
                  Optional — use this only if you want to explain a requested change.
                </p>
              </div>

              <button
                type="button"
                disabled={pending}
                onClick={handleCloseNote}
                aria-label="Close note"
                className="inline-flex size-8 items-center justify-center rounded-lg text-muted transition-colors hover:bg-surface hover:text-foreground disabled:opacity-50">
                <X className="size-4" />
              </button>
            </div>

            <div className="p-4">
              <textarea
                rows={4}
                value={response}
                disabled={pending}
                onChange={event => {
                  setResponse(event.target.value);
                }}
                placeholder="Example: Please correct the delivery date."
                className="w-full resize-y rounded-xl border border-border bg-background px-3 py-3 text-[15px] leading-7 text-foreground outline-none placeholder:text-muted disabled:opacity-60"
              />

              <p className="mt-2 text-[13px] text-muted">You can return the invoice without adding a note.</p>
            </div>
          </div>
        ) : null}

        {error && !confirmOpen ? (
          <p className="text-[14px] leading-6 text-red-600 dark:text-red-400">{error}</p>
        ) : null}
      </div>
    </>
  );
}
