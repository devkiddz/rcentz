'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

type RcentzNavLinkProps = {
  label: string;
  href: string;
  mobile?: boolean;
  onNavigate?: () => void;
};

export function RcentzNavLink({ label, href, mobile = false, onNavigate }: RcentzNavLinkProps) {
  const pathname = usePathname();

  const active = pathname === href || (href !== '/' && pathname.startsWith(`${href}/`));

  return (
    <Link
      href={href}
      aria-current={active ? 'page' : undefined}
      onClick={onNavigate}
      className={[
        'group',
        'relative',
        'isolate',
        'inline-flex',
        'items-center',
        'overflow-hidden',
        'border',
        'border-transparent',

        'transition-[color,background-color,border-color]',
        'duration-200',
        'ease-out',

        'focus-visible:outline-none',
        'focus-visible:ring-1',
        'focus-visible:ring-[var(--theme-accent)]/35',

        mobile
          ? ['h-10', 'w-full', 'rounded-xl', 'px-3.5', 'text-[13px]'].join(' ')
          : ['h-8', 'justify-center', 'rounded-full', 'px-3', 'text-[12px]'].join(' '),

        active
          ? ['border-border/40', 'bg-background/38', 'font-medium', 'text-foreground'].join(' ')
          : [
              'text-muted',

              'hover:border-border/30',
              'hover:bg-background/24',
              'hover:text-foreground',

              'focus-visible:border-border/40',
              'focus-visible:bg-background/30',
              'focus-visible:text-foreground'
            ].join(' ')
      ].join(' ')}>
      {/* =====================================================
          ATTENTION SURFACE

          Only becomes visible when the user deliberately
          interacts with the navigation.

          The header owns the main glass surface.
          Individual links remain visually quiet.
          ===================================================== */}

      <span
        aria-hidden="true"
        className={[
          'pointer-events-none',
          'absolute inset-0',
          '-z-10',

          'bg-gradient-to-b',
          'from-foreground/[0.035]',
          'to-transparent',

          'transition-opacity',
          'duration-200',

          active
            ? 'opacity-100'
            : ['opacity-0', 'group-hover:opacity-100', 'group-focus-visible:opacity-100'].join(' ')
        ].join(' ')}
      />

      {/* =====================================================
          LABEL
          ===================================================== */}

      <span className="relative z-10">{label}</span>

      {/* =====================================================
          ACTIVE ROUTE SIGNAL

          Desktop:
          tiny bottom accent rail.

          Mobile:
          tiny left-side accent rail.

          This gives active state without turning every
          navigation item into a loud capsule.
          ===================================================== */}

      {active ? (
        mobile ? (
          <span
            aria-hidden="true"
            className={[
              'absolute',
              'left-1.5',
              'top-1/2',
              'h-4',
              'w-px',
              '-translate-y-1/2',
              'rounded-full',
              'bg-[var(--theme-accent)]'
            ].join(' ')}
          />
        ) : (
          <span
            aria-hidden="true"
            className={[
              'absolute',
              'bottom-[3px]',
              'left-1/2',
              'h-px',
              'w-4',
              '-translate-x-1/2',
              'rounded-full',
              'bg-[var(--theme-accent)]'
            ].join(' ')}
          />
        )
      ) : null}
    </Link>
  );
}
