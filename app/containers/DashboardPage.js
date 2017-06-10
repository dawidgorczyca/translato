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
  // TODO:
  // Add filename generator
  constructor(props) {
    super(props)
    this.state = dashboardDefaultState
    this.saveUsername = this.saveUsername.bind(this)
    this.cleanUsername = this.cleanUsername.bind(this)
    this.handleWizardSave = this.handleWizardSave.bind(this)
  }
  componentWillMount() {
    if (app.store.data.projects) {
      // TODO:
      // Set up a project based on saved data/files
      console.log(app.store.data.projects)
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
  handleWizardSave(event) {
    if (event) {
      event.preventDefault()
    }
    // TODO: Validation
    this.saveUsername(this.state.username)
    this.setState({ status: 'MainMenu' })
  }
  handleSubmit(event, data) {
    if (event) {
      event.preventDefault()
    }
    // TODO:
    // Validation
    // Create files for the project
    // Populate project reducer with the configuration
    // Populate project languages with the base lang
    // Go to workbench
    createFile(data.projectPath, data.projectFilename, data.projectName)
  }
  render() {
    const props = this.props
    const state = this.state
    const projectsVisibility = this.state.projectsVisible ? styles.dropdownOpen : styles.dropdownClosed
    const renderSection = state.status === 'MainMenu' ?
      (<DashboardProjectWizard
        projectsVisibility={projectsVisibility}
        username={this.props.config.username}
        handleSubmit={this.handleSubmit}
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
