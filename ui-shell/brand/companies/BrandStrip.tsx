import { CompanyMark, type CompanyBrand } from './CompanyMark';

type BrandStripProps = {
  title?: string;
  brands: CompanyBrand[];
};

export function BrandStrip({ title, brands }: BrandStripProps) {
  return (
    <div className="flex flex-wrap items-center gap-4">
      {title ? (
        <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted">{title}</span>
      ) : null}

      <div className="flex flex-wrap items-center gap-4">
        {brands.map(brand => (
          <CompanyMark
            key={brand}
            brand={brand}
            className="opacity-70 transition-opacity duration-200 hover:opacity-100"
          />
        ))}
      </div>
    </div>
  );
}
