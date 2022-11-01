import { FC, useState } from 'react'
import styled from '@emotion/styled'
import {
  Controller,
  ControllerRenderProps,
  FieldValues,
  useForm,
} from 'react-hook-form'

import { Agreement } from '@/components/shared/Agreement'
import { Button } from '@/components/ui-kit/Button'
import { NormalizedButton } from '@/components/ui-kit/Button'
import { FieldInput } from '@/components/ui-kit/form/Input'
import { ArrowIcon } from '@/images/ArrowIcon'
import { useAnalytics } from '@/modules/analytics'
import { fetchConfirmSmsCode } from '@/modules/authorization'
import { lengthLessOrEqualThen, required } from '@/modules/utils/validatores'
import { mobileMedia } from '@/styles/media'

import { Session } from './PhoneRequest'
import { Title as TitleBase } from './Title'

const MAX_CODE_LENGTH = 6

type Code = {
  code: string
}

export type ConfirmSmsCode = Session & Code

type Props = {
  onLoggedIn: () => Promise<void | { userId: string; tags: string | undefined }>
  handleBack: () => void
} & ConfirmSmsCode

export const CodeRequest: FC<Props> = ({
  onLoggedIn,
  session,
  phone,
  code: initCode,
  handleBack,
}) => {
  const [submitError, setSubmitError] = useState('')
  const analytics = useAnalytics()

  const onConfirmSmsCode = async ({ code }: Code) => {
    try {
      analytics?.confirmPhone()
      const { isNewUser } = await fetchConfirmSmsCode({ code, phone, session })
      const userData = await onLoggedIn()
      if (userData) {
        analytics?.login({
          method: 'phone',
          userId: userData.userId,
          userSegmentFilter: userData.tags,
          isNewUser,
        })
      }
    } catch (e) {
      if (typeof e === 'string') {
        setSubmitError(e)
      } else {
        setSubmitError('Error')
        // eslint-disable-next-line no-console
        console.error(e)
      }
    }
  }
  const { control, handleSubmit, formState } = useForm({
    defaultValues: { code: initCode },
  })
  return (
    <>
      <Header>
        <ButtonBack onClick={handleBack}>
          <ArrowIcon direction={'left'} />
        </ButtonBack>
        <Title>Verify Your Identity</Title>
      </Header>
      <Form onSubmit={handleSubmit(onConfirmSmsCode)}>
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
              <FieldCode
                {...input}
                field={
                  input.field as unknown as ControllerRenderProps<
                    FieldValues,
                    string
                  >
                }
                label={'Enter code'}
                data-test-id={'auth-modal'}
                error={input.fieldState.error?.message || submitError}
                maxLength={MAX_CODE_LENGTH}
                type={'number'}
                value={input.field.value}
                onChange={input.field.onChange}
              />
            )
          }}
        />
        <Button
          type={'submit'}
          disabled={!formState.isDirty || formState.isSubmitting} // TODO replace with loading state, when it will be added to design system (formState.isSubmitting)
          // isLoading={formState.isSubmitting}
          viewType={'primary'}
          data-test-id={'auth-modal:confirm-code-button'}
        >
          Confirm
        </Button>
      </Form>
      <Agreement />
    </>
  )
}

const FieldCode = styled(FieldInput)`
  margin-bottom: 10px;
`
const Title = styled(TitleBase)``

const Form = styled.form`
  display: flex;
  flex-direction: column;

  margin-bottom: 41px;

  ${mobileMedia} {
    margin-bottom: 20px;
  }
`
const ButtonBack = styled(NormalizedButton)`
  display: flex;
  align-items: center;

  margin-right: 1.6rem;

  ${mobileMedia} {
    position: absolute;
    top: 28px;
    left: 14px;
  }
`
const Header = styled.div`
  display: flex;
  justify-content: center;

  margin-bottom: 4.4rem;
`
