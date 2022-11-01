import { gql } from '@apollo/client'

export const FRAGMENT_MEDIA_FIELDS = gql`
  fragment MediaFields on Media {
    url
    type
    description
    sortKey
  }
`
