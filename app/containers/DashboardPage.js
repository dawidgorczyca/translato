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
    this.setUsername = this.setUsername.bind(this)
    this.cleanProjects = this.cleanProjects.bind(this)
    this.handleWizardSave = this.handleWizardSave.bind(this)
    this.loadProject = this.loadProject.bind(this)
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
  setUsername(username) {
    this.setState({ username: username })
    app.store.set('username', username)
    this.props.dispatch(ConfigActions.configSetUsername(username))
  }
  cleanProjects() {
    app.store.set('projects', '')
    this.props.dispatch(ConfigActions.configSetSavedProjects([]))
  }
  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value })
  }
  handleWizardSave(event) {
    if (event) {
      event.preventDefault()
    }
    // TODO: Validation
    this.setUsername(this.state.username)
    this.setState({ status: 'MainMenu' })
  }
  handleSubmit(event, data, username = this.props.config.username) {
    if (event) {
      event.preventDefault()
    }
    // TODO:
    // Validation
    let projects = this.props.config.savedProjects ? this.props.config.savedProjects : []
    projects.push(data)
    app.store.set('projects', projects)
    this.props.dispatch(ProjectActions.projectSetConfig(data))
    createFile({ ...data, username })
    this.props.history.push('/workbench')
  }
  loadProject(index) {
    const selectedProject = this.props.config.savedProjects[index]
    this.props.dispatch(ProjectActions.projectSetConfig(selectedProject))
    this.props.history.push('/workbench')
  }
  render() {
    const props = this.props
    const state = this.state
    const renderSection = state.status === 'MainMenu' ?
      (<DashboardProjectWizard
        projects={props.config.savedProjects}
        username={this.props.config.username}
        handleSubmit={(event, data) => this.handleSubmit(event, data)}
        loadProject={this.loadProject}
        cleanProjects={this.cleanProjects}
        cleanUsername={this.cleanUsername}
      />) :
      (<DashboardUserWizard
        username={this.state.username}
        handleSubmit={this.handleWizardSave}
        handleChange={(event) => this.handleChange(event)}
      />)
    return (
      <div className={styles.dashboardPage}>
        <h1>TRANSLATO</h1>
        {renderSection}
      </div>
    )
  }
}

DashboardPage.propTypes = {
  dispatch: PropTypes.func.isRequired,
  history: PropTypes.func.isRequired,
}

const mapStateToProps = (state) => {
  return {
    project: state.projectReducer,
    config: state.configReducer,
  }
}

export default connect(mapStateToProps)(DashboardPage)
