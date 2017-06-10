import React, { Component } from 'react'
import PropTypes from 'prop-types'
import BasicInputComponent from '../components/BasicInputComponent'
import styles from '../containers/DashboardPage.css'
import DashboardProjectForm from '../components/DashboardProjectForm'
import DashboardProjectComponent from '../components/DashboardProjectComponent'

class DashboardProjectWizard extends Component {
  constructor(props) {
    super(props)
    this.state = {
      projectsVisible: false,
      projectCreationVisible: false,
    }
    this.toggleCreateProjectForm = this.toggleCreateProjectForm.bind(this)
    this.toggleExistingProjects = this.toggleExistingProjects.bind(this)
  }
  toggleExistingProjects() {
    this.setState({ projectsVisible: !this.state.projectsVisible })
  }
  toggleCreateProjectForm() {
    this.setState({ projectCreationVisible: !this.state.projectCreationVisible })
  }
  renderExistingProjects() {
    return (
      this.props.projects.map((item, index) =>
        <DashboardProjectComponent project={item} id={index} />
      )
    )
  }
  render() {
    const projectForm = this.state.projectCreationVisible ?
      (<DashboardProjectForm
        handleChange={this.props.handleChange}
        handleSubmit={this.props.handleSubmit}
      />) : ''
    const projects = this.state.projectsVisible ? this.renderExistingProjects() : ''
    return (
      <div className={styles.mainMenu}>
        <h2>Hello, {this.props.username}</h2>
        <button onClick={() => this.toggleCreateProjectForm()}>
          New Project
        </button>
        {projectForm}
        <button onClick={() => this.toggleExistingProjects()}>
          Open project
        </button>
        {projects}
        <button onClick={() => this.props.cleanUsername()}>Clean username</button>
        <button onClick={() => this.props.cleanProjects()}>Clean projects</button>
      </div>
    )
  }
}

DashboardProjectWizard.propTypes = {
  username: PropTypes.string.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  cleanUsername: PropTypes.func,
  cleanProjects: PropTypes.func,
  handleChange: PropTypes.func,
  projects: PropTypes.arrayOf(PropTypes.object),
}

export default DashboardProjectWizard
