export const isTag = (word: string): boolean => {
  return (
    word !== '#' &&
    !!word.match(/^#/) &&
    !word.match(/[!.',?\s]+/) &&
    word.length < 100
  )
}
