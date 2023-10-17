import * as React from 'react';
import * as styles from './styles.css';

import {
  Box,
  Carousel,
  CarouselItem,
  CollectionCarouselBox,
  Container,
  Flex,
  Link,
  Subtitle,
} from '../../styles';
import { GatsbyImage, getImage } from 'gatsby-plugin-image';
import {
  getMinPrice,
  getProductUrl,
  isOrientationLandscape,
} from '../../utils/product';

import Button from '../Button';
import Controls from '../Carousel/Controls';
import { formatPrice } from '../../utils/currency';
import { useCarousel } from '../Carousel';

const MobileContainer = ({ children }) => (
  <Box pl={[1, 0, 0]} px={['1em', 0, '0.5em']}>
    {children}
  </Box>
);

interface Props {
  id: string;
  to?: string;
  handle: string;
  title: string;
  heading?: string;
  description?: string;
  products: readonly Queries.ProductFragment[];
}

const CollectionCarousel: React.FunctionComponent<Props> = ({
  id,
  to,
  title,
  handle,
  description,
  products,
}) => {
  const containerRef = React.useRef(null);
  const { observe, next, prev } = useCarousel(containerRef, 300);

  const minPrice = getMinPrice(products);
  const collectionUrl = to ?? `/collections/${handle}`;

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
                  <Link to={`/collections/${id}`}>
                    <Subtitle>Featured Collection</Subtitle>
                  </Link>
                  <Box my={3}>
                    <h4>{title}</h4>
                  </Box>
                  <p>{description}</p>

                  {minPrice && (
                    <Box py={3}>
                      <small>
                        <em>from </em>
                        <strong>
                          {minPrice &&
                            formatPrice(
                              minPrice.minVariantPrice.amount,
                              minPrice.minVariantPrice.currencyCode,
                            )}{' '}
                          {minPrice?.minVariantPrice.currencyCode}
                        </strong>
                      </small>
                    </Box>
                  )}
                </Box>

                <Box mt={1}>
                  <Box display={['none', 'none', 'block']}>
                    {products.length > 3 && (
                      <Controls mt={3} mb={4} onPrev={prev} onNext={next} />
                    )}
                    <Button href={collectionUrl}>View Collection</Button>
                  </Box>
                </Box>
              </Box>
            </MobileContainer>
          </CollectionCarouselBox>

          <Box flex={8} overflow="hidden">
            <Carousel ref={containerRef} pr={[3, 5]}>
              {[...products].map((product) => {
                const image = product?.media[0]?.image;

                const sharedContainerProps = {
                  mr: [2, 3],
                  width: isOrientationLandscape(product)
                    ? ['90vw', '576px']
                    : ['60vw', '200px', '278px'],
                  aspectRatio: isOrientationLandscape(product)
                    ? [3 / 2]
                    : [4 / 6, 5 / 8],
                  style: { overflow: 'hidden' },
                };

                return (
                  <CarouselItem ref={observe} key={product.id}>
                    <a href={product.to ?? getProductUrl(product)}>
                      <Box {...sharedContainerProps}>
                        <GatsbyImage
                          loading="lazy"
                          alt={product.title}
                          image={getImage(image.gatsbyImageData)!}
                        />
                      </Box>
                    </a>
                  </CarouselItem>
                );
              })}
            </Carousel>
          </Box>
        </Flex>
        <Box className="title">
          <Container>
            <h1 style={{ zIndex: -1 }}>{title}</h1>
          </Container>
        </Box>

        <MobileContainer>
          <Box display={['block', 'block', 'none']}>
            <Box mt={3}>
              <Button href={collectionUrl}>View Collection</Button>
            </Box>
          </Box>
        </MobileContainer>
      </Box>
    </Box>
  );
};

export default CollectionCarousel;
