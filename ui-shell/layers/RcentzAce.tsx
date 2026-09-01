'use client';

import { useEffect, useRef } from 'react';

const ACE_DOTS = [
  { x: 68, y: 16, delay: 0.1 },
  { x: 52, y: 12, delay: 0.18 },
  { x: 36, y: 16, delay: 0.26 },
  { x: 23, y: 27, delay: 0.34 },
  { x: 16, y: 42, delay: 0.42 },
  { x: 13, y: 58, delay: 0.5 },
  { x: 18, y: 73, delay: 0.58 },
  { x: 29, y: 84, delay: 0.66 },
  { x: 44, y: 90, delay: 0.74 },
  { x: 60, y: 88, delay: 0.82 },
  { x: 73, y: 80, delay: 0.9 },

  { x: 34, y: 35, delay: 1.05, small: true },
  { x: 29, y: 51, delay: 1.14, small: true },
  { x: 35, y: 68, delay: 1.23, small: true }
];

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

export function RcentzAce() {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const rootNode = rootRef.current;

    if (rootNode === null) return;

    const root: HTMLDivElement = rootNode;

    const stageNode = root.querySelector<HTMLElement>('[data-ace-stage]');

    if (stageNode === null) return;

    const stage: HTMLElement = stageNode;

    const pointerQuery = window.matchMedia('(pointer: fine)');

    const reducedMotionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');

    if (!pointerQuery.matches || reducedMotionQuery.matches) {
      return;
    }

    const dots = Array.from(root.querySelectorAll<HTMLElement>('[data-ace-dot]'));

    let frameId = 0;

    let pointerX = window.innerWidth / 2;
    let pointerY = window.innerHeight / 2;
    let pointerActive = false;

    let targetLightX = 0;
    let targetLightY = 0;
    let targetIntensity = 0;

    let currentLightX = 0;
    let currentLightY = 0;
    let currentIntensity = 0;

    const renderLights = () => {
      currentLightX += (targetLightX - currentLightX) * 0.09;

      currentLightY += (targetLightY - currentLightY) * 0.09;

      currentIntensity += (targetIntensity - currentIntensity) * 0.08;

      root.style.setProperty('--ace-light-x', `${currentLightX}px`);

      root.style.setProperty('--ace-light-y', `${currentLightY}px`);

      root.style.setProperty('--ace-light-intensity', `${currentIntensity}`);

      const stageRect = stage.getBoundingClientRect();

      dots.forEach((dot, index) => {
        const definition = ACE_DOTS[index];

        if (!definition) return;

        const dotX = stageRect.left + (definition.x / 100) * stageRect.width;

        const dotY = stageRect.top + (definition.y / 100) * stageRect.height;

        const distance = Math.hypot(pointerX - dotX, pointerY - dotY);

        const proximity = pointerActive ? clamp(1 - distance / 145, 0, 1) : 0;

        dot.style.setProperty('--dot-near', `${proximity}`);
      });

      const moving =
        Math.abs(targetLightX - currentLightX) > 0.05 ||
        Math.abs(targetLightY - currentLightY) > 0.05 ||
        Math.abs(targetIntensity - currentIntensity) > 0.002;

      if (moving) {
        frameId = window.requestAnimationFrame(renderLights);
      } else {
        frameId = 0;
      }
    };

    const requestLightFrame = () => {
      if (frameId !== 0) return;

      frameId = window.requestAnimationFrame(renderLights);
    };

    const handlePointerMove = (event: PointerEvent) => {
      pointerActive = true;

      pointerX = event.clientX;
      pointerY = event.clientY;

      const stageRect = stage.getBoundingClientRect();

      const centerX = stageRect.left + stageRect.width / 2;

      const centerY = stageRect.top + stageRect.height / 2;

      const relativeX = (event.clientX - centerX) / (stageRect.width / 2);

      const relativeY = (event.clientY - centerY) / (stageRect.height / 2);

      /*
       * Pointer controls the light only.
       * The C formation itself remains fixed.
       */
      targetLightX = clamp(relativeX, -1, 1) * 120;

      targetLightY = clamp(relativeY, -1, 1) * 120;

      const distanceFromCenter = Math.hypot(event.clientX - centerX, event.clientY - centerY);

      targetIntensity = clamp(1 - distanceFromCenter / 440, 0, 1);

      requestLightFrame();
    };

    const handlePointerLeave = () => {
      pointerActive = false;

      targetLightX = 0;
      targetLightY = 0;
      targetIntensity = 0;

      dots.forEach(dot => {
        dot.style.setProperty('--dot-near', '0');
      });

      requestLightFrame();
    };

    window.addEventListener('pointermove', handlePointerMove, {
      passive: true
    });

    document.documentElement.addEventListener('pointerleave', handlePointerLeave);

    return () => {
      window.removeEventListener('pointermove', handlePointerMove);

      document.documentElement.removeEventListener('pointerleave', handlePointerLeave);

      if (frameId !== 0) {
        window.cancelAnimationFrame(frameId);
      }
    };
  }, []);

  return (
    <div
      ref={rootRef}
      aria-hidden="true"
      className="rcentz-ace-layer pointer-events-none absolute inset-0 overflow-hidden">
      <div data-ace-stage className="rcentz-ace">
        <div className="rcentz-ace__formation">
          <div className="rcentz-ace__halo" />

          <div className="rcentz-ace__pointer-light" />

          <div className="rcentz-ace__arc" />

          {ACE_DOTS.map((dot, index) => (
            <span
              key={`${dot.x}-${dot.y}-${index}`}
              data-ace-dot
              className="rcentz-ace__dot-anchor"
              style={{
                left: `${dot.x}%`,
                top: `${dot.y}%`
              }}>
              <span
                className={['rcentz-ace__dot', dot.small ? 'rcentz-ace__dot--small' : ''].join(' ')}
                style={{
                  animationDelay: `${dot.delay}s`
                }}
              />
            </span>
          ))}

          <div className="rcentz-ace__traveller" />
        </div>
      </div>

      <style>{`
        /* ==================================================
           RCENTZ ACE

           Theme colors are controlled entirely by
           globals.css.

           No OS color-scheme detection lives here.
        ================================================== */

        .rcentz-ace-layer {
          --ace-light-x: 0px;
          --ace-light-y: 0px;
          --ace-light-intensity: 0;
        }

        /* ==================================================
           FIXED CENTER STAGE
        ================================================== */

        .rcentz-ace {
          position: absolute;

          width: 460px;
          height: 460px;

          left: 50%;
          top: 50%;

          transform:
            translate(-50%, -50%);

          filter:
            drop-shadow(
              0 0 30px
              var(--ace-ink-faint)
            );
        }

        /*
         * The C itself never follows
         * the pointer.
         */
        .rcentz-ace__formation {
          position: absolute;
          inset: 0;

          opacity: 0;

          animation:
            rcentz-ace-appear
            28s
            ease-in-out
            infinite;

          will-change:
            opacity,
            scale;
        }

        /* ==================================================
           BASE HALO
        ================================================== */

        .rcentz-ace__halo {
          position: absolute;

          inset: 10%;

          border-radius: 999px;

          background:
            radial-gradient(
              circle,
              var(--ace-ink-soft),
              var(--ace-ink-faint) 38%,
              transparent 70%
            );

          filter: blur(34px);

          animation:
            rcentz-ace-breathe
            9s
            ease-in-out
            infinite;
        }

        /* ==================================================
           POINTER LIGHT
        ================================================== */

        .rcentz-ace__pointer-light {
          position: absolute;

          width: 190px;
          height: 190px;

          left: 50%;
          top: 50%;

          translate:
            calc(
              -50% +
              var(--ace-light-x)
            )
            calc(
              -50% +
              var(--ace-light-y)
            );

          border-radius: 999px;

          background:
            radial-gradient(
              circle,
              var(--ace-ink-medium),
              var(--ace-ink-faint) 30%,
              transparent 72%
            );

          filter: blur(18px);

          opacity:
            calc(
              0.22 +
              var(--ace-light-intensity) *
              0.78
            );

          will-change:
            translate,
            opacity;
        }

        /* ==================================================
           C ARC
        ================================================== */

        .rcentz-ace__arc {
          position: absolute;

          inset: 9%;

          border-radius: 999px;

          background:
            conic-gradient(
              from 42deg,

              transparent 0deg,
              transparent 58deg,

              var(--ace-ink-faint) 74deg,
              var(--ace-ink-medium) 108deg,
              var(--ace-ink-soft) 155deg,

              var(--ace-ink-medium) 205deg,
              var(--ace-ink-soft) 255deg,

              var(--ace-ink-strong) 292deg,

              transparent 318deg,
              transparent 360deg
            );

          /*
           * #000 here is mask mathematics,
           * not an application/theme color.
           */
          mask:
            radial-gradient(
              farthest-side,
              transparent
                calc(100% - 2px),
              #000
                calc(100% - 1px)
            );

          opacity: 0.55;

          animation:
            rcentz-ace-rotate
            34s
            linear
            infinite;
        }

        /* ==================================================
           DOT POSITIONS
        ================================================== */

        .rcentz-ace__dot-anchor {
          position: absolute;

          width: 0;
          height: 0;
        }

        .rcentz-ace__dot {
          position: absolute;

          width: 10px;
          height: 10px;

          left: 0;
          top: 0;

          border-radius: 999px;

          background:
            var(--ace-ink);

          opacity: 0;

          transform:
            translate(-50%, -50%)
            scale(0);

          filter:
            brightness(
              calc(
                1 +
                var(--dot-near, 0) *
                1.1
              )
            );

          box-shadow:
            0 0
              calc(
                8px +
                var(--dot-near, 0) *
                7px
              )
              var(--ace-ink-strong),

            0 0
              calc(
                24px +
                var(--dot-near, 0) *
                22px
              )
              var(--ace-ink-medium),

            0 0
              calc(
                50px +
                var(--dot-near, 0) *
                35px
              )
              var(--ace-ink-soft);

          animation:
            rcentz-ace-dot
            28s
            cubic-bezier(
              0.4,
              0,
              0.2,
              1
            )
            infinite;

          will-change:
            opacity,
            transform,
            filter;
        }

        /* ==================================================
           PROXIMITY GLOW
        ================================================== */

        .rcentz-ace__dot::after {
          content: '';

          position: absolute;

          width: 42px;
          height: 42px;

          left: 50%;
          top: 50%;

          transform:
            translate(-50%, -50%);

          border-radius: 999px;

          background:
            radial-gradient(
              circle,
              var(--ace-ink-medium),
              var(--ace-ink-soft) 28%,
              transparent 72%
            );

          filter: blur(6px);

          opacity:
            calc(
              var(--dot-near, 0) *
              0.95
            );
        }

        .rcentz-ace__dot--small {
          width: 4px;
          height: 4px;
        }

        .rcentz-ace__dot--small::after {
          width: 25px;
          height: 25px;
        }

        /* ==================================================
           AUTONOMOUS TRAVELLING LIGHT
        ================================================== */

        .rcentz-ace__traveller {
          position: absolute;

          width: 70px;
          height: 70px;

          left: 50%;
          top: 50%;

          margin:
            -35px 0 0 -35px;

          border-radius: 999px;

          background:
            radial-gradient(
              circle,
              var(--ace-ink-strong),
              var(--ace-ink-soft) 18%,
              transparent 65%
            );

          filter:
            blur(7px)
            brightness(
              calc(
                1 +
                var(--ace-light-intensity) *
                0.35
              )
            );

          opacity: 0;

          transform-origin:
            35px 35px;

          animation:
            rcentz-ace-travel
            20s
            linear
            infinite;
        }

        /* ==================================================
           C LIFECYCLE
        ================================================== */

        @keyframes rcentz-ace-appear {
          0%,
          8% {
            opacity: 0;
            scale: 0.86;
          }

          17% {
            opacity: 0.4;
          }

          24%,
          76% {
            opacity: 1;
            scale: 1;
          }

          84% {
            opacity: 0.48;
            scale: 1.025;
          }

          93%,
          100% {
            opacity: 0;
            scale: 1.06;
          }
        }

        @keyframes rcentz-ace-dot {
          0%,
          8% {
            opacity: 0;

            transform:
              translate(-50%, -50%)
              scale(0);
          }

          17% {
            opacity: 0.4;
          }

          24% {
            opacity: 0.95;

            transform:
              translate(-50%, -50%)
              scale(1.32);
          }

          30%,
          76% {
            opacity: 0.9;

            transform:
              translate(-50%, -50%)
              scale(1);
          }

          84% {
            opacity: 0.3;

            transform:
              translate(-50%, -50%)
              scale(0.8);
          }

          93%,
          100% {
            opacity: 0;

            transform:
              translate(-50%, -50%)
              scale(0);
          }
        }

        @keyframes rcentz-ace-breathe {
          0%,
          100% {
            opacity: 0.26;
            transform: scale(0.9);
          }

          50% {
            opacity: 0.68;
            transform: scale(1.08);
          }
        }

        @keyframes rcentz-ace-rotate {
          from {
            transform: rotate(0deg);
          }

          to {
            transform: rotate(360deg);
          }
        }

        @keyframes rcentz-ace-travel {
          0% {
            opacity: 0;

            transform:
              rotate(40deg)
              translateX(168px);
          }

          12% {
            opacity: 0.7;
          }

          40% {
            opacity: 0.26;
          }

          68% {
            opacity: 0.58;
          }

          88% {
            opacity: 0.16;
          }

          100% {
            opacity: 0;

            transform:
              rotate(340deg)
              translateX(168px);
          }
        }

        /* ==================================================
           MOBILE
        ================================================== */

        @media (max-width: 767px) {
          .rcentz-ace {
            width: 280px;
            height: 280px;

            left: 50%;
            top: 42%;
          }

          .rcentz-ace__pointer-light {
            display: none;
          }

          .rcentz-ace__dot {
            width: 7px;
            height: 7px;
          }

          .rcentz-ace__dot--small {
            width: 3px;
            height: 3px;
          }

          .rcentz-ace__traveller {
            display: none;
          }
        }

        /* ==================================================
           REDUCED MOTION
        ================================================== */

        @media (prefers-reduced-motion: reduce) {
          .rcentz-ace__formation,
          .rcentz-ace__arc,
          .rcentz-ace__dot,
          .rcentz-ace__halo,
          .rcentz-ace__traveller {
            animation: none;
          }

          .rcentz-ace__formation {
            opacity: 0.3;
            scale: 1;
          }

          .rcentz-ace__pointer-light {
            display: none;
          }

          .rcentz-ace__dot {
            opacity: 0.38;

            transform:
              translate(-50%, -50%)
              scale(1);
          }
        }
      `}</style>
    </div>
  );
}
