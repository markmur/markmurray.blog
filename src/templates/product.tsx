import React from 'react';
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
  Content,
  Select,
  ProductTitle,
  Subtitle,
} from '../styles';
import shopify from '../utils/shopify';
import { get } from 'lodash';
import ImageGrid from '../components/ImageGrid';
import { getProductUrl } from '../utils/product';

interface Variant {
  id: string
  productId: string
  shopifyId: string
  price: string
  sku: string
  title: string
  availableForSale: boolean
}

interface Metafield {
  product: {
    metafields: {
      key: string
      value: string
    }
  }
}

interface Product {
  id: string
  title: string
  description: string
  createdAt: string
  updatedAt: string
  tags: string[]
  images: {
    src: string
  }[]
  variants: Variant[]
  metafield: Metafield[]
}

interface Collection {
  title: string
  products: {
    id: string
    handle: string
    title: string
    images: {
      src: string
    }[]
  }[]
}

function getMetafield(product: Product, key: string) {
  return get(product, "metafields.0.product.metafields", [])
    .find(metafield => get(metafield, "key") === key)?.value
}

interface Props {
  product: Product
  collection: Collection
}

function ProductTemplate(props: Props) {
  const product: Product = props.product;
  const [selectedVariant, setSelectedVariant] = React.useState(product.variants[0].id);
  const [addedToCart, setAddedToCart] = React.useState(false);
  const { setCartState } = React.useContext(CartContext);

  const handleAddToCart = React.useCallback(() => {
    const variant = product.variants.find(x => x.id === selectedVariant)

    shopify.addLineItem(selectedVariant, variant);

    // set loading state
    setAddedToCart(true);
    setCartState({ open: true });

    // set timeout for loading state
    setTimeout(() => {
      setAddedToCart(false);
    }, 5 * 1000);
  }, []);

  const handleVariantChange = React.useCallback((event) => {
    event.persist();
    setSelectedVariant(product.variants.find((x) => x.id === event.target.value).id);
  }, []);

  return (
    <Container>
      <Flex
        mt={2}
        width="100%"
        justifyContent={['center', 'flex-start']}
        alignItems={['inherit', 'flex-start']}
        flexDirection={['column', 'row']}
      >
        <Box
          flex={[1, '1 0 50%']}
          position={['relative', 'relative', 'sticky']}
          top="2em"
        >
          <ImageGallery
            images={product.images.map(x => x.src)}
          />
        </Box>

        <Box border="1px solid" py={[5, 5]} px={[0, 5]} flex={[1, '1 0 50%']}>
          {product.limit && (
            <Box mb={3}>
              <Subtitle>Limited Edition</Subtitle>
            </Box>
          )}

          {product.tags && (
            <Box mb={3}>
              <Subtitle>{product.tags.join(" ")}</Subtitle>
            </Box>
          )}

          <ProductTitle>{product.title}</ProductTitle>
          <p>{product.description}</p>

          <Box my={4}>
            <small>
              <div>
                <em>Location</em>
              </div>

              <strong> {getMetafield(product, "location")}</strong>
            </small>
          </Box>

          <Box my={4}>
            <small>
              <div>
                <em>Gear used</em>
              </div>

              <strong>{getMetafield(product, "camera")}</strong>
              <small>, </small>
              <strong>{getMetafield(product, "lens")}</strong>
            </small>
          </Box>

          <Box my={4}>
            <small>
              <strong>Sizes available</strong>
              <Box p={3} pl={4}>
                <ul>
                  {product.variants.map((variant) => (
                    <li key={variant.id}>
                      {variant.title} {/*({cmToInches(variant.nickname)})*/}
                    </li>
                  ))}
                </ul>
              </Box>

              <small>
                <a href="mailto:mark@markmurray.co">Get in touch</a> for custom
                print sizes.
              </small>
            </small>
          </Box>

          {product.limit && (
            <Box my={4}>
              <small>
                <div>
                  <strong>Limited edition</strong>
                </div>
                <small>
                  This product is a limited edition item. Only {product.limit}{' '}
                  will be printed.
                </small>
              </small>
            </Box>
          )}

          <Select value={selectedVariant} onChange={handleVariantChange}>
            {product.variants.map((variant) => (
              <option key={variant.id} value={variant.id}>
                {variant.title} {/*({cmToInches(variant.nickname)}) {' - '}*/}
                {/* {formatPrice(variant.price, variant.currency)} */}
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

          <Box pt={2} textAlign="center">
            <small>Photos are printed on high-quality Fuji Matt paper.</small>
          </Box>
          <Box pt={2} textAlign="center">
            <small>
              All prints come with a 10mm white border. This is for easier handling and better mounting options. If you would like borderless prints, please get in touch.
            </small>
          </Box>
        </Box>
      </Flex>

      <hr />


      {props.collection && props.collection?.products.length > 1 && (<Box>
        <Box mb={3}>
        <Subtitle>{props.collection.title} Collection</Subtitle>
        <h1>More from the collection...</h1>
        </Box>

        <ImageGrid images={props.collection.products.filter(x => x.id !== props.product.id).sort((a, b) => a.title.localeCompare(b.title)).map(x => ({
          image_url: x.images?.[0].src,
          href: getProductUrl(x),
          title: x.title
        }))} />
      </Box>)}
    </Container>
  );
}

const Product = ({ data, ...rest }) => {
  const { product, collection } = data;

  console.log(data, rest)

  return (
    <Layout wide displayTagline={false}>
      <Helmet titleTemplate="%s | Photography">
        <title>{product.title}</title>
        <meta name="description" content={product.description} />
      </Helmet>

      <Content>
        <ProductTemplate
          product={product}
          collection={collection}
        />
      </Content>
    </Layout>
  );
};

export default Product;

export const pageQuery = graphql`
  query ProductByID($id: String!, $collectionId: String) {
    product: shopifyProduct(id: { eq: $id }) {
      id
      title
      description
      createdAt
    	updatedAt
      tags
      collections {
        id
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
      }
      metafields {
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
      products {
        id
        handle
        title
        images {
          src
        }
      }
    }
  }
`;
