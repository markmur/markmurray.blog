import React from 'react'
import PropTypes from 'prop-types'
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

IndexPage.propTypes = {
  data: PropTypes.shape({
    allMarkdownRemark: PropTypes.shape({
      edges: PropTypes.array,
    }),
  }),
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
            templateKey
            description
            date(formatString: "MMMM DD, YYYY")
          }
        }
      }
    }
  }
`
