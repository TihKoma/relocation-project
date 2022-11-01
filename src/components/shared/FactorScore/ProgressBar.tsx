import styled from '@emotion/styled'

import { getColorTheme } from '@/styles/themes'

export const ProgressBar = styled.div<{ percent: number }>`
  height: 0.8rem;

  position: relative;

  overflow: hidden;

  background: #ffffff;
  border-radius: 2.4rem;
  &:before {
    content: '';
    width: 100%;

    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;

    background: ${getColorTheme('sun200')};
    border-radius: 2.4rem;
  }
  &:after {
    content: '';
    width: ${({ percent }) => percent}%;

    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;

    background: ${({ percent }) => {
      if (percent < 20) {
        return getColorTheme('mars')
      }
      if (percent < 30) {
        return getColorTheme('titan')
      }
      if (percent < 40) {
        return getColorTheme('saturn')
      }
      if (percent < 50) {
        return getColorTheme('tethys')
      }
      if (percent < 60) {
        return getColorTheme('rhea')
      }
      if (percent < 75) {
        return getColorTheme('metis')
      }
      return getColorTheme('jupiter')
    }};
  }
`
