import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import * as ProjectActions from '../actions/projectActions'
import * as LanguageActions from '../actions/languageActions'
import styles from './WorkbenchPage.css'
import TopBarComponent from '../components/TopBarComponent'
import BottomBarComponent from '../components/BottomBarComponent'
import WorkbenchLanguages from '../components/WorkbenchLanguages'
import WorkbenchPhrases from '../components/WorkbenchPhrases'
import { createFile } from '../utils/file'
import { deepCopy, getDateTime } from '../utils/helpers'
import { projectDefaultState, phraseDefaultState } from '../statics/TypesAndDefaults'

class WorkbenchPage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      languageAdd: 'en'
    }
    this.addLanguage = this.addLanguage.bind(this)
    this.deleteLanguage = this.deleteLanguage.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.addPhrase = this.addPhrase.bind(this)
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.project !== this.props.project) {
      createFile(nextProps.project.config, nextProps.project.phrases)
    }
  }
  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value })
  }
  addLanguage(language) {
    this.props.dispatch(ProjectActions.projectAddLanguage(language))
  }
  deleteLanguage(index) {
    this.props.dispatch(ProjectActions.projectDeleteLanguage(index))
  }
  // TODO:
  // Translation should be based on BindIndexActionCreator
  // Which means that they should be plugged into phrase in the phrase component
  addPhrase() {
    const newPhrase = deepCopy(phraseDefaultState)
    newPhrase.languages.push(this.props.project.config.projectBaseLanguage)
    this.props.project.config.languages.forEach((item) => {
      newPhrase.languages.push(item.name)
      this.props.dispatch(LanguageActions.langTranslationAdd({
        phraseIndex: this.props.project.phrases.length,
        content: '',
      }))
    })
    newPhrase.author = this.props.config.username
    newPhrase.dateAdded = getDateTime()
    this.props.dispatch(ProjectActions.projectAddPhrase(newPhrase))
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
        <WorkbenchPhrases
          phrases={props.project.phrases}
          addPhrase={() => this.addPhrase()}
        />
        <BottomBarComponent />
      </div>
    )
  }
}

WorkbenchPage.propTypes = {
  dispatch: PropTypes.func.isRequired,
  project: PropTypes.shape(projectDefaultState).isRequired,
  config: PropTypes.object.isRequired,
}

const mapStateToProps = (state) => {
  return {
    project: state.projectReducer,
    config: state.configReducer,
  }
}

export default connect(mapStateToProps)(WorkbenchPage)
