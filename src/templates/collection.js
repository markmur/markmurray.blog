import React from 'react'
import Helmet from 'react-helmet'
import { graphql } from 'gatsby'

import Layout from '../components/Layout'
import { Container, Content, Description, PostTitle } from '../styles'
import ImageGrid from '../components/ImageGrid/index.tsx'
import { getImageUrl, getProductUrl } from '../utils/image.ts'

export const CollectionTemplate = ({ title, description, images }) => {
  return (
    <Content pb={4}>
      <Container wide>
        <PostTitle dangerouslySetInnerHTML={{ __html: title }} />
        <Description>{description}</Description>
        <ImageGrid images={images} />
      </Container>
    </Content>
  )
}

const Collection = ({ data }) => {
  const { collection, images } = data

  const { id, title, description } = collection.frontmatter
  const imageUrls = images.edges.map(({ node }) => ({
    image_url: getImageUrl(node.frontmatter.image_url),
    href: getProductUrl(node.frontmatter.stripe_product_id),
  }))

  const url = data.site.siteMetadata.url + `/collection/${id}`

  return (
    <Layout wide>
      <Helmet titleTemplate="%s">
        <title>{title}</title>
        <meta name="description" content={description} />

        <meta property="og:type" content="website" />
        <meta property="og:url" content={url} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />

        {/* {image && <meta property="og:image" content={image} />}
        {image && <meta property="twitter:image" content={image} />}
        {image && <meta property="image" content={image} />} */}

        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content={url} />
        <meta property="twitter:title" content={title} />
        <meta property="twitter:description" content={description} />
      </Helmet>

      <CollectionTemplate
        id={collection.id}
        title={title}
        description={description}
        images={imageUrls}
      />
    </Layout>
  )
}

export default Collection

export const pageQuery = graphql`
  query Collection($id: String!) {
    site {
      siteMetadata {
        url
      }
    }
    collection: markdownRemark(id: { eq: $id }) {
      id
      frontmatter {
        title
        description
      }
    }
    images: allMarkdownRemark(
      filter: { frontmatter: { collection: { eq: "sapphire" } } }
    ) {
      edges {
        node {
          id
          frontmatter {
            image_url
            stripe_product_id
          }
        }
      }
    }
  }
`
