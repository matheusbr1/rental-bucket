import { IAddress, ICompany, IDefaultRootState } from 'interfaces'
import React, { createContext, useContext, useEffect, useState } from 'react'
import usePrivateApi from './usePrivateApi'
import { useSelector } from 'react-redux'
import { IUserInitialState } from 'store/user/user.reducer'

interface IDataContext {
  company: ICompany
}

const DataContext = createContext<IDataContext>({} as IDataContext)

const DataProvider: React.FC = ({ children }) => {
  const { isAuthenticated } = useSelector<IDefaultRootState, IUserInitialState>(s => s.user)

  const [company, setCompany] = useState<ICompany>({
    id: 'eb7fffc0-fabe-4401-be95-32e07c46a699',
    name: '',
    address: {} as IAddress,
  })

  const api = usePrivateApi()

  useEffect(() => {
    async function getCompanies() {
      const response = await api.get('companies')
      setCompany(response.data[0])
    }

    if (isAuthenticated) {
      (async () => {
        await getCompanies()
      })()
    }
  }, [api, isAuthenticated])

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