import React from 'react'
import { graphql } from 'gatsby'
import { PageHeading, Container, Content } from '../styles'
import Layout from '../components/Layout'
import Post from '../components/post'

const getNodes = entity => {
  return entity.edges.map(({ node }) => node)
}

export default class IndexPage extends React.Component {
  render() {
    const { data } = this.props
    const posts = getNodes(data.posts)

    return (
      <Layout wide displayTagline>
        <Content wide>
          <Container wide>
            <PageHeading>Latest Posts</PageHeading>
          </Container>
          {posts
            .sort((a, b) => b.frontmatter.pinned - a.frontmatter.pinned)
            .map(post => (
              <Post key={post.id} post={post} />
            ))}
        </Content>
      </Layout>
    )
  }
}

export const pageQuery = graphql`
  {
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
