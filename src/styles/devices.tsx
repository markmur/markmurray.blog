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
