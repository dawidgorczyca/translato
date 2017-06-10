export const PROJECT_CONFIG = 'CHANGE_CONFIG'
export const PROJECT_FILENAME = 'CHANGE_FILENAME'
export const PROJECT_EXPORT_SETUP = 'CHANGE_EXPORT_SETUP'

export const projectSetConfig = (config) => ({
  type: PROJECT_CONFIG,
  config,
})
