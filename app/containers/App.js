import React, { Component } from 'react'
import { Switch, Route } from 'react-router'
import DashboardPage from './DashboardPage'
import CounterPage from './CounterPage'

export default class App extends Component {
  render() {
    return (
      <div>
        <h1>TRANSLATO</h1>
        <Switch>
          <Route path="/counter" component={CounterPage} />
          <Route
            path="/" component={() =>
              <DashboardPage />}
          />
        </Switch>
      </div>
    )
  }
}
