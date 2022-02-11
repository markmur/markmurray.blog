import React from 'react';
import { FiLoader, FiShoppingBag, FiShoppingCart, FiTag } from 'react-icons/fi';

import Incrementer from './Incrementer';
import {
  Box,
  Button,
  DiscountCode,
  Flex,
  ErrorMessage,
  Text,
  Overlay,
  BackgroundImage,
  Strike,
  Loader,
} from '../styles';
// import { useLoadScript } from '../hooks/use-load-script';
import { formatPrice } from '../utils/currency';
import { useShopify } from '../hooks/use-shopify';

function LineItem(props) {
  const hasDiscounts = props.discountAllocations.length > 0;

  const finalPrice = React.useMemo(() => {
    if (!hasDiscounts) {
      return formatPrice(
        Number(props.variant.priceV2.amount) * (props.quantity || 1),
        props.variant.priceV2.currencyCode,
      );
    }

    const originalPrice = parseFloat(props.variant.priceV2.amount);
    const finalPrice = props.discountAllocations.reduce(
      (state, discount) =>
        (state -= parseFloat(discount.allocatedAmount.amount)),
      originalPrice,
    );
    return formatPrice(finalPrice, props.variant.priceV2.currencyCode);
  }, [props]);

  return (
    <Box py={3} borderBottom="1px solid" borderColor="#eee">
      <Flex alignItems="center" justifyContent="space-between">
        <Box>
          <Flex alignItems="center">
            <Box mr={3}>
              <BackgroundImage
                src={props.variant?.image?.src}
                width={60}
                height={90}
                borderRadius={4}
              />
            </Box>
            <Box>
              <Text as="h4" mb={2}>
                {props.title}
              </Text>

              <Box mb={2}>
                <small>{props.variant.title}</small>
              </Box>

              <Box>
                <Text
                  fontSize="12px"
                  as="small"
                  cursor="pointer"
                  onClick={props.onRemove}
                >
                  Remove
                </Text>
              </Box>
            </Box>
          </Flex>
        </Box>

        <Flex alignItems="center" justifyContent="space-between">
          <Box p={2}>
            <Incrementer
              value={props.quantity}
              onIncrement={props.onIncrement}
              onDecrement={props.onDecrement}
            />
          </Box>
          <Box pl={2} textAlign="right">
            {hasDiscounts && (
              <Strike mb={1} fontSize="1em">
                {formatPrice(
                  props.variant.priceV2.amount,
                  props.variant.priceV2.currencyCode,
                )}
              </Strike>
            )}
            <Text as="strong" fontSize="1em">
              {finalPrice}
            </Text>
          </Box>
        </Flex>
      </Flex>
      <Flex justifyContent="flex-end">
        {props.discountAllocations.length > 0 && (
          <ul>
            {props.discountAllocations.map((discount) => (
              <DiscountCode key={props.discountAllocations}>
                <FiTag /> {discount.discountApplication.title}
              </DiscountCode>
            ))}
          </ul>
        )}
      </Flex>
    </Box>
  );
}

function LoadingOverlay() {
  return (
    <Overlay
      height="100vh"
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
    >
      <Loader>
        <div />
        <div />
        <div />
      </Loader>
    </Overlay>
  );
}

const Cart = ({ open }: { open: boolean }) => {
  const [error, setErrorState] = React.useState<string>('');
  const shopify = useShopify();

  // const shopPayLoadedStatus = useLoadScript(
  //   'https://cdn.shopify.com/shopifycloud/shop-js/v0.1/client.js',
  // );

  return (
    <Box position="relative">
      {shopify.loading && <LoadingOverlay />}

      <Flex
        py={3}
        px={4}
        pt={4}
        justifyContent="space-between"
        borderBottom="1px solid"
        borderColor="#eee"
      >
        <Flex mb={2}>
          <Box mr={2}>
            <FiShoppingBag />
          </Box>{' '}
          <Flex alignItems="center">
            <Text as="h3" mr={2}>
              Your bag
            </Text>
            <small>
              ({shopify.cartCount} {shopify.cartCount === 1 ? 'item' : 'items'})
            </small>
          </Flex>
        </Flex>

        {/* <Box onClick={onClose}>
          <FiX />
        </Box> */}
      </Flex>

      <Box px={4}>
        {shopify.checkout.lineItems.length > 0 ? (
          shopify.checkout.lineItems.map((lineItem) => (
            <LineItem
              key={lineItem.id}
              {...lineItem}
              onRemove={() => shopify.removeLineItem(lineItem.id)}
              onIncrement={() => shopify.incrementLineItem(lineItem.id)}
              onDecrement={() => shopify.decrementLineItem(lineItem.id)}
            />
          ))
        ) : (
          <Box textAlign="center" pt={6} pb={5}>
            <FiShoppingCart size="40" />
            <Text>Your cart is currently empty</Text>
          </Box>
        )}
      </Box>

      <Box
        py={3}
        px={4}
        mt={4}
        bg="#f4f4f7"
        borderTop="1px solid"
        borderColor="#e8e9ef"
      >
        <Flex justifyContent="space-between" alignItems="center">
          <strong>Subtotal</strong>
          <Flex>
            {shopify.checkout.taxesIncluded && (
              <Box mr={2}>
                <small>
                  <em>incl. tax</em>
                </small>
              </Box>
            )}
            <strong>
              {formatPrice(
                shopify.checkout.subtotalPrice,
                shopify.checkout.currencyCode,
              )}
            </strong>
          </Flex>
        </Flex>
      </Box>

      <Box
        py={3}
        px={4}
        bg="#f4f4f7"
        borderBottom="1px solid"
        borderColor="#e8e9ef"
      >
        <Flex
          justifyContent="space-between"
          alignItems="center"
          textAlign="right"
        >
          <strong>Shipping</strong>

          {shopify.checkout.shippingPrice ? (
            <div>
              <div>
                <strong>
                  {formatPrice(
                    shopify.checkout.shippingPrice,
                    shopify.checkout.currencyCode,
                  )}
                </strong>
              </div>

              {shopify.checkout.shippingType && (
                <small>{shopify.checkout.shippingType}</small>
              )}
            </div>
          ) : (
            <small>
              <em>Calculated at next step</em>
            </small>
          )}
        </Flex>
      </Box>

      <Box
        py={3}
        px={4}
        bg="#f4f4f7"
        borderBottom="1px solid"
        borderColor="#e8e9ef"
      >
        <Flex
          justifyContent="space-between"
          alignItems="center"
          textAlign="right"
        >
          <strong>Estimated Total</strong>

          <div>
            <div>
              <strong>
                {formatPrice(
                  shopify.checkout.totalPrice,
                  shopify.checkout.currencyCode,
                )}
              </strong>
            </div>
          </div>
        </Flex>
      </Box>

      <Box py={3} px={4} mt={2}>
        <Button
          disabled={shopify.checkout.lineItems.length === 0}
          primary
          expand
          loading={shopify.loading ? 'true' : undefined}
          onClick={() => shopify.goToCheckout()}
        >
          {shopify.loading ? 'Loading...' : 'Complete checkout'}
        </Button>

        {/* {shopPayLoadedStatus === 'done' && shopify.checkout.lineItems.length > 0 && (
          <>
            <Box textAlign="center" my={2}>
              <small>or</small>
            </Box>

            <Box mt={3} textAlign="center">
              <shop-pay-button
                store-url={`https://${process.env.GATSBY_SHOPIFY_STORE_URL}`}
                variants={Object.keys(cart.lineItems).join(',')}
              />
            </Box>
          </>
        )} */}

        {error && (
          <ErrorMessage mt={2} width="100%" textAlign="center" p={2}>
            {error}
          </ErrorMessage>
        )}
      </Box>
    </Box>
  );
};

export default Cart;
