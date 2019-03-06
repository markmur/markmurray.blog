import React from 'react'
import { EntypoGithub, EntypoTwitter } from 'react-entypo-icons'
import { Footer, Box } from '../styles'

const links = [
  [EntypoGithub, 'https://github.com/markmur'],
  [EntypoTwitter, 'https://twitter.com/mrkmur'],
]

export default props => (
  <Footer {...props}>
    <Box pr={[0, '2em']}>
      Copyright &copy; <strong>Mark Murray</strong>, {new Date().getFullYear()}
    </Box>

    <Box mt={['3em', 0]} pl={[0, '2em']}>
      {links.map(([Icon, link]) => (
        <a key={link} href={link}>
          <Icon />
        </a>
      ))}
    </Box>
  </Footer>
)
