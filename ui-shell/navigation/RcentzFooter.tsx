import Link from 'next/link';

import { Smartphone } from 'lucide-react';

import { RcentzLogo } from '../brand/RcentzLogo';

const footerNavigation = [
  {
    title: 'Company',

    links: [
      {
        label: 'About',
        href: '/about'
      },
      {
        label: 'Portfolio',
        href: '/portfolio'
      },
      {
        label: 'Services',
        href: '/services'
      }
    ]
  },

  {
    title: 'Platform',

    links: [
      {
        label: 'Client Login',
        href: '/login'
      },
      {
        label: 'Start a Project',
        href: '/services'
      }
    ]
  }
] as const;

export function RcentzFooter() {
  return (
    <footer
      className={[
        'relative',
        'z-20',

        'overflow-hidden',

        'bg-[var(--shell-footer)]',
        'text-foreground',

        'transition-colors',
        'duration-300'
      ].join(' ')}>
      {/* =====================================================
          THEME-AWARE STRUCTURAL GRID
          ===================================================== */}

      <div
        aria-hidden="true"
        className={[
          'pointer-events-none',

          'absolute',
          'inset-0',

          'opacity-70',

          'bg-[linear-gradient(to_right,var(--grid-line)_1px,transparent_1px),linear-gradient(to_bottom,var(--grid-line)_1px,transparent_1px)]',

          '[background-size:158px_158px]'
        ].join(' ')}
      />

      {/* =====================================================
          THEME-AWARE SIGNAL FIELD
          ===================================================== */}

      <div
        aria-hidden="true"
        className={[
          'pointer-events-none',

          'absolute',
          'inset-0',

          'opacity-35',

          'bg-[radial-gradient(circle,var(--environment-signal)_1px,transparent_1.15px)]',

          '[background-size:12px_12px]'
        ].join(' ')}
      />

      {/* =====================================================
          ACCENT ATMOSPHERE
          ===================================================== */}

      <div
        aria-hidden="true"
        className={[
          'pointer-events-none',

          'absolute',

          'bottom-[-170px]',
          'left-[8%]',

          'h-[320px]',
          'w-[520px]',

          'rounded-full',

          'bg-[var(--theme-accent-faint)]',

          'blur-[140px]'
        ].join(' ')}
      />

      <div
        aria-hidden="true"
        className={[
          'pointer-events-none',

          'absolute',

          'right-[5%]',
          'top-[-160px]',

          'h-[280px]',
          'w-[420px]',

          'rounded-full',

          'bg-[var(--environment-glow-top)]',

          'blur-[130px]'
        ].join(' ')}
      />

      {/* =====================================================
          CONTENT
          ===================================================== */}

      <div
        className={['rcentz-section', 'relative', 'z-10', 'pb-10', 'pt-8', 'md:pb-12', 'md:pt-10'].join(' ')}>
        <div className={['grid', 'gap-10', 'md:grid-cols-[1fr_auto]', 'md:gap-16'].join(' ')}>
          {/* =================================================
              BRAND
              ================================================= */}

          <div className="max-w-md">
            <Link
              href="/"
              aria-label="rcentz home"
              className={['inline-flex', 'items-center', 'gap-2.5'].join(' ')}>
              <RcentzLogo />

              <span
                className={['text-sm', 'font-semibold', 'tracking-[-0.025em]', 'text-foreground'].join(' ')}>
                rcentz
              </span>
            </Link>

            <p className={['mt-3', 'max-w-xs', 'text-sm', 'leading-6', 'text-muted'].join(' ')}>
              Building and operating modern software, digital products and business systems.
            </p>

            {/* ===============================================
                MOBILE PLATFORM STATUS
                =============================================== */}

            <div className="mt-6">
              <div
                className={[
                  'group',

                  'inline-flex',

                  'items-center',
                  'gap-3',

                  'rounded-full',

                  'border',
                  'border-border',

                  'bg-surface/60',

                  'px-2.5',
                  'py-2.5',
                  'pr-5',

                  'backdrop-blur-xl',

                  'transition-[background-color,border-color,transform]',

                  'duration-300',

                  'hover:-translate-y-px',
                  'hover:border-border-strong',
                  'hover:bg-surface-raised'
                ].join(' ')}>
                <span
                  className={[
                    'flex',
                    'size-9',

                    'shrink-0',

                    'items-center',
                    'justify-center',

                    'rounded-full',

                    'bg-primary',

                    'text-primary-foreground'
                  ].join(' ')}>
                  <Smartphone aria-hidden="true" className="size-4" />
                </span>

                <span className="flex flex-col">
                  <span
                    className={[
                      'font-mono',

                      'text-[8px]',
                      'uppercase',

                      'tracking-[0.16em]',

                      'text-muted'
                    ].join(' ')}>
                    Mobile apps
                  </span>

                  <span className={['mt-0.5', 'text-[11px]', 'font-medium', 'text-foreground/80'].join(' ')}>
                    Coming soon
                  </span>
                </span>
              </div>
            </div>
          </div>

          {/* =================================================
              NAVIGATION
              ================================================= */}

          <div className={['grid', 'grid-cols-2', 'gap-10', 'sm:gap-14'].join(' ')}>
            {footerNavigation.map(group => (
              <div key={group.title}>
                <p
                  className={['font-mono', 'text-[9px]', 'uppercase', 'tracking-[0.2em]', 'text-muted'].join(
                    ' '
                  )}>
                  {group.title}
                </p>

                <div className={['mt-4', 'flex', 'flex-col', 'gap-3'].join(' ')}>
                  {group.links.map(link => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className={[
                        'w-fit',

                        'text-[13px]',

                        'text-muted',

                        'transition-colors',
                        'duration-200',

                        'hover:text-foreground'
                      ].join(' ')}>
                      {link.label}
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ===================================================
            BASELINE
            =================================================== */}

        <div
          className={[
            'mt-12',

            'flex',
            'flex-col',

            'gap-3',

            'border-t',
            'border-border',

            'pt-5',

            'text-[11px]',

            'text-muted',

            'sm:flex-row',
            'sm:items-center',
            'sm:justify-between'
          ].join(' ')}>
          <p>© {new Date().getFullYear()} rcentz.</p>

          <p className={['font-mono', 'tracking-[-0.01em]'].join(' ')}>
            Systems built from real data outward.
          </p>
        </div>
      </div>
    </footer>
  );
}
