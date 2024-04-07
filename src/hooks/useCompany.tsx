import { ICompany, IDefaultRootState } from 'interfaces'
import React, { createContext, useContext, useEffect, useState } from 'react'
import usePrivateApi from './usePrivateApi'
import { useSelector } from 'react-redux'
import { IUserInitialState } from 'store/user/user.reducer'

interface ICompanyContext {
  company: ICompany | null
}

const CompanyContext = createContext<ICompanyContext>({} as ICompanyContext)

const CompanyProvider: React.FC = ({ children }) => {
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
    <CompanyContext.Provider value={{ company }}>
      {children}
    </CompanyContext.Provider>
  )
}

function useCompany(): ICompanyContext {
  const context = useContext(CompanyContext)

  if (!context) {
    throw new Error('useCompany must be used within an CompanyProvider')
  }

  return context
}

export { useCompany, CompanyProvider }