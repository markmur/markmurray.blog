import {
  Box,
  Container,
  Content,
  Description,
  PostTitle,
  Subtitle,
} from '../styles';

import Helmet from 'react-helmet';
import Layout from '../components/Layout';
import { PageProps } from 'gatsby';
import ProductGrid from '../components/ProductGrid';
import React from 'react';
import { graphql } from 'gatsby';

interface CollectionTemplateProps {
  title: string;
  description: string;
  collection: Queries.FeaturedShopifyCollectionFragment;
  orientation: 'landscape' | 'portrait';
}

export const CollectionTemplate = ({
  title,
  description,
  collection,
  orientation,
}: CollectionTemplateProps) => {
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

        <ProductGrid products={collection.products} orientation={orientation} />
      </Container>
    </Content>
  );
};

const Collection = ({
  data,
  pageContext,
}: PageProps<
  Queries.CollectionQuery,
  { orientation: 'portrait' | 'landscape' }
>) => {
  const { collection } = data;
  const { orientation } = pageContext;

  const { id, title, description } = collection;

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
        collection={collection}
        orientation={orientation}
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
      ...FeaturedShopifyCollection
    }
  }
`;
