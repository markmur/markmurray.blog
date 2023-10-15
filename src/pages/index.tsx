import { Box, Container, PageHeading } from '../styles';
import { PageProps, graphql } from 'gatsby';

import CollectionCarousel from '../components/CollectionCarousel';
import ErrorBoundary from '../components/ErrorBoundary';
import Layout from '../components/Layout';
import React from 'react';
import { fileCollectionToProductCollection } from '../utils/collection';

const IndexPage = (props: PageProps<Queries.IndexPageQuery>) => {
  const { data } = props;
  const { featuredCollection, featuredCollectionTwo, featuredFilmCollection } =
    data;

  return (
    <Layout wide displayTagline>
      <ErrorBoundary>
        <Box pt={[0, 4]}>
          <Container>
            <Box mb={[3, 4]}>
              <PageHeading>Latest Collections</PageHeading>
            </Box>
          </Container>
        </Box>

        <CollectionCarousel
          id="film"
          handle="film"
          to="/photography/film/olympus-mju-iii"
          title="Olympus mju III"
          description="A collection of photos taken in Greece on
            Portra 400 film with an Olympus mju III."
          products={fileCollectionToProductCollection(
            featuredFilmCollection,
            '/photography/film/olympus-mju-iii',
          )}
        />

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
      </ErrorBoundary>
    </Layout>
  );
};

export const pageQuery = graphql`
  query IndexPage {
    featuredFilmCollection: allFile(
      filter: { relativeDirectory: { eq: "olympus" } }
      sort: { name: DESC }
      limit: 8
    ) {
      ...FileCollection
    }
    featuredCollection: shopifyCollection(title: { eq: "Iceland" }) {
      ...FeaturedShopifyCollection
    }
    featuredCollectionTwo: shopifyCollection(title: { eq: "Sapphire" }) {
      ...FeaturedShopifyCollection
    }
  }

  fragment FileCollection on FileConnection {
    edges {
      node {
        id
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
