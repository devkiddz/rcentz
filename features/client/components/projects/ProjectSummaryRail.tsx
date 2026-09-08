import type { ReactNode } from 'react';

type ProjectSummaryRailProps = {
  children: ReactNode;
  className?: string;
};

export function ProjectSummaryRail({ children, className = '' }: ProjectSummaryRailProps) {
  return (
    <div
      className={[
        'flex snap-x snap-mandatory gap-3 overflow-x-auto px-5 py-4',
        '[scrollbar-width:none] [&::-webkit-scrollbar]:hidden',
        '[&>*]:min-w-[78%] [&>*]:snap-start',
        'sm:[&>*]:min-w-[44%]',
        'md:grid md:grid-cols-2 md:gap-0 md:overflow-visible md:px-0 md:py-0',
        'md:[&>*]:min-w-0 md:[&>*]:snap-none',
        className
      ].join(' ')}>
      {children}
    </div>
  );
}
