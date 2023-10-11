import React from 'react'
import { graphql } from 'gatsby'
import Layout from '../components/Layout'
import Post from '../components/post'
import { Content } from '../styles'

const getNodes = entity => {
  return entity.edges.map(({ node }) => node)
}

export default class PostsPage extends React.Component {
  render() {
    const { data } = this.props
    const posts = getNodes(data.posts)

    return (
      <Layout wide>
        <Content wide>
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

export const pageQuery = graphql`{
  posts: allMarkdownRemark(
    sort: {frontmatter: {date: DESC}}
    filter: {frontmatter: {private: {ne: true}, templateKey: {eq: "blog-post"}}}
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
}`
