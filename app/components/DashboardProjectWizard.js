import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styles from '../containers/DashboardPage.css'
import DashboardProjectForm from '../components/DashboardProjectForm'
import DashboardProjectComponent from '../components/DashboardProjectComponent'

class DashboardProjectWizard extends Component {
  constructor(props) {
    super(props)
    this.state = {
      projectsVisible: false,
      projectCreationVisible: false,
      testToggle: true,
    }
    this.toggleCreateProjectForm = this.toggleCreateProjectForm.bind(this)
    this.toggleExistingProjects = this.toggleExistingProjects.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }
  toggleExistingProjects() {
    this.setState({ projectsVisible: !this.state.projectsVisible })
    this.props.checkIfProjectsExists()
  }
  toggleCreateProjectForm() {
    this.setState({ projectCreationVisible: !this.state.projectCreationVisible })
  }
  renderExistingProjects() {
    const elements = this.props.projects.map((item, index) =>
      <DashboardProjectComponent project={item} id={index} loadProject={this.props.loadProject} key={index} />
    ) 
    return (
      <ul className={styles.projectsList}>
        {elements}
      </ul>
    )
  }
  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value })
  }
  render() {
    const projectForm = this.state.projectCreationVisible ?
      (<DashboardProjectForm
        handleChange={this.props.handleChange}
        handleSubmit={this.props.handleSubmit}
      />) : ''
    const projects = this.state.projectsVisible ? this.renderExistingProjects() : ''
    return (
      <div className={styles.dashboard__mainMenu}>
        <h2>Hello, {this.props.username}</h2>
        <button onClick={() => this.toggleCreateProjectForm()}>
          New Project
        </button>
        {projectForm}
        <button onClick={() => this.toggleExistingProjects()}>
          Open project
        </button>
        {projects}
        <button onClick={() => this.props.setUsername('')}>Clean username</button>
        <button onClick={() => this.props.cleanProjects()}>Clean projects</button>
      </div>
    )
  }
}

DashboardProjectWizard.propTypes = {
  username: PropTypes.string.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  setUsername: PropTypes.func,
  cleanProjects: PropTypes.func,
  handleChange: PropTypes.func,
  projects: PropTypes.arrayOf(PropTypes.object),
  loadProject: PropTypes.func.isRequired,
  checkIfProjectsExists: PropTypes.func.isRequired,
}

export default DashboardProjectWizard
