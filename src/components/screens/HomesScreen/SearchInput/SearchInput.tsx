import { FC, useRef } from 'react'
import styled from '@emotion/styled'

import { useIsMobileDevice } from '@/modules/device'
import { mobileMedia, notMobileMedia } from '@/styles/media'

import { DesktopContent } from './DesktopContent'
import { MobileContent } from './MobileContent'

type Props = {
  initialValue?: string
  className?: string
}

export const SearchInput: FC<Props> = ({ className }) => {
  const isMobile = useIsMobileDevice()
  const containerRef = useRef<HTMLDivElement | null>(null)

  return (
    <Container ref={containerRef} className={className}>
      {isMobile ? (
        <MobileContent />
      ) : (
        <DesktopContent containerRef={containerRef} />
      )}
    </Container>
  )
}

const Container = styled.div`
  width: 100%;

  position: relative;

  ${notMobileMedia} {
    height: 5.6rem;
  }

  ${mobileMedia} {
    height: 4rem;
  }
`
