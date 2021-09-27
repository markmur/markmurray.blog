const firebaseImagePrefix =
  'https://firebasestorage.googleapis.com/v0/b/project-4767000521921178323.appspot.com/o'

/*
 * Sizes:
    1200x1500
    300x375
    600x750
 */
export function getImageUrl(url: string, size = '600x750') {
  return `${firebaseImagePrefix}/${encodeURIComponent(
    url.slice(1),
  )}_${size}.png?alt=media&token=7922bf67-74b5-4ab7-bfe9-b564cace3e4c`
}

export function getProductUrl(stripeProductId: string) {
  return `/photography/${stripeProductId}`
}
