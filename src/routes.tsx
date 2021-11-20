import React from 'react'
import { BrowserRouter, Route } from 'react-router-dom'

import SignIn from './pages/SignIn'

import Works from './pages/Works/List'
import CreateWork from './pages/Works/Create'
import WorkDetail from './pages/Works/Detail'

import Customers from './pages/Customers/List'
import CreateCostumer from './pages/Customers/Create'
import CostumerDetail from './pages/Customers/Detail'

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
      
      <Route path='/works' component={Works} exact />
      <Route path='/works/:id' component={WorkDetail} />
      <Route path='/works/create' component={CreateWork}  />

      <Route path='/customers' component={Customers} exact />
      <Route path='/customers/:id' component={CostumerDetail} />
      <Route path='/customers/create' component={CreateCostumer}  />

      <Route path='/drivers' component={Drivers} exact />
      <Route path='/drivers/:id' component={DriverDetail} />
      <Route path='/drivers/create' component={CreateDriver}  />
      
      <Route path='/trucks' component={Trucks} exact />
      <Route path='/trucks/:id' component={TruckDetail} />
      <Route path='/truck/create' component={CreateTruck}  />
    </BrowserRouter>
  )
}

export default Routes