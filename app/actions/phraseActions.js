// @flow
import type { phraseStateType } from '../reducers/phraseReducer'

export const PHRASE_NAME = 'PHRASE_NAME'
export const PHRASE_FILENAME = 'PHRASE_FILENAME'
export const PHRASE_EXPORT_SETUP = 'PHRASE_EXPORT_SETUP'
export const PHRASE_DATE_ADDED = 'PHRASE_DATE_ADDED'
export const PHRASE_DATE_MODIFIED = 'PHRASE_DATE_MODIFIED'
export const PHRASE_AUTHOR = 'PHRASE_AUTHOR'
export const PHRASE_STATUS = 'PHRASE_STATUS'
export const PHRASE_MAX_LENGTH = 'PHRASE_MAX_LENGTH' 

export const phraseSetName = (name: string) => ({
  type: PHRASE_NAME,
  name,
})

export const phraseSetLanguages = (languages: Array<mixed>) => ({
  type: PHRASE_FILENAME,
  languages,
})

export const phraseSetDateAdded = (date: string) => ({
  type: PHRASE_DATE_ADDED,
  date,
})

export const phraseSetDateModified = (date: string) => ({
  type: PHRASE_DATE_ADDED,
  date,
})

export const phraseSetAuthor = (author: string) => ({
  type: PHRASE_AUTHOR,
  author,
})

export const phraseSetStatus = (status: number) => ({
  type: PHRASE_STATUS,
  status,
})

export const phraseSetMaxLength = (maxLength: number) => ({
  type: PHRASE_STATUS,
  maxLength,
})
