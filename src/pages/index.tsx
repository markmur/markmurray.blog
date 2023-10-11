import React from 'react';
import { graphql } from 'gatsby';
import { Box, PageHeading, Container } from '../styles';
import Layout from '../components/Layout';
import CollectionCarousel from '../components/CollectionCarousel';
import ErrorBoundary from '../components/ErrorBoundary';

const getNodes = (entity) => {
  return entity.edges.map(({ node }) => node);
};

const IndexPage = (props) => {
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

        {console.log(
          featuredFilmCollection.edges[0].node.childImageSharp.gatsbyImageData
            .images,
        )}

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
  {
    featuredFilmCollection: allFile(
      filter: { relativeDirectory: { eq: "olympus" } }
      sort: { fields: name, order: [DESC] }
      limit: 8
    ) {
      edges {
        node {
          id
          childImageSharp {
            gatsbyImageData(
              quality: 75
              placeholder: DOMINANT_COLOR
              formats: [AUTO, WEBP, AVIF]
            )
          }
        }
      }
    }
    featuredCollection: shopifyCollection(title: { eq: "Iceland" }) {
      id
      title
      handle
      description
      products {
        id
        handle
        title
        images {
          gatsbyImageData(
            placeholder: DOMINANT_COLOR
            formats: [AUTO, WEBP, AVIF]
          )
          src
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
    featuredCollectionTwo: shopifyCollection(title: { eq: "Sapphire" }) {
      id
      title
      handle
      description
      products {
        id
        handle
        title
        images {
          gatsbyImageData(
            placeholder: DOMINANT_COLOR
            formats: [AUTO, WEBP, AVIF]
          )
          src
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
  }
`;

export default IndexPage;
