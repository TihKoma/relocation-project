import { gql, TypedDocumentNode } from '@apollo/client'

import {
  RelocationDeleteTodo,
  RelocationDeleteTodoVariables,
} from '@/modules/relocation-project/graphql/__generated__/RelocationDeleteTodo'

import {
  RelocationAddTodo,
  RelocationAddTodoVariables,
} from './__generated__/RelocationAddTodo'
import { RelocationDeleteProject } from './__generated__/RelocationDeleteProject'
import {
  RelocationSaveProject,
  RelocationSaveProjectVariables,
} from './__generated__/RelocationSaveProject'
import {
  RelocationTodoChangeStatus,
  RelocationTodoChangeStatusVariables,
} from './__generated__/RelocationTodoChangeStatus'
import {
  RelocationUpdateTodo,
  RelocationUpdateTodoVariables,
} from './__generated__/RelocationUpdateTodo'
import { FRAGMENT_TODO_FIELDS } from './fragments'

export const MUTATION_RELOCATION_SAVE_PROJECT: TypedDocumentNode<
  RelocationSaveProject,
  RelocationSaveProjectVariables
> = gql`
  mutation RelocationSaveProject(
    $input: RelocationSaveUserProjectInput!
    $resetProject: Boolean
  ) {
    relocationSaveProject(input: $input, resetProject: $resetProject) {
      id
      whereFrom
      whereFromRegionId
      whereTo
      whereToRegionId
      isQuizPassed
    }
  }
`

export const MUTATION_RELOCATION_DELETE_PROJECT: TypedDocumentNode<RelocationDeleteProject> = gql`
  mutation RelocationDeleteProject {
    relocationDeleteProject {
      description
      status
    }
  }
`

export const MUTATION_RELOCATION_ADD_TODO: TypedDocumentNode<
  RelocationAddTodo,
  RelocationAddTodoVariables
> = gql`
  mutation RelocationAddTodo($input: RelocationProjectTodoInput!) {
    relocationAddTodo(input: $input) {
      description
      status
    }
  }
`

export const MUTATION_RELOCATION_TODO_CHANGE_STATUS: TypedDocumentNode<
  RelocationTodoChangeStatus,
  RelocationTodoChangeStatusVariables
> = gql`
  mutation RelocationTodoChangeStatus($input: RelocationTodoStatusInput!) {
    relocationTodoChangeStatus(input: $input) {
      description
      status
    }
  }
`

export const MUTATION_RELOCATION_UPDATE_TODO: TypedDocumentNode<
  RelocationUpdateTodo,
  RelocationUpdateTodoVariables
> = gql`
  ${FRAGMENT_TODO_FIELDS}

  mutation RelocationUpdateTodo($input: RelocationProjectTodoInput!) {
    relocationUpdateTodo(input: $input) {
      ...TodoFields
    }
  }
`

export const MUTATION_RELOCATION_DELETE_TODO: TypedDocumentNode<
  RelocationDeleteTodo,
  RelocationDeleteTodoVariables
> = gql`
  mutation RelocationDeleteTodo($todoId: ID!) {
    relocationDeleteTodo(todoId: $todoId) {
      status
    }
  }
`
