// @flow
import {
  PHRASE_NAME,
  PHRASE_LANGUAGES,
  PHRASE_DATE_ADDED,
  PHRASE_DATE_MODIFIED,
  PHRASE_AUTHOR,
  PHRASE_STATUS,
  PHRASE_MAX_LENGTH,
} from '../actions/phraseActions'
import update from 'immutability-helper'

export type phraseStateType = {
  name: string,
  languages: Array<mixed>,
  dateAdded: string,
  dateModified: string,
  author: string,
  status: number,
  maxLength: number,
}

export type actionType = {
  type: string,
  name: string,
  languages: Array<mixed>,
  date: string,
  author: string,
  maxLength: number,
  status: number,
}

const initialState = {
  name: '',
  languages: [],
  dateAdded: '',
  dateModified: '',
  author: '',
  status: 0,
  maxLength: 0,
}

export default function phraseReducer(state: phraseStateType = initialState, action: actionType) {
  switch (action.type) {
    case PHRASE_NAME:
      return update(state, { $set: { name: action.name } })
    case PHRASE_LANGUAGES:
      return update(state, { languages: { $set: action.languages } })
    case PHRASE_DATE_ADDED:
      return update(state, { $set: { dateAdded: action.date } })
    case PHRASE_DATE_MODIFIED:
      return update(state, { $set: { dateModified: action.date } })
    case PHRASE_AUTHOR:
      return update(state, { $set: { author: action.author } })
    case PHRASE_STATUS:
      return update(state, { $set: { status: action.status } })
    case PHRASE_MAX_LENGTH:
      return update(state, { $set: { maxLength: action.maxLength } })
    default:
      return {
        ...state
      }
  }
}
