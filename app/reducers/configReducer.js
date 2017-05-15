import {
  CONFIG_USERNAME,
  CONFIG_SAVED_PROJECTS,
} from '../actions/configActions'
import update from 'immutability-helper'

const initialState = {
  username: '',
  savedProjects: '',
}

export default function configReducer(state = initialState, action) {
  switch (action.type) {
    case CONFIG_USERNAME:
      return update(state, { $set: { username: action.username } })
    case CONFIG_SAVED_PROJECTS:
      return update(state, { $set: { savedProjects: action.projects } })
    default:
      return {
        ...state
      }
  }
}
