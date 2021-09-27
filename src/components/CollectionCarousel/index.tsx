import React from 'react'
import {
  HiOutlineArrowLeft as Left,
  HiOutlineArrowRight as Right,
} from 'react-icons/hi'
import Button from '../Button'
import {
  Flex,
  Box,
  Container,
  HideOnMobile,
  HideOnDesktop,
  Carousel,
  CarouselItem,
} from '../../styles'

import * as styles from './styles.scss'

const CollectionCarousel = ({
  id,
  minPrice,
  title,
  heading,
  description,
  images,
}) => {
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
    <Box
      id="content"
      className={styles.collectionCarousel}
      bg="rgba(244, 244, 247, 0.5)"
      pt={[5, '45px']}
      pb={[4, '45px']}
      px={[0, 3]}
      mb={5}
    >
      <Container maxWidth={['100%', '1320px']}>
        <Flex flexDirection={['column', 'row']}>
          <Box flex="1" minWidth={400}>
            <Box className="description" pr={[0, 5]} mb={[3, 0]}>
              <Box className="caption" width={['auto']}>
                <h6>Featured Collection</h6>
                <Box my={3}>
                  <h4>{title}</h4>
                </Box>
                <p>{description}</p>

                {minPrice && (
                  <Box py={3}>
                    <small>
                      <em>
                        from <strong>{minPrice}</strong>
                      </em>
                    </small>
                  </Box>
                )}
              </Box>

              <div>
                <HideOnMobile>
                  <Box className="controls" my={4}>
                    <div onClick={handlePrevClick}>
                      <Left size="20px" />
                    </div>
                    <div onClick={handleNextClick}>
                      <Right size="20px" />
                    </div>
                  </Box>
                  <Button href={`/collections/${id}`}>View Collection</Button>
                </HideOnMobile>
              </div>
            </Box>
          </Box>

          <Box flex={8} overflow="hidden">
            <Carousel ref={ref}>
              {images.map(image => (
                <CarouselItem key={image} flex="1">
                  <a href={`/photography/prod_KFZCWB1EJmCtfN`}>
                    <Box
                      className={loaded ? 'loaded' : ''}
                      // width="300"
                      // height="428"
                      mr={[1, 2]}
                      width={['40vw', '20vw']}
                      aspectRatio={[4 / 6, 5 / 8]}
                      backgroundSize="cover"
                      style={{
                        backgroundImage: `url(${image})`,
                      }}
                    />
                  </a>
                </CarouselItem>
              ))}
            </Carousel>

            <HideOnDesktop>
              <Box mt={3}>
                <Button href={`/collections/${id}`}>View Collection</Button>
              </Box>
            </HideOnDesktop>

            {/* <div className="title">
              <h1>{heading}</h1>
            </div> */}
          </Box>
        </Flex>
      </Container>
    </Box>
  )
}

export default CollectionCarousel
