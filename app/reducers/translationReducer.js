// @flow
import {
  CHANGE_PHRASE_INDEX,
  CHANGE_CONTENT,
} from '../actions/phraseActions'
import update from 'immutability-helper'

export type translationStateType = {
  phraseIndex: number,
  content: string,
}

type actionType = {
  type: string
}

const initialState = {
  phraseIndex: -1,
  content: '',
}

export default function translationReducer(state: translationStateType = initialState, action: actionType) {
  switch (action.type) {
    case CHANGE_NAME:
      return update(state, { $set: { name: action.name } })
    case CHANGE_PHRASE_INDEX:
      return update(state, { $set: { phraseIndex: action.phraseIndex } })
    default:
      return {
        ...state
      }
  }
}
