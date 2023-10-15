import './styles.css';

import { Box, Flex, Text } from '../../styles';
import { GatsbyImage, getImage } from 'gatsby-plugin-image';

import React from 'react';
import { formatPrice } from '../../utils/currency';
import { isOrientationLandscape } from '../../utils/product';

interface Image {
  image_url: string;
  href: string;
  title: string;
  width?: number;
  height?: number;
  price?: Price;
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
}) => {
  const portraitGrid = [2, 3, 4];
  const landscapeGrid = [1, 2, 2];
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
              <GatsbyImage
                loading="lazy"
                alt={image.title}
                image={getImage(image.media[0].image.gatsbyImageData)!}
              />

              <Box textAlign="center" py={3} mb={2}>
                <h4>{image.title}</h4>
                {image.price && isFinite(image.price.amount) && (
                  <Text mt={2} fontSize="small">
                    <em>from </em>
                    {formatPrice(
                      image.price.amount,
                      image.price.currencyCode,
                    )}{' '}
                    {image.price.currencyCode}
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
