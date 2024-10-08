import {
  Box,
  Container,
  Description,
  PostTitle,
  Subtitle,
} from '../../../styles';
import { GatsbyImage, getImage } from 'gatsby-plugin-image';
import { PageProps, graphql } from 'gatsby';

import Layout from '../../../components/Layout';
import Masonry from 'react-masonry-css';
import React from 'react';

function Photos(props: PageProps<Queries.OlympusFilmPageQuery>) {
  const imageStyles = {
    margin: 0,
    marginBottom: '1em',
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
              <GatsbyImage
                alt={image.name}
                loading="lazy"
                image={getImage(image)!}
              />
            </figure>
          ))}
        </Masonry>
      </Container>
    </Layout>
  );
}

export const pageQuery = graphql`
  query OlympusFilmPage {
    film: allFile(
      filter: { relativeDirectory: { eq: "olympus" } }
      sort: { name: DESC }
    ) {
      edges {
        node {
          id
          name
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
