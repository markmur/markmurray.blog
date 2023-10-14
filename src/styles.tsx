import React from 'react';
import { Link as GatsbyLink } from 'gatsby';
import { EntypoPin } from 'react-entypo-icons';
import { space } from 'styled-system';
import styled, { css, createGlobalStyle, keyframes } from 'styled-components';
import {
  slideInKeyframes,
  fadeInKeyframes,
  fadeUpInKeyframes,
  fadeOutKeyframes,
} from './styles/keyframes';
import { MAIN_FONT, LOGO_FONT, SERIF_FONT } from './styles/constants';
import { defaults, Defaults, scrollBar } from './styles/system';
import { isMobile, notMobile } from './styles/devices';
import { GatsbyImage } from 'gatsby-plugin-image';

export const Text = styled('p')<Defaults>`
  ${defaults};
`;

export const Strike = styled(Text)<Defaults>`
  ${defaults};
  text-decoration: line-through;
  margin: 0;
`;

export const Flex = styled('div')<Defaults>`
  display: flex;
  flex-wrap: wrap;
  ${defaults};
  ${scrollBar};
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

const theme = (key: string, fallback?: any) => (props) =>
  props.theme[key] || fallback || 'initial';

export const HideOnMobile = ({ children, ...props }) => (
  <Box display={['none', 'block', 'block']} {...props}>
    {children}
  </Box>
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

export const Avatar = styled(GatsbyImage)<Defaults>`
  ${defaults};
  aspect-ratio: 1;
  max-width: 40px;
  max-height: 40px;
  border-radius: 50%;
  margin-right: 15px;
  object-fit: cover;
  border: 2px solid white;
  box-shadow: 0 0 0 2px blue;
`;

export const Nav = styled('nav')<Defaults>`
  ${defaults};
  padding: 2.25em 0 1.35em;

  ${isMobile(`
    padding: 1.25em 0;
    position: fixed;
    top: 0;
    width: 100%;
    z-index: 10000;
    background: rgba(245, 245, 247, 0.75);
    border-bottom: 1px solid #eaeaea;
    backdrop-filter: blur(10px) saturate(150%);
  `)}

  &.active {
    color: white;
    background: transparent;
    border-bottom: none;
  }
`;

export const Pinned = (props) => (
  <Timestamp {...props}>
    <EntypoPin style={{ marginTop: 2, marginRight: 5 }} /> Pinned post
  </Timestamp>
);

const borderWidth = 10;

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
    padding: 4px 10px;
    background: white;
    border: 0;
    margin: 0;
    background: #f4f4f7;


    &:hover {
      background: white;
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

export const Logo = styled(Text).attrs({ as: 'h2' })<
  { active: boolean } & Defaults
>`
  ${LOGO_FONT};
  color: ${theme('logoColor', theme('color'))};
  font-size: 3.5rem;
  margin: 0;
  display: inline;
  letter-spacing: 0.75px;
  font-weight: lighter;
  ${transition};
  color: ${(p) => (p.active ? 'white' : 'blue')};
`;

export const Link = styled(GatsbyLink)<Defaults>`
  ${defaults};
  cursor: pointer;
  font-weight: normal;
  color: #686882;

  &:hover,
  &.active {
    color: black;
  }

  &.active {
    font-weight: bold;
    position: relative;

    &::after {
      content: ' ';
      position: absolute;
      width: 5px;
      height: 5px;
      background: blue;
      border-radius: 50%;
      left: 50%;
      bottom: -15px;
      transform: translateX(-2.5px);
    }
  }

  svg {
    margin-left: 0.5em;
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
  cursor: pointer;
  ${transition};

  &:hover {
    background: ${theme('tagHoverBackground')};
  }
`;

export const Container = styled(Box)<Defaults & { narrow?: boolean }>`
  margin: auto;
  padding: 0 1em;
  ${defaults};

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

export const Main = styled('main')<Defaults>`
  ${defaults};

  ${isMobile(`
    padding-top: 6em;
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

export const Carousel = styled(Flex)<Defaults & { scrollPadding?: boolean }>`
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

  ${(p) =>
    p.scrollPadding === false
      ? ``
      : `@media screen and (max-width: 52em) {
      scroll-padding-left: 1em;
      padding-left: 1em;
    }`}
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
      background: #dd85ff;
      opacity: 0.2;
      z-index: -1;
      transform: rotate(-1deg);
    }
  }
`;

export const PostTitle = styled(Title)<Defaults>`
  ${defaults};
  font-weight: 800;
  font-size: 3.9rem;
  line-height: 1.35;
  letter-spacing: 0.2px;
  color: ${theme('titleColor')};
  ${transition};

  ${isMobile(`
    font-size: 3rem;
  `)};
`;

export const ProductTitle = styled(Text).attrs({ as: 'h2' })<Defaults>`
  ${SERIF_FONT};
  font-size: 2.5rem;
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
  font-size: 0.95rem;
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

export const Drawer = styled(Box)<
  {
    open?: boolean;
    blur?: boolean;
  } & Defaults
>`
  position: fixed;
  right: 0;
  top: 0;
  bottom: 0;
  max-width: 100%;
  width: ${(p) => p.width ?? '500px'};
  height: 100vh;
  overflow-y: auto;
  padding-bottom: 5em;
  z-index: 1000;
  transform: translateX(${(p) => (p.open ? '0%' : '10%')});
  box-shadow: rgb(0 0 0 / 10%) -5px 0px 20px 0px;
  transition: all 150ms ease-out 0s;
  animation: ${slideInKeyframes} 200ms ease-out;
  ${(p) => p.blur && `backdrop-filter: blur(10px) saturate(150%)`};
  ${defaults};

  .link {
    display: block;
    position: relative;
    transition: all 200ms ease;
    opacity: 0;
    animation: ${fadeUpInKeyframes} 700ms ease-out forwards;

    &:nth-of-type(1) {
      animation-delay: 0s;
    }
    &:nth-of-type(2) {
      animation-delay: 100ms;
    }
    &:nth-of-type(3) {
      animation-delay: 200ms;
    }
    &:nth-of-type(4) {
      animation-delay: 300ms;
    }
    &:nth-of-type(5) {
      animation-delay: 400ms;
    }

    &:hover {
      text-indent: 0.25em;
      opacity: 1;
    }
  }

  a[aria-current='page'] {
    opacity: 1;
    font-weight: bold;
    color: blue;
  }

  &.exit {
    opacity: 1;
  }
  &.exit-active {
    opacity: 0;
    transition: opacity 250ms, transform 250ms;
  }
`;

const rotate = keyframes`
0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
`;

export const Loader = styled.div<Defaults>`
  ${defaults};
  display: inline-block;
  position: relative;
  width: 80px;
  height: 80px;

  div {
    box-sizing: border-box;
    display: block;
    position: absolute;
    width: 44px;
    height: 44px;
    margin: 8px;
    border: 4px solid;
    border-radius: 50%;
    animation: ${rotate} 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
    border-color: black transparent transparent transparent;
  }
  div:nth-child(1) {
    animation-delay: -0.45s;
  }
  div:nth-child(2) {
    animation-delay: -0.3s;
  }
  div:nth-child(3) {
    animation-delay: -0.15s;
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

export const Sticker = styled.div<Defaults>`
  ${defaults};
  width: 40px;
  height: 40px;
  background: white;
  border-radius: 50%;
  color: black;
  font-weight: bold;
  text-transform: uppercase;
  text-align: center;
  line-height: 40px;
  font-size: 12px;
  box-shadow: 0 0 15px 0 rgba(0, 0, 0, 0.2);
`;

export const Banner = styled.div<Defaults>`
  ${defaults};
  background: black;
  color: white;
  font-weight: bold;
  text-align: center;
  font-size: 11px;
  padding: 1em;
`;

export const DiscountCode = styled.div<Defaults>`
  ${defaults};
  border: 1px solid #f2d8a9;
  padding: 5px 8px;
  border-radius: 4px;
  font-size: 12px;
  color: #735827;
  font-weight: bold;
  background-color: #fff6e1;

  &.success {
    border: 1px solid #518c53;
    color: #357d37;
    background-color: #ebfaf0;
  }
`;

export const LineClamp = styled.div<Defaults & { value?: number }>`
  ${defaults};
  display: -webkit-box;
  line-clamp: ${(p) => p.value || 2};
  -webkit-line-clamp: ${(p) => p.value || 2};
  overflow: hidden;
  text-overflow: ellipsis;
  -webkit-box-orient: vertical;
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

export const LinkListContainer = styled(Box)<Defaults>`
  ${defaults};
  position: absolute;
  top: -1.5em;
  left: -1.5em;
  background-color: rgba(0, 0, 0, 0.9);
  color: white;
  padding: 1.5em;
  z-index: 100;
  border-radius: 6px;
  box-shadow: 0 12px 20px 0 rgb(44 62 80 / 50%);
  animation: ${fadeInKeyframes} 220ms ease-out;
`;

export const LinkList = styled.ul<Defaults>`
  ${defaults};
  list-style-type: none;

  a {
    border: none;
    color: white;
    text-decoration: none;
    padding: 4px 0;
    display: block;

    &:hover {
      border: none;
      font-weight: bold;
      color: white;
    }
  }
`;

export const BackgroundImage = styled.div<
  Defaults & { maxHeight: number | string; src: string }
>`
  ${defaults};

  background-image: url(${(p) => p.src});
  background-size: cover;
  background-position: top left;
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
