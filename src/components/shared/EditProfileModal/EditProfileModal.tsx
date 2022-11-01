import { useEffect, useRef, useState, VFC } from 'react'
import { useMutation, useQuery } from '@apollo/client'
import styled from '@emotion/styled'

import { showSuccessToast } from '@/components/shared/Toast'
import { ModalPortal } from '@/components/ui-kit/Modal'
import { CrossIcon as CrossIconBase } from '@/images'
import { useAuthorizationStore } from '@/modules/authorization'
import { QUERY_GET_USER_PROFILE } from '@/modules/profile'
import {
  MUTATION_CHANGE_EMAIL_STEP_2,
  MUTATION_CHANGE_PHONE_STEP_1,
  MUTATION_CHANGE_PHONE_STEP_2,
} from '@/modules/profile/graphql/mutations'
import { mobileMedia, notMobileMedia } from '@/styles/media'
import { getColorTheme } from '@/styles/themes'

import type { ConfirmCodeForm } from './ConfirmCodeScreen'
import { ConfirmCodeScreen } from './ConfirmCodeScreen'
import type { EmailForm } from './EditEmailScreen'
import { EditEmailScreen } from './EditEmailScreen'
import type { PhoneForm } from './EditPhoneScreen'
import { EditPhoneScreen } from './EditPhoneScreen'
import { Form, FormRef } from './Form'

export type Screen =
  | 'main'
  | 'phone-edit'
  | 'email-edit'
  | 'phone-code'
  | 'email-code'

type Props = {
  isVisible: boolean
  onRequestClose: (isSuccess: boolean) => void
}
type FieldsWithVerification = ConfirmCodeForm & PhoneForm & EmailForm

export const EditProfileModal: VFC<Props> = ({ isVisible, onRequestClose }) => {
  const [screen, setScreen] = useState<Screen>('main')
  const [form, setForm] = useState<Partial<FieldsWithVerification>>({})

  useEffect(() => {
    if (!isVisible) {
      setScreen('main')
    }
  }, [isVisible])

  const {
    changePhoneError,
    onPhoneSubmit,
    codeError,
    onCodeSubmit,
    onEmailChangeComplete,
  } = useVerification(screen, setScreen, form, setForm)

  const [{ isLoggedIn }] = useAuthorizationStore()
  const formRef = useRef<FormRef | null>(null)

  const { data: profileQuery } = useQuery(QUERY_GET_USER_PROFILE, {
    skip: !isLoggedIn,
    ssr: true,
  })

  const profile = profileQuery?.getUserProfile

  useEffect(() => {
    if (profile && screen === 'main') {
      setForm({
        email: profile.email ?? '',
        phone: profile.phone,
      })
    }
  }, [profile, screen])

  const onCloseForm = () => {
    if (formRef.current?.isDirty()) {
      if (
        window.confirm('Are you sure you want to leave without save changes?')
      ) {
        onRequestClose(false)
      }
    } else {
      onRequestClose(false)
    }
  }

  return profile ? (
    <ModalPortal isVisible={isVisible} onRequestClose={onCloseForm}>
      <Container>
        {screen === 'main' ? (
          <>
            <Header>
              <Title>Edit profile</Title>
              <CrossIcon onClick={onCloseForm} />
            </Header>
            <Form
              profile={profile}
              ref={formRef}
              onClose={onRequestClose}
              setScreen={setScreen}
            />
          </>
        ) : screen === 'phone-edit' ? (
          <EditPhoneScreen
            phone={form.phone ?? ''}
            currentPhone={profile.phone}
            error={changePhoneError}
            onSubmit={onPhoneSubmit}
            onClickBack={() => setScreen('main')}
          />
        ) : screen === 'email-edit' ? (
          <EditEmailScreen
            email={form.email ?? ''}
            currentEmail={profile.email ?? ''}
            onClickBack={() => setScreen('main')}
            onComplete={onEmailChangeComplete}
          />
        ) : screen === 'email-code' || screen === 'phone-code' ? (
          <ConfirmCodeScreen
            title={'Verify Your Identity'}
            error={codeError}
            onSubmit={onCodeSubmit}
            onClickBack={() => {
              setScreen(screen === 'email-code' ? 'email-edit' : 'phone-edit')
            }}
          />
        ) : null}
      </Container>
    </ModalPortal>
  ) : null
}

const Container = styled.div`
  height: 100%;
  background-color: ${getColorTheme('earth')};
  overflow: hidden;

  display: grid;
  grid-template-rows: auto 1fr;

  ${notMobileMedia} {
    max-height: calc(100% - 32px);
    width: 51.6rem;
    border-radius: 16px;
  }

  ${mobileMedia} {
    width: 100%;
  }
`
const Header = styled.header`
  padding: 1.6rem 3rem 1.6rem 2.4rem;

  display: flex;
  justify-content: space-between;
  align-items: center;

  background-color: ${getColorTheme('earth')};

  ${mobileMedia} {
    position: sticky;
    top: 0;
    left: 0;
    right: 0;
    z-index: 1;
  }
`
const Title = styled.div`
  font-size: 28px;
  letter-spacing: -0.06rem;
  line-height: 36px;
  font-weight: 400;
`
const CrossIcon = styled(CrossIconBase)`
  height: 1.8rem;
  width: 1.8rem;

  cursor: pointer;
`

const useVerification = (
  screen: Screen,
  setScreen: (screen: Screen) => void,
  form: Partial<FieldsWithVerification>,
  setForm: (
    callback: (
      form: Partial<FieldsWithVerification>,
    ) => Partial<FieldsWithVerification>,
  ) => void,
) => {
  const [fetchChangePhone, { error: changePhoneError }] = useMutation(
    MUTATION_CHANGE_PHONE_STEP_1,
  )

  const mergeForm = (newForm: Partial<FieldsWithVerification>) =>
    setForm((form) => ({ ...form, ...newForm }))

  const onPhoneSubmit = async ({ phone }: { phone: string }) => {
    const result = await fetchChangePhone({
      variables: {
        input: {
          newPhone: phone,
        },
      },
    })

    if (result.data?.changePhoneStep1?.id) {
      mergeForm({ phone, id: result.data.changePhoneStep1.id })
    }
    setScreen('phone-code')
  }

  const phoneCodeRequest = usePhoneConfirm()
  const emailCodeRequest = useEmailConfirm()

  const onEmailChangeComplete = (form: Partial<FieldsWithVerification>) => {
    mergeForm(form)
    setScreen('email-code')
  }

  const fetchCode =
    screen === 'phone-code'
      ? phoneCodeRequest.fetchCode
      : emailCodeRequest.fetchCode
  const codeError =
    screen === 'phone-code' ? phoneCodeRequest.error : emailCodeRequest.error

  const onCodeSubmit = async ({ code }: { code: string }) => {
    const result = await fetchCode({
      id: form.id || '',
      code,
    })

    if (result.data) {
      mergeForm({ code })
      setScreen('main')
    }
  }

  return {
    changePhoneError,
    onPhoneSubmit,
    codeError,
    onCodeSubmit,
    onEmailChangeComplete,
  }
}

const usePhoneConfirm = () => {
  const [fetchConfirmPhoneCode, { data, loading, error }] = useMutation(
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

  const fetchCode = (input: { id: string; code: string }) => {
    return fetchConfirmPhoneCode({
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

const useEmailConfirm = () => {
  const [fetchConfirmEmailCode, { data, loading, error }] = useMutation(
    MUTATION_CHANGE_EMAIL_STEP_2,
    {
      refetchQueries: [QUERY_GET_USER_PROFILE],
    },
  )

  const onSuccess = () => {
    showSuccessToast('You e-mail has been successfully changed', {
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
