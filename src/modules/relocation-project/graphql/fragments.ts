import { gql } from '@apollo/client'

import { RelocationProjectTodos_relocationProjectTodos } from './__generated__/RelocationProjectTodos'

export const FRAGMENT_TODO_FIELDS = gql`
  fragment TodoFields on RelocationProjectTodo {
    id
    title
    type
    description
    guides {
      link
      icon
      title
    }
    cta {
      title
      link
      type
    }
    status
    children {
      id
      title
      type
      description
      status
      cta {
        title
        link
        type
      }
      guides {
        link
        icon
        title
      }
    }
  }
`

export type TodoFields = Omit<
  RelocationProjectTodos_relocationProjectTodos,
  '__typename'
>
