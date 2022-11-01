import { FC, ReactNode } from 'react'
import styled from '@emotion/styled'

import { getColorTheme } from '@/styles/themes'

type Props = {
  withOverlay: boolean
  children: ReactNode
  className?: string
}
export const HeaderOverlay: FC<Props> = ({
  children,
  withOverlay,
  className,
}) => {
  return (
    <Container className={className}>
      {children}
      {withOverlay && <Overlay />}
    </Container>
  )
}

const Container = styled.div`
  position: relative;
`

const Overlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1;

  background: ${getColorTheme('backgroundOverlaySecondary')};
`
