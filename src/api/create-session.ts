import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2020-08-27',
});

import { GatsbyFunctionRequest, GatsbyFunctionResponse } from 'gatsby';

import { Handler } from '@netlify/functions';
import config from '../../config';

interface LineItem {
  price: string;
  quantity: number;
}

function validateLineItems(lineItems: any[]): boolean {
  if (!lineItems || !Array.isArray(lineItems)) return false;

  if (!lineItems.length) return false;

  return lineItems.every(
    (item) => item?.price && item?.quantity && item?.quantity > 0,
  );
}

function getBody<T>(request: GatsbyFunctionRequest): T {
  try {
    return JSON.parse(request.body);
  } catch (error) {
    console.error('Failed to parse JSON body in create-session request', error);
    return {} as T;
  }
}

export default async (
  request: GatsbyFunctionRequest,
  response: GatsbyFunctionResponse,
) => {
  const { line_items } = getBody<{ line_items: LineItem[] }>(request);

  const valid = validateLineItems(line_items);

  if (!valid) {
    return response.status(400).json({
      message: 'Invalid line items',
    });
  }

  try {
    const session = await stripe.checkout.sessions.create({
      line_items,
      mode: 'payment',
      shipping_address_collection: {
        allowed_countries: config.allowed_countries,
      },
      shipping_options: [{ shipping_rate: 'shr_1K3MbUIEGevYe70EnTqu9ElI' }],
      success_url: config.success_url,
      cancel_url: config.cancel_url,
    });

    return response.status(200).json({
      sessionId: session.id,
    });
  } catch (error) {
    console.error(error);

    return response.status(500).json({
      message: 'Failed to create Stripe session',
    });
  }
};
