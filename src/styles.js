import { Link } from 'gatsby'
import styled from 'styled-components'
import { fontSize, space } from 'styled-system'

const LOGO_FONT = 'font-family: PT Serif, serif'
const SERIF_FONT = 'font-family: Merriweather, serif'

const isMobile = content => `
  @media (max-width: 720px) {
    ${content}
  }
`

export const Nav = styled.nav`
  padding: 1.5em 0 1.35em;

  ${isMobile(`
    padding: 1.25em 0;
  `)}
`

export const Logo = styled.h2`
  ${LOGO_FONT};
  color: #f8f1f4;
  text-shadow: 2px 2px 0 rgb(216, 166, 166);
  font-size: 2.75rem;
  margin: 0;
  letter-spacing: 0.75px;
`

export const Tag = styled(Link)`
  padding: 3px 6px;
  color: #c1355a;
  background: rgba(217, 156, 174, 0.135);
  font-weight: 500;
  font-size: 0.9rem;
  margin-right: 8px;
  border-radius: 3px;
  letter-spacing: 0.25px;

  &:hover {
    background: rgba(217, 156, 174, 0.2);
  }
`

export const Container = styled.div`
  max-width: 800px;
  margin: auto;
  padding: 0 2em;

  ${isMobile(`
    padding: 0 1em;
  `)}
`

export const Content = styled.section`
  position: relative;
  z-index: 2;
  margin: 1em 3em 4em;
  background: #fffcf8;
  padding-top: 1em;
  height: 100%;
  padding-bottom: 15em;

  ${isMobile(`
    margin-left: 0;
    margin-right: 0;
    padding-top: 1em;
  `)}
`

export const PageHeading = styled.h1`
  font-size: 5rem;
  font-weight: 900;
  letter-spacing: 1px;
  text-transform: uppercase;
  color: rgba(217, 156, 174, 0.4);
  margin-top: 1em;
  margin-bottom: 0.35em;
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

  ${isMobile(`
    font-size: 2rem;
    margin-top: 1em;
  `)}
`

export const LineBreak = styled.div`
  width: 80px;
  border: 0.5px solid lightsalmon;
  margin-bottom: 2em;
  ${space};
`

export const Timestamp = styled.p`
  font-weight: 500;
  font-size: 15px;
  color: #aaa;
  margin-bottom: 1.5em;
`

export const Post = styled.article`
  border-bottom: 1px solid #eaeaea;
  padding: 3em 0;

  &:hover {
    background: rgba(255, 255, 255, 0.6);
  }
`

export const Paragraph = styled.p`
  ${SERIF_FONT};
  font-size: 15px;
  line-height: 1.65;
  color: #444;
  ${space};
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
`
