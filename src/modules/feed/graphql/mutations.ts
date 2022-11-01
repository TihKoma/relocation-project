import { gql, TypedDocumentNode } from '@apollo/client'

import {
  SendComplaint,
  SendComplaintVariables,
} from './__generated__/SendComplaint'

export const MUTATION_SEND_COMPLAIN: TypedDocumentNode<
  SendComplaint,
  SendComplaintVariables
> = gql`
  mutation SendComplaint($input: CreateComplaintInput!) {
    sendComplaint(input: $input) {
      status
    }
  }
`
