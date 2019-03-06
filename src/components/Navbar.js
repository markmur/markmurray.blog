import React from 'react'
import { Link } from 'gatsby'
import { Container, Logo, Nav } from '../styles'
import useTextAnimation from '../hooks/text-animation'

const Navbar = () => {
  return (
    <Nav role="navigation" aria-label="main-navigation">
      <Container>
        <Link to="/">
          <Logo {...useTextAnimation()}>mark.</Logo>
        </Link>
      </Container>
    </Nav>
  )
}

export default Navbar
