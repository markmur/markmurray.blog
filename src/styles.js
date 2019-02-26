import { Link } from 'gatsby'
import styled, { css, createGlobalStyle } from 'styled-components'
import { fontSize, space } from 'styled-system'

const LOGO_FONT = 'font-family: PT Serif, serif'
const SERIF_FONT = 'font-family: Merriweather, serif'

const theme = (key, fallback) => props =>
  props.theme[key] || (fallback || 'initial')

const isMobile = content => `
  @media (max-width: 720px) {
    ${content}
  }
`

const transition = css`
  transition: color 150ms, background 150ms;
  will-change: color, background;
`

export const Nav = styled.nav`
  padding: 1.5em 0 1.35em;

  ${isMobile(`
    padding: 1.25em 0;
  `)}
`

export const Logo = styled.h2`
  ${LOGO_FONT};
  color: ${theme('background')};
  text-shadow: 2px 2px 0 ${theme('primary')};
  font-size: 2.75rem;
  margin: 0;
  letter-spacing: 0.75px;
  ${transition};
`

export const Tag = styled(Link)`
  padding: 3px 6px;
  color: ${theme('tagColor')};
  background: ${theme('tagBackground')};
  font-weight: 500;
  font-size: 0.9rem;
  margin-right: 8px;
  border-radius: 3px;
  letter-spacing: 0.25px;
  ${transition};

  &:hover {
    background: ${theme('tagHoverBackground')};
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
  margin: 1em 3em 0;
  background: ${theme('contentBackground')};
  padding-top: 1em;
  height: 100%;
  ${space};
  ${transition};

  ${isMobile(`
    margin-left: 0;
    margin-right: 0;
    margin-bottom: 0;
    padding-top: 1em;
  `)}
`

export const PageHeading = styled.h1`
  font-size: 5rem;
  font-weight: 900;
  letter-spacing: 1px;
  text-transform: uppercase;
  color: var(--primary);
  margin-top: 1em;
  margin-bottom: 0.35em;

  ${isMobile(`
    font-size: 2.5rem;
    margin-top: 0.5em;
    margin-bottom: 1em;
  `)}
`

export const Title = styled.h1`
  color: ${theme('titleColor')};
  font-size: 1.75rem;
  line-height: 1.45;
  font-weight: 800;
  margin-top: 0;
  margin-bottom: 12px;
  ${fontSize};
  ${transition};

  ${isMobile(`
    font-weight: 800;
    font-size: 1.65rem;
  `)}
`

export const PostTitle = styled(Title)`
  font-weight: 800;
  font-size: 3rem;
  margin-top: 2em;
  line-height: 1.35;
  letter-spacing: 0.2px;
  color: ${theme('titleColor')};
  ${transition};

  ${isMobile(`
    margin-top: 1em;
  `)};
`

export const LineBreak = styled.div`
  width: 80px;
  border: 0.5px solid ${theme('primary')};
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
  border-bottom: 1px solid ${theme('postBorderColor')};
  padding: 3em 0;

  &:hover {
    background: ${theme('postHoverColor')};
  }

  ${isMobile(`
    padding-top: 2em;

    &:first-of-type {
      border-top: 1px solid #eaeaea;
    }
  `)}
`

export const Paragraph = styled.p`
  ${SERIF_FONT};
  font-size: 15px;
  line-height: 1.65;
  color: ${theme('color')};
  ${space};
`

export const Description = styled(Paragraph)`
  color: ${theme('descriptionColor')};
  font-size: 1.05rem;
  margin-bottom: 2em;
  ${space};
  ${transition};

  ${isMobile(`
    margin-bottom: 1em;
  `)}
`

export const BlogPost = styled.article`
  p,
  ul,
  ol,
  li {
    ${SERIF_FONT};
    font-size: 16px;
    line-height: 1.88;
    font-weight: 400;
    color: ${theme('color')};
    --x-height-multiplier: 0.375;
    --baseline-multiplier: 0.17;
    ${transition};
  }
`

export const Comments = styled.div`
  padding: 3em 0;
  border-top: 1px solid ${theme('hrColor')};
  margin-top: 3em;
`

export const GlobalStyles = createGlobalStyle`
  :root {
    --background: ${theme('background')};
    --primary: ${theme('primary')};
  }

  ::selection {
    background: ${theme('selection')};
  }

  html,
  body {
    margin: 0;
    padding: 0;
    font-size: 100%;
    letter-spacing: 0.2px;
    color: ${theme('color')};
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
      Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    text-rendering: optimizeLegibility;
    -webkit-font-smoothing: antialiased;
    -webkit-text-size-adjust: 100%;
  }

  body {
    background: ${theme('background')};
    ${transition};
  }

  *,
  *:before,
  *:after {
    box-sizing: border-box;
  }

  a {
    color: inherit;
    font-style: inherit;
    text-decoration: inherit;
  }

  hr {
    display: block;
    border: none;
    height: 1px;
    background: ${theme('hrColor')};
    margin: 4em 30%;
    outline: none;
  }

  p > a,
  li > a,
  strong > a {
    padding: 2px;
    color: ${theme('linkColor')};
    font-weight: 600;
    border-bottom: 1px solid ${theme('linkBorder')};
  }

  p > a:hover,
  li > a:hover,
  strong > a:hover {
    border-bottom: 1px solid #0087ff;
  }

  blockquote {
    background: ${theme('blockquoteBackground')};
    padding: 0.5em 2em;
    margin: 0;
    margin-bottom: 2em;
    border-left: 2em solid ${theme('blockquoteBorder')};
  }
`
