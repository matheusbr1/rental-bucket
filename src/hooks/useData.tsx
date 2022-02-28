import React, { createContext, useContext, useEffect, useReducer } from 'react'
import { ReducerAction, IStore } from 'interfaces'
import { api } from 'services/api'
import { reducer } from 'store/reducer'
import { INITIAL_STATE } from 'store/state'
import { setDrivers } from 'store/actionCreator'

interface IDataContext {
  appData: IStore
  dispatch: React.Dispatch<ReducerAction>
}

const DataContext = createContext<IDataContext>({} as IDataContext)

const DataProvider: React.FC = ({ children }) => {
  const [appData, dispatch] = useReducer(reducer, INITIAL_STATE)

  // Getting data
  useEffect(() => {
    api.get('/drivers').then(response => setDrivers(response.data))
  }, [])

 return (
    <DataContext.Provider value={{ appData, dispatch }}>
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