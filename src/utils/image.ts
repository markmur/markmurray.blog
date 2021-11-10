const firebaseImagePrefix =
  'https://firebasestorage.googleapis.com/v0/b/project-4767000521921178323.appspot.com/o';

export enum Sizes {
  original = '',
  large = '_1200x1500',
  medium = '_600x750',
  small = '_300x375',
}

export function getImageUrl(url: string, size = Sizes.medium) {
  const [path, ext = 'png'] = url.split('.');
  return `${firebaseImagePrefix}/${encodeURIComponent(
    path.slice(1),
  )}${size}.${ext}?alt=media&token=7922bf67-74b5-4ab7-bfe9-b564cace3e4c`;
}

export function getProductUrl(stripeProductId: string) {
  return `/photography/${stripeProductId}`;
}
