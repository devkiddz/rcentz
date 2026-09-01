import type { ReactNode } from 'react';

type RcentzContentFrameProps = {
  children: ReactNode;
};

export function RcentzContentFrame({ children }: RcentzContentFrameProps) {
  return <div className="rcentz-section w-full flex-1">{children}</div>;
}
