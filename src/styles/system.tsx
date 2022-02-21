import { css } from 'styled-components';
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

export const aspectRatio = system({
  aspectRatio: {
    property: 'aspectRatio',
    transform: (val) => `${val}`,
  },
});

export const cursor = system({
  cursor: {
    property: 'cursor',
  },
});

export const textDecoration = system({
  cursor: {
    property: 'textDecoration',
  },
});

export const lineClamp = system({
  lineClamp: {
    property: 'WebkitLineClamp',
  },
});

interface CustomDefinitions {
  cursor?: string;
  aspectRatio?: string | number | number[];
  scrollBar?: boolean | boolean[];
  textDecoration?: string;
  lineClamp?: number;
}

export const defaults = css`
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
  ${textDecoration};
  ${(p: any) => (p.aspectRatio ? aspectRatio : '')};
  ${cursor};
  ${lineClamp};
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

export const scrollBar = css`
  ${(p: any) =>
    p.scrollBar === false ? `&::-webkit-scrollbar { display: none; } ` : ''};
`;
