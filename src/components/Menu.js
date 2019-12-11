import React from 'react'
import { Link } from 'gatsby'

import CloseIcon from '../icons/feather/x.svg'
import { AppearIn } from './animations'
import Trails from './Trails'

const Menu = ({ open, onClose }) => {
  return (
    open && (
      <menu className="menu">
        <AppearIn ms={400}>
          <CloseIcon class="close-icon" onClick={onClose} />
          <div className="menu-content">
            <div>
              <ul>
                <li>
                  <Link to="https://github.com/markmur">GitHub</Link>
                </li>
                <li>
                  <Link to="https://twitter.com/mrkmur">Twitter</Link>
                </li>
                <li>
                  <Link to="https://instagram.com/markmur">Instagram</Link>
                </li>
                <li>
                  <Link to="/resumé">Resumé</Link>
                </li>
              </ul>
              <small>
                Copyright &copy;{' '}
                <strong>
                  <em>Mark Murray</em>
                </strong>
                , {new Date().getFullYear()}
              </small>
            </div>
            <Trails
              delay={300}
              lineHeight={120}
              fontSize="5rem"
              text={[
                <a key="posts" className="text-xlarge" href="/posts">
                  Posts
                </a>,
                <a key="portfolio" className="text-xlarge" href="/portfolio">
                  Portfolio
                </a>,
                <a key="snippets" className="text-xlarge" href="/snippets">
                  Snippets
                </a>,
              ]}
            />
          </div>
        </AppearIn>
        <div className="background" />
      </menu>
    )
  )
}

export default Menu
