import React from 'react'
import { Link } from 'gatsby'
import { useShoppingCart } from 'use-shopping-cart'
import { FiShoppingBag, FiMenu } from 'react-icons/fi'
import {
  Flex,
  Box,
  Container,
  Logo,
  Nav,
  Timestamp,
  HideOnDesktop,
} from '../styles'

const Navbar = ({ displayTagline, wide = false, onCartClick, onMenuClick }) => {
  const { cartCount } = useShoppingCart()

  return (
    <Nav role="navigation" aria-label="main-navigation">
      <Container wide={wide}>
        <Flex alignItems="center" justifyContent={['space-between']}>
          <HideOnDesktop>
            <FiMenu fontSize={24} onClick={onMenuClick} />
          </HideOnDesktop>

          <div>
            <Link to="/">
              <Logo>Mark.</Logo>
            </Link>
          </div>

          <Flex display={['none', 'flex']}>
            <Link style={{ marginRight: 25 }} to="/about">
              Who?
            </Link>
            <Link style={{ marginRight: 25 }} to="/posts">
              Posts
            </Link>
            <Link style={{ marginRight: 25 }} to="/projects">
              Projects
            </Link>
            <Link style={{ marginRight: 25 }} to="/photography">
              Photography
            </Link>
            <a style={{ cursor: 'pointer' }} onClick={onCartClick}>
              <FiShoppingBag verticalAlign="bottom" /> ({cartCount})
            </a>
          </Flex>
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
  )
}

export default Navbar
