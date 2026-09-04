'use client';

import { useCallback, useEffect, useState } from 'react';

import { ArrowLeft, ArrowRight, ArrowUpRight, Expand, X } from 'lucide-react';

import type { PublicPortfolioProject } from '@/features/portfolio/server/get-portfolio-project';

type PortfolioDetailGalleryProps = {
  project: PublicPortfolioProject;
};

type ProjectMedia = PublicPortfolioProject['media'][number];

function isVideo(media: ProjectMedia) {
  return media.mimeType?.startsWith('video/') ?? false;
}

function getMediaLabel(media: ProjectMedia) {
  return media.alt ?? media.caption ?? media.fileName ?? 'Project media';
}

function GalleryItem({
  media,
  index,
  liveUrl,
  onPreview
}: {
  media: ProjectMedia;
  index: number;
  liveUrl: string | null;
  onPreview: () => void;
}) {
  const label = getMediaLabel(media);

  return (
    <figure className="group min-w-0">
      <div className="overflow-hidden rounded-[22px] bg-surface-muted/30">
        {/* MEDIA */}
        <div className="relative overflow-hidden rounded-[22px]">
          {isVideo(media) ? (
            <video controls playsInline preload="metadata" className="aspect-[16/10] w-full object-cover">
              <source src={media.url} type={media.mimeType ?? undefined} />
            </video>
          ) : (
            <button
              type="button"
              onClick={onPreview}
              aria-label={`Expand ${label}`}
              className="block w-full overflow-hidden text-left">
              <img
                src={media.url}
                alt={label}
                loading="lazy"
                width={media.width ?? undefined}
                height={media.height ?? undefined}
                className="aspect-[16/10] w-full object-cover transition-transform duration-500 group-hover:scale-[1.015]"
              />
            </button>
          )}

          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-background/45 to-transparent"
          />

          <span className="pointer-events-none absolute left-3 top-3 rounded-full border border-border/70 bg-background/85 px-2.5 py-1 font-mono text-[7px] font-medium uppercase tracking-[0.13em] text-muted backdrop-blur-xl">
            {String(index + 1).padStart(2, '0')}
          </span>
        </div>

        {/* DETAILS */}
        <div className="p-4 sm:p-5">
          <div className="min-h-[42px]">
            <p className="line-clamp-2 text-[12px] leading-5 text-muted">
              {media.caption ?? media.alt ?? 'Published project interface.'}
            </p>
          </div>

          {/* ACTIONS */}
          <div className={`mt-4 grid gap-2 ${liveUrl ? 'grid-cols-2' : 'grid-cols-1'}`}>
            <button
              type="button"
              onClick={onPreview}
              className="group/preview inline-flex h-10 items-center justify-center gap-2 rounded-full border border-border bg-background px-4 text-[11px] font-medium text-foreground transition-[background-color,border-color,transform] hover:border-border-strong hover:bg-surface-muted active:scale-[0.98]">
              <Expand
                aria-hidden="true"
                className="size-3.5 transition-transform duration-300 group-hover/preview:scale-110"
              />
              Expand preview
            </button>

            {liveUrl ? (
              <a
                href={liveUrl}
                target="_blank"
                rel="noreferrer"
                className="group/live inline-flex h-10 items-center justify-center gap-2 rounded-full bg-primary px-4 text-[11px] font-medium text-primary-foreground transition-[opacity,transform] hover:opacity-90 active:scale-[0.98]">
                View live
                <ArrowUpRight
                  aria-hidden="true"
                  className="size-3.5 transition-transform duration-300 group-hover/live:-translate-y-0.5 group-hover/live:translate-x-0.5"
                />
              </a>
            ) : null}
          </div>
        </div>
      </div>
    </figure>
  );
}

function GalleryPreview({
  media,
  index,
  total,
  liveUrl,
  onClose,
  onPrevious,
  onNext
}: {
  media: ProjectMedia;
  index: number;
  total: number;
  liveUrl: string | null;
  onClose: () => void;
  onPrevious: () => void;
  onNext: () => void;
}) {
  const label = getMediaLabel(media);

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        onClose();
      }

      if (event.key === 'ArrowLeft') {
        onPrevious();
      }

      if (event.key === 'ArrowRight') {
        onNext();
      }
    }

    document.body.style.overflow = 'hidden';

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;

      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose, onNext, onPrevious]);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`${label} preview`}
      className="fixed inset-0 z-[100] bg-background/95 backdrop-blur-xl">
      {/* CLOSE */}
      <button
        type="button"
        onClick={onClose}
        aria-label="Close gallery preview"
        className="absolute right-4 top-4 z-30 flex size-10 items-center justify-center rounded-full border border-border bg-background/90 text-foreground shadow-sm transition-[background-color,transform] hover:bg-surface-muted hover:scale-105 sm:right-6 sm:top-6">
        <X aria-hidden="true" className="size-4" />
      </button>

      <div className="mx-auto flex h-full w-full max-w-[1500px] flex-col px-4 pb-4 pt-16 sm:px-6 sm:pb-6 sm:pt-20">
        {/* PREVIEW */}
        <div className="relative flex min-h-0 flex-1 items-center justify-center">
          {total > 1 ? (
            <>
              <button
                type="button"
                onClick={onPrevious}
                aria-label="Previous media"
                className="absolute left-0 z-20 hidden size-11 items-center justify-center rounded-full border border-border bg-background/90 text-foreground shadow-sm backdrop-blur-xl transition-[background-color,transform] hover:bg-surface-muted hover:scale-105 sm:flex">
                <ArrowLeft aria-hidden="true" className="size-4" />
              </button>

              <button
                type="button"
                onClick={onNext}
                aria-label="Next media"
                className="absolute right-0 z-20 hidden size-11 items-center justify-center rounded-full border border-border bg-background/90 text-foreground shadow-sm backdrop-blur-xl transition-[background-color,transform] hover:bg-surface-muted hover:scale-105 sm:flex">
                <ArrowRight aria-hidden="true" className="size-4" />
              </button>
            </>
          ) : null}

          {isVideo(media) ? (
            <video
              key={media.id}
              controls
              autoPlay
              playsInline
              className="max-h-full max-w-full rounded-[22px] object-contain">
              <source src={media.url} type={media.mimeType ?? undefined} />
            </video>
          ) : (
            <img
              key={media.id}
              src={media.url}
              alt={label}
              width={media.width ?? undefined}
              height={media.height ?? undefined}
              className="max-h-full max-w-full rounded-[22px] object-contain"
            />
          )}
        </div>

        {/* PREVIEW FOOTER */}
        <div className="mt-4 border-t border-border pt-4">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="min-w-0">
              <p className="font-mono text-[7px] font-medium uppercase tracking-[0.15em] text-theme-accent-strong">
                {String(index + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
              </p>

              {media.caption || media.alt ? (
                <p className="mt-1.5 max-w-2xl text-[12px] leading-5 text-muted">
                  {media.caption ?? media.alt}
                </p>
              ) : null}
            </div>

            <div className="flex shrink-0 items-center gap-2">
              {total > 1 ? (
                <div className="flex items-center gap-2 sm:hidden">
                  <button
                    type="button"
                    onClick={onPrevious}
                    aria-label="Previous media"
                    className="flex size-9 items-center justify-center rounded-full border border-border bg-background text-foreground transition-colors hover:bg-surface-muted">
                    <ArrowLeft aria-hidden="true" className="size-3.5" />
                  </button>

                  <button
                    type="button"
                    onClick={onNext}
                    aria-label="Next media"
                    className="flex size-9 items-center justify-center rounded-full border border-border bg-background text-foreground transition-colors hover:bg-surface-muted">
                    <ArrowRight aria-hidden="true" className="size-3.5" />
                  </button>
                </div>
              ) : null}

              {liveUrl ? (
                <a
                  href={liveUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="group/live inline-flex h-10 items-center justify-center gap-2 rounded-full bg-primary px-5 text-[11px] font-medium text-primary-foreground transition-[opacity,transform] hover:opacity-90 active:scale-[0.98]">
                  View live project
                  <ArrowUpRight
                    aria-hidden="true"
                    className="size-3.5 transition-transform duration-300 group-hover/live:-translate-y-0.5 group-hover/live:translate-x-0.5"
                  />
                </a>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function PortfolioDetailGallery({ project }: PortfolioDetailGalleryProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const total = project.media.length;

  const closePreview = useCallback(() => {
    setActiveIndex(null);
  }, []);

  const showPrevious = useCallback(() => {
    setActiveIndex(current => {
      if (current === null) {
        return 0;
      }

      return current === 0 ? total - 1 : current - 1;
    });
  }, [total]);

  const showNext = useCallback(() => {
    setActiveIndex(current => {
      if (current === null) {
        return 0;
      }

      return current === total - 1 ? 0 : current + 1;
    });
  }, [total]);

  if (!total) {
    return null;
  }

  const activeMedia = activeIndex === null ? null : project.media[activeIndex];

  return (
    <>
      <section className="py-20 sm:py-24">
        <div className="rcentz-section">
          {/* HEADER */}
          <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <div className="flex items-center gap-3">
                <span className="h-px w-8 bg-theme-accent" />

                <p className="font-mono text-[9px] font-medium uppercase tracking-[0.2em] text-muted">
                  Project gallery
                </p>
              </div>

              <h2 className="mt-5 text-3xl font-semibold tracking-[-0.05em] text-foreground sm:text-4xl lg:text-[3rem]">
                Inside the build.
              </h2>
            </div>

            <div className="sm:text-right">
              <p className="max-w-sm text-[13px] leading-6 text-muted">
                Published interface captures and product media from the project.
              </p>

              <p className="mt-2 font-mono text-[7px] uppercase tracking-[0.14em] text-muted">
                {total} {total === 1 ? 'item' : 'items'}
              </p>
            </div>
          </div>

          {/* GALLERY */}
          <div className="mt-10 grid gap-5 md:grid-cols-2 lg:gap-6">
            {project.media.map((media, index) => (
              <GalleryItem
                key={media.id}
                media={media}
                index={index}
                liveUrl={project.liveUrl}
                onPreview={() => setActiveIndex(index)}
              />
            ))}
          </div>
        </div>
      </section>

      {activeMedia && activeIndex !== null ? (
        <GalleryPreview
          media={activeMedia}
          index={activeIndex}
          total={total}
          liveUrl={project.liveUrl}
          onClose={closePreview}
          onPrevious={showPrevious}
          onNext={showNext}
        />
      ) : null}
    </>
  );
}
