import {
  Check,
  Database,
  Rocket,
  ServerCog
} from 'lucide-react';

import { HomeHeroCodeRotator } from '@/features/home/components/hero/HomeHeroCodeRotator';

export function HomeHeroWorkspace() {
  return (
    <div
      className={[
        'relative',
        'h-full w-full',
        'min-h-[620px]',
        'sm:min-h-[650px]',
        'lg:min-h-[500px]'
      ].join(' ')}>
      <div
        aria-hidden="true"
        className={[
          'pointer-events-none absolute',
          'inset-[8%_1%_6%_1%]',
          'rounded-full',
          'bg-theme-accent-faint',
          'blur-3xl',
          'lg:inset-[12%_4%_8%_4%]'
        ].join(' ')}
      />

      <div
        className={[
          'absolute',
          'left-[2%] right-[2%] top-0',
          'z-30',
          'rounded-2xl',
          'border border-border',
          'bg-background/88',
          'px-3.5 py-2.5',
          'shadow-xl',
          'backdrop-blur-xl',
          'lg:left-[4%]',
          'lg:right-auto',
          'lg:top-[18px]',
          'lg:w-[150px]',
          'lg:rounded-xl',
          'lg:p-4',
          'lg:shadow-none',
          'lg:bg-background/68'
        ].join(' ')}>
        <div className="flex items-center justify-between gap-3 lg:hidden">
          <div className="flex min-w-0 items-center gap-2.5">
            <span
              className={[
                'flex size-9 shrink-0',
                'items-center justify-center',
                'rounded-xl',
                'bg-theme-accent-soft'
              ].join(' ')}>
              <ServerCog className="size-4 text-theme-accent" />
            </span>

            <div className="min-w-0">
              <p className="font-mono text-[6px] uppercase tracking-[0.14em] text-muted">
                Rcentz system
              </p>

              <p className="mt-0.5 truncate text-[11px] font-semibold">
                Production environment
              </p>
            </div>
          </div>

          <div className="flex shrink-0 items-center gap-2 rounded-full border border-theme-accent/20 bg-theme-accent-soft px-2.5 py-1.5">
            <span className="relative flex size-1.5">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-theme-accent opacity-30" />
              <span className="relative inline-flex size-1.5 rounded-full bg-theme-accent" />
            </span>

            <span className="font-mono text-[6px] uppercase tracking-[0.1em] text-theme-accent">
              Ready
            </span>
          </div>
        </div>

        <div className="hidden lg:block">
          <p className="font-mono text-[8px] uppercase tracking-[0.14em] text-muted">
            Deployment
          </p>

          <div className="mt-3 flex items-center gap-2">
            <span className="size-1.5 rounded-full bg-theme-accent" />
            <span className="text-[10px] font-medium">Production</span>
          </div>

          <p className="mt-5 text-lg font-semibold tracking-[-0.03em]">
            Ready
          </p>

          <p className="mt-1 font-mono text-[8px] text-muted">
            Application system
          </p>
        </div>
      </div>

      <div
        className={[
          'absolute',
          'left-[2%] right-[2%]',
          'top-[13%]',
          'z-20',
          'lg:left-auto',
          'lg:right-0',
          'lg:top-4',
          'lg:w-[79%]',
          'lg:max-w-[430px]'
        ].join(' ')}>
        <div className="mb-2 flex items-center justify-between px-1 lg:hidden">
          <div className="flex items-center gap-2">
            <span className="size-1.5 rounded-full bg-theme-accent" />

            <span className="font-mono text-[6px] uppercase tracking-[0.14em] text-muted">
              Live application architecture
            </span>
          </div>

          <span className="font-mono text-[6px] text-theme-accent">
            EXECUTING
          </span>
        </div>

        <HomeHeroCodeRotator />
      </div>

      <div
        aria-hidden="true"
        className={[
          'absolute',
          'left-1/2',
          'top-[60%]',
          'z-10',
          'h-[46px] w-px',
          '-translate-x-1/2',
          'bg-gradient-to-b',
          'from-theme-accent/10',
          'via-theme-accent/40',
          'to-theme-accent/10',
          'lg:hidden'
        ].join(' ')}>
        <span
          className={[
            'absolute',
            'left-1/2 top-1/2',
            'size-2',
            '-translate-x-1/2',
            '-translate-y-1/2',
            'rounded-full',
            'bg-theme-accent',
            'shadow-[0_0_14px_var(--theme-accent)]'
          ].join(' ')}
        />
      </div>

      <div
        className={[
          'absolute',
          'bottom-[2%] left-[2%]',
          'z-30',
          'w-[47%]',
          'min-h-[132px]',
          'rounded-2xl',
          'border border-border',
          'bg-background/90',
          'p-3.5',
          'shadow-xl',
          'backdrop-blur-xl',
          'lg:bottom-[62px]',
          'lg:left-[1%]',
          'lg:w-[185px]',
          'lg:min-h-0',
          'lg:rounded-xl',
          'lg:p-4'
        ].join(' ')}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="flex size-7 items-center justify-center rounded-lg bg-theme-accent-soft lg:size-auto lg:bg-transparent">
              <Database
                aria-hidden="true"
                className="size-3.5 text-theme-accent lg:text-muted"
              />
            </span>

            <span className="text-[9px] font-medium lg:text-[10px]">
              Database
            </span>
          </div>

          <span className="relative flex size-1.5">
            <span className="absolute inline-flex size-full animate-ping rounded-full bg-theme-accent opacity-25" />
            <span className="relative inline-flex size-1.5 rounded-full bg-theme-accent" />
          </span>
        </div>

        <p className="mt-4 font-mono text-[6px] uppercase tracking-[0.14em] text-muted lg:mt-5 lg:text-[8px]">
          Prisma
        </p>

        <p className="mt-1 text-[11px] font-medium lg:text-sm">
          Connected
        </p>

        <div className="mt-3 flex items-center gap-2 border-t border-border pt-2.5 lg:mt-4 lg:pt-3">
          <span className="size-1.5 rounded-full bg-theme-accent" />
          <span className="font-mono text-[6px] text-muted lg:text-[8px]">
            Data layer active
          </span>
        </div>
      </div>

      <div
        className={[
          'absolute',
          'bottom-[2%] right-[2%]',
          'z-30',
          'w-[47%]',
          'min-h-[132px]',
          'rounded-2xl',
          'border border-border',
          'bg-background/90',
          'p-3.5',
          'shadow-xl',
          'backdrop-blur-xl',
          'lg:bottom-4',
          'lg:right-[2%]',
          'lg:w-[205px]',
          'lg:min-h-0',
          'lg:rounded-xl',
          'lg:bg-background/80',
          'lg:p-4'
        ].join(' ')}>
        <div className="mb-3 flex items-center justify-between lg:hidden">
          <span className="flex size-7 items-center justify-center rounded-lg bg-theme-accent-soft">
            <Rocket className="size-3.5 text-theme-accent" />
          </span>

          <span className="font-mono text-[5px] uppercase tracking-[0.12em] text-muted">
            Deploy
          </span>
        </div>

        <p className="truncate font-mono text-[6px] text-theme-accent lg:text-[8px]">
          ~/rcentz-systems
        </p>

        <p className="mt-2.5 font-mono text-[7px] text-foreground lg:mt-3 lg:text-[9px]">
          pnpm build
        </p>

        <div className="mt-2.5 flex items-center gap-2 lg:mt-3">
          <span className="flex size-5 items-center justify-center rounded-full bg-theme-accent-soft lg:size-4">
            <Check
              aria-hidden="true"
              className="size-3 text-theme-accent lg:size-2.5"
            />
          </span>

          <span className="text-[7px] font-medium lg:font-mono lg:text-[9px]">
            Build successful
          </span>
        </div>

        <p className="mt-1.5 font-mono text-[6px] text-muted lg:mt-2 lg:text-[8px]">
          Ready to ship.
        </p>
      </div>
    </div>
  );
}
