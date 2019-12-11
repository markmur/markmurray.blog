import React from 'react'
import { ThemeProvider } from 'styled-components'
import { StaticQuery, graphql } from 'gatsby'
import { GlobalStyles, Container } from '../styles'
import useTheme from '../hooks/theme'

import Footer from './Footer'
import Navigation from './Navigation'
import Meta from './Meta'
import Menu from './Menu'

const query = graphql`
  query HeadingQuery {
    site {
      siteMetadata {
        url
        title
        description
        themeColor
      }
    }
  }
`

const Content = ({ site, children, header = true, footer = true }) => {
  const [theme] = useTheme('dark')
  const [menuOpen, setMenuState] = React.useState(false)

  return (
    <div>
      <Meta meta={site.siteMetadata} />

      <ThemeProvider theme={theme}>
        <div>
          <GlobalStyles />

          <div>
            {header && (
              <React.Fragment>
                <Navigation
                  meta={site.siteMetadata}
                  onMenuClick={() => setMenuState(!menuOpen)}
                />

                <Menu open={menuOpen} onClose={() => setMenuState(!menuOpen)} />
              </React.Fragment>
            )}

            {children}

            {footer && (
              <Container>
                <Footer />
              </Container>
            )}
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
