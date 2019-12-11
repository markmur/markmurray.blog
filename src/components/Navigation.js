import React from 'react'
import { Link } from 'gatsby'
import MenuIcon from '../icons/feather/menu.svg'

const Navigation = ({ meta, onMenuClick }) => (
  <nav className="container">
    <Link to="/">
      <h5>{meta.title}</h5>
    </Link>

    <span>
      <menu>
        <div className="page-links">
          <li>
            <Link to="/posts">Posts</Link>
          </li>
          <li>
            <Link to="/projects">Projects</Link>
          </li>
        </div>

        <li className="menu-icon" onClick={onMenuClick}>
          <MenuIcon />
        </li>
      </menu>
    </span>
  </nav>
)

export default Navigation
