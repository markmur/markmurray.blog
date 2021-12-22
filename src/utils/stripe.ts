import { loadStripe, Stripe } from '@stripe/stripe-js';

// @singleton
let stripePromise: Promise<Stripe>;

const getStripe = () => {
  if (!stripePromise) {
    stripePromise = loadStripe(process.env.STRIPE_PUBLISHABLE_KEY);
  }

  return stripePromise;
};

export default getStripe;
