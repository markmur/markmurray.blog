import React from 'react';
import { useShoppingCart } from 'use-shopping-cart';
import { FiShoppingBag, FiMenu } from 'react-icons/fi';
import {
  Flex,
  Box,
  Container,
  Link,
  Logo,
  Nav,
  CartCount,
  Timestamp,
  HideOnDesktop,
  HideOnMobile,
} from '../styles';

const Navbar = ({ displayTagline, wide = false, onCartClick, onMenuClick }) => {
  const { cartCount } = useShoppingCart();

  return (
    <Nav role="navigation" aria-label="main-navigation">
      <Container>
        <Flex alignItems="center" justifyContent={['space-between']}>
          <HideOnDesktop>
            <FiMenu fontSize={24} onClick={onMenuClick} />
          </HideOnDesktop>

          <div>
            <Link to="/">
              <Logo>Mark.</Logo>
            </Link>
          </div>

          <HideOnMobile>
            <Flex>
              <Link mr={4} to="/about">
                Who?
              </Link>
              <Link mr={4} to="/posts">
                Articles
              </Link>
              <Link mr={4} to="/projects">
                Projects
              </Link>
              <Link mr={4} to="/photography">
                Photography
              </Link>
              <a style={{ cursor: 'pointer' }} onClick={onCartClick}>
                <FiShoppingBag style={{ verticalAlign: 'bottom' }} />{' '}
                {cartCount > 0 ? <CartCount>{cartCount}</CartCount> : null}
              </a>
            </Flex>
          </HideOnMobile>

          <HideOnDesktop>
            <Box display={['block', 'none']} />
          </HideOnDesktop>
        </Flex>

        <Box textAlign={['center', 'left']}>
          {displayTagline && (
            <Timestamp fontSize={['11px', '13px']}>
              Software Engineer, Photographer, Musician
            </Timestamp>
          )}
        </Box>
      </Container>
    </Nav>
  );
};

export default Navbar;
