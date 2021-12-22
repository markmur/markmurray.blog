import React from 'react';
import { graphql } from 'gatsby';
import { getImageUrl, getProductUrl, Sizes } from '../utils/image';
import { Flex, Box, Button, Container, PageHeading, Text } from '../styles';
import Layout from '../components/Layout';
import BackgroundLines from '../components/BackgroundLines';
import CollectionCarousel from '../components/CollectionCarousel';
import ImageGrid from '../components/ImageGrid';

function getTags(edges) {
  const allTags = {};

  for (const photo of edges) {
    const tags = [photo.node.frontmatter.collection] || [];

    for (const tag of tags) {
      const lowercaseTag = (tag || '').toLowerCase();
      if (lowercaseTag in allTags) {
        allTags[lowercaseTag]++;
      } else {
        allTags[lowercaseTag] = 1;
      }
    }
  }

  return allTags;
}

type Edge<T> = {
  node: {
    id: string;
    fields: {
      slug: string;
    };
  } & {
    frontmatter: T;
  };
};

type Edges<T> = {
  edges: Edge<T>[];
};

interface Photo {
  collection: string;
  stripe_product_id: string;
  title: string;
  tags: string[];
  templateKey: string;
  description: string;
  image_url: string;
  camera: string;
  lens: string;
  location: string;
  orientation: string;
  width: string;
  height: string;
  date: string;
}

interface Collection {
  id: string;
  fields: {
    slug: string;
  };
  frontmatter: {
    collection_id: string;
    stripe_product_id: string;
    title: string;
    heading: string;
    templateKey: string;
    description: string;
    image_url: string;
    location: string;
    orientation: string;
    width: string;
    height: string;
    minPrice: number;
  };
}

interface CollectionImages {
  image_url: string;
  stripe_product_id: string;
}

interface Props {
  data: {
    collection: Collection;
    photography: Edges<Photo>;
    collectionImages: Edges<CollectionImages>;
  };
}

export default class PhotographyPage extends React.Component<
  Props,
  { selectedCollection: string | null }
> {
  state = {
    selectedCollection: null,
  };

  _filterPhotosByCollection(
    photos: Props['data']['photography'],
    collection: string,
  ) {
    if (!collection) return photos.edges;

    return photos.edges.filter(
      ({ node }) => node.frontmatter.collection == collection,
    );
  }

  _getCollections(photos: Props['data']['photography']): string[] {
    const collections = new Set();

    for (const { node } of photos.edges) {
      collections.add(node.frontmatter.collection);
    }

    return Array.from(collections) as string[];
  }

  handleCollectionClick = (collection: string | null) => {
    this.setState({
      selectedCollection: collection,
    });
  };

  render() {
    const { data } = this.props;
    const { collection } = data;

    const photos = this._filterPhotosByCollection(
      data.photography,
      this.state.selectedCollection,
    );

    const collections = this._getCollections(data.photography);

    return (
      <Layout wide displayTagline={false}>
        <BackgroundLines />

        <Container py={[5, 6]} pt={[5, 5]} pb={[3, 4]}>
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
                <strong>Fujifilm XT-30</strong> DSLR. Prints are available for
                all photos listed here and on my Instagram. All photos are
                printed on high quality Fuji Matt Paper and come in a variety of
                sizes. Don't see a particular size listed? Feel free to reach
                out to me to arrange a custom order at no extra cost.
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
                )
              </p>
            </Box>
          </Flex>
        </Container>

        <CollectionCarousel
          id={collection.frontmatter.collection_id}
          title={collection.frontmatter.title}
          description={collection.frontmatter.description}
          heading={collection.frontmatter.heading}
          images={data.collectionImages.edges.map(
            ({ node }) => node.frontmatter,
          )}
          minPrice={collection.frontmatter.minPrice}
        />

        <Container>
          <hr />

          <div style={{ position: 'relative' }}>
            <div style={{ position: 'sticky', top: 0 }}>
              <Flex py={5} style={{ overflow: 'auto' }} justifyContent="center">
                <Box>
                  <Text textAlign="center" as="h1" mb={5}>
                    Collections
                  </Text>
                  <Flex flexWrap="nowrap">
                    <Button
                      tag
                      selected={this.state.selectedCollection === null}
                      onClick={() => this.handleCollectionClick(null)}
                      mr={1}
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

          <ImageGrid
            key={this.state.selectedCollection || 'all'}
            images={photos.map(({ node }) => ({
              image_url: getImageUrl(node.frontmatter.image_url, Sizes.medium),
              title: node.frontmatter.title,
              href: getProductUrl(node.frontmatter),
            }))}
          />
        </Container>
      </Layout>
    );
  }
}

export const pageQuery = graphql`
  {
    collection: markdownRemark(
      frontmatter: {
        templateKey: { eq: "collection" }
        collection_id: { eq: "reflections" }
      }
    ) {
      id
      fields {
        slug
      }
      frontmatter {
        id
        collection_id
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
      filter: { frontmatter: { collection: { eq: "reflections" } } }
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
    photography: allMarkdownRemark(
      filter: {
        frontmatter: {
          templateKey: { eq: "photo" }
          hidden: { ne: true }
          stripe_product_id: { ne: null }
        }
      }
      sort: { fields: [frontmatter___title] }
    ) {
      edges {
        node {
          id
          fields {
            slug
          }
          frontmatter {
            collection
            stripe_product_id
            title
            tags
            templateKey
            description
            image_url
            camera
            lens
            location
            orientation
            width
            height
            date(formatString: "MMMM DD, YYYY")
          }
        }
      }
    }
  }
`;
