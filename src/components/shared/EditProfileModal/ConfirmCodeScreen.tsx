import { FC } from 'react'
import { ApolloError } from '@apollo/client'
import styled from '@emotion/styled'
import {
  Controller,
  ControllerRenderProps,
  FieldValues,
  useForm,
} from 'react-hook-form'

import { Button } from '@/components/ui-kit/Button'
import { FieldInput } from '@/components/ui-kit/form/Input'
import { CrossIcon } from '@/images'
import { lengthLessOrEqualThen, required } from '@/modules/utils/validatores'

import { BackButton } from './BackButton'

const MAX_CODE_LENGTH = 6

export type RequestId = {
  id: string
}
export type Code = {
  code: string
}
export type ConfirmCodeForm = RequestId & Code

type Props = {
  onClickBack: () => void
  onRequestClose?: () => void
  title: string
  error?: ApolloError
  placeholder?: string
  onSubmit: (form: { code: string }) => void
}

export const ConfirmCodeScreen: FC<Props> = ({
  onSubmit,
  title,
  error,
  placeholder = 'Enter code',
  onClickBack,
  onRequestClose,
}) => {
  const { control, handleSubmit, formState } = useForm({
    defaultValues: { code: '' },
  })

  return (
    <>
      <Header>
        <BackButton onClick={onClickBack}>{title}</BackButton>

        {onRequestClose && (
          <CloseButton
            size={'small'}
            viewType={'ghost'}
            Icon={<CrossIcon />}
            onClick={() => onRequestClose()}
          />
        )}
      </Header>

      <Form onSubmit={handleSubmit(onSubmit)}>
        <Controller
          name={'code'}
          control={control}
          rules={{
            validate: {
              required: required(),
              lengthLessOrEqualThen: lengthLessOrEqualThen(MAX_CODE_LENGTH),
            },
          }}
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
                label={placeholder}
                error={input.fieldState.error?.message || error?.message}
                maxLength={MAX_CODE_LENGTH}
                type={'number'}
                value={input.field.value}
                onChange={input.field.onChange}
              />
            )
          }}
        />
        <Button
          viewType={'primary'}
          size={'large'}
          type={'submit'}
          disabled={!formState.isDirty || formState.isSubmitting} // TODO replace with loading state, when it will be added to design system (formState.isSubmitting)
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
const CloseButton = styled(Button)`
  display: flex;

  margin-right: 1rem;
  margin-left: auto;
`
const Header = styled.div`
  display: flex;
  align-items: center;
`
