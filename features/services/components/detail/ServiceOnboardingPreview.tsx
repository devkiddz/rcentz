import { CheckCircle2, ChevronRight, ClipboardList, CircleHelp, Dot, ListChecks } from 'lucide-react';

import { getTranslations } from 'next-intl/server';

import type { ServiceDetail } from '../../server/get-service-by-slug';

type ServiceOnboardingPreviewProps = {
  service: ServiceDetail;
};

type OnboardingTranslator = Awaited<ReturnType<typeof getTranslations<'ServiceOnboarding'>>>;

function formatQuestionType(t: OnboardingTranslator, type: string) {
  const normalizedType = type.trim().toLowerCase();

  const knownTypeKeys: Record<string, string> = {
    text: 'questionTypes.text',
    textarea: 'questionTypes.textarea',
    select: 'questionTypes.select',
    multiselect: 'questionTypes.multiselect',
    multi_select: 'questionTypes.multiselect',
    radio: 'questionTypes.radio',
    checkbox: 'questionTypes.checkbox',
    date: 'questionTypes.date',
    number: 'questionTypes.number',
    email: 'questionTypes.email',
    phone: 'questionTypes.phone',
    url: 'questionTypes.url'
  };

  const translationKey = knownTypeKeys[normalizedType];

  if (translationKey) {
    return t(translationKey);
  }

  return type
    .replaceAll('_', ' ')
    .toLowerCase()
    .replace(/\b\w/g, letter => letter.toUpperCase());
}

export async function ServiceOnboardingPreview({ service }: ServiceOnboardingPreviewProps) {
  const t = await getTranslations('ServiceOnboarding');

  if (service.onboardingQuestions.length === 0) {
    return null;
  }

  const previewQuestions = service.onboardingQuestions.slice(0, 6);

  const remainingCount = service.onboardingQuestions.length - previewQuestions.length;

  return (
    <aside className="relative overflow-hidden rounded-[30px] border border-border bg-background p-6 sm:p-7">
      {/* =========================================
          ENVIRONMENT
          ========================================= */}

      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-20 -top-20 size-52 rounded-full bg-theme-accent-faint blur-3xl"
      />

      <div className="relative">
        {/* =========================================
            HEADER
            ========================================= */}

        <div className="flex items-start justify-between gap-4">
          <div className="flex size-10 items-center justify-center rounded-[15px] border border-theme-accent/15 bg-theme-accent-soft">
            <ClipboardList className="size-4 text-theme-accent" />
          </div>

          <span className="rounded-full border border-theme-accent/15 bg-theme-accent-soft px-2.5 py-1 font-mono text-[6px] uppercase tracking-[0.12em] text-theme-accent">
            {t('intakePreview')}
          </span>
        </div>

        <div className="mt-6">
          <p className="font-mono text-[8px] uppercase tracking-[0.16em] text-muted">{t('beforeScope')}</p>

          <h2 className="mt-3 max-w-[620px] text-[1.85rem] font-semibold leading-[1] tracking-[-0.05em] text-foreground sm:text-[2.2rem]">
            {t('title')}
          </h2>

          <p className="mt-4 max-w-[650px] text-[11px] leading-6 text-muted sm:text-[12px] sm:leading-7">
            {t('description')}
          </p>
        </div>

        {/* =========================================
            QUESTION PREVIEW
            ========================================= */}

        <div className="mt-7 space-y-3">
          {previewQuestions.map((question, index) => {
            const optionPreview = question.options.slice(0, 3);

            return (
              <article
                key={question.id}
                className="rounded-[22px] border border-border bg-surface-muted/15 p-4 sm:p-5">
                <div className="flex items-start gap-4">
                  <div className="flex size-9 shrink-0 items-center justify-center rounded-full border border-theme-accent/15 bg-theme-accent-soft">
                    <span className="font-mono text-[7px] text-theme-accent">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                  </div>

                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-start justify-between gap-3">
                      <div>
                        <p className="text-[11px] font-medium leading-5 text-foreground sm:text-[12px]">
                          {question.label}
                        </p>

                        <div className="mt-2 flex flex-wrap items-center gap-2">
                          <span className="rounded-full border border-border px-2 py-1 font-mono text-[6px] uppercase tracking-[0.1em] text-muted">
                            {formatQuestionType(t, question.type)}
                          </span>

                          <span
                            className={[
                              'rounded-full border px-2 py-1 font-mono text-[6px] uppercase tracking-[0.1em]',

                              question.required
                                ? 'border-theme-accent/15 bg-theme-accent-soft text-theme-accent'
                                : 'border-border text-muted'
                            ].join(' ')}>
                            {question.required ? t('required') : t('optional')}
                          </span>
                        </div>
                      </div>

                      {question.required ? (
                        <CheckCircle2 className="size-3.5 shrink-0 text-theme-accent" />
                      ) : (
                        <CircleHelp className="size-3.5 shrink-0 text-muted" />
                      )}
                    </div>

                    {question.helpText ? (
                      <p className="mt-3 max-w-[620px] text-[10px] leading-5 text-muted sm:text-[11px] sm:leading-6">
                        {question.helpText}
                      </p>
                    ) : null}

                    {optionPreview.length > 0 ? (
                      <div className="mt-4 flex flex-wrap gap-2">
                        {optionPreview.map(option => (
                          <span
                            key={option.id}
                            className="rounded-full border border-border bg-background px-2.5 py-1 text-[8px] text-foreground/75 sm:text-[9px]">
                            {option.label}
                          </span>
                        ))}

                        {question.options.length > optionPreview.length ? (
                          <span className="rounded-full border border-border px-2.5 py-1 font-mono text-[6px] uppercase tracking-[0.1em] text-muted">
                            {t('moreOptions', {
                              count: question.options.length - optionPreview.length
                            })}
                          </span>
                        ) : null}
                      </div>
                    ) : question.placeholder ? (
                      <div className="mt-4 rounded-[14px] border border-dashed border-border bg-background/70 px-3 py-2.5">
                        <p className="text-[9px] italic leading-5 text-muted">{question.placeholder}</p>
                      </div>
                    ) : null}
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        {/* =========================================
            REMAINING QUESTIONS
            ========================================= */}

        {remainingCount > 0 ? (
          <div className="mt-4 flex items-center gap-2 rounded-[18px] border border-border bg-surface-muted/10 px-4 py-3">
            <Dot className="size-4 shrink-0 text-theme-accent" />

            <p className="text-[9px] leading-5 text-muted sm:text-[10px]">
              {t('remainingQuestions', {
                count: remainingCount
              })}
            </p>
          </div>
        ) : null}

        {/* =========================================
            FLOW HANDOFF
            ========================================= */}

        <div className="mt-6 border-t border-border pt-5">
          <div className="flex items-start justify-between gap-4">
            <div className="flex gap-3">
              <div className="flex size-8 shrink-0 items-center justify-center rounded-full border border-border bg-surface-muted/25">
                <ListChecks className="size-3.5 text-theme-accent" />
              </div>

              <div>
                <p className="text-[11px] font-medium text-foreground sm:text-[12px]">
                  {t('fullOnboardingTitle')}
                </p>

                <p className="mt-1 max-w-[420px] text-[9px] leading-5 text-muted sm:text-[10px]">
                  {t('fullOnboardingDescription')}
                </p>
              </div>
            </div>

            <ChevronRight className="mt-1 size-4 shrink-0 text-theme-accent" />
          </div>
        </div>
      </div>
    </aside>
  );
}
