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
    label: 'Store',
    href: '/store'
  },
  {
    label: 'Blog',
    href: '/blog'
  },
  {
    label: 'About',
    href: '/about'
  }
] as const;

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
      {/* =====================================================
          DOCUMENT SPACER

          Keeps page content below the fixed header.
          ===================================================== */}

      <div aria-hidden="true" className="h-[72px]" />

      {/* =====================================================
          PRISMA-STYLE TOP MASK

          This is important.

          It creates the clean environmental surface above the
          floating navigation and contracts when scrolling.
          ===================================================== */}

      <div
        aria-hidden="true"
        className={[
          'pointer-events-none',
          'fixed inset-x-0 top-0',
          'z-40',
          'origin-top',
          'bg-background',

          'transition-[height,transform,opacity]',
          'duration-500',
          'ease-[cubic-bezier(0.22,1,0.36,1)]',

          revealed
            ? ['translate-y-0', 'scale-y-100', 'opacity-100'].join(' ')
            : ['-translate-y-3', 'scale-y-50', 'opacity-0'].join(' '),

          scrolled ? 'h-[14px]' : 'h-[24px]'
        ].join(' ')}
      />

      {/* =====================================================
          NAVIGATION

          Width remains aligned with the application body.

          The Prisma-like effect now comes from:
          - vertical position
          - height
          - padding
          - glass density
          - shadow
          - radius
          - content sizing

          NOT from breaking the site's width axis.
          ===================================================== */}

      <header
        className={[
          'fixed',
          'left-1/2',
          'z-50',
          '-translate-x-1/2',

          /*
           * SAME AXIS AS .rcentz-section
           *
           * globals:
           * --section-max: 1200px
           * mobile: calc(100% - 1rem)
           * sm+: calc(100% - 2rem)
           */
          'w-[calc(100%-1rem)]',
          'sm:w-[calc(100%-2rem)]',
          'max-w-[1200px]',

          'origin-top',

          'border',

          'backdrop-blur-2xl',
          'transform-gpu',

          'transition-[top,border-radius,background-color,border-color,box-shadow,transform,opacity]',
          'duration-500',
          'ease-[cubic-bezier(0.22,1,0.36,1)]',

          revealed
            ? ['translate-y-0', 'scale-y-100', 'opacity-100'].join(' ')
            : ['-translate-y-4', 'scale-y-[0.94]', 'opacity-0'].join(' '),

          /*
           * PRISMA FLOATING EFFECT
           */
          scrolled
            ? [
                'top-[6px]',
                'border-border/80',
                'bg-background/78',
                'shadow-[0_12px_40px_rgb(0_0_0/0.08)]',
                'dark:shadow-[0_12px_40px_rgb(0_0_0/0.34)]'
              ].join(' ')
            : [
                'top-[10px]',
                'border-border/65',
                'bg-background/38',
                'shadow-[0_8px_30px_rgb(0_0_0/0.055)]',
                'dark:shadow-[0_8px_30px_rgb(0_0_0/0.22)]'
              ].join(' '),

          /*
           * MENU OPEN:
           * retain rounded floating panel,
           * otherwise use pill navigation.
           */
          mobileOpen ? 'rounded-[28px]' : 'rounded-full'
        ].join(' ')}>
        {/* ===================================================
            AMBIENT HEADER SURFACE

            Gives the floating header a subtle internal
            highlight without changing its real width.
            =================================================== */}

        <div
          aria-hidden="true"
          className={['pointer-events-none', 'absolute inset-0', 'overflow-hidden', 'rounded-[inherit]'].join(
            ' '
          )}>
          <div
            className={[
              'absolute inset-x-[8%]',
              'top-0',
              'h-px',
              'bg-gradient-to-r',
              'from-transparent',
              'via-foreground/10',
              'to-transparent',

              'transition-opacity',
              'duration-500',

              scrolled ? 'opacity-60' : 'opacity-30'
            ].join(' ')}
          />

          <div
            className={[
              'absolute',
              'left-1/2 top-[-36px]',
              'h-[54px]',
              'w-[55%]',
              '-translate-x-1/2',
              'rounded-full',
              'bg-theme-accent-faint',
              'blur-3xl',

              'transition-opacity',
              'duration-500',

              scrolled ? 'opacity-30' : 'opacity-55'
            ].join(' ')}
          />
        </div>

        {/* ===================================================
            INNER NAVIGATION AXIS
            =================================================== */}

        <div
          className={[
            'relative z-10',
            'mx-auto',

            'transition-[padding]',
            'duration-300',
            'ease-[cubic-bezier(0.22,1,0.36,1)]',

            scrolled ? ['px-3', 'sm:px-4', 'lg:px-5'].join(' ') : ['px-4', 'sm:px-5', 'lg:px-5'].join(' ')
          ].join(' ')}>
          {/* ===============================================
              PRIMARY ROW
              =============================================== */}

          <div
            className={[
              'flex',
              'items-center',
              'justify-between',

              'transition-[height]',
              'duration-300',
              'ease-[cubic-bezier(0.22,1,0.36,1)]',

              scrolled ? 'h-[48px]' : 'h-[56px]'
            ].join(' ')}>
            {/* BRAND */}

            <Link
              href="/"
              onClick={closeMobileNavigation}
              aria-label="rcentz home"
              className={['flex', 'min-w-0', 'items-center', 'gap-2.5'].join(' ')}>
              <RcentzLogo compact={scrolled} />

              <span
                className={[
                  'truncate',
                  'font-semibold',
                  'tracking-[-0.025em]',
                  'text-foreground',

                  'transition-[font-size]',
                  'duration-300',
                  'ease-out',

                  scrolled ? 'text-[13px]' : 'text-sm'
                ].join(' ')}>
                rcentz
              </span>
            </Link>

            {/* DESKTOP NAVIGATION */}

            <nav
              aria-label="Primary navigation"
              className={['hidden', 'items-center', 'gap-1.5', 'md:flex', 'lg:gap-2'].join(' ')}>
              {navigation.map(item => (
                <RcentzNavLink key={item.href} label={item.label} href={item.href} />
              ))}
            </nav>

            {/* DESKTOP ACTIONS */}

            <div className={['hidden', 'items-center', 'gap-1.5', 'md:flex'].join(' ')}>
              <RcentzThemeControl />

              <RcentzAuthActions />

              <Link
                href="/services"
                className={[
                  'rounded-full',
                  'border',
                  'border-primary',
                  'bg-primary',

                  'font-medium',
                  'text-primary-foreground',

                  'transition-[padding,font-size,opacity,transform]',
                  'duration-300',
                  'ease-out',

                  'hover:opacity-85',
                  'active:scale-[0.98]',

                  scrolled
                    ? ['px-3.5', 'py-1.5', 'text-xs'].join(' ')
                    : ['px-4', 'py-1.5', 'text-[13px]'].join(' ')
                ].join(' ')}>
                Start a project
              </Link>
            </div>

            {/* MOBILE MENU BUTTON */}

            <button
              type="button"
              aria-label={mobileOpen ? 'Close navigation menu' : 'Open navigation menu'}
              aria-expanded={mobileOpen}
              aria-controls="rcentz-mobile-navigation"
              onClick={() => {
                setMobileOpen(current => !current);
              }}
              className={[
                'flex',
                'items-center',
                'justify-center',

                'rounded-full',

                'border',
                'border-border',

                'bg-surface-muted',
                'text-foreground',

                'transition-[width,height,background-color,border-color,color,transform]',
                'duration-300',

                'hover:border-border-strong',
                'hover:bg-secondary',

                'active:scale-[0.96]',

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

          {/* ===============================================
              MOBILE NAVIGATION
              =============================================== */}

          <div
            id="rcentz-mobile-navigation"
            className={[
              'grid',

              'transition-[grid-template-rows,opacity]',
              'duration-300',
              'ease-[cubic-bezier(0.22,1,0.36,1)]',

              mobileOpen
                ? ['grid-rows-[1fr]', 'opacity-100'].join(' ')
                : ['pointer-events-none', 'grid-rows-[0fr]', 'opacity-0'].join(' ')
            ].join(' ')}>
            <div className="overflow-hidden">
              <div className="border-t border-border pb-3">
                <nav
                  aria-label="Mobile navigation"
                  className={['flex', 'flex-col', 'gap-1.5', 'py-3'].join(' ')}>
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

                <div
                  className={[
                    'grid',
                    'grid-cols-[auto_1fr_1fr]',
                    'gap-2',
                    'border-t',
                    'border-border',
                    'pt-3'
                  ].join(' ')}>
                  <RcentzThemeControl mobile />

                  <RcentzAuthActions mobile onNavigate={closeMobileNavigation} />

                  <Link
                    href="/services"
                    onClick={closeMobileNavigation}
                    className={[
                      'flex h-9',
                      'items-center',
                      'justify-center',

                      'rounded-full',

                      'border',
                      'border-primary',

                      'bg-primary',
                      'px-3',

                      'text-xs',
                      'font-medium',
                      'text-primary-foreground',

                      'transition-[opacity,transform]',
                      'hover:opacity-85',
                      'active:scale-[0.98]'
                    ].join(' ')}>
                    Start project
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}
