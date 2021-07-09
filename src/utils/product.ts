interface CartProduct {
  name: string
  sku: string
  price: number
  currency: string
  image: string
}

interface Product {
  name: string
  id: string
  images: string[]
}

interface Price {
  id: string
  unit_amount: number
  currency: string
}

export function toCartProduct(product: Product, price: Price): CartProduct {
  return {
    name: product.name,
    sku: price.id,
    price: price.unit_amount,
    currency: price.currency,
    image: product.images[0],
  }
}
