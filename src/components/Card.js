import React from 'react'
import { useSpring, animated } from 'react-spring'

const Tag = () => <strong>Project</strong>

const calc = (x, y) => [
  -(y - window.innerHeight / 2) / 100,
  (x - window.innerWidth / 2) / 100,
  1.0025,
]

const trans = (x, y, s) =>
  `perspective(800px) rotateX(${x}deg) rotateY(${y}deg) scale(${s})`

function Card({ src }) {
  const [props, set] = useSpring(() => ({
    xys: [0, 0, 1],
    config: { mass: 1, tension: 350, friction: 40 },
  }))
  return (
    <animated.div
      className="card"
      style={{ transform: props.xys.interpolate(trans) }}
      onMouseMove={({ clientX: x, clientY: y }) => set({ xys: calc(x, y) })}
      onMouseLeave={() => set({ xys: [0, 0, 1] })}
    >
      <div className="card-content">
        <div className="card-overlay" />
        <div className="card-text-content">
          <Tag />
          <h2>A project heading about something interesting.</h2>
          <p>Short caption to describe the project in a concise manner.</p>
        </div>
        <img src={src} />
      </div>
    </animated.div>
  )
}

export default Card
