import React from 'react';
import { Flex, Box, Button, Text } from '../styles';

const Incrementer = ({
  min = 1,
  max = 10,
  value,
  onIncrement,
  onDecrement,
}) => (
  <React.Fragment>
    <Flex
      display="inline-flex"
      flexWrap="nowrap"
      alignItems="center"
      p="5px"
      borderRadius={3}
      backgroundColor="#f4f4f7"
    >
      <Box>
        <Button
          increment
          disabled={value === min}
          onClick={value > min ? () => onDecrement(value - 1) : undefined}
        >
          -
        </Button>
      </Box>
      <Text m={0} px={2} fontWeight="bold" fontSize="13px">
        {value}
      </Text>
      <Box>
        <Button
          increment
          disabled={value === max}
          onClick={value < max ? () => onIncrement(value + 1) : undefined}
        >
          +
        </Button>
      </Box>
    </Flex>
  </React.Fragment>
);

export default Incrementer;
