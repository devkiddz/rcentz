'use client';

import type { CSSProperties } from 'react';

import type { InspirationNode } from './inspiration-data';

type InspirationCapsuleProps = {
  node: InspirationNode;
  active?: boolean;
  compact?: boolean;
  onSelect?: () => void;
};

export function InspirationCapsule({
  node,
  active = false,
  compact = false,
  onSelect
}: InspirationCapsuleProps) {
  const Icon = node.icon;

  const style = {
    '--capsule-accent': '#6af3db'
  } as CSSProperties;

  return (
    <button
      type="button"
      onClick={onSelect}
      aria-pressed={active}
      style={style}
      className={[
        'group relative inline-flex items-center gap-2.5 overflow-hidden rounded-full border backdrop-blur-md',
        'transition-[transform,background-color,border-color,box-shadow,color] duration-300 ease-out',
        compact ? 'h-9 px-2.5 pr-4' : 'h-10 px-2.5 pr-4.5',
        active
          ? [
              'border-[#6af3db]/35 bg-white/[0.08] text-white',
              'shadow-[0_0_0_1px_rgba(106,243,219,0.06),0_0_24px_rgba(106,243,219,0.10)]'
            ].join(' ')
          : [
              'border-white/[0.10] bg-white/[0.035] text-white/72',
              'hover:border-white/[0.16] hover:bg-white/[0.06] hover:text-white'
            ].join(' ')
      ].join(' ')}>
      <span
        aria-hidden="true"
        className={[
          'absolute inset-0 opacity-0 transition-opacity duration-300',
          active
            ? 'bg-[radial-gradient(circle_at_20%_50%,rgba(106,243,219,0.14),transparent_64%)] opacity-100'
            : ''
        ].join(' ')}
      />

      <span
        className={[
          'relative z-10 flex shrink-0 items-center justify-center rounded-full border',
          compact ? 'size-6.5' : 'size-7',
          active
            ? 'border-[#6af3db]/28 bg-[#6af3db]/12 text-[#aefaf0]'
            : 'border-white/[0.10] bg-black/15 text-white/72'
        ].join(' ')}>
        <Icon
          aria-hidden="true"
          className={[
            compact ? 'size-3.25' : 'size-3.5',
            active ? 'rcentz-inspiration-icon-active' : 'rcentz-inspiration-icon-idle'
          ].join(' ')}
        />
      </span>

      <span
        className={[
          'relative z-10 whitespace-nowrap font-medium tracking-[-0.015em]',
          compact ? 'text-[10.5px]' : 'text-[11px]'
        ].join(' ')}>
        {node.shortLabel}
      </span>

      {active ? (
        <span
          aria-hidden="true"
          className="absolute right-3 size-1.5 rounded-full bg-[#6af3db] shadow-[0_0_10px_rgba(106,243,219,0.85)]"
        />
      ) : null}
    </button>
  );
}
