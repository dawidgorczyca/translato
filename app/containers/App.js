import React, { Component } from 'react'
import { Switch, Route } from 'react-router'
import DashboardPage from './DashboardPage'
import CounterPage from './CounterPage'

const { app } = require('electron').remote

export default class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      projects: [],
    }
  }
  componentWillMount() {
    if (app.store.data.projects) {
      this.setState({ projects: app.store.data.projects })
    }
    if (app.store.data.username) {
      this.setState({ username: app.store.data.username })
    }
  }
 
  render() {
    return (
      <div>
        <h1>TRANSLATO</h1>
        <Switch>
          <Route path="/counter" component={CounterPage} />
          <Route
            path="/" component={() =>
              <DashboardPage
                projects={this.state.projects}
                username={this.state.username}
              />}
          />
        </Switch>
      </div>
    )
  }
}
