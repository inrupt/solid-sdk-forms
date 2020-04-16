import data from '@solid/query-ldflex'

export async function getLanguageFromLiteral(subject: String, predicate: String, language: String) {
  // @ts-ignore
  for await (const item of data[subject][predicate]) {
    if (item.language === language || !item.language) {
      return item.value
    }
  }

  return null
}
