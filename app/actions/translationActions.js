export const TRANS_PHRASE_INDEX = 'languages/TRANS_PHRASE_INDEX/translations'
export const TRANS_CONTENT = 'languages/TRANS_CONTENT/translations'

export const transSetPhraseIndex = (phraseIndex) => ({
  type: TRANS_PHRASE_INDEX,
  phraseIndex,
})

export const transSetContent = (content, transIndex) => ({
  type: TRANS_CONTENT,
  content,
  transIndex,
})