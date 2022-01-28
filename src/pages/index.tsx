import React from 'react';
import { graphql } from 'gatsby';
import { FiArrowRight } from 'react-icons/fi';
import { Flex, Box, Link, PageHeading, Container } from '../styles';
import Layout from '../components/Layout';
import CollectionCarousel from '../components/CollectionCarousel';
import PostPreviews from '../components/PostPreviews';
import { useCarousel } from '../components/Carousel';
import Controls from '../components/Carousel/Controls';
import ErrorBoundary from '../components/ErrorBoundary';

const getNodes = (entity) => {
  return entity.edges.map(({ node }) => node);
};

const getMinPrice = (products) => {
  return Math.min(...products.map(product => product.priceRangeV2.minVariantPrice.amount))
}

const IndexPage = (props) => {
  const { data } = props;
  const { featuredCollection, collectionImages } = data;
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

      <ErrorBoundary>
        <CollectionCarousel
          id={featuredCollection.id}
          title={`The ${featuredCollection.title} Collection`}
          description={featuredCollection.description}
          heading={featuredCollection.title}
          images={featuredCollection.products.map(({ id, handle, images }) => ({image_url: images?.[0].src, id, handle  }))}
          minPrice={getMinPrice(featuredCollection.products)}
        />
      </ErrorBoundary>

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

      <Box mb={4} mt={4}>
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
    featuredCollection: shopifyCollection(title: {eq: "Sapphire"}) {
      id
      title
      description
      products {
        id
        handle
        images {
          src
        }
        priceRangeV2 {
          minVariantPrice {
            amount
            currencyCode
          }
        }
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
            stripe_product_id
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
