import { forwardRef, ReactNode } from 'react'
import { createPortal } from 'react-dom'
import styled from '@emotion/styled'

import { MarkerInfo } from '@/modules/map/types'
import { getColorTheme } from '@/styles/themes'

type Props = {
  markerInfo: MarkerInfo
  onMouseLeave?: () => void
  onMouseEnter?: () => void
  children: ReactNode
}
export const HighlightPointer = forwardRef<HTMLDivElement, Props>(
  ({ markerInfo, onMouseLeave, onMouseEnter, children }, ref) => {
    return createPortal(
      <Container
        onMouseLeave={onMouseLeave}
        onMouseEnter={onMouseEnter}
        ref={ref}
      >
        <Icon>{children}</Icon>
      </Container>,
      markerInfo.marker.getElement(),
    )
  },
)

const Container = styled.div`
  height: 42px;
  width: 43px;

  position: relative;
  bottom: 40px;

  display: flex;
  align-items: center;
  justify-content: center;

  border-radius: 50%;
  background: ${getColorTheme('neptune500')};

  transition: transform 0.5s;

  :after {
    content: '';

    width: 0;
    height: 0;

    position: absolute;
    top: 30px;

    z-index: -1;

    border-style: solid;
    border-width: 20px 20px 0 20px;
    border-color: ${getColorTheme('neptune500')} transparent transparent
      transparent;
  }

  :before {
    content: '';

    width: 8px;
    height: 8px;

    position: absolute;
    bottom: -18px;

    border-radius: 50%;
    background: ${getColorTheme('neptune500')};
  }
`

const Icon = styled.div`
  height: 32px;
  width: 32px;

  display: flex;
  align-items: center;
  justify-content: center;

  border-radius: 50%;
  background: ${getColorTheme('earth')};
`
