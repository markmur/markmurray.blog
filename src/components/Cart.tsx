import React from 'react';
import { FiShoppingBag } from 'react-icons/fi';

import Incrementer from './Incrementer';
import {
  Box,
  Button,
  Flex,
  ErrorMessage,
  Text,
  BackgroundImage,
} from '../styles';
import shopify from '../utils/shopify';

function LineItem(props) {
  return (
    <Box py={3} borderBottom="1px solid" borderColor="#eee">
      <Flex alignItems="center" justifyContent="space-between">
        <Box>
          <Flex alignItems="center">
            <Box mr={3}>
              <BackgroundImage
                src={props.variant.image.src}
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
                {/* <small>{props.variant.title}</small> */}
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
              €{Number(props.variant.price * props.quantity).toFixed(2)}
            </Text>
          </Box>
        </Flex>
      </Flex>
    </Box>
  );
}

const Cart = ({ open }: { open: boolean }) => {
  const [loading, setLoadingState] = React.useState(false);
  const [error, setErrorState] = React.useState<string>('');
  const [cart, setCart] = React.useState(shopify.cart)
  const [fetching, setFetching] = React.useState(false)

  const fetchCheckout = () => {
    setFetching(true)
    shopify.fetchCheckout().then(cart => {
      setFetching(false)
      setCart(cart);
    })
  }

  React.useEffect(fetchCheckout, [open])

  React.useEffect(() => {
    shopify.listen((value) => {
      setFetching(value)

      if (!value) setCart(shopify.cart)
    })
  }, [open])

  const setError = () => {
    setErrorState('Sorry, something went wrong. Please try again.');
  };

  const handleCheckout = async () => {
    setLoadingState(true);
    try {
      await shopify.goToCheckout();
    } catch (error) {
      console.error(error);
      setError();
    } finally {
      setLoadingState(false);
    }
  }

  const incrementItem = (lineItem) => {
    setCart(shopify.increment(lineItem.id, lineItem.quantity));
  }

  const decrementItem = (lineItem) => {
    setCart(shopify.decrement(lineItem.id, lineItem.quantity));
  }

  const removeItem = (lineItem) => {
    setCart(shopify.removeLineItem(lineItem.id))
  }

  const lineItems = Object.entries(cart.lineItems).map(([id, lineItem]) => lineItem)

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
              ({lineItems.length} {lineItems.length === 1 ? 'item' : 'items'})
            </small>

            {fetching ? "Loading..." : null}
          </Flex>
        </Flex>

        {/* <Box onClick={onClose}>
            <FiX />
          </Box> */}
      </Flex>

      <Box px={4}>
        {lineItems.map(lineItem => (
          <LineItem
            key={lineItem.id}
            {...lineItem}
            onRemove={() => removeItem(lineItem)}
            onIncrement={() => incrementItem(lineItem)}
            onDecrement={() => decrementItem(lineItem)}
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
            <strong>{Number(cart.totalPrice).toFixed(2)}</strong>
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
          disabled={lineItems.length === 0}
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
