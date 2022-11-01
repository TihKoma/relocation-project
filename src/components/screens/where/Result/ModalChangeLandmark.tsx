import { FC } from 'react'
import styled from '@emotion/styled'

import { Button } from '@/components/ui-kit/Button'
import { ModalController, ModalPortal } from '@/components/ui-kit/Modal'
import { ResetLandmarkWarningIcon as ResetLandmarkWarningIconBase } from '@/images'
import { useIsMobileDevice } from '@/modules/device'
import { mobileMedia } from '@/styles/media'
import { getColorTheme } from '@/styles/themes'

type Props = {
  onSubmit: () => void
}

export const ModalChangeLandmark: FC<ModalController & Props> = ({
  isVisible,
  onRequestClose,
  onSubmit,
}) => {
  const isMobile = useIsMobileDevice()
  return (
    <ModalPortal isVisible={isVisible} onRequestClose={onRequestClose}>
      <Container>
        <Indenter>
          <ResetLandmarkWarningIcon />
          <Title>Your landmarks will be reset</Title>
          <Annotation>
            Some of your landmarks are outside of your chosen search areas. They
            will be reset
          </Annotation>
          <ButtonOkay
            size={isMobile ? 'medium' : 'large'}
            viewType={'primary'}
            onClick={onSubmit}
          >
            Okay
          </ButtonOkay>
          <ButtonCancel
            size={isMobile ? 'medium' : 'large'}
            viewType={'secondary'}
            onClick={() => onRequestClose(false)}
          >
            Cancel
          </ButtonCancel>
        </Indenter>
      </Container>
    </ModalPortal>
  )
}

const Container = styled.div`
  flex-basis: 54.6rem;
`
const Indenter = styled.div`
  padding: 7.5rem 6.8rem 6.8rem;
  ${mobileMedia} {
    padding: 2.2rem 2.4rem 2.4rem;
    margin: 0 1.6rem;
  }

  display: flex;
  flex-direction: column;
  align-items: center;

  background: #ffffff;
  border-radius: 32px;
`
const ResetLandmarkWarningIcon = styled(ResetLandmarkWarningIconBase)`
  width: 14.8rem;
  margin-bottom: 1.6rem;

  ${mobileMedia} {
    width: 10.8rem;
  }
`
const ButtonOkay = styled(Button)`
  width: 100%;
  margin-bottom: 1.6rem;
`
const ButtonCancel = styled(Button)`
  width: 100%;
`
const Title = styled.div`
  margin-bottom: 0.8rem;

  font-weight: 500;
  font-size: 2.8rem;
  line-height: 3.6rem;
  ${mobileMedia} {
    font-size: 2rem;
    line-height: 2.4rem;
  }
  letter-spacing: -0.04em;
  color: ${getColorTheme('sun1000')};
`
const Annotation = styled.div`
  margin-bottom: 24px;

  text-align: center;
  font-size: 1.6rem;
  line-height: 2.4rem;

  color: ${getColorTheme('sun500')};
`
