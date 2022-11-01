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
import { CrossIcon } from '@/images'
import { MUTATION_CHANGE_EMAIL_STEP_1 } from '@/modules/profile/graphql/mutations'
import { mobileMedia } from '@/styles/media'
import { getColorTheme } from '@/styles/themes'

export type EmailForm = {
  id: string
  email: string
}

type Props = {
  onComplete: (props: EmailForm) => void
  onRequestClose: () => void
}

const FORM_KEY = 'email'

export const EnterEmailScreen: FC<Props> = ({ onComplete, onRequestClose }) => {
  const { control, handleSubmit, watch } = useForm({
    defaultValues: { email: '' },
  })

  const value = watch(FORM_KEY)

  const [changeEmail, { error }] = useMutation(MUTATION_CHANGE_EMAIL_STEP_1)

  const onSubmit = async ({ email }: { email: string }) => {
    await changeEmail({
      variables: {
        input: {
          newEmail: email,
        },
      },
    }).then((data) => {
      if (data.data?.changeEmailStep1?.id)
        onComplete({ email, id: data.data.changeEmailStep1.id })
    })
  }

  const errorMessage =
    error?.graphQLErrors[0].extensions.details === 'email already in use' ? (
      <>
        The user with this email already exists. <br /> Please sign in.
      </>
    ) : (
      error?.message
    )

  return (
    <>
      <CloseButton
        size={'small'}
        viewType={'ghost'}
        Icon={<CrossIcon />}
        onClick={() => onRequestClose()}
      />
      <Content>
        <Title>Enter Your Email</Title>
        <SubTitle isError={!!errorMessage}>
          {errorMessage || `Don't miss a gem. Nicity will send new homes`}
        </SubTitle>
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
                  label={'Email Address'}
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
            disabled={!value}
          >
            Confirm
          </Button>
        </Form>

        <Agreement />
      </Content>
    </>
  )
}

const Form = styled.form`
  display: grid;
  gap: 1.1rem;
  align-self: center;

  margin-bottom: 2.4rem;
`
const CloseButton = styled(Button)`
  display: flex;

  margin-right: 1rem;
  margin-left: auto;
`
const Content = styled.div`
  padding: 3rem 6.8rem;

  ${mobileMedia} {
    padding: 3rem 1.6rem;
  }
`
const Title = styled.div`
  margin-bottom: 0.8rem;

  font-weight: 500;
  font-size: 4.2rem;
  line-height: 5.2rem;

  ${mobileMedia} {
    font-size: 3.4rem;
    text-align: center;
  }
`
const SubTitle = styled.div<{ isError?: boolean }>`
  margin-bottom: 2.4rem;

  font-size: 1.6rem;
  line-height: 2rem;

  color: ${({ isError }) => (isError ? getColorTheme('mars') : 'black')};
`
