import Link from 'next/link';

import { ArrowRight, MessageSquare } from 'lucide-react';

export function HomeCTA() {
  return (
    <section
      className={[
        /*
         * Full-bleed breakout.
         */

        'relative',

        'left-1/2',

        'w-screen',

        '-translate-x-1/2',

        'overflow-hidden',

        /*
         * Warm off-white rather
         * than pure white.
         */

        'bg-[#f4f2ea]',

        'py-24',
        'sm:py-28',
        'lg:py-32'
      ].join(' ')}>
      {/* =====================================================
          LARGE STRUCTURAL GRID
          ===================================================== */}

      <div
        aria-hidden="true"
        className={[
          'pointer-events-none',

          'absolute',
          'inset-0',

          'opacity-[0.65]',

          '[background-image:linear-gradient(to_right,rgb(14_76_68/0.075)_1px,transparent_1px),linear-gradient(to_bottom,rgb(14_76_68/0.075)_1px,transparent_1px)]',

          '[background-size:158px_158px]'
        ].join(' ')}
      />

      {/* =====================================================
          MICRO DOT FIELD
          ===================================================== */}

      <div
        aria-hidden="true"
        className={[
          'pointer-events-none',

          'absolute',

          'inset-x-0',
          'top-[40%]',
          'bottom-0',

          'opacity-[0.55]',

          '[background-image:radial-gradient(circle,rgb(32_178_166/0.14)_1px,transparent_1.15px)]',

          '[background-size:12px_12px]'
        ].join(' ')}
      />

      {/* =====================================================
          GREEN ATMOSPHERIC LIGHT
          ===================================================== */}

      <div
        aria-hidden="true"
        className={[
          'pointer-events-none',

          'absolute',

          'left-[8%]',
          'top-[42%]',

          'h-[340px]',
          'w-[620px]',

          '-translate-y-1/2',

          'rounded-full',

          'bg-[#20b2a6]/[0.08]',

          'blur-[140px]'
        ].join(' ')}
      />

      <div
        aria-hidden="true"
        className={[
          'pointer-events-none',

          'absolute',

          'right-[6%]',
          'bottom-[-100px]',

          'h-[300px]',
          'w-[480px]',

          'rounded-full',

          'bg-[#20b2a6]/[0.05]',

          'blur-[140px]'
        ].join(' ')}
      />

      {/* =====================================================
          CONTENT
          ===================================================== */}

      <div className={['rcentz-section', 'relative', 'z-10'].join(' ')}>
        <div className={['grid', 'gap-12', 'lg:grid-cols-[1fr_auto]', 'lg:items-end'].join(' ')}>
          <div className="max-w-5xl">
            {/* STATUS CAPSULE */}

            <div
              className={[
                'inline-flex',

                'items-center',
                'gap-2.5',

                'rounded-full',

                'border',
                'border-[#187f75]/15',

                'bg-white/52',

                'px-4',
                'py-2.5',

                'backdrop-blur-xl'
              ].join(' ')}>
              <span className={['relative', 'flex', 'size-2'].join(' ')}>
                <span
                  className={[
                    'absolute',

                    'inline-flex',
                    'size-full',

                    'animate-ping',

                    'rounded-full',

                    'bg-[#20b2a6]',

                    'opacity-25'
                  ].join(' ')}
                />

                <span
                  className={['relative', 'inline-flex', 'size-2', 'rounded-full', 'bg-[#20b2a6]'].join(' ')}
                />
              </span>

              <span
                className={[
                  'font-mono',

                  'text-[8px]',

                  'uppercase',

                  'tracking-[0.16em]',

                  'text-[#146f67]'
                ].join(' ')}>
                Build with Rcentz
              </span>
            </div>

            <h2
              className={[
                'mt-7',

                'max-w-5xl',

                'text-4xl',
                'font-semibold',

                'tracking-[-0.055em]',

                'text-[#0c2421]',

                'sm:text-5xl',
                'lg:text-6xl'
              ].join(' ')}>
              Have a system in mind?
              <span className="text-[#56716d]"> Start with the problem. We can architect the rest.</span>
            </h2>

            <p
              className={['mt-7', 'max-w-3xl', 'text-sm', 'leading-7', 'text-[#627773]', 'sm:text-base'].join(
                ' '
              )}>
              Bring the workflow, idea, challenge or existing system. Rcentz can help shape the technical path
              from there.
            </p>
          </div>

          {/* ACTIONS */}

          <div className={['flex', 'flex-wrap', 'gap-3'].join(' ')}>
            <Link
              href="/services"
              className={[
                'group',

                'inline-flex',

                'h-12',

                'items-center',
                'gap-2',

                'rounded-full',

                'bg-[#153c38]',

                'px-6',

                'text-[13px]',
                'font-medium',

                'text-white',

                'transition-[background-color,transform,box-shadow]',

                'duration-300',

                'hover:-translate-y-0.5',

                'hover:bg-[#1b514b]',

                'hover:shadow-[0_16px_42px_rgb(20_90_82/0.14)]',

                'active:scale-[0.98]'
              ].join(' ')}>
              Start a project
              <ArrowRight
                aria-hidden="true"
                className={[
                  'size-4',

                  'transition-transform',

                  'duration-300',

                  'group-hover:translate-x-0.5'
                ].join(' ')}
              />
            </Link>

            <Link
              href="/services"
              className={[
                'inline-flex',

                'h-12',

                'items-center',
                'gap-2',

                'rounded-full',

                'border',
                'border-[#153c38]/12',

                'bg-white/50',

                'px-5',

                'text-[13px]',
                'font-medium',

                'text-[#34514d]',

                'backdrop-blur-xl',

                'transition-[background-color,border-color,color,transform]',

                'duration-300',

                'hover:-translate-y-0.5',

                'hover:border-[#153c38]/20',

                'hover:bg-white/78',

                'hover:text-[#132f2c]',

                'active:scale-[0.98]'
              ].join(' ')}>
              <MessageSquare aria-hidden="true" className="size-4" />
              Explore services
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
