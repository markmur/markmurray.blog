require('dotenv').config();

module.exports = {
  graphqlTypegen: true,

  siteMetadata: {
    title: 'Mark Murray',
    url: 'https://markmurray.co',
    email: 'contact@markmurray.co',
    description: 'Senior Developer @ Shopify',
    featuredCollectionTitle: 'Reflections',
    bannerMessage: '',
    bannerLink: '',
    bannerInclude: [],
    social: {
      twitterHandle: '@mrkmur',
      instagramHandle: '@markmur',
      githubHandle: '@markmur',
      twitterUrl: 'https://twitter.com/mrkmur',
      instagramUrl: 'https://instagram.com/markmur',
      githubUrl: 'https://github.com/markmur',
    },
  },
  plugins: [
    'gatsby-remark-reading-time',
    'gatsby-plugin-offline',
    {
      resolve: 'gatsby-plugin-web-vitals',
      options: {
        trackingId: 'UA-76403737-3',
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
          // NOTE: this plugin must be listed before prismjs
          'gatsby-remark-prismjs-title',
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

    {
      resolve: 'gatsby-plugin-sharp',
      options: {
        failOn: 'error',
        defaults: {
          quality: 75,
          formats: ['auto', 'webp'],
          placeholder: 'dominantColor',
          breakpoints: [425, 750, 1080, 1366, 1920],
        },
      },
    },

    'gatsby-transformer-sharp',

    // "gatsby-plugin-netlify" should come last here
    'gatsby-plugin-netlify',
  ],
};
