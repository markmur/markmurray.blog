import React from 'react'
import styled from 'styled-components'
import { EntypoGithub, EntypoTwitter } from 'react-entypo-icons'

const links = [
  [EntypoGithub, 'https://github.com/markmur'],
  [EntypoTwitter, 'https://twitter.com/mrkmur'],
]

const Section = styled.div`
  background: white;
  padding-left: ${p => p.pl || 0};
  padding-right: ${p => p.pr || 0};
`

const Footer = styled(props => (
  <footer {...props}>
    <Section pr="2em">
      Copyright &copy; <strong>Mark Murray</strong>, {new Date().getFullYear()}
    </Section>

    <Section pl="2em">
      {links.map(([Icon, link]) => (
        <a key={link} href={link}>
          <Icon />
        </a>
      ))}
    </Section>
  </footer>
))`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  text-align: center;
  color: #666;
  padding: 4em 0;
  margin-bottom: 2em;

  &::before {
    content: '';
    position: absolute;
    z-index: -1;
    border: 2px solid black;
    left: 0;
    right: 0;
    top: 50%;
  }

  a {
    color: black;
    font-size: 1.5em;
    margin-left: 1em;
    margin-top: 1px;
    vertical-align: -webkit-baseline-middle;

    &:first-of-type {
      margin-left: 0;
    }
  }

  strong {
    color: black;
  }
`

export default Footer
