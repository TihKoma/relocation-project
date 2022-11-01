import React, { FC } from 'react'
import styled from '@emotion/styled'

import { Button } from '@/components/ui-kit/Button'
import { ModalContainer, ModalPortal } from '@/components/ui-kit/Modal'
import { ExtendPropsFCDeprecated } from '@/modules/utils/types'

type Props = {
  onSuccess: () => void
  isLoading?: boolean
  text: string
} & Omit<ExtendPropsFCDeprecated<typeof ModalPortal>, 'children'>

export const ReportModal: FC<Props> = ({
  isVisible,
  onRequestClose,
  onSuccess,
  isLoading,
  text,
}) => {
  return (
    <ModalPortal isVisible={isVisible} onRequestClose={onRequestClose}>
      <Container onRequestClose={onRequestClose}>
        <Question>{text}</Question>
        <Button
          size={'large'}
          viewType={'primary'}
          fullWidth
          onClick={onSuccess}
          data-test-id={'report-modal:success-button'}
          disabled={isLoading} // TODO replace with loading state, when it will be added to design system
          // isLoading={isLoading}
        >
          Yes
        </Button>
      </Container>
    </ModalPortal>
  )
}

const Container = styled(ModalContainer)`
  padding: 8.4rem 10.3rem;
`
const Question = styled.div`
  font-size: 2.4rem;
  line-height: 110%;
  text-align: center;
  letter-spacing: -0.05em;
  margin-bottom: 2.4rem;
`
