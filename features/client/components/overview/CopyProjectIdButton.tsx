'use client';

import { useState } from 'react';

import { Check, Copy } from 'lucide-react';

type CopyProjectIdButtonProps = {
  value: string;
};

export function CopyProjectIdButton({ value }: CopyProjectIdButtonProps) {
  const [copied, setCopied] = useState(false);

  async function copyProjectId() {
    try {
      await navigator.clipboard.writeText(value);

      setCopied(true);

      window.setTimeout(() => {
        setCopied(false);
      }, 1600);
    } catch {
      setCopied(false);
    }
  }

  return (
    <button
      type="button"
      onClick={copyProjectId}
      aria-label={copied ? 'Project ID copied' : 'Copy project ID'}
      title={copied ? 'Copied' : 'Copy project ID'}
      className="flex size-6 shrink-0 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-surface-muted hover:text-foreground">
      {copied ? (
        <Check aria-hidden="true" className="size-3 text-theme-accent" />
      ) : (
        <Copy aria-hidden="true" className="size-3" />
      )}
    </button>
  );
}
