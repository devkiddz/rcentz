import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

import { HomeHeroRotator } from '@/features/home/components/hero/HomeHeroRotator';

export function HomeHeroIntro() {
  return (
    <div
      className={[
        'relative z-10',
        'flex h-full min-h-[500px]',
        'max-w-[470px] flex-col',
        'justify-center'
      ].join(' ')}>
      <div className="flex items-center gap-2">
        <span className="size-1.5 rounded-full bg-theme-accent" />

        <p className="font-mono text-[9px] font-medium uppercase tracking-[0.2em] text-muted">
          Software · Systems · Scale
        </p>
      </div>

      <h1 className="mt-5 text-balance text-[2.45rem] font-semibold leading-[0.99] tracking-[-0.055em] sm:text-[2.9rem] lg:text-[3.15rem]">
        We engineer the technology that{' '}
        <span
          className={[
            'bg-gradient-to-r',
            'from-foreground',
            'via-theme-accent',
            'to-theme-accent-strong',
            'bg-clip-text text-transparent'
          ].join(' ')}>
          powers market leaders...
        </span>
      </h1>

      <HomeHeroRotator />

      <div className="mt-7 flex flex-wrap items-center gap-3">
        <Link
          href="/work"
          className={[
            'inline-flex h-10 items-center justify-center gap-2 rounded-full',
            'bg-primary px-5',
            'text-[12px] font-medium text-primary-foreground',
            'transition-[opacity,transform]',
            'hover:opacity-90',
            'active:scale-[0.98]'
          ].join(' ')}>
          View our work
          <ArrowRight aria-hidden="true" className="size-3.5" />
        </Link>

        <Link
          href="/services"
          className={[
            'inline-flex h-10 items-center justify-center gap-2 rounded-full',
            'border border-border',
            'bg-background/40 px-5 backdrop-blur-xl',
            'text-[12px] font-medium text-foreground',
            'transition-[background-color,border-color,transform]',
            'hover:border-border-strong',
            'hover:bg-surface-muted',
            'active:scale-[0.98]'
          ].join(' ')}>
          Explore services
          <ArrowRight aria-hidden="true" className="size-3.5" />
        </Link>
      </div>

      <div className="mt-6">
        <div className="inline-flex items-center gap-2 rounded-full border border-border bg-background/45 px-3 py-1.5 backdrop-blur-xl">
          <span className="relative flex size-1.5">
            <span className="absolute inline-flex size-full animate-ping rounded-full bg-theme-accent opacity-40" />

            <span className="relative inline-flex size-1.5 rounded-full bg-theme-accent" />
          </span>

          <span className="font-mono text-[8px] uppercase tracking-[0.13em] text-muted">
            Building production systems
          </span>
        </div>
      </div>
    </div>
  );
}
