import React from 'react'
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { IDefaultRootState } from 'interfaces'

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
import SignUp from 'pages/SignUp'

interface PrivateRouteProps {
  component: React.FC<any>
  path: string
  exact?: boolean
}

export const PrivateRoute = ({ component: Component, exact, ...rest }: PrivateRouteProps) => {
  const isAuthenticated = useSelector((state: IDefaultRootState) => state.user.isAuthenticated)

  return (
    <Route exact={exact} {...rest} render={props => (
      isAuthenticated ? (
        <Component {...props} />
      ) : (
        <Redirect to={{
          pathname: '/',
          state: { from: props.location }
        }} />
      )
    )} />
  )
}

const Routes: React.FC = () => (
  <Router>
    <Switch>
      <Route path='/' exact component={SignIn} />
      <Route path='/signup' exact component={SignUp} />
      
      <PrivateRoute path='/works' exact component={Works}  />
      <PrivateRoute path='/work/:id' component={WorkDetail} />
      <PrivateRoute path='/works/create' component={CreateWork}  />
      <PrivateRoute path='/customers' exact component={Customers}  />
      <PrivateRoute path='/customer/:id' component={CostumerDetail} />
      <PrivateRoute path='/customers/create' component={CreateCostumer}  />
      <PrivateRoute path='/drivers' exact component={Drivers}  />
      <PrivateRoute path='/driver/:id' component={DriverDetail} />
      <PrivateRoute path='/drivers/create' component={CreateDriver}  />
      <PrivateRoute path='/trucks' exact component={Trucks}  />
      <PrivateRoute path='/truck/:id' component={TruckDetail} />
      <PrivateRoute path='/trucks/create' component={CreateTruck}  />
    </Switch>
  </Router>
)

export default Routes