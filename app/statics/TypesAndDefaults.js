export const dashboardDefaultState = {
  username: '',
  status: 'initialWizard',
}
export const projectDefaultState = {
  config: {
    projectName: '',
    projectFilename: '',
    projectSaveSetup: 'mono',
    projectBaseLanguage: '',
    languages: [],
  },
  phrases: [],
}

export const configDefaultState = {
  username: '',
  savedProjects: [],
}

export const languageDefaultState = {
  name: '',
  translations: [],
}

export const phraseDefaultState = {
  name: '',
  languages: [],
  dateAdded: '',
  dateModified: '',
  author: '',
  status: 0,
  maxLength: 0,
}
