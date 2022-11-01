import parser from 'accept-language-parser'

export function parseLanguage(acceptLanguage: string) {
  const [language] = parser.parse(acceptLanguage)
  return language
}
