import React from 'react';

interface Props {
  open: boolean;
  setCartState: (open: boolean) => void;
}

export const CartContext = React.createContext<Props>({
  open: false,
  setCartState: (open: boolean) => undefined,
});

const Cart: React.FC<{ initialState: { open: boolean } }> = ({
  initialState,
  children,
}) => {
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
