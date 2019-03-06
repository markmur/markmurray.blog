import React from 'react'
import { Link } from 'gatsby'
import styled, { css, createGlobalStyle } from 'styled-components'
import { fontSize, space } from 'styled-system'

// const LOGO_FONT = 'PT Serif, serif'
const font = family => `font-family: ${family}`

const LOGO_FONT = font('Reenie Beanie')
const SERIF_FONT = font('Merriweather, serif')

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

export const Flex = styled.div`
  display: flex;
`

export const Bullet = styled(props => <span {...props}>&bull;</span>)`
  color: ${theme('bullet')};
  margin: 0 10px;
`

export const Toolbar = styled.div`
  background: black;
  width: 80px;
`

export const Logo = styled.h2`
  ${LOGO_FONT};
  color: ${theme('logoColor', theme('color'))};
  font-size: 3rem;
  margin: 0;
  display: inline;
  letter-spacing: 0.75px;
  font-weight: light;
  ${transition};
  color: transparent;
  background: url(https://images.unsplash.com/photo-1494031021996-ac2eb738d846?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1603&q=80)
    0% 0% / 100% no-repeat;
  background-clip: text;
  -webkit-background-clip: text;
`

export const Tag = styled(Link)`
  padding: 5px 12px;
  color: ${theme('tagColor')};
  background: ${theme('tagBackground')};
  background: var(--inline-code-background);
  font-family: 'Source Code Pro', Menlo, Monaco, Consolas, 'Courier New',
    Courier, monospace;
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
    padding: 0 1.5em;
  `)}
`

export const Content = styled.section`
  position: relative;
  z-index: 2;
  margin: 1em 3em 0;
  background: ${theme('contentBackground')};
  padding-top: 1em;
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
  color: transparent;
  margin-top: 1em;
  margin-bottom: 0.35em;
  background: url(https://images.unsplash.com/photo-1494031021996-ac2eb738d846?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1603&q=80)
    0% 0% / 100% no-repeat;
  background-clip: text;
  -webkit-background-clip: text;

  ${isMobile(`
    font-size: 3.25rem;
    margin-top: 0.5em;
    margin-bottom: 0.5em;
    letter-spacing: 0;
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

  strong {
    position: relative;
    font-weight: 800;

    &::before {
      content: '';
      position: absolute;
      top: -1px;
      bottom: -1px;
      right: -3px;
      left: -3px;
      background: #3996ff;
      opacity: 0.2;
      z-index: -1;
      transform: rotate(-1deg);
    }
  }
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

export const LineBreak = styled.div.attrs({
  className: 'LineBreak',
})`
  width: ${p => (p.width ? `${p.width}px` : '80px')};
  border: 2px solid ${theme('primary')};
  margin-bottom: 2em;
  ${space};
  transition: width 250ms ease-out;
`

export const Timestamp = styled.p`
  font-weight: 500;
  font-size: 15px;
  color: ${theme('descriptionColor')};
  margin-bottom: 1.5em;
`

export const Post = styled.article`
  border-bottom: 1px solid ${theme('postBorderColor')};
  padding: 4em 0;

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
  border-bottom: 1px solid ${theme('hrColor')};
  margin-top: 3em;
`

export const GlobalStyles = createGlobalStyle`
  :root {
    --background: ${theme('background')};
    --primary: ${theme('primary')};

    // Prism styles
    --char: #d8dee9;
    --comment: #999999;
    --keyword: #e89bda;
    --lineHighlight: #343b4a;
    --primitive: #5a9bcf;
    --string: #9effa5;
    --variable: #8f9fb9;
    --boolean: #ff8b50;
    --punctuation: #5fb3b3;
    --tag: #fc929e;
    --function: #79b6f2;
    --className: #fac863;
    --method: #6699cc;
    --operator: #fc929e;
    --code-background: ${theme('codeBackground', 'rgb(40, 44, 52)')};
    --inline-code-background: rgba(133, 180, 255, 0.2);
    --inline-code-color: ${theme('inlineCodeColor')};
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
    height: ${theme('hrWidth', '1px')};
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

    ${isMobile(`
      margin: 0 -2em 2em;
    `)}
  }
`
