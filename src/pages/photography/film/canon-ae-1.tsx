import React from 'react';
import { GatsbyImage, getImage } from 'gatsby-plugin-image';
import Layout from '../../../components/Layout';
import {
  Box,
  Text,
  Container,
  PageHeading,
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

        <PostTitle mb={3}>Canon AE-1</PostTitle>

        <Box maxWidth={800} margin="auto">
          <Description>
            A collection of photos taken in Dublin with a Canon AE-1 and
            Lomography Redscale XP 50-200.
          </Description>
        </Box>

        <hr />

        <Masonry
          breakpointCols={{ default: 3, 1100: 3, 700: 2, 500: 1 }}
          className="masonry-grid"
          columnClassName="masonry-column"
        >
          {images.map((image) => (
            <figure style={imageStyles} key={image.id}>
              <GatsbyImage alt="" loading="lazy" image={getImage(image)!} />
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
      filter: { relativeDirectory: { eq: "canon" } }
      sort: { fields: name, order: [ASC] }
    ) {
      edges {
        node {
          id
          childImageSharp {
            gatsbyImageData(
              quality: 75
              width: 636
              placeholder: DOMINANT_COLOR
            )
          }
        }
      }
    }
  }
`;

export default Photos;
