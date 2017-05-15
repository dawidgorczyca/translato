import {
  LANG_NAME,
} from '../actions/languageActions'
import translationReducer from './translationReducer'
import update from 'immutability-helper'

const initialState = {
  name: '',
  translations: [],
}

// TODO:
// Add/delete translation action

export default function languageReducer(state = initialState, action) {
  if (action.type.startsWith('translations/')) {
    return update(state, {
      translations: { $set: [
        ...state.translations.slice(0, action.index),
        translationReducer(state.translations[action.index], action),
        ...state.translations.slice(action.index + 1)
      ] }
    })
  }
  switch (action.type) {
    case LANG_NAME:
      return update(state, { $set: { name: action.name } })
    default:
      return {
        ...state
      }
  }
}
