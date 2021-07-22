import React from 'react'
import Helmet from 'react-helmet'
import { ThemeProvider } from 'styled-components'
import { StaticQuery, graphql } from 'gatsby'
import { GlobalStyles, Container } from '../styles'
import useTheme from '../hooks/theme'

import BackgroundLines from './BackgroundLines'
import Footer from './Footer'
import Navbar from './Navbar'

const query = graphql`
  query HeadingQuery {
    site {
      siteMetadata {
        title
        description
      }
    }
  }
`

const Head = ({ site }) => (
  <Helmet>
    <html lang="en" />
    <title>{site.siteMetadata.title}</title>
    <meta name="title" content={site.siteMetadata.title} />
    <meta name="description" content={site.siteMetadata.description} />

    {/* Facebook */}
    <meta property="og:type" content="website" />
    <meta property="og:url" content="https://markmurray.co/" />
    <meta property="og:title" content={site.siteMetadata.title} />
    <meta property="og:description" content={site.siteMetadata.description} />
    <meta property="og:image" content="/img/meta.png" />

    {/* Twitter */}
    <meta property="twitter:card" content="summary_large_image" />
    <meta property="twitter:url" content="https://markmurray.co/" />
    <meta property="twitter:title" content={site.siteMetadata.title} />
    <meta
      property="twitter:description"
      content={site.siteMetadata.description}
    />
    <meta property="twitter:image" content="/img/meta.png" />

    <link rel="icon" type="image/png" href="/img/favicon.png" sizes="32x32" />
    <meta name="theme-color" content="#000" />
  </Helmet>
)

const Content = ({ site, children, displayTagline = false, wide = false }) => {
  const [theme, setTheme, themeName] = useTheme()

  return (
    <div>
      <Head site={site} />

      <BackgroundLines />

      <ThemeProvider theme={theme}>
        <div>
          <GlobalStyles />

          <div>
            <Navbar
              wide={wide}
              theme={themeName}
              displayTagline={displayTagline}
              onThemeChange={setTheme}
            />

            {children}

            <Container wide>
              <Footer />
            </Container>
          </div>
        </div>
      </ThemeProvider>
    </div>
  )
}

const Layout = ({ children, ...props }) => {
  return (
    <StaticQuery
      query={query}
      render={data => (
        <Content {...data} {...props}>
          {children}
        </Content>
      )}
    />
  )
}

export default Layout
