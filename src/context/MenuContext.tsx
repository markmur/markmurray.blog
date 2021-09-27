import React from 'react'

const { Provider, Consumer } = React.createContext({})

const MenuContext = ({ initialState, children }) => {
  const [state, setState] = React.useState(initialState)

  const setOpenState = (value: boolean) => {
    setState({
      open: value,
    })
  }

  return (
    <Provider
      value={{
        ...state,
        setOpenState,
      }}
    >
      {children}
    </Provider>
  )
}

export { Consumer as MenuConsumer }

export default MenuContext
