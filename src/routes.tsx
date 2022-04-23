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

const Routes: React.FC = () => (
  <BrowserRouter>
    <Route path='/' exact component={SignIn} />
    <Route path='/works' exact component={Works}  />
    <Route path='/work/:id' component={WorkDetail} />
    <Route path='/works/create' component={CreateWork}  />
    <Route path='/customers' exact component={Customers}  />
    <Route path='/customer/:id' component={CostumerDetail} />
    <Route path='/customers/create' component={CreateCostumer}  />
    <Route path='/drivers' exact component={Drivers}  />
    <Route path='/driver/:id' component={DriverDetail} />
    <Route path='/drivers/create' component={CreateDriver}  />
    <Route path='/trucks' exact component={Trucks}  />
    <Route path='/truck/:id' component={TruckDetail} />
    <Route path='/trucks/create' component={CreateTruck}  />
  </BrowserRouter>
)

export default Routes