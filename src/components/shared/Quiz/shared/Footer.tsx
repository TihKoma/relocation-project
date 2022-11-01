import { FC } from 'react'
import styled from '@emotion/styled'

import { Button } from '@/components/ui-kit/Button'
import { useIsMobileDevice } from '@/modules/device'
import { mobileMedia } from '@/styles/media'

type Props = {
  isFirstStep: boolean
  isLastStep: boolean
  isSubmitting: boolean
  hasValue: boolean
  goBackButtonProps: {
    disabled: boolean
    onClick: () => void
    children: string
  }
}

export const Footer: FC<Props> = ({
  isFirstStep,
  isLastStep,
  isSubmitting,
  hasValue,
  goBackButtonProps,
}) => {
  const isMobile = useIsMobileDevice()
  return (
    <FooterWrapper>
      {!isFirstStep && !isMobile && (
        <BackButton size={'large'} viewType={'primary'} {...goBackButtonProps}>
          Back
        </BackButton>
      )}
      {(!isFirstStep || hasValue) && (
        <ContinueButton size={'large'} type={'submit'} disabled={isSubmitting}>
          {isLastStep ? 'Get results' : 'Continue'}
        </ContinueButton>
      )}
    </FooterWrapper>
  )
}

const FooterWrapper = styled.div`
  ${mobileMedia} {
    padding: 2.2rem 0 5.8rem;

    background: linear-gradient(
      0deg,
      #ffffff 41.52%,
      rgba(255, 255, 255, 0) 100%
    );
  }

  padding: 2.4rem 0 1.6rem;
  margin-top: auto;

  position: sticky;
  bottom: 0;

  display: flex;
  justify-content: space-between;

  pointer-events: none;

  background: linear-gradient(
    360deg,
    #ffffff 38.16%,
    rgba(255, 255, 255, 0) 100%
  );
`
const BackButton = styled(Button)`
  pointer-events: auto;
`
const ContinueButton = styled(Button)`
  margin-left: auto;

  pointer-events: auto;

  ${mobileMedia} {
    width: 100%;
  }
`
