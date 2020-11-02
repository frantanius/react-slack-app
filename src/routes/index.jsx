import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Home from 'App'
import Login from 'pages/Login'
import Register from 'pages/Register'

const Routes = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
      </Switch>
    </Router>
  )
}

export default Routes
