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

        /*
         * Same off-white world
         * as the CTA.
         */

        'bg-[#f4f2ea]',

        'text-[#15312e]'
      ].join(' ')}>
      {/* =====================================================
          CONTINUING STRUCTURAL GRID
          ===================================================== */}

      <div
        aria-hidden="true"
        className={[
          'pointer-events-none',

          'absolute',
          'inset-0',

          'opacity-[0.52]',

          '[background-image:linear-gradient(to_right,rgb(14_76_68/0.065)_1px,transparent_1px),linear-gradient(to_bottom,rgb(14_76_68/0.065)_1px,transparent_1px)]',

          '[background-size:158px_158px]'
        ].join(' ')}
      />

      {/* CONTINUING DOT FIELD */}

      <div
        aria-hidden="true"
        className={[
          'pointer-events-none',

          'absolute',
          'inset-0',

          'opacity-[0.28]',

          '[background-image:radial-gradient(circle,rgb(32_178_166/0.13)_1px,transparent_1.15px)]',

          '[background-size:12px_12px]'
        ].join(' ')}
      />

      {/* AMBIENT GREEN */}

      <div
        aria-hidden="true"
        className={[
          'pointer-events-none',

          'absolute',

          'left-[8%]',
          'bottom-[-170px]',

          'h-[320px]',
          'w-[520px]',

          'rounded-full',

          'bg-[#20b2a6]/[0.055]',

          'blur-[140px]'
        ].join(' ')}
      />

      <div
        className={[
          'rcentz-section',

          'relative',
          'z-10',

          /*
           * No border separating
           * CTA and footer.
           */

          'pb-10',
          'pt-8',

          'md:pb-12',
          'md:pt-10'
        ].join(' ')}>
        <div className={['grid', 'gap-10', 'md:grid-cols-[1fr_auto]', 'md:gap-16'].join(' ')}>
          {/* BRAND */}

          <div className="max-w-md">
            <Link
              href="/"
              aria-label="rcentz home"
              className={['inline-flex', 'items-center', 'gap-2.5'].join(' ')}>
              <RcentzLogo />

              <span
                className={['text-sm', 'font-semibold', 'tracking-[-0.025em]', 'text-[#15312e]'].join(' ')}>
                rcentz
              </span>
            </Link>

            <p className={['mt-3', 'max-w-xs', 'text-sm', 'leading-6', 'text-[#667a76]'].join(' ')}>
              Building and operating modern software, digital products and business systems.
            </p>

            {/* MOBILE APP CAPSULE */}

            <div className="mt-6">
              <div
                className={[
                  'inline-flex',

                  'items-center',
                  'gap-3',

                  'rounded-full',

                  'border',
                  'border-[#153c38]/10',

                  'bg-white/48',

                  'px-2.5',
                  'py-2.5',

                  'pr-5',

                  'backdrop-blur-xl',

                  'transition-[background-color,border-color]',

                  'duration-300',

                  'hover:border-[#153c38]/16',

                  'hover:bg-white/72'
                ].join(' ')}>
                <span
                  className={[
                    'flex',
                    'size-9',

                    'shrink-0',

                    'items-center',
                    'justify-center',

                    'rounded-full',

                    'bg-[#173a36]',

                    'text-white'
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
                      'text-[#6b7d79]'
                    ].join(' ')}>
                    Mobile apps
                  </span>

                  <span className={['mt-0.5', 'text-[11px]', 'font-medium', 'text-[#284843]'].join(' ')}>
                    Coming soon
                  </span>
                </span>
              </div>
            </div>
          </div>

          {/* NAVIGATION */}

          <div className={['grid', 'grid-cols-2', 'gap-10', 'sm:gap-14'].join(' ')}>
            {footerNavigation.map(group => (
              <div key={group.title}>
                <p
                  className={[
                    'font-mono',
                    'text-[9px]',
                    'uppercase',
                    'tracking-[0.2em]',
                    'text-[#81918e]'
                  ].join(' ')}>
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

                        'text-[#5a716d]',

                        'transition-colors',
                        'duration-200',

                        'hover:text-[#102c29]'
                      ].join(' ')}>
                      {link.label}
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* BASELINE */}

        <div
          className={[
            'mt-12',

            'flex',
            'flex-col',
            'gap-3',

            'border-t',
            'border-[#173a36]/[0.08]',

            'pt-5',

            'text-[11px]',

            'text-[#7d8d8a]',

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
