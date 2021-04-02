import React from 'react'
import { BrowserRouter, Route } from 'react-router-dom'

import SignIn from './pages/SignIn'
import Reports from './pages/Reports'

import Services from './pages/Services/List'
import CreateService from './pages/Services/Create'
import ServiceDetail from './pages/Services/Detail'

const Routes: React.FC = () => {
  return (
    <BrowserRouter>
      <Route path='/' exact component={SignIn} />
      <Route path='/reports' component={Reports}  />
      
      <Route path='/services' component={Services} exact />
      <Route path='/services/:id' component={ServiceDetail} />
      <Route path='/new-service' component={CreateService}  />
    </BrowserRouter>
  )
}

export default Routes