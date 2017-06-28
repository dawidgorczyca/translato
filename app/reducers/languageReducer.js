import {
  LANG_NAME,
  TRANSLATION_ADD,
} from '../actions/languageActions'
import translationReducer from './translationReducer'
import update from 'immutability-helper'
import { languageDefaultState } from '../statics/TypesAndDefaults'

// TODO:
// Add/delete translation action

export default function languageReducer(state = languageDefaultState, action) {
  if (action.type.endsWith('/translations')) {
    return update(state, {
      translations: { $set: [
        ...state.translations.slice(0, action.transIndex),
        translationReducer(state.translations[action.transIndex], action),
        ...state.translations.slice(action.transIndex + 1)
      ] }
    })
  }
  switch (action.type) {
    case LANG_NAME:
      return update(state, { $set: { name: action.name } })
    case TRANSLATION_ADD:
      return update(state, { translations: { $push: [action.translation] } })
    default:
      return {
        ...state
      }
  }
}
