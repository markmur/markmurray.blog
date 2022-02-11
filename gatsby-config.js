const GA_TRACKING_ID = 'UA-76403737-3';

require('dotenv').config({
  path: `.env.${process.env.NODE_ENV}`,
});

module.exports = {
  siteMetadata: {
    title: 'Mark Murray',
    url: 'https://markmurray.co',
    description: 'Senior Developer @ Shopify',
    featuredCollectionTitle: 'Reflections',
    bannerMessage: 'Buy 2 prints, get the third 50% off!',
    bannerLink: '/photography',
    bannerInclude: ['/', '/photography', '/collections'],
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
    'gatsby-plugin-image',
    {
      resolve: 'gatsby-plugin-google-fonts',
      options: {
        fonts: [
          'Merriweather:400,700,900',
          'Source Code Pro:400,500',
          'PT Serif:700',
          'Reenie Beanie',
          'Inter:200,300,400,500,600,700,900',
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
    {
      resolve: 'gatsby-transformer-remark',
      options: {
        plugins: [
          'gatsby-remark-autolink-headers',
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
      resolve: 'gatsby-source-shopify',
      options: {
        password: process.env.SHOPIFY_SHOP_PASSWORD,
        storeUrl: process.env.GATSBY_SHOPIFY_STORE_URL,
        // Not set by default. If set to true, this plugin will download and process images during the build.
        // The plugin’s default behavior is to fall back to Shopify’s CDN.
        downloadImages: false,
        shopifyConnections: ['collections'],
      },
    },
    //   resolve: '@sentry/gatsby',
    //   options: {
    //     dsn: process.env.SENTRY_DSN,
    //     sampleRate: 0.7,
    //   },
    // },
    'gatsby-plugin-typescript',

    // "gatsby-plugin-netlify" should come last here
    'gatsby-plugin-netlify',
  ],
};
