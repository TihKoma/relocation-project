import { useEffect, VFC } from 'react'
import { useMutation, useQuery } from '@apollo/client'
import styled from '@emotion/styled'
import {
  Controller,
  ControllerRenderProps,
  FieldValues,
  FormProvider,
  useForm,
} from 'react-hook-form'

import { Agreement } from '@/components/shared/Agreement'
import { FieldProfilePhoto as FieldProfilePhotoBase } from '@/components/shared/ProfilePhoto'
import { Button } from '@/components/ui-kit/Button'
import { FieldInput } from '@/components/ui-kit/form/Input'
import { useAuthorizationStore } from '@/modules/authorization'
import {
  GraphqlProfile,
  MUTATION_UPDATE_USER_PROFILE,
  QUERY_GET_USER_PROFILE,
} from '@/modules/profile'
import {
  lengthLessOrEqualThen,
  notOnlyEmptySymbols,
  required,
} from '@/modules/utils/validatores'
import { mobileMedia } from '@/styles/media'

type Props = { onSuccess: () => void }

export const ProfileFill: VFC<Props> = ({ onSuccess }) => {
  const [_, { logout }] = useAuthorizationStore()
  const { data: profileQuery } = useQuery(QUERY_GET_USER_PROFILE, {
    ssr: false,
  })

  const profile = profileQuery?.getUserProfile
  const [updateProfile] = useMutation(MUTATION_UPDATE_USER_PROFILE, {
    refetchQueries: [QUERY_GET_USER_PROFILE],
  })
  const methods = useForm({ defaultValues: profile ?? {} })
  const { handleSubmit, setValue, watch } = methods
  useEffect(() => {
    if (profile) {
      methods.reset(profile)
    }
  }, [methods, profile])

  const firstName = watch('firstName')
  const lastName = watch('lastName')

  const onSubmit = handleSubmit(({ firstName, lastName }) => {
    setValue('firstName', firstName.trim())
    setValue('lastName', lastName.trim())
    handleSubmit(
      async ({
        bio,
        birthdate,
        coverUrl,
        firstName,
        gender,
        lastName,
        phone,
        photoUrl,
        userName,
      }: GraphqlProfile) => {
        await updateProfile({
          variables: {
            input: {
              bio,
              birthdate,
              coverUrl,
              firstName,
              gender,
              lastName,
              phone,
              photoUrl,
              userName,
            },
          },
        })
        onSuccess()
      },
    )()
  })

  const isSaveButtonDisabled = !firstName || !lastName

  return (
    <FormProvider {...methods}>
      <Form onSubmit={onSubmit}>
        <Controller
          name={'photoUrl'}
          render={(input) => (
            <FieldProfilePhoto
              {...input}
              field={input.field as ControllerRenderProps<FieldValues, string>}
            />
          )}
        />
        <Controller
          name={'firstName'}
          rules={rules}
          render={(input) => (
            <FieldFirstName
              label={'First Name'}
              value={input.field.value}
              onChange={input.field.onChange}
              {...input}
              field={input.field as ControllerRenderProps<FieldValues, string>}
            />
          )}
        />
        <Controller
          name={'lastName'}
          rules={rules}
          render={(input) => (
            <FieldLastName
              label={'Last Name'}
              value={input.field.value}
              onChange={input.field.onChange}
              {...input}
              field={input.field as ControllerRenderProps<FieldValues, string>}
            />
          )}
        />
        <SaveButton
          viewType={'primary'}
          size={'large'}
          fullWidth
          type={'submit'}
          disabled={isSaveButtonDisabled}
          data-test-id={'fill-profile-modal:submit-button'}
        >
          Save
        </SaveButton>
        <LogOutButton
          viewType={'secondary'}
          size={'large'}
          fullWidth
          data-test-id={'fill-profile-modal:log-out-button'}
          onClick={logout}
        >
          Log out
        </LogOutButton>
        <Agreement />
      </Form>
    </FormProvider>
  )
}
const rules = {
  validate: {
    required: required(),
    lengthLessOrEqualThen: lengthLessOrEqualThen(40),
    notOnlyEmptySymbols: notOnlyEmptySymbols(),
  },
}

const Form = styled.form``
const SaveButton = styled(Button)`
  margin-bottom: 0.8rem;
`
const LogOutButton = styled(Button)`
  margin-bottom: 20px;
`
const FieldFirstName = styled(FieldInput)`
  margin-bottom: 8px;
`
const FieldLastName = styled(FieldInput)`
  margin-bottom: 21px;
  ${mobileMedia} {
    margin-bottom: 8px;
  }
`
const FieldProfilePhoto = styled(FieldProfilePhotoBase)`
  margin: auto;
  margin-bottom: 1.6rem;
`
