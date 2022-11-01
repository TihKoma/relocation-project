import { gql, TypedDocumentNode } from '@apollo/client'

import { DetectRegion } from './__generated__/DetectRegion'
import {
  QuizResultForRegion,
  QuizResultForRegionVariables,
} from './__generated__/QuizResultForRegion'

export const QUERY_DETECT_REGION: TypedDocumentNode<DetectRegion> = gql`
  query DetectRegion {
    detectRegion {
      slug
    }
  }
`

export const QUERY_QUIZ_RESULT_REGION: TypedDocumentNode<
  QuizResultForRegion,
  QuizResultForRegionVariables
> = gql`
  query QuizResultForRegion($regionId: ID!, $quizId: ID) {
    quizResultForRegion(regionId: $regionId, quizId: $quizId) {
      system
      location {
        badges
        score
        factorsScores {
          name
          image
          score
        }
      }
    }
  }
`
