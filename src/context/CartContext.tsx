import React from 'react'

const { Provider, Consumer } = React.createContext({})

const CartContext = ({ initialState, children }) => {
  const [state, setState] = React.useState(initialState)

  const setCartState = (value: boolean) => {
    setState({
      open: value,
    })
  }

  return (
    <Provider
      value={{
        ...state,
        setCartState,
      }}
    >
      {children}
    </Provider>
  )
}

export { Consumer as CartConsumer }

export default CartContext
