export const CONFIG_USERNAME = 'CONFIG_USERNAME'
export const CONFIG_SAVED_PROJECTS = 'CONFIG_SAVED_PROJECTS'

export const configSetUsername = (username) => ({
  type: CONFIG_USERNAME,
  username,
})

export const configSetSavedProjects = (projects) => ({
  type: CONFIG_SAVED_PROJECTS,
  projects,
})
