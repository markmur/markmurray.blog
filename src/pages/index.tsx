import { Box, Container, PageHeading } from '../styles';
import { PageProps, graphql } from 'gatsby';

import CollectionCarousel from '../components/CollectionCarousel';
import ErrorBoundary from '../components/ErrorBoundary';
import Layout from '../components/Layout';
import Post from '../components/post';
import React from 'react';

const IndexPage = (props: PageProps<Queries.IndexPageQuery>) => {
  const { data } = props;
  const {
    pinnedArticle,
    featuredCollection,
    featuredCollectionTwo,
    featuredCollectionThree,
  } = data;

  return (
    <Layout wide displayTagline>
      <ErrorBoundary>
        <Box pt={[0, 4]}>
          <Container>
            {pinnedArticle && (
              <Box mb={[3, 4]}>
                <PageHeading>Latest thoughts</PageHeading>
                <Post post={pinnedArticle} />
              </Box>
            )}
            <Box pt={4} mb={[3, 4]}>
              <PageHeading>Latest photography</PageHeading>
            </Box>
          </Container>
        </Box>

        <CollectionCarousel
          id={featuredCollection.id}
          handle={featuredCollection.handle}
          title={`${featuredCollection.title} Collection`}
          description={featuredCollection.description}
          heading={featuredCollection.title}
          products={featuredCollection.products}
        />

        <CollectionCarousel
          id={featuredCollectionTwo.id}
          handle={featuredCollectionTwo.handle}
          title={`${featuredCollectionTwo.title} Collection`}
          description={featuredCollectionTwo.description}
          heading={featuredCollectionTwo.title}
          products={featuredCollectionTwo.products}
        />

        <CollectionCarousel
          id={featuredCollectionThree.id}
          handle={featuredCollectionThree.handle}
          title={`${featuredCollectionThree.title} Collection`}
          description={featuredCollectionThree.description}
          heading={featuredCollectionThree.title}
          products={featuredCollectionThree.products}
        />
      </ErrorBoundary>
    </Layout>
  );
};

export const pageQuery = graphql`
  query IndexPage {
    pinnedArticle: markdownRemark(
      frontmatter: {
        pinned: { eq: true }
        templateKey: { eq: "blog-post" }
        private: { ne: true }
      }
    ) {
      id
      fields {
        slug
        readingTime {
          text
        }
      }
      frontmatter {
        title
        description
        tags
        pinned
        date(formatString: "MMMM DD, YYYY")
      }
    }
    featuredCollection: shopifyCollection(title: { eq: "Iceland" }) {
      ...FeaturedShopifyCollection
    }
    featuredCollectionTwo: shopifyCollection(title: { eq: "Sapphire" }) {
      ...FeaturedShopifyCollection
    }
    featuredCollectionThree: shopifyCollection(title: { eq: "Reflections" }) {
      ...FeaturedShopifyCollection
    }
  }

  fragment FileCollection on FileConnection {
    edges {
      node {
        id
        title: name
        childImageSharp {
          gatsbyImageData(quality: 75, placeholder: DOMINANT_COLOR, width: 576)
        }
      }
    }
  }

  fragment Media on ShopifyMediaImage {
    image {
      gatsbyImageData(width: 576)
    }
  }

  fragment FeaturedMedia on ShopifyProduct {
    featuredMedia {
      id
      preview {
        image {
          src
          altText
          width
          height
          gatsbyImageData(width: 576)
        }
      }
    }
  }

  fragment FeaturedShopifyCollection on ShopifyCollection {
    __typename
    id
    title
    handle
    description
    products {
      ...Product
    }
  }

  fragment Product on ShopifyProduct {
    __typename
    ...FeaturedMedia
    media {
      ...Media
    }
    id
    handle
    title
    metafields {
      key
      value
    }
    priceRangeV2 {
      minVariantPrice {
        amount
        currencyCode
      }
    }
  }

  fragment ProductDetails on ShopifyProduct {
    ...Product
    description
    createdAt
    updatedAt
    tags
    collections {
      id
      handle
      title
    }
    variants {
      id
      product {
        id
      }
      shopifyId
      price
      sku
      title
      availableForSale
      image {
        originalSrc
        gatsbyImageData
      }
      metafields {
        key
        value
      }
    }
  }
`;

export default IndexPage;
