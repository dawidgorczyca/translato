// @flow
import {
  CHANGE_NAME,
} from '../actions/languageActions'
import translationReducer from './translationReducer'
import update from 'immutability-helper'

export type languageStateType = {
  name: string,
  translations: Array<mixed>,
}

export type actionType = {
  type: string,
  index: number,
  name: string,
}

const initialState = {
  name: '',
  translations: [],
}

export default function languageReducer(state: languageStateType = initialState, action: actionType) {
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
    case CHANGE_NAME:
      return update(state, { $set: { name: action.name } })
    default:
      return {
        ...state
      }
  }
}
