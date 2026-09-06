'use client';

import { useState } from 'react';

import { useRouter, useSearchParams } from 'next/navigation';

import { Eye, EyeOff, LoaderCircle, LockKeyhole, Mail, ShieldCheck } from 'lucide-react';

import { useTranslations } from 'next-intl';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

import { authClient } from '@/lib/auth-client';

export function AdminLoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const t = useTranslations('AdminLogin');

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isPending, setIsPending] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setError(null);
    setIsPending(true);

    const result = await authClient.signIn.email({
      email,
      password
    });

    if (result.error) {
      setError(t('errors.invalid'));
      setIsPending(false);
      return;
    }

    const next = searchParams.get('next');

    router.push(next?.startsWith('/') ? next : '/admin');

    router.refresh();
  }

  return (
    <div className="relative overflow-hidden rounded-[30px] border border-border bg-background/75 p-1 shadow-2xl shadow-black/10 backdrop-blur-xl">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-10 top-0 h-px bg-gradient-to-r from-transparent via-theme-accent/70 to-transparent"
      />

      <form onSubmit={handleSubmit} className="relative rounded-[26px] bg-background/80 p-6 sm:p-7">
        <div className="mb-7 flex items-start justify-between gap-4">
          <div>
            <div className="mb-3 flex size-10 items-center justify-center rounded-2xl border border-theme-accent/20 bg-theme-accent/10 text-theme-accent">
              <ShieldCheck aria-hidden="true" className="size-4.5" />
            </div>

            <h2 className="text-xl font-semibold tracking-[-0.035em] text-foreground">{t('form.title')}</h2>

            <p className="mt-2 text-sm leading-6 text-muted">{t('form.description')}</p>
          </div>

          <span className="mt-1 size-2 rounded-full bg-theme-accent shadow-[0_0_16px_rgba(32,178,166,0.8)]" />
        </div>

        <div className="space-y-5">
          <div>
            <label htmlFor="admin-email" className="mb-2 block text-xs font-medium text-foreground">
              {t('form.email')}
            </label>

            <div className="relative">
              <Mail
                aria-hidden="true"
                className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted"
              />

              <Input
                id="admin-email"
                name="email"
                type="email"
                autoComplete="username"
                value={email}
                onChange={event => setEmail(event.target.value)}
                placeholder={t('form.emailPlaceholder')}
                className="h-11 pl-9"
                disabled={isPending}
                required
              />
            </div>
          </div>

          <div>
            <label htmlFor="admin-password" className="mb-2 block text-xs font-medium text-foreground">
              {t('form.password')}
            </label>

            <div className="relative">
              <LockKeyhole
                aria-hidden="true"
                className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted"
              />

              <Input
                id="admin-password"
                name="password"
                type={showPassword ? 'text' : 'password'}
                autoComplete="current-password"
                value={password}
                onChange={event => setPassword(event.target.value)}
                placeholder={t('form.passwordPlaceholder')}
                className="h-11 px-9"
                disabled={isPending}
                required
              />

              <button
                type="button"
                onClick={() => setShowPassword(value => !value)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted transition-colors hover:text-foreground"
                aria-label={showPassword ? t('form.hidePassword') : t('form.showPassword')}>
                {showPassword ? (
                  <EyeOff aria-hidden="true" className="size-4" />
                ) : (
                  <Eye aria-hidden="true" className="size-4" />
                )}
              </button>
            </div>
          </div>

          {error ? (
            <div
              role="alert"
              className="rounded-2xl border border-destructive/20 bg-destructive/5 px-4 py-3 text-sm text-destructive">
              {error}
            </div>
          ) : null}

          <Button type="submit" disabled={isPending} className="h-11 w-full">
            {isPending ? (
              <>
                <LoaderCircle aria-hidden="true" className="size-4 animate-spin" />

                {t('form.signingIn')}
              </>
            ) : (
              <>
                <ShieldCheck aria-hidden="true" className="size-4" />

                {t('form.signIn')}
              </>
            )}
          </Button>
        </div>
      </form>
    </div>
  );
}
