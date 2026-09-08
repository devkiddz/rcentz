'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';

import { Bell, Menu, X } from 'lucide-react';

import { useEffect, useState } from 'react';

import { RcentzLogo } from '../brand/RcentzLogo';
import { RcentzThemeControl } from '../theme/RcentzThemeControl';

import { RcentzAuthActions } from './RcentzAuthActions';
import { RcentzLanguageControl } from './RcentzLanguageControl';
import { RcentzNavigation } from './RcentzNavigation';
import { RcentzStartProjectAction } from './RcentzStartProjectAction';

import { authClient } from '@/lib/auth-client';

export function RcentzHeader() {
  const router = useRouter();

  const { data: session } = authClient.useSession();

  const [mobileOpen, setMobileOpen] = useState(false);

  const [scrolled, setScrolled] = useState(false);

  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    function handleScroll() {
      setScrolled(window.scrollY > 40);
    }

    handleScroll();

    const revealFrame = requestAnimationFrame(() => {
      setRevealed(true);
    });

    window.addEventListener('scroll', handleScroll, {
      passive: true
    });

    return () => {
      cancelAnimationFrame(revealFrame);

      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  function closeMobileNavigation() {
    setMobileOpen(false);
  }

  function handleNotifications() {
    if (!session?.user) {
      router.push('/login?next=/dashboard/notifications');

      return;
    }

    router.push('/dashboard/notifications');
  }

  return (
    <>
      <div aria-hidden="true" className="h-[68px] sm:h-[72px]" />

      <div
        aria-hidden="true"
        className={[
          'pointer-events-none',
          'fixed',
          'inset-x-0',
          'top-0',
          'z-40',
          'hidden',
          'md:block',
          'origin-top',
          'bg-background',
          'transition-[height,transform,opacity]',
          'duration-500',
          'ease-[cubic-bezier(0.22,1,0.36,1)]',
          revealed ? 'translate-y-0 scale-y-100 opacity-100' : '-translate-y-3 scale-y-50 opacity-0',
          scrolled ? 'h-[14px]' : 'h-[24px]'
        ].join(' ')}
      />

      <header
        className={[
          'fixed',
          'left-1/2',
          'z-50',
          '-translate-x-1/2',
          'w-[calc(100%-1rem)]',
          'sm:w-[calc(100%-2rem)]',
          'max-w-[1440px]',
          'origin-top',
          'border',
          'rounded-[24px]',
          'md:rounded-full',
          'backdrop-blur-2xl',
          'transform-gpu',
          'transition-[top,background-color,border-color,box-shadow,transform,opacity]',
          'duration-500',
          'ease-[cubic-bezier(0.22,1,0.36,1)]',
          revealed ? 'translate-y-0 scale-y-100 opacity-100' : '-translate-y-4 scale-y-[0.94] opacity-0',
          scrolled
            ? [
                'top-[6px]',
                'border-border/80',
                'bg-background/94',
                'shadow-[0_12px_38px_rgb(0_0_0/0.10)]',
                'dark:shadow-[0_12px_38px_rgb(0_0_0/0.38)]',
                'md:bg-background/78'
              ].join(' ')
            : [
                'top-[8px]',
                'border-border/70',
                'bg-background/88',
                'shadow-[0_8px_28px_rgb(0_0_0/0.08)]',
                'dark:shadow-[0_8px_28px_rgb(0_0_0/0.30)]',
                'md:top-[10px]',
                'md:bg-background/38'
              ].join(' ')
        ].join(' ')}>
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 overflow-hidden rounded-[inherit]">
          <div
            className="
              absolute
              inset-x-[8%]
              top-0
              h-px
              bg-gradient-to-r
              from-transparent
              via-foreground/10
              to-transparent
            "
          />

          <div
            className="
              absolute
              left-1/2
              top-[-36px]
              h-[54px]
              w-[55%]
              -translate-x-1/2
              rounded-full
              bg-theme-accent-faint
              blur-3xl
            "
          />
        </div>

        <div
          className={[
            'relative',
            'z-10',
            'mx-auto',
            'transition-[padding]',
            'duration-300',
            scrolled ? 'px-3 sm:px-4 lg:px-5' : 'px-4 sm:px-5 lg:px-5'
          ].join(' ')}>
          <div
            className={[
              'flex',
              'items-center',
              'justify-between',
              'transition-[height]',
              'duration-300',
              scrolled ? 'h-[48px]' : 'h-[52px] sm:h-[56px]'
            ].join(' ')}>
            <Link
              href="/"
              onClick={closeMobileNavigation}
              aria-label="Rcentz home"
              className="flex min-w-0 items-center gap-2.5">
              <RcentzLogo compact={scrolled} />

              <span
                className={[
                  'truncate',
                  'font-semibold',
                  'tracking-[-0.025em]',
                  'text-foreground',
                  'transition-[font-size]',
                  'duration-300',
                  scrolled ? 'text-[13px]' : 'text-sm'
                ].join(' ')}>
                rcentz
              </span>
            </Link>

            <RcentzNavigation />

            <div className="hidden items-center gap-1.5 md:flex">
              <RcentzLanguageControl />

              <RcentzThemeControl />

              <RcentzAuthActions />

              <RcentzStartProjectAction compact={scrolled} />
            </div>

            <div className="flex items-center gap-1.5 md:hidden">
              <button
                type="button"
                onClick={handleNotifications}
                aria-label="Notifications"
                className="
                  relative
                  flex
                  size-9
                  items-center
                  justify-center
                  rounded-full
                  border
                  border-border/55
                  bg-background/38
                  text-foreground
                  backdrop-blur-xl
                  transition-[background-color,border-color,transform]
                  duration-200
                  hover:border-border-strong/70
                  hover:bg-background/58
                  active:scale-[0.96]
                ">
                <Bell aria-hidden="true" className="size-3.5" />

                {session?.user ? (
                  <span
                    aria-hidden="true"
                    className="
                      absolute
                      right-[7px]
                      top-[7px]
                      size-1.5
                      rounded-full
                      bg-theme-accent
                    "
                  />
                ) : null}
              </button>

              <div className="max-w-[74px]">
                <RcentzLanguageControl />
              </div>

              <button
                type="button"
                aria-label={mobileOpen ? 'Close navigation' : 'Open navigation'}
                aria-expanded={mobileOpen}
                aria-controls="rcentz-mobile-navigation"
                onClick={() => {
                  setMobileOpen(currentMobileOpen => !currentMobileOpen);
                }}
                className="
                  flex
                  size-9
                  items-center
                  justify-center
                  rounded-full
                  border
                  border-border/55
                  bg-background/38
                  text-foreground
                  backdrop-blur-xl
                  transition-[background-color,border-color,transform]
                  duration-200
                  hover:border-border-strong/70
                  hover:bg-background/58
                  active:scale-[0.96]
                ">
                {mobileOpen ? (
                  <X aria-hidden="true" className="size-3.5" />
                ) : (
                  <Menu aria-hidden="true" className="size-3.5" />
                )}
              </button>
            </div>
          </div>

          <div
            id="rcentz-mobile-navigation"
            className={[
              'grid',
              'transition-[grid-template-rows,opacity]',
              'duration-300',
              'ease-[cubic-bezier(0.22,1,0.36,1)]',
              mobileOpen ? 'grid-rows-[1fr] opacity-100' : 'pointer-events-none grid-rows-[0fr] opacity-0'
            ].join(' ')}>
            <div className="overflow-hidden">
              <div className="border-t border-border/60 pb-3">
                <div className="py-3">
                  <RcentzNavigation mobile onNavigate={closeMobileNavigation} />
                </div>

                <div className="grid grid-cols-2 gap-2 border-t border-border/60 pt-3">
                  <RcentzThemeControl mobile />

                  <RcentzAuthActions mobile onNavigate={closeMobileNavigation} />

                  <div className="col-span-2">
                    <RcentzStartProjectAction mobile onNavigate={closeMobileNavigation} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}
