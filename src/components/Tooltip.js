import React, { useState } from 'react'
import styled from 'styled-components'

const Container = styled.div`
  position: relative;
  display: inline-block;
`

const Tip = styled.div`
  position: absolute;
  top: -140%;
  left: 50%;
  opacity: 0;
  transform: translateX(-55%) translateY(-20%);
  background: black;
  color: white;
  padding: 5px 1em;
  font-size: 12px;
  font-weight: 500;
  border-radius: 3px;
  white-space: nowrap;
  transition: opacity 200ms, transform 200ms;

  ${p =>
    p.visible &&
    `
    opacity: 1;
    transform: translateX(-55%) translateY(0);
  `}
`

const Tooltip = ({ title, children }) => {
  const [visible, setVisibility] = useState(false)

  return (
    <Container>
      <Tip visible={visible} className="tip">
        {title}
      </Tip>
      <div
        onMouseOver={() => setVisibility(true)}
        onMouseOut={() => setVisibility(false)}
      >
        {children}
      </div>
    </Container>
  )
}

export default Tooltip
