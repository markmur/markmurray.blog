export function fileCollectionToProductCollection(
  fileCollection: Queries.FileCollectionFragment,
  url: string,
  metafields: Metafield[] = [{ key: 'orientation', value: 'landscape' }],
): Queries.FeaturedShopifyCollectionFragment['products'] {
  return fileCollection.edges.map(({ node }) => ({
    __typename: 'ShopifyProduct',
    id: node.id,
    handle: null,
    title: null,
    priceRangeV2: null,
    featuredMedia: {
      id: node.id,
      preview: {
        image: {
          src: node.childImageSharp.gatsbyImageData.images.fallback.src,
          altText: '',
          width: node.childImageSharp.gatsbyImageData.width,
          height: node.childImageSharp.gatsbyImageData.height,
          gatsbyImageData: node.childImageSharp.gatsbyImageData,
        },
      },
    },
    media: [{ image: node.childImageSharp }],
    images: [
      {
        gatsbyImageData: node.childImageSharp.gatsbyImageData,
        src: node.childImageSharp.gatsbyImageData.images.fallback.src,
        backgroundColor: node.childImageSharp.gatsbyImageData.backgroundColor,
      },
    ],
    to: url,
    metafields,
  }));
}
