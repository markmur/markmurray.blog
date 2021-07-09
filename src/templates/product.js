import React from 'react'
import Helmet from 'react-helmet'
import { graphql } from 'gatsby'

import Layout from '../components/Layout'
import { Box, Flex, Content, Container } from '../styles'

function ProductTemplate(props) {
  const { product, photo } = props

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

        <Box py={2} px={5} flex="1 0 40%">
          <h1>{product.product.name}</h1>
          <p>{photo.description}</p>

          <ul>
            {(photo.tags || []).map(tag => (
              <li key={tag}>{tag}</li>
            ))}
          </ul>

          <div>
            <em>Taken with</em>
          </div>
          <strong>{photo.camera}</strong>
          {photo.lens && <strong>{photo.lens}</strong>}
        </Box>
      </Flex>
    </div>
  )
}

const Product = ({ data }) => {
  const { product, photo } = data

  return (
    <Layout wide displayTagline={false}>
      <Helmet titleTemplate="%s | Photography">
        <title>{product.product.name}</title>
        <meta name="description" content={`${product.product.description}`} />
      </Helmet>

      <Content>
        <ProductTemplate product={product} photo={photo.frontmatter} />
      </Content>
    </Layout>
  )
}

export default Product

export const pageQuery = graphql`
  query ProductByID($id: String!) {
    product: stripePrice(id: { eq: $id }) {
      id
      currency
      unit_amount
      product {
        name
        active
        created
        images
        name
        updated
      }
    }
    photo: markdownRemark(frontmatter: { stripe_id: { eq: $id } }) {
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
