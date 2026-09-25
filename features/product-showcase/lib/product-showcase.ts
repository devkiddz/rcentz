import type {
  RcentzProduct,
  RcentzProductStage,
} from "@/features/products/server/get-products";

export type ProductVisual = {
  id: string;

  galleryName: string;

  url: string | null;

  alt: string | null;

  caption: string | null;

  variant: number;
};

const MINIMUM_VISUALS = 4;

const PRODUCTS_SITE_URL =
  process.env
    .NEXT_PUBLIC_RCENTZ_PRODUCTS_URL
    ?.replace(/\/+$/, "");

export function formatProductStage(
  stage: RcentzProductStage,
) {
  return stage
    .toLowerCase()
    .replaceAll("_", " ")
    .replace(
      /\b\w/g,
      (letter: string) =>
        letter.toUpperCase(),
    );
}

export function getProductHref(
  product: RcentzProduct,
) {
  if (PRODUCTS_SITE_URL) {
    return `${PRODUCTS_SITE_URL}/${product.slug}`;
  }

  return (
    product.productUrl ??
    "#products"
  );
}

export function getProductSummary(
  product: RcentzProduct,
) {
  return (
    product.shortDescription ??
    product.description
  );
}

export function getProductVisuals(
  product: RcentzProduct,
): ProductVisual[] {
  const media =
    product.galleries.flatMap(
      (gallery, galleryIndex) =>
        gallery.media.map(
          (
            item,
            mediaIndex,
          ) => ({
            id: item.id,

            galleryName:
              gallery.name,

            url: item.url,

            alt: item.alt,

            caption:
              item.caption,

            variant:
              (galleryIndex +
                mediaIndex) %
              4,
          }),
        ),
    );

  const emptyGalleries =
    product.galleries
      .filter(
        (gallery) =>
          gallery.media.length ===
          0,
      )
      .map(
        (gallery, index) => ({
          id: `${gallery.id}-placeholder`,

          galleryName:
            gallery.name,

          url: null,

          alt: null,

          caption:
            gallery.description ??
            product.tagline,

          variant: index % 4,
        }),
      );

  const existing = [
    ...media,
    ...emptyGalleries,
  ];

  const missingCount =
    Math.max(
      MINIMUM_VISUALS -
        existing.length,
      0,
    );

  const generated =
    Array.from(
      {
        length: missingCount,
      },
      (_, index) => {
        const number =
          existing.length +
          index +
          1;

        return {
          id: `${product.id}-preview-${number}`,

          galleryName: `Preview ${String(
            number,
          ).padStart(2, "0")}`,

          url: null,

          alt: null,

          caption:
            product.tagline ??
            product.shortDescription,

          variant:
            (number - 1) % 4,
        };
      },
    );

  return [
    ...existing,
    ...generated,
  ];
}