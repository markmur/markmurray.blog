import React from 'react';
import Helmet from 'react-helmet';
import { graphql } from 'gatsby';

import Layout from '../components/Layout';
import {
  Box,
  Container,
  Content,
  Description,
  PostTitle,
  Subtitle,
} from '../styles';
import ImageGrid from '../components/ImageGrid';
import { getProductUrl } from '../utils/product';

export const CollectionTemplate = ({ title, description, images }) => {
  return (
    <Content pb={4} pt={5}>
      <Container textAlign="center">
        <Box>
          <Subtitle>Print Collection</Subtitle>
        </Box>

        <PostTitle dangerouslySetInnerHTML={{ __html: title }} mb={3} />

        <Box maxWidth={800} margin="auto">
          <Description>{description}</Description>
        </Box>

        <hr />

        <ImageGrid center images={images} grid={[2, 3, 4]} />
      </Container>
    </Content>
  );
};

const Collection = ({ data }) => {
  const { collection } = data;

  const { id, title, description } = collection;
  const imageUrls = collection.products.map((product) => ({
    image_url: product.images[0].src,
    href: getProductUrl(product),
    title: product.title,
    ...product,
  }));

  const url = data.site.siteMetadata.url + `/collection/${id}`;

  return (
    <Layout wide>
      <Helmet titleTemplate="%s">
        <title>{title}</title>
        <meta name="description" content={description} />

        <meta property="og:type" content="website" />
        <meta property="og:url" content={url} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />

        {/* {image && <meta property="og:image" content={image} />}
        {image && <meta property="twitter:image" content={image} />}
        {image && <meta property="image" content={image} />} */}

        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content={url} />
        <meta property="twitter:title" content={title} />
        <meta property="twitter:description" content={description} />
      </Helmet>

      <CollectionTemplate
        title={title}
        description={description}
        images={imageUrls}
      />
    </Layout>
  );
};

export default Collection;

export const pageQuery = graphql`
  query Collection($id: String!) {
    site {
      siteMetadata {
        url
      }
    }
    collection: shopifyCollection(id: { eq: $id }) {
      id
      title
      description
      products {
        id
        title
        handle
        images {
          src
        }
        priceRangeV2 {
          minVariantPrice {
            amount
            currencyCode
          }
        }
      }
    }
  }
`;
