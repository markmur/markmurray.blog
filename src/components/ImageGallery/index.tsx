import React from 'react'
import './styles.scss'

import { getImageUrl } from '../../utils/image'

const ImageGallery = ({ images }) => {
  const [selected, setSelected] = React.useState<string>(images[0])

  return (
    <div className="imageGallery">
      <div
        className="main"
        style={{
          backgroundImage: `url(${getImageUrl(selected)})`,
        }}
      />

      <ul>
        {images.map(thumbnail => (
          <li key={thumbnail} onClick={() => setSelected(thumbnail)}>
            <img src={getImageUrl(thumbnail, '300x375')} width={100} />
          </li>
        ))}
      </ul>
    </div>
  )
}

export default ImageGallery
