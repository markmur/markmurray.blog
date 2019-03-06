const images = [
  'https://images.unsplash.com/photo-1494031021996-ac2eb738d846?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1603&q=80',
  'https://images.unsplash.com/photo-1417533366444-43834ad6b3bb?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1654&q=80',
  'https://images.unsplash.com/photo-1445331552301-94139f242587?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1650&q=80',
  'https://images.unsplash.com/photo-1500402448245-d49c5229c564?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1650&q=80',
  'https://images.unsplash.com/photo-1494189726046-a896ab4fb94a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1650&q=80',
]

const useLogoAnimation = () => {
  let count = 0
  let interval

  const start = event => {
    event.persist()

    interval = setInterval(() => {
      if (count === images.length) count = 0

      event.target.style.background = `url(${
        images[count]
      }) 0% 0% / 100% no-repeat`
      event.target.style['-webkit-background-clip'] = 'text'

      count++
    }, 50)
  }

  const stop = () => clearInterval(interval)

  return {
    onMouseEnter: start,
    onMouseLeave: stop,
  }
}

export default useLogoAnimation
