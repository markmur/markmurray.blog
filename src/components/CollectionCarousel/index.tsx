import * as React from 'react';
import Button from '../Button';
import {
  Flex,
  Box,
  Carousel,
  CarouselItem,
  Subtitle,
  CollectionCarouselBox,
  Link,
} from '../../styles';

import * as styles from './styles.scss';
import { useCarousel } from '../Carousel';
import { getProductUrl } from '../../utils/product';
import { formatPrice } from '../../utils/currency';
import Controls from '../Carousel/Controls';

const MobileContainer = ({ children }) => (
  <Box px={['1em', 0, '0.5em']}>{children}</Box>
);

interface Product {
  id: string;
  title: string;
  handle: string;
  images: {
    src: string;
  }[];
  priceRangeV2: {
    minVariantPrice: {
      amount: number;
      currencyCode: string;
    };
  };
}

interface Props {
  id: string;
  handle: string;
  title: string;
  heading?: string;
  description?: string;
  products: Product[];
}

const getMinPrice = (products: Product[]): Product['priceRangeV2'] => {
  if (!products.length) return;

  return products.sort(
    (a, b) =>
      a.priceRangeV2.minVariantPrice.amount -
      b.priceRangeV2.minVariantPrice.amount,
  )[0]?.priceRangeV2;
};

const CollectionCarousel: React.FunctionComponent<Props> = ({
  id,
  title,
  handle,
  description,
  products,
}) => {
  const [loaded, setLoadedState] = React.useState(false);

  React.useEffect(() => {
    setLoadedState(true);
  }, []);

  const containerRef = React.useRef(null);
  const { observe, next, prev } = useCarousel(containerRef, 300);

  const minPrice = getMinPrice(products);

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
                          {formatPrice(
                            minPrice.minVariantPrice.amount,
                            minPrice.minVariantPrice.currencyCode,
                          )}{' '}
                          {minPrice.minVariantPrice.currencyCode}
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
                    <Button href={`/collections/${id}`}>View Collection</Button>
                  </Box>
                </Box>
              </Box>
            </MobileContainer>
          </CollectionCarouselBox>

          <Box flex={8} overflow="hidden">
            <Carousel ref={containerRef} pr={[3, 5]}>
              {[...products]
                .sort((a, b) => a.title?.localeCompare(b?.title))
                .map((product) => (
                  <CarouselItem ref={observe} key={product.id}>
                    <a href={getProductUrl(product)}>
                      <Box
                        className={loaded ? 'item loaded' : 'item'}
                        mr={[2, 3]}
                        width={['40vw', '200px', '278px']}
                        aspectRatio={[4 / 6, 5 / 8]}
                        backgroundSize="cover"
                        style={{
                          backgroundImage: `url(${product.images[0].src})`,
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
              <Button href={`/collections/${handle}`}>View Collection</Button>
            </Box>
          </Box>
        </MobileContainer>
      </Box>
    </Box>
  );
};

export default CollectionCarousel;
