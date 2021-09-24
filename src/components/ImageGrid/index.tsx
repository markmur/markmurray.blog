import React from 'react'
import './styles.scss'

interface Image {
  image_url: string
  href: string
  width?: number
  height?: number
}

interface Props {
  images: Image[]
}

const ImageGrid: React.FC<Props> = ({ images }) => {
  return (
    <ul className="imageGrid">
      {images.map(image => (
        <li key={image.href}>
          <a href={image.href}>
            <div
              className="image"
              style={{
                backgroundImage: `url(${image.image_url})`,
              }}
            />
          </a>
        </li>
      ))}
    </ul>
  )
}

export default ImageGrid
