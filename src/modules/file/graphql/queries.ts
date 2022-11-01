import { gql, TypedDocumentNode } from '@apollo/client'

import {
  GetStaticMapUUID,
  GetStaticMapUUIDVariables,
} from './__generated__/GetStaticMapUUID'

export const QUERY_STATIC_MAP_UUID: TypedDocumentNode<
  GetStaticMapUUID,
  GetStaticMapUUIDVariables
> = gql`
  query GetStaticMapUUID($input: GetStaticMapUUIDInput!) {
    getStaticMapUUID(input: $input) {
      name
      url
    }
  }
`
