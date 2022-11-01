import { gql, TypedDocumentNode } from '@apollo/client'

import { RelocationProject } from '@/modules/relocation-project/graphql/__generated__/RelocationProject'

export const QUERY_RELOCATION_PROJECT: TypedDocumentNode<RelocationProject> = gql`
  query RelocationProject {
    relocationProject {
      id
      whereFrom
      whereFromRegionId
      whereTo
      whereToRegionId
      isQuizPassed
    }
  }
`
