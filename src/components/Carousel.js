import React from 'react'

class Carousel extends React.Component {
  state = {
    translateX: 0,
  }

  get width() {
    return 312 + 55
    // return Math.round(window.innerWidth / 4) + 24;
  }

  handlePrev = () => {
    this.setState(({ translateX }) => ({
      translateX: translateX >= this.width ? translateX - this.width : 0,
    }))
  }

  handleNext = () => {
    this.setState(({ translateX }) => ({
      translateX:
        translateX + this.width <=
        document.querySelector('.carousel-container').scrollWidth
          ? translateX + this.width
          : translateX +
            (document.querySelector('.carousel-container').scrollWidth -
              translateX),
    }))
  }

  render() {
    const { children } = this.props
    const { translateX } = this.state

    return (
      <div className="carousel-container">
        <div
          className="carousel"
          style={{
            transform: `translateX(-${translateX}px)`,
          }}
        >
          {children}
        </div>
      </div>
    )
  }
}

export default Carousel
