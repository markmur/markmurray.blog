import React from 'react'

// Social Icons
import GithubIcon from '../icons/feather/github.svg'
import TwitterIcon from '../icons/feather/twitter.svg'
import InstagramIcon from '../icons/feather/instagram.svg'

// Carousel arrows
import ArrowRightIcon from '../icons/feather/chevron-right.svg'
import ArrowLeftIcon from '../icons/feather/chevron-left.svg'

// Components
import Tooltip from './Tooltip'

const MetaFooter = ({ onNavigateNext, onNavigatePrev }) => (
  <footer>
    <div className="footer-actions">
      <div className="social-icons">
        <Tooltip title="Github @markmur">
          <a
            className="icon"
            target="_blank"
            rel="noopener noreferrer"
            href="https://github.com/markmur"
          >
            <GithubIcon />
          </a>
        </Tooltip>

        <Tooltip title="Twitter @mrkmur">
          <a
            className="icon"
            target="_blank"
            rel="noopener noreferrer"
            href="https://twitter.com/mrkmur"
          >
            <TwitterIcon />
          </a>
        </Tooltip>

        <Tooltip title="Instagram @markmur">
          <a
            className="icon"
            target="_blank"
            rel="noopener noreferrer"
            href="https://instagram.com/markmur"
          >
            <InstagramIcon />
          </a>
        </Tooltip>
      </div>

      <div className="carousel-actions">
        <span className="icon">
          <ArrowLeftIcon onClick={onNavigatePrev} />
        </span>
        <span className="icon">
          <ArrowRightIcon onClick={onNavigateNext} />
        </span>
      </div>
    </div>
  </footer>
)

export default MetaFooter
