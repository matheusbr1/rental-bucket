import React from 'react'
import { BrowserRouter, Route } from 'react-router-dom'

import SignIn from './pages/SignIn'
import Dashboard from './pages/Dashboard'

const Routes: React.FC = () => {
  return (
    <BrowserRouter>
      <Route path='/' exact component={SignIn} />
      <Route path='/dashboard' exact component={Dashboard} />
    </BrowserRouter>
  )
}

export default Routes