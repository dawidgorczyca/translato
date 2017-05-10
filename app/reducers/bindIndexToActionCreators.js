// @flow
const transformObjectValues = (obj, fn) => {
  let transformed = {}
  Object.keys(obj).forEach(key => {
    transformed[key] = fn(obj[key])
  })
  return transformed
}

const bindActionCreator = (actionCreator, index) =>
  (...args: any) => Object.assign(actionCreator(...args), { index })

const bindActionCreatorMap = (creators, index) =>
  transformObjectValues(creators, actionCreator => bindActionCreator(actionCreator, index))

const bindIndexToActionCreators = (actionCreators: Function, index: number) => {
  return typeof actionCreators === 'function'
    ? bindActionCreator(actionCreators, index)
    : bindActionCreatorMap(actionCreators, index)
}

export default bindIndexToActionCreators
