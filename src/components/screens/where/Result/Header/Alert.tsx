import { forwardRef } from 'react'
import styled from '@emotion/styled'

import { NormalizedButton } from '@/components/ui-kit/Button'
import { CrossIcon, TooltipArrow as TooltipArrowBase } from '@/images'
import { getColorTheme } from '@/styles/themes'

type Props = {
  style: {
    position: 'absolute' | 'fixed'
    top: string | number
    left: string | number
  }
  onClick: () => void
}

export const Alert = forwardRef<HTMLDivElement, Props>(
  ({ style, onClick }, ref) => {
    return (
      <Container ref={ref} style={style}>
        The desired search area is too small, so we expanded it to include more
        options
        <TooltipArrow />
        <CloseButton onClick={onClick}>
          <CrossIcon />
        </CloseButton>
      </Container>
    )
  },
)

const Container = styled.div`
  max-width: 29.4rem;
  padding: 1.2rem;

  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 1.2rem;

  position: absolute;
  top: 0;
  left: 0;

  font-size: 1.4rem;
  line-height: 2rem;
  color: ${getColorTheme('earth')};

  background: ${getColorTheme('saturn')};
  border-radius: 1.6rem;
`

const TooltipArrow = styled(TooltipArrowBase)`
  position: absolute;
  top: -1rem;
  left: 1.6rem;
`

const CloseButton = styled(NormalizedButton)`
  & > svg {
    width: 1rem;
    height: 1rem;
    fill: ${getColorTheme('earth')};
  }
`
