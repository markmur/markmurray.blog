import React from 'react'
import {
  EntypoGithub,
  EntypoTwitter,
  EntypoInstagram,
} from 'react-entypo-icons'
import { Footer, Box } from '../styles'

const links = [
  [EntypoGithub, 'https://github.com/markmur', 'GitHub'],
  [EntypoTwitter, 'https://twitter.com/mrkmur', 'Twitter'],
  [EntypoInstagram, 'https://instagram.com/markmur', 'Instagram'],
]

export default props => (
  <Footer {...props}>
    <Box pr={[0, '2em']}>
      Copyright &copy; <strong>Mark Murray</strong>, {new Date().getFullYear()}
    </Box>

    <Box mt={['3em', 0]} pl={[0, '2em']}>
      {links.map(([Icon, link, name]) => (
        <a key={link} aria-label={name} name={name} href={link}>
          <Icon />
        </a>
      ))}
    </Box>
  </Footer>
)
