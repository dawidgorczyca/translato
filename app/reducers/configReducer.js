import {
  CONFIG_USERNAME,
  CONFIG_SAVED_PROJECTS,
} from '../actions/configActions'
import update from 'immutability-helper'
import { configDefaultState } from '../statics/TypesAndDefaults'

export default function configReducer(state = configDefaultState, action) {
  switch (action.type) {
    case CONFIG_USERNAME:
      return update(state, { $merge: { username: action.username } })
    case CONFIG_SAVED_PROJECTS:
      return update(state, { $merge: { savedProjects: action.projects } })
    default:
      return {
        ...state
      }
  }
}
