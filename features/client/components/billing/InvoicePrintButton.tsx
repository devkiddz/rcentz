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
      className="inline-flex h-9 items-center gap-2 rounded-xl border border-border bg-surface px-3 text-[10px] font-semibold text-foreground transition-colors hover:bg-surface-raised print:hidden">
      <Printer className="size-3.5" />
      Print / Save PDF
    </button>
  );
}
