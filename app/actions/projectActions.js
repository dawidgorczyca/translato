// @flow
import type { projectStateType, exportSetup } from '../reducers/projectReducer'

export const PROJECT_NAME = 'CHANGE_NAME'
export const PROJECT_FILENAME = 'CHANGE_FILENAME'
export const PROJECT_EXPORT_SETUP = 'CHANGE_EXPORT_SETUP'

export const projectSetName = (name: string) => ({
  type: PROJECT_NAME,
  name,
})

export const projectSetFilename = (filename: string) => ({
  type: PROJECT_FILENAME,
  filename,
})

export const projectChangeExportSetup = (exportSetup: exportSetup) => ({
  type: PROJECT_EXPORT_SETUP,
  exportSetup,
})
