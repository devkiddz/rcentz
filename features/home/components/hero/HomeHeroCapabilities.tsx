import { Boxes, Gauge, ShieldCheck, Wrench } from 'lucide-react';

const capabilities = [
  {
    label: 'Performance',
    description: 'Optimized systems',
    icon: Gauge
  },
  {
    label: 'Security',
    description: 'Built by design',
    icon: ShieldCheck
  },
  {
    label: 'Scalable',
    description: 'Modular foundations',
    icon: Boxes
  },
  {
    label: 'Maintainable',
    description: 'Built for the long run',
    icon: Wrench
  }
];

export function HomeHeroCapabilities() {
  return (
    <div
      className={[
        'grid grid-cols-4',
        'overflow-hidden rounded-2xl',
        'border border-border',
        'bg-background/88',
        'shadow-xl backdrop-blur-2xl'
      ].join(' ')}>
      {capabilities.map((capability, index) => {
        const Icon = capability.icon;

        return (
          <div
            key={capability.label}
            className={[
              'group',
              'flex min-h-[88px] items-center gap-3',
              'px-4 py-4',
              'transition-colors',
              'hover:bg-surface-raised',
              index !== 0 ? 'border-l border-border' : ''
            ].join(' ')}>
            <span
              className={[
                'flex size-8 shrink-0',
                'items-center justify-center',
                'rounded-full',
                'border border-border',
                'bg-surface-muted',
                'transition-[border-color,background-color]',
                'group-hover:border-theme-accent/35',
                'group-hover:bg-theme-accent-soft'
              ].join(' ')}>
              <Icon
                aria-hidden="true"
                className={['size-3.5 text-muted', 'transition-colors', 'group-hover:text-theme-accent'].join(
                  ' '
                )}
              />
            </span>

            <div className="min-w-0">
              <p className="truncate text-[10px] font-medium text-foreground sm:text-[11px]">
                {capability.label}
              </p>

              <p className="mt-1 hidden truncate font-mono text-[8px] text-muted sm:block">
                {capability.description}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
