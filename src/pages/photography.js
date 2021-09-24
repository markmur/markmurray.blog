import React from 'react'
import { graphql } from 'gatsby'
import { getImageUrl } from '../utils/image.ts'
import {
  Flex,
  Box,
  Button,
  Container,
  Photo as StyledPhoto,
  PhotoInfo,
  PhotoOverlay,
  PageHeading,
} from '../styles'
import Layout from '../components/Layout'
import BackgroundLines from '../components/BackgroundLines'
import CollectionCarousel from '../components/CollectionCarousel/index.tsx'

const getNodes = photos => {
  const nodes = []
  let batchLength = 2
  let batch = []

  for (const edge of photos) {
    const { node } = edge

    if (node.frontmatter.orientation === 'landscape') {
      nodes.push(node)
    } else {
      batch.push(node)

      if (batch.length === 2) {
        nodes.push(batch)
        batch = []
        batchLength = batchLength === 2 ? 3 : 2
      }
    }
  }

  return nodes.concat(batch)
}

function filterPhotos(photos, tag, orientation) {
  return photos.edges.filter(
    ({ node }) =>
      (tag ? (node.frontmatter.tags || []).includes(tag) : true) &&
      (orientation
        ? node.frontmatter.orientation.toLowerCase() === orientation
        : true),
  )
}

function getTags(edges) {
  const allTags = {}

  for (const photo of edges) {
    const tags = photo.node.frontmatter.tags || []

    for (const tag of tags) {
      const lowercaseTag = (tag || '').toLowerCase()
      if (lowercaseTag in allTags) {
        allTags[lowercaseTag]++
      } else {
        allTags[lowercaseTag] = 1
      }
    }
  }

  return allTags
}

function Photo(props) {
  const { photo, style = {} } = props

  const maxWidth = photo.orientation === 'landscape' ? '100%' : '48%'

  return (
    <Box
      key={photo.id}
      mb={[3, 5]}
      style={{
        flex: `0 1 ${maxWidth}`,
        maxWidth,
        ...style,
      }}
    >
      <StyledPhoto>
        <img
          loading="lazy"
          style={{
            height: 'auto',
            marginBottom: -3,
            minHeight: 658,
          }}
          width={photo.width}
          height={photo.height}
          src={getImageUrl(photo.image_url)}
          alt={photo.description}
        />

        <PhotoOverlay>
          <Flex justifyContent="space-between" alignItems="center">
            <Box pr={2}>
              <h4>{photo.title}</h4>

              <p>{photo.description}</p>

              <small>
                Shot with a{' '}
                <b>
                  <u>
                    {photo.camera}
                    {photo.lens && ` | ${photo.lens}`}
                  </u>
                </b>
              </small>
            </Box>

            {photo.stripe_product_id && (
              <Button>
                <a href={`/photography/${photo.stripe_product_id}`}>
                  Buy print
                </a>
              </Button>
            )}
          </Flex>
        </PhotoOverlay>
      </StyledPhoto>

      <PhotoInfo>
        <h5>{photo.location}</h5>
      </PhotoInfo>
    </Box>
  )
}

export default class PhotographyPage extends React.Component {
  state = {
    selectedTag: null,
    selectedOrientation: null,
  }

  handleTagClick = tag => {
    if (this.state.selectedTag === tag) {
      this.setState({
        selectedTag: null,
      })
    } else {
      this.setState({
        selectedTag: tag,
      })
    }
  }

  handleOrientationClick = orientation => {
    if (this.state.selectedOrientation === orientation) {
      this.setState({
        selectedOrientation: null,
      })
    } else {
      this.setState({
        selectedOrientation: orientation,
      })
    }
  }

  render() {
    const { data } = this.props
    const { collection } = data

    let photos

    if (this.state.selectedOrientation || this.state.selectedTag) {
      const filteredPhotos = filterPhotos(
        data.photography,
        this.state.selectedTag,
        this.state.selectedOrientation,
      )
      photos = getNodes(filteredPhotos)
    } else {
      photos = getNodes(data.photography.edges)
    }

    const tags = getTags(data.photography.edges)

    return (
      <Layout wide displayTagline={false}>
        <BackgroundLines />
        <CollectionCarousel
          id={collection.frontmatter.id}
          title={collection.frontmatter.title}
          description={collection.frontmatter.description}
          heading={collection.frontmatter.heading}
          images={data.collectionImages.edges.map(({ node }) =>
            getImageUrl(node.frontmatter.image_url),
          )}
        />

        <Container wide>
          <PageHeading textAlign="center">Photography</PageHeading>

          <Flex justifyContent="center">
            <Box maxWidth={800} textAlign="center">
              <p>
                A collection of photos taken with my{' '}
                <strong>DJI Mavic Air 2</strong> drone and{' '}
                <strong>Fujifilm XT-30</strong> DSLR. Prints will be available
                soon for all listed photos and are printed on the highest
                quality printing paper. Want a particular size or photo that
                isn't listed? Contact me for any custom orders.
              </p>

              <p>
                For collaboration requests, contact me at{' '}
                <a href="mailto:contact@markmurray.co">contact@markmurray.co</a>
                . To follow my most recent work, follow my{' '}
                <a href="https://instagram.com/markmur">Instagram</a> (
                <a href="https://instagram.com/markmur">@markmur</a>)
              </p>
            </Box>
          </Flex>

          <hr />

          <div style={{ position: 'relative' }}>
            <div style={{ position: 'sticky', top: 0 }}>
              <Flex py={4} style={{ overflow: 'auto' }}>
                <Box mr={5}>
                  <h4>Orientation</h4>
                  <Flex>
                    <Box mr={2}>
                      <Button
                        tag
                        small
                        selected={this.state.selectedOrientation === 'portrait'}
                        onClick={() => this.handleOrientationClick('portrait')}
                      >
                        Portrait
                      </Button>
                    </Box>

                    <Box mr={2}>
                      <Button
                        tag
                        small
                        selected={
                          this.state.selectedOrientation === 'landscape'
                        }
                        onClick={() => this.handleOrientationClick('landscape')}
                      >
                        Landscape
                      </Button>
                    </Box>
                  </Flex>
                </Box>

                <Box>
                  <h4>Tags</h4>
                  <Flex>
                    {Object.entries(tags)
                      .sort()
                      .map(([tag]) => (
                        <Box key={tag} mr={2}>
                          <Button
                            tag
                            small
                            selected={this.state.selectedTag === tag}
                            onClick={() => this.handleTagClick(tag)}
                          >
                            {tag}
                          </Button>
                        </Box>
                      ))}
                  </Flex>
                </Box>
              </Flex>
            </div>
          </div>

          {/* {photos.map(item => {
            if (Array.isArray(item)) {
              return (
                <Flex justifyContent="space-between">
                  {item.map(photo => (
                    <Photo key={photo.id} photo={photo.frontmatter} />
                  ))}
                </Flex>
              )
            }

            // Landscape
            return <Photo key={item.id} photo={item.frontmatter} />
          })} */}
        </Container>
      </Layout>
    )
  }
}

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
      }
    }
    collectionImages: allMarkdownRemark(
      filter: { frontmatter: { collection: { eq: "sapphire" } } }
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
    photography: allMarkdownRemark(
      filter: {
        frontmatter: { templateKey: { eq: "photo" }, hidden: { ne: true } }
      }
      sort: { fields: [frontmatter___order] }
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
`
