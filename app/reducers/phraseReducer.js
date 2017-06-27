import {
  PHRASE_NAME,
  PHRASE_LANGUAGES,
  PHRASE_DATE_ADDED,
  PHRASE_DATE_MODIFIED,
  PHRASE_AUTHOR,
  PHRASE_STATUS,
  PHRASE_MAX_LENGTH,
  PHRASE_SECTION,
} from '../actions/phraseActions'
import update from 'immutability-helper'
import { phraseDefaultState } from '../statics/TypesAndDefaults'

export default function phraseReducer(state = phraseDefaultState, action) {
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
    case PHRASE_SECTION:
      return update(state, { $set: { section: action.section } })
    default:
      return {
        ...state
      }
  }
}
