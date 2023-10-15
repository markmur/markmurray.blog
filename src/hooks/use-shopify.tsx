import React, { useMemo } from 'react';

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
  const [isOutdated, setIsOutdated] = React.useState<boolean>(false);

  const cartCount = checkout.lineItems.reduce(
    (state, item) => (state += item.quantity),
    0,
  );

  React.useEffect(() => {
    setLoading(true);
    client
      .init()
      .then(() => client.fetchCheckout())
      .then((checkout: unknown) => {
        // Note: the Shopify client returns the "checkout" type here but it is typed as Promise<ShopifyClient.Cart> in the lib - which is wrong
        return setCheckout(checkout as ShopifyClient.Checkout);
      })
      .then(() => setLoading(false))
      .catch((error) => {
        console.error('Something went wrong fetching checkout');
      });
  }, []);

  React.useEffect(() => {
    if (isOutdated) {
      setLoading(true);
      client.fetchCheckout().then((checkout: unknown) => {
        setCheckout(checkout as ShopifyClient.Checkout);
        setIsOutdated(false);
        setLoading(false);
      });
    }
  }, [isOutdated]);

  function goToCheckout() {
    setLoading(true);
    if (typeof window !== 'undefined') window.location.href = checkout.webUrl;
  }

  async function fetchCheckout() {
    setLoading(true);
    await client.fetchCheckout();
    setLoading(false);
  }

  async function addLineItem(shopifyId: string) {
    setLoading(true);
    await client.addLineItem(shopifyId);
    setIsOutdated(true);
    setLoading(false);
  }

  async function removeLineItem(id: string | number) {
    setLoading(true);
    await client.removeLineItem(id);
    setIsOutdated(true);
    setLoading(false);
  }

  function getQuantityById(id: string | number): number {
    return checkout.lineItems?.find((item) => item.id === id)?.quantity ?? 0;
  }

  async function incrementLineItem(id: string | number) {
    setLoading(true);
    const currentQuantity = getQuantityById(id);
    await client.increment(id, currentQuantity);
    setIsOutdated(true);
    setLoading(false);
  }

  async function decrementLineItem(id: string | number) {
    setLoading(true);
    const currentQuantity = getQuantityById(id);
    await client.decrement(id, currentQuantity);
    setIsOutdated(true);
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
