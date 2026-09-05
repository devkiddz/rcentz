import { Sparkles } from 'lucide-react';

import type { ServiceSummary } from '../../server/get-services';

import { ServiceSummaryCard } from './ServiceSummaryCard';

interface ServicesSummarySectionProps {
  services: ServiceSummary[];
}

export function ServicesSummarySection({ services }: ServicesSummarySectionProps) {
  if (services.length === 0) {
    return null;
  }

  return (
    <section className="relative py-20 sm:py-24">
      <div className="rcentz-section">
        {/* =========================================
            SECTION INTRO
            ========================================= */}

        <div className="mx-auto max-w-[720px] text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-theme-accent/15 bg-theme-accent-soft px-3 py-1.5">
            <Sparkles className="size-3 text-theme-accent" />

            <span className="font-mono text-[7px] uppercase tracking-[0.16em] text-theme-accent">
              Our services
            </span>
          </div>

          <h2 className="mt-4 text-[2.1rem] font-semibold leading-[1] tracking-[-0.055em] text-foreground sm:text-[3rem]">
            Everything you need to build better digital systems.
          </h2>

          <p className="mx-auto mt-4 max-w-[560px] text-[11px] leading-6 text-muted sm:text-[13px]">
            Explore focused services across websites, applications, business systems, commerce, modernization
            and technical consulting.
          </p>
        </div>

        {/* =========================================
            SERVICES GRID
            ========================================= */}

        <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {services.map(service => (
            <ServiceSummaryCard key={service.id} service={service} />
          ))}
        </div>
      </div>
    </section>
  );
}
