import { gql, TypedDocumentNode } from '@apollo/client'

import {
  AddViewTimesWithCount,
  AddViewTimesWithCountVariables,
} from './__generated__/AddViewTimesWithCount'

export const MUTATION_ADD_VIEW_TIMES_WITH_COUNT: TypedDocumentNode<
  AddViewTimesWithCount,
  AddViewTimesWithCountVariables
> = gql`
  mutation AddViewTimesWithCount($input: [AddViewTimeInput!]!) {
    addViewTimesWithCount(input: $input) {
      entityID
    }
  }
`
