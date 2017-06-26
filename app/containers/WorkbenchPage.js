import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import * as ProjectActions from '../actions/projectActions'
import * as ConfigActions from '../actions/configActions'
import * as PhraseActions from '../actions/phraseActions'
import BasicInputComponent from '../components/BasicInputComponent'
import styles from './WorkbenchPage.css'
import TopBarComponent from '../components/TopBarComponent'
import BottomBarComponent from '../components/BottomBarComponent'
import WorkbenchLanguages from '../components/WorkbenchLanguages'

const { app } = require('electron').remote

class WorkbenchPage extends Component {
  constructor(props) {
    super(props)
    this.state = {}
    this.addLanguage = this.addLanguage.bind(this)
  }
  componentWillMount() {
  }
  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value })
  }
  addLanguage(language) {
    this.props.dispatch(ProjectActions.projectAddLanguage(language))
  }
  render() {
    const props = this.props
    const state = this.state
    return (
      <div className={styles.workbenchPage}>
        <TopBarComponent projectName={props.project.config.projectName} />
        <WorkbenchLanguages
          projectBaseLanguage={props.project.config.projectBaseLanguage}
          projectLanguages={props.project.config.projectLanguages}
          addLanguage={(language) => this.addLanguage(language)}
        />
        <BottomBarComponent />
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
