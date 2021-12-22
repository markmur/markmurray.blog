const path = require('path');
const { get, uniq, kebabCase } = require('lodash');
const { createFilePath } = require('gatsby-source-filesystem');

function findByName(stripeProductName, localPhotoName) {
  return stripeProductName?.toLowerCase() === localPhotoName?.toLowerCase();
}

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
      products: allStripeProduct {
        edges {
          node {
            id
            name
          }
        }
      }
      collections: allMarkdownRemark(
        filter: { frontmatter: { templateKey: { eq: "collection" } } }
      ) {
        edges {
          node {
            id
            fields {
              slug
            }
            frontmatter {
              collection_id
              templateKey
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

    products.forEach(({ node }) => {
      createPage({
        path: `/photography/${node.id}/`,
        component: path.resolve(`src/templates/product.tsx`),
        context: {
          id: node.id,
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
        // additional data can be passed via context
        context: {
          id,
        },
      });
    });

    // Create collection pages
    const collections = result.data.collections.edges;

    collections.forEach((edge) => {
      const { collection_id } = edge.node.frontmatter;
      createPage({
        path: edge.node.fields.slug,
        component: path.resolve(
          `src/templates/${String(edge.node.frontmatter.templateKey)}.tsx`,
        ),
        // additional data can be passed via context
        context: {
          id: collection_id,
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
