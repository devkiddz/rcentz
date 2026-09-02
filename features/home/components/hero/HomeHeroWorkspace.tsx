import { Check, Database } from 'lucide-react';

import { HomeHeroCodeRotator } from '@/features/home/components/hero/HomeHeroCodeRotator';

export function HomeHeroWorkspace() {
  return (
    <div className="relative h-full min-h-[500px] w-full">
      {/* AMBIENT ACCENT */}
      <div
        aria-hidden="true"
        className={[
          'pointer-events-none absolute',
          'inset-[12%_4%_8%_4%]',
          'rounded-full',
          'bg-theme-accent-faint',
          'blur-3xl'
        ].join(' ')}
      />

      {/* DEPLOYMENT */}
      <div
        className={[
          'absolute left-[4%] top-[18px] z-10',
          'w-[150px] rounded-xl',
          'border border-border',
          'bg-background/68',
          'p-4 backdrop-blur-xl'
        ].join(' ')}>
        <p className="font-mono text-[8px] uppercase tracking-[0.14em] text-muted">Deployment</p>

        <div className="mt-3 flex items-center gap-2">
          <span className="size-1.5 rounded-full bg-theme-accent" />

          <span className="text-[10px] font-medium">Production</span>
        </div>

        <p className="mt-5 text-lg font-semibold tracking-[-0.03em]">Ready</p>

        <p className="mt-1 font-mono text-[8px] text-muted">Application system</p>
      </div>

      {/* MAIN LIVE CODE WINDOW */}
      <div className="absolute right-0 top-4 z-20 w-[79%] max-w-[430px]">
        <HomeHeroCodeRotator />
      </div>

      {/* DATABASE */}
      <div
        className={[
          'absolute bottom-[62px] left-[1%] z-30',
          'w-[185px] rounded-xl',
          'border border-border',
          'bg-background/82',
          'p-4 shadow-xl',
          'backdrop-blur-2xl'
        ].join(' ')}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Database aria-hidden="true" className="size-3.5 text-muted" />

            <span className="text-[10px] font-medium">Database</span>
          </div>

          <span className="size-1.5 rounded-full bg-theme-accent" />
        </div>

        <p className="mt-5 font-mono text-[8px] uppercase tracking-[0.14em] text-muted">Prisma</p>

        <p className="mt-1 text-sm font-medium">Connected</p>

        <div className="mt-4 flex items-center gap-2 border-t border-border pt-3">
          <span className="size-1.5 rounded-full bg-theme-accent" />

          <span className="font-mono text-[8px] text-muted">PostgreSQL</span>
        </div>
      </div>

      {/* BUILD RESULT */}
      <div
        className={[
          'absolute bottom-4 right-[2%] z-10',
          'w-[205px] rounded-xl',
          'border border-border',
          'bg-background/80',
          'p-4 shadow-xl',
          'backdrop-blur-xl'
        ].join(' ')}>
        <p className="font-mono text-[8px] text-theme-accent">~/rcentz-systems</p>

        <p className="mt-3 font-mono text-[9px] text-foreground">pnpm build</p>

        <div className="mt-3 flex items-center gap-2">
          <span className="flex size-4 items-center justify-center rounded-full bg-theme-accent-soft">
            <Check aria-hidden="true" className="size-2.5 text-theme-accent" />
          </span>

          <span className="font-mono text-[9px] font-medium">Build successful</span>
        </div>

        <p className="mt-2 font-mono text-[8px] text-muted">Ready to ship.</p>
      </div>
    </div>
  );
}
