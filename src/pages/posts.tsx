import { PageProps, graphql } from 'gatsby';

import { Content } from '../styles';
import Layout from '../components/Layout';
import Post from '../components/post';
import React from 'react';

const getNodes = (entity) => {
  return entity.edges.map(({ node }) => node);
};

export default function PostsPage(props: PageProps<Queries.PostsPageQuery>) {
  const { posts } = props.data;

  return (
    <Layout wide>
      <Content>
        {getNodes(posts)
          .sort((a, b) => b.frontmatter.pinned - a.frontmatter.pinned)
          .map((post) => (
            <Post key={post.id} post={post} />
          ))}
      </Content>
    </Layout>
  );
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
