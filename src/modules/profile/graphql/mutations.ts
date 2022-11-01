import { gql, TypedDocumentNode } from '@apollo/client'

import {
  VerifyPhoneStep1,
  VerifyPhoneStep1Variables,
} from '@/modules/profile/graphql/__generated__/VerifyPhoneStep1'
import {
  VerifyPhoneStep2,
  VerifyPhoneStep2Variables,
} from '@/modules/profile/graphql/__generated__/VerifyPhoneStep2'

import {
  ChangeEmailStep1,
  ChangeEmailStep1Variables,
} from './__generated__/ChangeEmailStep1'
import {
  ChangeEmailStep2,
  ChangeEmailStep2Variables,
} from './__generated__/ChangeEmailStep2'
import {
  ChangePhoneStep1,
  ChangePhoneStep1Variables,
} from './__generated__/ChangePhoneStep1'
import {
  ChangePhoneStep2,
  ChangePhoneStep2Variables,
} from './__generated__/ChangePhoneStep2'
import {
  UpdateUserProfile,
  UpdateUserProfileVariables,
} from './__generated__/UpdateUserProfile'

export const MUTATION_UPDATE_USER_PROFILE: TypedDocumentNode<
  UpdateUserProfile,
  UpdateUserProfileVariables
> = gql`
  mutation UpdateUserProfile($input: UpdateProfileInput!) {
    updateUserProfile(input: $input) {
      id
      firstName
      lastName
      bio
      phone
      photoUrl
      coverUrl
    }
  }
`
export const MUTATION_VERIFY_PHONE_STEP_1: TypedDocumentNode<
  VerifyPhoneStep1,
  VerifyPhoneStep1Variables
> = gql`
  mutation VerifyPhoneStep1($phoneNumber: String!) {
    verifyPhoneStep1(phoneNumber: $phoneNumber) {
      requestId
    }
  }
`

export const MUTATION_VERIFY_PHONE_STEP_2: TypedDocumentNode<
  VerifyPhoneStep2,
  VerifyPhoneStep2Variables
> = gql`
  mutation VerifyPhoneStep2($verificationCode: VerificationCodeInput!) {
    verifyPhoneStep2(verificationCode: $verificationCode) {
      status
    }
  }
`
export const MUTATION_CHANGE_PHONE_STEP_1: TypedDocumentNode<
  ChangePhoneStep1,
  ChangePhoneStep1Variables
> = gql`
  mutation ChangePhoneStep1($input: ChangePhoneStep1Input!) {
    changePhoneStep1(input: $input) {
      id
    }
  }
`

export const MUTATION_CHANGE_PHONE_STEP_2: TypedDocumentNode<
  ChangePhoneStep2,
  ChangePhoneStep2Variables
> = gql`
  mutation ChangePhoneStep2($input: ChangePhoneStep2Input!) {
    changePhoneStep2(input: $input) {
      result
    }
  }
`

export const MUTATION_CHANGE_EMAIL_STEP_1: TypedDocumentNode<
  ChangeEmailStep1,
  ChangeEmailStep1Variables
> = gql`
  mutation ChangeEmailStep1($input: ChangeEmailStep1Input!) {
    changeEmailStep1(input: $input) {
      id
    }
  }
`

export const MUTATION_CHANGE_EMAIL_STEP_2: TypedDocumentNode<
  ChangeEmailStep2,
  ChangeEmailStep2Variables
> = gql`
  mutation ChangeEmailStep2($input: ChangeEmailStep2Input!) {
    changeEmailStep2(input: $input) {
      result
    }
  }
`
