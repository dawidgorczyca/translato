import React, { Component } from 'react'
import PropTypes from 'prop-types'
import BasicInputComponent from '../components/BasicInputComponent'
import styles from '../containers/WorkbenchPage.css'

class BottomBarComponent extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }
  render() {
    const props = this.props
    return (
      <div className={styles.workBench__bottomBar}>
      </div>
    )
  }
}

BottomBarComponent.propTypes = {}

BottomBarComponent.defaultProps = {}

export default BottomBarComponent
