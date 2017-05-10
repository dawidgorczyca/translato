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

export type actionType = {
  type: string,
  phraseIndex: number,
  content: string,
}

const initialState = {
  phraseIndex: -1,
  content: '',
}

export default function translationReducer(state: translationStateType = initialState, action: actionType) {
  switch (action.type) {
    case CHANGE_PHRASE_INDEX:
      return update(state, { $set: { phraseIndex: action.phraseIndex } })
    case CHANGE_CONTENT:
      return update(state, { $set: { content: action.content } })
    default:
      return {
        ...state
      }
  }
}
