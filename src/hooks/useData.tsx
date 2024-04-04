import { ICompany, IDefaultRootState } from 'interfaces'
import React, { createContext, useContext, useEffect, useState } from 'react'
import usePrivateApi from './usePrivateApi'
import { useSelector } from 'react-redux'
import { IUserInitialState } from 'store/user/user.reducer'

interface IDataContext {
  company: ICompany | null
}

const DataContext = createContext<IDataContext>({} as IDataContext)

const DataProvider: React.FC = ({ children }) => {
  const { isAuthenticated, data } = useSelector<IDefaultRootState, IUserInitialState>(s => s.user)

  const [company, setCompany] = useState<ICompany | null>(null)

  const api = usePrivateApi()

  useEffect(() => {
    if (isAuthenticated) {
      (async () => {
        const response = await api.get(`companies/${data.company_id}`)
        setCompany(response.data)
      })()
    }
  }, [api, isAuthenticated, data.company_id])

  return (
    <DataContext.Provider value={{ company }}>
      {children}
    </DataContext.Provider>
  )
}

function useData(): IDataContext {
  const context = useContext(DataContext)

  if (!context) {
    throw new Error('useData must be used within an DataProvider')
  }

  return context
}

export { useData, DataProvider }