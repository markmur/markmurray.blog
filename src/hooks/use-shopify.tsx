import React, { useEffect, useMemo } from 'react';

import Shopify from '../utils/shopify';
import ShopifyClient from 'shopify-buy';

interface UseShopify {
  checkout: ShopifyClient.Checkout;
  cartCount: number;
  loading: boolean;

  // fns
  goToCheckout: () => void;
  addLineItem: (shopifyId: string) => Promise<void>;
  fetchCheckout: () => Promise<void>;
  removeLineItem: (id: string | number) => Promise<void>;
  incrementLineItem: (id: string | number) => Promise<void>;
  decrementLineItem: (id: string | number) => Promise<void>;
}

const defaultCheckout: Partial<UseShopify['checkout']> = {
  checkoutUrl: '',
  completedAt: '',
  id: '',
  lineItems: [],
  subtotalPrice: {
    amount: 0,
    currencyCode: 'EUR',
  },
  totalPrice: {
    amount: 0,
    currencyCode: 'EUR',
  },
  webUrl: '',
};

const noop = async () => undefined;

const defaultContext = {
  loading: false,
  checkout: defaultCheckout,
  cartCount: 0,
  goToCheckout: noop,
  addLineItem: noop,
  fetchCheckout: noop,
  removeLineItem: noop,
  incrementLineItem: noop,
  decrementLineItem: noop,
};

const ShopifyContext = React.createContext<UseShopify>(defaultContext);
const { Provider } = ShopifyContext;

const useShopify = () => {
  const context = React.useContext<UseShopify>(ShopifyContext);
  if (context === undefined) {
    throw new Error('ShopifyContext must be used within a ShopifyProvider');
  }
  return context;
};

interface Props {
  client: Shopify;
  children: React.ReactNode;
}

const ShopifyProvider = ({ client, children }: Props) => {
  const [loading, setLoading] = React.useState(false);
  const [checkout, setCheckout] =
    React.useState<ShopifyClient.Checkout>(defaultCheckout);

  const cartCount = checkout.lineItems.reduce(
    (state, item) => (state += item.quantity),
    0,
  );

  async function fetchCheckout(showLoading: boolean = true) {
    if (showLoading) setLoading(true);
    await client.init();

    // Note: the Shopify client returns the "checkout" type here but it is typed as Promise<ShopifyClient.Cart> in the lib - which is wrong
    try {
      const checkout = (await client.fetchCheckout()) as unknown;
      setCheckout(checkout as ShopifyClient.Checkout);
    } catch (error) {
      console.error('Something went wrong fetching checkout', error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchCheckout();
  }, []);

  function goToCheckout() {
    setLoading(true);
    if (typeof window !== 'undefined') window.location.href = checkout.webUrl;
  }

  async function addLineItem(shopifyId: string) {
    setLoading(true);
    const checkout = await client.addLineItem(shopifyId);
    setCheckout(checkout);
    setLoading(false);
  }

  async function removeLineItem(id: string | number) {
    setLoading(true);
    const checkout = await client.removeLineItem(id);
    setCheckout(checkout);
    setLoading(false);
  }

  function getQuantityById(id: string | number): number {
    return checkout.lineItems?.find((item) => item.id === id)?.quantity ?? 0;
  }

  async function incrementLineItem(id: string | number) {
    setLoading(true);
    const currentQuantity = getQuantityById(id);
    const checkout = await client.increment(String(id), currentQuantity);
    setCheckout(checkout);
    setLoading(false);
  }

  async function decrementLineItem(id: string | number) {
    setLoading(true);
    const currentQuantity = getQuantityById(id);
    const checkout = await client.decrement(String(id), currentQuantity);
    setCheckout(checkout);
    setLoading(false);
  }

  const value = useMemo(() => {
    return {
      checkout,
      cartCount,
      loading,
      goToCheckout,
      addLineItem,
      fetchCheckout,
      removeLineItem,
      incrementLineItem,
      decrementLineItem,
    };
  }, [
    checkout,
    cartCount,
    loading,
    goToCheckout,
    addLineItem,
    fetchCheckout,
    removeLineItem,
    incrementLineItem,
    decrementLineItem,
  ]);

  return <Provider value={value}>{children}</Provider>;
};

export { ShopifyProvider, useShopify };
