import React from 'react';
import './styles.scss';

import { Box } from '../../styles';

interface Image {
  image_url: string;
  href: string;
  title: string;
  price: number;
  width?: number;
  height?: number;
}

interface Props {
  images: Image[];
}

const ImageGrid: React.FC<Props> = ({ images }) => {
  return (
    <ul className="imageGrid">
      {images.map(image => (
        <Box
          key={image.href}
          p={[1, 3]}
          flex={['0 0 calc(100% / 2)', '0 0 calc(100% / 4)']}
        >
          <a href={image.href}>
            <Box
              aspectRatio={[2 / 3]}
              className="image"
              backgroundSize="cover"
              backgroundPosition="center center"
              style={{
                backgroundImage: `url(${image.image_url})`,
              }}
            />

            <Box textAlign="center" py={3} mb={2}>
              <h5>{image.title}</h5>
              {image.price && <small>from €{image.price}</small>}
            </Box>
          </a>
        </Box>
      ))}
    </ul>
  );
};

export default ImageGrid;
