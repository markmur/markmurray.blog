export const preloadImages = images =>
  Promise.all(
    images.map(
      image =>
        new Promise(resolve => {
          const img = new Image()
          img.onload = () => resolve(image)
          img.onerror = () => resolve(image)
          img.src = image
        }),
    ),
  )
