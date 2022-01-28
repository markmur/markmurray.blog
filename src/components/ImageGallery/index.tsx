import React from 'react';
import './styles.scss';

import { Flex, Box } from '../../styles';
import { getImageUrl, Sizes } from '../../utils/image';

const ImageGallery = ({ images }) => {
  const [selected, setSelected] = React.useState<string>(images[0]);

  return (
    <Flex className="imageGallery" flexDirection={['column', 'row']}>
      <Box
        width={['100%', '500px']}
        height={['55vh', '90vh']}
        className="main"
        style={{
          backgroundImage: `-webkit-image-set(
            url(${selected}) 1x,
            url(${selected}) 2x
          )`,
        }}
      />

      <Flex flexDirection={['row', 'column']}>
        {images.map((thumbnail) => (
          <Box
            key={thumbnail}
            cursor="pointer"
            backgroundColor="#f4f4f7"
            mt={[2, 0]}
            mr={[2, 0]}
            ml={[0, 2]}
            mb={[0, 2]}
            width={100}
            aspectRatio={2 / 3}
            backgroundSize="cover"
            style={{
              backgroundImage: `url(${thumbnail})`,
            }}
            onClick={() => setSelected(thumbnail)}
          />
        ))}
      </Flex>
    </Flex>
  );
};

export default ImageGallery;
