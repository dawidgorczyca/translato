import React, { Component } from 'react'
import PropTypes from 'prop-types'

class DashboardProjectComponent extends Component {
  render() {
    return (
      <div key={this.props.id}>
        {this.props.project.projectName}
        {this.props.project.projectBaseLanguage}
      </div>
    )
  }
}

DashboardProjectComponent.propTypes = {
  project: PropTypes.object.isRequired,
  id: PropTypes.number.isRequired,
}

export default DashboardProjectComponent
