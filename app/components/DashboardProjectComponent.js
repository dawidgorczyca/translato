import React, { Component } from 'react'
import PropTypes from 'prop-types'

class DashboardProjectComponent extends Component {
  render() {
    const { project, loadProject, id } = this.props
    return (
      <div key={id} onClick={() => loadProject(id)} >
        {project.projectName}
        {project.projectBaseLanguage}
      </div>
    )
  }
}

DashboardProjectComponent.propTypes = {
  project: PropTypes.object.isRequired,
  id: PropTypes.number.isRequired,
  loadProject: PropTypes.func.isRequired,
}

export default DashboardProjectComponent
