import React, { Component } from 'react'
import PropTypes from 'prop-types'
import BasicInputComponent from '../components/BasicInputComponent'
import styles from '../containers/WorkbenchPage.css'
import { Link } from 'react-router-dom'

const { app } = require('electron').remote

// TODO: Search

class TopBarComponent extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }
  render() {
    const props = this.props
    return (
      <div className={styles.workBench__topBar}>
        <Link to="/">
          <span className={styles.topBar__logo}>Translato</span>
        </Link>
        <h3>{props.projectName}</h3>
      </div>
    )
  }
}

TopBarComponent.propTypes = {
  projectName: PropTypes.string.isRequired,
}

TopBarComponent.defaultProps = {
}

export default TopBarComponent
