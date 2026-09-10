'use client';

import { useState, useTransition } from 'react';

import { useRouter } from 'next/navigation';

import { Send } from 'lucide-react';

import { requestAdminInvoiceApproval } from '@/features/admin/server/invoices/invoice-approval-actions';

export function AdminRequestInvoiceApprovalButton({ invoiceId }: { invoiceId: string }) {
  const router = useRouter();

  const [pending, startTransition] = useTransition();

  const [error, setError] = useState<string | null>(null);

  function handleRequest() {
    setError(null);

    startTransition(async () => {
      const result = await requestAdminInvoiceApproval(invoiceId);

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
        onClick={handleRequest}
        className="inline-flex h-10 items-center gap-2 rounded-xl border border-border bg-background px-4 text-sm font-semibold text-foreground transition-colors hover:bg-surface disabled:cursor-not-allowed disabled:opacity-50">
        <Send className="size-4" />

        {pending ? 'Sending...' : 'Request Verification'}
      </button>

      {error ? (
        <p className="mt-2 max-w-xs text-xs leading-5 text-red-600 dark:text-red-400">{error}</p>
      ) : null}
    </div>
  );
}
