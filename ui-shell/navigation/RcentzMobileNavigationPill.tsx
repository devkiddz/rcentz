'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { FolderKanban, House, LayoutDashboard, MessageCircle } from 'lucide-react';

import { authClient } from '@/lib/auth-client';

type MobileNavigationItem = {
  label: string;
  href: string;
  icon: typeof House;
  activeRoutes: string[];
  exact?: boolean;
};

function isRouteActive({
  pathname,
  activeRoutes,
  exact = false
}: {
  pathname: string;
  activeRoutes: string[];
  exact?: boolean;
}) {
  return activeRoutes.some(route => {
    if (exact) {
      return pathname === route;
    }

    if (route === '/') {
      return pathname === '/';
    }

    return pathname === route || pathname.startsWith(`${route}/`);
  });
}

export function RcentzMobileNavigationPill() {
  const pathname = usePathname();

  const { data: session } = authClient.useSession();

  const authenticated = Boolean(session?.user);

  const navigationItems: MobileNavigationItem[] = [
    {
      label: 'Home',
      href: '/',
      icon: House,
      activeRoutes: ['/'],
      exact: true
    },
    {
      label: 'Projects',
      href: authenticated ? '/dashboard/projects' : '/services',
      icon: FolderKanban,
      activeRoutes: ['/dashboard/projects']
    },
    {
      label: 'Messages',
      href: authenticated ? '/dashboard/messages' : '/login?next=/dashboard/messages',
      icon: MessageCircle,
      activeRoutes: ['/dashboard/messages']
    },
    {
      label: 'Dashboard',
      href: authenticated ? '/dashboard' : '/login?next=/dashboard',
      icon: LayoutDashboard,
      activeRoutes: ['/dashboard'],
      exact: true
    }
  ];

  return (
    <nav
      aria-label="Primary mobile navigation"
      className="
        fixed
        bottom-[max(0.75rem,env(safe-area-inset-bottom))]
        left-1/2
        z-50
        w-[calc(100%-1.5rem)]
        max-w-[25rem]
        -translate-x-1/2
        md:hidden
      ">
      <div
        className="
          grid
          grid-cols-4
          items-center
          rounded-[22px]
          border
          border-border/80
          bg-background/90
          p-1.5
          shadow-[0_16px_48px_rgb(0_0_0/0.14)]
          backdrop-blur-2xl
          dark:shadow-[0_16px_48px_rgb(0_0_0/0.48)]
        ">
        {navigationItems.map(item => {
          const Icon = item.icon;

          const active = isRouteActive({
            pathname,
            activeRoutes: item.activeRoutes,
            exact: item.exact
          });

          return (
            <Link
              key={item.label}
              href={item.href}
              aria-current={active ? 'page' : undefined}
              className={[
                'group',
                'relative',
                'flex',
                'min-w-0',
                'flex-col',
                'items-center',
                'justify-center',
                'gap-1',
                'rounded-[16px]',
                'px-1',
                'py-2',
                'text-center',
                'transition-[background-color,color,transform]',
                'duration-200',
                'active:scale-[0.96]',
                active
                  ? 'bg-surface-muted text-foreground'
                  : 'text-muted hover:bg-surface-muted/60 hover:text-foreground'
              ].join(' ')}>
              <span
                className={[
                  'relative',
                  'flex',
                  'size-6',
                  'items-center',
                  'justify-center',
                  active ? 'text-theme-accent' : 'text-current'
                ].join(' ')}>
                <Icon aria-hidden="true" className="size-[15px]" />

                {active ? (
                  <span
                    aria-hidden="true"
                    className="
                      absolute
                      -bottom-1
                      size-1
                      rounded-full
                      bg-theme-accent
                    "
                  />
                ) : null}
              </span>

              <span className="truncate text-[9px] font-medium">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
