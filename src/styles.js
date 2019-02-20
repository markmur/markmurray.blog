import styled from 'styled-components'

const SERIF_FONT = 'font-family: Merriweather, serif'

export const Title = styled.h1`
  color: #0087ff;
  font-size: 1.85em;
  line-height: 1.25;
  font-weight: 600;
  margin-bottom: 10px;
`

export const Timestamp = styled.p`
  font-weight: bold;
  font-size: 12px;
  color: #aaa;
  margin-bottom: 1em;
`

export const Post = styled.article`
  box-shadow: 0 4px 20px 0 rgba(0, 0, 0, 0.05);
  padding: 2em;
  border-radius: 6px;
`

export const Paragraph = styled.p`
  ${SERIF_FONT};
  font-size: 15px;
  line-height: 1.65;
  color: #333;
`

export const BlogPost = styled.article`
  p {
    ${SERIF_FONT};
    font-size: 16px;
    line-height: 1.58;
    font-weight: 400;
    color: rgba(0, 0, 0, 0.8);
    --x-height-multiplier: 0.375;
    --baseline-multiplier: 0.17;
  }
`
