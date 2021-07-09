import React from 'react'
import { useShoppingCart } from 'use-shopping-cart'
import { FiShoppingBag, FiX } from 'react-icons/fi'

import { Box, Drawer, Overlay, Button, Flex, ErrorMessage } from '../styles'

function LineItem(props) {
  return (
    <Box my={3}>
      <Flex justifyContent="space-between">
        <Box>
          <Flex>
            <Box mr={2}>
              <img src={props.image} width={80} />
            </Box>
            <Box>
              <h6>{props.name}</h6>
              <a onClick={props.onRemove}>
                <small>Remove</small>
              </a>
            </Box>
          </Flex>
        </Box>

        <Flex justifyContent="space-between">
          <Box p={2}>
            <h6>x{props.quantity}</h6>
          </Box>
          <Box pl={2} textAlign="right">
            <h6>{props.formattedValue}</h6>
          </Box>
        </Flex>
      </Flex>
    </Box>
  )
}

const Cart = ({ open, onClose }) => {
  const [loading, setLoadingState] = React.useState(false)
  const [error, setErrorState] = React.useState()

  const {
    cartCount,
    cartDetails,
    redirectToCheckout,
    removeItem,
    formattedTotalPrice,
  } = useShoppingCart()

  const handleCheckout = async () => {
    setLoadingState(true)
    try {
      const error = await redirectToCheckout()

      if (error) {
        setErrorState('Sorry something went wrong')
      }
    } catch (error) {
      console.error(error)
    } finally {
      setLoadingState(false)
    }
  }

  return (
    <React.Fragment>
      <Drawer open={open}>
        <Flex pt={4} pb={2} px={4} justifyContent="space-between">
          <Flex>
            <Box mr={2}>
              <FiShoppingBag />
            </Box>{' '}
            <h3>
              Your bag{' '}
              <small>
                ({cartCount} {cartCount === 1 ? 'item' : 'items'})
              </small>
            </h3>
          </Flex>

          <Box onClick={onClose}>
            <FiX />
          </Box>
        </Flex>

        <Box px={4}>
          {Object.entries(cartDetails || {}).map(([sku, item]) => (
            <LineItem
              key={sku}
              id={sku}
              {...item}
              onRemove={() => removeItem(sku)}
            />
          ))}
        </Box>

        <Box p={4} bg="#f4f4f7">
          <Flex justifyContent="space-between">
            <strong>Estimated Total</strong>
            <strong>{formattedTotalPrice}</strong>
          </Flex>
        </Box>

        <Box py={3} px={4}>
          <Button primary expand loading={loading} onClick={handleCheckout}>
            {loading ? 'Loading...' : 'Complete checkout'}
          </Button>

          {error && <ErrorMessage>{error}</ErrorMessage>}
        </Box>

        <Box textAlign="center" px={4}>
          <small>
            Discount codes can be redeemed in the next step of the checkout
            process.
          </small>
        </Box>
      </Drawer>

      {open && <Overlay onClick={onClose} />}
    </React.Fragment>
  )
}

export default Cart
