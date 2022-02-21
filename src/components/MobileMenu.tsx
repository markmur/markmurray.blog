import React from 'react';
import { Link } from 'gatsby';
import { FiX } from 'react-icons/fi';

import Drawer from './Drawer';
import { Box, Overlay, Flex } from '../styles';

const NavLink: React.FC<{ to: string }> = ({ to, children }) => {
  return (
    <Box px={4} my={5} fontSize="1.5rem" className="link">
      <Link to={to}>{children}</Link>
    </Box>
  );
};

const MobileMenu = ({ open = true, onClose }) => {
  return (
    <React.Fragment>
      <Drawer blur open={open} backgroundColor="rgba(0,0,0,0.9)" width="100vw">
        <Box m={4} onClick={onClose}>
          <FiX color="white" size={24} />
        </Box>

        <Flex color="white">
          <Box p={4} pl={5}>
            <Flex
              flexDirection="column"
              justifyContent="center"
              color="white"
              height="70vh"
            >
              <div>
                <NavLink to="/">Home</NavLink>
                <NavLink to="/about">Who?</NavLink>
                <NavLink to="/posts">Articles</NavLink>
                <NavLink to="/projects">Projects</NavLink>
                <NavLink to="/photography">Photography</NavLink>
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
