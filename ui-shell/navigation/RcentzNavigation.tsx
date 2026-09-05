'use client';

import { useTranslations } from 'next-intl';

import { PUBLIC_NAVIGATION } from './navigation';
import { RcentzNavLink } from './RcentzNavLink';

type RcentzNavigationProps = {
  mobile?: boolean;
  onNavigate?: () => void;
};

function getNavigationTranslationKey(href: string) {
  switch (href) {
    case '/services':
      return 'services';

    case '/portfolio':
      return 'portfolio';

    case '/store':
      return 'store';

    case '/blog':
      return 'blog';

    case '/about':
      return 'about';

    default:
      return null;
  }
}

export function RcentzNavigation({ mobile = false, onNavigate }: RcentzNavigationProps) {
  const t = useTranslations('Header');

  const translatedNavigation = PUBLIC_NAVIGATION.map(item => {
    const translationKey = getNavigationTranslationKey(item.href);

    return {
      ...item,

      label: translationKey ? t(translationKey) : item.label
    };
  });

  if (mobile) {
    return (
      <nav aria-label="Mobile navigation" className={['flex', 'flex-col', 'gap-1'].join(' ')}>
        {translatedNavigation.map(item => (
          <RcentzNavLink key={item.href} label={item.label} href={item.href} mobile onNavigate={onNavigate} />
        ))}
      </nav>
    );
  }

  return (
    <nav
      aria-label="Primary navigation"
      className={['hidden', 'items-center', 'gap-0.5', 'md:flex', 'lg:gap-1'].join(' ')}>
      {translatedNavigation.map(item => (
        <RcentzNavLink key={item.href} label={item.label} href={item.href} />
      ))}
    </nav>
  );
}
