// @flow
import { CHANGE_NAME, CHANGE_FILENAME, CHANGE_EXPORT_SETUP } from '../actions/projectActions'
import phraseReducer from './phraseReducer'
import languageReducer from './languageReducer'
import update from 'immutability-helper'

export type projectStateType = {
  name: string,
  filename: string,
  exportSetup: exportSetup,
  phrases: Array<mixed>,
  languages: Array<mixed>,
}

export type exportSetup = {
  includeEditionData: boolean,
  splitLanguages: boolean,
  format: string,
}

export type actionType = {
  type: string,
  index: number,
  name: string,
  filename: string,
  exportSetup: exportSetup,
}

const initialState = {
  name: '',
  filename: '',
  exportSetup: {
    includeEditionData: true,
    splitLanguages: false,
    format: 'json',
  },
  phrases: [],
  languages: [],
}

export default function projectReducer(state: projectStateType = initialState, action: actionType) {
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
    case CHANGE_NAME:
      return update(state, { $set: { name: action.name } })
    case CHANGE_FILENAME:
      return update(state, { $set: { filename: action.filename } })
    case CHANGE_EXPORT_SETUP:
      return update(state, { exportSetup: { $merge: action.exportSetup } })
    default:
      return {
        ...state
      }
  }
}
