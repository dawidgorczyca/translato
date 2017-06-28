export const PROJECT_CONFIG = 'CHANGE_CONFIG'
export const PROJECT_FILENAME = 'CHANGE_FILENAME'
export const PROJECT_EXPORT_SETUP = 'CHANGE_EXPORT_SETUP'
export const LANGUAGE_ADD = 'LANGUAGE_ADD'
export const LANGUAGE_DELETE = 'LANGUAGE_DELETE'
export const PHRASE_ADD = 'PHRASE_ADD'


export const projectSetConfig = (config) => {
  return ({
    type: PROJECT_CONFIG,
    config,
  })
}

export const projectAddLanguage = (language) => {
  return ({
    type: LANGUAGE_ADD,
    language,
  })
}

export const projectDeleteLanguage = (index) => {
  return ({
    type: LANGUAGE_DELETE,
    index,
  })
}

export const projectAddPhrase = (phrase) => {
  return ({
    type: PHRASE_ADD,
    phrase,
  })
}
