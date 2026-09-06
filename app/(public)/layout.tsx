import type { ReactNode } from 'react';

import { RcentzShell } from '@/ui-shell/RcentzShell';

type PublicLayoutProps = {
  children: ReactNode;
};

export default function PublicLayout({ children }: PublicLayoutProps) {
  return <RcentzShell>{children}</RcentzShell>;
}
