import Image from 'next/image';

export type CompanyBrand = 'github' | 'vercel' | 'apple' | 'google-play';

type CompanyMarkProps = {
  brand: CompanyBrand;
  scale?: number;
  className?: string;
};

type CompanyBrandDefinition = {
  name: string;
  dark: string;
  light: string;
  width: number;
  height: number;
};

const companyBrands: Record<CompanyBrand, CompanyBrandDefinition> = {
  github: {
    name: 'GitHub',
    dark: '/brands/companies/github-dark.svg',
    light: '/brands/companies/github-light.svg',
    width: 46,
    height: 18
  },

  vercel: {
    name: 'Vercel',
    dark: '/brands/companies/vercel-dark.svg',
    light: '/brands/companies/vercel-light.svg',
    width: 46,
    height: 14
  },

  apple: {
    name: 'Apple',
    dark: '/brands/companies/apple-dark.svg',
    light: '/brands/companies/apple-light.svg',
    width: 18,
    height: 22
  },

  'google-play': {
    name: 'Google Play',
    dark: '/brands/companies/google-play.svg',
    light: '/brands/companies/google-play.svg',
    width: 64,
    height: 20
  }
};

export function CompanyMark({ brand, scale = 1, className = '' }: CompanyMarkProps) {
  const company = companyBrands[brand];

  const width = company.width * scale;
  const height = company.height * scale;

  return (
    <span
      className={['relative inline-flex shrink-0 items-center justify-center', className].join(' ')}
      style={{
        width,
        height
      }}>
      <Image
        src={company.light}
        alt={`${company.name} logo`}
        fill
        sizes={`${Math.ceil(width)}px`}
        className="block object-contain dark:hidden"
      />

      <Image
        src={company.dark}
        alt=""
        aria-hidden="true"
        fill
        sizes={`${Math.ceil(width)}px`}
        className="hidden object-contain dark:block"
      />
    </span>
  );
}
