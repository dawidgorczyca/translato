import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import * as ProjectActions from '../actions/projectActions'
import * as ConfigActions from '../actions/configActions'
import DashboardProjectComponent from '../components/DashboardProjectComponent'
import BasicInputComponent from '../components/BasicInputComponent'
import { dashboardDefaultState } from '../statics/TypesAndDefaults'
import languages from '../statics/languages'
import styles from './DashboardPage.css'

const { app, dialog } = require('electron').remote

class DashboardPage extends Component {
  // TODO:
  // Move project creation form and user wizard to separate components
  // Add filename generator
  constructor(props) {
    super(props)
    this.state = dashboardDefaultState
    this.handleChange = this.handleChange.bind(this)
    this.saveUsername = this.saveUsername.bind(this)
    this.cleanUsername = this.cleanUsername.bind(this)
    this.handleWizardSave = this.handleWizardSave.bind(this)
    this.toggleCreateProjectForm = this.toggleCreateProjectForm.bind(this)
  }
  componentWillMount() {
    if (this.props.username) {
      this.setState({ status: 'MainMenu' })
    }
  } 
  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value })
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
  handleWizardSave(username) {
    // TODO: Validation
    this.saveUsername(username)
    this.setState({ status: 'MainMenu' })
  }
  handleSubmit(event) {
    // TODO:
    // Validation
    // Create files for the project
    // Populate project reducer with the configuration
    // Populate project languages with the base lang
    // Go to workbench
    if (event) {
      event.preventDefault()
    }
    console.log('create a project')
  }
  toggleExistingProjects() {
    this.setState({ projectsVisible: !this.state.projectsVisible })
  }
  toggleCreateProjectForm() {
    this.setState({ projectCreationVisible: !this.state.projectCreationVisible })
  }
  selectProjectPath() {
    dialog.showOpenDialog({
      title: 'Select a folder for your project',
      properties: ['openDirectory']
    }, (folderPaths) => {
      // folderPaths is an array that contains all the selected paths
      if (folderPaths === undefined) {
        console.log('No destination folder selected')
      } else {
        this.setState({ projectPath: folderPaths[0] })
    }
    })
  }
  renderExistingProjects() {
    return (
      this.props.projects.map((item, index) =>
        <DashboardProjectComponent project={item} id={index} />
      )
    )
  }
  renderProjectCreationForm() {
    return (
      <form className={styles.projectCreator} onSubmit={this.handleSubmit}>
        <BasicInputComponent
          label="Project name:"
          name="projectName"
          type="text"
          value={this.state.projectName}
          onChange={this.handleChange}
        />
        <button className={styles.projectCreator_pathButton} onClick={() => this.selectProjectPath()}>
          Select folder for your project
        </button>
        <span className={styles.projectCreator_path}>
          {this.state.projectPath}
        </span>
        <BasicInputComponent
          label="Separate file for each language"
          name="projectSaveSetup"
          type="radio"
          value="multi"
          checked={this.state.projectSaveSetup === 'multi'}
          onChange={this.handleChange}
        />
        <BasicInputComponent
          label="One file for all languages"
          name="projectSaveSetup"
          type="radio"
          value="mono"
          checked={this.state.projectSaveSetup === 'mono'}
          onChange={this.handleChange}
        />
        <BasicInputComponent
          label="Filename:"
          name="projectFilename"
          type="text"
          value={this.state.projectFilename}
          onChange={this.handleChange}
        />
        <BasicInputComponent
          label="Include edition data"
          name="projectIncludeEditData"
          type="checkbox"
          onChange={this.handleChange}
        />
        <BasicInputComponent
          label="Project base language"
          name="projectBaseLanguage"
          type="select"
          options={languages}
          onChange={this.handleChange}
          value={this.state.projectBaseLanguage}
        />
        <input type="submit" value="Create & Save" className={styles.buttonSubmit} />
      </form>
    )
  }
  renderMenu() {
    const projectsVisibility = this.state.projectsVisible ? styles.dropdownOpen : styles.dropdownClosed
    const createProjectForm = this.state.projectCreationVisible ? this.renderProjectCreationForm() : ''
    const existingProjects = this.props.projects.length ? this.renderExistingProjects() : 'Nothing here yet'
    return (
      <div className={styles.mainMenu}>
        <h2>Hello, {this.state.username}</h2>
        <button onClick={() => this.toggleCreateProjectForm()}>
          New Project
        </button>
        {createProjectForm}
        <button onClick={() => this.toggleExistingProjects()}>
          Open project
        </button>
        <div className={projectsVisibility}>
          {existingProjects}
        </div>
        <button onClick={() => this.cleanUsername()}>Clean username</button>
      </div>
    )
  }
  renderInitialWizard() {
    return (
      <div className={styles.wizard}>
        First, please tell me your name
        <BasicInputComponent
          name="username"
          type="text"
          value={this.state.username}
          onChange={this.handleChange}
        />
        <button onClick={() => this.handleWizardSave(this.state.username)}>Save</button>
      </div>
    )
  }
  render() {
    const props = this.props
    const state = this.state
    const renderSection = state.status === 'MainMenu' ? this.renderMenu() : this.renderInitialWizard()
    return (
      <div>
        {renderSection}
      </div>
    )
  }
}

DashboardPage.propTypes = {
  projects: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  dispatch: PropTypes.func.isRequired,
  username: PropTypes.string,
}

DashboardPage.defaultProps = {
  username: ''
}

const mapStateToProps = (state) => {
  return {
    project: state.projectReducer,
    config: state.configReducer,
  }
}

export default connect(mapStateToProps)(DashboardPage)
