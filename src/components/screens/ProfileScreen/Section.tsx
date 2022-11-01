import styled from '@emotion/styled'

import { mobileMedia, notMobileMedia } from '@/styles/media'
import { SCROLLBAR_DISPLAY_NONE_MIXIN } from '@/styles/mixins'
import { getColorTheme } from '@/styles/themes'

export const Section = styled.div`
  border-radius: 12px;
  background-color: #ffffff;

  ${notMobileMedia} {
    max-height: calc(100vh - 8rem - 2.4rem);
    ${SCROLLBAR_DISPLAY_NONE_MIXIN};
    overflow-y: auto;

    background-color: ${getColorTheme('moon')};
  }

  ${mobileMedia} {
    border-radius: 0;
  }
`
