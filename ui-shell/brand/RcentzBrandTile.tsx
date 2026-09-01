'use client';

import Link from 'next/link';

type RcentzBrandTileProps = {
  name: string;
  label: string;
  logoSrc: string;
  href?: string;
  comingSoon?: boolean;
  theme?: 'inverse' | 'surface' | 'glass';
};

export function RcentzBrandTile({
  name,
  label,
  logoSrc,
  href,
  comingSoon = false,
  theme = 'glass'
}: RcentzBrandTileProps) {
  const className = [
    'group inline-flex h-11 items-center gap-2.5 rounded-full',
    'border px-2.5 pr-4',
    'transition-[background-color,border-color,opacity,transform] duration-200',
    'active:scale-[0.98]',

    theme === 'inverse'
      ? ['border-foreground', 'bg-foreground', 'text-background', 'hover:opacity-90'].join(' ')
      : '',

    theme === 'surface'
      ? ['border-border', 'bg-surface', 'text-foreground', 'hover:bg-surface-muted'].join(' ')
      : '',

    theme === 'glass'
      ? [
          'border-foreground/[0.07]',
          'bg-foreground/[0.025]',
          'text-foreground',
          'backdrop-blur-md',
          'hover:border-foreground/[0.14]',
          'hover:bg-foreground/[0.055]'
        ].join(' ')
      : ''
  ].join(' ');

  const content = (
    <>
      {/* Rcentz inverse brand mark */}
      <span
        className={[
          'flex size-7 shrink-0 items-center justify-center rounded-full',
          'bg-foreground text-background',
          'transition-transform duration-200',
          'group-hover:scale-[1.04]'
        ].join(' ')}>
        <span
          aria-hidden="true"
          className="size-[17px] bg-current"
          style={{
            WebkitMaskImage: `url("${logoSrc}")`,
            maskImage: `url("${logoSrc}")`,
            WebkitMaskRepeat: 'no-repeat',
            maskRepeat: 'no-repeat',
            WebkitMaskPosition: 'center',
            maskPosition: 'center',
            WebkitMaskSize: 'contain',
            maskSize: 'contain'
          }}
        />
      </span>

      <span className="flex flex-col items-start leading-none">
        <span className="text-[9px] text-current opacity-55">{label}</span>

        <span className="mt-1 text-[11px] font-semibold tracking-[-0.015em]">{name}</span>
      </span>
    </>
  );

  if (comingSoon) {
    return (
      <button type="button" className={className} onClick={() => alert(`${name} — Coming soon.`)}>
        {content}
      </button>
    );
  }

  if (href) {
    return (
      <Link href={href} className={className} target="_blank" rel="noreferrer">
        {content}
      </Link>
    );
  }

  return <div className={className}>{content}</div>;
}
