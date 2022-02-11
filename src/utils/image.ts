const firebaseImagePrefix =
  'https://firebasestorage.googleapis.com/v0/b/project-4767000521921178323.appspot.com/o';

export enum Sizes {
  original = '',
  large = '_1200x1500',
  medium = '_600x750',
  small = '_300x375',
}

export function getImageSrcSet(url: string) {
  if (!url) return url;

  const sizes = [Sizes.large, Sizes.medium];

  return sizes
    .map((size) => {
      const image = getImageUrl(url, size);
      const [width] = size.slice(1).split('x');

      return `${image} ${width}w`;
    })
    .join(', ');
}

export function getImageUrl(url: string, size = Sizes.medium) {
  if (!url) return url;

  const [path, ext = 'png'] = url.split('.');
  return `${firebaseImagePrefix}/${encodeURIComponent(
    path.slice(1),
  )}${size}.${ext}?alt=media&token=7922bf67-74b5-4ab7-bfe9-b564cace3e4c`;
}