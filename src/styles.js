import React from 'react';
import { Link as GatsbyLink } from 'gatsby';
import { EntypoPin } from 'react-entypo-icons';
import styled, { css, createGlobalStyle } from 'styled-components';
import {
  fontSize,
  space,
  color,
  textAlign,
  maxWidth,
  layout,
  flex,
  display,
  flexDirection,
  justifyContent,
  alignItems,
  flexWrap,
  height,
  width,
  system,
  backgroundSize,
  backgroundPosition,
  backgroundImage,
  border,
} from 'styled-system';

// const LOGO_FONT = 'PT Serif, serif'
const font = family => `font-family: ${family}`;

const LOGO_FONT = font('Reenie Beanie');
const SERIF_FONT = font('Merriweather, serif');

const theme = (key, fallback) => props =>
  props.theme[key] || fallback || 'initial';

const isMobile = content => `
  @media (max-width: 767px) {
    ${content}
  }
`;

const notMobile = content => `
  @media (min-width: 768px) {
    ${content}
  }
`;

export const HideOnMobile = styled.div`
  ${isMobile(`
    display: none;
  `)};
`;

export const HideOnDesktop = styled.div`
  ${notMobile(`
    display: none;
  `)};
`;

const transition = css`
  transition: color 150ms, background 150ms;
  will-change: color, background;
`;

export const Nav = styled.nav`
  padding: 2.25em 0 1.35em;

  ${isMobile(`
    padding: 1.25em 0;
    position: fixed;
    top: 0;
    width: 100%;
    z-index: 100;
    background: rgba(245, 245, 247, 0.75);
    border-bottom: 1px solid #eaeaea;
    backdrop-filter: blur(10px) saturate(150%);
  `)}
`;

export const Flex = styled.div`
  display: flex;
  ${border};
  ${flex};
  ${space};
  ${layout};
  ${display};
  ${flexDirection};
  ${justifyContent};
  ${alignItems};
  ${flexWrap};
  ${color};
  ${height};
`;

const aspectRatio = system({
  aspectRatio: {
    property: 'aspectRatio',
    transform: val => `${val}`,
  },
});

export const Box = styled.div`
  ${border};
  ${space};
  ${maxWidth};
  ${width};
  ${height};
  ${textAlign};
  ${color};
  ${layout};
  ${flex};
  ${backgroundPosition};
  ${p => (p.aspectRatio ? aspectRatio : '')};
  ${backgroundSize};
  ${backgroundImage};
`;

export const Pinned = props => (
  <Timestamp {...props}>
    <EntypoPin style={{ marginTop: 2, marginRight: 5 }} /> Pinned post
  </Timestamp>
);

const borderWidth = 10;

// const VerticalBorder = styled.div`
//   position: absolute;
//   z-index: 100;
//   ${space};
//   width: 20px;
//   height: ${typeof document === 'undefined'
//     ? '100%'
//     : `${document.body.offsetHeight}px`};
//   opacity: 1;
//   top: 0;
//   bottom: 0;

//   ${notMobile(`
//     background: linear-gradient(to bottom, black, blue);
//   `)}
// `

export const Button = styled.button`
  padding: 1em 3em;
  border: 1px solid #e0e0e8;
  text-transform: uppercase;
  letter-spacing: 1px;
  font-weight: bold;
  background: transparent;
  width: 100%;
  font-size: 13px;
  transition: all 150ms ease;
  cursor: pointer;
  border-radius: 3px;

  ${p => p.expand && `width: 100%`};

  :disabled {
    opacity: 0.5;
    pointer-events: none;
  }

  &:hover {
    background: white;
    color: black;
    box-shadow: 0 5px 20px 0 rgb(0 0 0 / 5%);
  }

  ${p =>
    p.tag &&
    `
    color: black;
    border: none;
    background: #f4f4f7;
    border-radius: 4px;

    &:hover {
      background: black;
      color: white;
    }
  `}

  ${p =>
    p.primary &&
    `
    color: white;
    border: none;
    background: black;
    border-radius: 4px;

    &:hover {
      background: #333;
      color: white;
      border: none;
    }
  `}

  ${p =>
    p.selected &&
    `
    background: black;
    color: white;
  `}

  ${p =>
    p.small &&
    `
    font-size: 12px;
    padding: 1em 2em;
    `}
`;

const Border = styled.div`
  position: ${p => (p.abs ? 'absolute' : 'fixed')};
  z-index: 100;
  ${notMobile(`
    border: ${borderWidth}px solid rgba(0, 0, 0, 0.95);
  `)}
  ${space};
`;

export const GlobalBorder = () => (
  <>
    <Border abs style={{ top: 0, left: 0, right: 0 }} />
  </>
);

export const Bullet = styled(props => <span {...props}>&bull;</span>)`
  color: ${theme('bullet')};
  margin: 0 10px;
`;

export const Toolbar = styled.div`
  background: black;
  width: 80px;
`;

export const imageBackground = css`
  background: url(https://images.unsplash.com/photo-1494031021996-ac2eb738d846?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1603&q=50)
    black 0% 0% / 100% no-repeat;
  background-clip: text;
  -webkit-background-clip: text;
`;

export const Logo = styled.h2`
  ${LOGO_FONT};
  color: ${theme('logoColor', theme('color'))};
  font-size: 3.5rem;
  margin: 0;
  display: inline;
  letter-spacing: 0.75px;
  font-weight: lighter;
  ${transition};
  color: blue;
`;

export const Link = styled(GatsbyLink)`
  cursor: pointer;
  padding-bottom: 6px;
  border-bottom: 1px solid;

  svg {
    margin-left: 0.5em;
  }

  &:hover {
    border-bottom: 2px solid;
  }
`;

export const Tag = styled(GatsbyLink)`
  padding: 5px 12px;
  color: ${theme('tagColor')};
  background: ${theme('tagBackground')};
  background: var(--inline-code-background);
  font-family: 'Source Code Pro', Menlo, Monaco, Consolas, 'Courier New',
    Courier, monospace;
  font-weight: 500;
  font-size: 0.7rem;
  margin-right: 8px;
  margin-bottom: 10px;
  border-radius: 3px;
  letter-spacing: 0.25px;
  ${transition};

  &:hover {
    background: ${theme('tagHoverBackground')};
  }
`;

export const Container = styled.div`
  max-width: ${p => (p.narrow ? '800px' : '1320px')};
  margin: auto;
  padding: 0 1.5em;

  ${maxWidth};
  ${space};
  ${layout};
`;

export const ScrollContainer = styled(Flex).attrs({
  alignItems: 'start',
})`
  max-width: 100vw;
  overflow-x: scroll;
  white-space: nowrap;
  scroll-padding-left: 24px;
  scroll-behavior: smooth;
  scroll-snap-type: x mandatory;
  -webkit-overflow-scrolling: touch;
  -ms-overflow-style: none;
  scrollbar-width: none;

  &::-webkit-scrollbar {
    display: none;
  }
`;

export const ScrollContainerBlock = styled.div`
  width: 42px;
  margin-right: 6em;
  height: 100px;
  display: block;
`;

export const Content = styled.section`
  position: relative;
  z-index: 2;
  margin: 1em 3em 0;
  padding-top: 1em;
  ${space};
  ${transition};

  ${isMobile(`
    margin-left: 0;
    margin-right: 0;
    margin-bottom: 0;
    padding-top: 1em;
  `)}
`;

export const PageHeading = styled.h1`
  font-size: 2rem;
  font-weight: 400;
  letter-spacing: 1px;
  text-transform: uppercase;
  margin-top: 0.2em;
  margin-bottom: 0.15em;
  color: #333;
  ${textAlign};
  ${space};

  ${isMobile(`
    font-size: 2rem;
    letter-spacing: 0;
  `)}
`;

export const Carousel = styled(Flex)`
  list-style: none;
  white-space: nowrap;
  flex-wrap: nowrap;
  scroll-snap-type: x mandatory;
  scroll-behavior: smooth;
  padding: 0;
  overflow-x: scroll;
  -webkit-overflow-scrolling: touch;
  position: relative;
  will-change: transform;
  transition: all 800ms ease-in-out;
  ${space};
  ${layout};

  &::-webkit-scrollbar {
    display: none;
  }

  ${isMobile(`
    scroll-padding-left: 1em;
    padding-left: 1em;
  `)}
`;

export const CarouselItem = styled(Box)`
  display: flex;
  cursor: pointer;
  scroll-snap-align: start;
  scroll-snap-stop: always;
`;

export const Title = styled.h1`
  color: ${theme('titleColor')};
  font-size: 1.75rem;
  line-height: 1.45;
  font-weight: 800;
  margin-top: 0;
  margin-bottom: 12px;
  white-space: normal;
  ${fontSize};
  ${transition};
  ${space};

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
`;

export const PostTitle = styled(Title)`
  font-weight: 800;
  font-size: 3rem;
  line-height: 1.35;
  letter-spacing: 0.2px;
  color: ${theme('titleColor')};
  ${transition};
  ${space};
  ${textAlign};
  ${layout};

  ${isMobile(`
    margin-top: 1em;
  `)};
`;

export const ProductTitle = styled.h2`
  ${SERIF_FONT};
  margin: 0;
  padding: 0;
`;

export const Subtitle = styled.h6`
  text-transform: uppercase;
  letter-spacing: 0.5px;
  color: blue;
  margin-bottom: 5px;
`;

export const LineBreak = styled.div.attrs({
  className: 'LineBreak',
})`
  width: ${p => (p.width ? `${p.width}px` : '80px')};
  border: 2px solid ${theme('primary')};
  margin-bottom: 2em;
  ${space};
  transition: width 250ms ease-out;
`;

export const Timestamp = styled.p`
  font-weight: 500;
  font-size: 15px;
  color: ${theme('descriptionColor')};
  margin-bottom: 1.5em;
  ${fontSize};
`;

export const Photo = styled(Box)`
  position: relative;

  img {
    background: #f4f4f7;
  }
`;

export const PhotoInfo = styled.div`
  display: flex;
  justify-content: space-between;
  background: #212124;
  padding: 1em 1.5em;
  color: white;

  > * {
    margin: 0;
  }
`;

export const PhotoOverlay = styled.div`
  line-height: 2;
  font-size: 13px;
  opacity: 0;
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background: linear-gradient(to bottom, rgba(0, 0, 0, 0), #212124);
  height: 50%;
  color: white;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding: 2em;
  padding-bottom: 1em;
  transform: translateY(15px);
  transition: all 150ms ease;
  will-change: opacity, transform;

  * {
    margin: 0;
  }

  ${Photo}:hover & {
    opacity: 1;
    transform: translateY(0);
  }
`;

export const Post = styled.article`
  border-bottom: 1px solid ${theme('postBorderColor')};
  padding: 4em 0;
  background: white;

  ${isMobile(`
    padding-top: 2em;

    &:first-of-type {
      border-top: 1px solid #eaeaea;
    }
  `)}
`;

export const PostPreview = styled(Box)`
  background: white;
  display: flex;
  flex: 1;
  flex-direction: column;
  ${space};
  ${layout};
  ${border};

  ${isMobile(`
    padding-top: 2em;
  `)}
`;

export const Paragraph = styled.p`
  ${SERIF_FONT};
  font-size: 15px;
  line-height: 1.65;
  white-space: normal;
  color: ${theme('color')};
  ${space};
`;

export const Description = styled(Paragraph)`
  color: ${theme('descriptionColor')};
  font-size: 1.05rem;
  margin-bottom: 2em;
  ${space};
  ${transition};

  ${isMobile(`
    margin-bottom: 1em;
  `)}
`;

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
`;

export const Comments = styled.div`
  padding: 3em 0;
  border-top: 1px solid ${theme('hrColor')};
  border-bottom: 1px solid ${theme('hrColor')};
  margin-top: 3em;
`;

export const Footer = styled.footer`
  position: relative;
  text-align: center;
  color: #666;
  padding: 4em 0;

  ${notMobile(`
    display: flex;
    align-items: center;
    justify-content: space-between;

    &::before {
      content: '';
      position: absolute;
      z-index: -1;
      border: 2px solid black;
      left: 0;
      right: 0;
      top: 50%;
    }
  `)}

  a {
    color: black;
    font-size: 1.5em;
    margin-left: 1em;
    margin-top: 1px;
    vertical-align: -webkit-baseline-middle;

    ${isMobile(`
      margin-top: 1em;
    `)}

    &:first-of-type {
      margin-left: 0;
    }
  }

  strong {
    color: black;
  }
`;

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
    overflow-x: hidden;
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

  p {
    line-height: 1.65;
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

  h6 {
    margin: 0;
  }

  svg  {
    vertical-align: text-bottom;
    cursor: pointer;
  }

  blockquote {
    background: ${theme('blockquoteBackground')};
    padding: 0.5em 2em;
    margin: 0;
    margin-bottom: 2em;
    border-left: 2em solid ${theme('blockquoteBorder')};

    ${isMobile(`
      margin: 0 -1.5em 2em;
      padding: 0.5em 1em;
    `)}
  }
`;

export const Select = styled.select`
  width: 100%;
  padding: 1em;
  font-size: 14px;
  border: 1px solid;
`;

export const Drawer = styled.div`
  position: fixed;
  right: 0;
  top: 0;
  bottom: 0;
  max-width: 400px;
  width: 400px;
  background: white;
  height: 100vh;
  z-index: 1000;
  display: ${p => (p.open ? 'block' : 'none')};
  opacity: ${p => (p.open ? '1' : '0')};
  transform: translateX(${p => (p.open ? '0%' : '20%')});
  box-shadow: rgb(0 0 0 / 10%) -5px 0px 20px 0px;
  transition: all 150ms ease-out 0s;
  ${color};
`;

export const Overlay = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.1);
  z-index: 10;
`;

export const ErrorMessage = styled.small`
  color: red;
  font-weight: bold;
`;
