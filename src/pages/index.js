import React from 'react'
import { graphql } from 'gatsby'
import { Box, Flex, PageHeading, Container, Content } from '../styles'
import Layout from '../components/Layout'
import { PostPreview } from '../components/post'
import CollectionCarousel from '../components/CollectionCarousel/index.tsx'
import { getImageUrl } from '../utils/image.ts'
import PostPreviews from '../components/PostPreviews'

const getNodes = entity => {
  return entity.edges.map(({ node }) => node)
}

export default class IndexPage extends React.Component {
  render() {
    const { data } = this.props
    const { collection, collectionImages } = data
    const posts = getNodes(data.posts)

    return (
      <Layout wide displayTagline>
        <Content wide>
          <Container>
            <Box mb={2}>
              <PageHeading>Latest Art</PageHeading>
            </Box>
          </Container>
        </Content>

        <CollectionCarousel
          id={collection.frontmatter.id}
          title={collection.frontmatter.title}
          description={collection.frontmatter.description}
          heading={collection.frontmatter.heading}
          images={collectionImages.edges.map(({ node }) =>
            getImageUrl(node.frontmatter.image_url, '300x375'),
          )}
          minPrice={collection.frontmatter.minPrice}
        />

        <Content wide>
          <Container>
            <Box mb={3}>
              <PageHeading>Latest Tech</PageHeading>
            </Box>

            <a href="/posts">See all posts</a>
          </Container>
        </Content>

        <Box mt={4}>
          <PostPreviews
            posts={posts.sort(
              (a, b) => b.frontmatter.pinned - a.frontmatter.pinned,
            )}
          />
        </Box>
      </Layout>
    )
  }
}

export const pageQuery = graphql`
  {
    collection: markdownRemark(
      frontmatter: { templateKey: { eq: "collection" }, id: { eq: "sapphire" } }
    ) {
      id
      fields {
        slug
      }
      frontmatter {
        id
        collection
        stripe_product_id
        title
        heading
        templateKey
        description
        image_url
        location
        orientation
        width
        height
        minPrice
      }
    }
    collectionImages: allMarkdownRemark(
      filter: { frontmatter: { collection: { eq: "sapphire" } } }
    ) {
      edges {
        node {
          id
          frontmatter {
            image_url
          }
        }
      }
    }
    posts: allMarkdownRemark(
      sort: { fields: [frontmatter___date], order: [DESC] }
      filter: {
        frontmatter: { private: { ne: true }, templateKey: { eq: "blog-post" } }
      }
    ) {
      edges {
        node {
          id
          fields {
            slug
            readingTime {
              text
            }
          }
          frontmatter {
            title
            tags
            templateKey
            description
            pinned
            private
            date(formatString: "MMMM DD, YYYY")
          }
        }
      }
    }
  }
`
