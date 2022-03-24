import React from 'react';
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
  LinkList,
  Text,
} from '../styles';
import { useShopify } from '../hooks/use-shopify';

interface Link {
  text: string;
  to: string;
}

const LinkDropdown = ({
  initialState = false,
  links = [],
  children,
}: {
  initialState?: boolean;
  links: Link[] | Record<string, Link[]>;
  children: React.ReactElement;
}) => {
  const [isVisible, setVisible] = React.useState(initialState);

  const handleMouseEnter = () => {
    if (!isVisible) {
      setVisible(true);
    }
  };

  const handleMouseLeave = () => {
    if (isVisible) {
      setVisible(false);
    }
  };

  const renderLinks = () => {
    if (Array.isArray(links)) {
      return (
        <LinkList>
          {links.map((link) => (
            <li key={link.to}>
              <Link to={link.to}>{link.text}</Link>
            </li>
          ))}
        </LinkList>
      );
    }

    if (typeof links === 'object') {
      return Object.entries(links).map(([collectionName, links]) => (
        <LinkList>
          <Text as="small" color="#686882" fontSize="10px">
            {collectionName}
          </Text>

          {links.map((link) => (
            <li key={link.to}>
              <Link to={link.to}>{link.text}</Link>
            </li>
          ))}
        </LinkList>
      ));
    }
  };

  return (
    <Box
      position="relative"
      onMouseOver={() => setVisible(true)}
      onMouseLeave={handleMouseLeave}
    >
      {React.cloneElement(children, {
        onMouseEnter: handleMouseEnter,
      })}

      {isVisible && (
        <Box
          position="absolute"
          top="-1.5em"
          left="-1.5em"
          backgroundColor="rgba(0,0,0,0.9)"
          color="white"
          p="1.5em"
          zIndex={100}
        >
          <Box mb={3} color="white" fontWeight="bold">
            <Link mr={4} to="/photography">
              <Text color="white" as="span">
                Photography
              </Text>
            </Link>
          </Box>

          {renderLinks()}
        </Box>
      )}
    </Box>
  );
};

const Navbar = ({ displayTagline, onCartClick, onMenuClick }) => {
  const { cartCount } = useShopify();

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
              <Link activeClassName="active" mr={4} to="/about">
                Who?
              </Link>
              <Link
                partiallyActive={
                  typeof window !== 'undefined' &&
                  window.location.href.includes('/posts')
                }
                activeClassName="active"
                mr={4}
                to="/posts"
              >
                Articles
              </Link>
              <Link activeClassName="active" mr={4} to="/projects">
                Projects
              </Link>

              <LinkDropdown
                links={{
                  '': [
                    { text: 'All', to: '/photography' },
                    { text: 'Film', to: '/photography/film' },
                  ],
                  Collections: [
                    { text: 'Sapphire', to: '/collections/sapphire' },
                    { text: 'Reflections', to: '/collections/reflections' },
                  ],
                }}
              >
                <Link
                  partiallyActive={
                    typeof window !== 'undefined' &&
                    window.location.href.includes('/photography')
                  }
                  activeClassName="active"
                  to="/photography"
                >
                  Photography
                </Link>
              </LinkDropdown>

              <Box ml={4}>
                <a style={{ cursor: 'pointer' }} onClick={onCartClick}>
                  <FiShoppingBag style={{ verticalAlign: 'bottom' }} />{' '}
                  {cartCount > 0 ? <CartCount>{cartCount}</CartCount> : null}
                </a>
              </Box>
            </Flex>
          </HideOnMobile>

          <HideOnDesktop>
            <Link style={{ cursor: 'pointer' }} to="/cart">
              <FiShoppingBag size={20} style={{ verticalAlign: 'bottom' }} />{' '}
              {cartCount > 0 ? <CartCount>{cartCount}</CartCount> : null}
            </Link>
          </HideOnDesktop>
        </Flex>

        <HideOnMobile>
          <Box textAlign={['center', 'left']}>
            {displayTagline && (
              <Timestamp fontSize={['11px', '13px']}>
                Irish Software Engineer &amp; Photographer
              </Timestamp>
            )}
          </Box>
        </HideOnMobile>
      </Container>
    </Nav>
  );
};

export default Navbar;
