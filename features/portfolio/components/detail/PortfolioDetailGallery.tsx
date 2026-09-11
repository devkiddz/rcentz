'use client';

import { useCallback, useEffect, useState } from 'react';

import { ArrowLeft, ArrowRight, ArrowUpRight, Expand, X } from 'lucide-react';

import { useTranslations } from 'next-intl';

import type { PublicPortfolioProject } from '@/features/portfolio/server/get-portfolio-project';

type PortfolioDetailGalleryProps = {
  project: PublicPortfolioProject;
};

type Media = PublicPortfolioProject['media'][number];

function isVideo(media: Media) {
  return media.mimeType?.startsWith('video/') ?? false;
}

export function PortfolioDetailGallery({ project }: PortfolioDetailGalleryProps) {
  const t = useTranslations('PortfolioDetailGallery');

  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const total = project.media.length;

  function getLabel(media: Media) {
    return media.alt ?? media.caption ?? media.fileName ?? t('projectMedia');
  }

  const close = useCallback(() => {
    setActiveIndex(null);
  }, []);

  const previous = useCallback(() => {
    setActiveIndex(current => {
      if (current === null) {
        return 0;
      }

      return current === 0 ? total - 1 : current - 1;
    });
  }, [total]);

  const next = useCallback(() => {
    setActiveIndex(current => {
      if (current === null) {
        return 0;
      }

      return current === total - 1 ? 0 : current + 1;
    });
  }, [total]);

  useEffect(() => {
    if (activeIndex === null) {
      return;
    }

    const previousOverflow = document.body.style.overflow;

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        close();
      }

      if (event.key === 'ArrowLeft') {
        previous();
      }

      if (event.key === 'ArrowRight') {
        next();
      }
    }

    document.body.style.overflow = 'hidden';

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;

      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [activeIndex, close, next, previous]);

  if (!total) {
    return null;
  }

  const activeMedia = activeIndex === null ? null : project.media[activeIndex];

  return (
    <>
      <section className="py-20 sm:py-24">
        <div className="mx-auto w-full max-w-[1320px] px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <div className="flex items-center gap-3">
                <span className="h-px w-8 bg-theme-accent" />

                <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-muted">{t('eyebrow')}</p>
              </div>

              <h2 className="mt-5 text-3xl font-semibold tracking-[-0.05em] sm:text-4xl">{t('title')}</h2>
            </div>

            <div className="sm:text-right">
              <p className="max-w-sm text-[13px] leading-6 text-muted">{t('description')}</p>

              <p className="mt-2 font-mono text-[7px] uppercase tracking-[0.14em] text-muted">
                {t('itemCount', {
                  count: total
                })}
              </p>
            </div>
          </div>

          <div className="mt-10 grid gap-6 md:grid-cols-2">
            {project.media.map((media, index) => {
              const label = getLabel(media);

              return (
                <article
                  key={media.id}
                  className="group overflow-hidden rounded-[24px] border border-border bg-surface shadow-sm transition-[border-color,box-shadow,transform] duration-300 hover:-translate-y-0.5 hover:border-border-strong hover:shadow-lg">
                  <div className="relative aspect-[16/10] overflow-hidden bg-black">
                    {isVideo(media) ? (
                      <video
                        controls
                        playsInline
                        preload="metadata"
                        className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.025]">
                        <source src={media.url} type={media.mimeType ?? undefined} />
                      </video>
                    ) : (
                      <>
                        <img
                          src={media.url}
                          alt={label}
                          loading="lazy"
                          width={media.width ?? undefined}
                          height={media.height ?? undefined}
                          className="h-full w-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.035]"
                        />

                        <button
                          type="button"
                          onClick={() => {
                            setActiveIndex(index);
                          }}
                          aria-label={t('expandAria', {
                            label
                          })}
                          className="absolute inset-0 z-10"
                        />
                      </>
                    )}

                    <div
                      aria-hidden="true"
                      className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-black/10"
                    />

                    <span className="absolute left-4 top-4 z-20 rounded-md border border-white/10 bg-black/45 px-2.5 py-1.5 font-mono text-[7px] text-white/70 backdrop-blur-md">
                      {String(index + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
                    </span>

                    <div className="absolute bottom-4 left-1/2 z-30 flex -translate-x-1/2 items-center gap-2">
                      <button
                        type="button"
                        onClick={() => {
                          setActiveIndex(index);
                        }}
                        aria-label={t('expandAria', {
                          label
                        })}
                        title={t('expand')}
                        className="inline-flex size-11 items-center justify-center rounded-full border border-white/10 bg-black/45 text-white/85 shadow-sm backdrop-blur-md transition-[background-color,color,transform] hover:scale-105 hover:bg-black/65 hover:text-white">
                        <Expand className="size-4" />
                      </button>

                      {project.liveUrl ? (
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noreferrer"
                          title={t('viewLive')}
                          className="inline-flex size-11 items-center justify-center rounded-full border border-white/10 bg-black/45 text-white/85 shadow-sm backdrop-blur-md transition-[background-color,color,transform] hover:scale-105 hover:bg-black/65 hover:text-white">
                          <ArrowUpRight className="size-4" />
                        </a>
                      ) : null}
                    </div>
                  </div>

                  <div className="bg-surface-raised px-5 py-5 sm:px-6 sm:py-6">
                    <div className="flex items-start justify-between gap-4">
                      <div className="min-w-0">
                        <p className="font-mono text-[8px] uppercase tracking-[0.14em] text-theme-accent">
                          {project.name}
                        </p>

                        <h3 className="mt-2 text-[17px] font-semibold tracking-[-0.03em] text-foreground">
                          {media.caption ?? media.alt ?? t('publishedInterface')}
                        </h3>
                      </div>

                      <button
                        type="button"
                        onClick={() => {
                          setActiveIndex(index);
                        }}
                        aria-label={t('expandAria', {
                          label
                        })}
                        className="inline-flex size-9 shrink-0 items-center justify-center rounded-lg text-muted transition-colors hover:bg-surface-muted hover:text-foreground">
                        <ArrowUpRight className="size-4" />
                      </button>
                    </div>

                    <p className="mt-3 line-clamp-2 max-w-xl text-[11px] leading-5 text-muted">
                      {media.caption ?? project.summary ?? project.description ?? t('publishedInterface')}
                    </p>

                    {project.technologies.length > 0 ? (
                      <div className="mt-5 flex flex-wrap gap-2">
                        {project.technologies.slice(0, 5).map(technology => (
                          <span
                            key={technology.slug}
                            className="rounded-full border border-border bg-surface-muted px-3 py-1.5 font-mono text-[8px] text-muted">
                            {technology.name}
                          </span>
                        ))}
                      </div>
                    ) : null}
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {activeMedia && activeIndex !== null ? (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={t('previewAria', {
            label: getLabel(activeMedia)
          })}
          className="fixed inset-0 z-[100] bg-background/95 backdrop-blur-xl">
          <button
            type="button"
            onClick={close}
            aria-label={t('close')}
            className="absolute right-4 top-4 z-40 inline-flex size-10 items-center justify-center rounded-full border border-border bg-background/90 text-foreground shadow-sm">
            <X className="size-4" />
          </button>

          <div className="mx-auto flex h-full w-full max-w-[1500px] flex-col px-4 pb-4 pt-16 sm:px-6 lg:px-8">
            <div className="relative flex min-h-0 flex-1 items-center justify-center">
              {total > 1 ? (
                <>
                  <button
                    type="button"
                    onClick={previous}
                    aria-label={t('previous')}
                    className="absolute left-0 z-30 hidden size-11 items-center justify-center rounded-full border border-border bg-background/90 shadow-sm sm:flex">
                    <ArrowLeft className="size-4" />
                  </button>

                  <button
                    type="button"
                    onClick={next}
                    aria-label={t('next')}
                    className="absolute right-0 z-30 hidden size-11 items-center justify-center rounded-full border border-border bg-background/90 shadow-sm sm:flex">
                    <ArrowRight className="size-4" />
                  </button>
                </>
              ) : null}

              {isVideo(activeMedia) ? (
                <video
                  key={activeMedia.id}
                  controls
                  autoPlay
                  playsInline
                  className="max-h-full max-w-full rounded-[22px] object-contain">
                  <source src={activeMedia.url} type={activeMedia.mimeType ?? undefined} />
                </video>
              ) : (
                <img
                  key={activeMedia.id}
                  src={activeMedia.url}
                  alt={getLabel(activeMedia)}
                  width={activeMedia.width ?? undefined}
                  height={activeMedia.height ?? undefined}
                  className="max-h-full max-w-full rounded-[22px] object-contain shadow-2xl"
                />
              )}
            </div>

            <div className="mt-4 border-t border-border pt-4">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="font-mono text-[7px] text-theme-accent-strong">
                    {String(activeIndex + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
                  </p>

                  <p className="mt-1 text-[10px] text-muted">{getLabel(activeMedia)}</p>
                </div>

                {project.liveUrl ? (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex size-10 items-center justify-center rounded-full border border-border bg-background text-foreground">
                    <ArrowUpRight className="size-4" />
                  </a>
                ) : null}
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
