import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import * as ProjectActions from '../actions/projectActions'
import * as ConfigActions from '../actions/configActions'
import DashboardProjectComponent from '../components/DashboardProjectComponent'
import DashboardUserWizard from '../components/DashboardUserWizard'
import DashboardProjectWizard from '../components/DashboardProjectWizard'
import BasicInputComponent from '../components/BasicInputComponent'
import { dashboardDefaultState } from '../statics/TypesAndDefaults'
import styles from './DashboardPage.css'
import createFile from '../utils/file'

const { app } = require('electron').remote

class DashboardPage extends Component {
  constructor(props) {
    super(props)
    this.state = dashboardDefaultState
    this.saveUsername = this.saveUsername.bind(this)
    this.cleanUsername = this.cleanUsername.bind(this)
    this.cleanProjects = this.cleanProjects.bind(this)
    this.handleWizardSave = this.handleWizardSave.bind(this)
  }
  componentWillMount() {
    if (app.store.data.projects) {
      // TODO:
      // Populate list of saved projects
      console.log(app.store.data.projects)
      this.props.dispatch(ConfigActions.configSetSavedProjects(app.store.data.projects))
    }
    if (app.store.data.username || this.props.config.username) {
      this.props.dispatch(ConfigActions.configSetUsername(app.store.data.username))
      this.setState({ status: 'MainMenu' })
    }
  }
  saveUsername(username) {
    this.setState({ username: username })
    app.store.set('username', username)
    this.props.dispatch(ConfigActions.configSetUsername(username))
  }
  cleanUsername() {
    this.setState({ username: '' })
    app.store.set('username', '')
    this.props.dispatch(ConfigActions.configSetUsername(''))
  }
  cleanProjects() {
    app.store.set('projects', '')
    this.props.dispatch(ConfigActions.configSetSavedProjects([]))
  }
  handleWizardSave(event) {
    if (event) {
      event.preventDefault()
    }
    // TODO: Validation
    this.saveUsername(this.state.username)
    this.setState({ status: 'MainMenu' })
  }
  handleSubmit(event, data, username = this.props.config.username) {
    if (event) {
      event.preventDefault()
    }
    // TODO:
    // Validation
    // Go to workbench
    let projects = this.props.config.savedProjects ? this.props.config.savedProjects : []
    projects.push(data)
    app.store.set('projects', projects)
    this.props.dispatch(ProjectActions.projectSetConfig(data))
    createFile({ ...data, username })
  }
  render() {
    const props = this.props
    const state = this.state
    const renderSection = state.status === 'MainMenu' ?
      (<DashboardProjectWizard
        projects={props.config.savedProjects}
        username={this.props.config.username}
        handleSubmit={(event, data) => this.handleSubmit(event, data)}
        cleanProjects={this.cleanProjects}
        cleanUsername={this.cleanUsername}
      />) :
      (<DashboardUserWizard
        username={this.state.username}
        handleSubmit={this.handleWizardSave}
      />)
    return (
      <div>
        {renderSection}
      </div>
    )
  }
}

DashboardPage.propTypes = {
  dispatch: PropTypes.func.isRequired,
}

const mapStateToProps = (state) => {
  return {
    project: state.projectReducer,
    config: state.configReducer,
  }
}

export default connect(mapStateToProps)(DashboardPage)
