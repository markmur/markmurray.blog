import React from 'react';
import { graphql } from 'gatsby';
import { FiArrowRight } from 'react-icons/fi';
import { Flex, Box, Link, PageHeading, Container, Content } from '../styles';
import Layout from '../components/Layout';
import CollectionCarousel from '../components/CollectionCarousel/index.tsx';
import { getImageUrl } from '../utils/image.ts';
import PostPreviews from '../components/PostPreviews/index.tsx';
import { useCarousel } from '../components/Carousel';
import Controls from '../components/Carousel/Controls';
import { Sizes } from '../utils/image';

const getNodes = entity => {
  return entity.edges.map(({ node }) => node);
};

const IndexPage = props => {
  const { data } = props;
  const { collection, collectionImages } = data;
  const posts = getNodes(data.posts);

  const containerRef = React.useRef(null);
  const { observe, next, prev } = useCarousel(containerRef, 300);

  return (
    <Layout wide displayTagline>
      <Box pt={4}>
        <Container>
          <Box mb={4}>
            <PageHeading>Latest Art</PageHeading>
          </Box>
        </Container>
      </Box>

      <CollectionCarousel
        id={collection.frontmatter.id}
        title={collection.frontmatter.title}
        description={collection.frontmatter.description}
        heading={collection.frontmatter.heading}
        images={collectionImages.edges.map(({ node }) =>
          getImageUrl(node.frontmatter.image_url, Sizes.medium),
        )}
        minPrice={collection.frontmatter.minPrice}
      />

      <Box pt={4}>
        <Container mb="40px">
          <Flex justifyContent="space-between" alignItems="flex-end">
            <div>
              <Box mb={3}>
                <PageHeading>Latest Tech</PageHeading>
              </Box>

              <Link to="/posts">
                See all posts <FiArrowRight />
              </Link>
            </div>

            <Controls onNext={next} onPrev={prev} />
          </Flex>
        </Container>
      </Box>

      <Box mb={4}>
        <PostPreviews
          forwardedRef={containerRef}
          observe={observe}
          posts={posts.sort(
            (a, b) => b.frontmatter.pinned - a.frontmatter.pinned,
          )}
        />
      </Box>
    </Layout>
  );
};

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
      sort: { fields: [frontmatter___title] }
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
`;

export default IndexPage;
