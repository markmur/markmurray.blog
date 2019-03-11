import React from 'react'
import Helmet from 'react-helmet'
import { ThemeProvider } from 'styled-components'
import { StaticQuery, graphql } from 'gatsby'
import { GlobalStyles, GlobalBorder, Container } from '../styles'
import useTheme from '../hooks/theme'

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
    <meta name="description" content={site.siteMetadata.description} />

    <link
      rel="apple-touch-icon"
      sizes="180x180"
      href="/img/apple-touch-icon.png"
    />
    <link rel="icon" type="image/png" href="/img/favicon.png" sizes="32x32" />

    <link rel="mask-icon" href="/img/safari-pinned-tab.svg" color="#ff4400" />
    <meta name="theme-color" content="#fff" />

    <meta property="og:type" content="business.business" />
    <meta property="og:title" content={site.siteMetadata.title} />
    <meta property="og:url" content="/" />
    <meta property="og:image" content="/img/og-image.jpg" />
  </Helmet>
)

const Content = ({ site, children }) => {
  const [theme, setTheme, themeName] = useTheme()

  return (
    <div>
      <Head site={site} />

      <ThemeProvider theme={theme}>
        <div>
          <GlobalStyles />

          <GlobalBorder />

          <div>
            <Navbar theme={themeName} onThemeChange={setTheme} />

            {children}

            <Container>
              <Footer />
            </Container>
          </div>
        </div>
      </ThemeProvider>
    </div>
  )
}

const Layout = ({ children }) => {
  return (
    <StaticQuery
      query={query}
      render={data => <Content {...data}>{children}</Content>}
    />
  )
}

export default Layout
