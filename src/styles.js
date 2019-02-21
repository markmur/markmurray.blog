import styled from 'styled-components'
import { fontSize, space, color } from 'styled-system'

const system = `
  ${fontSize};
  ${space};
  ${color}
`

const LOGO_FONT = 'font-family: PT Serif, serif'
const SERIF_FONT = 'font-family: Merriweather, serif'

export const Nav = styled.nav`
  padding: 1.5em 0 1.35em;
`

export const Logo = styled.h2`
  ${LOGO_FONT};
  color: rgb(93, 111, 126);
  margin: 0;
  font-size: 1.75rem;
  letter-spacing: 0.75px;
`

export const Container = styled.div`
  max-width: 800px;
  margin: auto;
  padding: 0 2em;
  ${system};
`

export const Content = styled.section`
  margin: 1em 3em 4em;
  background: #fffcf8;
  padding-top: 1em;
  height: 100%;
  padding-bottom: 5em;
`

export const PageHeading = styled.h1`
  font-size: 5rem;
  font-weight: 900;
  letter-spacing: 1px;
  text-transform: uppercase;
  color: rgba(217, 156, 174, 0.4);
  margin-top: 1em;
  margin-bottom: 0.35em;
  ${system};
`

export const Title = styled.h1`
  color: black;
  font-size: 1.75rem;
  line-height: 1.45;
  font-weight: 600;
  letter-spacing: 0.5px;
  margin-top: 0;
  margin-bottom: 12px;
  ${fontSize};
`

export const PostTitle = styled(Title)`
  font-weight: 800;
  font-size: 3rem;
  margin-top: 2em;
  line-height: 1.35;
  letter-spacing: 0.2px;
`

export const LineBreak = styled.div`
  width: 80px;
  border: 0.5px solid mediumaquamarine;
  margin-bottom: 2em;
  ${space};
`

export const Timestamp = styled.p`
  font-weight: 500;
  font-size: 15px;
  color: #aaa;
  margin-bottom: 1.5em;
  ${system};
`

export const Post = styled.article`
  border-bottom: 1px solid #eaeaea;
  padding: 3em 0;
  ${system};

  &:hover {
    background: rgba(255, 255, 255, 0.6);
  }
`

export const Paragraph = styled.p`
  ${SERIF_FONT};
  font-size: 15px;
  line-height: 1.65;
  color: #444;
  ${system};
`

export const Description = styled(Paragraph)`
  color: #7b778e;
  font-style: italic;
  font-size: 1.05rem;
  margin-bottom: 2em;
  ${space};
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

  ${system};
`
