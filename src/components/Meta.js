import React from 'react'
import Helmet from 'react-helmet'

const Meta = ({ meta }) => (
  <Helmet>
    <html lang="en" />
    <title>{meta.title}</title>
    <meta name="title" content={meta.title} />
    <meta name="description" content={meta.description} />

    {/* Facebook */}
    <meta property="og:type" content="website" />
    <meta property="og:url" content={meta.url} />
    <meta property="og:title" content={meta.title} />
    <meta property="og:description" content={meta.description} />
    <meta property="og:image" content="/img/meta.png" />

    {/* Twitter */}
    <meta property="twitter:card" content="summary_large_image" />
    <meta property="twitter:url" content={meta.url} />
    <meta property="twitter:title" content={meta.title} />
    <meta property="twitter:description" content={meta.description} />
    <meta property="twitter:image" content="/img/meta.png" />

    <link rel="icon" type="image/png" href="/img/favicon.png" sizes="32x32" />
    <meta name="theme-color" content={meta.themeColor} />
  </Helmet>
)

export default Meta
