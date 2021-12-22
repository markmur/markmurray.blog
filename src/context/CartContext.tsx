import React from 'react';

interface Props {
  setCartState: ({ open: boolean }) => void;
}

export const CartContext = React.createContext<Props>({
  setCartState({ open: boolean }) {},
});

const Cart = ({ initialState, children }) => {
  const [state, setState] = React.useState(initialState);

  const setCartState = (value: boolean) => {
    setState({
      open: value,
    });
  };

  return (
    <CartContext.Provider
      value={{
        ...state,
        setCartState,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

const { Consumer } = CartContext;

export { Consumer as CartConsumer };

export default Cart;
