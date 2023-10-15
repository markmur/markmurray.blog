import './styles.css';

import { Box, Flex, Text } from '../../styles';
import { GatsbyImage, GatsbyImageProps, getImage } from 'gatsby-plugin-image';
import { getProductUrl, isOrientationLandscape } from '../../utils/product';

import React from 'react';
import { formatPrice } from '../../utils/currency';

interface Props {
  products:
    | Queries.ProductFragment[]
    | Queries.FeaturedShopifyCollectionFragment['products'];
  grid?: [number, number, number];
  carouselOnMobile?: boolean;
  center?: boolean;
  orientation?: 'portrait' | 'landscape';
}

const portraitGrid = [2, 3, 4];
const landscapeGrid = [1, 2, 2];

const ProductGrid: React.FC<Props> = ({
  products,
  grid,
  carouselOnMobile = false,
  center = false,
}) => {
  return (
    <Flex
      mx={-2}
      scrollBar={!carouselOnMobile}
      maxWidth="100vw"
      overflowX="auto"
      justifyContent={center ? 'center' : 'flex-start'}
      flexWrap={carouselOnMobile ? ['nowrap', 'wrap'] : 'wrap'}
    >
      {products.map((item) => {
        const isLandscape = isOrientationLandscape(item);
        const aspectRatio = isLandscape ? [4 / 2.85] : [2 / 3];
        const imageGrid = grid
          ? grid
          : isLandscape
          ? landscapeGrid
          : portraitGrid;

        return (
          <Product item={item} grid={imageGrid} aspectRatio={aspectRatio} />
        );
      })}
    </Flex>
  );
};

function Product(props: {
  item: Queries.ProductFragment;
  grid: number[];
  aspectRatio?: number[];
}) {
  const { item, grid } = props;
  return (
    <Box
      key={item.id}
      p={[2, 3]}
      flex={[
        `0 0 calc(100% / ${grid[0]})`,
        `0 0 calc(100% / ${grid[1]})`,
        `0 0 calc(100% / ${grid[2]})`,
      ]}
    >
      <a href={getProductUrl(item)}>
        <GatsbyImage
          loading="lazy"
          alt={item.title}
          image={getImage(item.featuredMedia.preview.image.gatsbyImageData)!}
        />

        <Box textAlign="center" py={3} mb={2}>
          <h4>{item.title}</h4>
          {item.priceRangeV2 &&
            isFinite(item.priceRangeV2.minVariantPrice.amount) && (
              <Text mt={2} fontSize="small">
                <em>from </em>
                {formatPrice(
                  item.priceRangeV2.minVariantPrice.amount,
                  item.priceRangeV2.minVariantPrice.currencyCode,
                )}{' '}
                {item.priceRangeV2.minVariantPrice.currencyCode}
              </Text>
            )}
        </Box>
      </a>
    </Box>
  );
}

export default ProductGrid;
