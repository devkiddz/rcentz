import { HomeCTA } from '@/features/home/components/HomeCTA';

import { HomeInspirations } from '@/features/home/components/inspirations/HomeInspirations';

export function HomeClosingExperience() {
  return (
    <>
      {/* =====================================================
          DARK GREEN INSPIRATION WORLD
          ===================================================== */}

      <div
        className={[
          'relative',

          'left-1/2',

          'w-screen',

          '-translate-x-1/2',

          'overflow-hidden',

          'bg-[#071513]'
        ].join(' ')}>
        {/* LARGE GRID */}

        <div
          aria-hidden="true"
          className={[
            'pointer-events-none',
            'absolute',
            'inset-0',
            'opacity-[0.52]',

            '[background-image:linear-gradient(to_right,rgb(32_178_166/0.10)_1px,transparent_1px),linear-gradient(to_bottom,rgb(32_178_166/0.10)_1px,transparent_1px)]',

            '[background-size:158px_158px]'
          ].join(' ')}
        />

        {/* DOT FIELD */}

        <div
          aria-hidden="true"
          className={[
            'pointer-events-none',
            'absolute',
            'inset-x-0',
            'top-[260px]',
            'bottom-0',

            'opacity-[0.55]',

            '[background-image:radial-gradient(circle,rgb(73_225_204/0.22)_1px,transparent_1.2px)]',

            '[background-size:12px_12px]'
          ].join(' ')}
        />

        {/* GREEN ATMOSPHERE */}

        <div
          aria-hidden="true"
          className={[
            'pointer-events-none',

            'absolute',

            'left-1/2',
            'top-[48%]',

            'h-[720px]',
            'w-[1000px]',

            '-translate-x-1/2',
            '-translate-y-1/2',

            'rounded-full',

            'bg-[#20b2a6]/[0.07]',

            'blur-[170px]'
          ].join(' ')}
        />

        <div className="relative z-10">
          <HomeInspirations />
        </div>
      </div>

      {/* =====================================================
          OFF-WHITE CTA WORLD
          ===================================================== */}

      <HomeCTA />
    </>
  );
}
