import { IDefaultRootState } from 'interfaces'
import React, { createContext, useCallback, useContext, useState } from 'react'
import usePrivateApi from './usePrivateApi'
import { useSelector } from 'react-redux'
import { IUserInitialState } from 'store/user/user.reducer'
import Loading from 'components/Loading'

interface ICheckoutContext {
  checkout(): Promise<void>
}

const CheckoutContext = createContext<ICheckoutContext>({} as ICheckoutContext)

const CheckoutProvider: React.FC = ({ children }) => {
  const { data } = useSelector<IDefaultRootState, IUserInitialState>(s => s.user)

  const [isLoading, setIsLoading] = useState(false)

  const api = usePrivateApi()

  const checkout = useCallback(async () => {
    try {
      setIsLoading(true)

      const response = await api.post(`/checkout/${data.id}`)

      window.location.href = response.data.url
    } catch (error) {
      console.error(error)
    } finally {
      setIsLoading(false)
    }
  }, [api, data.id])

  return (
    <CheckoutContext.Provider value={{ checkout }}>
      <>
        {isLoading && <Loading />}
        {children}
      </>
    </CheckoutContext.Provider>
  )
}

function useCheckout(): ICheckoutContext {
  const context = useContext(CheckoutContext)

  if (!context) {
    throw new Error('useCheckout must be used within an CheckoutProvider')
  }

  return context
}

export { useCheckout, CheckoutProvider }