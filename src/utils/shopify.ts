import { get } from "lodash"
import ShopifyClient from "shopify-buy"

interface LineItem {
    id: string
    quantity: number
}

interface Cart {
    subtotalPrice: string
    totalPrice: string
    shippingPrice: string
    shippingType: string
    lineItems: Record<string, LineItem>
    currencyCode: string
    taxesIncluded: boolean
    totalTax: string
}

class Shopify {
    client: ShopifyClient.Client

    checkoutId: string | number

    defaultCart: Cart

    cart: Cart

    listeners: ((value: boolean) => void)[] = []

    checkoutUrl: string

    checkoutDebounceTiming: number = 2500

    constructor() {
        if (!process.env.GATSBY_SHOPIFY_STORE_URL) {
            throw new Error("`SHOPIFY_STORE_URL` is missing")
        }

        if (!process.env.GATSBY_STOREFRONT_ACCESS_TOKEN) {
            throw new Error("`STOREFRONT_ACCESS_TOKEN` is missing")
        }

        this.client = ShopifyClient.buildClient({
            domain: process.env.GATSBY_SHOPIFY_STORE_URL,
            storefrontAccessToken: process.env.GATSBY_STOREFRONT_ACCESS_TOKEN
        });

        this.checkoutId = this.getCheckoutIdFromLocalStorage()
    }

    async init() {
        if (this.checkoutId) {
            return this.checkoutId
        }

        return await this.createCheckout()
    }

    private getCheckoutIdFromLocalStorage(): string | undefined {
        try {
            return localStorage.getItem("shopify:checkoutId")
        } catch (error) {
            return undefined
        }
    }

    private insertToLocalStorage(key: string, value: any) {
        try {
            localStorage.setItem(key, typeof value === "string" ? value : JSON.stringify(value))
        } catch (error) {
            console.error(error)
        }
    }

    private parseShopifyId(shopifyId: string) {
        return shopifyId.slice(shopifyId.lastIndexOf("/") + 1)
    }

    private getShopifyId(variant: { id: string | number; shopifyId?: string }) {
        if (variant.shopifyId) {
            return this.parseShopifyId(variant.shopifyId)
        }

        try {
            const url = new URL(atob(String(variant.id)))
            return url.pathname.slice(url.pathname.lastIndexOf("/") + 1)
        } catch (error) {
            console.error("shopify.#getShopifyId :: could not find lineItem ID", error)
        }
    }

    async createCheckout() {
        try {
            const checkout = await this.client.checkout.create()
            this.checkoutId = checkout.id
            this.checkoutUrl = checkout.webUrl
            this.insertToLocalStorage("shopify:checkoutId", this.checkoutId)
            return checkout
        } catch (error) {
            console.error(error)
        }
    }

    async fetchCheckout(): Promise<ShopifyClient.Cart> {
        try {
            return await this.client.checkout.fetch(String(this.checkoutId))
        } catch (error) {
            this.checkoutId = undefined
            localStorage.removeItem("shopify:checkoutId")
            this.init()
        }
    }

    async increment(id: string | number, currentQuantity: number) {
        try {
            const checkout = await this.client.checkout.updateLineItems(this.checkoutId, [{
                id,
                quantity: currentQuantity + 1
            }])
            return checkout
        } catch (error) {
            console.error(error)
        }
    }

    async decrement(id: string | number, currentQuantity: number) {
        try {
            const checkout = await this.client.checkout.updateLineItems(this.checkoutId, [{
                id,
                quantity: currentQuantity - 1
            }])
            return checkout
        } catch (error) {
            console.error(error)
        } 
    }

    async addLineItem(shopifyId: string) {
        try {
            const checkout = await this.client.checkout.addLineItems(this.checkoutId, [{ variantId: shopifyId, quantity: 1 }])
            return checkout
        } catch (error) {
            console.error(error)
        } finally {
            return this.cart
        }
    }

    async removeLineItem(id: string | number) {
        try {
            const checkout = await this.client.checkout.removeLineItems(this.checkoutId, [String(id)])
            return checkout
        } catch (error) {
            console.error(error)
        } finally {
            return this.cart
        }
    }
}

export default Shopify