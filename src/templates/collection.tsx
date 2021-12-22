import React from 'react';
import Helmet from 'react-helmet';
import { graphql } from 'gatsby';

import Layout from '../components/Layout';
import {
  Container,
  Content,
  Description,
  PostTitle,
  Flex,
  Box,
} from '../styles';
import ImageGrid from '../components/ImageGrid';
import { getImageUrl, getProductUrl } from '../utils/image';

export const CollectionTemplate = ({ title, description, images }) => {
  return (
    <Content pb={4} pt={5}>
      <Container>
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
  const { collection, images, prices } = data;

  const { id, title, description } = collection.frontmatter;
  const imageUrls = images.edges.map(({ node }) => ({
    image_url: getImageUrl(node.frontmatter.image_url),
    href: getProductUrl(node.frontmatter.stripe_product_id),
    title: node.frontmatter.title,
    price: getPriceByProductId(prices, node.frontmatter.stripe_product_id),
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
    collection: markdownRemark(frontmatter: { collection_id: { eq: $id } }) {
      id
      frontmatter {
        title
        description
      }
    }
    prices: allStripePrice(filter: {}) {
      edges {
        node {
          id
          currency
          unit_amount
          product {
            id
          }
        }
      }
    }
    images: allMarkdownRemark(
      filter: { frontmatter: { collection: { eq: $id } } }
      sort: { fields: [frontmatter___title] }
    ) {
      edges {
        node {
          id
          frontmatter {
            title
            image_url
            stripe_product_id
          }
        }
      }
    }
  }
`;
