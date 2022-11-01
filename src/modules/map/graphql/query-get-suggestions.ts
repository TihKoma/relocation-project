import { gql, TypedDocumentNode } from '@apollo/client'

import {
  GetSuggestions,
  GetSuggestionsVariables,
} from './__generated__/GetSuggestions'

export const QUERY_GET_SUGGESTIONS: TypedDocumentNode<
  GetSuggestions,
  GetSuggestionsVariables
> = gql`
  query GetSuggestions($query: String!, $searchType: SearchType!) {
    getSuggestions(query: $query, searchType: $searchType) {
      entityId
      suggestion
      slug
    }
  }
`

export { SearchType } from '../../../../__generated__/globalTypes'
export type { GetSuggestions_getSuggestions as Suggestion } from './__generated__/GetSuggestions'
