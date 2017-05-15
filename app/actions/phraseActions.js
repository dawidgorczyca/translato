export const PHRASE_NAME = 'PHRASE_NAME'
export const PHRASE_FILENAME = 'PHRASE_FILENAME'
export const PHRASE_EXPORT_SETUP = 'PHRASE_EXPORT_SETUP'
export const PHRASE_DATE_ADDED = 'PHRASE_DATE_ADDED'
export const PHRASE_DATE_MODIFIED = 'PHRASE_DATE_MODIFIED'
export const PHRASE_AUTHOR = 'PHRASE_AUTHOR'
export const PHRASE_STATUS = 'PHRASE_STATUS'
export const PHRASE_MAX_LENGTH = 'PHRASE_MAX_LENGTH'
export const PHRASE_SECTION = 'PHRASE_SECTION'

export const phraseSetName = (name) => ({
  type: PHRASE_NAME,
  name,
})

export const phraseSetLanguages = (languages) => ({
  type: PHRASE_FILENAME,
  languages,
})

export const phraseSetDateAdded = (date) => ({
  type: PHRASE_DATE_ADDED,
  date,
})

export const phraseSetDateModified = (date) => ({
  type: PHRASE_DATE_ADDED,
  date,
})

export const phraseSetAuthor = (author) => ({
  type: PHRASE_AUTHOR,
  author,
})

export const phraseSetStatus = (status) => ({
  type: PHRASE_STATUS,
  status,
})

export const phraseSetMaxLength = (maxLength) => ({
  type: PHRASE_STATUS,
  maxLength,
})

export const phraseSetSection = (section) => ({
  type: PHRASE_SECTION,
  section,
})
