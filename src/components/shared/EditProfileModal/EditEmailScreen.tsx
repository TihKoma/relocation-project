import { VFC } from 'react'
import { useMutation } from '@apollo/client'
import styled from '@emotion/styled'
import {
  Controller,
  ControllerRenderProps,
  FieldValues,
  useForm,
} from 'react-hook-form'

import { Button } from '@/components/ui-kit/Button'
import { FieldInput } from '@/components/ui-kit/form/Input'
import { MUTATION_CHANGE_EMAIL_STEP_1 } from '@/modules/profile/graphql/mutations'

import { BackButton } from './BackButton'
import type { RequestId } from './ConfirmCodeScreen'

export type EmailForm = {
  email: string
}

type Props = {
  onClickBack: () => void
  onComplete: (props: EmailForm & RequestId) => void
  currentEmail?: string
} & EmailForm

const FORM_KEY = 'email'

export const EditEmailScreen: VFC<Props> = ({
  onClickBack,
  currentEmail,
  email,
  onComplete,
}) => {
  const { control, handleSubmit, formState, watch } = useForm({
    defaultValues: { email },
  })

  const value = watch(FORM_KEY)

  const [fetchChangePhone, { error }] = useMutation(
    MUTATION_CHANGE_EMAIL_STEP_1,
  )

  const onSubmit = async ({ email }: { email: string }) => {
    await fetchChangePhone({
      variables: {
        input: {
          newEmail: email,
        },
      },
    }).then((data) => {
      if (data.data?.changeEmailStep1?.id) {
        onComplete({ email, id: data.data.changeEmailStep1.id })
      }
    })
  }

  return (
    <>
      <BackButton onClick={onClickBack}>Edit phone number</BackButton>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Controller
          name={FORM_KEY}
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
                label={'Email'}
                value={input.field.value}
                onChange={input.field.onChange}
                error={input.fieldState.error?.message || error?.message}
              />
            )
          }}
        />
        <Button
          viewType={'primary'}
          size={'large'}
          type={'submit'}
          disabled={currentEmail === value || !value || formState.isSubmitting} // TODO replace with loading state, when it will be added to design system (formState.isSubmitting)
          // isLoading={formState.isSubmitting}
        >
          Confirm
        </Button>
      </Form>
    </>
  )
}

const Form = styled.form`
  padding: 0 2.4rem;

  display: grid;
  gap: 1.1rem;
  align-self: center;
`
