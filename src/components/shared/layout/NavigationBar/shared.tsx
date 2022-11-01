import styled from '@emotion/styled'

import { NormalizedButton } from '@/components/ui-kit/Button'
import { getColorTheme } from '@/styles/themes'

export const CustomButton = styled(NormalizedButton)`
  width: 100%;

  display: grid;
  grid-auto-flow: row;
  align-items: center;
  justify-items: center;
  row-gap: 2px;

  color: ${getColorTheme('mercury')};
  font-size: 1.2rem;

  & svg {
    fill: ${getColorTheme('mercury')};
    stroke: ${getColorTheme('mercury')};
  }

  &.active,
  &:hover {
    color: ${getColorTheme('sun')};
    & svg {
      fill: ${getColorTheme('sun')};
      stroke: ${getColorTheme('sun')};
    }
  }
`
