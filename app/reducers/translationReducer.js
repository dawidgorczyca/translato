import {
  TRANS_PHRASE_INDEX,
  TRANS_CONTENT,
} from '../actions/translationActions'
import update from 'immutability-helper'

const initialState = {
  phraseIndex: -1,
  content: '',
}

export default function translationReducer(state = initialState, action) {
  switch (action.type) {
    case TRANS_PHRASE_INDEX:
      return update(state, { $set: { phraseIndex: action.phraseIndex } })
    case TRANS_CONTENT:
      return update(state, { content: { $set: action.content } })
    default:
      return {
        ...state
      }
  }
}
