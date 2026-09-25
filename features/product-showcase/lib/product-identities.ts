export type ProductAccent =
  | "rcentz"
  | "waffi"
  | "fintech"
  | "jobman"
  | "aj-logik"
  | "shelsea"
  | "hotel"
  | "real-estate"
  | "vault";

const PRODUCT_ACCENTS: Record<
  string,
  ProductAccent
> = {
  waffi: "waffi",

  "rcentz-fintech-lab": "fintech",

  jobman: "jobman",

  "aj-logik": "aj-logik",

  "shelsea-commerce": "shelsea",

  "hotel-management": "hotel",

  "real-estate": "real-estate",

  "rcentz-vault": "vault",
};

export function getProductAccent(
  slug: string,
): ProductAccent {
  return (
    PRODUCT_ACCENTS[slug] ??
    "rcentz"
  );
}