import React, { Component } from 'react'
import { Switch, Route } from 'react-router'
import DashboardPage from './DashboardPage'
import WorkbenchPage from './WorkbenchPage'

export default class App extends Component {
  render() {
    return (
      <div>
        <Switch>
          <Route path="/workbench" component={WorkbenchPage} />
          <Route
            path="/" component={({ history }) =>
              <DashboardPage history={history} />}
          />
        </Switch>
      </div>
    )
  }
}
