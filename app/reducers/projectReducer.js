import {
  PROJECT_CONFIG,
  LANGUAGE_ADD,
  LANGUAGE_DELETE } from '../actions/projectActions'
import phraseReducer from './phraseReducer'
import languageReducer from './languageReducer'
import update from 'immutability-helper'
import { projectDefaultState } from '../statics/TypesAndDefaults'

// TODO:
// Add/delete language/phrase action

export default function projectReducer(state = projectDefaultState, action) {
  if (action.type.startsWith('phrases/')) {
    return update(state, {
      phrases: { $set: [
        ...state.phrases.slice(0, action.index),
        phraseReducer(state.phrases[action.index], action),
        ...state.phrases.slice(action.index + 1)
      ] }
    })
  }
  if (action.type.startsWith('languages/')) {
    return update(state, {
      languages: { $set: [
        ...state.languages.slice(0, action.index),
        languageReducer(state.languages[action.index], action),
        ...state.languages.slice(action.index + 1)
      ] }
    })
  }
  switch (action.type) {
    case LANGUAGE_ADD:
      return update(state, { config: { languages: { $push: [action.language] } } })
    case LANGUAGE_DELETE:
      return update(state, { config: { languages: { $splice: [[action.index - 1, 1]] } } })
    case PROJECT_CONFIG:
      return update(state, { $merge: { config: action.config } })
    default:
      return {
        ...state
      }
  }
}
