import { gql } from '@apollo/client'

import { FRAGMENT_PUBLIC_PROFILE_FIELDS } from '@/modules/profile'

export const FRAGMENT_GROUP_FIELDS = gql`
  ${FRAGMENT_PUBLIC_PROFILE_FIELDS}
  fragment GroupFields on Group {
    author {
      ...PublicProfileFields
    }
    avatar
    cover
    createdAt
    description
    id
    members {
      iAmIn
      total
      profiles {
        ...PublicProfileFields
      }
    }
    name
    region {
      id
      name
      city
      country
      subtitle
      slug
      PhotoUrl
    }
    slug
    updatedAt
  }
`
