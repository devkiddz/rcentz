'use client';

import { PUBLIC_NAVIGATION } from './navigation';
import { RcentzNavLink } from './RcentzNavLink';

type RcentzNavigationProps = {
  mobile?: boolean;
  onNavigate?: () => void;
};

export function RcentzNavigation({ mobile = false, onNavigate }: RcentzNavigationProps) {
  if (mobile) {
    return (
      <nav aria-label="Mobile navigation" className={['flex', 'flex-col', 'gap-1'].join(' ')}>
        {PUBLIC_NAVIGATION.map(item => (
          <RcentzNavLink key={item.href} label={item.label} href={item.href} mobile onNavigate={onNavigate} />
        ))}
      </nav>
    );
  }

  return (
    <nav
      aria-label="Primary navigation"
      className={['hidden', 'items-center', 'gap-0.5', 'md:flex', 'lg:gap-1'].join(' ')}>
      {PUBLIC_NAVIGATION.map(item => (
        <RcentzNavLink key={item.href} label={item.label} href={item.href} />
      ))}
    </nav>
  );
}
