import React from 'react';
import { Link } from 'gatsby';
import { FiX } from 'react-icons/fi';

import Drawer from './Drawer';
import { Box, Overlay, Flex } from '../styles';

const MobileMenu = ({ open = true, onClose }) => {
  return (
    <React.Fragment>
      <Drawer open={open} backgroundColor="black">
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
                  borderLeft: '1px solid rgba(255,255,255,0.2)',
                }}
              >
                <Box px={4} my={4} fontSize="1.25rem">
                  <Link to="/">Home</Link>
                </Box>
                <Box px={4} my={4} fontSize="1.25rem">
                  <Link to="/about">Who?</Link>
                </Box>
                <Box px={4} my={4} fontSize="1.25rem">
                  <Link to="/posts">Articles</Link>
                </Box>
                <Box px={4} my={4} fontSize="1.25rem">
                  <Link to="/projects">Projects</Link>
                </Box>
                <Box px={4} my={4} fontSize="1.25rem">
                  <Link to="/photography">Photography</Link>
                </Box>
                <Box px={4} my={4} fontSize="1.25rem">
                  <Link to="/cart"> Your cart</Link>
                </Box>
              </div>
            </Flex>
          </Box>
        </Flex>
      </Drawer>

      {open && <Overlay onClick={onClose} />}
    </React.Fragment>
  );
};

export default MobileMenu;
