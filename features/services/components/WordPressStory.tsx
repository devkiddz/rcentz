import Link from 'next/link';

import { ArrowUpRight } from 'lucide-react';

import { WordPressIllustration } from './hero/WordPressIllustration';

const CAPABILITIES = [
  'WordPress development',
  'Website redesign',
  'Repairs & recovery',
  'Next.js migration'
] as const;

export function WordPressStory() {
  return (
    <div className="grid items-center gap-10 sm:gap-12 lg:grid-cols-[0.78fr_1.22fr] lg:gap-10">
      <div className="min-w-0 max-w-[500px] text-left">
        <div className="flex items-center gap-2.5">
          <span className="font-mono text-[7px] uppercase tracking-[0.16em] text-theme-accent sm:text-[8px] sm:tracking-[0.18em]">
            02 · WordPress
          </span>

          <span className="h-px w-7 bg-theme-accent/40 sm:w-8" />
        </div>

        <h2 className="mt-4 max-w-[500px] text-[2.15rem] font-semibold leading-[0.98] tracking-[-0.055em] text-foreground sm:mt-5 sm:text-[3.15rem] lg:text-[3.85rem]">
          Keep what works. Modernize what does not.
        </h2>

        <p className="mt-4 max-w-[470px] text-[12px] leading-6 text-muted sm:mt-5 sm:text-[14px] sm:leading-7">
          Rcentz develops, repairs and modernizes WordPress websites while preserving the content, structure
          and business value that still matters.
        </p>

        <div className="mt-5 flex flex-wrap gap-1.5 sm:mt-6 sm:gap-2">
          {CAPABILITIES.map(capability => (
            <span
              key={capability}
              className="rounded-full border border-theme-accent/15 bg-theme-accent-soft/45 px-2.5 py-1.5 text-[8px] text-muted backdrop-blur-lg sm:px-3 sm:text-[9px]">
              {capability}
            </span>
          ))}
        </div>

        <div className="mt-6 sm:mt-7">
          <Link
            href="/services/category/wordpress"
            className="group inline-flex h-10 items-center justify-center gap-2 rounded-full bg-theme-accent px-5 text-[11px] font-medium text-white shadow-sm transition-[opacity,transform] hover:opacity-90 active:scale-[0.98] sm:text-[12px]">
            Explore WordPress
            <ArrowUpRight
              aria-hidden="true"
              className="size-3.5 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
            />
          </Link>
        </div>
      </div>

      <div className="min-w-0">
        <WordPressIllustration />
      </div>
    </div>
  );
}
