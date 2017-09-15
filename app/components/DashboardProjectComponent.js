import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styles from '../containers/DashboardPage.css'

class DashboardProjectComponent extends Component {
  render() {
    const { project, loadProject, id } = this.props
    return (
      <li key={id} onClick={() => loadProject(id)} role="link">
        <span className={styles.projectList_item__left}>
          {project.projectName}
        </span>
        <span className={styles.projectList_item__right}>
          Author: {project.username} | Base Language: {project.projectBaseLanguage}
        </span>
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
