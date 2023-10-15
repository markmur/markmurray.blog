import {
  Box,
  Button,
  Container,
  Flex,
  PageHeading,
  Subtitle,
  Text,
} from '../../styles';
import { PageProps, graphql } from 'gatsby';

import BackgroundLines from '../../components/BackgroundLines';
import CollectionCarousel from '../../components/CollectionCarousel';
import Layout from '../../components/Layout';
import ProductGrid from '../../components/ProductGrid';
import React from 'react';
import { getProductUrl } from '../../utils/product';

interface State {
  selectedCollection: string | null;
}

type Props = PageProps<Queries.PhotographyPageQuery>;

export default class PhotographyPage extends React.Component<Props, State> {
  state = {
    selectedCollection: null,
  };

  _transformEdges(edges) {
    return edges
      .reduce((state, { node }) => [...state, ...node.products], [])
      .map((product) => ({
        ...product,
        image_url: product.featuredMedia.preview.image.src,
        gatsbyImageData: product.featuredMedia.preview.image.gatsbyImageData,
        title: product.title,
        href: getProductUrl(product),
      }));
  }

  _filterPhotosByCollection(
    collections: Props['data']['collections'],
    selectedCollectionTitle: string,
  ) {
    if (!selectedCollectionTitle)
      return this._transformEdges(collections.edges);

    const filtered = collections.edges.filter(
      ({ node }) => node.title == selectedCollectionTitle,
    );

    return this._transformEdges(filtered);
  }

  _getCollections(photos: Props['data']['collections']): string[] {
    const collections = new Set();

    for (const { node } of photos.edges) {
      collections.add(node.title);
    }

    return Array.from(collections) as string[];
  }

  handleCollectionClick = (title: string | null) => {
    this.setState({
      selectedCollection: title,
    });
  };

  render() {
    const { data } = this.props;
    const { featuredCollection } = data;

    const filteredPhotos = this._filterPhotosByCollection(
      data.collections,
      this.state.selectedCollection,
    );

    const collections = this._getCollections(data.collections);

    return (
      <Layout wide>
        <BackgroundLines />

        <Container py={[5, 6]} pt={[3, 5]} pb={[3, 4]}>
          <PageHeading mb={2}>Photography &amp; art</PageHeading>

          <Flex justifyContent="left">
            <Box maxWidth={800} textAlign={['left', 'left']}>
              <p>
                I've always been particularly drawn to photography and capturing
                ephemeral moments.
              </p>

              <p>
                Below is a collection of photos taken with my{' '}
                <strong>DJI Mavic Air 2</strong> drone and{' '}
                <strong>Fujifilm XT-30</strong>. Prints are available for all
                photos listed here and on my Instagram. All photos are printed
                on high quality paper and come in a variety of sizes. If you
                don't see a particular size listed, reach out to arrange a
                custom order at no extra cost.
              </p>

              <p>
                For collaboration requests, contact me at{' '}
                <a target="_blank" href="mailto:contact@markmurray.co">
                  contact@markmurray.co
                </a>
                . To follow my most recent work, follow my{' '}
                <a target="_blank" href="https://instagram.com/markmur">
                  Instagram
                </a>{' '}
                (
                <a target="_blank" href="https://instagram.com/markmur">
                  @markmur
                </a>
                ).
              </p>
            </Box>
          </Flex>
        </Container>

        <CollectionCarousel
          id={featuredCollection.id}
          handle={featuredCollection.handle}
          title={featuredCollection.title}
          description={featuredCollection.description}
          products={featuredCollection.products as Queries.ProductFragment[]}
        />

        <Container>
          <hr />

          <div style={{ position: 'relative' }}>
            <div style={{ position: 'sticky', top: 0 }}>
              <Flex py={5} overflow="hidden" justifyContent="center">
                <Box>
                  <Subtitle textAlign="center">Shop prints</Subtitle>
                  <Text
                    textAlign="center"
                    as="h1"
                    mb={5}
                    mt={20}
                    fontSize="3rem"
                  >
                    Collections
                  </Text>
                  <Flex
                    px={[4, 0, 0]}
                    flexWrap="nowrap"
                    overflowX="auto"
                    maxWidth="100vw"
                    scrollBar={false}
                  >
                    <Button
                      tag
                      selected={this.state.selectedCollection === null}
                      onClick={() => this.handleCollectionClick(null)}
                      mr={[0, 1]}
                    >
                      All
                    </Button>
                    {collections.sort().map((collection) => (
                      <Box key={collection} mr={1}>
                        <Button
                          tag
                          selected={
                            this.state.selectedCollection === collection
                          }
                          onClick={() => this.handleCollectionClick(collection)}
                        >
                          #{collection}
                        </Button>
                      </Box>
                    ))}
                  </Flex>
                </Box>
              </Flex>
            </div>
          </div>

          <ProductGrid
            key={this.state.selectedCollection || 'all'}
            products={filteredPhotos}
          />
        </Container>
      </Layout>
    );
  }
}

export const pageQuery = graphql`
  query PhotographyPage {
    featuredCollection: shopifyCollection(title: { eq: "Sapphire" }) {
      id
      title
      handle
      description
      products {
        ...Product
      }
    }
    collections: allShopifyCollection(filter: { productsCount: { gt: 0 } }) {
      edges {
        node {
          id
          title
          handle
          products {
            ...Product
          }
        }
      }
    }
  }
`;
