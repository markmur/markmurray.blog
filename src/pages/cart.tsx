import React from 'react'
import { useShoppingCart } from 'use-shopping-cart'
import { FiShoppingBag, FiX } from 'react-icons/fi'

import { Box, Button, Flex, ErrorMessage } from '../styles'
import Layout from '../components/Layout'
import BackgroundLines from '../components/BackgroundLines'

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
              <Box mb={2}>
                <small>{props.description}</small>
              </Box>
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

const Cart = () => {
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
    <Layout wide displayTagline={false}>
      <BackgroundLines />
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
          <div>
            <strong>{formattedTotalPrice}</strong>
            <div>
              <small>
                <em>incl. Tax</em>
              </small>
            </div>
          </div>
        </Flex>
      </Box>

      <Box py={3} px={4}>
        <Button primary expand loading={loading} onClick={handleCheckout}>
          {loading ? 'Loading...' : 'Complete checkout'}
        </Button>

        {error && <ErrorMessage>{error}</ErrorMessage>}
      </Box>

      <Box textAlign="center" px={4}>
        <small>Shipping will be calculated in the next step.</small>
      </Box>
    </Layout>
  )
}

export default Cart
