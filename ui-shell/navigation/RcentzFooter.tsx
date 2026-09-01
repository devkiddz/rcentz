import Link from 'next/link';
import { Smartphone } from 'lucide-react';

import { BrandStrip } from '../brand/companies/BrandStrip';
import { RcentzLogo } from '../brand/RcentzLogo';

const footerNavigation = [
  {
    title: 'Company',
    links: [
      { label: 'About', href: '/about' },
      { label: 'Work', href: '/portfolio' },
      { label: 'Services', href: '/services' }
    ]
  },
  {
    title: 'Platform',
    links: [
      { label: 'Client Login', href: '/login' },
      { label: 'Start a Project', href: '/services' }
    ]
  }
];

export function RcentzFooter() {
  return (
    <footer className="relative z-20 border-t border-border/70 bg-background">
      <div className="rcentz-section py-10 md:py-12">
        <div className="grid gap-10 md:grid-cols-[1fr_auto] md:gap-16">
          <div className="max-w-md">
            <Link href="/" aria-label="Rcentz Systems home" className="inline-flex items-center gap-2.5">
              <RcentzLogo />

              <span className="text-sm font-semibold tracking-[-0.025em]">Rcentz Systems</span>
            </Link>

            <p className="mt-3 max-w-xs text-sm leading-6 text-muted">
              Building and operating modern software, digital products and business systems.
            </p>

            <div className="mt-5">
              <BrandStrip title="Infrastructure" brands={['github', 'vercel']} />
            </div>

            <div className="mt-5">
              <div
                className={[
                  'inline-flex items-center gap-3 rounded-2xl',
                  'border border-foreground/[0.07]',
                  'bg-foreground/[0.025]',
                  'px-3 py-2.5',
                  'backdrop-blur-sm'
                ].join(' ')}>
                <span className="flex size-8 shrink-0 items-center justify-center rounded-xl bg-foreground text-background">
                  <Smartphone aria-hidden="true" className="size-4" />
                </span>

                <span className="flex flex-col">
                  <span className="font-mono text-[9px] uppercase tracking-[0.16em] text-muted">
                    Mobile apps
                  </span>

                  <span className="mt-0.5 text-[12px] font-medium text-foreground">Coming soon</span>
                </span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-10 sm:gap-14">
            {footerNavigation.map(group => (
              <div key={group.title}>
                <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted">{group.title}</p>

                <div className="mt-3 flex flex-col gap-2.5">
                  {group.links.map(link => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className="w-fit text-[13px] text-muted transition-colors duration-200 hover:text-foreground">
                      {link.label}
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-3 border-t border-border/70 pt-4 text-[11px] text-muted sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} Rcentz Systems.</p>

          <p className="font-mono tracking-[-0.01em]">Systems built from real data outward.</p>
        </div>
      </div>
    </footer>
  );
}
