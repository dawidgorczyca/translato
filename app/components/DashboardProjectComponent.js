import React, { Component } from 'react'
import PropTypes from 'prop-types'

class DashboardProjectComponent extends Component {
  render() {
    return (
      <div>
        {this.props.project.name}
        {this.props.id}
      </div>
    )
  }
}

DashboardProjectComponent.propTypes = {
  project: PropTypes.shape.isRequired,
  id: PropTypes.number.isRequired,
}

export default DashboardProjectComponent
