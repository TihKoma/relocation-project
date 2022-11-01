import { gql } from '@apollo/client'

export const FRAGMENT_REACTIONS_FIELDS = gql`
  fragment ReactionsFields on Reactions {
    angry
    funny
    like
    sad
    super
    total
  }
`
