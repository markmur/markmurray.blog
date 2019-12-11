import React from 'react'
import { graphql } from 'gatsby'

// Components
import MetaFooter from '../components/MetaFooter'
import Layout from '../components/Layout'
import SplitLayout from '../components/SplitLayout'

// Utils
import { preloadImages } from '../utils/images'

// Components
import Trails from '../components/Trails'
import Carousel from '../components/Carousel'
import Card from '../components/Card'

const images = [
  'https://images.unsplash.com/photo-1561119331-236e3bcf921c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=668&q=80',
  'https://images.unsplash.com/photo-1560857895-1cbf2ab3647a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=668&q=80',
  'https://images.unsplash.com/photo-1560414239-dcdf7d8d0226?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=975&q=80',
  'https://images.unsplash.com/photo-1561119331-236e3bcf921c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=668&q=80',
  'https://images.unsplash.com/photo-1560857895-1cbf2ab3647a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=668&q=80',
  'https://images.unsplash.com/photo-1560414239-dcdf7d8d0226?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=975&q=80',
]

class IndexPage extends React.Component {
  state = {
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
    return (
      <Layout footer={false}>
        <SplitLayout>
          {({ Meta, Content }) => (
            <React.Fragment>
              <Meta>
                <Trails text={['Front', 'End', 'Developer']} />

                <p className="color-primary">
                  Currently working for{' '}
                  <a href="https://zalando.com">Zalando</a> in Dublin, Ireland.
                </p>

                <MetaFooter
                  onNavigateNext={this.handleCarouselAction('handleNext')}
                  onNavigatePrev={this.handleCarouselAction('handlePrev')}
                />
              </Meta>
              <Content>
                <Carousel ref={this.carouselRef}>
                  {this.state.imagesLoaded &&
                    images.map(image => <Card src={image} />)}
                </Carousel>
              </Content>
            </React.Fragment>
          )}
        </SplitLayout>
      </Layout>
    )
  }
}

export const pageQuery = graphql`
  query IndexQuery {
    site {
      siteMetadata {
        url
      }
    }
  }
`

export default IndexPage
