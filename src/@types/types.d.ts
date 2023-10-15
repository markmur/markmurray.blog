declare module '*.css';

declare interface Price {
  amount: number;
  currencyCode: string;
}

declare interface Metafield {
  readonly key: string;
  readonly value: string;
}

// declare global {
//   // eslint-disable-next-line @typescript-eslint/no-namespace
//   namespace JSX {
//     interface IntrinsicElements {
//       'shop-pay-button': {
//         variants: string;
//         'store-url': string;
//       };
//     }
//   }
// }
