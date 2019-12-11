import React from 'react'

// Utils
import { preloadImages } from './utils/images'

// Icons
import { ReactComponent as GithubIcon } from './icons/feather/github.svg'
import { ReactComponent as TwitterIcon } from './icons/feather/twitter.svg'
import { ReactComponent as InstagramIcon } from './icons/feather/instagram.svg'
import { ReactComponent as BriefcaseIcon } from './icons/feather/briefcase.svg'

// Carousel arrows
import { ReactComponent as ArrowRightIcon } from './icons/feather/chevron-right.svg'
import { ReactComponent as ArrowLeftIcon } from './icons/feather/chevron-left.svg'

// Components
import Trails from './components/Trails'
import Carousel from './components/Carousel'
import Card from './components/Card'
import Menu from './components/Menu'
import Tooltip from './components/Tooltip'
import Navigation from './components/Navigation'

const images = [
  'https://images.unsplash.com/photo-1561119331-236e3bcf921c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=668&q=80',
  'https://images.unsplash.com/photo-1560857895-1cbf2ab3647a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=668&q=80',
  'https://images.unsplash.com/photo-1560414239-dcdf7d8d0226?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=975&q=80',
  'https://images.unsplash.com/photo-1561119331-236e3bcf921c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=668&q=80',
  'https://images.unsplash.com/photo-1560857895-1cbf2ab3647a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=668&q=80',
  'https://images.unsplash.com/photo-1560414239-dcdf7d8d0226?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=975&q=80',
]

class App extends React.Component {
  state = {
    menuOpen: false,
    imagesLoaded: false,
  }

  async componentDidMount() {
    await preloadImages(images.slice(0, 2))

    setTimeout(() => {
      this.setState({ imagesLoaded: true })
    }, 500)
  }

  carouselRef = React.createRef()

  handleCarouselAction = action => {
    if (this.carouselRef && this.carouselRef.current) {
      return this.carouselRef.current[action]
    }
  }

  render() {
    const { menuOpen } = this.state

    return (
      <div>
        <Navigation
          onMenuClick={() => this.setState({ menuOpen: !menuOpen })}
        />

        <Menu
          open={menuOpen}
          close={() => this.setState({ menuOpen: false })}
        />

        <main>
          <div className="meta-container vertical-align">
            <Trails text={['Front', 'End', 'Developer']} />

            <p className="color-primary">
              Currently working for <a href="https://zalando.com">Zalando</a> in
              Dublin, Ireland.
            </p>

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

                  <Tooltip title="Resumé">
                    <a
                      className="icon"
                      target="_blank"
                      rel="noopener noreferrer"
                      href="https://instagram.com/markmur"
                    >
                      <BriefcaseIcon />
                    </a>
                  </Tooltip>
                </div>

                <div className="carousel-actions">
                  <span className="icon">
                    <ArrowLeftIcon
                      onClick={this.handleCarouselAction('handlePrev')}
                    />
                  </span>
                  <span className="icon">
                    <ArrowRightIcon
                      onClick={this.handleCarouselAction('handleNext')}
                    />
                  </span>
                </div>
              </div>
            </footer>
          </div>

          <div className="content-container">
            <Carousel ref={this.carouselRef}>
              {this.state.imagesLoaded &&
                images.map(image => <Card src={image} />)}
            </Carousel>
          </div>
        </main>
      </div>
    )
  }
}

export default App
