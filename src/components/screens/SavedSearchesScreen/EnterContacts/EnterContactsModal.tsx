import { FC, useEffect, useRef, useState } from 'react'
import {
  ApolloQueryResult,
  useApolloClient,
  useMutation,
  useQuery,
} from '@apollo/client'
import styled from '@emotion/styled'

import { ConfirmCodeScreen } from '@/components/shared/EditProfileModal/ConfirmCodeScreen'
import { showSuccessToast } from '@/components/shared/Toast'
import { ModalPortal } from '@/components/ui-kit/Modal'
import { fetchConfirmSmsCode } from '@/modules/authorization'
import { useCookieController } from '@/modules/cookie'
import { QUERY_GET_USER_PROFILE } from '@/modules/profile'
import {
  GetUserProfile,
  GetUserProfile_getUserProfile,
} from '@/modules/profile/__generated__/GetUserProfile'
import {
  MUTATION_CHANGE_EMAIL_STEP_2,
  MUTATION_CHANGE_PHONE_STEP_2,
} from '@/modules/profile/graphql/mutations'
import { filterUserSegment } from '@/modules/utils/filter-user-segment'
import { mobileMedia, notMobileMedia } from '@/styles/media'
import { getColorTheme } from '@/styles/themes'

import { EmailForm, EnterEmailScreen } from './EnterEmailScreen'
import { EnterPhoneScreen, PhoneForm } from './EnterPhoneScreen'
import { EnterUserDataScreen } from './EnterUserDataScreen'

export type ContactScreen =
  | 'none'
  | 'user-data-enter' // firstName, lastName, email
  | 'phone-enter'
  | 'email-enter'
  | 'phone-code'
  | 'email-code'

type Code = {
  code: string
}

type Props = {
  defaultScreen: ContactScreen
  onRequestClose: (isSuccessAuth?: boolean) => void

  onSuccessAuth?: () => void | Promise<void>
  onSuccessConfirmEmail?: () => void
}
type FieldsWithVerification = Code & EmailForm & PhoneForm

export const EnterContactsModal: FC<Props> = ({
  defaultScreen,
  onRequestClose,
  onSuccessAuth,
  onSuccessConfirmEmail,
}) => {
  const [isSuccessAuth, setIsSuccessAuth] = useState(false)
  const [screen, setScreen] = useState<ContactScreen>(defaultScreen)
  const prevScreen = useRef<ContactScreen>('none')

  useEffect(
    () => () => {
      prevScreen.current = screen
    },
    [screen],
  )

  const [form, setForm] = useState<Partial<FieldsWithVerification>>({})
  const client = useApolloClient()
  const cookie = useCookieController()

  const {
    data: userProfile,
    loading: isProfileLoading,
    refetch: refetchGetUserProfile,
  } = useQuery(QUERY_GET_USER_PROFILE, {
    fetchPolicy: 'no-cache',
  })

  const { onPhoneSubmit, codeError, onCodeSubmit, onEmailChangeComplete } =
    useVerification(screen, setScreen, form, setForm, refetchGetUserProfile)

  const profile = userProfile?.getUserProfile

  useEffect(() => {
    if (isProfileLoading) return

    const { phone, firstName, lastName, email } = profile || {}
    const nextScreen = getNextScreen(profile)
    const isAuth = !!(phone && firstName && lastName)

    if (isAuth) {
      setIsSuccessAuth(true)
      if (email) {
        onSuccessConfirmEmail?.()
      }
    }

    if (nextScreen !== 'none') {
      setScreen(nextScreen)
    } else {
      if (isAuth && screen === 'phone-code') {
        onSuccessAuth?.()
      }
      onRequestClose(isAuth)
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [profile, onSuccessConfirmEmail, onRequestClose, isProfileLoading])

  const onCloseForm = () => {
    if (screen !== 'user-data-enter') onRequestClose(isSuccessAuth)
  }

  const onLoggedIn = async () => {
    const { data } = await client.query({
      query: QUERY_GET_USER_PROFILE,
    })

    const profile = data.getUserProfile

    if (profile) {
      await onSuccessAuth?.()
      onRequestClose(true)

      const tag = filterUserSegment(profile.tags)
      if (tag !== undefined) {
        cookie.set('user_segment_filter', tag)
        cookie.set('user_id', profile.userId)
      }
      return { userId: profile.userId, tags: tag }
    }
  }

  return (
    <ModalPortal isVisible onRequestClose={onCloseForm}>
      <Container>
        {screen === 'user-data-enter' ? (
          <EnterUserDataScreen
            profile={profile}
            onComplete={(form: EmailForm) => {
              onEmailChangeComplete(form)
              setIsSuccessAuth(true)
              onSuccessAuth?.()
            }}
          />
        ) : screen === 'phone-enter' ? (
          <EnterPhoneScreen
            onSubmit={onPhoneSubmit}
            onRequestClose={onCloseForm}
            onLoggedIn={onLoggedIn}
          />
        ) : screen === 'email-enter' ? (
          <EnterEmailScreen
            onComplete={onEmailChangeComplete}
            onRequestClose={onCloseForm}
          />
        ) : screen === 'email-code' || screen === 'phone-code' ? (
          <ConfirmCodeScreen
            title={'Verify Your Identity'}
            placeholder={
              screen === 'email-code'
                ? 'Enter code from email'
                : 'Enter code from SMS'
            }
            error={codeError}
            onSubmit={onCodeSubmit}
            onClickBack={() => {
              setScreen(prevScreen.current)
            }}
            onRequestClose={onCloseForm}
          />
        ) : null}
      </Container>
    </ModalPortal>
  )
}

const Container = styled.div`
  display: grid;
  grid-template-rows: auto 1fr;
  align-items: center;

  height: 100%;
  padding: 1rem 0;

  background-color: ${getColorTheme('earth')};
  overflow: hidden;

  ${notMobileMedia} {
    max-height: calc(100% - 32px);
    width: 51.6rem;

    border-radius: 16px;
  }

  ${mobileMedia} {
    width: 100%;
  }
`

type GetNextScreen = (
  profile: GetUserProfile_getUserProfile | null | undefined,
) => ContactScreen

const getNextScreen: GetNextScreen = (profile) => {
  if (!profile) return 'phone-enter'

  if (profile?.firstName && profile?.lastName && !profile.email)
    return 'email-enter'

  if (!profile?.firstName && !profile?.lastName && !profile?.email)
    return 'user-data-enter'

  return 'none'
}

const useVerification = (
  screen: ContactScreen,
  setScreen: (screen: ContactScreen) => void,
  form: Partial<FieldsWithVerification>,
  setForm: (
    callback: (
      form: Partial<FieldsWithVerification>,
    ) => Partial<FieldsWithVerification>,
  ) => void,
  refetchGetUserProfile: (
    variables?:
      | Partial<{
          [key: string]: any
        }>
      | undefined,
  ) => Promise<ApolloQueryResult<GetUserProfile>>,
) => {
  const mergeForm = (newForm: Partial<FieldsWithVerification>) =>
    setForm((form) => ({ ...form, ...newForm }))

  const onPhoneSubmit = async ({ phone, session }: PhoneForm) => {
    if (session && phone) {
      mergeForm({ phone, session })
      setScreen('phone-code')
    }
  }

  const phoneCodeRequest = usePhoneConfirm()
  const emailCodeRequest = useEmailConfirm()

  const onEmailChangeComplete = (form: Partial<FieldsWithVerification>) => {
    mergeForm(form)
    setScreen('email-code')
  }

  const codeError =
    screen === 'phone-code' ? phoneCodeRequest.error : emailCodeRequest.error

  const onCodeSubmit = async ({ code }: { code: string }) => {
    let result, isSuccess

    if (screen === 'phone-code') {
      result = await phoneCodeRequest.fetchCode({
        session: form.session || '',
        phone: form.phone || '',
        code,
      })

      isSuccess = !!result?.accessToken
    } else {
      result = await emailCodeRequest.fetchCode({
        id: form.id || '',
        code,
      })

      isSuccess = result?.data?.changeEmailStep2?.result === 'email changed'
    }

    if (isSuccess) {
      mergeForm({ code })
      refetchGetUserProfile()
    }
  }

  return {
    onPhoneSubmit,
    codeError,
    onCodeSubmit,
    onEmailChangeComplete,
  }
}

const usePhoneConfirm = () => {
  const [, { data, loading, error }] = useMutation(
    MUTATION_CHANGE_PHONE_STEP_2,
    {
      refetchQueries: [QUERY_GET_USER_PROFILE],
    },
  )

  const onSuccess = () => {
    showSuccessToast('Your phone number has been successfully changed', {
      autoClose: 2000,
    })
  }

  const fetchCode = (input: {
    session: string
    phone: string
    code: string
  }) => {
    return fetchConfirmSmsCode({
      ...input,
    }).then((data) => {
      onSuccess()
      return data
    })
  }

  return {
    fetchCode,
    data,
    loading,
    error,
  }
}

const useEmailConfirm = () => {
  const [fetchConfirmEmailCode, { data, loading, error }] = useMutation(
    MUTATION_CHANGE_EMAIL_STEP_2,
    {
      refetchQueries: [QUERY_GET_USER_PROFILE],
    },
  )

  const onSuccess = () => {
    showSuccessToast('Your e-mail has been successfully changed', {
      autoClose: 2000,
    })
  }

  const fetchCode = (input: { id: string; code: string }) => {
    return fetchConfirmEmailCode({
      variables: {
        input,
      },
    }).then((data) => {
      onSuccess()
      return data
    })
  }

  return {
    fetchCode,
    data,
    loading,
    error,
  }
}
