import React, { Component } from 'react'
import PropTypes from 'prop-types'
import BasicInputComponent from '../components/BasicInputComponent'
import styles from '../containers/DashboardPage.css'

const { app } = require('electron').remote

class DashboardUserWizard extends Component {
  constructor(props) {
    super(props)
    this.state = {
      username: '',
    }
  }
  render() {
    return (
      <div className={styles.dashboard__userWizard}>
        <form onSubmit={(event) => this.props.handleSubmit(event)}>
          <span>First, please tell me your name</span>
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

DashboardUserWizard.defaultProps = {
  handleChange: function handleChange(event) {
    this.setState({ [event.target.name]: event.target.value })
  }
}

export default DashboardUserWizard
