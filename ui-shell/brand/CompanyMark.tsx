import Image from 'next/image';

import type { CSSProperties } from 'react';

import { companyMarks } from '@/ui-shell/brand/company-marks';

import type {
  CompanyMarkDefinition,
  CompanyMarkName,
  CompanyMarkSource
} from '@/ui-shell/brand/company-marks';

type CompanyMarkPresentation = 'mark' | 'logo';

type CompanyMarkTone = 'current' | 'brand';

type CompanyMarkProps = {
  company: CompanyMarkName;

  /**
   * mark:
   * Compact icon/symbol.
   *
   * logo:
   * Wider official wordmark when one
   * exists in the registry.
   *
   * If no dedicated logo exists,
   * CompanyMark falls back to the mark.
   */
  presentation?: CompanyMarkPresentation;

  /**
   * current:
   * Inline SVG follows surrounding text.
   *
   * brand:
   * Inline SVG uses the official
   * company accent.
   */
  tone?: CompanyMarkTone;

  /**
   * mark:
   * width + height.
   *
   * logo:
   * requested visual height.
   */
  size?: number;

  className?: string;

  /**
   * Most marks sit beside readable text,
   * therefore they are decorative by default.
   */
  decorative?: boolean;
};

export function CompanyMark({
  company,

  presentation = 'mark',

  tone = 'current',

  size = 20,

  className,

  decorative = true
}: CompanyMarkProps) {
  /**
   * companyMarks intentionally preserves exact
   * literal definitions through `satisfies`.
   *
   * Once one company has been selected, widen
   * that specific entry back to the public
   * CompanyMarkDefinition contract.
   *
   * This makes optional members such as `logo`
   * available without weakening the registry.
   */
  const definition: CompanyMarkDefinition = companyMarks[company];

  const source: CompanyMarkSource =
    presentation === 'logo' && definition.logo ? definition.logo : definition.mark;

  const style = {
    '--company-brand': definition.brandColor
  } as CSSProperties;

  return (
    <span
      role={decorative ? undefined : 'img'}
      aria-hidden={decorative ? true : undefined}
      aria-label={decorative ? undefined : definition.label}
      style={style}
      className={['inline-flex', 'shrink-0', 'items-center', 'justify-center', className]
        .filter(Boolean)
        .join(' ')}>
      <CompanyMarkSourceRenderer source={source} presentation={presentation} tone={tone} size={size} />
    </span>
  );
}

type CompanyMarkSourceRendererProps = {
  source: CompanyMarkSource;

  presentation: CompanyMarkPresentation;

  tone: CompanyMarkTone;

  size: number;
};

function CompanyMarkSourceRenderer({ source, presentation, tone, size }: CompanyMarkSourceRendererProps) {
  /* =====================================================
     SIMPLE ICON / INLINE SVG
     ===================================================== */

  if (source.type === 'inline') {
    return (
      <svg
        aria-hidden="true"
        viewBox="0 0 24 24"
        style={{
          width: size,
          height: size,

          color: tone === 'brand' ? `#${source.hex}` : undefined
        }}
        className={['shrink-0', 'fill-current'].join(' ')}>
        <path d={source.path} />
      </svg>
    );
  }

  /* =====================================================
     LIGHT / DARK OFFICIAL ASSET
     ===================================================== */

  if (source.type === 'theme-asset') {
    return (
      <span
        aria-hidden="true"
        style={
          presentation === 'logo'
            ? {
                height: size
              }
            : {
                width: size,

                height: size
              }
        }
        className={['relative', 'inline-flex', 'shrink-0', 'items-center', 'justify-center'].join(' ')}>
        {/* LIGHT THEME */}

        <Image
          src={source.lightSrc}
          alt=""
          width={source.width}
          height={source.height}
          style={
            presentation === 'logo'
              ? {
                  width: 'auto',

                  height: '100%'
                }
              : {
                  width: '100%',

                  height: '100%'
                }
          }
          className={['object-contain', 'dark:hidden'].join(' ')}
        />

        {/* DARK THEME */}

        <Image
          src={source.darkSrc}
          alt=""
          width={source.width}
          height={source.height}
          style={
            presentation === 'logo'
              ? {
                  width: 'auto',

                  height: '100%'
                }
              : {
                  width: '100%',

                  height: '100%'
                }
          }
          className={['hidden', 'object-contain', 'dark:block'].join(' ')}
        />
      </span>
    );
  }

  /* =====================================================
     SINGLE OFFICIAL ASSET
     ===================================================== */

  return (
    <Image
      aria-hidden="true"
      src={source.src}
      alt=""
      width={source.width}
      height={source.height}
      style={
        presentation === 'logo'
          ? {
              width: 'auto',

              height: size
            }
          : {
              width: size,

              height: size
            }
      }
      className={['shrink-0', 'object-contain', source.invertOnDark ? 'dark:invert' : ''].join(' ')}
    />
  );
}
