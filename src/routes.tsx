import React from 'react'
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { IDefaultRootState } from 'interfaces'

import SignIn from './pages/public/SignIn'
import Works from './pages/private/Works/List'
import CreateWork from './pages/private/Works/Create'
import WorkDetail from './pages/private/Works/Detail'
import Customers from './pages/private/Customers/List'
import CreateCostumer from './pages/private/Customers/Create'
import CostumerDetail from './pages/private/Customers/Detail'
import Drivers from './pages/private/Drivers/List'
import CreateDriver from './pages/private/Drivers/Create'
import DriverDetail from './pages/private/Drivers/Detail'
import Trucks from './pages/private/Trucks/List'
import CreateTruck from './pages/private/Trucks/Create'
import TruckDetail from './pages/private/Trucks/Detail'
import SignUp from 'pages/public/SignUp'
import ForgotPassword from 'pages/public/ForgotPassword'
import ResetPassword from 'pages/public/ResetPassword'
import Map from 'pages/private/Map'

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

      <Route path='/forgotPassword' exact component={ForgotPassword} />
      <Route path='/resetPassword' exact component={ResetPassword} />

      <PrivateRoute path='/works/map' exact component={Map} />

      <PrivateRoute path='/works' exact component={Works} />
      <PrivateRoute path='/work/:id' component={WorkDetail} />
      <PrivateRoute path='/works/create' component={CreateWork} />
      <PrivateRoute path='/customers' exact component={Customers} />
      <PrivateRoute path='/customer/:id' component={CostumerDetail} />
      <PrivateRoute path='/customers/create' component={CreateCostumer} />
      <PrivateRoute path='/drivers' exact component={Drivers} />
      <PrivateRoute path='/driver/:id' component={DriverDetail} />
      <PrivateRoute path='/drivers/create' component={CreateDriver} />
      <PrivateRoute path='/trucks' exact component={Trucks} />
      <PrivateRoute path='/truck/:id' component={TruckDetail} />
      <PrivateRoute path='/trucks/create' component={CreateTruck} />
    </Switch>
  </Router>
)

export default Routes