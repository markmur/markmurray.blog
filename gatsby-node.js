const path = require('path');
const { get, uniq, kebabCase } = require('lodash');
const { createFilePath } = require('gatsby-source-filesystem');

exports.createPages = ({ actions, graphql }) => {
  const { createPage } = actions;

  return graphql(`
    {
      photos: allMarkdownRemark(
        filter: { frontmatter: { templateKey: { eq: "photo" } } }
      ) {
        edges {
          node {
            id
            frontmatter {
              title
              stripe_product_id
            }
          }
        }
      }
      products: allShopifyProduct(
        sort: { fields: [publishedAt], order: ASC }
      ) {
        edges {
          node {
            id
            handle
            collections {
              id
            }
          }
        }
      }
      collections: allShopifyCollection{
        edges {
          node {
            id
            handle
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

    products.forEach(({ node }) => {
      createPage({
        path: `/photography/${node.id}/`,
        component: path.resolve(`src/templates/product.tsx`),
        context: {
          id: node.id,
          collectionId: node.collections?.[0]?.id
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
          collectionId: node.collections?.[0]?.id
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

    console.log(collections)

    collections.forEach((edge) => {
      createPage({
        path: `/collections/${edge.node.id}`,
        component: path.resolve(
          `src/templates/collection.tsx`,
        ),
        context: {
          id: edge.node.id,
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
