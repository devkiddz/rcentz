import Link from 'next/link';

import { ArrowLeft, BadgeCheck, LockKeyhole, ShieldCheck, Sparkles } from 'lucide-react';

import { getTranslations } from 'next-intl/server';

import { AdminLoginForm } from '@/features/auth/components/AdminLoginForm';

export default async function AdminLoginPage() {
  const t = await getTranslations('AdminLogin');

  return (
    <main className="relative min-h-screen overflow-hidden bg-background">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.035)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.035)_1px,transparent_1px)] bg-[size:48px_48px]"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-[-8rem] top-[-8rem] size-[28rem] rounded-full bg-theme-accent/10 blur-[120px]"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-[-12rem] right-[-10rem] size-[32rem] rounded-full bg-theme-accent/10 blur-[140px]"
      />

      <div className="relative grid min-h-screen lg:grid-cols-[1.15fr_0.85fr]">
        <section className="hidden border-r border-border/70 px-10 py-10 lg:flex lg:flex-col lg:justify-between xl:px-16 xl:py-14">
          <div className="flex items-center justify-between gap-6">
            <Link
              href="/"
              className="inline-flex items-center gap-3 text-sm font-semibold tracking-[-0.02em] text-foreground">
              <div className="flex size-9 items-center justify-center rounded-2xl bg-theme-accent font-bold text-black">
                R
              </div>

              <span>{t('system.workspace')}</span>
            </Link>

            <div className="flex items-center gap-2 rounded-full border border-border bg-background/60 px-3 py-1.5 text-[10px] uppercase tracking-[0.15em] text-muted backdrop-blur">
              <span className="size-1.5 rounded-full bg-theme-accent shadow-[0_0_18px_rgba(32,178,166,0.8)]" />
              {t('system.environment')}
            </div>
          </div>

          <div className="max-w-2xl">
            <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-border bg-background/60 px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.16em] text-theme-accent backdrop-blur">
              <ShieldCheck aria-hidden="true" className="size-3.5" />
              {t('eyebrow')}
            </div>

            <h1 className="max-w-xl text-5xl font-semibold tracking-[-0.06em] text-foreground xl:text-6xl">
              {t('title')}
            </h1>

            <p className="mt-6 max-w-xl text-base leading-8 text-muted">{t('description')}</p>

            <div className="mt-10 grid max-w-xl gap-3">
              <div className="flex items-center gap-3 rounded-2xl border border-border/70 bg-background/50 px-4 py-3 backdrop-blur">
                <div className="flex size-9 items-center justify-center rounded-xl bg-theme-accent/10 text-theme-accent">
                  <LockKeyhole aria-hidden="true" className="size-4" />
                </div>

                <span className="text-sm text-foreground/80">{t('system.status')}</span>
              </div>

              <div className="flex items-center gap-3 rounded-2xl border border-border/70 bg-background/50 px-4 py-3 backdrop-blur">
                <div className="flex size-9 items-center justify-center rounded-xl bg-theme-accent/10 text-theme-accent">
                  <BadgeCheck aria-hidden="true" className="size-4" />
                </div>

                <span className="text-sm text-foreground/80">{t('system.session')}</span>
              </div>

              <div className="flex items-center gap-3 rounded-2xl border border-border/70 bg-background/50 px-4 py-3 backdrop-blur">
                <div className="flex size-9 items-center justify-center rounded-xl bg-theme-accent/10 text-theme-accent">
                  <Sparkles aria-hidden="true" className="size-4" />
                </div>

                <span className="text-sm text-foreground/80">{t('system.role')}</span>
              </div>
            </div>
          </div>

          <div className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted">
            Rcentz Systems · Secure Operations
          </div>
        </section>

        <section className="flex min-h-screen items-center justify-center px-4 py-10 sm:px-6 lg:px-10 xl:px-16">
          <div className="w-full max-w-md">
            <div className="mb-8 flex items-center justify-between gap-4 lg:hidden">
              <Link href="/" className="inline-flex items-center gap-3 text-sm font-semibold text-foreground">
                <div className="flex size-9 items-center justify-center rounded-2xl bg-theme-accent font-bold text-black">
                  R
                </div>

                <span>{t('system.workspace')}</span>
              </Link>

              <div className="size-2 rounded-full bg-theme-accent shadow-[0_0_18px_rgba(32,178,166,0.8)]" />
            </div>

            <div className="mb-7 lg:hidden">
              <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-theme-accent">
                {t('eyebrow')}
              </p>

              <h1 className="mt-4 text-3xl font-semibold tracking-[-0.05em] text-foreground">{t('title')}</h1>

              <p className="mt-3 text-sm leading-6 text-muted">{t('description')}</p>
            </div>

            <AdminLoginForm />

            <Link
              href="/"
              className="mx-auto mt-6 flex w-fit items-center gap-2 text-xs text-muted transition-colors hover:text-foreground">
              <ArrowLeft aria-hidden="true" className="size-3.5" />

              {t('form.backHome')}
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}
