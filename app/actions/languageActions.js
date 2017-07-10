export const LANG_NAME = 'languages/LANG_NAME'
export const TRANSLATION_ADD = 'languages/TRANSLATION_ADD'

export const langSetName = (name) => {
  return ({
    type: LANG_NAME,
    name,
  })
}

export const langTranslationAdd = (translation) => {
  return ({
    type: TRANSLATION_ADD,
    translation,
  })
}
