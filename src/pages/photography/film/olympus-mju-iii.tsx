import React from 'react';
import { GatsbyImage, getImage } from 'gatsby-plugin-image';
import Layout from '../../../components/Layout';
import {
  Box,
  Container,
  Description,
  PostTitle,
  Subtitle,
} from '../../../styles';
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

      <Container textAlign="center">
        <Box mt={4}>
          <Subtitle>Film Photography</Subtitle>
        </Box>

        <PostTitle mb={3}>Olympus mju III</PostTitle>

        <Box maxWidth={800} margin="auto">
          <Description>
            A collection of photos taken in Greece with an Olympus MJU III and
            Portra 160/400.
          </Description>
        </Box>

        <hr />

        <Masonry
          breakpointCols={{ default: 2, 1100: 2, 700: 2, 500: 1 }}
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
      filter: { relativeDirectory: { eq: "olympus" } }
      sort: { fields: name, order: [DESC] }
    ) {
      edges {
        node {
          id
          childImageSharp {
            gatsbyImageData(width: 636, placeholder: DOMINANT_COLOR)
          }
        }
      }
    }
  }
`;

export default Photos;
