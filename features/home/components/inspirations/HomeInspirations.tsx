'use client';
import { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import { InspirationNetwork } from './InspirationNetwork';
import { inspirationNodes } from './inspiration-data';
import type { InspirationNodeId } from './inspiration-data';
export function HomeInspirations(){const t=useTranslations('HomeInspirations');const [activeNode,setActiveNode]=useState<InspirationNodeId>('product');useEffect(()=>{const reducedMotion=window.matchMedia('(prefers-reduced-motion: reduce)');if(reducedMotion.matches)return;const currentIndex=inspirationNodes.findIndex(n=>n.id===activeNode);const timeout=window.setTimeout(()=>setActiveNode(inspirationNodes[(currentIndex+1)%inspirationNodes.length].id),9000);return()=>window.clearTimeout(timeout)},[activeNode]);return <section className="rcentz-section relative z-10 pt-24 pb-18 sm:pt-28 sm:pb-22 lg:pt-30 lg:pb-24"><div className="max-w-4xl"><p className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#b8fff5]/62">{t('eyebrow')}</p><h2 className="mt-4 max-w-4xl text-3xl font-semibold tracking-[-0.045em] text-white sm:text-4xl lg:text-5xl">{t('title')}</h2><p className="mt-6 max-w-3xl text-sm leading-7 text-white/54 sm:text-base">{t('description')}</p></div><div className="mt-12 lg:mt-16"><InspirationNetwork activeNode={activeNode} onChange={setActiveNode}/></div></section>}
