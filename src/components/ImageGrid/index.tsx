import React from 'react';
import './styles.scss';

import { Flex, Box, Text } from '../../styles';
import { formatPrice } from '../../utils/currency';
import { isOrientationLandscape } from '../../utils/product';

interface Image {
  image_url: string;
  href: string;
  title: string;
  price?: number;
  width?: number;
  height?: number;
  priceRangeV2?: {
    minVariantPrice: {
      amount: number;
      currencyCode: string;
    };
  };
  metafields?: {
    key?: string;
    value?: string;
  };
}

interface Props {
  images: Image[];
  grid?: [number, number, number];
  carouselOnMobile?: boolean;
  center?: boolean;
  orientation?: 'portrait' | 'landscape';
}

const ImageGrid: React.FC<Props> = ({
  images,
  grid,
  carouselOnMobile = false,
  center = false,
  orientation = 'portrait',
}) => {
  const portraitGrid = [2, 3, 4];
  const landscapeGrid = [2, 3, 2];
  return (
    <Flex
      mx={-2}
      scrollBar={!carouselOnMobile}
      maxWidth="100vw"
      overflowX="auto"
      justifyContent={center ? 'center' : 'flex-start'}
      flexWrap={carouselOnMobile ? ['nowrap', 'wrap'] : 'wrap'}
    >
      {images.map((image) => {
        const isLandscape = isOrientationLandscape(image);
        const aspectRatio = isLandscape ? [4 / 2.85] : [2 / 3];
        const imageGrid = grid
          ? grid
          : isLandscape
          ? landscapeGrid
          : portraitGrid;
        return (
          <Box
            key={image.href}
            p={[2, 3]}
            flex={[
              `0 0 calc(100% / ${imageGrid[0]})`,
              `0 0 calc(100% / ${imageGrid[1]})`,
              `0 0 calc(100% / ${imageGrid[2]})`,
            ]}
          >
            <a href={image.href}>
              <Box
                aspectRatio={aspectRatio}
                className="image"
                backgroundSize="cover"
                backgroundPosition="center center"
                style={{
                  backgroundImage: `url(${image.image_url})`,
                }}
              />

              <Box textAlign="center" py={3} mb={2}>
                <h4>{image.title}</h4>
                {image.priceRangeV2 &&
                  isFinite(image.priceRangeV2.minVariantPrice.amount) && (
                    <Text mt={2} fontSize="small">
                      <em>from </em>
                      {formatPrice(
                        image.priceRangeV2.minVariantPrice.amount,
                        image.priceRangeV2.minVariantPrice.currencyCode,
                      )}{' '}
                      {image.priceRangeV2.minVariantPrice.currencyCode}
                    </Text>
                  )}
              </Box>
            </a>
          </Box>
        );
      })}
    </Flex>
  );
};

export default ImageGrid;
