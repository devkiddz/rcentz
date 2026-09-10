'use client';

import { useState, useTransition } from 'react';

import { useRouter } from 'next/navigation';

import { Send, X } from 'lucide-react';

import {
  cancelAdminInvoiceRevision,
  issueAdminInvoice
} from '@/features/admin/server/invoices/invoice-lifecycle';

export function AdminIssueInvoiceButton({ invoiceId }: { invoiceId: string }) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  function handleIssue() {
    const confirmed = window.confirm(
      'Issue this invoice to the client? It will become visible in their billing account.'
    );

    if (!confirmed) {
      return;
    }

    setError(null);

    startTransition(async () => {
      const result = await issueAdminInvoice(invoiceId);

      if (!result.success) {
        setError(result.error);
        return;
      }

      router.refresh();
    });
  }

  return (
    <div>
      <button
        type="button"
        disabled={pending}
        onClick={handleIssue}
        className="inline-flex h-10 items-center gap-2 rounded-xl bg-foreground px-4 text-sm font-semibold text-background transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50">
        <Send className="size-4" />
        {pending ? 'Issuing...' : 'Issue Invoice'}
      </button>

      {error ? (
        <p className="mt-2 max-w-xs text-xs leading-5 text-red-600 dark:text-red-400">{error}</p>
      ) : null}
    </div>
  );
}

export function AdminCancelRevisionButton({ revisionId }: { revisionId: string }) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  function handleCancel() {
    const confirmed = window.confirm(
      'Close this payment update? The current accepted invoice will remain authoritative.'
    );

    if (!confirmed) {
      return;
    }

    setError(null);

    startTransition(async () => {
      const result = await cancelAdminInvoiceRevision(revisionId);

      if (!result.success) {
        setError(result.error);
        return;
      }

      router.refresh();
    });
  }

  return (
    <div>
      <button
        type="button"
        disabled={pending}
        onClick={handleCancel}
        className="inline-flex h-9 items-center gap-2 rounded-lg border border-border bg-background px-3 text-xs font-semibold text-foreground transition-colors hover:bg-surface disabled:cursor-not-allowed disabled:opacity-50">
        <X className="size-3.5" />
        {pending ? 'Closing...' : 'Close Update'}
      </button>

      {error ? <p className="mt-2 text-xs leading-5 text-red-600 dark:text-red-400">{error}</p> : null}
    </div>
  );
}
