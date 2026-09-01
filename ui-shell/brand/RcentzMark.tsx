import type { SVGProps } from 'react';

type RcentzMarkProps = SVGProps<SVGSVGElement> & {
  title?: string;
};

export function RcentzMark({ title = 'Rcentz', className, ...props }: RcentzMarkProps) {
  return (
    <svg
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      role={title ? 'img' : undefined}
      aria-hidden={title ? undefined : true}
      aria-label={title || undefined}
      className={className}
      {...props}>
      {title ? <title>{title}</title> : null}

      {/* Foundation / spine */}
      <path d="M16 54V10" stroke="currentColor" strokeWidth="6" strokeLinecap="round" />

      {/* Upper system arc */}
      <path
        d="M17 10H33.5C43.8 10 50 15.8 50 24.5"
        stroke="currentColor"
        strokeWidth="6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Data interruption / node */}
      <circle cx="50" cy="29" r="2.4" fill="currentColor" />

      {/* Lower system arc */}
      <path
        d="M49.4 33.5C47.5 39 42.2 42 34 42H17"
        stroke="currentColor"
        strokeWidth="6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Forward leg */}
      <path
        d="M33.5 42L50.5 54"
        stroke="currentColor"
        strokeWidth="6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
