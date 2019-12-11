import React, { useState } from 'react'
import cx from 'classnames'
import styled from 'styled-components'
import { useTrail, animated } from 'react-spring'

const Main = styled.div`
  padding-top: 4em;
  position: relative;
  overflow: hidden;

  &.cursor {
    cursor: pointer;
  }
`

const Text = styled(animated.div)`
  position: relative;
  width: 100%;
  height: ${p => p.lineHeight}px;
  line-height: ${p => p.lineHeight}px;
  color: ${p => p.color || 'palevioletred'};
  font-size: ${p => p.fontSize};
  font-weight: 800;
  text-transform: uppercase;
  will-change: transform, opacity;
  overflow: hidden;

  > div {
    overflow: hidden;
  }

  a {
    font-weight: 800;
  }
`

const config = { mass: 5, tension: 2000, friction: 200 }

const Trails = ({
  text,
  reanimateOnClick,
  delay = 0,
  fontSize = '4rem',
  lineHeight = 80,
}) => {
  const [toggle, set] = useState(false)

  // Animate the trail after the delay
  setTimeout(() => set(true), delay)

  const trail = useTrail(text.length, {
    config,
    opacity: toggle ? 1 : 0,
    x: toggle ? 0 : 20,
    height: toggle ? lineHeight : 0,
    from: { opacity: 0, x: 20, height: 0 },
  })

  return (
    <Main
      className={cx({
        cursor: reanimateOnClick,
      })}
      onClick={() => (reanimateOnClick ? set(state => !state) : {})}
    >
      <div>
        {trail.map(({ x, height, ...rest }, index) => (
          <Text
            key={text[index]}
            fontSize={fontSize}
            lineHeight={lineHeight}
            style={{
              ...rest,
              transform: x.interpolate(x => `translate3d(0,${x}px,0)`),
            }}
          >
            <animated.div style={{ height }}>{text[index]}</animated.div>
          </Text>
        ))}
      </div>
    </Main>
  )
}

export default Trails
