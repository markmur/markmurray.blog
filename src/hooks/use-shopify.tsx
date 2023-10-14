import React from 'react';
import ShopifyClient from 'shopify-buy';
import Shopify from '../utils/shopify';

type Cart = ShopifyClient.Cart & {
  webUrl: string;
  currencyCode: string;
  shippingPrice: string;
  shippingType: string;
  completedAt: string;
};

interface UseShopify {
  // state
  checkout: Cart;
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

const defaultCart: Cart = {
  checkoutUrl: '',
  completedAt: '',
  id: '',
  lineItems: [],
  subtotalPrice: '0.00',
  webUrl: '',
};

const noop = async () => undefined;

const defaultContext = {
  loading: false,
  checkout: defaultCart,
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
  const [checkout, setCheckout] = React.useState<Cart>(defaultCart);
  const [isOutdated, setIsOutdated] = React.useState<boolean>(false);

  console.log(checkout);

  const cartCount = checkout.lineItems.reduce(
    (state, item) => (state += item.quantity),
    0,
  );

  React.useEffect(() => {
    setLoading(true);
    client
      .init()
      .then(() => client.fetchCheckout())
      .then((checkout) => setCheckout(checkout as Cart))
      .then(() => setLoading(false))
      .catch((error) => {
        console.error('Something went wrong fetching checkout');
      });
  }, []);

  React.useEffect(() => {
    if (isOutdated) {
      setLoading(true);
      client.fetchCheckout().then((checkout) => {
        setCheckout(checkout as Cart);
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
    return checkout.lineItems?.find((item) => item.id === id)?.quantity;
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

  return (
    <Provider
      value={{
        checkout,
        cartCount,
        loading,
        goToCheckout,
        addLineItem,
        fetchCheckout,
        removeLineItem,
        incrementLineItem,
        decrementLineItem,
      }}
    >
      {children}
    </Provider>
  );
};

export { ShopifyProvider, useShopify };
