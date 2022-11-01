import { FC, useEffect, useRef, useState } from 'react'
import { ViewTimeEntityType } from '__generated__/globalTypes'
import { useMutation, useQuery } from '@apollo/client'
import styled from '@emotion/styled'

import { ConfirmCodeScreen } from '@/components/shared/EditProfileModal/ConfirmCodeScreen'
import { EditPhoneScreen } from '@/components/shared/EditProfileModal/EditPhoneScreen'
import {
  ModalContainer as ModalContainerBase,
  ModalPortal,
} from '@/components/ui-kit/Modal'
import { MUTATION_ADD_VIEW_TIMES_WITH_COUNT } from '@/modules/map/graphql/mutation-add-view-times-with-count'
import {
  MUTATION_VERIFY_PHONE_STEP_1,
  MUTATION_VERIFY_PHONE_STEP_2,
  QUERY_GET_USER_PROFILE,
} from '@/modules/profile'
import { GetUserProfile_getUserProfile as UserProfile } from '@/modules/profile/__generated__/GetUserProfile'
import { mobileMedia, notMobileMedia } from '@/styles/media'

import { ContactForm } from './ContactForm'

type Screen = 'main' | 'phone-edit' | 'phone-code'

type VerificationForm = {
  phone: string
  code: string
  requestId: string
}

type Props = {
  listingId: string
  internalId: string
  isVisible: boolean
  propertyType: string
  onRequestClose: (value: boolean) => void
}

export const ContactFormModal: FC<Props> = ({
  listingId,
  internalId,
  isVisible,
  onRequestClose,
  propertyType,
}) => {
  const { data } = useQuery(QUERY_GET_USER_PROFILE)
  const [screen, setScreen] = useState<Screen>('main')
  const displayStartTime = useRef(0)
  const [addViewTimes] = useMutation(MUTATION_ADD_VIEW_TIMES_WITH_COUNT)

  const {
    verifyPhoneError,
    verificationRequestId,
    onPhoneSubmit,
    verifyCodeError,
    onCodeSubmit,
    verificationForm,
    verifiedPhoneNumber,
  } = usePhoneVerification(setScreen, data?.getUserProfile)

  useEffect(() => {
    if (isVisible) displayStartTime.current = new Date().getTime()

    if (!isVisible && displayStartTime.current) {
      const currentTime = new Date().getTime()
      addViewTimes({
        variables: {
          input: [
            {
              entityID: internalId,
              entityType: ViewTimeEntityType.LISTING_CONTACT_AGENT,
              duration: currentTime - displayStartTime.current,
            },
          ],
        },
      })
    }
  }, [isVisible, addViewTimes, internalId])

  return (
    <ModalPortal
      isVisible={isVisible}
      onRequestClose={(value) => {
        setScreen('main')
        onRequestClose(value)
      }}
    >
      {screen === 'phone-edit' && (
        <PhoneModalContainer isVisible>
          <EditPhoneScreenWrapper>
            <EditPhoneScreen
              error={verifyPhoneError}
              phone={verificationForm.phone}
              currentPhone={verifiedPhoneNumber}
              onClickBack={() => setScreen('main')}
              onSubmit={onPhoneSubmit}
            />
          </EditPhoneScreenWrapper>
        </PhoneModalContainer>
      )}
      {screen === 'phone-code' && (
        <PhoneModalContainer isVisible>
          <EditPhoneScreenWrapper>
            <ConfirmCodeScreen
              title={'Confirm code'}
              onSubmit={onCodeSubmit}
              error={verifyCodeError}
              onClickBack={() => {
                setScreen('phone-edit')
              }}
            />
          </EditPhoneScreenWrapper>
        </PhoneModalContainer>
      )}
      <ModalContainer
        onRequestClose={onRequestClose}
        isVisible={screen === 'main'}
      >
        <ContactForm
          phone={verifiedPhoneNumber}
          verificationRequestId={verificationRequestId}
          onPhoneEdit={() => setScreen('phone-edit')}
          propertyType={propertyType}
          userProfile={data?.getUserProfile}
          displayStartTime={displayStartTime}
          listingId={listingId}
          internalId={internalId}
          onRequestClose={onRequestClose}
        />
      </ModalContainer>
    </ModalPortal>
  )
}

const ModalContainer = styled(ModalContainerBase)<{ isVisible: boolean }>`
  ${mobileMedia} {
    max-width: 100%;
    width: 100%;
    height: 100%;

    border-radius: 0;
    overflow-y: auto;
  }

  ${(props) => (props.isVisible ? `` : 'display: none;')}
`
const PhoneModalContainer = styled(ModalContainer)`
  ${notMobileMedia} {
    height: calc(100% - 3.2rem);
    width: 516px;
  }
`
const EditPhoneScreenWrapper = styled.div`
  height: 100%;

  display: grid;
  grid-template-rows: auto 1fr;
`

const usePhoneVerification = (
  setScreen: (screen: Screen) => void,
  userProfile?: UserProfile | null,
) => {
  const [verificationForm, setVerificationForm] = useState<VerificationForm>({
    phone: '1',
    code: '',
    requestId: '',
  })
  const [verifiedPhoneNumber, setVerifiedPhoneNumber] = useState<string>('1')
  const [verificationRequestId, setVerificationRequestId] = useState<string>('')

  const [verifyPhone, { error: verifyPhoneError }] = useMutation(
    MUTATION_VERIFY_PHONE_STEP_1,
  )

  const [verifyCode, { error: verifyCodeError }] = useMutation(
    MUTATION_VERIFY_PHONE_STEP_2,
  )

  useEffect(() => {
    if (userProfile?.phone) {
      const phone = userProfile!.phone.slice(1) // remove +
      setVerificationForm((form) => ({
        ...form,
        phone,
      }))
      setVerifiedPhoneNumber(phone)
    }
  }, [userProfile])

  const onPhoneSubmit = async ({ phone }: { phone: string }) => {
    const result = await verifyPhone({
      variables: {
        phoneNumber: phone,
      },
    })

    if (result.data?.verifyPhoneStep1?.requestId) {
      setVerificationForm((form) => ({
        ...form,
        requestId: result.data!.verifyPhoneStep1!.requestId,
        phone,
      }))

      setScreen('phone-code')
    }
  }

  const onCodeSubmit = async ({ code }: { code: string }) => {
    const result = await verifyCode({
      variables: {
        verificationCode: {
          code: Number(code),
          requestId: verificationForm.requestId,
        },
      },
    })

    if (result.data?.verifyPhoneStep2?.status) {
      setVerifiedPhoneNumber(verificationForm.phone)
      setVerificationRequestId(verificationForm.requestId)
      setScreen('main')
    }
  }

  return {
    verifyPhoneError,
    onPhoneSubmit,
    verificationRequestId,
    verifyCodeError,
    onCodeSubmit,
    verifiedPhoneNumber,
    verificationForm,
  }
}
