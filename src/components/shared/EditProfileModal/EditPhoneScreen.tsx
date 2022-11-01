import { VFC } from 'react'
import { ApolloError } from '@apollo/client'
import styled from '@emotion/styled'
import {
  Controller,
  ControllerRenderProps,
  FieldValues,
  useForm,
} from 'react-hook-form'

import { Button } from '@/components/ui-kit/Button'
import { FieldPhoneInput } from '@/components/ui-kit/form/PhoneInput'
import { required } from '@/modules/utils/validatores'
import { mobileMedia } from '@/styles/media'

import { BackButton } from './BackButton'

export type PhoneForm = {
  phone: string
}

type Props = {
  onClickBack: () => void
  currentPhone: string
  className?: string
  onSubmit: (form: { phone: string }) => void
  error?: ApolloError
} & PhoneForm

const FORM_KEY = 'phone'

export const EditPhoneScreen: VFC<Props> = ({
  onClickBack,
  phone,
  onSubmit,
  currentPhone,
  error,
  className,
}) => {
  const { control, handleSubmit, formState, watch } = useForm({
    defaultValues: { phone },
  })

  const value = watch(FORM_KEY)

  return (
    <>
      <BackButton onClick={onClickBack}>Edit phone number</BackButton>
      <Form onSubmit={handleSubmit(onSubmit)} className={className}>
        <Controller
          control={control}
          name={FORM_KEY}
          rules={{
            validate: {
              required: required('Enter the correct number'),
            },
          }}
          render={(input) => {
            return (
              <FieldPhoneInput
                data-test-id={''}
                {...input}
                error={input.fieldState.error?.message || error?.message}
                field={
                  input.field as unknown as ControllerRenderProps<
                    FieldValues,
                    string
                  >
                }
              />
            )
          }}
        />
        <Button
          viewType={'primary'}
          size={'large'}
          type={'submit'}
          disabled={currentPhone === value || formState.isSubmitting} // TODO replace with loading state, when it will be added to design system (formState.isSubmitting)
          // isLoading={formState.isSubmitting}
        >
          Confirm
        </Button>
      </Form>
    </>
  )
}

const Form = styled.form`
  padding: 0 8rem;

  display: grid;
  gap: 1.1rem;
  align-self: center;

  ${mobileMedia} {
    padding: 0 2.4rem;
  }
`
