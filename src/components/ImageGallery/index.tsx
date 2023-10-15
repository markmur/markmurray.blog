import './styles.css';

import {
  Box,
  Carousel,
  CarouselItem,
  Flex,
  HideOnDesktop,
  HideOnMobile,
  Sticker,
} from '../../styles';
import { GatsbyImage, IGatsbyImageData, getImage } from 'gatsby-plugin-image';

import React from 'react';

interface Image {
  id: string;
  image: IGatsbyImageData;
  tag?: string;
}

interface Props {
  images: Image[];
  featuredImage?: Image;
}

function Tag({ value }) {
  return (
    <Sticker
      position="absolute"
      bottom={['0']}
      right={['0']}
      margin="1.5em"
      zIndex="100"
    >
      {value}
    </Sticker>
  );
}

const ImageGallery = ({ images, featuredImage }: Props) => {
  return (
    <React.Fragment>
      {/* Desktop */}
      <HideOnMobile>
        <Flex className="imageGallery" flexDirection="row">
          <Box mr={4}>
            {images.map((image, i) => (
              <Box
                key={image.id}
                mb={i < images.length - 1 ? 4 : 0}
                position="relative"
              >
                {image.tag && <Tag value={image.tag} />}

                <GatsbyImage
                  alt=""
                  loading="lazy"
                  image={getImage(image.image)}
                />
              </Box>
            ))}
          </Box>
        </Flex>
      </HideOnMobile>

      {/* Mobile */}
      <HideOnDesktop>
        <Carousel scrollPadding={false}>
          {images.map((image) => (
            <CarouselItem
              display="inline-block"
              margin="auto"
              position="relative"
              key={image.id}
              flex="1 0 auto"
            >
              <Box backgroundColor="#eee">
                {image.tag && <Tag value={image.tag} />}
                <GatsbyImage
                  alt=""
                  loading="lazy"
                  image={getImage(image.image)}
                  style={{
                    width: 'calc(100vw - 2em)',
                  }}
                />
              </Box>
            </CarouselItem>
          ))}
        </Carousel>
      </HideOnDesktop>
    </React.Fragment>
  );
};

export default ImageGallery;
