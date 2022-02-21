import { keyframes, css } from 'styled-components';

export const slideInKeyframes = keyframes`
 from { transform: translateX(200px) }
 to { transform: translate(0) }
`;

export const slideOutKeyframes = keyframes`
 from { transform: translate(0) }
 to { transform: translateX(200px) }
`;

export const fadeInKeyframes = keyframes`
  from { opacity: 0 }
  to { opacity: 1 }
`;

export const fadeUpInKeyframes = keyframes`
  from  { opacity: 0; transform: translateY(50px); }
  to    { opacity: 1; transform: translateY(0); }
`;

export const fadeOutKeyframes = keyframes`
  from { opacity: 1 }
  to { opacity: 0 }
`;

export const animations = (...animations) => css`
  animation: ${animations.join(', ')};
`;
