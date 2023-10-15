import { Content } from '../styles';
import Layout from '../components/Layout';
import Post from '../components/post';
import React from 'react';
import { graphql } from 'gatsby';

const getNodes = (entity) => {
  return entity.edges.map(({ node }) => node);
};

export default class PostsPage extends React.Component {
  render() {
    const { data } = this.props;
    const posts = getNodes(data.posts);

    return (
      <Layout wide>
        <Content wide>
          {posts
            .sort((a, b) => b.frontmatter.pinned - a.frontmatter.pinned)
            .map((post) => (
              <Post key={post.id} post={post} />
            ))}
        </Content>
      </Layout>
    );
  }
}

export const pageQuery = graphql`
  query PostsPage {
    posts: allMarkdownRemark(
      sort: { frontmatter: { date: DESC } }
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
`;
