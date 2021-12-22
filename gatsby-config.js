require('dotenv').config({
  path: `.env.${process.env.NODE_ENV}`,
});

module.exports = {
  siteMetadata: {
    title: 'Mark Murray',
    url: 'https://markmurray.co',
    description: 'Front End Developer @ Zalando, Dublin',
  },
  plugins: [
    'gatsby-plugin-sass',
    'gatsby-remark-reading-time',
    'gatsby-plugin-offline',
    {
      resolve: 'gatsby-plugin-google-analytics',
      options: {
        trackingId: 'UA-76403737-3',
        exclude: ['/admin/**'],
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
    // 'gatsby-plugin-sharp',
    // 'gatsby-transformer-sharp',
    {
      resolve: 'gatsby-transformer-remark',
      options: {
        plugins: [
          'gatsby-remark-autolink-headers',
          // {
          //   resolve: 'gatsby-remark-relative-images',
          //   options: {
          //     name: 'uploads',
          //   },
          // },
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
    // {
    //   resolve: 'gatsby-plugin-netlify-cms',
    //   options: {
    //     modulePath: `${__dirname}/src/cms/cms.js`,
    //   },
    // },
    {
      resolve: `gatsby-source-stripe`,
      options: {
        objects: ['Product', 'Price'],
        secretKey: process.env.STRIPE_SECRET_KEY,
        downloadFiles: false,
      },
    },
    // {
    //   resolve: 'gatsby-source-graphql',
    //   options: {
    //     typeName: 'CreativeHub',
    //     fieldName: 'creative-hub',
    //     url: 'https://api.creativehub.io',
    //     headers: {
    //       Authorization: process.env.CREATIVE_HUB_API_KEY,
    //     },
    //   },
    // },
    // {
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
