// @flow
import {
  CHANGE_NAME,
  CHANGE_LANGUAGES,
  CHANGE_DATE_ADDED,
  CHANGE_DATE_MODIFIED,
  CHANGE_AUTHOR,
  CHANGE_STATUS,
  CHANGE_MAX_LENGTH,
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
    case CHANGE_NAME:
      return update(state, { $set: { name: action.name } })
    case CHANGE_LANGUAGES:
      return update(state, { languages: { $set: action.languages } })
    case CHANGE_DATE_ADDED:
      return update(state, { $set: { dateAdded: action.date } })
    case CHANGE_DATE_MODIFIED:
      return update(state, { $set: { dateModified: action.date } })
    case CHANGE_AUTHOR:
      return update(state, { $set: { author: action.author } })
    case CHANGE_STATUS:
      return update(state, { $set: { status: action.status } })
    case CHANGE_MAX_LENGTH:
      return update(state, { $set: { maxLength: action.maxLength } })
    default:
      return {
        ...state
      }
  }
}
