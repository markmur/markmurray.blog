import React from 'react';
import { PageProps, graphql } from 'gatsby';
import { Box, PageHeading, Container } from '../styles';
import Layout from '../components/Layout';
import CollectionCarousel from '../components/CollectionCarousel';
import ErrorBoundary from '../components/ErrorBoundary';

const getNodes = (entity) => {
  return entity.edges.map(({ node }) => node);
};

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
          products={featuredFilmCollection.edges.map(({ node }, index) => ({
            id: index,
            title: `${node.title}`,
            handle: `${node.title}`,
            media: [{ image: node.childImageSharp }],
            images: [
              {
                gatsbyImageData: node.childImageSharp.gatsbyImageData,
                src: node.childImageSharp.gatsbyImageData.images.fallback.src,
                backgroundColor:
                  node.childImageSharp.gatsbyImageData.backgroundColor,
              },
            ],
            to: '/photography/film/olympus-mju-iii',
            metafields: [{ key: 'orientation', value: 'landscape' }],
          }))}
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
      edges {
        node {
          id
          childImageSharp {
            gatsbyImageData(quality: 75, placeholder: DOMINANT_COLOR)
          }
        }
      }
    }
    featuredCollection: shopifyCollection(title: { eq: "Iceland" }) {
      ...FeaturedShopifyCollection
    }
    featuredCollectionTwo: shopifyCollection(title: { eq: "Sapphire" }) {
      ...FeaturedShopifyCollection
    }
  }

  fragment ShopifyMedia on ShopifyMediaImage {
    image {
      gatsbyImageData
    }
  }

  fragment FeaturedShopifyCollection on ShopifyCollection {
    id
    title
    handle
    description
    products {
      id
      handle
      title
      media {
        ... on ShopifyMediaImage {
          image {
            gatsbyImageData
          }
        }
      }
      priceRangeV2 {
        minVariantPrice {
          amount
          currencyCode
        }
      }
      metafields {
        key
        value
      }
    }
  }
`;

export default IndexPage;
