import { FC } from 'react'
import { useMutation } from '@apollo/client'
import styled from '@emotion/styled'
import {
  Controller,
  ControllerRenderProps,
  FieldValues,
  useForm,
} from 'react-hook-form'

import { Agreement } from '@/components/shared/Agreement'
import { Button } from '@/components/ui-kit/Button'
import { FieldInput } from '@/components/ui-kit/form/Input'
import { MUTATION_UPDATE_USER_PROFILE } from '@/modules/profile'
import { GetUserProfile_getUserProfile } from '@/modules/profile/__generated__/GetUserProfile'
import { MUTATION_CHANGE_EMAIL_STEP_1 } from '@/modules/profile/graphql/mutations'
import { mobileMedia } from '@/styles/media'

const FORM_KEY_FIRST_NAME = 'firstName'
const FORM_KEY_LAST_NAME = 'lastName'
const FORM_KEY_EMAIL = 'email'

type UserDataForm = {
  firstName: string
  lastName: string
}

type EmailForm = {
  id: string
  email: string
}

type OnSubmit = (input: UserDataForm & { email: string }) => Promise<void>

type Props = {
  profile: GetUserProfile_getUserProfile | null | undefined
  onComplete: (props: EmailForm) => void
}

export const EnterUserDataScreen: FC<Props> = ({ profile, onComplete }) => {
  const [updateUserProfile] = useMutation(MUTATION_UPDATE_USER_PROFILE)
  const [changeEmail] = useMutation(MUTATION_CHANGE_EMAIL_STEP_1)

  const { control, handleSubmit, watch, setError } = useForm({
    defaultValues: { firstName: '', lastName: '', email: '' },
  })

  const firstName = watch(FORM_KEY_FIRST_NAME)
  const lastName = watch(FORM_KEY_LAST_NAME)
  const email = watch(FORM_KEY_EMAIL)

  const onSubmit: OnSubmit = async ({ firstName, lastName, email }) => {
    const updateProfileRequest = updateUserProfile({
      variables: {
        input: {
          firstName,
          lastName,
          bio: profile?.bio || '',
          coverUrl: profile?.coverUrl || '',
          phone: profile?.phone || '',
          photoUrl: profile?.photoUrl || '',
          userName: profile?.userName || '',
        },
      },
    })

    const changeEmailRequest = changeEmail({
      variables: {
        input: {
          newEmail: email,
        },
      },
    })

    const data = await Promise.allSettled([
      updateProfileRequest,
      changeEmailRequest,
    ])

    const { status: updateProfileStatus } = data[0]
    const { status: changeEmailStatus } = data[1]

    if (
      updateProfileStatus === 'fulfilled' &&
      changeEmailStatus === 'fulfilled' &&
      data[1]?.value?.data?.changeEmailStep1?.id
    ) {
      onComplete({ email, id: data[1].value?.data?.changeEmailStep1?.id })
      return
    }

    if (updateProfileStatus === 'rejected')
      setError(FORM_KEY_FIRST_NAME, { message: 'error updating user data' })

    if (changeEmailStatus === 'rejected')
      setError(FORM_KEY_EMAIL, {
        message:
          data[1].reason?.graphQLErrors[0]?.extensions?.details ||
          'error updating email',
      })
  }

  return (
    <Content>
      <Title>Enter Your Name and Email</Title>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Controller
          name={FORM_KEY_FIRST_NAME}
          control={control}
          render={(input) => {
            return (
              <FieldInput
                {...input}
                field={
                  input.field as unknown as ControllerRenderProps<
                    FieldValues,
                    string
                  >
                }
                label={'First name'}
                value={input.field.value}
                onChange={input.field.onChange}
                error={input.fieldState.error?.message}
              />
            )
          }}
        />
        <Controller
          name={FORM_KEY_LAST_NAME}
          control={control}
          render={(input) => {
            return (
              <FieldInput
                {...input}
                field={
                  input.field as unknown as ControllerRenderProps<
                    FieldValues,
                    string
                  >
                }
                label={'Last name'}
                value={input.field.value}
                onChange={input.field.onChange}
                error={input.fieldState.error?.message}
              />
            )
          }}
        />
        <Controller
          name={FORM_KEY_EMAIL}
          control={control}
          render={(input) => {
            return (
              <FieldInput
                {...input}
                field={
                  input.field as unknown as ControllerRenderProps<
                    FieldValues,
                    string
                  >
                }
                label={'Email address'}
                value={input.field.value}
                onChange={input.field.onChange}
                error={input.fieldState.error?.message}
              />
            )
          }}
        />

        <Button
          viewType={'primary'}
          size={'large'}
          type={'submit'}
          disabled={!firstName || !email || !lastName}
        >
          Confirm
        </Button>
      </Form>

      <Agreement />
    </Content>
  )
}

const Form = styled.form`
  display: grid;
  gap: 1.1rem;
  align-self: center;

  margin-bottom: 2.4rem;
`
const Content = styled.div`
  padding: 3rem 6.8rem;

  ${mobileMedia} {
    padding: 5rem 1.6rem;
  }
`
const Title = styled.div`
  margin-bottom: 2.4rem;

  font-weight: 500;
  font-size: 4.2rem;
  line-height: 5.2rem;

  ${mobileMedia} {
    font-size: 2.2rem;
    text-align: center;
  }
`
