import styled from '@emotion/styled'

import { getColorTheme } from '@/styles/themes'

export const BREAKPOINT_TO_SWITCH_INTO_DESKTOP_VIEW = `@media screen and (min-width: 1150px)`

export const ChartContainer = styled.div`
  width: 100%;
  padding: 1.6rem;

  display: grid;
  grid-auto-flow: row;
  justify-items: center;
  gap: 0.8rem;

  border-radius: 1.6rem;
  border: 0.1rem solid ${getColorTheme('sun200')};
`
