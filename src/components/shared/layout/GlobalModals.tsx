import React, { FC, useEffect } from 'react'
import { useQuery } from '@apollo/client'
import styled from '@emotion/styled'

import { AuthModal } from '@/components/shared/AuthModal'
import {
  EditProfileModal,
  useEditProfileModal,
} from '@/components/shared/EditProfileModal'
import { NotificationsModal } from '@/components/shared/NotificationsModal'
import { useNotificationsModal } from '@/components/shared/NotificationsModal/NotificationsContext'
import { ProfileFill } from '@/components/shared/ProfileFillModal'
import {
  ModalContainer as ModalContainerBase,
  ModalPortal,
} from '@/components/ui-kit/Modal'
import { useAuthorizationStore } from '@/modules/authorization'
import { QUERY_GET_USER_PROFILE } from '@/modules/profile'
import { mobileMedia } from '@/styles/media'

import { useContactFormModal } from '../ContactFormModal/contact-form-modal-context'
import { ContactFormModal } from '../ContactFormModal/ContactFormModal'

type Props = {
  isLoginUnskippable?: boolean
  redirect?: () => void
}

export const GlobalModals: FC<Props> = ({ isLoginUnskippable, redirect }) => {
  const { data: profileQuery } = useQuery(QUERY_GET_USER_PROFILE, {
    ssr: false,
  })
  const profile = profileQuery?.getUserProfile

  const [
    { isAuthModalVisible, isFillProfileModalVisible },
    { hideAuthModal, hideFillProfileModal, showFillProfileModal },
  ] = useAuthorizationStore()
  const { isVisible, hideModal } = useEditProfileModal()

  const {
    listingId,
    internalId,
    propertyType,
    isContactFormVisible,
    hideContactFormModal,
  } = useContactFormModal()

  useEffect(() => {
    if (profile && !profile.isFilled) {
      showFillProfileModal()
    }
  }, [profile, showFillProfileModal])

  const { isNotificationsModalOpen, closeNotificationsModal } =
    useNotificationsModal()

  return (
    <>
      <ModalPortal
        isUnskippable={isLoginUnskippable}
        isVisible={isAuthModalVisible}
        onRequestClose={hideAuthModal}
      >
        <AuthModal
          onSuccess={() => {
            hideAuthModal()
            redirect ? redirect() : window.location.reload()
          }}
          isUnskippable={isLoginUnskippable}
        />
      </ModalPortal>
      <ModalPortal
        isVisible={isFillProfileModalVisible}
        onRequestClose={() => {}}
      >
        <ModalContainer>
          <ProfileFill onSuccess={hideFillProfileModal} />
        </ModalContainer>
      </ModalPortal>
      <EditProfileModal isVisible={isVisible} onRequestClose={hideModal} />
      <NotificationsModal
        isVisible={isNotificationsModalOpen}
        onRequestClose={closeNotificationsModal}
      />
      <ContactFormModal
        isVisible={isContactFormVisible}
        listingId={listingId}
        internalId={internalId}
        propertyType={propertyType}
        onRequestClose={hideContactFormModal}
      />
    </>
  )
}

const ModalContainer = styled(ModalContainerBase)`
  padding: 2.4rem;

  ${mobileMedia} {
    width: 100%;
    height: 100%;
    overflow: auto;
    padding: 1.6rem 16px 16px;
    border-radius: initial;
  }
`
