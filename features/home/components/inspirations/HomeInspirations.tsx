'use client';

import { useEffect, useState } from 'react';

import { InspirationNetwork } from './InspirationNetwork';
import { inspirationNodes } from './inspiration-data';

import type { InspirationNodeId } from './inspiration-data';

export function HomeInspirations() {
  const [activeNode, setActiveNode] = useState<InspirationNodeId>('product');

  useEffect(() => {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

    if (reducedMotion.matches) {
      return;
    }

    const currentIndex = inspirationNodes.findIndex(node => node.id === activeNode);

    const timeout = window.setTimeout(() => {
      const nextIndex = (currentIndex + 1) % inspirationNodes.length;
      setActiveNode(inspirationNodes[nextIndex].id);
    }, 9000);

    return () => {
      window.clearTimeout(timeout);
    };
  }, [activeNode]);

  return (
    <section
      className={[
        'rcentz-section relative z-10',
        'pt-24 pb-18',
        'sm:pt-28 sm:pb-22',
        'lg:pt-30 lg:pb-24'
      ].join(' ')}>
      <div className="max-w-4xl">
        <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#b8fff5]/62">Inspirations</p>

        <h2 className="mt-4 max-w-4xl text-3xl font-semibold tracking-[-0.045em] text-white sm:text-4xl lg:text-5xl">
          What shapes the Rcentz build process.
        </h2>

        <p className="mt-6 max-w-3xl text-sm leading-7 text-white/54 sm:text-base">
          Product thinking, AI collaboration, commerce behaviour, systems structure and reusable architecture
          all influence how Rcentz approaches a solution before development begins.
        </p>
      </div>

      <div className="mt-12 lg:mt-16">
        <InspirationNetwork activeNode={activeNode} onChange={setActiveNode} />
      </div>

      <style>{`
        @keyframes rcentz-inspiration-path {
          to {
            stroke-dashoffset: -60;
          }
        }

        @keyframes rcentz-inspiration-signal {
          0%, 100% {
            opacity: 0;
          }

          15%, 80% {
            opacity: 1;
          }
        }

        @keyframes rcentz-inspiration-icon-idle {
          0%, 100% {
            transform: translateY(0px);
          }

          50% {
            transform: translateY(-1.5px);
          }
        }

        @keyframes rcentz-inspiration-icon-active {
          0%, 100% {
            transform: translateY(0px) scale(1);
          }

          50% {
            transform: translateY(-1.5px) scale(1.08);
          }
        }

        @keyframes rcentz-inspiration-mini-icon {
          0%, 100% {
            transform: translateY(0px);
            opacity: 0.78;
          }

          50% {
            transform: translateY(-2px);
            opacity: 1;
          }
        }

        @keyframes rcentz-inspiration-core-icon {
          0%, 100% {
            transform: translateY(0px) scale(1);
          }

          50% {
            transform: translateY(-2px) scale(1.04);
          }
        }

        @keyframes rcentz-inspiration-output-icon {
          0%, 100% {
            transform: translateY(0px);
          }

          50% {
            transform: translateY(-2px);
          }
        }

        .rcentz-inspiration-path-live {
          animation: rcentz-inspiration-path 4.6s linear infinite;
        }

        .rcentz-inspiration-signal {
          animation: rcentz-inspiration-signal 5.8s ease infinite;
        }

        .rcentz-inspiration-icon-idle {
          animation: rcentz-inspiration-icon-idle 4.8s ease-in-out infinite;
        }

        .rcentz-inspiration-icon-active {
          animation: rcentz-inspiration-icon-active 3.2s ease-in-out infinite;
        }

        .rcentz-inspiration-mini-icon {
          animation: rcentz-inspiration-mini-icon 4.5s ease-in-out infinite;
        }

        .rcentz-inspiration-core-icon {
          animation: rcentz-inspiration-core-icon 4.2s ease-in-out infinite;
        }

        .rcentz-inspiration-output-icon {
          animation: rcentz-inspiration-output-icon 4.6s ease-in-out infinite;
        }

        @media (prefers-reduced-motion: reduce) {
          .rcentz-inspiration-path-live,
          .rcentz-inspiration-signal,
          .rcentz-inspiration-icon-idle,
          .rcentz-inspiration-icon-active,
          .rcentz-inspiration-mini-icon,
          .rcentz-inspiration-core-icon,
          .rcentz-inspiration-output-icon {
            animation: none;
          }
        }
      `}</style>
    </section>
  );
}
