import React from 'react';
import cx from 'classnames';
import { FiShoppingBag, FiMenu, FiX } from 'react-icons/fi';
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
  LinkListContainer,
} from '../styles';
import { useShopify } from '../hooks/use-shopify';
import { graphql, useStaticQuery } from 'gatsby';

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
        <LinkList key={collectionName}>
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
        <LinkListContainer>
          <Box mb={3} color="white" fontWeight="bold">
            <Link mr={4} to="/photography">
              <Text color="white" as="span">
                Photography
              </Text>
            </Link>
          </Box>

          {renderLinks()}
        </LinkListContainer>
      )}
    </Box>
  );
};

const Navbar: React.FC<{
  displayTagline?: boolean;
  open: boolean;
  className?: string;
  onCartClick: () => void;
  onMenuClick: () => void;
}> = ({ open, displayTagline, onCartClick, onMenuClick }) => {
  const { cartCount } = useShopify();

  const MenuIcon = open ? FiX : FiMenu;

  const data = useStaticQuery(graphql`
    {
      allShopifyCollection {
        edges {
          node {
            id
            title
            handle
          }
        }
      }
    }
  `);

  return (
    <Nav
      className={cx({ active: open })}
      role="navigation"
      aria-label="main-navigation"
    >
      <Container>
        <Flex alignItems="center" justifyContent={['space-between']}>
          <HideOnDesktop>
            <MenuIcon fontSize={24} onClick={onMenuClick} />
          </HideOnDesktop>

          <div>
            <Link to="/">
              <Logo active={open}>Mark.</Logo>
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
                Writing
              </Link>
              {/* <Link activeClassName="active" mr={4} to="/projects">
                Projects
              </Link> */}

              <LinkDropdown
                links={{
                  // '': [{ text: 'All', to: '/photography' }],
                  Collections: [
                    ...data.allShopifyCollection.edges.map(({ node }) => ({
                      text: node.title,
                      to: `/collections/${node.handle}`,
                    })),
                  ],
                  Film: [
                    {
                      text: 'Canon AE-1',
                      to: '/photography/film/canon-ae-1',
                    },
                    {
                      text: 'Olympus mju III',
                      to: '/photography/film/olympus-mju-iii',
                    },
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
                  <CartCount>{cartCount}</CartCount>
                </a>
              </Box>
            </Flex>
          </HideOnMobile>

          <HideOnDesktop>
            <Link style={{ cursor: 'pointer' }} to="/cart">
              <FiShoppingBag
                color={open ? 'white' : 'initial'}
                size={20}
                style={{ verticalAlign: 'bottom' }}
              />{' '}
              <CartCount>{cartCount}</CartCount>
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
