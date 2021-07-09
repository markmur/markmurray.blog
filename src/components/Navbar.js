import React from 'react'
import { Link } from 'gatsby'
import { useShoppingCart } from 'use-shopping-cart'
import { FiShoppingBag } from 'react-icons/fi'
import { Flex, Container, Logo, Nav, Timestamp } from '../styles'

const Navbar = ({ displayTagline, wide = false, onCartClick }) => {
  const { cartCount } = useShoppingCart()

  return (
    <Nav role="navigation" aria-label="main-navigation">
      <Container wide={wide}>
        <Flex justifyContent="space-between">
          <div>
            <Link to="/">
              <Logo>Mark.</Logo>
            </Link>
          </div>

          <Flex>
            <Link style={{ marginRight: 25 }} to="/">
              Posts
            </Link>
            <Link style={{ marginRight: 25 }} to="/projects">
              Portfolio
            </Link>
            <Link style={{ marginRight: 25 }} to="/photography">
              Photography
            </Link>
            <a style={{ cursor: 'pointer' }} onClick={onCartClick}>
              <FiShoppingBag verticalAlign="bottom" /> ({cartCount})
            </a>
          </Flex>
        </Flex>

        {displayTagline && (
          <Timestamp fontSize="1.1rem">
            Senior Software Engineer @ Zalando, Dublin
          </Timestamp>
        )}
      </Container>
    </Nav>
  )
}

export default Navbar
