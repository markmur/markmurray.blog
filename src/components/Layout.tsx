import React from 'react';
import Helmet from 'react-helmet';
import { ThemeProvider } from 'styled-components';
import { StaticQuery, graphql, Link } from 'gatsby';
import {
  GlobalStyles,
  Container,
  Box,
  Main,
  Banner,
  HideOnMobile,
} from '../styles';
import useTheme from '../hooks/theme';
import CartContext, { CartConsumer } from '../context/CartContext';
import MenuContext, { MenuConsumer } from '../context/MenuContext';

import Drawer from './Drawer';
import MobileMenu from './MobileMenu';
import BackgroundLines from './BackgroundLines';
import Footer from './Footer';
import Navbar from './Navbar';
import Cart from './Cart';
import { ShopifyProvider } from '../hooks/use-shopify';
import Shopify from '../utils/shopify';
import { pathToFileURL } from 'url';

const query = graphql`
  query HeadingQuery {
    site {
      siteMetadata {
        title
        description
        bannerMessage
        bannerLink
        bannerInclude
      }
    }
  }
`;

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
);

const Content = ({ site, children, displayTagline = false }) => {
  const [theme] = useTheme();

  return (
    <div>
      <ShopifyProvider client={new Shopify()}>
        <Head site={site} />

        <BackgroundLines />

        <ThemeProvider theme={theme}>
          <HideOnMobile>
            {site.siteMetadata.bannerMessage && (
              <Banner>
                <Link to={site.siteMetadata.bannerLink}>
                  {site.siteMetadata.bannerMessage}
                </Link>
              </Banner>
            )}
          </HideOnMobile>

          <Box pt={4}>
            <GlobalStyles />

            <MenuContext initialState={{ open: false }}>
              <CartContext initialState={{ open: false }}>
                <CartConsumer>
                  {({ open, setCartState }) => (
                    <React.Fragment>
                      <Drawer open={open} onClose={() => setCartState(false)}>
                        <Cart open={open} />
                      </Drawer>

                      <MenuConsumer>
                        {({ open, setOpenState }) => (
                          <React.Fragment>
                            <MobileMenu
                              open={open}
                              onClose={() => setOpenState(!open)}
                            />
                            <Navbar
                              open={open}
                              displayTagline={displayTagline}
                              onCartClick={() => setCartState(true)}
                              onMenuClick={() => setOpenState(!open)}
                            />
                          </React.Fragment>
                        )}
                      </MenuConsumer>

                      <Main>{children}</Main>

                      <Container>
                        <Footer />
                      </Container>
                    </React.Fragment>
                  )}
                </CartConsumer>
              </CartContext>
            </MenuContext>
          </Box>
        </ThemeProvider>
      </ShopifyProvider>
    </div>
  );
};

const Layout = ({ children, ...props }) => {
  return (
    <StaticQuery
      query={query}
      render={(data) => (
        <Content {...data} {...props}>
          {children}
        </Content>
      )}
    />
  );
};

export default Layout;
