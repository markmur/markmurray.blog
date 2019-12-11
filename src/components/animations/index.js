import styled, { keyframes } from 'styled-components'

export const fadeIn = keyframes`
 from { opacity: 0 }
 to { opacity: 1 }
`

export const AppearIn = styled.div`
  opacity: 0;
  position: relative;
  z-index: 10;
  animation: ${fadeIn} 200ms ease-in forwards;
  animation-delay: ${p => p.ms || 1000}ms;
`
