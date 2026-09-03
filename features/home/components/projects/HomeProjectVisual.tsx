'use client';

import type { HomepageData } from '@/features/home/server/get-homepage-data';

import { ProjectScreenshotCarousel } from './ProjectScreenshotCarousel';

type Project = HomepageData['projects'][number];

type HomeProjectVisualProps = {
  project: Project;
  index: number;
  featured?: boolean;
};

export function HomeProjectVisual({ project, featured = false }: HomeProjectVisualProps) {
  return (
    <div className="relative h-full min-h-[250px] overflow-hidden bg-surface-muted/20">
      <ProjectScreenshotCarousel project={project} featured={featured} />
    </div>
  );
}
