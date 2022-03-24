import React from 'react';
import { GatsbyImage, getImage } from 'gatsby-plugin-image';
import Layout from '../../components/Layout';
import { Box, Text, Container, PageHeading } from '../../styles';
import Masonry from 'react-masonry-css';
import { graphql } from 'gatsby';

function Photos(props) {
  const imageStyles = {
    margin: 0,
    marginBottom: '1em',
  };

  const imageProps = {
    loading: 'lazy' as any,
    alt: '',
    placeholder: 'dominantColor' as any,
  };

  const images = props.data.film.edges.map(({ node }) => node);

  return (
    <Layout>
      <style>
        {`
        .masonry-grid {
          display: flex;
          margin-left: -1em;
          width: auto;
        }
        .masonry-column {
          padding-left: 1em;
          background-clip: padding-box;
          width: 100%;
        }
        
        /* Style your items */
        .masonry-column > div {
          background: grey;
          margin-bottom: 30px;
        }
        `}
      </style>
      <Container>
        <Box mb={2}>
          <Box mb={4}>
            <PageHeading>Film Photography</PageHeading>
          </Box>
          <Box mb={2}>
            <Text as="small">Lomography Redscale XP 50-200 (shot at 400)</Text>
          </Box>
        </Box>

        <Masonry
          breakpointCols={{ default: 3, 1100: 3, 700: 2, 500: 1 }}
          className="masonry-grid"
          columnClassName="masonry-column"
        >
          {images.map((image) => (
            <figure style={imageStyles} key={image.id}>
              <GatsbyImage {...imageProps} image={getImage(image)} />
            </figure>
          ))}
        </Masonry>
      </Container>
    </Layout>
  );
}

export const pageQuery = graphql`
  query FilmPageQuery {
    film: allFile(
      filter: { relativeDirectory: { eq: "film" } }
      sort: { fields: name, order: [ASC] }
    ) {
      edges {
        node {
          id
          childImageSharp {
            gatsbyImageData(width: 500, placeholder: DOMINANT_COLOR)
          }
        }
      }
    }
  }
`;

export default Photos;
