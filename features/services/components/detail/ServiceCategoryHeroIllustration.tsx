import {
  Boxes,
  Gamepad2,
  Landmark,
  MapPinned,
  Route,
  ShieldCheck,
  Sparkles,
  WalletCards
} from 'lucide-react';

import { getTranslations } from 'next-intl/server';

import { BusinessSystemsIllustration } from '../hero/BusinessSystemsIllustration';
import { MaintenanceModernizationIllustration } from '../hero/MaintenanceModernizationIllustration';
import { MobileAdaptiveIllustration } from '../hero/MobileAdaptiveIllustration';
import { TechnicalConsultingIllustration } from '../hero/TechnicalConsultingIllustration';
import { WebDevelopmentIllustration } from '../hero/WebDevelopmentIllustration';
import { WordPressIllustration } from '../hero/WordPressIllustration';

type ServiceCategoryHeroIllustrationProps = {
  categorySlug?: string | null;
  categoryName?: string | null;
};

type GamingPlatformVisualProps = {
  platformLabel: string;
};

function FinancialPlatformVisual() {
  return (
    <div className="relative mx-auto h-[360px] w-full max-w-[720px] sm:h-[430px]">
      <div className="absolute left-[7%] top-[16%] w-[58%] rounded-[28px] border border-border bg-background/90 p-5 shadow-[0_18px_55px_rgba(0,0,0,0.06)] backdrop-blur-xl sm:p-7">
        <div className="flex items-center justify-between">
          <div>
            <p className="font-mono text-[7px] uppercase tracking-[0.14em] text-muted">Financial workspace</p>

            <p className="mt-2 text-[24px] font-semibold tracking-[-0.05em] text-foreground">₦4,850,200</p>
          </div>

          <div className="flex size-11 items-center justify-center rounded-[15px] bg-theme-accent-soft">
            <Landmark className="size-5 text-theme-accent" />
          </div>
        </div>

        <div className="mt-6 grid grid-cols-3 gap-2">
          {[42, 68, 53, 81, 62, 88, 72, 91, 78].map((height, index) => (
            <div key={index} className="flex h-16 items-end rounded-[10px] bg-surface-muted/35 px-1.5 pb-1.5">
              <div
                className="w-full rounded-[5px] bg-theme-accent/65"
                style={{
                  height: `${height}%`
                }}
              />
            </div>
          ))}
        </div>
      </div>

      <div className="absolute right-[7%] top-[8%] flex w-[31%] flex-col gap-3 rounded-[24px] border border-border bg-background/95 p-4 shadow-[0_16px_45px_rgba(0,0,0,0.055)]">
        <div className="flex size-10 items-center justify-center rounded-[14px] bg-theme-accent-soft">
          <WalletCards className="size-4 text-theme-accent" />
        </div>

        <p className="text-[10px] font-medium text-foreground">Account activity</p>

        <div className="space-y-2">
          <div className="h-2 rounded-full bg-foreground/10" />
          <div className="h-2 w-3/4 rounded-full bg-foreground/10" />
          <div className="h-2 w-1/2 rounded-full bg-theme-accent/40" />
        </div>
      </div>

      <div className="absolute bottom-[8%] right-[14%] flex items-center gap-2 rounded-full border border-theme-accent/20 bg-background/90 px-4 py-2 shadow-sm backdrop-blur">
        <ShieldCheck className="size-4 text-theme-accent" />

        <span className="text-[9px] font-medium text-foreground">Structured access</span>
      </div>
    </div>
  );
}

function LogisticsPlatformVisual() {
  return (
    <div className="relative mx-auto h-[360px] w-full max-w-[720px] sm:h-[430px]">
      <div className="absolute inset-x-[8%] bottom-[10%] top-[11%] rounded-[30px] border border-border bg-background/90 p-5 shadow-[0_18px_55px_rgba(0,0,0,0.055)] backdrop-blur-xl">
        <div className="flex items-center justify-between">
          <div>
            <p className="font-mono text-[7px] uppercase tracking-[0.14em] text-muted">Delivery operations</p>

            <p className="mt-2 text-[18px] font-semibold tracking-[-0.04em] text-foreground">
              Shipment tracking
            </p>
          </div>

          <div className="flex size-11 items-center justify-center rounded-[15px] bg-theme-accent-soft">
            <MapPinned className="size-5 text-theme-accent" />
          </div>
        </div>

        <div className="relative mt-9 h-[160px]">
          <div className="absolute left-[12%] right-[12%] top-1/2 h-px bg-border" />

          {[
            {
              left: '8%',
              label: 'Collected'
            },
            {
              left: '38%',
              label: 'Transit'
            },
            {
              left: '68%',
              label: 'Hub'
            },
            {
              left: '88%',
              label: 'Delivery'
            }
          ].map((step, index) => (
            <div
              key={step.label}
              className="absolute top-1/2 -translate-x-1/2 -translate-y-1/2"
              style={{
                left: step.left
              }}>
              <div
                className={[
                  'mx-auto flex size-9 items-center justify-center rounded-full border',
                  index <= 2 ? 'border-theme-accent/20 bg-theme-accent-soft' : 'border-border bg-background'
                ].join(' ')}>
                <span className="font-mono text-[7px] text-theme-accent">
                  {String(index + 1).padStart(2, '0')}
                </span>
              </div>

              <p className="mt-3 whitespace-nowrap text-[8px] text-muted">{step.label}</p>
            </div>
          ))}

          <Route className="absolute bottom-0 right-3 size-8 text-theme-accent/45" />
        </div>
      </div>
    </div>
  );
}

function GamingPlatformVisual({ platformLabel }: GamingPlatformVisualProps) {
  return (
    <div className="relative mx-auto h-[360px] w-full max-w-[720px] sm:h-[430px]">
      <div className="absolute left-[8%] top-[12%] w-[60%] rounded-[30px] border border-border bg-background/90 p-6 shadow-[0_18px_55px_rgba(0,0,0,0.055)] backdrop-blur-xl">
        <div className="flex items-center justify-between">
          <div>
            <p className="font-mono text-[7px] uppercase tracking-[0.14em] text-muted">{platformLabel}</p>

            <p className="mt-2 text-[20px] font-semibold tracking-[-0.045em] text-foreground">
              Player experience
            </p>
          </div>

          <div className="flex size-12 items-center justify-center rounded-[16px] bg-theme-accent-soft">
            <Gamepad2 className="size-5 text-theme-accent" />
          </div>
        </div>

        <div className="mt-7 grid grid-cols-2 gap-3">
          <div className="rounded-[18px] border border-border bg-surface-muted/25 p-4">
            <WalletCards className="size-4 text-theme-accent" />

            <p className="mt-5 text-[9px] font-medium text-foreground">Wallet</p>
          </div>

          <div className="rounded-[18px] border border-border bg-surface-muted/25 p-4">
            <Sparkles className="size-4 text-theme-accent" />

            <p className="mt-5 text-[9px] font-medium text-foreground">Activity</p>
          </div>
        </div>
      </div>

      <div className="absolute bottom-[11%] right-[8%] flex w-[30%] flex-col rounded-[24px] border border-border bg-background/95 p-4 shadow-[0_15px_45px_rgba(0,0,0,0.05)]">
        <Boxes className="size-5 text-theme-accent" />

        <p className="mt-5 text-[9px] font-medium text-foreground">Platform controls</p>

        <div className="mt-3 space-y-2">
          <div className="h-2 rounded-full bg-foreground/10" />
          <div className="h-2 w-3/4 rounded-full bg-theme-accent/35" />
        </div>
      </div>
    </div>
  );
}

export async function ServiceCategoryHeroIllustration({
  categorySlug,
  categoryName
}: ServiceCategoryHeroIllustrationProps) {
  const t = await getTranslations('ServiceRichCard');

  switch (categorySlug) {
    case 'web-development':
      return <WebDevelopmentIllustration />;

    case 'wordpress':
      return <WordPressIllustration />;

    case 'mobile-adaptive-experiences':
      return <MobileAdaptiveIllustration />;

    case 'business-systems':
      return <BusinessSystemsIllustration />;

    case 'ecommerce':
      return <BusinessSystemsIllustration />;

    case 'maintenance-modernization':
      return <MaintenanceModernizationIllustration />;

    case 'technical-consulting':
      return <TechnicalConsultingIllustration />;

    case 'financial-regulated-platforms':
      return <FinancialPlatformVisual />;

    case 'logistics-tracking-systems':
      return <LogisticsPlatformVisual />;

    case 'gaming-interactive-platforms':
      return <GamingPlatformVisual platformLabel={t('visualLabels.interactivePlatform')} />;

    default:
      return (
        <div className="relative mx-auto flex h-[330px] w-full max-w-[680px] items-center justify-center sm:h-[400px]">
          <div className="absolute size-64 rounded-full bg-theme-accent-faint blur-3xl" />

          <div className="relative flex flex-col items-center rounded-[30px] border border-border bg-background/80 px-10 py-12 text-center shadow-[0_18px_55px_rgba(0,0,0,0.05)] backdrop-blur-xl">
            <Boxes className="size-9 text-theme-accent" />

            <p className="mt-5 text-[14px] font-semibold tracking-[-0.03em] text-foreground">
              {categoryName ?? t('visualLabels.digitalSolution')}
            </p>
          </div>
        </div>
      );
  }
}
