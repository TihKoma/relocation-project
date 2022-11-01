import { gql, TypedDocumentNode } from '@apollo/client'

import {
  RelocationProjectTodos,
  RelocationProjectTodosVariables,
} from './__generated__/RelocationProjectTodos'
import { FRAGMENT_TODO_FIELDS } from './fragments'

export const QUERY_RELOCATION_PROJECT_TODOS: TypedDocumentNode<
  RelocationProjectTodos,
  RelocationProjectTodosVariables
> = gql`
  ${FRAGMENT_TODO_FIELDS}

  query RelocationProjectTodos($input: RelocationProjectTodosInput!) {
    relocationProjectTodos(input: $input) {
      ...TodoFields
    }
  }
`
