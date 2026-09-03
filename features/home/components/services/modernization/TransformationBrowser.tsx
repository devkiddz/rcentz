'use client';

import Image from 'next/image';
import { ExternalLink } from 'lucide-react';

type TransformationBrowserProps = {
  src: string;
  alt: string;
  label: string;
  className?: string;
  objectPosition?: string;
};

export function TransformationBrowser({
  src,
  alt,
  label,
  className = '',
  objectPosition = 'top'
}: TransformationBrowserProps) {
  return (
    <div
      className={[
        'overflow-hidden rounded-[18px] border border-border bg-background shadow-2xl',
        className
      ].join(' ')}>
      <div className="flex h-9 items-center gap-2 border-b border-border bg-surface-muted/45 px-3">
        <span className="size-1.5 rounded-full bg-border-strong" />
        <span className="size-1.5 rounded-full bg-border-strong" />
        <span className="size-1.5 rounded-full bg-border-strong" />

        <div className="ml-2 flex h-5 min-w-0 flex-1 items-center rounded-full border border-border bg-background/75 px-2">
          <span className="truncate font-mono text-[7px] text-muted">
            {label}
          </span>
        </div>

        <ExternalLink className="size-3 text-muted" />
      </div>

      <div className="relative aspect-[1.48/1] overflow-hidden bg-surface-muted/25">
        <Image
          src={src}
          alt={alt}
          fill
          sizes="(max-width: 1024px) 100vw, 40vw"
          className="object-cover"
          style={{ objectPosition }}
        />
      </div>
    </div>
  );
}
