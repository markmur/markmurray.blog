import { Container, Content, PageHeading } from '../styles';
import { PageProps, graphql } from 'gatsby';

import Layout from '../components/Layout';
import Post from '../components/post';
import React from 'react';

export default function BlogPage(props: PageProps<Queries.BlogPageQuery>) {
  const { data } = props;
  const { edges } = data.allMarkdownRemark;

  const posts = edges.map(({ node }) => node);

  return (
    <Layout>
      <Content>
        <Container>
          <PageHeading>Latest Posts</PageHeading>
        </Container>
        {posts.map((post) => (
          <Post key={post.id} post={post} />
        ))}
      </Content>
    </Layout>
  );
}

export const pageQuery = graphql`
  query BlogPage {
    allMarkdownRemark(
      sort: [{ frontmatter: { pinned: ASC } }, { frontmatter: { date: DESC } }]
      filter: {
        frontmatter: { templateKey: { eq: "blog-post" }, private: { ne: true } }
      }
    ) {
      edges {
        node {
          id
          fields {
            readingTime {
              text
            }
          }
          frontmatter {
            slug
            title
            tags
            templateKey
            description
            pinned
            date(formatString: "MMMM DD, YYYY")
          }
        }
      }
    }
  }
`;
