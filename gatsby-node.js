/* eslint-disable */
const path = require('path');
const { get, uniq, kebabCase } = require('lodash');
const { createFilePath } = require('gatsby-source-filesystem');

function isOrientationLandscape(product) {
  return Boolean(
    product.metafields.find(
      (field) => field?.key === 'orientation' && field?.value === 'landscape',
    ),
  );
}

function isOrientationPortrait(product) {
  return Boolean(
    product.metafields.find(
      (field) => field?.key === 'orientation' && field?.value === 'portrait',
    ),
  );
}

exports.createPages = ({ actions, graphql }) => {
  const { createPage, createRedirect } = actions;

  return graphql(`
    {
      metadata: site {
        siteMetadata {
          featuredCollectionTitle
        }
      }
      products: allShopifyProduct(sort: { fields: [publishedAt], order: ASC }) {
        edges {
          node {
            id
            handle
            collections {
              id
              title
            }
          }
        }
      }
      collections: allShopifyCollection {
        edges {
          node {
            id
            handle
            products {
              metafields {
                key
                value
              }
            }
          }
        }
      }
      posts: allMarkdownRemark(
        limit: 1000
        filter: { frontmatter: { templateKey: { eq: "blog-post" } } }
      ) {
        edges {
          node {
            id
            fields {
              slug
            }
            frontmatter {
              tags
              templateKey
            }
          }
        }
      }
    }
  `).then((result) => {
    if (result.errors) {
      result.errors.forEach((e) => console.error(e.toString()));
      return Promise.reject(result.errors);
    }

    const products = result.data.products.edges;
    const featuredCollectionTitle =
      result.data.metadata.siteMetadata.featuredCollectionTitle;

    products.forEach(({ node }) => {
      createPage({
        path: `/photography/${node.id}/`,
        component: path.resolve(`src/templates/product.tsx`),
        context: {
          id: node.id,
          collectionId: node.collections?.[0]?.id,
          featuredCollectionTitle:
            node.collections?.[0]?.title !== featuredCollectionTitle
              ? featuredCollectionTitle
              : null,
        },
      });
    });

    // product: alias ("handle")
    products.forEach(({ node }) => {
      createPage({
        path: `/photography/${node.handle}/`,
        component: path.resolve(`src/templates/product.tsx`),
        context: {
          id: node.id,
          collectionId: node.collections?.[0]?.id,
          featuredCollectionTitle:
            node.collections?.[0]?.title !== featuredCollectionTitle
              ? featuredCollectionTitle
              : null,
        },
      });
    });

    const posts = result.data.posts.edges;

    posts.forEach((edge) => {
      const { id } = edge.node;

      createPage({
        path: edge.node.fields.slug,
        tags: edge.node.frontmatter.tags,
        component: path.resolve(
          `src/templates/${String(edge.node.frontmatter.templateKey)}.tsx`,
        ),
        context: {
          id,
        },
      });
    });

    // Create collection pages
    const collections = result.data.collections.edges;
    const landscapeCollections = [];

    result.data.collections.edges.forEach((edge) => {
      if (edge.node.products.every(isOrientationLandscape)) {
        edge.node.orientation = 'landscape';
      }
    });

    console.log(landscapeCollections);

    collections.forEach((edge) => {
      createPage({
        path: `/collections/${edge.node.id}`,
        component: path.resolve(`src/templates/collection.tsx`),
        context: {
          id: edge.node.id,
          orientation: edge.node.orientation ?? 'portrait',
        },
      });
    });

    collections.forEach((edge) => {
      createPage({
        path: `/collections/${edge.node.handle}`,
        component: path.resolve(`src/templates/collection.tsx`),
        context: {
          id: edge.node.id,
          orientation: edge.node.orientation ?? 'portrait',
        },
      });
    });

    // Tag pages:
    let tags = [];
    // Iterate through each post, putting all found tags into `tags`
    posts.forEach((edge) => {
      if (get(edge, `node.frontmatter.tags`)) {
        tags = tags.concat(edge.node.frontmatter.tags);
      }
    });
    // Eliminate duplicate tags
    tags = uniq(tags);

    // Make tag pages
    tags.forEach((tag) => {
      const tagPath = `/tags/${kebabCase(tag)}/`;

      createPage({
        path: tagPath,
        component: path.resolve(`src/templates/tags.tsx`),
        context: {
          tag,
        },
      });
    });

    // Redirects
    createRedirect({
      fromPath: '/collections/film',
      toPath: '/photography/film',
    });
  });
};

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions;

  if (node.internal.type === `MarkdownRemark`) {
    const value = createFilePath({ node, getNode });

    // Create `slug` field
    createNodeField({
      name: 'slug',
      node,
      value,
    });

    // Create `pinned` field
    createNodeField({
      name: 'pinned',
      node,
      value: Boolean(get(node, 'frontmatter.pinned', false)),
    });
  }
};
