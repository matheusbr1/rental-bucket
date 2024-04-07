import React from 'react'

import { CompanyProvider } from './useCompany'
import { CheckoutProvider } from './useCheckout'

const AppProvider: React.FC = ({ children }) => (
  <CheckoutProvider>
    <CompanyProvider>
      {children}
    </CompanyProvider>
  </CheckoutProvider>
)

export default AppProvider
