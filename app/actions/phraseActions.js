export const PHRASE_NAME = 'phrases/PHRASE_NAME'
export const PHRASE_LANGUAGE = 'phrases/PHRASE_LANGUAGE'
export const PHRASE_EXPORT_SETUP = 'phrases/PHRASE_EXPORT_SETUP'
export const PHRASE_DATE_ADDED = 'phrases/PHRASE_DATE_ADDED'
export const PHRASE_DATE_MODIFIED = 'phrases/PHRASE_DATE_MODIFIED'
export const PHRASE_AUTHOR = 'phrases/PHRASE_AUTHOR'
export const PHRASE_STATUS = 'phrases/PHRASE_STATUS'
export const PHRASE_MAX_LENGTH = 'phrases/PHRASE_MAX_LENGTH'
export const PHRASE_SECTION = 'phrases/PHRASE_SECTION'

export const phraseSetName = (name) => ({
  type: PHRASE_NAME,
  name,
})

export const phraseSetLanguages = (languages) => ({
  type: PHRASE_LANGUAGE,
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
