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
