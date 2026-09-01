import type { CSSProperties, ReactNode } from 'react';

import { RcentzAce } from '@/ui-shell/layers/RcentzAce';
import { RcentzDataField } from '@/ui-shell/layers/RcentzDataField';
import { RcentzContentFrame } from '@/ui-shell/layout/RcentzContentFrame';
import { RcentzFooter } from '@/ui-shell/navigation/RcentzFooter';
import { RcentzHeader } from '@/ui-shell/navigation/RcentzHeader';

type RcentzShellProps = {
  children: ReactNode;
  style?: CSSProperties;
};

export function RcentzShell({ children, style }: RcentzShellProps) {
  return (
    <div className="relative isolate min-h-screen overflow-x-hidden bg-background" style={style}>
      <RcentzDataField />
      <RcentzAce />

      <div className="relative z-10 flex min-h-screen flex-col">
        <RcentzHeader />

        <RcentzContentFrame>{children}</RcentzContentFrame>

        <RcentzFooter />
      </div>
    </div>
  );
}
