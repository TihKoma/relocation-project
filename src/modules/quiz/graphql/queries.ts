import { gql, TypedDocumentNode } from '@apollo/client'

import {
  FindQuizRegionGroups,
  FindQuizRegionGroupsVariables,
} from '@/modules/quiz/graphql/__generated__/FindQuizRegionGroups'

import { Quiz as QuizQuery, QuizVariables } from './__generated__/Quiz'
import {
  QuizResultByBBox,
  QuizResultByBBoxVariables,
} from './__generated__/QuizResultByBBox'
import { UserCalculatedQuizzes } from './__generated__/UserCalculatedQuizzes'
import { FRAGMENT_QUIZ_FIELDS, Quiz } from './fragments'

export const QUERY_QUIZ: TypedDocumentNode<
  Omit<QuizQuery, 'quiz'> & { quiz: Quiz | null },
  QuizVariables
> = gql`
  ${FRAGMENT_QUIZ_FIELDS}
  query Quiz($id: ID!, $position: Int!, $limit: Int!) {
    quiz(id: $id, position: $position, limit: $limit) {
      ...QuizFields
    }
  }
`

export const QUERY_QUIZ_BY_BBOX: TypedDocumentNode<
  QuizResultByBBox,
  QuizResultByBBoxVariables
> = gql`
  ${FRAGMENT_QUIZ_FIELDS}
  query QuizResultByBBox(
    $quizId: ID!
    $bbox: BBoxInput!
    $zoomLevel: Int!
    $position: Int!
    $limit: Int!
  ) {
    quizResultByBBox(
      quizId: $quizId
      bbox: $bbox
      zoomLevel: $zoomLevel
      position: $position
      limit: $limit
    ) {
      quiz {
        ...QuizFields
      }
      regions
    }
  }
`

export const FRAGMENT_QUIZ_VIEW_CHOSE = gql`
  fragment QuizViewChose on Quiz {
    id
    userId
    state
    steps {
      id
      type
      entity
      payload {
        ... on QuizStepBubbles {
          bubbles {
            choiceId
            title
          }
        }
        ... on QuizStepSelect {
          options {
            value
            tabName
          }
        }
        ... on QuizStepMultiSelect {
          options {
            value
            tabName
          }
        }
        ... on QuizStepTabSliders {
          name
        }
        ... on QuizStepRegionGroups {
          name
        }
      }
      result {
        ... on QuizStepResultLocations {
          features
        }
        ... on QuizStepResultBubbles {
          choices
        }
        ... on QuizStepResultSelect {
          filter
        }
        ... on QuizStepResultMultiSelect {
          filters
        }
        ... on QuizStepResultSlider {
          value
        }
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
    result {
      searchAreas
    }
  }
`
// TODO: add correct type
export type QuizViewChose = Quiz
export const QUERY_QUIZZES: TypedDocumentNode<
  Omit<UserCalculatedQuizzes, 'userCalculatedQuizzes'> & {
    userCalculatedQuizzes: QuizViewChose[] | null
  },
  never
> = gql`
  ${FRAGMENT_QUIZ_VIEW_CHOSE}
  query UserCalculatedQuizzes {
    userCalculatedQuizzes {
      ...QuizViewChose
    }
  }
`

export const FIND_QUIZ_REGION_GROUPS: TypedDocumentNode<
  FindQuizRegionGroups,
  FindQuizRegionGroupsVariables
> = gql`
  query FindQuizRegionGroups($query: String!) {
    findQuizRegionGroups(query: $query) {
      id
      name
      title
      subtitle
    }
  }
`
