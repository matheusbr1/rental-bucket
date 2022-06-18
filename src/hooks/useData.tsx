import React, { createContext, useContext } from 'react'

interface IDataContext { }

const DataContext = createContext<IDataContext>({} as IDataContext)

const DataProvider: React.FC = ({ children }) => {
  return (
    <DataContext.Provider value={{}}>
      {children}
    </DataContext.Provider>
  )
}

function useData (): IDataContext {
  const context = useContext(DataContext)

  if (!context) {
    throw new Error('useData must be used within an DataProvider')
  }
  
  return context
}

export { useData, DataProvider }