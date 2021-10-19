import React from 'react';
import Helmet from 'react-helmet';
import { graphql } from 'gatsby';
import { useShoppingCart } from 'use-shopping-cart';

import { CartConsumer } from '../context/CartContext.tsx';
import Layout from '../components/Layout';
import ImageGallery from '../components/ImageGallery/index.tsx';
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
import { formatPrice } from '../utils/currency';
import { toCartProduct } from '../utils/product.ts';
import { cmToInches } from '../utils/index.ts';

function ProductTemplate(props) {
  const { product, photo, prices } = props;
  const [addedToCart, setAddedToCart] = React.useState(false);
  const [selectedPrice, setSelectedPrice] = React.useState(prices[0]);
  const { setCartState } = React.useContext(CartConsumer);

  const { addItem, cartDetails } = useShoppingCart();

  const handleAddToCart = React.useCallback(() => {
    // add to cart
    addItem(toCartProduct(product, selectedPrice), 1);
    // set loading state
    setAddedToCart(true);
    setCartState({ open: true });

    // set timeout for loading state
    setTimeout(() => {
      setAddedToCart(false);
    }, 5 * 1000);
  }, []);

  const handleSizeChange = React.useCallback(event => {
    event.persist();
    const id = event.target.value;
    setSelectedPrice(prices.find(x => x.id === id));
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
        <Box flex={[1, '1 0 55%']}>
          <ImageGallery
            images={[
              '/photography/collections/sapphire/product/home',
              '/photography/collections/sapphire/product/home-2',
              '/photography/collections/sapphire/sapphire-1',
            ]}
          />
        </Box>

        <Box border="1px solid" py={[5, 5]} px={[0, 5]} flex={[1, '1 0 45%']}>
          {photo.limit && (
            <Box mb={3}>
              <Subtitle>Limited Edition</Subtitle>
            </Box>
          )}

          <ProductTitle>{photo.title}</ProductTitle>
          <p>{photo.description}</p>

          <Box my={4}>
            <small>
              <div>
                <em>Location</em>
              </div>

              <strong> {photo.location}</strong>
            </small>
          </Box>

          <Box my={4}>
            <small>
              <div>
                <em>Gear used</em>
              </div>

              <strong> {photo.camera}</strong>
              {photo.lens && <strong> + {photo.lens}</strong>}
            </small>
          </Box>

          <Box my={4}>
            <small>
              <strong>Sizes available</strong>
              <Box p={3} pl={4}>
                <ul>
                  {prices.map(price => (
                    <li key={price.id}>
                      {price.metadata.size} ({cmToInches(price.metadata.size)})
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

          {photo.limit && (
            <Box my={4}>
              <small>
                <div>
                  <strong>Limited edition</strong>
                </div>
                <small>
                  This product is a limited edition item. Only {photo.limit}{' '}
                  will be printed.
                </small>
              </small>
            </Box>
          )}

          <Select value={selectedPrice.id} onChange={handleSizeChange}>
            {prices.map(price => (
              <option key={price.id} value={price.id}>
                {price.metadata.size} ({cmToInches(price.metadata.size)}){' '}
                {' - '}
                {formatPrice(price.unit_amount, price.currency)}
              </option>
            ))}
          </Select>

          <Box mt={2} mb={3}>
            <Button
              expand
              primary
              success={addedToCart}
              disabled={addedToCart || selectedPrice.id in cartDetails}
              onClick={handleAddToCart}
            >
              {addedToCart
                ? 'Added!'
                : selectedPrice.id in cartDetails
                ? 'In your cart'
                : 'Add to cart'}
            </Button>
          </Box>

          <Box pt={2} textAlign="center">
            <small>Photos are printed on high-quality Fuji Matt paper.</small>
          </Box>
          <Box pt={2} textAlign="center">
            <small>
              Available in Ireland and the UK for now. International shipping
              coming soon.
            </small>
          </Box>
        </Box>
      </Flex>
    </Container>
  );
}

const Product = ({ data }) => {
  const { product, photo, prices } = data;

  return (
    <Layout wide displayTagline={false}>
      <Helmet titleTemplate="%s | Photography">
        <title>{product.name}</title>
        <meta name="description" content={product.description} />
      </Helmet>

      <Content>
        <ProductTemplate
          product={product}
          photo={photo ? photo.frontmatter : {}}
          prices={prices.edges.map(x => x.node)}
        />
      </Content>
    </Layout>
  );
};

export default Product;

export const pageQuery = graphql`
  query ProductByID($id: String!) {
    prices: allStripePrice(filter: { product: { id: { eq: $id } } }) {
      edges {
        node {
          id
          currency
          unit_amount
          metadata {
            size
          }
        }
      }
    }
    product: stripeProduct(id: { eq: $id }) {
      id
      name
      active
      created
      images
      name
      updated
    }
    photo: markdownRemark(frontmatter: { stripe_product_id: { eq: $id } }) {
      frontmatter {
        title
        description
        camera
        lens
        location
        image_url
        width
        height
        tags
        limit
      }
      fields {
        slug
      }
    }
  }
`;
