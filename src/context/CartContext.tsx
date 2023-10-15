import React, { PropsWithChildren } from 'react';

interface Props {
  open: boolean;
  setCartState: (open: boolean) => void;
}

export const CartContext = React.createContext<Props>({
  open: false,
  setCartState: (open: boolean) => undefined,
});

function Cart(props: PropsWithChildren<{ initialState: { open: boolean } }>) {
  const { children, initialState } = props;
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
}

const { Consumer } = CartContext;

export { Consumer as CartConsumer };

export default Cart;
