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
      <Container>
        <Box textAlign={["left", "center"]}>
          <Subtitle>Collection</Subtitle>
        </Box>

        <PostTitle
          dangerouslySetInnerHTML={{ __html: title }}
          textAlign={['left', 'center']}
          mb={3}
        />
        <Description>{description}</Description>

        <hr />

        <ImageGrid images={images} grid={[2, 3, 4]} />
      </Container>
    </Content>
  );
};

const getPriceByProductId = (prices, productId) => {
  const amounts = prices.edges.filter(
    ({ node }) => node.product.id === productId,
  );
  return Math.min(...amounts.map((x) => x.node.unit_amount)) / 100;
};

const Collection = ({ data }) => {
  const { collection } = data;

  const { id, title, description } = collection;
  const imageUrls = collection.products.map((product) => ({
    image_url: product.images[0].src,
    href: getProductUrl(product),
    title: product.title
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
        id={collection.id}
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
      }
    }
  }
`;
