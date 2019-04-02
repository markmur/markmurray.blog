import React from 'react'

const getOverflow = el => [
  el.clientWidth < el.scrollWidth,
  el.clientHeight < el.scrollHeight,
]

const getFillSize = (el, minFontSize, maxFontSize) => {
  // Make an initial guess at font-size that fits width
  let fontSize = Math.min(
    Math.max(
      Math.min(Number(el.offsetWidth) / (1 * 10), maxFontSize),
      minFontSize,
    ),
  )

  const step = 1
  let complete

  while (!complete) {
    el.style.fontSize = `${fontSize}px`
    const [overflowWidth, overflowHeight] = getOverflow(el)

    if (overflowHeight || overflowWidth) {
      if (fontSize <= minFontSize) {
        fontSize = minFontSize
        complete = true
      } else {
        fontSize -= step
        complete = true
      }
    } else if (overflowWidth) {
      fontSize -= step
      complete = true
    } else if (fontSize >= maxFontSize) {
      fontSize = maxFontSize
      complete = true
    } else if (!complete) {
      fontSize += step
    }
  }

  return fontSize
}

export const camelize = str =>
  str.replace(/-(\w)/g, (s, letter) => letter.toUpperCase())

const css = (el, styles) => {
  for (const property in styles) {
    if (property) {
      el.style[property] = styles[property]
    }
  }
}

function getStyle(el, styleProp) {
  if (el.currentStyle) {
    return el.currentStyle[camelize(styleProp)]
  }

  if (document.defaultView && document.defaultView.getComputedStyle) {
    return document.defaultView
      .getComputedStyle(el, null)
      .getPropertyValue(styleProp)
  }

  return el.style[camelize(styleProp)]
}

class ScaleText extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      size: null,
    }

    this._resizing = false

    this._handleResize = () => {
      if (!this._resizing) {
        requestAnimationFrame(this.handleResize.bind(this))
      }

      this._resizing = true
    }
  }

  componentDidMount() {
    this.resize()
    window.addEventListener('resize', this._handleResize)
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this._handleResize)
  }

  handleResize() {
    this._resizing = false
    this.resize()
  }

  resize() {
    const { minFontSize, maxFontSize } = this.props

    if (this.ruler) {
      this.clearRuler()
    }

    this.createRuler()

    const fontSize = getFillSize(
      this.ruler,
      minFontSize || Number.NEGATIVE_INFINITY,
      maxFontSize || Number.POSITIVE_INFINITY,
    )

    this.setState(
      {
        size: parseFloat(fontSize, 10),
      },
      () => {
        this.clearRuler()
      },
    )
  }

  createRuler() {
    // Create copy of wrapper for sizing
    this.ruler = this._wrapper.cloneNode(true)

    css(this.ruler, {
      position: 'absolute',
      top: '0px',
      left: 'calc(100vw * 2)',
      width: getStyle(this._wrapper, 'width'),
      height: getStyle(this._wrapper, 'height'),
    })

    document.body.append(this.ruler)
  }

  clearRuler() {
    if (this.ruler) {
      document.body.removeChild(this.ruler)
    }

    this.ruler = null
  }

  render() {
    const { size: fontSize } = this.state
    const { children } = this.props

    const overflowStyle = {
      overflowY: 'visible',
      overflowX: 'hidden',
      height: 'auto',
    }

    const child = React.isValidElement(children) ? (
      React.Children.only(children)
    ) : (
      <span>{children}</span>
    )

    const style = {
      fontSize: fontSize ? `${fontSize.toFixed(2)}px` : 'inherit',
      width: '100%',
      height: '100%',
      ...overflowStyle,
    }

    const childProps = {
      fontSize: fontSize ? parseFloat(fontSize.toFixed(2)) : 'inherit',
    }

    return (
      <div
        ref={c => {
          this._wrapper = c
        }}
        style={style}
      >
        {React.cloneElement(child, childProps)}
      </div>
    )
  }
}

export default ScaleText
