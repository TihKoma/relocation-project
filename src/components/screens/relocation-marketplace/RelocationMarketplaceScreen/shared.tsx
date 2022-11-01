import styled from '@emotion/styled'

import { mobileMedia, notMobileMedia } from '@/styles/media'
import { getColorTheme } from '@/styles/themes'

export const SectionTitle = styled.h3`
  margin: 0;

  font-style: normal;
  font-weight: 500;
  font-feature-settings: 'liga' off;
  color: ${getColorTheme('textDefaultPrimary')};

  ${notMobileMedia} {
    font-size: 2.8rem;
    line-height: 3.6rem;
  }

  ${mobileMedia} {
    font-size: 2.2rem;
    line-height: 2.8rem;
  }
`
