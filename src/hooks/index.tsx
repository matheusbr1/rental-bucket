import React from 'react'

import { DataProvider } from './useData'

const AppProvider: React.FC = ({ children }) => (
    <DataProvider>
      {children}
    </DataProvider>
)

export default AppProvider
