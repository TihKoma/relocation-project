import styled from '@emotion/styled'

import { notDesktopMedia } from '@/styles/media'
import { getColorTheme } from '@/styles/themes'

export const PropertiesList = styled.ul`
  display: grid;
  row-gap: 8px;
  align-items: start;

  margin: 0;
  padding: 0;

  list-style: none;
  overflow: hidden;
  transition: max-height 150ms;
  font-weight: 400;
  font-size: 1.6rem;
  line-height: 2.4rem;
  color: ${getColorTheme('sun')};

  ${notDesktopMedia} {
    row-gap: 4px;
  }
`
