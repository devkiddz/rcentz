'use client';

import { useEffect, useRef } from 'react';

const STAR_COUNT = 42;
const PATH_COUNT = 7;

const STAR_SLOTS = Array.from({ length: STAR_COUNT }, (_, index) => index);

const PATH_SLOTS = Array.from({ length: PATH_COUNT }, (_, index) => index);

function randomBetween(min: number, max: number) {
  return min + Math.random() * (max - min);
}

function randomItem<T>(items: T[]) {
  return items[Math.floor(Math.random() * items.length)];
}

export function RcentzDataField() {
  const fieldRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const field = fieldRef.current;

    if (!field) return;

    const stars = Array.from(field.querySelectorAll<HTMLElement>('[data-rcentz-star]'));

    const paths = Array.from(field.querySelectorAll<HTMLElement>('[data-rcentz-path]'));

    function randomizeStar(star: HTMLElement) {
      const size = randomBetween(1.2, 3.4);
      const intensity = randomBetween(0.35, 0.95);

      star.style.setProperty('--star-x', `${randomBetween(2, 98)}%`);

      star.style.setProperty('--star-y', `${randomBetween(3, 97)}%`);

      star.style.setProperty('--star-size', `${size}px`);

      star.style.setProperty('--star-opacity', `${intensity}`);

      star.style.setProperty('--star-delay', `${randomBetween(0, 7)}s`);

      star.style.setProperty('--star-duration', `${randomBetween(4.5, 10)}s`);

      star.style.setProperty('--star-glow', `${randomBetween(5, 18)}px`);
    }

    function randomizePath(path: HTMLElement) {
      const horizontal = Math.random() >= 0.5;

      path.dataset.direction = horizontal ? 'horizontal' : 'vertical';

      path.style.setProperty('--path-x', `${randomBetween(4, 92)}%`);

      path.style.setProperty('--path-y', `${randomBetween(5, 92)}%`);

      path.style.setProperty('--path-delay', `${randomBetween(0, 6)}s`);

      path.style.setProperty('--path-duration', `${randomBetween(5, 10)}s`);

      path.style.setProperty('--path-length', `${randomBetween(5, 13)}vw`);
    }

    stars.forEach(randomizeStar);
    paths.forEach(randomizePath);

    const starTimer = window.setInterval(() => {
      const updates = Math.floor(randomBetween(3, 8));

      for (let index = 0; index < updates; index += 1) {
        const star = randomItem(stars);

        if (star) {
          randomizeStar(star);
        }
      }
    }, 3600);

    const pathTimer = window.setInterval(() => {
      const path = randomItem(paths);

      if (path) {
        randomizePath(path);
      }
    }, 6400);

    return () => {
      window.clearInterval(starTimer);
      window.clearInterval(pathTimer);
    };
  }, []);

  return (
    <div
      ref={fieldRef}
      aria-hidden="true"
      className="rcentz-data-field pointer-events-none absolute inset-0 overflow-hidden">
      <div className="rcentz-data-field__grid absolute inset-0" />

      <div className="rcentz-data-field__glow rcentz-data-field__glow--top" />

      <div className="rcentz-data-field__glow rcentz-data-field__glow--bottom" />

      {STAR_SLOTS.map(slot => (
        <span
          key={slot}
          data-rcentz-star
          className={[
            'rcentz-data-field__star',
            slot % 2 === 0 ? 'rcentz-data-field__star--mobile-hidden' : ''
          ].join(' ')}
        />
      ))}

      {PATH_SLOTS.map(slot => (
        <span key={slot} data-rcentz-path data-direction="horizontal" className="rcentz-data-field__path" />
      ))}

      <div className="rcentz-data-field__pulse" />

      <div className="rcentz-data-field__mask absolute inset-0" />

      <style>{`
        /* ==================================================
           RCENTZ DATA FIELD

           All visual colors come from globals.css.

           There is intentionally NO prefers-color-scheme
           logic inside this component.
        ================================================== */

        .rcentz-data-field {
          --field-grid-size: 32px;

          isolation: isolate;
        }

        /* ==================================================
           GRID
        ================================================== */

        .rcentz-data-field__grid {
          background-image:
            linear-gradient(
              to right,
              var(--grid-line) 1px,
              transparent 1px
            ),
            linear-gradient(
              to bottom,
              var(--grid-line) 1px,
              transparent 1px
            );

          background-size:
            var(--field-grid-size)
            var(--field-grid-size),
            var(--field-grid-size)
            var(--field-grid-size);

          mask-image:
            linear-gradient(
              to bottom,
              transparent 0%,
              black 5%,
              black 92%,
              transparent 100%
            );
        }

        /* ==================================================
           STARS
        ================================================== */

        .rcentz-data-field__star {
          position: absolute;

          left: var(--star-x, 50%);
          top: var(--star-y, 50%);

          width: var(--star-size, 2px);
          height: var(--star-size, 2px);

          border-radius: 999px;

          background:
            var(--environment-star);

          opacity: 0;

          box-shadow:
            0 0 3px
              var(--environment-star-glow-strong),

            0 0
              var(--star-glow, 10px)
              var(--environment-star-glow),

            0 0
              calc(
                var(--star-glow, 10px) * 2
              )
              var(--environment-star-glow-soft);

          animation:
            rcentz-star-twinkle
            var(--star-duration, 7s)
            ease-in-out
            var(--star-delay, 0s)
            infinite;

          will-change:
            opacity,
            transform;
        }

        .rcentz-data-field__star::after {
          content: '';

          position: absolute;

          left: 50%;
          top: 50%;

          width: 1px;
          height: 1px;

          transform:
            translate(-50%, -50%);

          border-radius: 999px;

          background:
            var(--environment-star);

          opacity: 0;

          box-shadow:
            -5px 0 5px
              var(--environment-star-glow),

            5px 0 5px
              var(--environment-star-glow),

            0 -5px 5px
              var(--environment-star-glow-soft),

            0 5px 5px
              var(--environment-star-glow-soft);

          animation:
            rcentz-star-flare
            var(--star-duration, 7s)
            ease-in-out
            var(--star-delay, 0s)
            infinite;
        }

        @keyframes rcentz-star-twinkle {
          0%,
          100% {
            opacity: 0;
            transform: scale(0.35);
          }

          12% {
            opacity: 0;
          }

          20% {
            opacity:
              calc(
                var(--star-opacity, 0.6) * 0.35
              );

            transform: scale(0.75);
          }

          27% {
            opacity:
              var(--star-opacity, 0.6);

            transform: scale(1.35);
          }

          34% {
            opacity:
              calc(
                var(--star-opacity, 0.6) * 0.58
              );

            transform: scale(0.9);
          }

          43% {
            opacity:
              calc(
                var(--star-opacity, 0.6) * 0.18
              );
          }

          52% {
            opacity: 0;
            transform: scale(0.55);
          }
        }

        @keyframes rcentz-star-flare {
          0%,
          22%,
          100% {
            opacity: 0;

            transform:
              translate(-50%, -50%)
              scale(0.4);
          }

          27% {
            opacity: 0.7;

            transform:
              translate(-50%, -50%)
              scale(1);
          }

          32% {
            opacity: 0;

            transform:
              translate(-50%, -50%)
              scale(1.4);
          }
        }

        /* ==================================================
           DATA SIGNALS
        ================================================== */

        .rcentz-data-field__path {
          position: absolute;

          left: var(--path-x, 50%);
          top: var(--path-y, 50%);

          opacity: 0;

          filter:
            drop-shadow(
              0 0 3px
              var(--environment-signal-soft)
            );

          will-change:
            opacity,
            transform;
        }

        .rcentz-data-field__path[
          data-direction='horizontal'
        ] {
          width:
            var(--path-length, 8vw);

          height: 1px;

          transform-origin: left;

          background:
            linear-gradient(
              90deg,
              transparent,
              var(--environment-signal-soft),
              var(--environment-signal),
              var(--environment-signal-soft),
              transparent
            );

          animation:
            rcentz-path-horizontal
            var(--path-duration, 7s)
            ease-in-out
            var(--path-delay, 0s)
            infinite;
        }

        .rcentz-data-field__path[
          data-direction='vertical'
        ] {
          width: 1px;

          height:
            var(--path-length, 8vw);

          transform-origin: top;

          background:
            linear-gradient(
              180deg,
              transparent,
              var(--environment-signal-soft),
              var(--environment-signal),
              var(--environment-signal-soft),
              transparent
            );

          animation:
            rcentz-path-vertical
            var(--path-duration, 7s)
            ease-in-out
            var(--path-delay, 0s)
            infinite;
        }

        @keyframes rcentz-path-horizontal {
          0%,
          14% {
            opacity: 0;
            transform: scaleX(0);
          }

          24% {
            opacity: 0.32;
          }

          46% {
            opacity: 0.12;
            transform: scaleX(1);
          }

          64%,
          100% {
            opacity: 0;
            transform: scaleX(1);
          }
        }

        @keyframes rcentz-path-vertical {
          0%,
          14% {
            opacity: 0;
            transform: scaleY(0);
          }

          24% {
            opacity: 0.28;
          }

          46% {
            opacity: 0.1;
            transform: scaleY(1);
          }

          64%,
          100% {
            opacity: 0;
            transform: scaleY(1);
          }
        }

        /* ==================================================
           AMBIENT LIGHT
        ================================================== */

        .rcentz-data-field__glow {
          position: absolute;

          width: 58rem;
          height: 58rem;

          border-radius: 999px;

          filter: blur(120px);

          opacity: 0.1;

          will-change: transform;
        }

        .rcentz-data-field__glow--top {
          left: 12%;
          top: -39rem;

          background:
            radial-gradient(
              circle,
              var(--environment-glow-top),
              transparent 66%
            );

          animation:
            rcentz-glow-top
            25s
            ease-in-out
            infinite
            alternate;
        }

        .rcentz-data-field__glow--bottom {
          right: -31rem;
          bottom: -37rem;

          background:
            radial-gradient(
              circle,
              var(--environment-glow-bottom),
              transparent 68%
            );

          animation:
            rcentz-glow-bottom
            31s
            ease-in-out
            infinite
            alternate;
        }

        @keyframes rcentz-glow-top {
          from {
            transform:
              translate3d(-8%, 0, 0)
              scale(0.9);
          }

          to {
            transform:
              translate3d(18%, 12%, 0)
              scale(1.14);
          }
        }

        @keyframes rcentz-glow-bottom {
          from {
            transform:
              translate3d(0, 0, 0)
              scale(0.95);
          }

          to {
            transform:
              translate3d(-20%, -16%, 0)
              scale(1.12);
          }
        }

        /* ==================================================
           CENTER BREATH
        ================================================== */

        .rcentz-data-field__pulse {
          position: absolute;

          left: 50%;
          top: 48%;

          width: 34rem;
          height: 34rem;

          transform:
            translate(-50%, -50%);

          border-radius: 999px;

          background:
            radial-gradient(
              circle,
              var(--environment-pulse),
              transparent 68%
            );

          filter: blur(34px);

          animation:
            rcentz-field-pulse
            12s
            ease-in-out
            infinite;
        }

        @keyframes rcentz-field-pulse {
          0%,
          100% {
            opacity: 0.16;

            transform:
              translate(-50%, -50%)
              scale(0.82);
          }

          50% {
            opacity: 0.48;

            transform:
              translate(-50%, -50%)
              scale(1.18);
          }
        }

        /* ==================================================
           ENVIRONMENT MASK
        ================================================== */

        .rcentz-data-field__mask {
          background:
            radial-gradient(
              circle at 50% 45%,

              transparent 0%,
              transparent 25%,

              var(--environment-mask-soft)
                52%,

              var(--environment-mask)
                82%,

              var(--environment-mask-strong)
                100%
            );
        }

        /* ==================================================
           MOBILE
        ================================================== */

        @media (max-width: 767px) {
          .rcentz-data-field {
            --field-grid-size: 40px;
          }

          .rcentz-data-field__star--mobile-hidden {
            display: none;
          }

          .rcentz-data-field__glow {
            width: 34rem;
            height: 34rem;
          }

          .rcentz-data-field__pulse {
            width: 22rem;
            height: 22rem;
          }

          .rcentz-data-field__path {
            opacity: 0.7;
          }
        }

        /* ==================================================
           REDUCED MOTION
        ================================================== */

        @media (prefers-reduced-motion: reduce) {
          .rcentz-data-field__star,
          .rcentz-data-field__star::after,
          .rcentz-data-field__path,
          .rcentz-data-field__glow,
          .rcentz-data-field__pulse {
            animation: none;
          }

          .rcentz-data-field__star {
            opacity: 0.22;
            transform: scale(1);
          }

          .rcentz-data-field__star::after,
          .rcentz-data-field__path {
            display: none;
          }
        }
      `}</style>
    </div>
  );
}
