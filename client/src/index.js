import React from 'react'
import ReactDOM from 'react-dom'
import './style.css'
import { Route, Link, BrowserRouter as Router, Switch } from 'react-router-dom'
import App from './App'

const routing = (
  <Router>
    <div>
      <Switch>
        <Route exact path="/" component={App} />
        <Route path="/users/:id" component={App} />
        <Route path="/contact" component={App} />
      </Switch>
    </div>
  </Router>
)
ReactDOM.render(routing, document.getElementById('root'))