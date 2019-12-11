module.exports = {
  siteMetadata: {
    title: 'Mark Murray',
    description: 'Front End Developer @ Zalando, Dublin',
    url: 'https://markmurray.co',
    themeColor: '#000',
    menuLinks: [],
    footerLinks: [
      {
        name: 'GitHub',
        tooltip: 'GitHub /markmur',
        href: 'https://github.com/markmur',
        icon: 'github',
      },
      {
        name: 'Twitter',
        tooltip: 'Twitter @mrkmur',
        href: 'https://twitter.com/mrkmur',
        icon: 'twitter',
      },
      {
        name: 'Instagram',
        tooltip: 'Instagram @markmur',
        href: 'https://instagram.com/mrkmur',
        icon: 'instagram',
      },
    ],
  },
  plugins: [
    'gatsby-plugin-sass',
    'gatsby-plugin-react-svg',
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
        path: `${__dirname}/src/content`,
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
