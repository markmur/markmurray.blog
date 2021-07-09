import React from 'react'
import { Link } from 'gatsby'
import { Flex, Container, Logo, Nav, Timestamp } from '../styles'
import { useShoppingCart } from 'use-shopping-cart'

const Navbar = ({ displayTagline, wide = false }) => {
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
            <Link to="/photography">Photography</Link>
            <strong>Cart: {cartCount}</strong>
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
