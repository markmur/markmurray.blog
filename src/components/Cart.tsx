import React from 'react';
import getStripe from '../utils/stripe';
import { useShoppingCart } from 'use-shopping-cart';
import { FiShoppingBag, FiX } from 'react-icons/fi';

import Incrementer from './Incrementer';
import {
  Box,
  Button,
  Flex,
  ErrorMessage,
  Text,
  BackgroundImage,
} from '../styles';

function LineItem(props) {
  return (
    <Box py={3} borderBottom="1px solid" borderColor="#eee">
      <Flex alignItems="center" justifyContent="space-between">
        <Box>
          <Flex alignItems="center">
            <Box mr={3}>
              <BackgroundImage
                src={props.image}
                width={60}
                height={90}
                borderRadius={4}
              />
            </Box>
            <Box>
              <Text as="h4" mb={2}>
                {props.name}
              </Text>

              <Box mb={2}>
                <small>({props.description})</small>
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
            <Text as="strong" fontSize="1em">
              {props.formattedValue}
            </Text>
          </Box>
        </Flex>
      </Flex>
    </Box>
  );
}

const Cart = () => {
  const [loading, setLoadingState] = React.useState(false);
  const [error, setErrorState] = React.useState<string>('');

  const {
    cartCount,
    cartDetails = {},
    removeItem,
    formattedTotalPrice,
    incrementItem,
    decrementItem,
  } = useShoppingCart();

  const cartItems = Object.entries(cartDetails);

  const setError = () => {
    setErrorState('Sorry, something went wrong. Please try again.');
  };

  const handleCheckout = async () => {
    setLoadingState(true);
    try {
      const lineItems = Object.entries(cartDetails).map(
        ([priceKey, productDetails]: [string, any]) => ({
          price: priceKey,
          quantity: productDetails.quantity,
        }),
      );

      const { sessionId } = await fetch('/api/create-session', {
        method: 'POST',
        body: JSON.stringify({
          line_items: lineItems,
        }),
      }).then((res) => res.json());

      const stripe = await getStripe();

      const error = await stripe.redirectToCheckout({
        sessionId,
      });

      if (error) setError();
    } catch (error) {
      console.error(error);
      setError();
    } finally {
      setLoadingState(false);
    }
  };

  return (
    <React.Fragment>
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
              ({cartCount} {cartCount === 1 ? 'item' : 'items'})
            </small>
          </Flex>
        </Flex>

        {/* <Box onClick={onClose}>
            <FiX />
          </Box> */}
      </Flex>

      <Box px={4}>
        {cartItems.map(([sku, item]) => (
          <LineItem
            key={sku}
            id={sku}
            {...item}
            onRemove={() => removeItem(sku)}
            onIncrement={() => incrementItem(sku)}
            onDecrement={() => decrementItem(sku)}
          />
        ))}
      </Box>

      <Box
        py={3}
        px={4}
        mt={4}
        bg="#f4f4f7"
        borderTop="1px solid"
        borderBottom="1px solid"
        borderColor="#e8e9ef"
      >
        <Flex justifyContent="space-between" alignItems="center">
          <strong>Estimated Total</strong>
          <div>
            <strong>{formattedTotalPrice}</strong>
            <div>
              <small>
                <em>incl. tax</em>
              </small>
            </div>
          </div>
        </Flex>
      </Box>

      <Box
        py={3}
        px={4}
        bg="#f4f4f7"
        borderBottom="1px solid"
        borderColor="#e8e9ef"
      >
        <Flex justifyContent="space-between" alignItems="center">
          <strong>Shipping</strong>
          <Text textAlign="right">
            <Text as="small">
              <em>Calculated at next step</em>
            </Text>
          </Text>
        </Flex>
      </Box>

      <Box py={3} px={4} mt={2}>
        <Button
          disabled={cartItems.length === 0}
          primary
          expand
          loading={loading}
          onClick={handleCheckout}
        >
          {loading ? 'Loading...' : 'Complete checkout'}
        </Button>

        {error && (
          <ErrorMessage mt={2} width="100%" textAlign="center" p={2}>
            {error}
          </ErrorMessage>
        )}
      </Box>
    </React.Fragment>
  );
};

export default Cart;
