import get from 'lodash/get';

interface CartProduct {
  name: string;
  sku: string;
  description: string;
  price: number;
  currency: string;
  image: string;
}

interface Product {
  name: string;
  id: string;
  images: string[];
  metafields: Metafield[];
}

interface Price {
  id: string;
  unit_amount: number;
  currency: string;
  nickname?: string;
}

export function toCartProduct(product: Product, price: Price): CartProduct {
  return {
    name: product.name,
    sku: price.id,
    description: price.nickname,
    price: price.unit_amount,
    currency: price.currency,
    image: product.images[0],
  };
}

export function getProductUrl({ id, handle }: { id: string; handle?: string }) {
  if (!handle && !id) {
    return undefined;
  }

  if (!handle) {
    return `/photography/${id}`;
  }

  return `/photography/${handle}`;
}

const RE_A4 = /(21\s?cm\s?x\s?29\s?cm|21(\.0)?\s?cm\s?x\s?29(\.7)?\s?cm)/i;
const RE_A3 = /(30\s?cm\s?x\s?42\s?cm|29(\.7)?\s?cm\s?x\s?42(\.0)?\s?cm)/i;
const RE_A2 = /(42\s?cm\s?x\s?59\s?cm|42(\.0)?\s?cm\s?x\s?59(\.4)?\s?cm)/i;

export function isA2(size: string) {
  return RE_A2.test(size);
}

export function isA3(size: string) {
  return RE_A3.test(size);
}

export function isA4(size: string) {
  return RE_A4.test(size);
}

export enum Size {
  A4 = 'A4 (210mm x 297mm) | Print only',
  A3 = 'A3 (297mm x 420mm) | Print only',
  A2 = 'A2 (420mm x 594mm) | Print only',
}

export function getProductSize(variantSize: string) {
  if (RE_A4.test(variantSize)) {
    return Size.A4;
  }

  if (RE_A3.test(variantSize)) {
    return Size.A3;
  }

  if (RE_A2.test(variantSize)) {
    return Size.A2;
  }

  return variantSize;
}

interface ProductWithMediafiels {
  metafields: readonly Metafield[];
}

export function isOrientationPortrait(product: ProductWithMediafiels) {
  return getMetafield(product, 'orientation') === 'portrait';
}

export function isOrientationLandscape(product: ProductWithMediafiels) {
  return getMetafield(product, 'orientation') === 'landscape';
}

export function getMetafield(product: ProductWithMediafiels, key: string) {
  return get(product, 'metafields', []).find(
    (metafield) => get(metafield, 'key') === key,
  )?.value;
}

export function getPageSizeFromVariant(
  variant: Queries.ProductDetailsFragment['variants'][0],
): string | undefined {
  const size = getProductSize(variant.title);
  const matches = size.match(/(A[0-9]{1})/i);

  return matches && matches.length ? matches[0] : undefined;
}

export const getMinPrice = (
  products: readonly Queries.ProductFragment[],
): Queries.ProductFragment['priceRangeV2'] | undefined => {
  if (!products.length) return;

  if (
    products.every((product) => typeof product.priceRangeV2 === 'undefined')
  ) {
    return undefined;
  }

  return [...products].sort(
    (a, b) =>
      a.priceRangeV2?.minVariantPrice.amount -
      b.priceRangeV2?.minVariantPrice.amount,
  )[0]?.priceRangeV2;
};
