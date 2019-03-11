import React from 'react'
import Helmet from 'react-helmet'
import { graphql } from 'gatsby'
import Layout from '../components/Layout'
import { Content, Container } from '../styles'
import Post from '../components/post'

class TagRoute extends React.Component {
  render() {
    const { pageContext } = this.props
    const { allMarkdownRemark, site } = this.props.data
    const posts = this.props.data.allMarkdownRemark.edges

    const { tag } = pageContext
    const { title } = site.siteMetadata
    const { totalCount } = allMarkdownRemark

    return (
      <Layout>
        <section>
          <Helmet title={`${tag} | ${title}`} />
          <Content>
            <Container>
              <h3>
                {totalCount} post{totalCount === 1 ? '' : 's'} tagged with “
                {tag}”
              </h3>
            </Container>
            {posts.map(({ node: post }) => (
              <Post key={post.id} post={post} />
            ))}
          </Content>
        </section>
      </Layout>
    )
  }
}

export default TagRoute

export const tagPageQuery = graphql`
  query TagPage($tag: String) {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(
      limit: 1000
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { frontmatter: { tags: { in: [$tag] } } }
    ) {
      totalCount
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
            date(formatString: "MMMM DD, YYYY")
            title
            description
            tags
          }
        }
      }
    }
  }
`
