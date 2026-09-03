import { CheckCircle2 } from 'lucide-react';

import type { PublicPortfolioProject } from '@/features/portfolio/server/get-portfolio-project';

type ProjectOutcomeProps = {
  project: PublicPortfolioProject;
};

export function ProjectOutcome({ project }: ProjectOutcomeProps) {
  if (!project.outcome) {
    return null;
  }

  return (
    <section
      className={[
        'relative',

        'mt-20',

        'overflow-hidden',

        'rounded-[30px]',

        'border',
        'border-theme-accent/15',

        'bg-[#071513]',

        'p-6',

        'text-white',

        'sm:p-8',
        'lg:p-10'
      ].join(' ')}>
      <div
        aria-hidden="true"
        className={[
          'pointer-events-none',

          'absolute',
          'inset-0',

          'opacity-55',

          'bg-[linear-gradient(to_right,rgb(106_243_219/0.07)_1px,transparent_1px),linear-gradient(to_bottom,rgb(106_243_219/0.07)_1px,transparent_1px)]',

          '[background-size:108px_108px]'
        ].join(' ')}
      />

      <div
        aria-hidden="true"
        className={[
          'pointer-events-none',

          'absolute',

          'right-[-120px]',
          'top-[-120px]',

          'size-[360px]',

          'rounded-full',

          'bg-[#20b2a6]/15',

          'blur-[120px]'
        ].join(' ')}
      />

      <div className="relative z-10 grid gap-8 lg:grid-cols-[220px_1fr] lg:gap-16">
        <div>
          <span
            className={[
              'flex',
              'size-11',

              'items-center',
              'justify-center',

              'rounded-full',

              'border',
              'border-[#6af3db]/25',

              'bg-[#6af3db]/10',

              'text-[#6af3db]'
            ].join(' ')}>
            <CheckCircle2 aria-hidden="true" className="size-5" />
          </span>

          <p className="mt-5 font-mono text-[9px] uppercase tracking-[0.2em] text-[#6af3db]">Outcome</p>
        </div>

        <p
          className={[
            'max-w-4xl',

            'text-xl',
            'font-medium',

            'leading-9',

            'tracking-[-0.035em]',

            'text-white/82',

            'sm:text-2xl',
            'sm:leading-10'
          ].join(' ')}>
          {project.outcome}
        </p>
      </div>
    </section>
  );
}
