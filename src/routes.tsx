import React from 'react'
import { BrowserRouter, Route } from 'react-router-dom'

import SignIn from './pages/SignIn'

import Works from './pages/Works/List'
import CreateWork from './pages/Works/Create'
import WorkDetail from './pages/Works/Detail'

const Routes: React.FC = () => {
  return (
    <BrowserRouter>
      <Route path='/' exact component={SignIn} />
      
      <Route path='/works' component={Works} exact />
      <Route path='/works/:id' component={WorkDetail} />
      <Route path='/create-work' component={CreateWork}  />
      
    </BrowserRouter>
  )
}

export default Routes