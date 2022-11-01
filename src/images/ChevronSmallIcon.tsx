import styled from '@emotion/styled'

import { ReactComponent as ChevronRC } from './chevronSmall.svg'

type Props = {
  direction: 'top' | 'right' | 'bottom' | 'left'
}
export const ChevronSmallIcon = styled(ChevronRC)<Props>`
  transform: rotate(
    ${({ direction }) => {
      switch (direction) {
        case 'top':
          return '180deg'
        case 'right':
          return '-90deg'
        case 'bottom':
          return '0'
        default:
        case 'left':
          return '90deg'
      }
    }}
  );
`
