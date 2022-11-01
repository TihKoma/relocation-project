import styled from '@emotion/styled'

import { ReactComponent as ArrowRC } from './arrow.svg'

type Props = {
  direction: 'top' | 'right' | 'bottom' | 'left'
}
export const ArrowIcon = styled(ArrowRC)<Props>`
  ${({ direction }) => {
    switch (direction) {
      case 'top':
        return 'transform: rotate(90deg);'
      case 'right':
        return 'transform: rotate(180deg);'
      case 'bottom':
        return 'transform: rotate(-90deg);'
      default:
      case 'left':
        return 'transform: rotate(0);'
    }
  }}
`
