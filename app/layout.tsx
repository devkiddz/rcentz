import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';

import './globals.css';

import { ThemeProvider } from '@/components/theme-provider';
import { RcentzShell } from '@/ui-shell/RcentzShell';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin']
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin']
});

export const metadata: Metadata = {
  title: {
    default: 'Rcentz Systems',
    template: '%s | Rcentz Systems'
  },
  description: 'Rcentz Systems builds and operates modern software, digital products, and client systems.'
};

export default function RootLayout({ children }: LayoutProps<'/'>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}>
      <body className="min-h-full bg-background text-foreground">
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
          themes={['light', 'dark']}
          storageKey="rcentz-theme"
          disableTransitionOnChange>
          <RcentzShell>{children}</RcentzShell>
        </ThemeProvider>
      </body>
    </html>
  );
}
