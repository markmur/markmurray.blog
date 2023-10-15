import React, { PropsWithChildren } from 'react';

interface Props {
  open: boolean;
  setOpenState: (value: boolean) => void;
}

const { Provider, Consumer } = React.createContext<Props>({
  open: false,
  setOpenState: () => {},
});

function MenuContext(
  props: PropsWithChildren<{ initialState: { open: boolean } }>,
) {
  const { children, initialState } = props;
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
}

export { Consumer as MenuConsumer };

export default MenuContext;
