import { gql, TypedDocumentNode } from '@apollo/client'

import { AddViewTime, AddViewTimeVariables } from './__generated__/AddViewTime'

export const MUTATION_VIEW_TIME: TypedDocumentNode<
  AddViewTime,
  AddViewTimeVariables
> = gql`
  mutation AddViewTime($input: AddViewTimeInput!) {
    addViewTime(input: $input) {
      id
    }
  }
`

export const MUTATION_VIEW_TIMES = gql`
  mutation AddViewTimes($input: [AddViewTimeInput!]!) {
    addViewTimes(input: $input) {
      id
    }
  }
`
export { ViewTimeEntityType } from './../../../../__generated__/globalTypes'
