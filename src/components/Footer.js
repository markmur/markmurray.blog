import React from 'react'
import styled from 'styled-components'

const Footer = styled(props => (
  <footer {...props}>
    Copyright &copy; Mark Murray {new Date().getFullYear()}
  </footer>
))`
  text-align: center;
  color: #666;
  padding: 4em 0;
`

export default Footer
