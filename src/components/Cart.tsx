import React from 'react';
import ShopifyClient from 'shopify-buy';
import {
  FiTrash2 as Trash,
  FiShoppingBag,
  FiShoppingCart,
  FiTag,
  FiX,
} from 'react-icons/fi';

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

interface LineItemProps {
  lineItem: ShopifyClient.Checkout['lineItems'][0];
  onRemove: () => void;
  onIncrement: () => void;
  onDecrement: () => void;
}

function LineItem(props: LineItemProps) {
  const { lineItem } = props;
  const hasDiscounts = lineItem.discountAllocations.length > 0;

  if (!lineItem || !lineItem.variant) return null;

  const finalPrice = React.useMemo(() => {
    if (!hasDiscounts) {
      return formatPrice(
        Number(lineItem.variant?.price.amount) * (lineItem.quantity || 1),
        lineItem.variant?.price.currencyCode,
      );
    }

    const originalPrice = parseFloat(
      String(lineItem.variant?.price.amount) ?? '0',
    );
    const finalPrice = lineItem.discountAllocations.reduce(
      (state, discount) =>
        (state -= parseFloat(String(discount.allocatedAmount.amount) ?? '0')),
      originalPrice,
    );
    return formatPrice(finalPrice, lineItem.variant?.price.currencyCode);
  }, [props]);

  return (
    <Box py={3} borderBottom="1px solid" borderColor="#eee">
      <Flex>
        <Box mr={3}>
          <BackgroundImage
            src={lineItem.variant?.image?.src}
            width={60}
            height={90}
            borderRadius={4}
          />
        </Box>

        <Flex flex="1" justifyContent="space-between">
          <Flex flex="1" justifyContent="space-between">
            <Box maxWidth="70%">
              <Text as="h4" mb={2}>
                {lineItem.title}
              </Text>

              <Box mb={2}>
                <small>{lineItem.variant.title}</small>
              </Box>
            </Box>

            <Box pl={2} textAlign="right">
              {hasDiscounts && (
                <Strike mb={1} fontSize="1em">
                  {formatPrice(
                    lineItem.variant.price?.amount,
                    lineItem.variant.price?.currencyCode,
                  )}
                </Strike>
              )}
              <Text as="strong" fontSize="1em">
                {finalPrice}
              </Text>
            </Box>
          </Flex>

          <Flex width="100%" alignItems="center" justifyContent="space-between">
            <Incrementer
              value={lineItem.quantity}
              onIncrement={props.onIncrement}
              onDecrement={props.onDecrement}
            />

            <Box textAlign="right">
              <Text
                fontSize="12px"
                as="small"
                cursor="pointer"
                onClick={props.onRemove}
              >
                <Trash size={20} />
              </Text>
            </Box>
          </Flex>
        </Flex>
      </Flex>

      <Flex mt={2}>
        {lineItem.discountAllocations.length > 0 && (
          <ul>
            {lineItem.discountAllocations.map((discount) => (
              <DiscountCode key={discount.discountApplication.targetType}>
                <FiTag /> {discount.discountApplication.targetType}
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

const Cart = ({ onClose }: { onClose?: () => void }) => {
  const [error, setErrorState] = React.useState<string>('');
  const shopify = useShopify();

  // const shopPayLoadedStatus = useLoadScript(
  //   'https://cdn.shopify.com/shopifycloud/shop-js/v0.1/client.js',
  // );

  console.log(shopify.checkout);

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
              Your cart
            </Text>
            <small>
              ({shopify.cartCount} {shopify.cartCount === 1 ? 'item' : 'items'})
            </small>
          </Flex>
        </Flex>

        <Box p={1} mr={-2}>
          <FiX size="22px" onClick={onClose} />
        </Box>
      </Flex>

      <Box px={4}>
        {shopify.checkout.lineItems.length > 0 ? (
          shopify.checkout.lineItems.map((lineItem) => (
            <LineItem
              key={lineItem.id}
              lineItem={lineItem}
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
                shopify.checkout.subtotalPrice?.amount,
                shopify.checkout.subtotalPrice?.currencyCode,
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

          <small>
            <em>Calculated at next step</em>
          </small>
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
                  shopify.checkout.totalPrice?.amount,
                  shopify.checkout.totalPrice?.currencyCode,
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
