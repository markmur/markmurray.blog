const GA_TRACKING_ID = 'UA-76403737-3'

module.exports = {
  siteMetadata: {
    title: 'Mark Murray',
    url: 'https://markmurray.co',
    description: 'Senior Developer @ Shopify, Dublin',
  },
  plugins: [
    'gatsby-plugin-sass',
    'gatsby-remark-reading-time',
    'gatsby-plugin-offline',
    {
      resolve: 'gatsby-plugin-google-analytics',
      options: {
        trackingId: GA_TRACKING_ID,
        exclude: ['/admin/**'],
      },
    },
    {
      resolve: 'gatsby-plugin-web-vitals',
      options: {
        trackingId: GA_TRACKING_ID,
        metrics: [`FID`, `TTFB`, `LCP`, `CLS`, `FCP`],
        eventCategory: 'Performance',
        includeInDevelopment: false,
        debug: false,
      },
    },
    'gatsby-plugin-styled-components',
    'gatsby-plugin-react-helmet',
    {
      resolve: 'gatsby-plugin-google-fonts',
      options: {
        fonts: [
          'Merriweather:400,700,900',
          'Source Code Pro:400,500',
          'PT Serif:700',
          'Reenie Beanie',
        ],
      },
    },
    {
      // keep as first gatsby-source-filesystem plugin for gatsby image support
      resolve: 'gatsby-source-filesystem',
      options: {
        path: `${__dirname}/static/img`,
        name: 'uploads',
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: `${__dirname}/src/pages`,
        name: 'pages',
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: `${__dirname}/src/img`,
        name: 'images',
      },
    },
    // 'gatsby-plugin-sharp',
    // 'gatsby-transformer-sharp',
    {
      resolve: 'gatsby-transformer-remark',
      options: {
        plugins: [
          'gatsby-remark-autolink-headers',
          {
            resolve: 'gatsby-remark-relative-images',
            options: {
              name: 'uploads',
            },
          },
          {
            resolve: 'gatsby-remark-images',
            options: {
              // It's important to specify the maxWidth (in pixels) of
              // the content container as this plugin uses this as the
              // base for generating different widths of each image.
              maxWidth: 2048,
            },
          },
          {
            resolve: 'gatsby-remark-copy-linked-files',
            options: {
              destinationDir: 'static',
            },
          },
          {
            resolve: `gatsby-remark-prismjs`,
            options: {
              // classPrefix: 'language-',
              aliases: { sh: 'bash' },
            },
          },
        ],
      },
    },
    {
      resolve: 'gatsby-plugin-netlify-cms',
      options: {
        modulePath: `${__dirname}/src/cms/cms.js`,
      },
    },
    'gatsby-plugin-netlify', // make sure to keep it last in the array
  ],
}
