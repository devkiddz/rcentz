import type { ReactNode } from 'react';

type PortfolioCaseStudyGridProps = {
  children: ReactNode;
  className?: string;
};

export function PortfolioCaseStudyGrid({ children, className }: PortfolioCaseStudyGridProps) {
  return (
    <div
      className={['grid', 'grid-cols-1', 'gap-4', 'sm:gap-5', 'lg:grid-cols-12', className ?? ''].join(' ')}>
      {children}
    </div>
  );
}
