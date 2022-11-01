import React from 'react';
import './styles.css';

import {
  Flex,
  Box,
  HideOnMobile,
  HideOnDesktop,
  Sticker,
  Carousel,
  CarouselItem,
} from '../../styles';

interface Image {
  src: string;
  featured?: boolean;
  tag?: string;
}

interface Props {
  images: Image[];
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

const ImageGallery = ({ images }: Props) => {
  return (
    <React.Fragment>
      {/* Desktop */}
      <HideOnMobile>
        <Flex className="imageGallery" flexDirection="row">
          <Box mr={4}>
            {images.map((image, i) => (
              <Box
                key={image.src}
                mb={i < images.length - 1 ? 4 : 0}
                position="relative"
              >
                {image.tag && <Tag value={image.tag} />}
                <img src={image.src} />
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
              key={image.src}
              flex="1 0 auto"
            >
              <Box backgroundColor="#eee">
                {image.tag && <Tag value={image.tag} />}
                <img
                  src={image.src}
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
