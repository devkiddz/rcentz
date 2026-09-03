'use client';

import { ChevronLeft, ChevronRight } from 'lucide-react';

type ModernizationNavigationProps = {
  slides: readonly { id: string; label: string }[];
  activeIndex: number;
  duration: number;
  paused: boolean;
  onSelect: (index: number) => void;
  onPrevious: () => void;
  onNext: () => void;
};

export function ModernizationNavigation({
  slides,
  activeIndex,
  duration,
  paused,
  onSelect,
  onPrevious,
  onNext
}: ModernizationNavigationProps) {
  return (
    <div className="relative z-10 flex items-center gap-2 border-t border-border/70 px-4 py-3 sm:px-5">
      <div className="flex min-w-0 flex-1 gap-1.5 overflow-x-auto">
        {slides.map((slide, index) => {
          const active = index === activeIndex;

          return (
            <button
              key={slide.id}
              type="button"
              onClick={() => onSelect(index)}
              className={[
                'relative min-w-fit overflow-hidden rounded-full border px-3 py-1.5',
                'font-mono text-[7px] uppercase tracking-[0.12em] transition-colors',
                active
                  ? 'border-border-strong bg-surface-raised text-foreground'
                  : 'border-border bg-surface-muted/30 text-muted hover:text-foreground'
              ].join(' ')}>
              <span className="relative z-10">{slide.label}</span>

              {active && !paused ? (
                <span
                  key={`${activeIndex}-${duration}`}
                  aria-hidden="true"
                  className="absolute inset-x-0 bottom-0 h-px origin-left bg-[var(--theme-accent)]"
                  style={{
                    animation: `rcentz-modernization-progress ${duration}ms linear forwards`
                  }}
                />
              ) : null}
            </button>
          );
        })}
      </div>

      <button
        type="button"
        onClick={onPrevious}
        aria-label="Previous transformation"
        className="inline-flex size-8 shrink-0 items-center justify-center rounded-full border border-border bg-surface-muted text-muted hover:text-foreground">
        <ChevronLeft className="size-3.5" />
      </button>

      <button
        type="button"
        onClick={onNext}
        aria-label="Next transformation"
        className="inline-flex size-8 shrink-0 items-center justify-center rounded-full border border-border bg-surface-muted text-muted hover:text-foreground">
        <ChevronRight className="size-3.5" />
      </button>

      <style>{`
        @keyframes rcentz-modernization-progress {
          from { transform: scaleX(0); }
          to { transform: scaleX(1); }
        }
      `}</style>
    </div>
  );
}
