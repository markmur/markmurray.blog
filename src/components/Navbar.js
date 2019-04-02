import React from 'react'
import { Link } from 'gatsby'
import { Flex, Container, Logo, Nav, Timestamp } from '../styles'
import useTextAnimation from '../hooks/text-animation'

const Navbar = ({ displayTagline }) => {
  return (
    <Nav role="navigation" aria-label="main-navigation">
      <Container>
        <Flex justifyContent="space-between">
          <div>
            <Link to="/">
              <Logo {...useTextAnimation()}>mark.</Logo>
            </Link>
          </div>

          {/* <Flex>
            <Link to="/blog">Blog</Link>
          </Flex> */}
        </Flex>

        {displayTagline && (
          <Timestamp fontSize="1.1rem">
            Frontend Engineer @ Zalando, Dublin
          </Timestamp>
        )}
      </Container>
    </Nav>
  )
}

export default Navbar
