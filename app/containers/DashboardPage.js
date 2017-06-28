import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import * as ProjectActions from '../actions/projectActions'
import * as ConfigActions from '../actions/configActions'
import DashboardUserWizard from '../components/DashboardUserWizard'
import DashboardProjectWizard from '../components/DashboardProjectWizard'
import { dashboardDefaultState, configDefaultState } from '../statics/TypesAndDefaults'
import styles from './DashboardPage.css'
import { createFile, checkFile, readFile } from '../utils/file'
import { objToArr } from '../utils/helpers'

const { app } = require('electron').remote

class DashboardPage extends Component {
  constructor(props) {
    super(props)
    this.state = dashboardDefaultState
    this.setUsername = this.setUsername.bind(this)
    this.cleanProjects = this.cleanProjects.bind(this)
    this.handleUsernameSave = this.handleUsernameSave.bind(this)
    this.loadProject = this.loadProject.bind(this)
  }
  componentWillMount() {
    this.checkIfProjectsExists()
    if (app.store.data.username || this.props.config.username) {
      this.props.dispatch(ConfigActions.configSetUsername(app.store.data.username))
      this.setState({ status: 'MainMenu' })
    }
  }
  cleanProjects() {
    app.store.set('projects', '')
    this.props.dispatch(ConfigActions.configSetSavedProjects([]))
  }
  checkIfProjectsExists() {
    if (app.store.data.projects) {
      const projects = app.store.data.projects
      app.store.data.projects.forEach((item, index) => {
        if (!checkFile(`${item.projectPath}/${item.projectFilename}.json`)) {
          projects.splice(index, 1)
        } else {
          const projectData = JSON.parse(readFile(`${item.projectPath}/${item.projectFilename}.json`))
          projectData.config.languages = objToArr(projectData.config.languages)
          projects[index] = projectData.config
        }
      })
      app.store.set('projects', projects)
      this.props.dispatch(ConfigActions.configSetSavedProjects(app.store.data.projects))
    }
  }
  setUsername(username) {
    this.setState({ username: username })
    app.store.set('username', username)
    this.props.dispatch(ConfigActions.configSetUsername(username))
  }
  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value })
  }
  handleUsernameSave(event) {
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
    const projects = this.props.config.savedProjects ? this.props.config.savedProjects : []
    projects.push(data)
    app.store.set('projects', projects)
    data.languages.push({ name: data.projectBaseLanguage, translations: [] })
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
        checkIfProjectsExists={() => this.checkIfProjectsExists()}
      />) :
      (<DashboardUserWizard
        username={this.state.username}
        handleSubmit={this.handleUsernameSave}
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
  history: PropTypes.object.isRequired,
  config: PropTypes.shape(configDefaultState).isRequired,
}

const mapStateToProps = (state) => {
  return {
    project: state.projectReducer,
    config: state.configReducer,
  }
}

export default connect(mapStateToProps)(DashboardPage)
