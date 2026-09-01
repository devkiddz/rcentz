import { RcentzMark } from './RcentzMark';

type RcentzLogoProps = {
  compact?: boolean;
  className?: string;
};

export function RcentzLogo({ compact = false, className = '' }: RcentzLogoProps) {
  return (
    <span
      aria-hidden="true"
      className={[
        'relative flex shrink-0 items-center justify-center rounded-full',
        'bg-brand-logo-background',
        'text-brand-logo-foreground',
        'transition-[width,height,background-color,color,transform] duration-300 ease-out',
        compact ? 'size-6' : 'size-7',
        className
      ].join(' ')}>
      <span
        className={[
          'rcentz-logo-halo absolute rounded-full',
          'bg-brand-logo-background/15',
          compact ? '-inset-0.5' : '-inset-1'
        ].join(' ')}
      />

      <RcentzMark
        title=""
        className={[
          'rcentz-logo-mark relative z-10',
          'text-brand-logo-foreground',
          compact ? 'size-[14px]' : 'size-4'
        ].join(' ')}
      />
    </span>
  );
}
