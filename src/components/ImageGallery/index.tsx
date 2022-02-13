import React from 'react';
import './styles.scss';

import { Flex, Box, HideOnMobile, HideOnDesktop, Sticker } from '../../styles';

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
      bottom={['4em', '0']}
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
        <Flex
          position="relative"
          mb="1em"
          className="imageGallery"
          flexDirection="row"
          flexWrap="nowrap"
          overflowX="auto"
          scrollBar={false}
        >
          {images.map((image) => (
            <Box position="relative" key={image.src} flex="1 0 auto">
              {image.tag && <Tag value={image.tag} />}
              <img
                src={image.src}
                style={{
                  backgroundImage: `-webkit-image-set(url(${image}) 1x, url(${image}) 2x)`,
                  height: 'auto',
                  maxHeight: '75vw',
                  maxWidth: '100vw',
                }}
              />
            </Box>
          ))}
        </Flex>
      </HideOnDesktop>
    </React.Fragment>
  );
};

export default ImageGallery;
