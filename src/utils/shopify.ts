import ShopifyClient from "shopify-buy"

function debounce(fn, ms: number) {
  let timer
  
  return (...args) => {
    clearTimeout(timer)
    timer = setTimeout(() => {
      fn(...args)
    }, ms)
  }
}

interface LineItem {
    id: string
    quantity: number
}

interface Cart {
    totalPrice: string
    lineItems: Record<string, LineItem>
}

class Shopify {
    client: ShopifyClient.Client

    checkoutId: string | number

    defaultCart: Cart

    cart: Cart

    listeners: [] = []

    checkoutUrl: string

    checkoutDebounceTiming: number = 2500

    constructor() {
        this.client = ShopifyClient.buildClient({
            domain: process.env.GATSBY_SHOPIFY_STORE_URL,
            storefrontAccessToken: process.env.GATSBY_SHOPIFY_ACCESS_TOKEN
        });
        this.checkoutId = this.getLocalStorageCheckoutId();

        this.createCheckout()

        this.defaultCart = {
            totalPrice: "0.00",
            lineItems: {}
        }

        this.cart = this.getLocalStorageCart()
    }

    private getLocalStorageCheckoutId() {
        return localStorage.getItem("shopify:checkoutId")
    }

    private getLocalStorageCart() {
        try {
            return JSON.parse(localStorage.getItem("shopify:cart")) || this.defaultCart;
        } catch (error) {
            console.error(error)
            return this.defaultCart;
        }
    }

    private updateLocalStorageCart(cart: Cart) {
        try {
            this.cart = cart;
            localStorage.setItem("shopify:cart", JSON.stringify(cart))
        } catch (error) {
            console.error(error)
        }
    }

    private createCartFromCheckout(checkout) {
        const cart: Cart = {
            totalPrice: checkout.totalPrice,
            lineItems: checkout.lineItems.reduce((state, item) => {
                state[item.id] = item
                return state
            }, {})
        }
        return cart
    }

    private recalculateTotalPrice(cart: Cart) {
        return String(Object.values(cart.lineItems).reduce((state, item) => {
            state += Number(item?.variant?.price) * Number(item?.quantity)
            return state
        }, 0))
    }

    private updateLocalStorageCartItem(id: string, property: string, value: string | number) {
        const cart = {...this.getLocalStorageCart()}

        if (!(id in cart.lineItems)) {
            console.error(`Line item with id "${id}" not found in local cart.`)
            return 
        }

        cart.lineItems[id][property] = value
        cart.totalPrice = this.recalculateTotalPrice(cart)
        this.updateLocalStorageCart(cart)
        return cart;
    }

    private addLocalStorageCartItem(id: string, variant) {
        const cart = { ...this.getLocalStorageCart() }

        cart.lineItems[id] = variant
        cart.totalPrice = this.recalculateTotalPrice(cart)
        this.updateLocalStorageCart(cart)
        return cart;
    }

    private removeLocalStorageCartItem(id: string) {
        const cart = { ...this.getLocalStorageCart() }

        if (!(id in cart.lineItems)) {
            console.error(`Line item with id "${id}" not found in local cart.`)
            return 
        }

        delete cart.lineItems[id]
        cart.totalPrice = this.recalculateTotalPrice(cart)
        this.updateLocalStorageCart(cart)
        return cart;
    }

    private callListeners(bool: boolean) {
        this.listeners?.forEach(cb => cb?.(bool))
    }

    listen(cb) {
        this.listeners.push(cb)
    }

    async goToCheckout() {
        if (this.checkoutUrl) {
            window.location.href = this.checkoutUrl
            return
        }

        const checkout = await this.client.checkout.fetch(String(this.checkoutId))
        this.checkoutUrl = checkout.webUrl
        window.location.href = checkout.webUrl
    }

    async createCheckout() {
        const localStorageCheckoutId = this.getLocalStorageCheckoutId()
        
        if (localStorageCheckoutId) {
            return localStorageCheckoutId
        }

        try {
            const checkout = await this.client.checkout.create()
            this.checkoutId = checkout.id
            this.checkoutUrl = checkout.webUrl
            localStorage.setItem("shopify:checkoutId", String(checkout.id))
            return checkout.id
        } catch (error) {
            console.error(error)
        }
    }

    private debounceFetchCheckout = debounce(() => this.fetchCheckout(), this.checkoutDebounceTiming)

    async fetchCheckout(): Promise<Cart> {
        try {
            this.callListeners(true);
            const checkout = await this.client.checkout.fetch(String(this.checkoutId))
            console.log({checkout})
            this.cart = this.createCartFromCheckout(checkout)
            this.updateLocalStorageCart(this.cart)
            this.callListeners(false)
        } catch (error) {
            console.error(error);
        } finally {
            return this.cart
        }
    }

    increment(id: string, currentQuantity: number): Cart {
        try {
            this.updateLocalStorageCartItem(id, "quantity", currentQuantity + 1)
            this.client.checkout.updateLineItems(this.checkoutId, [{
                id,
                quantity: currentQuantity + 1
            }]).then(() => this.debounceFetchCheckout())
        } catch (error) {
            console.error(error)
            this.updateLocalStorageCartItem(id, "quantity", currentQuantity)
        } finally {
            return this.cart
        }
    }

    decrement(id: string, currentQuantity: number): Cart {
        try {
            this.updateLocalStorageCartItem(id, "quantity", currentQuantity - 1)
            this.client.checkout.updateLineItems(this.checkoutId, [{
                id,
                quantity: currentQuantity - 1
            }]).then(() => this.debounceFetchCheckout())
        } catch (error) {
            console.error(error)
            this.updateLocalStorageCartItem(id, "quantity", currentQuantity)
        } finally {
            return this.cart
        }
    }

    addLineItem(id: string, variant) {
        try {
            this.client.checkout.addLineItems(this.checkoutId, [{ variantId: variant.shopifyId, quantity: 1 }])
                .then((checkout) => {
                    this.addLocalStorageCartItem(id, checkout.lineItems.find(x => x.id === id))
                    this.fetchCheckout()
                })
        } catch (error) {
            console.error(error)
        } finally {
            return this.cart
        }
    }

    removeLineItem(id: string) {
        try {
            this.removeLocalStorageCartItem(id)
            this.client.checkout.removeLineItems(this.checkoutId, [id])
                .then(() => this.debounceFetchCheckout())
        } catch (error) {
            console.error(error)
        } finally {
            return this.cart
        }
    }
}

const shopify = new Shopify()

export default shopify