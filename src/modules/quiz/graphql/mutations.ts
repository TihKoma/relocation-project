import { gql, TypedDocumentNode } from '@apollo/client'

import {
  BindQuizToUser,
  BindQuizToUserVariables,
} from '@/modules/quiz/graphql/__generated__/BindQuizToUser'
import {
  DeleteQuiz,
  DeleteQuizVariables,
} from '@/modules/quiz/graphql/__generated__/DeleteQuiz'
import {
  updateQuizWithRegionGroups,
  updateQuizWithRegionGroupsVariables,
} from '@/modules/quiz/graphql/__generated__/updateQuizWithRegionGroups'

import {
  CalcQuizResult,
  CalcQuizResultVariables,
} from './__generated__/CalcQuizResult'
import { createQuiz } from './__generated__/createQuiz'
import {
  UpdateQuizWithBubbles,
  UpdateQuizWithBubblesVariables,
} from './__generated__/UpdateQuizWithBubbles'
import {
  UpdateQuizWithLocations,
  UpdateQuizWithLocationsVariables,
} from './__generated__/UpdateQuizWithLocations'
import {
  UpdateQuizWithMultiSelect,
  UpdateQuizWithMultiSelectVariables,
} from './__generated__/UpdateQuizWithMultiSelect'
import {
  UpdateQuizWithSelect,
  UpdateQuizWithSelectVariables,
} from './__generated__/UpdateQuizWithSelect'
import {
  UpdateQuizWithSlider,
  UpdateQuizWithSliderVariables,
} from './__generated__/UpdateQuizWithSlider'
import {
  FRAGMENT_QUIZ_FIELDS,
  FRAGMENT_QUIZ_RESULT_FIELD,
  Quiz,
} from './fragments'

export const MUTATION_CREATE_QUIZ: TypedDocumentNode<
  Omit<createQuiz, 'createQuiz'> & { createQuiz: Quiz | null }
> = gql`
  ${FRAGMENT_QUIZ_FIELDS}
  mutation createQuiz {
    createQuiz {
      ...QuizFields
    }
  }
`

export const MUTATION_UPDATE_LOCATIONS: TypedDocumentNode<
  UpdateQuizWithLocations,
  UpdateQuizWithLocationsVariables
> = gql`
  mutation UpdateQuizWithLocations(
    $id: ID!
    $stepId: ID!
    $input: QuizStepResultLocationsInput
  ) {
    updateQuizWithLocations(id: $id, stepId: $stepId, input: $input) {
      id
      steps {
        result {
          ... on QuizStepResultLocations {
            features
          }
        }
      }
    }
  }
`

export const MUTATION_UPDATE_BUBBLES: TypedDocumentNode<
  UpdateQuizWithBubbles,
  UpdateQuizWithBubblesVariables
> = gql`
  mutation UpdateQuizWithBubbles(
    $id: ID!
    $stepId: ID!
    $input: QuizStepResultBubblesInput
  ) {
    updateQuizWithBubbles(id: $id, stepId: $stepId, input: $input) {
      id
      steps {
        result {
          ... on QuizStepResultBubbles {
            choices
          }
        }
      }
    }
  }
`

export const MUTATION_UPDATE_SELECT: TypedDocumentNode<
  UpdateQuizWithSelect,
  UpdateQuizWithSelectVariables
> = gql`
  mutation UpdateQuizWithSelect(
    $id: ID!
    $stepId: ID!
    $input: QuizStepResultSelectInput
  ) {
    updateQuizWithSelect(id: $id, stepId: $stepId, input: $input) {
      id
      steps {
        result {
          ... on QuizStepResultSelect {
            filter
            choiceId
          }
        }
      }
    }
  }
`

export const MUTATION_UPDATE_MULTI_SELECT: TypedDocumentNode<
  UpdateQuizWithMultiSelect,
  UpdateQuizWithMultiSelectVariables
> = gql`
  mutation UpdateQuizWithMultiSelect(
    $id: ID!
    $stepId: ID!
    $input: QuizStepResultMultiSelectInput
  ) {
    updateQuizWithMultiSelect(id: $id, stepId: $stepId, input: $input) {
      id
      steps {
        result {
          ... on QuizStepResultMultiSelect {
            filters
            choiceId
          }
        }
      }
    }
  }
`

export const MUTATION_UPDATE_SLIDER: TypedDocumentNode<
  UpdateQuizWithSlider,
  UpdateQuizWithSliderVariables
> = gql`
  mutation UpdateQuizWithSlider(
    $id: ID!
    $stepId: ID!
    $input: QuizStepResultSliderInput
  ) {
    updateQuizWithSlider(id: $id, stepId: $stepId, input: $input) {
      id
      steps {
        result {
          ... on QuizStepResultSlider {
            choiceId
            type
            value
          }
        }
      }
    }
  }
`

export const MUTATION_UPDATE_REGIONGROUPS: TypedDocumentNode<
  updateQuizWithRegionGroups,
  updateQuizWithRegionGroupsVariables
> = gql`
  mutation updateQuizWithRegionGroups(
    $id: ID!
    $stepId: ID!
    $input: QuizStepResultRegionGroupsInput
  ) {
    updateQuizWithRegionGroups(id: $id, stepId: $stepId, input: $input) {
      id
      steps {
        result {
          ... on QuizStepResultRegionGroups {
            regionGroups {
              id
              name
              title
              subtitle
            }
          }
        }
      }
    }
  }
`

export const MUTATION_CALC_QUIZ_RESULT: TypedDocumentNode<
  CalcQuizResult,
  CalcQuizResultVariables
> = gql`
  ${FRAGMENT_QUIZ_RESULT_FIELD}
  mutation CalcQuizResult($id: ID!) {
    calcQuizResult(id: $id) {
      id
      result {
        ...QuizResultField
      }
    }
  }
`

export const MUTATION_DELETE_QUIZ: TypedDocumentNode<
  DeleteQuiz,
  DeleteQuizVariables
> = gql`
  mutation DeleteQuiz($id: ID!) {
    deleteQuiz(id: $id) {
      status
    }
  }
`

export const MUTATION_BIND_QUIZ_TO_USER: TypedDocumentNode<
  BindQuizToUser,
  BindQuizToUserVariables
> = gql`
  mutation BindQuizToUser($quizId: ID!) {
    bindQuizToUser(quizId: $quizId) {
      status
    }
  }
`
