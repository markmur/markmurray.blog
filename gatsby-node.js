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

    // Create collection pages
    console.log(result.data)
    const collections = result.data.collections.edges

    collections.forEach(edge => {
      const { id } = edge.node
      createPage({
        path: edge.node.fields.slug,
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

// exports.sourceNodes = async ({
//   actions: { createNode },
//   createContentDigest,
// }) => {
//   try {
//     const result = await fetch(
//       `https://api.creativehub.io/api/v1/products/query`,
//     )
//     console.log(result)
//     const resultData = await result.json()
//     console.log({ resultData })
//     // create node for build time data example in the docs
//     createNode({
//       // nameWithOwner and url are arbitrary fields from the data
//       nameWithOwner: resultData.full_name,
//       url: resultData.html_url,
//       // required fields
//       id: `example-build-time-data`,
//       parent: null,
//       children: [],
//       internal: {
//         type: `Example`,
//         contentDigest: createContentDigest(resultData),
//       },
//     })
//   } catch (error) {
//     console.log(error, "yep that's it")
//   }
// }

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
