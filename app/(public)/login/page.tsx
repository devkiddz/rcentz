import { getTranslations } from 'next-intl/server';

import { LoginForm } from '@/features/auth/components/LoginForm';

export default async function LoginPage() {
  const t = await getTranslations('AuthLogin');

  return (
    <main className="flex min-h-[calc(100vh-8rem)] items-center justify-center px-4 py-12 sm:px-6">
      <section className="w-full max-w-md">
        <div className="mb-8 text-center">
          <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-theme-accent">
            {t('eyebrow')}
          </p>

          <h1 className="mt-4 text-3xl font-semibold tracking-[-0.045em] text-foreground sm:text-4xl">
            {t('title')}
          </h1>

          <p className="mt-3 text-sm leading-6 text-muted">{t('description')}</p>
        </div>

        <LoginForm />
      </section>
    </main>
  );
}
