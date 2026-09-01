import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';

import './globals.css';

import { RcentzShell } from '@/ui-shell/RcentzShell';
import { RcentzThemeProvider } from '@/ui-shell/theme/RcentzThemeProvider';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin']
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin']
});

const themeScript = `
(function () {
  try {
    var stored = localStorage.getItem('rcentz-theme');

    var preference =
      stored === 'light' || stored === 'dark'
        ? stored
        : 'system';

    var resolved =
      preference === 'system'
        ? (
            window.matchMedia('(prefers-color-scheme: dark)').matches
              ? 'dark'
              : 'light'
          )
        : preference;

    var root = document.documentElement;

    root.dataset.theme = resolved;
    root.style.colorScheme = resolved;
  } catch {}
})();
`;

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
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: themeScript
          }}
        />
      </head>

      <body className="min-h-full bg-background text-foreground">
        <RcentzThemeProvider>
          <RcentzShell>{children}</RcentzShell>
        </RcentzThemeProvider>
      </body>
    </html>
  );
}
