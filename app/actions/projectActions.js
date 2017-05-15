export const PROJECT_NAME = 'CHANGE_NAME'
export const PROJECT_FILENAME = 'CHANGE_FILENAME'
export const PROJECT_EXPORT_SETUP = 'CHANGE_EXPORT_SETUP'

export const projectSetName = (name) => ({
  type: PROJECT_NAME,
  name,
})

export const projectSetFilename = (filename) => ({
  type: PROJECT_FILENAME,
  filename,
})

export const projectChangeExportSetup = (exportSetup) => ({
  type: PROJECT_EXPORT_SETUP,
  exportSetup,
})
