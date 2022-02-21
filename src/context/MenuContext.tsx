import React from 'react';

interface Props {
  open: boolean;
  setOpenState: (value: boolean) => void;
}

const { Provider, Consumer } = React.createContext<Props>({
  open: false,
  setOpenState: () => {},
});

const MenuContext: React.FC<{ initialState: { open: boolean } }> = ({
  initialState,
  children,
}) => {
  const [state, setState] = React.useState(initialState);

  const setOpenState = (value: boolean) => {
    setState({
      open: value,
    });
  };

  return (
    <Provider
      value={{
        ...state,
        setOpenState,
      }}
    >
      {children}
    </Provider>
  );
};

export { Consumer as MenuConsumer };

export default MenuContext;
