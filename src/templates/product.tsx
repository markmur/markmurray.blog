import React, { useEffect } from 'react';
import Helmet from 'react-helmet';
import { graphql } from 'gatsby';

import { CartContext } from '../context/CartContext';
import Layout from '../components/Layout';
import ImageGallery from '../components/ImageGallery';
import {
  Box,
  Button,
  Container,
  Flex,
  Select,
  ProductTitle,
  Subtitle,
  Link,
  HideOnDesktop,
  HideOnMobile,
} from '../styles';
import { get } from 'lodash';
import ImageGrid from '../components/ImageGrid';
import {
  getProductSize,
  getProductUrl,
  isOrientationLandscape,
} from '../utils/product';
import { formatPrice } from '../utils/currency';
import { useShopify } from '../hooks/use-shopify';

interface Variant {
  id: string;
  productId: string;
  shopifyId: string;
  price: string;
  sku: string;
  title: string;
  availableForSale: boolean;
  image: {
    originalSrc: string;
  };
}

interface Metafield {
  product: {
    metafields: {
      key: string;
      value: string;
    };
  };
}

interface Product {
  id: string;
  title: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  tags: string[];
  images: {
    src: string;
  }[];
  featuredImage: {
    originalSrc: string;
  };
  priceRangeV2: {
    minVariantPrice: {
      currencyCode: string;
    };
  };
  variants: Variant[];
  metafield: Metafield[];
  collections: {
    id: string;
    title: string;
    handle: string;
  }[];
}

interface Collection {
  title: string;
  handle: string;
  products: {
    id: string;
    handle: string;
    title: string;
    images: {
      src: string;
    }[];
  }[];
}

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace JSX {
    interface IntrinsicElements {
      'shop-pay-button': {
        variants: string;
        'store-url': string;
      };
    }
  }
}

function getMetafield(product: Product, key: string) {
  return get(product, 'metafields.0.product.metafields', []).find(
    (metafield) => get(metafield, 'key') === key,
  )?.value;
}

interface Props {
  product: Product;
  collection: Collection;
  featuredCollection: Collection;
}

function getPageSizeFromVariant(variant: Variant): string | undefined {
  const size = getProductSize(variant.title);
  const matches = size.match(/(A[0-9]{1})/i);

  return matches && matches.length ? matches[0] : undefined;
}

interface Image {
  src: string;
  tag?: string;
  featured?: boolean;
}

function getProductImages(product: Product): Image[] {
  const images = [];

  images.push({ src: product.featuredImage.originalSrc, featured: true });

  product.variants.forEach((variant) => {
    images.push({
      src: variant.image.originalSrc,
      tag: getPageSizeFromVariant(variant),
    });
  });

  return images;
}

function useScrollToTop() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
}

function ProductTemplate(props: Props) {
  const product: Product = props.product;
  const shopify = useShopify();
  const detailsRef = React.createRef<HTMLDivElement>();
  const [selectedVariant, setSelectedVariant] = React.useState(
    product.variants[0].shopifyId,
  );
  const [addedToCart, setAddedToCart] = React.useState(false);
  const { setCartState } = React.useContext(CartContext);

  useScrollToTop();

  const handleAddToCart = () => {
    shopify.addLineItem(selectedVariant);

    // set loading state
    setAddedToCart(true);
    setCartState(true);

    // set timeout for loading state
    setTimeout(() => {
      setAddedToCart(false);
    }, 5 * 1000);
  };

  const handleVariantChange = (event) => setSelectedVariant(event.target.value);
  const productImages = getProductImages(product);
  const isProductLandscape = isOrientationLandscape(product);
  const isCollectionLandscape = props.collection.products.every(
    isOrientationLandscape,
  );

  return (
    <>
      <Container>
        {isProductLandscape && (
          <Box mb={[3, 0, 0]}>
            <img src={productImages[0].src} />
          </Box>
        )}

        <HideOnDesktop>
          <Box mt={-2}>
            <ImageGallery images={productImages} />
          </Box>
        </HideOnDesktop>

        <Flex
          mt={[3, 4, 4]}
          width="100%"
          justifyContent={['center', 'flex-start']}
          alignItems={['inherit', 'flex-start']}
          flexDirection={['column', 'row', 'row']}
        >
          <HideOnMobile flex={[1, '1 0 45%', '1 0 45%']}>
            <ImageGallery
              images={
                isProductLandscape ? productImages.reverse() : productImages
              }
            />
          </HideOnMobile>

          <Box
            ref={detailsRef}
            border="2px solid"
            py={[4, 5, 5]}
            px={[4, 5]}
            flex={[1, '1 0 55%']}
            top={[0, 0, '2em']}
            backgroundColor="white"
            boxShadow={2}
            position={['relative', 'relative', 'sticky']}
          >
            {product.collections?.length > 0 && (
              <Box mb={3}>
                <Link to={`/collections/${product.collections?.[0].handle}`}>
                  <Subtitle>
                    {product.collections?.[0].title} Collection
                  </Subtitle>
                </Link>
              </Box>
            )}

            <ProductTitle>{product.title}</ProductTitle>
            <p>{product.description}</p>

            <Box my={4}>
              <small>
                <div>
                  <em>Location</em>
                </div>

                <strong> {getMetafield(product, 'location')}</strong>
              </small>
            </Box>

            <Box my={4}>
              <small>
                <div>
                  <em>Taken with</em>
                </div>

                <strong>
                  {getMetafield(product, 'camera')} -{' '}
                  {getMetafield(product, 'lens')}
                </strong>
              </small>
            </Box>

            {
              <Box my={4}>
                <small>
                  <div>
                    <em>Printed on</em>
                  </div>

                  <strong>
                    {getMetafield(product, 'paper') || 'C-Type - Fuji Matt'}
                  </strong>
                </small>
              </Box>
            }

            {/* <Box mt={4} mb={3}>
              <small>
                <strong>Sizes available</strong>
                <Box pt={1} pb={3} pl={4}>
                  <ul>
                    {product.variants.map((variant) => (
                      <li key={variant.shopifyId}>{variant.title}</li>
                    ))}
                  </ul>
                </Box>

                <small>
                  <strong>
                    <a href="mailto:mark@markmurray.co">Get in touch</a>
                  </strong>{' '}
                  for custom print sizes.
                </small>
              </small>
            </Box> */}

            <Box mb={1}>
              <small>
                <strong>Choose a size:</strong>
              </small>
            </Box>
            <Select value={selectedVariant} onChange={handleVariantChange}>
              {product.variants.map((variant) => (
                <option key={variant.shopifyId} value={variant.shopifyId}>
                  {getProductSize(variant.title)} -{' '}
                  {formatPrice(
                    Number(variant.price),
                    product.priceRangeV2.minVariantPrice.currencyCode,
                  )}
                </option>
              ))}
            </Select>

            <Box mt={2} mb={3}>
              <Button
                expand
                primary
                success={addedToCart}
                // disabled={addedToCart || selectedPrice.id in cartDetails}
                onClick={handleAddToCart}
              >
                Add to cart
                {/* {addedToCart
                ? 'Added!'
                : selectedPrice.id in cartDetails
                ? 'In your cart'
                : 'Add to cart'} */}
              </Button>
            </Box>

            <small>
              <strong>
                <a href="mailto:mark@markmurray.co">Get in touch</a>
              </strong>{' '}
              for custom print sizes.
            </small>
            {/* <Box pt={2} textAlign="center">
              <small>
                All prints come with a 10mm white border. This is for easier
                handling and better mounting options. If you would like
                borderless prints, please get in touch.
              </small>
            </Box> */}
          </Box>
        </Flex>

        <hr />

        {props.collection && props.collection?.products.length > 1 && (
          <Box>
            <Box mb={3}>
              <Link to={`/collections/${props.collection.handle}`}>
                <Subtitle>{props.collection.title} Collection</Subtitle>
              </Link>
              <h1>More from the collection...</h1>
            </Box>

            <ImageGrid
              carouselOnMobile
              orientation={isCollectionLandscape ? 'landscape' : 'portrait'}
              images={props.collection.products
                .filter((x) => x.id !== props.product.id)
                .slice(0, isCollectionLandscape ? 4 : 6)
                .sort((a, b) => a.title.localeCompare(b.title))
                .map((x) => ({
                  ...x,
                  image_url: x.images?.[0].src,
                  href: getProductUrl(x),
                }))}
            />
          </Box>
        )}

        {props.featuredCollection &&
          props.featuredCollection?.products.length > 1 && (
            <Box mt={5}>
              <Box mb={3}>
                <Link to={`/collections/${props.featuredCollection.handle}`}>
                  <Subtitle>
                    Featured collection :: {props.featuredCollection.title}{' '}
                  </Subtitle>
                </Link>
                <h1>You might also like...</h1>
              </Box>

              <ImageGrid
                carouselOnMobile
                images={props.featuredCollection.products
                  .slice(0, 6)
                  .filter((x) => x.id !== props.product.id)
                  .sort((a, b) => a.title.localeCompare(b.title))
                  .map((x) => ({
                    ...x,
                    image_url: x.images?.[0].src,
                    href: getProductUrl(x),
                  }))}
              />
            </Box>
          )}
      </Container>
    </>
  );
}

const Product = ({ data, ...rest }) => {
  const { product, collection, featuredCollection } = data;

  return (
    <Layout wide displayTagline={false}>
      <Helmet titleTemplate="%s | Photography">
        <title>{product.title}</title>
        <meta name="description" content={product.description} />
      </Helmet>

      <ProductTemplate
        product={product}
        collection={collection}
        featuredCollection={featuredCollection}
      />
    </Layout>
  );
};

export default Product;

export const pageQuery = graphql`
  query ProductByID(
    $id: String!
    $collectionId: String
    $featuredCollectionTitle: String
  ) {
    product: shopifyProduct(id: { eq: $id }) {
      id
      title
      description
      createdAt
      updatedAt
      tags
      collections {
        id
        handle
        title
      }
      priceRangeV2 {
        minVariantPrice {
          currencyCode
        }
      }
      featuredImage {
        originalSrc
      }
      images {
        src
      }
      variants {
        id
        productId
        shopifyId
        price
        sku
        title
        availableForSale
        image {
          originalSrc
        }
      }
      metafields {
        key
        value
        product {
          metafields {
            key
            value
          }
        }
      }
    }

    collection: shopifyCollection(id: { eq: $collectionId }) {
      title
      handle
      products {
        id
        handle
        title
        images {
          src
        }
        metafields {
          key
          value
        }
        collections {
          title
        }
        priceRangeV2 {
          minVariantPrice {
            amount
            currencyCode
          }
        }
      }
    }

    featuredCollection: shopifyCollection(
      title: { eq: $featuredCollectionTitle }
    ) {
      title
      handle
      products {
        id
        handle
        title
        images {
          src
        }
        priceRangeV2 {
          minVariantPrice {
            amount
            currencyCode
          }
        }
      }
    }
  }
`;
