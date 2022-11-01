import React, { useMemo } from 'react'
import { css } from '@emotion/css'

const encodeHTML = (value: string) => {
  return value.replace(/[<>]/g, (matches) => `&#${matches.charCodeAt(0)};`)
}

const unescapeValue = (value: string) => {
  return value.replace(/[[\]{}()?.*\\/]/g, '\\$&')
}

const highlightClassName = css`
  color: #3f37c9;
`

export type TextHighlighterProps = {
  ignoreCase?: boolean
  match?: string | null
  text: string
  highlight?: string | null
}

export const TextHighlighter = React.memo<TextHighlighterProps>((props) => {
  const { ignoreCase = true, match = null, text, highlight } = props

  const content = useMemo(() => {
    const encodedText = encodeHTML(text)

    if (match === null) {
      return encodedText
    }

    const flags = ['g']

    if (ignoreCase) {
      flags.push('i')
    }

    const pattern = new RegExp(unescapeValue(match), flags.join(''))

    return encodedText.replace(
      pattern,
      `<span class="${highlight ? highlight : highlightClassName}">$&</span>`,
    )
  }, [highlight, ignoreCase, match, text])

  // TODO: discuss "dangerouslySetInnerHTML"
  return <span dangerouslySetInnerHTML={{ __html: content }} />
})
