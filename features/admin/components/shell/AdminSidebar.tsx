'use client';

import Link from 'next/link';

import { usePathname } from 'next/navigation';

import {
  BarChart3,
  Bell,
  BriefcaseBusiness,
  FolderKanban,
  LayoutDashboard,
  ListTodo,
  MessageSquareText,
  Settings,
  UsersRound,
  WalletCards,
  Wrench
} from 'lucide-react';

import { useTranslations } from 'next-intl';

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail
} from '@/components/ui/sidebar';

import { RcentzLogo } from '@/ui-shell/brand/RcentzLogo';

type AdminNavigationItem = {
  key: string;
  label: string;
  href: string;
  icon: typeof LayoutDashboard;
};

const workspaceNavigation = [
  {
    key: 'overview',
    label: 'Overview',
    href: '/admin',
    icon: LayoutDashboard
  },
  {
    key: 'analysis',
    label: 'Analysis',
    href: '/admin/analysis',
    icon: BarChart3
  },
  {
    key: 'requests',
    label: 'Service Requests',
    href: '/admin/requests',
    icon: BriefcaseBusiness
  },
  {
    key: 'projects',
    label: 'Projects',
    href: '/admin/projects',
    icon: FolderKanban
  },
  {
    key: 'tasks',
    label: 'Tasks',
    href: '/admin/tasks',
    icon: ListTodo
  },
  {
    key: 'clients',
    label: 'Clients',
    href: '/admin/clients',
    icon: UsersRound
  }
] satisfies AdminNavigationItem[];

const operationsNavigation = [
  {
    key: 'messages',
    label: 'Messages',
    href: '/admin/messages',
    icon: MessageSquareText
  },
  {
    key: 'notifications',
    label: 'Notifications',
    href: '/admin/notifications',
    icon: Bell
  },
  {
    key: 'finance',
    label: 'Finance',
    href: '/admin/finance',
    icon: WalletCards
  }
] satisfies AdminNavigationItem[];

const managementNavigation = [
  {
    key: 'services',
    label: 'Services',
    href: '/admin/services',
    icon: Wrench
  },
  {
    key: 'settings',
    label: 'Settings',
    href: '/admin/settings',
    icon: Settings
  }
] satisfies AdminNavigationItem[];

function isActiveRoute(pathname: string, href: string) {
  if (href === '/admin') {
    return pathname === '/admin';
  }

  return pathname === href || pathname.startsWith(`${href}/`);
}

function AdminNavigationGroup({
  label,
  items,
  pathname
}: {
  label: string;
  items: AdminNavigationItem[];
  pathname: string;
}) {
  return (
    <SidebarGroup>
      <SidebarGroupLabel>{label}</SidebarGroupLabel>

      <SidebarGroupContent>
        <SidebarMenu>
          {items.map(item => {
            const Icon = item.icon;

            const isActive = isActiveRoute(pathname, item.href);

            return (
              <SidebarMenuItem key={item.href}>
                <SidebarMenuButton
                  isActive={isActive}
                  tooltip={item.label}
                  render={<Link href={item.href} aria-current={isActive ? 'page' : undefined} />}
                  className={`
                    group/nav-item
                    relative
                    transition-colors
                    duration-150

                    ${
                      isActive
                        ? `
                          bg-theme-accent-faint
                          text-theme-accent
                          hover:bg-theme-accent-soft
                          hover:text-theme-accent
                        `
                        : `
                          text-sidebar-foreground/70
                          hover:bg-surface-muted
                          hover:text-sidebar-foreground
                        `
                    }
                  `}>
                  {isActive ? (
                    <span
                      aria-hidden="true"
                      className="
                        absolute
                        left-0
                        top-1/2
                        h-5
                        w-[2px]
                        -translate-y-1/2
                        rounded-full
                        bg-theme-accent
                      "
                    />
                  ) : null}

                  <Icon
                    aria-hidden="true"
                    className={
                      isActive
                        ? 'text-theme-accent'
                        : 'text-sidebar-foreground/55 transition-colors group-hover/nav-item:text-sidebar-foreground'
                    }
                  />

                  <span className={isActive ? 'font-semibold text-theme-accent' : 'font-medium'}>
                    {item.label}
                  </span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            );
          })}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}

export function AdminSidebar() {
  const pathname = usePathname();

  const t = useTranslations('AdminNavigation');

  return (
    <Sidebar collapsible="icon" variant="sidebar" className="border-r border-sidebar-border">
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              size="lg"
              tooltip={t('workspace')}
              render={<Link href="/admin" />}
              className="
                transition-colors
                duration-150
                hover:bg-surface-muted
              ">
              <div className="flex size-8 shrink-0 items-center justify-center">
                <RcentzLogo compact />
              </div>

              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-semibold tracking-[-0.02em]">Rcentz Systems</span>

                <span className="truncate text-[11px] text-sidebar-foreground/60">{t('workspace')}</span>
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent>
        <AdminNavigationGroup label="Workspace" items={workspaceNavigation} pathname={pathname} />

        <AdminNavigationGroup label="Operations" items={operationsNavigation} pathname={pathname} />

        <AdminNavigationGroup label="Management" items={managementNavigation} pathname={pathname} />
      </SidebarContent>

      <SidebarFooter>
        <div className="px-2 py-1 text-[10px] leading-4 text-sidebar-foreground/50 group-data-[collapsible=icon]:hidden">
          {t('protected')}
        </div>
      </SidebarFooter>

      <SidebarRail />
    </Sidebar>
  );
}
