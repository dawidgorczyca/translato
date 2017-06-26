import React, { Component } from 'react'
import PropTypes from 'prop-types'

class DashboardProjectComponent extends Component {
  render() {
    const { project, loadProject, id } = this.props
    return (
      <li key={id} >
        <span>
          {project.projectName}
          {project.projectBaseLanguage}
        </span>
        <button onClick={() => loadProject(id)}>OPEN</button>
      </li>
    )
  }
}

DashboardProjectComponent.propTypes = {
  project: PropTypes.object.isRequired,
  id: PropTypes.number.isRequired,
  loadProject: PropTypes.func.isRequired,
}

export default DashboardProjectComponent
