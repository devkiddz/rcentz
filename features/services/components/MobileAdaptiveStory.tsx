import Link from 'next/link';

import { ArrowUpRight } from 'lucide-react';

import { MobileAdaptiveIllustration } from './hero/MobileAdaptiveIllustration';

const CAPABILITIES = [
  'Mobile redesign',
  'App-like interfaces',
  'Responsive optimization',
  'Adaptive experiences'
] as const;

export function MobileAdaptiveStory() {
  return (
    <div className="grid items-center gap-10 sm:gap-12 lg:grid-cols-[0.84fr_1.16fr] lg:gap-12">
      <div className="min-w-0 max-w-[520px] text-left lg:pr-2">
        <div className="flex items-center gap-2.5">
          <span className="font-mono text-[7px] uppercase tracking-[0.16em] text-theme-accent sm:text-[8px] sm:tracking-[0.18em]">
            03 · Mobile & Adaptive
          </span>

          <span className="h-px w-7 bg-theme-accent/40 sm:w-8" />
        </div>

        <h2 className="mt-4 max-w-[470px] text-[2.05rem] font-semibold leading-[0.98] tracking-[-0.055em] text-foreground sm:mt-5 sm:text-[3rem] lg:text-[3.75rem]">
          Designed for every screen your customers use.
        </h2>

        <p className="mt-4 max-w-[490px] text-[12px] leading-6 text-muted sm:mt-5 sm:text-[14px] sm:leading-7">
          Rcentz creates mobile and adaptive experiences intentionally around smaller screens, touch
          interaction and focused user journeys instead of simply compressing a desktop website.
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
            href="/services/category/mobile-adaptive-experiences"
            className="group inline-flex h-10 items-center justify-center gap-2 rounded-full bg-theme-accent px-5 text-[11px] font-medium text-white shadow-sm transition-[opacity,transform] hover:opacity-90 active:scale-[0.98] sm:text-[12px]">
            Explore Mobile Experiences
            <ArrowUpRight
              aria-hidden="true"
              className="size-3.5 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
            />
          </Link>
        </div>
      </div>

      <div className="min-w-0">
        <MobileAdaptiveIllustration />
      </div>
    </div>
  );
}
