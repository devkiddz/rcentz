'use client';

import Link from 'next/link';
import { Menu, X } from 'lucide-react';
import { useEffect, useState } from 'react';

import { RcentzLogo } from '../brand/RcentzLogo';
import { RcentzThemeControl } from '../theme/RcentzThemeControl';
import { RcentzAuthActions } from './RcentzAuthActions';
import { RcentzNavLink } from './RcentzNavLink';

const navigation = [
  {
    label: 'Services',
    href: '/services'
  },
  {
    label: 'Work',
    href: '/portfolio'
  },
  {
    label: 'About',
    href: '/about'
  }
];

export function RcentzHeader() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    function handleScroll() {
      setScrolled(window.scrollY > 40);
    }

    handleScroll();

    const frame = requestAnimationFrame(() => {
      setRevealed(true);
    });

    window.addEventListener('scroll', handleScroll, {
      passive: true
    });

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  function closeMobileNavigation() {
    setMobileOpen(false);
  }

  return (
    <>
      <div aria-hidden="true" className="h-[72px]" />

      {/* Solid continuation surface */}
      <div
        aria-hidden="true"
        className={[
          'fixed inset-x-0 top-0 z-40',
          'h-[24px]',
          'origin-top bg-background',
          'transition-[transform,opacity,height,background-color] duration-500 ease-out',

          revealed ? 'translate-y-0 scale-y-100 opacity-100' : '-translate-y-3 scale-y-50 opacity-0',

          scrolled ? 'h-[16px]' : 'h-[24px]'
        ].join(' ')}
      />

      <header
        className={[
          'fixed left-1/2 z-50 -translate-x-1/2',

          'border border-border/70',
          'bg-background/35 backdrop-blur-2xl',
          'shadow-[0_8px_30px_rgb(0_0_0/0.06)]',
          'dark:shadow-[0_8px_30px_rgb(0_0_0/0.22)]',

          'origin-top',

          'transition-[width,max-width,top,height,border-radius,background-color,border-color,box-shadow,transform,opacity] duration-500 ease-out',

          revealed ? 'translate-y-0 scale-y-100 opacity-100' : '-translate-y-4 scale-y-[0.92] opacity-0',

          scrolled ? 'top-[6px]' : 'top-[10px]',

          mobileOpen
            ? 'w-[calc(100%-1rem)] max-w-[1200px] rounded-[28px]'
            : scrolled
              ? 'w-[calc(100%-1.5rem)] max-w-[1080px] rounded-full'
              : 'w-[calc(100%-1rem)] max-w-[1200px] rounded-full'
        ].join(' ')}>
        <div
          className={[
            'mx-auto transition-[padding] duration-300 ease-out',
            scrolled ? 'px-3 sm:px-4' : 'px-4 sm:px-5'
          ].join(' ')}>
          <div
            className={[
              'flex items-center justify-between',
              'transition-[height] duration-300 ease-out',
              scrolled ? 'h-[48px]' : 'h-[56px]'
            ].join(' ')}>
            <Link
              href="/"
              onClick={closeMobileNavigation}
              aria-label="Rcentz Systems home"
              className="flex min-w-0 items-center gap-2.5">
              <RcentzLogo compact={scrolled} />

              <span
                className={[
                  'truncate font-semibold tracking-[-0.025em] text-foreground',
                  'transition-[font-size] duration-300 ease-out',
                  scrolled ? 'text-[13px]' : 'text-sm'
                ].join(' ')}>
                Rcentz Systems
              </span>
            </Link>

            {/* Desktop navigation */}
            <nav aria-label="Primary navigation" className="hidden items-center gap-2 md:flex">
              {navigation.map(item => (
                <RcentzNavLink key={item.href} label={item.label} href={item.href} />
              ))}
            </nav>

            {/* Desktop actions */}
            <div className="hidden items-center gap-1.5 md:flex">
              <RcentzThemeControl />

              <RcentzAuthActions />

              <Link
                href="/services"
                className={[
                  'rounded-full border border-primary',
                  'bg-primary font-medium text-primary-foreground',

                  'transition-[padding,font-size,opacity,background-color,color,border-color] duration-300 ease-out',

                  'hover:opacity-85',

                  scrolled ? 'px-3.5 py-1.5 text-xs' : 'px-4 py-1.5 text-[13px]'
                ].join(' ')}>
                Start a project
              </Link>
            </div>

            {/* Mobile menu trigger */}
            <button
              type="button"
              aria-label={mobileOpen ? 'Close navigation menu' : 'Open navigation menu'}
              aria-expanded={mobileOpen}
              aria-controls="rcentz-mobile-navigation"
              onClick={() => {
                setMobileOpen(current => !current);
              }}
              className={[
                'flex items-center justify-center rounded-full',

                'border border-border',
                'bg-surface-muted text-foreground',

                'transition-[width,height,background-color,border-color,color] duration-300',

                'hover:border-border-strong',
                'hover:bg-secondary',

                'md:hidden',

                scrolled ? 'size-8' : 'size-9'
              ].join(' ')}>
              {mobileOpen ? (
                <X aria-hidden="true" className="size-3.5" />
              ) : (
                <Menu aria-hidden="true" className="size-3.5" />
              )}
            </button>
          </div>

          {/* Mobile navigation */}
          {mobileOpen ? (
            <div id="rcentz-mobile-navigation" className="border-t border-border pb-3">
              <nav aria-label="Mobile navigation" className="flex flex-col gap-1.5 py-3">
                {navigation.map(item => (
                  <RcentzNavLink
                    key={item.href}
                    label={item.label}
                    href={item.href}
                    mobile
                    onNavigate={closeMobileNavigation}
                  />
                ))}
              </nav>

              <div className="grid grid-cols-[auto_1fr_1fr] gap-2 border-t border-border pt-3">
                <RcentzThemeControl mobile />

                <RcentzAuthActions mobile onNavigate={closeMobileNavigation} />

                <Link
                  href="/services"
                  onClick={closeMobileNavigation}
                  className={[
                    'flex h-9 items-center justify-center rounded-full',
                    'border border-primary',
                    'bg-primary px-3',
                    'text-xs font-medium text-primary-foreground',
                    'transition-opacity hover:opacity-85'
                  ].join(' ')}>
                  Start project
                </Link>
              </div>
            </div>
          ) : null}
        </div>
      </header>
    </>
  );
}
