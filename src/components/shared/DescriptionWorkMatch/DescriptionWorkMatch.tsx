import { SyntheticEvent, useEffect, useState, VFC } from 'react'
import styled from '@emotion/styled'

import { NormalizedButton } from '@/components/ui-kit/Button'
import { ModalController, ModalPortal } from '@/components/ui-kit/Modal'
import { CrossIcon } from '@/images'
import { useAnalytics } from '@/modules/analytics'
import { HOVER_TRANSITION_TIME } from '@/styles/const'
import { mobileMedia, notMobileMedia } from '@/styles/media'
import { getColorTheme } from '@/styles/themes'

import { Contacts } from './Contacts'
import { Header as HeaderBase } from './Header'
import { Main } from './Main'

type Props = {
  onClick?: (event: SyntheticEvent<HTMLDivElement>) => void
} & ModalController
export const DescriptionWorkMatch: VFC<Props> = ({
  isVisible,
  onRequestClose,
  onClick,
}) => {
  const closeSelf = () => {
    onRequestClose(false)
  }
  const [isShowShadow, setIsShowShadow] = useState(false)
  const analytics = useAnalytics()
  useEffect(() => {
    if (isVisible) {
      analytics?.descriptionView()
    }
  }, [analytics, isVisible])
  return (
    <Modal
      isVisible={isVisible}
      onRequestClose={onRequestClose}
      onClick={onClick}
    >
      <Container
        onScroll={(event) => {
          setIsShowShadow((event.target as HTMLFormElement).scrollTop !== 0)
        }}
      >
        <CrossWrapper isShowShadow={isShowShadow}>
          <ButtonClose onClick={closeSelf}>
            <CrossIcon />
          </ButtonClose>
        </CrossWrapper>
        <Header />
        <Main />
        <Contacts />
      </Container>
    </Modal>
  )
}
const Container = styled.div`
  width: 100%;
  height: 100%;

  overflow-y: auto;

  background: ${getColorTheme('earth')};

  ${notMobileMedia} {
    border-radius: 16px;
  }
`
const Modal = styled(ModalPortal)`
  height: 100%;
  overflow-x: hidden;

  ${notMobileMedia} {
    padding: 24px;
  }
`
const CrossWrapper = styled.div<{ isShowShadow: boolean }>`
  padding: 30px;

  position: sticky;
  right: 0;
  top: 0;

  display: flex;
  align-items: center;
  justify-content: flex-end;

  pointer-events: none;
  z-index: 10;

  ${mobileMedia} {
    padding: 16px;

    transition: ${HOVER_TRANSITION_TIME};

    ${({ isShowShadow }) =>
      isShowShadow
        ? `
    
    background: #ffffff;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.08),
      0 3.78px 33.4221px rgba(0, 0, 0, 0.06);
  `
        : ''}
  }
`
const ButtonClose = styled(NormalizedButton)`
  pointer-events: auto;
`
const Header = styled(HeaderBase)`
  margin-top: -80px;

  ${mobileMedia} {
    margin-top: -52px;
  }
`
