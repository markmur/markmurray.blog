import React from 'react';
import { Link as GatsbyLink } from 'gatsby';
import { EntypoPin } from 'react-entypo-icons';
import styled, { css, createGlobalStyle, keyframes } from 'styled-components';
import {
  backgroundImage,
  BackgroundImageProps,
  backgroundPosition,
  BackgroundPositionProps,
  backgroundSize,
  BackgroundSizeProps,
  border,
  BorderProps,
  boxShadow,
  BoxShadowProps,
  color,
  ColorProps,
  display,
  DisplayProps,
  flexbox,
  FlexboxProps,
  fontSize,
  FontSizeProps,
  fontWeight,
  FontWeightProps,
  height,
  HeightProps,
  layout,
  LayoutProps,
  maxWidth,
  MaxWidthProps,
  position,
  PositionProps,
  space,
  SpaceProps,
  system,
  textAlign,
  TextAlignProps,
  width,
  WidthProps,
} from 'styled-system';

const aspectRatio = system({
  aspectRatio: {
    property: 'aspectRatio',
    transform: (val) => `${val}`,
  },
});

const cursor = system({
  cursor: {
    property: 'cursor',
  },
});

interface CustomDefinitions {
  cursor?: string;
  aspectRatio?: string | number | number[];
}

const defaults = css`
  ${position};
  ${border};
  ${boxShadow};
  ${flexbox};
  ${space};
  ${layout};
  ${display};
  ${color};
  ${height};
  ${fontSize};
  ${fontWeight};
  ${maxWidth};
  ${width};
  ${textAlign};
  ${backgroundPosition};
  ${backgroundSize};
  ${backgroundImage};
  ${(p: any) => (p.aspectRatio ? aspectRatio : '')};
  ${cursor};
`;

export type Defaults = FlexboxProps &
  BackgroundImageProps &
  BackgroundPositionProps &
  BackgroundSizeProps &
  BorderProps &
  BoxShadowProps &
  ColorProps &
  DisplayProps &
  FontSizeProps &
  FontWeightProps &
  HeightProps &
  PositionProps &
  LayoutProps &
  MaxWidthProps &
  SpaceProps &
  TextAlignProps &
  WidthProps &
  CustomDefinitions;

export const Text = styled('p')<Defaults>`
  ${defaults};
`;

export const Flex = styled('div')<Defaults>`
  display: flex;
  flex-wrap: wrap;
  ${defaults};
`;

export const Box = styled('div')<Defaults>`
  ${defaults};
`;

export const CollectionCarouselBox = styled(Box)<Defaults>`
  ${defaults};

  @media screen and (min-width: 1320px) {
    margin-left: calc(50vw - 668px);
  }
`;

// const LOGO_FONT = 'PT Serif, serif'
const font = (family) => `font-family: ${family}`;

const MAIN_FONT = font(
  "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif",
);
const LOGO_FONT = font('Reenie Beanie');
const SERIF_FONT = font('Merriweather, serif');

const theme = (key: string, fallback?: any) => (props) =>
  props.theme[key] || fallback || 'initial';

export const isMobile = (content) => `
  @media screen and (max-width: 40em) {
    ${content}
  }
`;

export const isTablet = (content) => `
  @media screen and (min-width: 52em) {
    ${content};
  }
`;

export const isDesktop = (content) => `
  @media screen and (min-width: 60em) {
    ${content};
  }
`;

export const notMobile = (content) => `
  @media screen and (min-width: 41em) {
    ${content}
  }
`;

export const HideOnMobile = ({ children }) => (
  <Box display={['none', 'block']}>{children}</Box>
);

export const HideOnDesktop = ({ children }) => (
  <Box display={['block', 'none', 'none']}>{children}</Box>
);

const transition = css`
  transition: color 150ms, background 150ms;
  will-change: color, background;
`;

export const CartCount = styled(Box)<Defaults>`
  ${defaults};
  font-size: 9px;
  font-weight: bold;
  color: white;
  background: blue;
  border-radius: 50%;
  height: 16px;
  width: 16px;
  text-align: center;
  line-height: 16px;
  position: relative;
  display: inline-block;
  top: -50%;
  left: -25%;
`;

export const Nav = styled('nav')<Defaults>`
  ${defaults};
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

export const Pinned = (props) => (
  <Timestamp {...props}>
    <EntypoPin style={{ marginTop: 2, marginRight: 5 }} /> Pinned post
  </Timestamp>
);

const borderWidth = 10;

// const VerticalBorder = styled("div")<Defaults>`
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

interface ButtonProps {
  expand?: boolean;
  tag?: boolean;
  primary?: boolean;
  secondary?: boolean;
  selected?: boolean;
  small?: boolean;
  increment?: boolean;
}

export const Button = styled('button').attrs({
  // @ts-ignore
  className: (p: any) => (p.selected ? 'active' : ''),
})<Defaults & ButtonProps>`
  ${defaults};
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
  white-space: nowrap;
  text-align: center;

  ${(p) => p.expand && `width: 100%`};

  :disabled {
    opacity: 0.9;
    pointer-events: none;
  }

  &:hover {
    background: white;
    color: black;
  }

  ${(p) =>
    p.tag &&
    `
    font-size: 13px;
    color: rgba(156,163,175,1);
    border: none;
    border-radius: 30px;
    min-width: 160px;

    &.active {
      background: black;
      color: white;
    }

    &:hover:not(.active) {
      color: black
    }
  `}

  ${(p) =>
    p.primary &&
    `
    color: white;
    border: none;
    background: black;
    border-radius: 4px;
    box-shadow: 0 12px 20px 0 rgba(0,0,0,0.15);

    :disabled {
      opacity: 0.75;
      background: #aaa;
    }

    &:hover {
      background: #222;
      color: white;
      border: none;
      box-shadow: 0 12px 20px 0 rgba(0,0,0,0.25);
    }
  `}

  ${(p) =>
    p.selected &&
    `
    background: rgba(243,244,246,1);
    color: black;

    &:hover {
      background: rgba(243,244,246,1);
    }
  `}

  ${(p) =>
    p.small &&
    `
    font-size: 12px;
    padding: 1em 2em;
    `}

  ${(p) =>
    p.increment &&
    `
    font-size: 16px;
    font-weight: normal;
    padding: 4px 14px;
    background: white;
    border: 0;
    margin: 0;
    background: white;
    opacity: 0.6;


    &:hover {
      opacity: 1;
    }
  `}
`;

const Border = styled(Box)<Defaults & { abs?: boolean }>`
  position: ${(p) => (p.abs ? 'absolute' : 'fixed')};
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

export const Bullet = styled((props) => <span {...props}>&bull;</span>)`
  color: ${theme('bullet')};
  margin: 0 10px;
`;

export const Toolbar = styled(Box)<Defaults>`
  ${defaults};
  background: black;
  width: 80px;
`;

export const imageBackground = css`
  background: url(https://images.unsplash.com/photo-1494031021996-ac2eb738d846?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1603&q=50)
    black 0% 0% / 100% no-repeat;
  background-clip: text;
  -webkit-background-clip: text;
`;

export const Logo = styled(Text).attrs({ as: 'h2' })<Defaults>`
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

export const Link = styled(GatsbyLink)<Defaults>`
  ${defaults};
  cursor: pointer;
  font-weight: normal;
  // padding-bottom: 6px;
  // border-bottom: 1px solid;

  svg {
    margin-left: 0.5em;
  }

  // &:hover {
  //   border-bottom: 2px solid;
  // }
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
  cursor: pointer;
  ${transition};

  &:hover {
    background: ${theme('tagHoverBackground')};
  }
`;

export const Container = styled(Box)<Defaults & { narrow?: boolean }>`
  ${defaults};
  margin: auto;
  padding: 0 1.5em;

  @media screen and (min-width: 40em) {
    max-width: 100%;
  }

  @media screen and (min-width: 64em) {
    max-width: ${(p) => (p.narrow ? '800px' : '1320px')};
  }
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

export const ScrollContainerBlock = styled(Box)<Defaults>`
  width: 42px;
  margin-right: 6em;
  height: 100px;
  display: block;
`;

export const Content = styled('section')<Defaults>`
  position: relative;
  z-index: 2;
  margin: 1em 3em 0;
  padding-top: 1em;
  ${transition};

  ${isMobile(`
    margin-left: 0;
    margin-right: 0;
    margin-bottom: 0;
    padding-top: 1em;
  `)}
`;

export const PageHeading = styled(Text).attrs({ as: 'h1' })<Defaults>`
  font-size: 2rem;
  font-weight: 400;
  letter-spacing: 1px;
  text-transform: uppercase;
  margin-top: 0.2em;
  margin-bottom: 0.15em;
  color: #333;

  ${isMobile(`
    font-size: 2rem;
    letter-spacing: 0;
  `)}
`;

export const Carousel = styled(Flex)<Defaults>`
  ${defaults};
  list-style: none;
  white-space: nowrap;
  flex-wrap: nowrap;
  scroll-snap-type: x mandatory;
  scroll-behavior: smooth;
  padding: 0;
  overflow-x: scroll;
  max-width: 100vw;
  -webkit-overflow-scrolling: touch;
  position: relative;
  will-change: transform;
  transition: all 800ms ease-in-out;

  &::-webkit-scrollbar {
    display: none;
  }

  @media screen and (max-width: 52em) {
    scroll-padding-left: 1em;
    padding-left: 1em;
  }
`;

export const CarouselItem = styled(Box)<Defaults>`
  display: flex;
  cursor: pointer;
  scroll-snap-align: start;
  scroll-snap-stop: always;
`;

export const Title = styled.h1<Defaults>`
  color: ${theme('titleColor')};
  font-size: 1.75rem;
  line-height: 1.45;
  font-weight: 800;
  margin-top: 0;
  margin-bottom: 12px;
  white-space: normal;
  ${transition};
  ${defaults};

  ${isMobile(`
    font-weight: 800;
    font-size: 1.65rem;
  `)}

  strong {
    z-index: 2;
    position: relative;
    font-weight: 800;
    display: inline-block;

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

export const PostTitle = styled(Title)<Defaults>`
  ${defaults};
  font-weight: 800;
  font-size: 3rem;
  line-height: 1.35;
  letter-spacing: 0.2px;
  color: ${theme('titleColor')};
  ${transition};

  ${isMobile(`
    margin-top: 1em;
  `)};
`;

export const ProductTitle = styled(Text).attrs({ as: 'h2' })<Defaults>`
  ${SERIF_FONT};
  margin: 0;
  padding: 0;
`;

export const Subtitle = styled(Text).attrs({ as: 'h6' })<Defaults>`
  text-transform: uppercase;
  letter-spacing: 0.5px;
  color: blue;
  margin-bottom: 5px;
`;

export const LineBreak = styled(Box)<Defaults>`
  width: ${(p) => (p.width ? `${p.width}px` : '80px')};
  border: 2px solid ${theme('primary')};
  transition: width 250ms ease-out;
`;

export const Timestamp = styled(Text)`
  font-weight: 500;
  font-size: 15px;
  color: ${theme('descriptionColor')};
  margin-bottom: 1.5em;
`;

export const Photo = styled(Box)`
  position: relative;

  img {
    background: #f4f4f7;
  }
`;

export const PhotoInfo = styled(Box)<Defaults>`
  ${defaults};
  display: flex;
  justify-content: space-between;
  background: #212124;
  padding: 1em 1.5em;
  color: white;

  > * {
    margin: 0;
  }
`;

export const PhotoOverlay = styled(Box)<Defaults>`
  ${defaults};
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

export const Post = styled('article')<Defaults>`
  ${defaults};
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

  ${isMobile(`
    padding-top: 2em;
  `)}
`;

export const Paragraph = styled(Text)`
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

export const BlogPost = styled('article')<Defaults>`
  ${defaults};
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

  ul,
  ol {
    padding-left: 2em;
    margin-bottom: 2em;
    line-height: 2;
  }
`;

export const Comments = styled(Box)<Defaults>`
  padding: 3em 0;
  border-top: 1px solid ${theme('hrColor')};
  border-bottom: 1px solid ${theme('hrColor')};
  margin-top: 3em;
`;

export const Footer = styled('footer')<Defaults>`
  ${defaults};
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

export const Select = styled('select')<Defaults>`
  ${defaults};
  width: 100%;
  padding: 1em;
  font-size: 14px;
  border: 1px solid;
`;

const slideInKeyframes = keyframes`
 from { transform: translateX(200px) }
 to { transform: translate(0) }
`;

const slideOutKeyframes = keyframes`
 from { transform: translate(0) }
 to { transform: translateX(200px) }
`;

const fadeInKeyframes = keyframes`
  from { opacity: 0 }
  to { opacity: 1 }
`;

const fadeOutKeyframes = keyframes`
  from { opacity: 1 }
  to { opacity: 0 }
`;

const animations = (...animations) => css`
  animation: ${animations.join(', ')};
`;

export const Drawer = styled(Box)<{
  open?: boolean;
}>`
  ${defaults};
  position: fixed;
  right: 0;
  top: 0;
  bottom: 0;
  max-width: 90%;
  width: 500px;
  height: 100vh;
  overflow-y: auto;
  padding-bottom: 5em;
  z-index: 1000;
  // display: ${(p) => (p.open ? 'block' : 'none')};
  // opacity: ${(p) => (p.open ? '1' : '0')};
  transform: translateX(${(p) => (p.open ? '0%' : '20%')});
  box-shadow: rgb(0 0 0 / 10%) -5px 0px 20px 0px;
  transition: all 150ms ease-out 0s;
  animation: ${slideInKeyframes} 200ms ease-out;

  a {
    transition: all 200ms ease;
    opacity: 0.8;
  }

  a[aria-current='page'] {
    opacity: 1;
    font-weight: bold;
  }

  a:hover {
    padding-left: 0.25em;
    opacity: 1;
  }

  &.exit {
    opacity: 1;
  }
  &.exit-active {
    opacity: 0;
    transition: opacity 250ms, transform 250ms;
  }
`;

export const Overlay = styled(Box)`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background: rgba(63, 63, 106, 0.42);
  z-index: 999;
  // transition: all 10s ease;
  animation: ${fadeInKeyframes} 200ms ease;

  &.close {
    animation: ${fadeOutKeyframes};
  }
`;

export const ErrorMessage = styled(Text).attrs({ as: 'small' })<Defaults>`
  ${defaults};
  display: block;
  color: red;
  font-weight: bold;
`;

export const Image = styled.img<Defaults>`
  ${defaults};
  height: auto;
  max-width: 100%;
`;

function getUnitValue(value: number | string): string {
  if (typeof value === 'number') {
    return `${value}px`;
  }

  if (typeof value === 'string' && !/(%)|(px)|(em)/gi.test(value)) {
    return `${value}px`;
  }

  return value;
}

export const BackgroundImage = styled.div<
  Defaults & { width: number; height: number; src: string }
>`
  ${defaults};
  // width: ${(p) => getUnitValue(p.width)};
  // height: ${(p) => getUnitValue(p.height)};
  background-image: url(${(p) => p.src});
  background-size: cover;
  background-position: center center;
`;

/** Max sure this one is last */
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
    ${MAIN_FONT};
    // font-family: 'Inter', sans-serif;
    margin: 0;
    padding: 0;
    font-size: 100%;
    letter-spacing: 0.2px;
    color: ${theme('color')};
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
    border-bottom: 1px solid var(--primary);
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
