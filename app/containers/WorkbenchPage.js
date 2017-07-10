import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as ProjectActions from '../actions/projectActions'
import * as LanguageActions from '../actions/languageActions'
import {
  phraseSetName,
  phraseSetLanguages,
  phraseSetDateAdded,
  phraseSetDateModified,
  phraseSetAuthor,
  phraseSetStatus,
  phraseSetMaxLength,
  phraseSetSection,
} from '../actions/phraseActions'
import {
  transSetPhraseIndex,
  transSetContent,
} from '../actions/translationActions'
import {
  langSetName,
  langTranslationAdd,
} from '../actions/languageActions'

import bindIndexToActionCreators from '../reducers/bindIndexToActionCreators'
import styles from './WorkbenchPage.css'
import TopBarComponent from '../components/TopBarComponent'
import BottomBarComponent from '../components/BottomBarComponent'
import WorkbenchLanguages from '../components/WorkbenchLanguages'
import PhraseComponent from '../components/PhraseComponent'
import PhraseLanguageComponent from '../components/PhraseLanguageComponent'
import TranslationComponent from '../components/TranslationComponent'
import { createFile } from '../utils/file'
import { deepCopy, getDateTime, makeArrayUnique } from '../utils/helpers'
import { projectDefaultState, phraseDefaultState } from '../statics/TypesAndDefaults'

class WorkbenchPage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      languageAdd: 'en',
      languages: [],
    }
    this.addLanguage = this.addLanguage.bind(this)
    this.deleteLanguage = this.deleteLanguage.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.addPhrase = this.addPhrase.bind(this)
  }
  componentWillMount() {
    this.storeCurrentLanguages(this.props.project.config.languages)
    this.renderExistingPhrases(this.props.project.config.languages)
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.project !== this.props.project) {
      createFile(nextProps.project.config, nextProps.project.phrases)
    }
    this.storeCurrentLanguages(nextProps.project.config.languages)
  }
  renderExistingPhrases(languages = this.props.project.config.languages, phrasesStored = this.props.project.phrases) {
    if (!languages || !phrasesStored) return false
    let phrasesFound = []
    languages.forEach((language) => {
      if (language.translations.length) {
        language.translations.forEach((translation) => {
          phrasesFound.push(translation.phraseIndex)
        })
      }
    })
    phrasesFound = makeArrayUnique(phrasesFound)
    if (phrasesFound.length !== phrasesStored.length) {
      phrasesFound.forEach((phrase, index) => {
        if (!phrasesStored[index]) {
          this.addPhrase()
        }
      })
    }
  }
  // This might not be needed at all
  storeCurrentLanguages(recievedLanguages) {
    if (recievedLanguages !== this.state.languages) {
      const languages = []
      recievedLanguages.forEach((item) => {
        languages.push(item.name)
      })
      this.setState({ languages })
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
    this.props.project.config.languages.forEach((item) => {
      newPhrase.languages.push(item.name)
    })
    newPhrase.author = this.props.config.username
    newPhrase.dateAdded = getDateTime()
    this.props.dispatch(ProjectActions.projectAddPhrase(newPhrase))
  }
  checkForTranslation(langIndex, transIndex) {
    return !!this.props.project.config.languages[langIndex][transIndex]
  }
  // TODO:
  // -Load existing phrases and translations on project enter
  // -Flush project when going to main menu
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
        {props.project.phrases.map((item, index) =>
          <PhraseComponent
            key={index} id={index} data={item} languages={props.project.config.languages}
            {...phraseDispatchProperties(index)(this.props.dispatch)}
          >
            {item.languages.map((lang, langIndex) =>
              <PhraseLanguageComponent
                key={langIndex}
                id={langIndex}
                name={lang}
                phraseIndex={index}
                checkForTranslation={(id, phraseIndex) => this.checkForTranslation(id, phraseIndex)}
                {...phraseLangDispatchProperties(langIndex)(this.props.dispatch)}
              >
                {this.props.project.config.languages[langIndex] && this.props.project.config.languages[langIndex].translations[index] && (
                  <TranslationComponent
                    transData={this.props.project.config.languages[langIndex].translations[index]}
                    name={`${index}${langIndex}`}
                    phraseIndex={index}
                    {...translationDispatchProperties(langIndex)(this.props.dispatch)}
                  />
                )}
              </PhraseLanguageComponent>
            )}
          </PhraseComponent>
        )}
        <button onClick={this.addPhrase}>Add Phrase</button>
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

const phraseDispatchProperties =
  index =>
    dispatch => bindActionCreators(
      bindIndexToActionCreators({
        phraseSetName,
        phraseSetLanguages,
        phraseSetDateAdded,
        phraseSetDateModified,
        phraseSetAuthor,
        phraseSetStatus,
        phraseSetMaxLength,
        phraseSetSection,
      }, index),
    dispatch)

const translationDispatchProperties =
  index =>
    dispatch => bindActionCreators(
      bindIndexToActionCreators({
        transSetPhraseIndex,
        transSetContent,
      }, index),
    dispatch)

const phraseLangDispatchProperties =
  index =>
    dispatch => bindActionCreators(
      bindIndexToActionCreators({
        langSetName,
        langTranslationAdd,
      }, index),
    dispatch)

export default connect(mapStateToProps)(WorkbenchPage)
