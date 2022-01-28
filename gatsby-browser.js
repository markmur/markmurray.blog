import React from 'react';

import { CartProvider } from 'use-shopping-cart';

// Global styles
import './src/styles.css';

// Prism code highlighting styles
import './src/themes/prism.css';

export const wrapPageElement = ({ element, props }) => {
  return (
    <CartProvider
      billingAddressCollection
      mode="client-only"
      successUrl="https://markmurray.co"
      cancelUrl="https://markmurray.co"
      currency="EUR"
      allowedCountries={['GB', 'IE', 'DE']}
      {...props}
    >
      {element}
    </CartProvider>
  );
};
