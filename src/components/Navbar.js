import React from 'react'
import { Link } from 'gatsby'
import { Flex, Container, Logo, Nav, Timestamp } from '../styles'

const Navbar = ({ displayTagline, wide = false }) => {
  return (
    <Nav role="navigation" aria-label="main-navigation">
      <Container wide={wide}>
        <Flex justifyContent="space-between">
          <div>
            <Link to="/">
              <Logo>mark.</Logo>
            </Link>
          </div>

          <Flex>
            <Link style={{ marginRight: 25 }} to="/">
              Posts
            </Link>
            <Link to="/projects">Portfolio</Link>
          </Flex>
        </Flex>

        {displayTagline && (
          <Timestamp fontSize="1.1rem">
            Senior Developer @ Shopify, Dublin
          </Timestamp>
        )}
      </Container>
    </Nav>
  )
}

export default Navbar
