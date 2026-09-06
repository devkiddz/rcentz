'use client';

import { useState } from 'react';

import { useRouter, useSearchParams } from 'next/navigation';

import { LoaderCircle, LockKeyhole, Mail } from 'lucide-react';

import { useTranslations } from 'next-intl';

import { authClient } from '@/lib/auth-client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const t = useTranslations('AuthLogin');

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
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

    if (next?.startsWith('/')) {
      router.push(next);
      router.refresh();
      return;
    }

    router.push('/dashboard');
    router.refresh();
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-[28px] border border-border bg-background/70 p-6 shadow-sm sm:p-7">
      <div className="space-y-5">
        <div>
          <label htmlFor="email" className="mb-2 block text-sm font-medium text-foreground">
            {t('fields.email')}
          </label>

          <div className="relative">
            <Mail aria-hidden="true" className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted" />

            <Input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              value={email}
              onChange={event => setEmail(event.target.value)}
              placeholder={t('placeholders.email')}
              className="pl-9"
              required
              disabled={isPending}
            />
          </div>
        </div>

        <div>
          <label htmlFor="password" className="mb-2 block text-sm font-medium text-foreground">
            {t('fields.password')}
          </label>

          <div className="relative">
            <LockKeyhole
              aria-hidden="true"
              className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted"
            />

            <Input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              value={password}
              onChange={event => setPassword(event.target.value)}
              placeholder={t('placeholders.password')}
              className="pl-9"
              required
              disabled={isPending}
            />
          </div>
        </div>

        {error ? (
          <p
            role="alert"
            className="rounded-xl border border-destructive/20 bg-destructive/5 px-3 py-2 text-sm text-destructive">
            {error}
          </p>
        ) : null}

        <Button type="submit" className="w-full" disabled={isPending}>
          {isPending ? (
            <>
              <LoaderCircle aria-hidden="true" className="size-4 animate-spin" />
              {t('actions.signingIn')}
            </>
          ) : (
            t('actions.signIn')
          )}
        </Button>
      </div>
    </form>
  );
}
