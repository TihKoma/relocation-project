import { gql, TypedDocumentNode } from '@apollo/client'

import { UploadFile, UploadFileVariables } from './__generated__/UploadFile'

export const MUTATION_UPLOAD_FILE: TypedDocumentNode<
  UploadFile,
  UploadFileVariables
> = gql`
  mutation UploadFile($public: Boolean!, $file: Upload!) {
    uploadFile(public: $public, file: $file) {
      key
      url
    }
  }
`
