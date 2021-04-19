import React from 'react'
import { BrowserRouter, Route } from 'react-router-dom'

import SignIn from './pages/SignIn'
import Reports from './pages/Reports'

import Services from './pages/Services/List'
import CreateService from './pages/Services/Create'
import ServiceDetail from './pages/Services/Detail'

import Clients from './pages/Clients/List'
import CreateClient from './pages/Clients/Create'
import ClientDetail from './pages/Clients/Detail'

import Drivers from './pages/Drivers/List'
import CreateDriver from './pages/Drivers/Create'
import DriverDetail from './pages/Drivers/Detail'

import Trucks from './pages/Trucks/List'
import CreateTruck from './pages/Trucks/Create'
import TruckDetail from './pages/Trucks/Detail'

const Routes: React.FC = () => {
  return (
    <BrowserRouter>
      <Route path='/' exact component={SignIn} />
      <Route path='/reports' component={Reports}  />
      
      <Route path='/services' component={Services} exact />
      <Route path='/services/:id' component={ServiceDetail} />
      <Route path='/new-service' component={CreateService}  />

      <Route path='/clients' component={Clients} exact />
      <Route path='/clients/:id' component={ClientDetail} />
      <Route path='/new-client' component={CreateClient}  />

      <Route path='/drivers' component={Drivers} exact />
      <Route path='/drivers/:id' component={DriverDetail} />
      <Route path='/new-driver' component={CreateDriver}  />
      
      <Route path='/trucks' component={Trucks} exact />
      <Route path='/trucks/:id' component={TruckDetail} />
      <Route path='/new-truck' component={CreateTruck}  />
    </BrowserRouter>
  )
}

export default Routes