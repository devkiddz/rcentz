import Image from 'next/image';
import { Images } from 'lucide-react';

import type { PortfolioProject } from '@/features/portfolio/server/get-portfolio-projects';

type PortfolioProjectVisualProps = {
  project: PortfolioProject;
  featured?: boolean;
};

export function PortfolioProjectVisual({ project, featured = false }: PortfolioProjectVisualProps) {
  const image = project.media[0];

  if (!image) {
    return (
      <div className="relative flex h-full min-h-[245px] items-center justify-center overflow-hidden bg-surface-muted/20 p-8">
        <div aria-hidden="true" className="absolute inset-0 opacity-55 rcentz-grid-fade" />

        <div className="relative z-10 max-w-xs text-center">
          <div className="mx-auto flex size-10 items-center justify-center rounded-xl border border-border bg-background">
            <Images aria-hidden="true" className="size-4 text-muted" />
          </div>

          <p className="mt-4 text-sm font-medium">{project.name}</p>
          <p className="mt-2 text-[10px] leading-5 text-muted">No public project media has been attached yet.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative h-full min-h-[245px] overflow-hidden bg-black">
      <Image
        src={image.url}
        alt={image.alt ?? `${project.name} project screenshot`}
        fill
        sizes={featured ? '(max-width: 1024px) 100vw, 60vw' : '(max-width: 1024px) 100vw, 33vw'}
        className="object-cover object-top transition-transform duration-700 group-hover:scale-[1.015]"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/65 to-transparent"
      />

      <div className="absolute bottom-4 left-4 rounded-lg border border-white/15 bg-black/45 px-2.5 py-2 text-white backdrop-blur-md">
        <p className="font-mono text-[7px] uppercase tracking-[0.14em] text-white/55">
          01 / {String(project.media.length).padStart(2, '0')}
        </p>
        <p className="mt-1 max-w-[220px] truncate text-[8px] font-medium">
          {image.caption ?? project.name}
        </p>
      </div>
    </div>
  );
}
