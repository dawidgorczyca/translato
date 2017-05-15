import { combineReducers } from 'redux'
import { routerReducer as router } from 'react-router-redux'
import projectReducer from './projectReducer'
import configReducer from './configReducer'

export default combineReducers({
  configReducer,
  projectReducer,
  router,
})