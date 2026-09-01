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
        'inline-flex items-center rounded-full border',

        'transition-[color,background-color,border-color] duration-200',

        mobile ? 'h-9 w-full px-3 text-[13px]' : 'h-8 px-2.5 text-[12px]',

        active
          ? ['border-border-strong', 'bg-secondary', 'font-medium text-secondary-foreground'].join(' ')
          : [
              'border-border',
              'bg-surface-muted',
              'text-muted',

              'hover:border-border-strong',
              'hover:bg-secondary',
              'hover:text-foreground'
            ].join(' ')
      ].join(' ')}>
      {label}
    </Link>
  );
}
