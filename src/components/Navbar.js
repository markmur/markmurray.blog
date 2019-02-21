import React from 'react'
import { Link } from 'gatsby'
import { Container, Logo, Nav } from '../styles'

const Navbar = class extends React.Component {
  render() {
    return (
      <Nav role="navigation" aria-label="main-navigation">
        <Container>
          <Link to="/">
            <Logo>Mark.</Logo>
          </Link>
        </Container>
      </Nav>
    )
  }
}

export default Navbar
