import type { CSSProperties, ReactNode } from 'react';

import { RcentzAce } from '@/ui-shell/layers/RcentzAce';
import { RcentzDataField } from '@/ui-shell/layers/RcentzDataField';

type RcentzShellProps = {
  children: ReactNode;
  style?: CSSProperties;
};

export function RcentzShell({ children, style }: RcentzShellProps) {
  return (
    <div className="relative isolate min-h-screen overflow-hidden bg-background" style={style}>
      <RcentzDataField />
      <RcentzAce />

      <div className="relative z-10 min-h-screen">{children}</div>
    </div>
  );
}
