'use client';

import { Printer } from 'lucide-react';

export function InvoicePrintButton() {
  function handlePrint() {
    window.print();
  }

  return (
    <button
      type="button"
      onClick={handlePrint}
      className="inline-flex h-10 items-center gap-2 rounded-xl border border-border bg-surface px-4 text-sm font-semibold text-foreground transition-colors hover:bg-surface-raised print:hidden">
      <Printer className="size-4" />
      Print / Save PDF
    </button>
  );
}
