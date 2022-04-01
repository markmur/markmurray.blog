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

export function getProductUrl({
  id,
  handle
}: {
  id: string;
  handle: string;
}) {
  if (!handle) {
    return `/photography/${id}`;
  }

  return `/photography/${handle}`;
}

const space = '\\s?'
const inch = '(in|inches)'
const formatNum = (num: string) => num.replace(/\./g, '\\.')

const buildRegex = (cm: [string, string], inches: [string, string]) => {
  return new RegExp(
    `^${formatNum(cm[0])}${space}cm${space}x${space}${formatNum(cm[1])}${space}cm${space},${space}${formatNum(inches[0])}${space}${inch}${space}x${space}${formatNum(inches[1])}${space}${inch}$`,
    'i'
  )
}

export const RE_A2 = buildRegex(['42.0', '59.4'], ['16.5', '23.4'])
export const RE_A3 = buildRegex(['29.7', '42.0'], ['11.7', '16.5'])
export const RE_A4 = buildRegex(['21.0', '29.7'], ['8.3', '11.7'])

export enum Sizes {
  A2 = "42.0 cm x 59.4 cm, 16.5 inches x 23.4 inches",
  A3 = "29.7 cm x 42.0 cm, 11.7 inches x 16.5 inches",
  A4 = "21.0 cm x 29.7 cm, 8.3 inches x 11.7 inches"
}

export function dimensionsToVariantSize(dimensions: string) {
  const sizes = Object.entries(Sizes)

  const match = sizes.find(([key, value]) => value === dimensions)

  if (match) {
    const [key, value] = match
    return `${key} (${value})`
  }

  return dimensions
}

