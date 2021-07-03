import React from 'react'

type ContextType = {
  [key: string]: any
}

export const Context = React.createContext<ContextType>({
  menuProfile: false,
  setMenuProfile: () => {},
  searchBlock: false,
  setSearchBlock: () => {},
})
