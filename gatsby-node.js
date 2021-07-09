const path = require('path')
const { get, uniq, kebabCase } = require('lodash')
const { createFilePath } = require('gatsby-source-filesystem')
const { fmImagesToRelative } = require('gatsby-remark-relative-images')

exports.createPages = ({ actions, graphql }) => {
  const { createPage } = actions

  return graphql(`
    {
      products: allStripeProduct {
        edges {
          node {
            id
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
  `).then(result => {
    if (result.errors) {
      result.errors.forEach(e => console.error(e.toString()))
      return Promise.reject(result.errors)
    }

    const products = result.data.products.edges

    products.forEach(({ node }) => {
      const { id } = node

      createPage({
        path: `/photography/${id}/`,
        component: path.resolve(`src/templates/product.js`),
        context: {
          id,
        },
      })
    })

    const posts = result.data.posts.edges

    posts.forEach(edge => {
      const { id } = edge.node
      createPage({
        path: edge.node.fields.slug,
        tags: edge.node.frontmatter.tags,
        component: path.resolve(
          `src/templates/${String(edge.node.frontmatter.templateKey)}.js`,
        ),
        // additional data can be passed via context
        context: {
          id,
        },
      })
    })

    // Tag pages:
    let tags = []
    // Iterate through each post, putting all found tags into `tags`
    posts.forEach(edge => {
      if (get(edge, `node.frontmatter.tags`)) {
        tags = tags.concat(edge.node.frontmatter.tags)
      }
    })
    // Eliminate duplicate tags
    tags = uniq(tags)

    // Make tag pages
    tags.forEach(tag => {
      const tagPath = `/tags/${kebabCase(tag)}/`

      createPage({
        path: tagPath,
        component: path.resolve(`src/templates/tags.js`),
        context: {
          tag,
        },
      })
    })
  })
}

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions
  fmImagesToRelative(node) // convert image paths for gatsby images

  if (node.internal.type === `MarkdownRemark`) {
    const value = createFilePath({ node, getNode })

    // Create `slug` field
    createNodeField({
      name: 'slug',
      node,
      value,
    })

    // Create `pinned` field
    createNodeField({
      name: 'pinned',
      node,
      value: Boolean(get(node, 'frontmatter.pinned', false)),
    })
  }
}
