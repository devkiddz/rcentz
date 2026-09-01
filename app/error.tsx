'use client';

import { RotateCcw, TriangleAlert } from 'lucide-react';

type ErrorPageProps = {
  error: Error & {
    digest?: string;
  };
  reset: () => void;
};

export default function ErrorPage({ error, reset }: ErrorPageProps) {
  return (
    <div className="flex min-h-[55vh] items-center justify-center py-16">
      <div className="w-full max-w-sm text-center">
        <span className="mx-auto flex size-10 items-center justify-center rounded-full border border-border bg-surface-muted">
          <TriangleAlert aria-hidden="true" className="size-4 text-muted" />
        </span>

        <p className="mt-4 font-mono text-[10px] uppercase tracking-[0.2em] text-muted">
          System interruption
        </p>

        <h1 className="mt-2 text-lg font-semibold tracking-[-0.025em]">
          Something didn&apos;t load correctly.
        </h1>

        <p className="mt-2 text-sm leading-6 text-muted">
          The application encountered an unexpected error. You can retry the current operation.
        </p>

        <button
          type="button"
          onClick={reset}
          className={[
            'mt-5 inline-flex h-9 items-center justify-center gap-2 rounded-full',
            'border border-border',
            'bg-surface-muted px-4',
            'text-xs font-medium text-foreground',
            'transition-[background-color,border-color]',
            'hover:border-border-strong hover:bg-secondary'
          ].join(' ')}>
          <RotateCcw aria-hidden="true" className="size-3.5" />
          Try again
        </button>

        {error.digest ? (
          <p className="mt-4 font-mono text-[9px] text-muted/70">Reference: {error.digest}</p>
        ) : null}
      </div>
    </div>
  );
}
