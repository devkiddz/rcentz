'use client';

import { Check, ChevronDown, Globe2 } from 'lucide-react';

import { useEffect, useRef, useState, useTransition } from 'react';

import { useLocale, useTranslations } from 'next-intl';

import { useRouter } from 'next/navigation';

import { setLocale } from '@/features/i18n/server/set-locale';

import { supportedLocales, type SupportedLocale } from '@/i18n/config';

type LanguageOption = {
  code: SupportedLocale;
  short: string;
  label: string;
};

const languageMeta: Record<SupportedLocale, Omit<LanguageOption, 'code'>> = {
  en: {
    short: 'EN',
    label: 'English'
  },

  fr: {
    short: 'FR',
    label: 'Français'
  },

  es: {
    short: 'ES',
    label: 'Español'
  },

  de: {
    short: 'DE',
    label: 'Deutsch'
  },

  pt: {
    short: 'PT',
    label: 'Português'
  }
};

const languages: LanguageOption[] = supportedLocales.map(code => ({
  code,
  ...languageMeta[code]
}));

type RcentzLanguageControlProps = {
  mobile?: boolean;
  onNavigate?: () => void;
};

export function RcentzLanguageControl({ mobile = false, onNavigate }: RcentzLanguageControlProps) {
  const router = useRouter();

  const locale = useLocale();

  const t = useTranslations('Header');

  const [open, setOpen] = useState(false);

  const [isPending, startTransition] = useTransition();

  const containerRef = useRef<HTMLDivElement>(null);

  const activeLanguage: SupportedLocale = supportedLocales.includes(locale as SupportedLocale)
    ? (locale as SupportedLocale)
    : 'en';

  useEffect(() => {
    if (mobile) {
      return;
    }

    function handlePointerDown(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setOpen(false);
      }
    }

    document.addEventListener('mousedown', handlePointerDown);

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('mousedown', handlePointerDown);

      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [mobile]);

  function changeLanguage(language: LanguageOption) {
    if (language.code === activeLanguage) {
      setOpen(false);

      return;
    }

    setOpen(false);

    startTransition(async () => {
      await setLocale(language.code);

      router.refresh();

      onNavigate?.();
    });
  }

  const selectedLanguage = languages.find(language => language.code === activeLanguage) ?? languages[0];

  return (
    <div ref={containerRef} className={['relative', mobile ? 'w-full' : ''].join(' ')}>
      <button
        type="button"
        aria-label={t('translateWebsite')}
        aria-expanded={open}
        disabled={isPending}
        onClick={() => {
          setOpen(current => !current);
        }}
        className={[
          'group',

          'flex',
          'items-center',
          'justify-center',

          'border',
          'border-border/55',

          'bg-background/28',

          'text-foreground',

          'backdrop-blur-xl',

          'transition-[background-color,border-color,color,transform,opacity]',

          'duration-300',

          'hover:border-theme-accent/25',

          'hover:bg-theme-accent-soft',

          'active:scale-[0.97]',

          'disabled:pointer-events-none',
          'disabled:opacity-60',

          mobile
            ? ['h-9', 'w-full', 'gap-2', 'rounded-full', 'px-3', 'text-xs'].join(' ')
            : ['h-9', 'gap-1.5', 'rounded-full', 'px-2.5'].join(' ')
        ].join(' ')}>
        <Globe2 aria-hidden="true" className="size-3.5 text-theme-accent" />

        <span
          className={[
            'font-mono',
            'uppercase',
            'tracking-[0.08em]',

            mobile ? 'text-[9px]' : 'text-[8px]'
          ].join(' ')}>
          {mobile ? selectedLanguage.label : selectedLanguage.short}
        </span>

        <ChevronDown
          aria-hidden="true"
          className={[
            'size-3',

            'text-muted',

            'transition-transform',

            'duration-200',

            open ? 'rotate-180' : ''
          ].join(' ')}
        />
      </button>

      {/* =====================================================
          DESKTOP POPOVER
          ===================================================== */}

      {!mobile && open ? (
        <div className="absolute right-0 top-[calc(100%+8px)] z-[80] min-w-[190px] overflow-hidden rounded-[18px] border border-border/75 bg-background/95 p-1.5 shadow-[0_18px_60px_rgb(0_0_0/0.12)] backdrop-blur-2xl dark:shadow-[0_18px_60px_rgb(0_0_0/0.38)]">
          <div className="px-3 pb-2 pt-2">
            <p className="font-mono text-[7px] uppercase tracking-[0.14em] text-muted">
              {t('translateWebsite')}
            </p>
          </div>

          <LanguageOptions activeLanguage={activeLanguage} isPending={isPending} onChange={changeLanguage} />

          <div className="mt-1 border-t border-border/60 px-3 py-2.5">
            <p className="text-[8px] leading-4 text-muted">{t('translationNote')}</p>
          </div>
        </div>
      ) : null}

      {/* =====================================================
          MOBILE INLINE PANEL
          ===================================================== */}

      {mobile && open ? (
        <div className="mt-2 overflow-hidden rounded-[18px] border border-border/70 bg-background/65 p-1.5">
          <div className="px-3 pb-2 pt-2">
            <p className="font-mono text-[7px] uppercase tracking-[0.14em] text-muted">
              {t('translateWebsite')}
            </p>
          </div>

          <LanguageOptions activeLanguage={activeLanguage} isPending={isPending} onChange={changeLanguage} />
        </div>
      ) : null}
    </div>
  );
}

type LanguageOptionsProps = {
  activeLanguage: SupportedLocale;
  isPending: boolean;
  onChange: (language: LanguageOption) => void;
};

function LanguageOptions({ activeLanguage, isPending, onChange }: LanguageOptionsProps) {
  return (
    <div className="grid gap-0.5">
      {languages.map(language => {
        const active = language.code === activeLanguage;

        return (
          <button
            key={language.code}
            type="button"
            disabled={isPending}
            onClick={() => {
              onChange(language);
            }}
            className={[
              'flex',

              'w-full',

              'items-center',
              'justify-between',

              'gap-4',

              'rounded-[12px]',

              'px-3',
              'py-2.5',

              'text-left',

              'transition-colors',

              'disabled:pointer-events-none',
              'disabled:opacity-60',

              active
                ? ['bg-theme-accent-soft', 'text-foreground'].join(' ')
                : ['text-muted', 'hover:bg-surface-muted/40', 'hover:text-foreground'].join(' ')
            ].join(' ')}>
            <div className="flex items-center gap-3">
              <span className="w-5 font-mono text-[7px] uppercase tracking-[0.08em] text-theme-accent">
                {language.short}
              </span>

              <span className="text-[11px] font-medium">{language.label}</span>
            </div>

            {active ? <Check aria-hidden="true" className="size-3.5 text-theme-accent" /> : null}
          </button>
        );
      })}
    </div>
  );
}
