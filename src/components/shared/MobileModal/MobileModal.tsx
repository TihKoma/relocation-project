import { forwardRef, ReactNode } from 'react'
import styled from '@emotion/styled'

import { Button } from '@/components/ui-kit/Button'
import { CrossIcon } from '@/images'
import { notMobileMedia } from '@/styles/media'
import { getColorTheme } from '@/styles/themes'

type Props = {
  children?: ReactNode
  className?: string
  onClose?: () => void
}
export const MobileModal = forwardRef<HTMLDivElement, Props>(
  ({ children, className, onClose }, ref) => {
    return (
      <>
        <DarkBackground />
        <Container className={className} ref={ref}>
          <CloseButton
            Icon={<CrossIcon />}
            viewType={'primary'}
            backgroundUnderButton={'map'}
            size={'small'}
            onClick={onClose}
          />
          {children}
        </Container>
      </>
    )
  },
)

const Container = styled.div`
  width: 100%;
  padding: 1.6rem;

  position: fixed;
  bottom: 0;
  left: 0;

  border-top-left-radius: 2.4rem;
  border-top-right-radius: 2.4rem;
  background: ${getColorTheme('earth')};
  z-index: 999;
`
const DarkBackground = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;

  background: ${getColorTheme('overlay')};
  opacity: 0.64;
  z-index: 4;

  ${notMobileMedia} {
    display: none;
  }
`
const CloseButton = styled(Button)`
  position: absolute;
  bottom: calc(100% + 1.6rem);
  right: 1.6rem;
`
