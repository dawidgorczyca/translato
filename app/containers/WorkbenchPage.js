import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import * as ProjectActions from '../actions/projectActions'
import styles from './WorkbenchPage.css'
import TopBarComponent from '../components/TopBarComponent'
import BottomBarComponent from '../components/BottomBarComponent'
import WorkbenchLanguages from '../components/WorkbenchLanguages'
import { createFile } from '../utils/file'
import { projectDefaultState } from '../statics/TypesAndDefaults'

class WorkbenchPage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      languageAdd: 'en'
    }
    this.addLanguage = this.addLanguage.bind(this)
    this.deleteLanguage = this.deleteLanguage.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.project !== this.props.project) {
      createFile(nextProps.project.config, nextProps.project.phrases)
    }
  }
  handleChange(event) {
    console.log(event.target.name, event.target.value)
    this.setState({ [event.target.name]: event.target.value })
  }
  addLanguage(language) {
    this.props.dispatch(ProjectActions.projectAddLanguage(language))
  }
  deleteLanguage(index) {
    console.log(index)
    this.props.dispatch(ProjectActions.projectDeleteLanguage(index))
  }
  render() {
    const props = this.props
    return (
      <div className={styles.workbenchPage}>
        <TopBarComponent projectName={props.project.config.projectName} />
        <WorkbenchLanguages
          projectBaseLanguage={props.project.config.projectBaseLanguage}
          projectLanguages={props.project.config.languages}
          addLanguage={(language) => this.addLanguage(language)}
          deleteLanguage={(index) => this.deleteLanguage(index)}
          handleChange={(event) => this.handleChange(event)}
          languageAdd={this.state.languageAdd}
        />
        <BottomBarComponent />
      </div>
    )
  }
}

WorkbenchPage.propTypes = {
  dispatch: PropTypes.func.isRequired,
  project: PropTypes.shape(projectDefaultState).isRequired,
}

const mapStateToProps = (state) => {
  return {
    project: state.projectReducer,
    config: state.configReducer,
  }
}

export default connect(mapStateToProps)(WorkbenchPage)
