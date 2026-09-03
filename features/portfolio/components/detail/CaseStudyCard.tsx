import type { ReactNode } from 'react';

type CaseStudyCardProps = {
  children: ReactNode;
  className?: string;
  variant?: 'default' | 'muted' | 'accent' | 'dark';
};

export function CaseStudyCard({ children, className, variant = 'default' }: CaseStudyCardProps) {
  const variants = {
    default: ['border-border', 'bg-background/72'],

    muted: ['border-border', 'bg-surface-muted/45'],

    accent: ['border-theme-accent/20', 'bg-theme-accent-faint'],

    dark: ['border-border', 'bg-foreground', 'text-background']
  };

  return (
    <article
      className={[
        'relative',

        'overflow-hidden',

        'rounded-[28px]',

        'border',

        'backdrop-blur-xl',

        'transition-[border-color,background-color,transform]',

        'duration-300',

        'hover:-translate-y-px',
        'hover:border-border-strong',

        ...variants[variant],

        className ?? ''
      ].join(' ')}>
      {children}
    </article>
  );
}
