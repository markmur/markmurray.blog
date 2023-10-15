import ShopifyClient from 'shopify-buy';
import { get } from 'lodash';

interface LineItem {
  id: string;
  quantity: number;
}

interface Cart {
  subtotalPrice: string;
  totalPrice: string;
  shippingPrice: string;
  shippingType: string;
  lineItems: Record<string, LineItem>;
  currencyCode: string;
  taxesIncluded: boolean;
  totalTax: string;
}

class Shopify {
  client: ShopifyClient;

  checkoutId: string;

  checkout: ShopifyClient.Checkout;

  defaultCart: Cart;

  cart: Cart;

  listeners: ((value: boolean) => void)[] = [];

  checkoutUrl: string;

  checkoutDebounceTiming: number = 2500;

  constructor() {
    if (!process.env.GATSBY_SHOPIFY_STORE_URL) {
      throw new Error('`SHOPIFY_STORE_URL` is missing');
    }

    if (!process.env.GATSBY_STOREFRONT_ACCESS_TOKEN) {
      throw new Error('`STOREFRONT_ACCESS_TOKEN` is missing');
    }

    this.client = ShopifyClient.buildClient({
      domain: process.env.GATSBY_SHOPIFY_STORE_URL,
      storefrontAccessToken: process.env.GATSBY_STOREFRONT_ACCESS_TOKEN,
      apiVersion: '2020-01',
    });

    this.checkoutId = this.getCheckoutIdFromLocalStorage();
  }

  async init() {
    if (this.checkoutId) {
      return this.checkoutId;
    }

    return await this.createCheckout();
  }

  private getCheckoutIdFromLocalStorage(): string | undefined {
    try {
      return localStorage.getItem('shopify:checkoutId');
    } catch (error) {
      return undefined;
    }
  }

  private insertToLocalStorage(key: string, value: any) {
    try {
      localStorage.setItem(
        key,
        typeof value === 'string' ? value : JSON.stringify(value),
      );
    } catch (error) {
      console.error(error);
    }
  }

  private parseShopifyId(shopifyId: string) {
    return shopifyId.slice(shopifyId.lastIndexOf('/') + 1);
  }

  private getShopifyId(variant: { id: string | number; shopifyId?: string }) {
    if (variant.shopifyId) {
      return this.parseShopifyId(variant.shopifyId);
    }

    try {
      const url = new URL(atob(String(variant.id)));
      return url.pathname.slice(url.pathname.lastIndexOf('/') + 1);
    } catch (error) {
      console.error(
        'shopify.#getShopifyId :: could not find lineItem ID',
        error,
      );
    }
  }

  async createCheckout() {
    try {
      const checkout = await this.client.checkout.create();
      this.checkout = checkout;
      this.checkoutId = checkout.id;
      this.checkoutUrl = checkout.webUrl;
      this.insertToLocalStorage('shopify:checkoutId', this.checkoutId);
      return checkout;
    } catch (error) {
      console.error(error);
    }
  }

  async fetchCheckout(): Promise<ShopifyClient.Checkout> {
    try {
      const checkout = await this.client.checkout.fetch(
        String(this.checkoutId),
      );
      this.checkout = checkout;
      return this.checkout;
    } catch (error) {
      this.checkoutId = undefined;
      localStorage.removeItem('shopify:checkoutId');
      this.init();
    }
  }

  async increment(
    id: string,
    currentQuantity: number,
  ): Promise<ShopifyClient.Checkout> {
    try {
      const checkout = await this.client.checkout.updateLineItems(
        String(this.checkoutId),
        [
          {
            id,
            quantity: currentQuantity + 1,
          },
        ],
      );
      this.checkout = checkout;
      return this.checkout;
    } catch (error) {
      console.error(error);
    }
  }

  async decrement(
    id: string,
    currentQuantity: number,
  ): Promise<ShopifyClient.Checkout> {
    try {
      const checkout = await this.client.checkout.updateLineItems(
        this.checkoutId,
        [
          {
            id,
            quantity: currentQuantity - 1,
          },
        ],
      );
      this.checkout = checkout;
      return this.checkout;
    } catch (error) {
      console.error(error);
    }
  }

  async addLineItem(shopifyId: string): Promise<ShopifyClient.Checkout> {
    try {
      const checkout = await this.client.checkout.addLineItems(
        this.checkoutId,
        [{ variantId: shopifyId, quantity: 1 }],
      );
      this.checkout = checkout;
      return this.checkout;
    } catch (error) {
      console.error(error);
    } finally {
      return this.checkout;
    }
  }

  async removeLineItem(id: string | number): Promise<ShopifyClient.Checkout> {
    try {
      const checkout = await this.client.checkout.removeLineItems(
        this.checkoutId,
        [String(id)],
      );
      this.checkout = checkout;
      return this.checkout;
    } catch (error) {
      console.error(error);
    } finally {
      return this.checkout;
    }
  }
}

export default Shopify;
