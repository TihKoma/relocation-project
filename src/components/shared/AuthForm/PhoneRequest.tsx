import { FC, useEffect, useState } from 'react'
import styled from '@emotion/styled'
import {
  Controller,
  ControllerRenderProps,
  FieldValues,
  useForm,
} from 'react-hook-form'

import { MobileAppContextMenuButton as MobileAppContextMenuButtonBase } from '@/components/screens/ProfileScreen/ProfileLayout/change-pictures/Cover/MobileAppContextMenuButton'
import { Agreement } from '@/components/shared/Agreement'
import { Button, NormalizedButton } from '@/components/ui-kit/Button'
import { FieldPhoneInput as FieldPhoneInputBase } from '@/components/ui-kit/form/PhoneInput'
import { ReactComponent as Facebook } from '@/images/socials/facebook.svg'
import { ReactComponent as Google } from '@/images/socials/google.svg'
import { useAnalytics } from '@/modules/analytics'
import {
  fetchLoginWithFacebook,
  fetchLoginWithGoogle,
  fetchSendSmsCode,
  initializeGoogle,
} from '@/modules/authorization'
import { required } from '@/modules/utils/validatores'
import { mobileMedia, notMobileMedia } from '@/styles/media'

import { Title as TitleBase } from './Title'

type Phone = {
  phone: string
}

export type Session = {
  session: string
} & Phone

type CssSettings = {
  title?: string
  description?: string
  socials?: string
  submitButton?: string
}

type Props = {
  title?: string
  description?: string
  buttonText?: string
  isSocialDescriptionVisible?: boolean
  cssSettings?: CssSettings
  onComplete: (form: Session) => void
  onLoggedIn?: () => Promise<void | {
    userId: string
    tags: string | undefined
  }>
  withMobileContextMenu?: boolean
} & Phone

export const PhoneRequest: FC<Props> = ({
  title = 'Welcome to Nicity',
  description = 'Use your phone number or social accounts to login.',
  buttonText = 'Get confirmation code',
  cssSettings,
  isSocialDescriptionVisible = true,
  onComplete,
  onLoggedIn,
  withMobileContextMenu,
  phone: initPhone,
}) => {
  const [submitError, setSubmitError] = useState('')
  const [isLoginingWithOtherSource, setIsLoginingWithOtherSource] =
    useState(false)
  const analytics = useAnalytics()

  useEffect(() => {
    initializeGoogle()
  }, [])

  const onSendCode = async ({ phone }: Phone) => {
    try {
      const session = await fetchSendSmsCode({ phone })
      onComplete({ phone, session })
      analytics?.sendSMSCode()
    } catch (e) {
      if (typeof e === 'string') {
        setSubmitError(e)
      } else {
        // eslint-disable-next-line no-console
        console.error(e)
      }
    }
  }

  const onFacebookLogin = async () => {
    setIsLoginingWithOtherSource(true)
    try {
      const { isNewUser } = await fetchLoginWithFacebook()
      const userData = await onLoggedIn?.()
      if (userData) {
        analytics?.login({
          method: 'facebook',
          userId: userData.userId,
          userSegmentFilter: userData.tags,
          isNewUser,
        })
      }
    } catch (e) {
      if (typeof e === 'string') {
        setSubmitError(e)
      } else {
        // eslint-disable-next-line no-console
        console.error(e)
      }
    } finally {
      setIsLoginingWithOtherSource(false)
    }
  }

  const onGoogleLogin = async () => {
    setIsLoginingWithOtherSource(true)
    try {
      const { isNewUser } = await fetchLoginWithGoogle()
      const userData = await onLoggedIn?.()
      if (userData) {
        analytics?.login({
          method: 'google',
          userId: userData.userId,
          userSegmentFilter: userData.tags,
          isNewUser,
        })
      }
    } catch (e) {
      if (typeof e === 'string') {
        setSubmitError(e)
      } else {
        setSubmitError('Error ')
        // eslint-disable-next-line no-console
        console.error(e)
      }
    } finally {
      setIsLoginingWithOtherSource(false)
    }
  }
  const { control, handleSubmit, formState } = useForm({
    defaultValues: { phone: initPhone },
  })

  return (
    <>
      <Title as={'h1'} className={cssSettings?.title}>
        {title}
      </Title>
      {withMobileContextMenu && <MobileAppContextMenuButton />}
      <Description className={cssSettings?.description}>
        {description}
      </Description>

      <Form onSubmit={handleSubmit(onSendCode)}>
        <Controller
          name={'phone'}
          control={control}
          rules={{
            validate: {
              required: required('Enter the correct number'),
            },
          }}
          render={(input) => {
            return (
              <FieldPhoneInput
                onChange={input.field.onChange}
                data-test-id={'auth-modal'}
                {...input}
                field={
                  input.field as unknown as ControllerRenderProps<
                    FieldValues,
                    string
                  >
                }
                error={input.fieldState.error?.message || submitError}
              />
            )
          }}
        />
        <Button
          viewType={'primary'}
          size={'large'}
          type={'submit'}
          disabled={
            !formState.isDirty ||
            formState.isSubmitting ||
            isLoginingWithOtherSource
          } // TODO replace with loading state, when it will be added to design system (formState.isSubmitting & isLoginingWithOtherSource)
          // isLoading={formState.isSubmitting || isLoginingWithOtherSource}
          className={cssSettings?.submitButton}
          data-test-id={'auth-modal:send-code-button'}
        >
          {buttonText}
        </Button>
      </Form>
      {isSocialDescriptionVisible && (
        <SocialDescription>or log in / sign up with</SocialDescription>
      )}
      <Socials className={cssSettings?.socials}>
        <SocialButton onClick={onFacebookLogin}>
          <Facebook />
        </SocialButton>
        <SocialButton onClick={onGoogleLogin}>
          <Google />
        </SocialButton>
      </Socials>
      <Agreement />
    </>
  )
}

const FieldPhoneInput = styled(FieldPhoneInputBase)`
  margin-bottom: 12px;
`
const Socials = styled.div`
  display: grid;
  grid-template-columns: repeat(2, min-content);
  grid-auto-flow: column;
  justify-content: center;

  gap: 30px;
  margin: 0 auto 75px;

  ${mobileMedia} {
    margin-bottom: 36px;
  }
`
const SocialButton = styled(NormalizedButton)`
  cursor: pointer;

  svg {
    height: 42px;
  }

  ${mobileMedia} {
    svg {
      height: 36px;
    }
  }
`
const Description = styled.div`
  margin-bottom: 2.4rem;

  letter-spacing: -0.05em;

  ${notMobileMedia} {
    font-size: 18px;
    line-height: 1.4;
  }

  ${mobileMedia} {
    font-size: 16px;
    line-height: 140%;
    text-align: center;

    br {
      display: none;
    }
  }
`
const SocialDescription = styled.div`
  margin-bottom: 2.4rem;

  letter-spacing: -0.05em;
  text-align: center;

  ${notMobileMedia} {
    font-size: 18px;
    line-height: 1.4;
  }

  ${mobileMedia} {
    font-size: 16px;
    line-height: 140%;

    br {
      display: none;
    }
  }
`
const Title = styled(TitleBase)`
  margin-bottom: 10px;
`
const Form = styled.form`
  display: flex;
  flex-direction: column;

  margin-bottom: 3.2rem;

  ${mobileMedia} {
    margin-bottom: 36px;
  }
`
const MobileAppContextMenuButton = styled(MobileAppContextMenuButtonBase)`
  ${notMobileMedia} {
    display: none;
  }

  ${mobileMedia} {
    position: absolute;
    top: 2rem;
    right: 2rem;
  }
`
