import LinkifyIt from 'linkify-it'

import { ROUTES } from '@/modules/router'

const linkify = new LinkifyIt()

const hashtagRegExp = new RegExp(/^([a-zа-я\d-_]){1,100}/i)

linkify.add('#', {
  validate: hashtagRegExp,
  normalize: (match) => {
    match.url = ROUTES.tagFeed.calcUrl({
      tag: match.text.replace('#', ''),
    })
  },
})

export const linkifyText = (text: string): (string | LinkifyIt.Match)[] => {
  const elements = []
  let lastIndex = 0

  linkify.match(text)?.forEach((match) => {
    if (match.index > lastIndex) {
      elements.push(text.substring(lastIndex, match.index))
    }

    elements.push(match)
    lastIndex = match.lastIndex
  })

  if (text.length > lastIndex) {
    elements.push(text.substring(lastIndex))
  }

  return elements
}

export const getMatchInPosition = (
  text: string,
  position: number,
): LinkifyIt.Match | null => {
  const tagMatches = linkify.match(text)
  if (!tagMatches?.length) {
    return null
  }
  for (const match of tagMatches) {
    if (match.index < position && position <= match.lastIndex) {
      return match
    }
  }
  return null
}
