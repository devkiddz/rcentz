'use client';

import { useReducedMotion } from 'motion/react';
import { useEffect, useState } from 'react';

import { RcentzPerspectiveStage } from '@/features/home/components/hero/perspective/RcentzPerspectiveStage';

const PHASE_DURATION = 2450;
const PHASE_COUNT = 5;

export function RcentzWebsiteStory() {
  const [phase, setPhase] = useState(0);
  const reduceMotion = Boolean(useReducedMotion());

  useEffect(() => {
    if (reduceMotion || phase >= PHASE_COUNT - 1) {
      return;
    }

    const timeout = window.setTimeout(() => {
      setPhase(current => current + 1);
    }, PHASE_DURATION);

    return () => {
      window.clearTimeout(timeout);
    };
  }, [phase, reduceMotion]);

  const visiblePhase = reduceMotion ? PHASE_COUNT - 1 : phase;

  return <RcentzPerspectiveStage phase={visiblePhase} />;
}
