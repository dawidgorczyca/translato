import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import * as ProjectActions from '../actions/projectActions'
import * as ConfigActions from '../actions/configActions'
import * as PhraseActions from '../actions/phraseActions'
import BasicInputComponent from '../components/BasicInputComponent'
import styles from './WorkbenchPage.css'
import TopBarComponent from '../components/TopBarComponent'

const { app } = require('electron').remote

class WorkbenchPage extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }
  componentWillMount() {
  }
  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value })
  }
  render() {
    const props = this.props
    const state = this.state
    return (
      <div className={styles.workbenchPage}>
        <TopBarComponent projectName={props.project.config.projectName} />
      </div>
    )
  }
}

WorkbenchPage.propTypes = {
  dispatch: PropTypes.func.isRequired,
}

const mapStateToProps = (state) => {
  return {
    project: state.projectReducer,
    config: state.configReducer,
  }
}

export default connect(mapStateToProps)(WorkbenchPage)
