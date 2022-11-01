import { VFC } from 'react'
import styled from '@emotion/styled'

import { ModalPortal } from '@/components/ui-kit/Modal'
import { mobileMedia } from '@/styles/media'
import { getColorTheme } from '@/styles/themes'

import { PropertyFilter } from './PropertyFilter'

type Props = {
  isVisible: boolean
  onRequestClose: (value: boolean) => void
}

export const PropertyFiltersModal: VFC<Props> = ({
  isVisible,
  onRequestClose,
}) => {
  return (
    <ModalPortal isVisible={isVisible} onRequestClose={onRequestClose}>
      <Wrapper>
        <PropertyFilter onRequestClose={onRequestClose} />
      </Wrapper>
    </ModalPortal>
  )
}

const Wrapper = styled.div`
  max-width: 67.2rem;
  width: 100%;

  background-color: ${getColorTheme('earth')};
  border-radius: 1.6rem;
  overflow-y: auto;

  ${mobileMedia} {
    max-width: 100%;

    border-radius: 0;
  }
`
