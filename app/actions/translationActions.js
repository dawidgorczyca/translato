// @flow
export const TRANS_PHRASE_INDEX = 'TRANS_PHRASE_INDEX'
export const TRANS_CONTENT = 'TRANS_CONTENT'

export const transSetPhraseIndex = (phraseIndex: number) => ({
  type: TRANS_PHRASE_INDEX,
  phraseIndex,
})

export const transSetContent = (content: string) => ({
  type: TRANS_CONTENT,
  content,
})