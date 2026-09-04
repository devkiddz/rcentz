import { HomeTechnologyEcosystem } from '@/features/home/components/ecosystem/HomeTechnologyEcosystem';

import { ServicesHero } from '@/features/services/components/hero/ServicesHero';

export const revalidate = 300;

export default function ServicesPage() {
  return (
    <main className="relative">
      <ServicesHero />

      <HomeTechnologyEcosystem />
    </main>
  );
}
