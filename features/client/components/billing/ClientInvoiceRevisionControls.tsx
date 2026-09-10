'use client';

import { useState, useTransition } from 'react';

import { useRouter } from 'next/navigation';

import { Check, X } from 'lucide-react';

import {
  acceptInvoiceRevision,
  rejectInvoiceRevision
} from '@/features/client/server/billing/invoice-revision-actions';

export function ClientInvoiceRevisionControls({ revisionId }: { revisionId: string }) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();

  const [response, setResponse] = useState('');
  const [error, setError] = useState<string | null>(null);

  function handleAccept() {
    setError(null);

    startTransition(async () => {
      const result = await acceptInvoiceRevision(revisionId);

      if (!result.success) {
        setError(result.error);
        return;
      }

      router.refresh();
    });
  }

  function handleReject() {
    setError(null);

    startTransition(async () => {
      const result = await rejectInvoiceRevision(revisionId, response);

      if (!result.success) {
        setError(result.error);
        return;
      }

      router.refresh();
    });
  }

  return (
    <div className="space-y-4">
      <div>
        <label className="text-xs font-semibold text-muted">Response to Rcentz · Optional</label>

        <textarea
          rows={3}
          value={response}
          disabled={pending}
          onChange={event => {
            setResponse(event.target.value);
          }}
          placeholder="Add a note if you disagree with this update."
          className="mt-2 w-full resize-y rounded-xl border border-border bg-background px-3 py-3 text-sm leading-6 text-foreground outline-none placeholder:text-muted disabled:opacity-60"
        />
      </div>

      {error ? <p className="text-sm leading-5 text-red-600 dark:text-red-400">{error}</p> : null}

      <div className="flex flex-wrap gap-2">
        <button
          type="button"
          disabled={pending}
          onClick={handleAccept}
          className="inline-flex h-11 items-center gap-2 rounded-xl bg-foreground px-5 text-sm font-semibold text-background transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50">
          <Check className="size-4" />
          {pending ? 'Processing...' : 'Accept Payment Update'}
        </button>

        <button
          type="button"
          disabled={pending}
          onClick={handleReject}
          className="inline-flex h-11 items-center gap-2 rounded-xl border border-border bg-background px-5 text-sm font-semibold text-foreground transition-colors hover:bg-surface disabled:cursor-not-allowed disabled:opacity-50">
          <X className="size-4" />
          Reject Update
        </button>
      </div>
    </div>
  );
}
