import * as React from 'react';
import Button from '../Button';
import {
  Flex,
  Box,
  Carousel,
  CarouselItem,
  Subtitle,
  CollectionCarouselBox,
} from '../../styles';

import * as styles from './styles.scss';
import { useCarousel } from '../Carousel';
import { getProductUrl } from '../../utils/product';
import Controls from '../Carousel/Controls';

const MobileContainer = ({ children }) => <Box px={3}>{children}</Box>;

interface Image {
  image_url: string;
  id: string;
  handle: string;
}
interface Props {
  id: string;
  minPrice?: number;
  title: string;
  heading?: string;
  description?: string;
  images: Image[];
}

const CollectionCarousel: React.FunctionComponent<Props> = ({
  id,
  minPrice,
  title,
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
      overflowX="hidden"
    >
      <Box maxWidth="100%" ml={[0, 0, 0]}>
        <Flex flexDirection={['column', 'column', 'row']}>
          <CollectionCarouselBox
            id="CollectionCarouselBox"
            flex="1"
            minWidth={400}
            maxWidth="100%"
          >
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

                <Box mt={1}>
                  <Box display={['none', 'none', 'block']}>
                    {images.length > 3 && (
                      <Controls mt={3} mb={4} onPrev={prev} onNext={next} />
                    )}
                    <Button href={`/collections/${id}`}>View Collection</Button>
                  </Box>
                </Box>
              </Box>
            </MobileContainer>
          </CollectionCarouselBox>

          <Box flex={8} overflow="hidden">
            <Carousel ref={containerRef} pr={[3, 5]}>
              {images.map((image) => (
                <CarouselItem ref={observe} key={image.id}>
                  <a href={getProductUrl(image)}>
                    <Box
                      className={loaded ? 'item loaded' : 'item'}
                      mr={[1, 3]}
                      width={['40vw', '200px', '278px']}
                      aspectRatio={[4 / 6, 5 / 8]}
                      backgroundSize="cover"
                      style={{
                        backgroundImage: `url(${image.image_url})`
                      }}
                    />
                  </a>
                </CarouselItem>
              ))}
            </Carousel>

            {/* <div className="title">
              <h1 style={{ zIndex: -1 }}>#{heading}</h1>
            </div> */}
          </Box>
        </Flex>

        <MobileContainer>
          <Box display={['block', 'block', 'none']}>
            <Box mt={3}>
              <Button href={`/collections/${id}`}>View Collection</Button>
            </Box>
          </Box>
        </MobileContainer>
      </Box>
    </Box>
  );
};

export default CollectionCarousel;
