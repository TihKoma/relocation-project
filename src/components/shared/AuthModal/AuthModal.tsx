import React from 'react'

import { ModalContainer } from '@/components/ui-kit/Modal'

import { AuthForm } from '../AuthForm'

type Props = {
  onSuccess: () => void
  isUnskippable?: boolean
}

export const AuthModal: React.VFC<Props> = ({ onSuccess, isUnskippable }) => {
  return (
    <ModalContainer
      onRequestClose={onSuccess}
      withCancelButton={!isUnskippable}
    >
      <AuthForm onSuccess={onSuccess} />
    </ModalContainer>
  )
}
