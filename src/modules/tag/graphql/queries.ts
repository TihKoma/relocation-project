import { gql, TypedDocumentNode } from '@apollo/client'

import {
  TagSuggestions,
  TagSuggestionsVariables,
} from './__generated__/TagSuggestions'

export const QUERY_TAG_SUGGESTIONS: TypedDocumentNode<
  TagSuggestions,
  TagSuggestionsVariables
> = gql`
  query TagSuggestions($query: String!) {
    tagSuggestions(query: $query)
  }
`
