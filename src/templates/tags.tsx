import { Container, Content } from '../styles';
import { PageProps, graphql } from 'gatsby';

import Helmet from 'react-helmet';
import Layout from '../components/Layout';
import Post from '../components/post';
import React from 'react';

export default function TagRoute(
  props: PageProps<Queries.TagPageQuery, { tag: string }>,
) {
  const { pageContext } = props;
  const { allMarkdownRemark, site } = props.data;
  const posts = props.data.allMarkdownRemark.edges;

  const { tag } = pageContext;
  const { title } = site.siteMetadata;
  const { totalCount } = allMarkdownRemark;

  return (
    <Layout wide>
      <section>
        <Helmet title={`${tag} | ${title}`} />
        <Content>
          <Container>
            <h3>
              {totalCount} post{totalCount === 1 ? '' : 's'} tagged with “{tag}”
            </h3>
          </Container>
          {posts.map(({ node: post }) => (
            <Post key={post.id} post={post} />
          ))}
        </Content>
      </section>
    </Layout>
  );
}

export const tagPageQuery = graphql`
  query TagPage($tag: String) {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(
      limit: 1000
      sort: { frontmatter: { date: DESC } }
      filter: {
        frontmatter: { templateKey: { eq: "blog-post" }, tags: { in: [$tag] } }
      }
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
`;
