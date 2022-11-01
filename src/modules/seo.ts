// docs about texts
// https://www.notion.so/nicity/Pages-titles-meta-h1-8aaa24da8406431dbb2be0768cd70e6f#5d06f614f9424b02aec60c5f4c056995
import styled from '@emotion/styled'

export const DEFAULT_OG_IMAGE =
  'https://nicity-prod-public.s3.amazonaws.com/share/share-nicity-default.png'

export const TWITTER_IMAGE_URL =
  'https://nicity-prod-public.s3.amazonaws.com/share/share-nicity-twitter.png'

export const generateTexByTemplate = (
  nameReplaceable: string,
  valueReplaceable: string,
  template: string,
) => {
  return template.replace(
    new RegExp(`{${nameReplaceable}}`, 'g'),
    valueReplaceable,
  )
}

export const H1 = styled.h1`
  margin: 0;
  padding: 0;
`
