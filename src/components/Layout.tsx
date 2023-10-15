import { Box, Container, GlobalStyles, Main } from '../styles';
import CartContext, { CartConsumer } from '../context/CartContext';
import MenuContext, { MenuConsumer } from '../context/MenuContext';
import { PageProps, graphql, useStaticQuery } from 'gatsby';
import React, { PropsWithChildren, useMemo } from 'react';

import BackgroundLines from './BackgroundLines';
import Cart from './Cart';
import Drawer from './Drawer';
import Footer from './Footer';
import Helmet from 'react-helmet';
import MobileMenu from './MobileMenu';
import Navbar from './Navbar';
import Shopify from '../utils/shopify';
import { ShopifyProvider } from '../hooks/use-shopify';
import { ThemeProvider } from 'styled-components';
import { useScrollToTop } from '../hooks/use-scroll-to-top';
import useTheme from '../hooks/theme';

const Head = ({ site }) => (
  <Helmet>
    <html lang="en" />
    <title>{site.siteMetadata.title}</title>
    <meta name="title" content={site.siteMetadata.title} />
    <meta name="description" content={site.siteMetadata.description} />

    {/* Facebook */}
    <meta property="og:type" content="website" />
    <meta property="og:url" content={site.siteMetadata.url} />
    <meta property="og:title" content={site.siteMetadata.title} />
    <meta property="og:description" content={site.siteMetadata.description} />
    <meta property="og:image" content="/img/meta.png" />

    {/* Twitter */}
    <meta property="twitter:card" content="summary_large_image" />
    <meta property="twitter:url" content={site.siteMetadata.url} />
    <meta property="twitter:title" content={site.siteMetadata.title} />
    <meta
      property="twitter:description"
      content={site.siteMetadata.description}
    />
    <meta property="twitter:image" content="/img/meta.png" />

    <link rel="icon" type="image/png" href="/img/favicon.png" sizes="32x32" />
    <meta name="theme-color" content="#f8f8f9" />
  </Helmet>
);

const Content = ({
  data,
  children,
  displayTagline = false,
}: PropsWithChildren<{
  data: Queries.LayoutQuery;
  displayTagline?: boolean;
}>) => {
  const { site } = data;
  const [theme] = useTheme();

  const shopifyClient = useMemo(() => {
    return new Shopify();
  }, []);

  return (
    <ShopifyProvider client={shopifyClient}>
      <Head site={site} />

      <BackgroundLines />

      <ThemeProvider theme={theme}>
        <Box pt={4}>
          <GlobalStyles />

          <MenuContext initialState={{ open: false }}>
            <CartContext initialState={{ open: false }}>
              <CartConsumer>
                {({ open, setCartState }) => (
                  <React.Fragment>
                    <Drawer
                      open={open}
                      onClose={() => setCartState(false)}
                      zIndex={[100000, 1000, 1000]}
                    >
                      <Cart onClose={() => setCartState(false)} />
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
  );
};

const query = graphql`
  query Layout {
    site {
      siteMetadata {
        url
        title
        description
      }
    }
  }
`;

const Layout = ({ children, ...props }) => {
  const data = useStaticQuery(query);

  // Scroll to top on page change
  useScrollToTop();

  return (
    <Content data={data} {...props}>
      {children}
    </Content>
  );
};

export default Layout;
