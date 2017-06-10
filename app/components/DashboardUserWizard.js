import React, { Component } from 'react'
import PropTypes from 'prop-types'
import BasicInputComponent from '../components/BasicInputComponent'
import styles from '../containers/DashboardPage.css'

const { app } = require('electron').remote

class DashboardUserWizard extends Component {
  render() {
    return (
      <div className={styles.wizard}>
        <form onSubmit={(event) => this.props.handleSubmit(event)}>
          First, please tell me your name
          <BasicInputComponent
            name="username"
            type="text"
            value={this.props.username}
            onChange={this.props.handleChange}
          />
          <input type="submit" value="Save name" />
        </form>
      </div>
    )
  }
}

DashboardUserWizard.propTypes = {
  username: PropTypes.string.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  handleChange: PropTypes.func,
}

export default DashboardUserWizard
