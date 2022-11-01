import { FC } from 'react'
import styled from '@emotion/styled'

import { NormalizedButton } from '@/components/ui-kit/Button'
import { ZoomInPlusIcon, ZoomOutMinusIcon } from '@/images'
import { getColorTheme } from '@/styles/themes'

export const ZOOM_BUTTONS_INTEGRATE_MAP_MIXIN = `
  position: absolute;
  top: 50%;
  right: 0.8rem;
  transform: translateY(-50%);
  z-index: 1;
`

type Props = {
  onZoomIn: () => void
  onZoomOut: () => void
  className?: string
}
export const ZoomButtons: FC<Props> = ({ onZoomIn, onZoomOut, className }) => {
  return (
    <Container className={className}>
      <ZoomButton onClick={onZoomIn}>
        <ZoomInPlusIcon />
      </ZoomButton>
      <ZoomButton onClick={onZoomOut}>
        <ZoomOutMinusIcon />
      </ZoomButton>
    </Container>
  )
}

const Container = styled.div`
  width: 4rem;
  height: 9.7rem;

  display: flex;
  flex-direction: column;
  justify-content: space-between;

  border-radius: 20px;
  background-color: ${getColorTheme('moon')};

  box-shadow: 0px 2px 4px rgba(18, 21, 31, 0.08),
    0px 4px 16px 1px rgba(18, 21, 31, 0.08);
`
const ZoomButton = styled(NormalizedButton)`
  width: 100%;
  height: 4.8rem;

  display: flex;
  align-items: center;
  justify-content: center;
`
