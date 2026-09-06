'use client';

import { useRouter } from 'next/navigation';

import { ArrowUpRight, LoaderCircle } from 'lucide-react';

import { useTranslations } from 'next-intl';

import { authClient } from '@/lib/auth-client';

type RcentzStartProjectActionProps = {
  mobile?: boolean;
  compact?: boolean;
  onNavigate?: () => void;
};

export function RcentzStartProjectAction({
  mobile = false,
  compact = false,
  onNavigate
}: RcentzStartProjectActionProps) {
  const router = useRouter();

  const t = useTranslations('Header');

  const { data: session, isPending } = authClient.useSession();

  function handleStartProject() {
    onNavigate?.();

    if (!session?.user) {
      router.push('/login?next=/services');
      return;
    }

    router.push('/services');
  }

  return (
    <button
      type="button"
      onClick={handleStartProject}
      disabled={isPending}
      className={[
        'group inline-flex items-center justify-center gap-2',
        'rounded-full',
        'border border-theme-accent',
        'bg-theme-accent',
        'font-semibold text-black',
        'shadow-[0_8px_24px_rgba(32,178,166,0.18)]',
        'transition-[transform,box-shadow,opacity,padding,font-size]',
        'duration-300',
        'hover:-translate-y-px',
        'hover:shadow-[0_12px_30px_rgba(32,178,166,0.28)]',
        'active:translate-y-0',
        'active:scale-[0.98]',
        'disabled:pointer-events-none',
        'disabled:opacity-60',
        mobile ? 'h-10 w-full px-4 text-xs' : compact ? 'h-8 px-3.5 text-xs' : 'h-9 px-4 text-[13px]'
      ].join(' ')}>
      {isPending ? (
        <LoaderCircle aria-hidden="true" className="size-3.5 animate-spin" />
      ) : (
        <>
          <span>{t('startProject')}</span>

          <ArrowUpRight
            aria-hidden="true"
            className="size-3.5 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
          />
        </>
      )}
    </button>
  );
}
