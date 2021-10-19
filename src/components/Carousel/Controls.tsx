import React from 'react';
import { Flex, Box } from '../../styles';
import {
  HiOutlineArrowLeft as Left,
  HiOutlineArrowRight as Right,
} from 'react-icons/hi';

const Controls = ({ onNext, onPrev, ...props }) => {
  return (
    <Flex alignItems="center" {...props}>
      <Box mr={4} onClick={onPrev}>
        <Left size="20px" />
      </Box>
      <Box onClick={onNext}>
        <Right size="20px" />
      </Box>
    </Flex>
  );
};

export default Controls;
