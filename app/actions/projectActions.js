export const PROJECT_CONFIG = 'CHANGE_CONFIG'
export const PROJECT_FILENAME = 'CHANGE_FILENAME'
export const PROJECT_EXPORT_SETUP = 'CHANGE_EXPORT_SETUP'
export const LANGUAGE_ADD = 'LANGUAGE_ADD'
export const LANGUAGE_DELETE = 'LANGUAGE_DELETE'

export const projectSetConfig = (config) => ({
  type: PROJECT_CONFIG,
  config,
})

export const projectAddLanguage = (language) => ({
  type: LANGUAGE_ADD,
  language,
})
