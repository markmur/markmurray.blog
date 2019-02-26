import React from 'react'
import { Link } from 'gatsby'
import { Container, Logo, Nav } from '../styles'

const Navbar = ({ theme, onThemeChange }) => {
  return (
    <Nav role="navigation" aria-label="main-navigation">
      <Container>
        <Link to="/">
          <Logo
            onClick={() => onThemeChange(theme === 'light' ? 'dark' : 'light')}
          >
            Mark.
          </Logo>
        </Link>
      </Container>
    </Nav>
  )
}

export default Navbar
