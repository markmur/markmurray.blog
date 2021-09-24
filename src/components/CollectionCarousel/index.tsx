import React from 'react'
import {
  HiOutlineArrowLeft as Left,
  HiOutlineArrowRight as Right,
} from 'react-icons/hi'
import Button from '../Button'

import * as styles from './styles.scss'

const CollectionCarousel = ({ id, title, heading, description, images }) => {
  const [index, setIndex] = React.useState(0)
  const ref = React.createRef<HTMLElement>()

  const handleNextClick = () => {
    if (index === images.length - 1) return

    const next = index + 1

    setIndex(next)
    ref.current.scrollLeft = next * 272
  }

  const handlePrevClick = () => {
    if (index === 0) return

    setIndex(index - 1)
    ref.current.scrollLeft -= 272
  }

  const [loaded, setLoadedState] = React.useState(false)

  React.useEffect(() => {
    setLoadedState(true)
  }, [])

  return (
    <div id="content" className={styles.collectionCarousel}>
      <div className="title">
        <h1>{heading}</h1>
      </div>

      <div className="description">
        <div className="caption">
          <h6>Featured Collection</h6>
          <h4>{title}</h4>
          <p>{description}</p>
        </div>

        <div>
          <div className="controls">
            <div onClick={handlePrevClick}>
              <Left size="20px" />
            </div>
            <div onClick={handleNextClick}>
              <Right size="20px" />
            </div>
            {/* <a href={`/collections/${id}`} className="buy">
              BUY PRINTS
            </a> */}
          </div>

          <Button href={`/collections/${id}`}>View Collection</Button>
        </div>
      </div>

      <ul ref={ref}>
        {images.map(image => (
          <li key={image}>
            <a href={`/photography/prod_KFZCWB1EJmCtfN`}>
              <img
                className={loaded ? 'loaded' : ''}
                width="300"
                height="428"
                src={image}
              />
            </a>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default CollectionCarousel
