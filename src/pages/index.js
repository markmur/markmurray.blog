import React from 'react'
import { graphql } from 'gatsby'
import { PageHeading, Container, Content } from '../styles'
import Layout from '../components/Layout'
import Post from '../components/post'

export default class IndexPage extends React.Component {
  render() {
    const { data } = this.props
    const { edges } = data.allMarkdownRemark

    const posts = edges.map(({ node }) => node)

    return (
      <Layout>
        <Content>
          <Container>
            <PageHeading>Latest Posts</PageHeading>
          </Container>
          {posts.map(post => (
            <Post key={post.id} post={post} />
          ))}
        </Content>
      </Layout>
    )
  }
}

export const pageQuery = graphql`
  query IndexQuery {
    allMarkdownRemark(
      sort: { order: DESC, fields: [frontmatter___date] }
      filter: { frontmatter: { templateKey: { eq: "blog-post" } } }
    ) {
      edges {
        node {
          id
          fields {
            slug
          }
          frontmatter {
            title
            tags
            templateKey
            description
            date(formatString: "MMMM DD, YYYY")
          }
        }
      }
    }
  }
`
