import React from 'react';
import Button from '../Button';
import {
  Flex,
  Box,
  HideOnMobile,
  HideOnDesktop,
  Carousel,
  CarouselItem,
  Subtitle,
} from '../../styles';

import * as styles from './styles.scss';
import { useCarousel } from '../Carousel';
import Controls from '../Carousel/Controls';

const MobileContainer = ({ children }) => <Box px={3}>{children}</Box>;

const CollectionCarousel = ({
  id,
  minPrice,
  title,
  heading,
  description,
  images,
}) => {
  const [loaded, setLoadedState] = React.useState(false);

  React.useEffect(() => {
    setLoadedState(true);
  }, []);

  const containerRef = React.useRef(null);
  const { observe, next, prev } = useCarousel(containerRef, 300);

  return (
    <Box
      id="content"
      className={styles.collectionCarousel}
      bg="rgba(244, 244, 247, 0.5)"
      pt={[4, '45px']}
      pb={[4, '45px']}
      px={[0, 3]}
      mb={5}
    >
      <Box maxWidth="100%" ml={[0, 'calc(50vw - 668px)']}>
        <Flex flexDirection={['column', 'row']}>
          <Box flex="1" minWidth={400}>
            <MobileContainer>
              <Box className="description" pr={[0, 5]} mb={[3, 0]}>
                <Box className="caption" width={['auto']}>
                  <Subtitle>Featured Collection</Subtitle>
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
                    <Controls my={4} onPrev={prev} onNext={next} />

                    <Button href={`/collections/${id}`}>View Collection</Button>
                  </HideOnMobile>
                </div>
              </Box>
            </MobileContainer>
          </Box>

          <Box flex={8} overflow="hidden">
            <Carousel ref={containerRef} pr={[3, 5]}>
              {images.map(image => (
                <CarouselItem ref={observe} key={image} flex="1">
                  <a href={`/photography/prod_KFZCWB1EJmCtfN`}>
                    <Box
                      className={loaded ? 'item loaded' : 'item'}
                      mr={[1, 3]}
                      width={['40vw', '200px', '278px']}
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
              <MobileContainer>
                <Box mt={3}>
                  <Button href={`/collections/${id}`}>View Collection</Button>
                </Box>
              </MobileContainer>
            </HideOnDesktop>

            {/* <div className="title">
              <h1>{heading}</h1>
            </div> */}
          </Box>
        </Flex>
      </Box>
    </Box>
  );
};

export default CollectionCarousel;
