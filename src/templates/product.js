import React from 'react'
import Helmet from 'react-helmet'
import { graphql } from 'gatsby'
import { useShoppingCart } from 'use-shopping-cart'

import Layout from '../components/Layout'
import { Box, Button, Flex, Content, Select } from '../styles'
import { formatPrice } from '../utils/currency'
import { toCartProduct } from '../utils/product.ts'

function ProductTemplate(props) {
  const { product, photo, prices } = props
  const [addedToCart, setAddedToCart] = React.useState(false)
  const [selectedPrice] = React.useState(prices[0])

  const { addItem, cartDetails } = useShoppingCart()

  const handleAddToCart = React.useCallback(() => {
    // add to cart
    addItem(toCartProduct(product, selectedPrice), 1)
    // set loading state
    setAddedToCart(true)

    // set timeout for loading state
    setTimeout(() => {
      setAddedToCart(false)
    }, 5 * 1000)
  }, [])

  return (
    <div>
      <Flex
        mt={2}
        justifyContent="flex-start"
        alignItems="flex-start"
        flexDirection={['column', 'row']}
      >
        <Box flex="1 0 60%">
          <img
            loading="lazy"
            src={photo.image_url}
            alt={photo.title}
            width={photo.width}
            height={photo.height}
          />
        </Box>

        <Box py={2} px={[3, 4, 5]} flex="1 0 40%">
          <Box mb={4}>
            <h2>{product.name}</h2>
          </Box>
          <p>{photo.description}</p>

          <Box my={4}>
            <small>
              <em>Taken with a</em>
              <strong> {photo.camera}</strong>
              {photo.lens && <strong>{photo.lens}</strong>}
            </small>
          </Box>

          <Select>
            {prices.map(price => (
              <option key={price.id}>
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
            <small>
              Photos are printed on the highest quality Fuji Matt paper.
            </small>
          </Box>
        </Box>
      </Flex>
    </div>
  )
}

const Product = ({ data }) => {
  const { product, photo, prices } = data

  return (
    <Layout wide displayTagline={false}>
      <Helmet titleTemplate="%s | Photography">
        <title>{product.name}</title>
        <meta name="description" content={product.description} />
      </Helmet>

      <Content>
        <ProductTemplate
          product={product}
          photo={photo.frontmatter}
          prices={prices.edges.map(x => x.node)}
        />
      </Content>
    </Layout>
  )
}

export default Product

export const pageQuery = graphql`
  query ProductByID($id: String!) {
    prices: allStripePrice(filter: { product: { id: { eq: $id } } }) {
      edges {
        node {
          id
          currency
          unit_amount
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
        orientation
        image_url
        width
        height
        tags
      }
      fields {
        slug
      }
    }
  }
`
