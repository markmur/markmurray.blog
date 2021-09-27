import React from 'react'
import { Link } from 'gatsby'
import { useShoppingCart } from 'use-shopping-cart'
import { FiX } from 'react-icons/fi'

import { Box, Drawer, Overlay, Flex } from '../styles'

const MobileMenu = ({ open = true, onClose }) => {
  const { cartCount } = useShoppingCart()
  return (
    <React.Fragment>
      <Drawer open={open} bg="black">
        <Box m={4} onClick={onClose}>
          <FiX color="white" size={24} />
        </Box>

        <Flex color="white">
          <Box p={4} pl={6}>
            <Flex
              flexDirection="column"
              color="white"
              justifyContent="center"
              height="70vh"
            >
              <div
                style={{
                  borderLeft: '1px solid',
                }}
              >
                <Box px={4} my={4}>
                  <Link to="/">Index</Link>
                </Box>
                <Box px={4} my={4}>
                  <Link to="/about">Who?</Link>
                </Box>
                <Box px={4} my={4}>
                  <Link to="/posts">Posts</Link>
                </Box>
                <Box px={4} my={4}>
                  <Link to="/projects">Projects</Link>
                </Box>
                <Box px={4} my={4}>
                  <Link to="/photography">Photography</Link>
                </Box>
                <Box px={4} my={4}>
                  <Link to="/cart"> Your cart ({cartCount})</Link>
                </Box>
              </div>
            </Flex>
          </Box>
        </Flex>
      </Drawer>

      {open && <Overlay onClick={onClose} />}
    </React.Fragment>
  )
}

export default MobileMenu
