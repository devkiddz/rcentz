'use client';

import Link from 'next/link';

import { usePathname } from 'next/navigation';

import {
  BarChart3,
  Bell,
  BriefcaseBusiness,
  CreditCard,
  FileText,
  FolderKanban,
  LayoutDashboard,
  ListTodo,
  MessageSquareText,
  MessagesSquare,
  ReceiptText,
  Settings,
  ShieldCheck,
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
  SidebarRail,
  useSidebar
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
    key: 'analytics',
    label: 'Analytics',
    href: '/admin/analytics',
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

const communicationNavigation = [
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
    key: 'feedback',
    label: 'Feedback',
    href: '/admin/feedback',
    icon: MessagesSquare
  }
] satisfies AdminNavigationItem[];

const financeNavigation = [
  {
    key: 'finance',
    label: 'Finance',
    href: '/admin/finance',
    icon: WalletCards
  },
  {
    key: 'transactions',
    label: 'Transactions',
    href: '/admin/transactions',
    icon: ReceiptText
  },
  {
    key: 'invoices',
    label: 'Invoices',
    href: '/admin/invoices',
    icon: FileText
  },
  {
    key: 'subscriptions',
    label: 'Subscriptions',
    href: '/admin/subscriptions',
    icon: CreditCard
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

type AdminNavigationGroupProps = {
  label: string;

  items: AdminNavigationItem[];

  pathname: string;

  onNavigate: () => void;
};

function AdminNavigationGroup({ label, items, pathname, onNavigate }: AdminNavigationGroupProps) {
  return (
    <SidebarGroup>
      <SidebarGroupLabel className="text-sidebar-foreground/60">{label}</SidebarGroupLabel>

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
                  render={
                    <Link
                      href={item.href}
                      onClick={onNavigate}
                      aria-current={isActive ? 'page' : undefined}
                    />
                  }
                  className={[
                    'group/admin-nav',
                    'relative',
                    'transition-colors',
                    'duration-150',

                    isActive
                      ? [
                          'bg-theme-accent-faint',
                          'text-theme-accent',
                          'hover:bg-theme-accent-soft',
                          'hover:text-theme-accent'
                        ].join(' ')
                      : [
                          'text-sidebar-foreground/72',
                          'hover:bg-sidebar-accent',
                          'hover:text-sidebar-foreground'
                        ].join(' ')
                  ].join(' ')}>
                  {isActive ? (
                    <span
                      aria-hidden="true"
                      className="absolute left-0 top-1/2 h-5 w-[2px] -translate-y-1/2 rounded-full bg-theme-accent"
                    />
                  ) : null}

                  <Icon
                    aria-hidden="true"
                    className={
                      isActive
                        ? 'text-theme-accent'
                        : 'text-sidebar-foreground/55 transition-colors group-hover/admin-nav:text-sidebar-foreground'
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

  const { isMobile, setOpenMobile } = useSidebar();

  const t = useTranslations('AdminNavigation');

  function handleNavigate() {
    if (isMobile) {
      setOpenMobile(false);
    }
  }

  return (
    <Sidebar collapsible="icon" variant="sidebar" className="border-r border-sidebar-border bg-sidebar">
      <SidebarHeader className="border-b border-sidebar-border bg-sidebar">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              size="lg"
              tooltip={t('workspace')}
              render={<Link href="/admin" onClick={handleNavigate} />}
              className="transition-colors duration-150 hover:bg-sidebar-accent">
              <div className="flex size-8 shrink-0 items-center justify-center">
                <RcentzLogo compact />
              </div>

              <div className="grid min-w-0 flex-1 text-left text-sm leading-tight">
                <span className="truncate font-semibold tracking-[-0.02em] text-sidebar-foreground">
                  Rcentz Systems
                </span>

                <span className="truncate text-[10px] text-sidebar-foreground/55">Admin workspace</span>
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent className="bg-sidebar">
        <AdminNavigationGroup
          label="Workspace"
          items={workspaceNavigation}
          pathname={pathname}
          onNavigate={handleNavigate}
        />

        <AdminNavigationGroup
          label="Communication"
          items={communicationNavigation}
          pathname={pathname}
          onNavigate={handleNavigate}
        />

        <AdminNavigationGroup
          label="Finance"
          items={financeNavigation}
          pathname={pathname}
          onNavigate={handleNavigate}
        />

        <AdminNavigationGroup
          label="Management"
          items={managementNavigation}
          pathname={pathname}
          onNavigate={handleNavigate}
        />
      </SidebarContent>

      <SidebarFooter className="border-t border-sidebar-border bg-sidebar">
        <div className="mx-2 mb-1 rounded-xl border border-sidebar-border bg-sidebar-accent px-3 py-3 group-data-[collapsible=icon]:hidden">
          <div className="flex items-center gap-2">
            <ShieldCheck aria-hidden="true" className="size-3.5 shrink-0 text-theme-accent" />

            <p className="text-[10px] font-semibold text-sidebar-foreground">Protected administration</p>
          </div>

          <p className="mt-1.5 text-[9px] leading-4 text-sidebar-foreground/55">{t('protected')}</p>
        </div>

        <SidebarRail />
      </SidebarFooter>
    </Sidebar>
  );
}
