'use client';

import { BrainCircuit, Rocket, Sparkles } from 'lucide-react';

import { InspirationCapsule } from './InspirationCapsule';
import { inspirationNodeMap } from './inspiration-data';
import type { InspirationNodeId } from './inspiration-data';

type InspirationNetworkProps = {
  activeNode: InspirationNodeId;
  onChange: (node: InspirationNodeId) => void;
};

const networkPaths = [
  { id: 'top-bus', d: 'M300 66 H900', tone: 'white' },
  { id: 'product', d: 'M330 66 V152 H520 V238', tone: 'green' },
  { id: 'ai', d: 'M505 66 V152 H555 V238', tone: 'green' },
  { id: 'systems', d: 'M695 66 V152 H645 V238', tone: 'green' },
  { id: 'workflow', d: 'M870 66 V152 H680 V238', tone: 'green' },
  { id: 'left-input', d: 'M220 286 H320', tone: 'white' },
  { id: 'commerce-core', d: 'M410 286 H548', tone: 'green' },
  { id: 'core-performance', d: 'M652 286 H790', tone: 'green' },
  { id: 'performance-output', d: 'M885 286 H1035', tone: 'white' },
  { id: 'core-architecture', d: 'M600 334 V390', tone: 'green' },
  { id: 'architecture-down', d: 'M600 430 V462', tone: 'green' },
  { id: 'architecture-left', d: 'M600 462 H500 V500', tone: 'white' },
  { id: 'architecture-middle', d: 'M600 462 V500', tone: 'white' },
  { id: 'architecture-right', d: 'M600 462 H700 V500', tone: 'white' }
] as const;

const activePathMap: Partial<Record<InspirationNodeId, string>> = {
  product: 'M330 66 V152 H520 V238',
  ai: 'M505 66 V152 H555 V238',
  systems: 'M695 66 V152 H645 V238',
  workflow: 'M870 66 V152 H680 V238',
  commerce: 'M220 286 H548',
  performance: 'M652 286 H1035',
  architecture: 'M600 334 V462'
};

const iconStyles = [
  'bg-[#5ea8ff]/20 text-[#8bc1ff] border-[#5ea8ff]/30',
  'bg-[#a78bfa]/20 text-[#c4b4ff] border-[#a78bfa]/30',
  'bg-[#55e7ef]/20 text-[#8ff5fa] border-[#55e7ef]/30',
  'bg-[#f4b44d]/20 text-[#ffd482] border-[#f4b44d]/30',
  'bg-[#fb7185]/20 text-[#ff9aaa] border-[#fb7185]/30',
  'bg-[#a3e635]/20 text-[#caf575] border-[#a3e635]/30'
];

export function InspirationNetwork({ activeNode, onChange }: InspirationNetworkProps) {
  const active = inspirationNodeMap[activeNode];
  const activePathD = activePathMap[activeNode];

  return (
    <>
      {/* DESKTOP SYSTEM MAP */}
      <div className="relative hidden min-h-[580px] w-full lg:block">
        <svg
          aria-hidden="true"
          viewBox="0 0 1200 560"
          preserveAspectRatio="none"
          className="absolute inset-0 size-full overflow-visible pointer-events-none">
          <defs>
            {/* TRAVELLING SIGNAL GLOW */}
            <filter id="rcentz-inspiration-glow" x="-150%" y="-150%" width="400%" height="400%">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>

            {/* HIGH-CONTRAST RAIL GLOW */}
            <filter id="rcentz-rail-glow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="1.5" />
            </filter>
          </defs>

          {/* BACKGROUND RAIL ACCENTS */}
          {networkPaths.map(path => (
            <path
              key={`${path.id}-glow`}
              d={path.d}
              fill="none"
              stroke={path.tone === 'green' ? 'rgba(106, 243, 219, 0.35)' : 'rgba(255, 255, 255, 0.18)'}
              strokeWidth="3.5"
              strokeLinecap="round"
              filter="url(#rcentz-rail-glow)"
            />
          ))}

          {/* CONNECTED CIRCUIT LINES */}
          {networkPaths.map((path, index) => (
            <path
              key={path.id}
              d={path.d}
              fill="none"
              stroke={path.tone === 'green' ? 'rgba(128, 255, 238, 0.75)' : 'rgba(255, 255, 255, 0.45)'}
              strokeWidth={path.tone === 'green' ? 1.6 : 1.25}
              strokeLinecap="round"
              strokeDasharray="4 6"
              className="rcentz-network-rail"
              style={{ animationDelay: `${index * -0.35}s` }}
            />
          ))}

          {/* ACTIVE SELECTED PATH */}
          {activePathD && (
            <path
              d={activePathD}
              fill="none"
              stroke="#6af3db"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeDasharray="5 7"
              filter="url(#rcentz-inspiration-glow)"
              className="rcentz-network-active"
            />
          )}

          {/* ANIMATED CURRENTS */}
          <circle r="4" fill="#6af3db" filter="url(#rcentz-inspiration-glow)">
            <animateMotion dur="6.8s" repeatCount="indefinite" path="M330 66 V152 H520 V238" />
          </circle>

          <circle r="3.5" fill="#ffffff" opacity="1" filter="url(#rcentz-inspiration-glow)">
            <animateMotion dur="8.2s" begin="1.1s" repeatCount="indefinite" path="M505 66 V152 H555 V238" />
          </circle>

          <circle r="3.8" fill="#6af3db" filter="url(#rcentz-inspiration-glow)">
            <animateMotion dur="7.6s" begin="2.8s" repeatCount="indefinite" path="M695 66 V152 H645 V238" />
          </circle>

          <circle r="3.5" fill="#ffffff" opacity="1" filter="url(#rcentz-inspiration-glow)">
            <animateMotion dur="9s" begin="4.2s" repeatCount="indefinite" path="M870 66 V152 H680 V238" />
          </circle>

          <circle r="4" fill="#6af3db" filter="url(#rcentz-inspiration-glow)">
            <animateMotion dur="6.4s" begin="1.7s" repeatCount="indefinite" path="M220 286 H548" />
          </circle>

          <circle r="3.8" fill="#ffffff" opacity="1" filter="url(#rcentz-inspiration-glow)">
            <animateMotion dur="7.2s" begin="3.3s" repeatCount="indefinite" path="M652 286 H1035" />
          </circle>

          <circle r="4" fill="#6af3db" filter="url(#rcentz-inspiration-glow)">
            <animateMotion dur="6s" begin="0.9s" repeatCount="indefinite" path="M600 334 V462" />
          </circle>

          <circle r="3.5" fill="#ffffff" opacity="1" filter="url(#rcentz-inspiration-glow)">
            <animateMotion dur="7.5s" begin="2.5s" repeatCount="indefinite" path="M600 462 H500 V500" />
          </circle>

          <circle r="3.8" fill="#6af3db" filter="url(#rcentz-inspiration-glow)">
            <animateMotion dur="6.9s" begin="4s" repeatCount="indefinite" path="M600 462 V500" />
          </circle>

          <circle r="3.5" fill="#ffffff" opacity="1" filter="url(#rcentz-inspiration-glow)">
            <animateMotion dur="8s" begin="5s" repeatCount="indefinite" path="M600 462 H700 V500" />
          </circle>
        </svg>

        {/* TOP CAPSULES */}
        <div className="absolute left-[300px] top-[44px]">
          <InspirationCapsule
            node={inspirationNodeMap.product}
            active={activeNode === 'product'}
            onSelect={() => onChange('product')}
          />
        </div>

        <div className="absolute left-[440px] top-[44px]">
          <InspirationCapsule
            node={inspirationNodeMap.ai}
            active={activeNode === 'ai'}
            onSelect={() => onChange('ai')}
          />
        </div>

        <div className="absolute left-[615px] top-[44px]">
          <InspirationCapsule
            node={inspirationNodeMap.systems}
            active={activeNode === 'systems'}
            onSelect={() => onChange('systems')}
          />
        </div>

        <div className="absolute left-[830px] top-[44px]">
          <InspirationCapsule
            node={inspirationNodeMap.workflow}
            active={activeNode === 'workflow'}
            onSelect={() => onChange('workflow')}
          />
        </div>

        {/* LEFT INPUT CLUSTER */}
        <div className="absolute left-[70px] top-[220px] rounded-[18px] border border-slate-700/80 bg-slate-900/90 p-3 shadow-lg backdrop-blur-md">
          <div className="grid grid-cols-3 gap-2">
            {[
              inspirationNodeMap.product.icon,
              inspirationNodeMap.ai.icon,
              inspirationNodeMap.systems.icon,
              inspirationNodeMap.commerce.icon,
              inspirationNodeMap.architecture.icon,
              inspirationNodeMap.performance.icon
            ].map((Icon, index) => (
              <span
                key={index}
                className={`flex size-10 items-center justify-center rounded-full border ${iconStyles[index]}`}>
                <Icon aria-hidden="true" className="size-4 shrink-0" />
              </span>
            ))}
          </div>
        </div>

        {/* COMMERCE */}
        <div className="absolute left-[315px] top-[266px]">
          <InspirationCapsule
            node={inspirationNodeMap.commerce}
            active={activeNode === 'commerce'}
            onSelect={() => onChange('commerce')}
          />
        </div>

        {/* RCENTZ CORE */}
        <div className="absolute left-1/2 top-[286px] z-20 -translate-x-1/2 -translate-y-1/2">
          <div className="relative flex h-[96px] w-[124px] flex-col items-center justify-center overflow-hidden rounded-[24px] border border-[#6af3db]/60 bg-slate-900/95 shadow-xl backdrop-blur-xl">
            <div
              aria-hidden="true"
              className="absolute inset-0 bg-[radial-gradient(circle_at_50%_30%,rgba(106,243,219,0.25),transparent_70%)]"
            />

            <span className="relative z-10 flex size-9 items-center justify-center rounded-full border border-[#6af3db]/40 bg-[#6af3db]/20 text-[#6af3db]">
              <BrainCircuit aria-hidden="true" className="size-4" />
            </span>

            <p className="relative z-10 mt-1.5 font-mono text-[9px] font-bold uppercase tracking-[0.2em] text-[#6af3db]">
              rcentz
            </p>

            <p className="relative z-10 text-[13px] font-bold tracking-wide text-white">CORE</p>
          </div>
        </div>

        {/* PERFORMANCE */}
        <div className="absolute left-[775px] top-[266px]">
          <InspirationCapsule
            node={inspirationNodeMap.performance}
            active={activeNode === 'performance'}
            onSelect={() => onChange('performance')}
          />
        </div>

        {/* RIGHT OUTPUT */}
        <div className="absolute left-[1038px] top-[250px]">
          <div className="flex size-[66px] items-center justify-center rounded-[20px] border border-slate-700/80 bg-slate-900/90 text-[#6af3db] shadow-lg backdrop-blur-md">
            <Rocket aria-hidden="true" className="size-5" />
          </div>
        </div>

        {/* ARCHITECTURE */}
        <div className="absolute left-1/2 top-[384px] -translate-x-1/2">
          <InspirationCapsule
            node={inspirationNodeMap.architecture}
            active={activeNode === 'architecture'}
            onSelect={() => onChange('architecture')}
          />
        </div>

        {/* OUTPUT CAPSULES */}
        <div className="absolute left-1/2 top-[500px] flex -translate-x-1/2 items-center gap-3">
          {['Reusable', 'Scalable', 'Maintainable'].map(label => (
            <div
              key={label}
              className="inline-flex h-9 items-center gap-2 rounded-full border border-slate-700/80 bg-slate-900/90 px-4 text-[11px] font-semibold text-slate-200 shadow-md backdrop-blur-md">
              <span className="size-2 rounded-full bg-[#6af3db] shadow-[0_0_8px_#6af3db]" />
              {label}
            </div>
          ))}
        </div>

        {/* ACTIVE SUMMARY PANEL */}
        <div className="absolute bottom-0 left-1/2 flex w-[min(780px,85%)] -translate-x-1/2 items-center gap-4 rounded-2xl border border-slate-700/80 bg-slate-900/95 px-5 py-3.5 shadow-2xl backdrop-blur-md">
          <span className="flex size-9 shrink-0 items-center justify-center rounded-full border border-[#6af3db]/40 bg-[#6af3db]/15 text-[#6af3db]">
            <Sparkles aria-hidden="true" className="size-4" />
          </span>

          <div className="min-w-0">
            <p className="text-[12px] font-bold tracking-wide text-white">{active.label}</p>
            <p className="mt-0.5 text-[12px] font-normal leading-relaxed text-slate-300">
              {active.description}
            </p>
          </div>
        </div>
      </div>

      {/* MOBILE / TABLET DISPLAY */}
      <div className="lg:hidden">
        <div className="flex flex-wrap gap-2.5">
          {Object.values(inspirationNodeMap).map(node => (
            <InspirationCapsule
              key={node.id}
              node={node}
              compact
              active={activeNode === node.id}
              onSelect={() => onChange(node.id)}
            />
          ))}
        </div>

        <div className="mt-8 flex justify-center">
          <div className="flex items-center gap-3 rounded-full border border-[#6af3db]/40 bg-slate-900/90 py-2.5 pl-3.5 pr-5 shadow-lg">
            <span className="flex size-9 items-center justify-center rounded-full border border-[#6af3db]/30 bg-[#6af3db]/15 text-[#6af3db]">
              <BrainCircuit aria-hidden="true" className="size-4" />
            </span>

            <div>
              <p className="font-mono text-[8px] font-bold uppercase tracking-[0.18em] text-[#6af3db]">
                rcentz
              </p>
              <p className="text-[13px] font-semibold text-white">connected core</p>
            </div>
          </div>
        </div>

        <div className="mt-5 rounded-2xl border border-slate-700/80 bg-slate-900/95 p-4.5 shadow-xl">
          <p className="font-mono text-[10px] font-bold uppercase tracking-[0.15em] text-[#6af3db]">
            {active.label}
          </p>
          <p className="mt-2.5 text-[13px] font-normal leading-relaxed text-slate-200">
            {active.description}
          </p>
        </div>
      </div>

      {/* ANIMATION KEYFRAMES */}
      <style>{`
        @keyframes rcentz-network-rail-flow {
          to { stroke-dashoffset: -50; }
        }

        @keyframes rcentz-network-active-flow {
          to { stroke-dashoffset: -60; }
        }

        .rcentz-network-rail {
          animation: rcentz-network-rail-flow 10s linear infinite;
        }

        .rcentz-network-active {
          animation: rcentz-network-active-flow 3.5s linear infinite;
        }

        @media (prefers-reduced-motion: reduce) {
          .rcentz-network-rail,
          .rcentz-network-active {
            animation: none;
          }
        }
      `}</style>
    </>
  );
}
