'use client';

import { useMemo, useState } from 'react';

import { useRouter } from 'next/navigation';

import { LayoutDashboard, LoaderCircle, LogOut, UserRound } from 'lucide-react';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';

import { authClient } from '@/lib/auth-client';

type RcentzAuthActionsProps = {
  mobile?: boolean;
  onNavigate?: () => void;
};

function getInitials(name: string) {
  const initials = name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map(namePart => namePart.charAt(0).toUpperCase())
    .join('');

  return initials || 'R';
}

export function RcentzAuthActions({ mobile = false, onNavigate }: RcentzAuthActionsProps) {
  const router = useRouter();

  const { data: session, isPending } = authClient.useSession();

  const [isSigningOut, setIsSigningOut] = useState(false);

  const user = session?.user;

  const initials = useMemo(() => getInitials(user?.name ?? 'Rcentz User'), [user?.name]);

  if (isPending) {
    return (
      <div
        aria-label="Checking account"
        className={['flex items-center', mobile ? 'h-11 w-full px-3' : 'h-9 justify-center px-2'].join(' ')}>
        <LoaderCircle aria-hidden="true" className="size-3.5 animate-spin text-muted" />
      </div>
    );
  }

  if (!user) {
    return (
      <button
        type="button"
        onClick={() => {
          onNavigate?.();
          router.push('/login');
        }}
        className={[
          'inline-flex items-center justify-center',
          'rounded-full',
          'border border-transparent',
          'font-medium text-muted',
          'transition-[color,background-color,border-color]',
          'duration-200',
          'hover:border-border',
          'hover:bg-surface-muted',
          'hover:text-foreground',
          mobile ? 'h-10 w-full px-3 text-[13px]' : 'h-9 px-3 text-[12px]'
        ].join(' ')}>
        Sign in
      </button>
    );
  }

  async function handleSignOut() {
    if (isSigningOut) {
      return;
    }

    setIsSigningOut(true);

    await authClient.signOut();

    onNavigate?.();

    router.push('/');
    router.refresh();
  }

  function handleDashboard() {
    onNavigate?.();

    router.push('/dashboard');
  }

  function handleProfile() {
    onNavigate?.();

    router.push('/dashboard/profile');
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={
          <button
            type="button"
            className={[
              'flex min-w-0 items-center',
              'rounded-full',
              'border border-border/70',
              'bg-background/45',
              'backdrop-blur-xl',
              'transition-[background-color,border-color]',
              'hover:border-border-strong',
              'hover:bg-surface-muted',
              mobile ? 'h-11 w-full gap-3 px-3' : 'h-9 gap-2 px-2'
            ].join(' ')}
            aria-label="Account menu"
          />
        }>
        <Avatar size={mobile ? 'default' : 'sm'}>
          {user.image ? <AvatarImage src={user.image} alt="" /> : null}

          <AvatarFallback>{initials}</AvatarFallback>
        </Avatar>

        <div className={['min-w-0 text-left', mobile ? 'block flex-1' : 'hidden lg:block'].join(' ')}>
          <p className="max-w-32 truncate text-[11px] font-semibold leading-4 text-foreground">{user.name}</p>

          <p className="max-w-36 truncate text-[9px] leading-3 text-muted">{user.email}</p>
        </div>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" sideOffset={8} className="w-64">
        <DropdownMenuGroup>
          <DropdownMenuLabel className="px-2 py-2">
            <div className="flex items-center gap-3">
              <Avatar>
                {user.image ? <AvatarImage src={user.image} alt="" /> : null}

                <AvatarFallback>{initials}</AvatarFallback>
              </Avatar>

              <div className="min-w-0">
                <p className="truncate text-sm font-semibold text-foreground">{user.name}</p>

                <p className="mt-0.5 truncate text-[11px] font-normal text-muted">{user.email}</p>
              </div>
            </div>
          </DropdownMenuLabel>
        </DropdownMenuGroup>

        <DropdownMenuSeparator />

        <DropdownMenuGroup>
          <DropdownMenuItem className="px-2 py-2" onClick={handleDashboard}>
            <LayoutDashboard aria-hidden="true" />

            <span>Dashboard</span>
          </DropdownMenuItem>

          <DropdownMenuItem className="px-2 py-2" onClick={handleProfile}>
            <UserRound aria-hidden="true" />

            <span>Profile</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>

        <DropdownMenuSeparator />

        <DropdownMenuItem
          variant="destructive"
          className="px-2 py-2"
          disabled={isSigningOut}
          onClick={handleSignOut}>
          {isSigningOut ? (
            <LoaderCircle aria-hidden="true" className="animate-spin" />
          ) : (
            <LogOut aria-hidden="true" />
          )}

          <span>{isSigningOut ? 'Signing out...' : 'Sign out'}</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
