import { FC, useCallback, useState } from 'react'
import { useApolloClient, useMutation } from '@apollo/client'
import styled from '@emotion/styled'
import { useSessionStorage } from 'react-use'

import { useAuthorizationStore } from '@/modules/authorization'
import { useCookieController } from '@/modules/cookie'
import { QUERY_GET_USER_PROFILE } from '@/modules/profile'
import { MUTATION_BIND_QUIZ_TO_USER } from '@/modules/quiz/graphql/mutations'
import { filterUserSegment } from '@/modules/utils/filter-user-segment'
import { mobileMedia, notMobileMedia } from '@/styles/media'

import { CodeRequest, ConfirmSmsCode } from './CodeRequest'
import { PhoneRequest } from './PhoneRequest'

type Form = ConfirmSmsCode

type Screens = 'phone' | 'code'

const US_CODE = '1'

export type AuthFormProps = {
  onSuccess?: () => void
  className?: string
  withMobileContextMenu?: boolean
}

export const AuthForm: FC<AuthFormProps> = ({
  onSuccess,
  withMobileContextMenu,
  className,
}) => {
  const [screen, setScreen] = useState<Screens>('phone')
  const [form, setForm] = useState<Partial<Form>>({
    phone: US_CODE,
  })
  const mergeForm = (newForm: Partial<Form>) =>
    setForm((form) => ({ ...form, ...newForm }))
  const client = useApolloClient()

  const [, { loginSuccess, showFillProfileModal }] = useAuthorizationStore()

  const cookie = useCookieController()
  const [quizId] = useSessionStorage('quizId')
  const [bindQuizToUser] = useMutation(MUTATION_BIND_QUIZ_TO_USER)

  const onLoggedIn = async () => {
    const { data } = await client.query({
      query: QUERY_GET_USER_PROFILE,
    })

    const profile = data.getUserProfile

    if (profile && !profile.isFilled) {
      showFillProfileModal()
    }

    onSuccess?.()
    loginSuccess()

    if (quizId) {
      bindQuizToUser({ variables: { quizId: quizId as string } })
    }

    if (profile) {
      const tag = filterUserSegment(profile.tags)
      if (tag !== undefined) {
        cookie.set('user_segment_filter', tag)
        cookie.set('user_id', profile.userId)
      }
      return { userId: profile.userId, tags: tag }
    }
  }

  const handleBack = useCallback(() => {
    screen === 'code' && setScreen('phone')
  }, [screen])

  return (
    <Wrapper className={className}>
      {screen === 'phone' && (
        <PhoneRequestContainer>
          <PhoneRequest
            withMobileContextMenu={withMobileContextMenu}
            onComplete={(form) => {
              mergeForm(form)
              setScreen('code')
            }}
            onLoggedIn={onLoggedIn}
            phone={form.phone ?? ''}
          />
        </PhoneRequestContainer>
      )}
      {screen === 'code' && form.session && form.phone && (
        <CodeRequest
          onLoggedIn={onLoggedIn}
          session={form.session}
          phone={form.phone}
          code={form.code ?? ''}
          handleBack={handleBack}
        />
      )}
    </Wrapper>
  )
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;

  position: relative;

  padding: 0 28px 36px;

  ${mobileMedia} {
    padding: 0 16px 16px;
  }
`
const PhoneRequestContainer = styled.div`
  ${notMobileMedia} {
    margin-top: 78px;
  }

  ${mobileMedia} {
    margin-top: 30px;
  }
`
