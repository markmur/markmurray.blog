import {
  Box,
  Button,
  Container,
  Flex,
  HideOnDesktop,
  HideOnMobile,
  Link,
  ProductTitle,
  Select,
  Subtitle,
} from '../styles';
import { GatsbyImage, IGatsbyImageData, getImage } from 'gatsby-plugin-image';
import { PageProps, graphql } from 'gatsby';
import React, { useEffect } from 'react';
import {
  getMetafield,
  getPageSizeFromVariant,
  getProductSize,
  isOrientationLandscape,
} from '../utils/product';

import { CartContext } from '../context/CartContext';
import Helmet from 'react-helmet';
import ImageGallery from '../components/ImageGallery';
import Layout from '../components/Layout';
import ProductGrid from '../components/ProductGrid';
import { formatPrice } from '../utils/currency';
import { useShopify } from '../hooks/use-shopify';

interface Image {
  id: string;
  tag?: string;
  image: IGatsbyImageData;
  featured?: boolean;
}

function getProductImages(product: Queries.ProductDetailsFragment): Image[] {
  const images = [];

  images.push({
    id: product.featuredMedia.id,
    image: product.featuredMedia.preview.image.gatsbyImageData,
    featured: true,
  });

  product.variants.forEach((variant) => {
    images.push({
      id: variant.id,
      image: variant.image.gatsbyImageData,
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

function ProductTemplate(props: {
  product: Queries.ProductByIDQuery['product'];
  collection: Queries.ProductByIDQuery['collection'];
  featuredCollection: Queries.ProductByIDQuery['featuredCollection'];
}) {
  const product = props.product;
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
            <GatsbyImage
              {...productImages[0].image}
              loading="eager"
              alt={product.title}
              image={getImage(productImages[0].image)}
            />
          </Box>
        )}

        <HideOnDesktop>
          <Box mt={-2}>
            <ImageGallery
              featuredImage={{
                id: product.featuredMedia.id,
                image: product.featuredMedia.preview.image.gatsbyImageData,
              }}
              images={productImages}
            />
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
                  {getMetafield(product, 'camera')}
                  {getMetafield(product, 'lens')
                    ? ` - ${getMetafield(product, 'lens')}`
                    : ''}
                </strong>
              </small>
            </Box>

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

            <ProductGrid
              carouselOnMobile
              orientation={isCollectionLandscape ? 'landscape' : 'portrait'}
              products={props.collection.products
                .filter((x) => x.id !== props.product.id)
                .slice(0, isCollectionLandscape ? 4 : 6)
                .sort((a, b) => a.title.localeCompare(b.title))}
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

              <ProductGrid
                carouselOnMobile
                products={props.featuredCollection.products
                  .slice(0, 6)
                  .filter((x) => x.id !== props.product.id)
                  .sort((a, b) => a.title.localeCompare(b.title))}
              />
            </Box>
          )}
      </Container>
    </>
  );
}

const Product = ({ data }: PageProps<Queries.ProductByIDQuery>) => {
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
      ...ProductDetails
    }

    collection: shopifyCollection(id: { eq: $collectionId }) {
      ...FeaturedShopifyCollection
    }

    featuredCollection: shopifyCollection(
      title: { eq: $featuredCollectionTitle }
    ) {
      ...FeaturedShopifyCollection
    }
  }
`;
