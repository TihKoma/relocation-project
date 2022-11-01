import styled from '@emotion/styled'

import { mobileMedia, notMobileMedia } from '@/styles/media'

export const Title = styled.div`
  letter-spacing: -0.05em;
  color: #000000;
  font-weight: 400;

  margin: 0;

  ${notMobileMedia} {
    font-size: 62px;
    line-height: 100%;
  }

  ${mobileMedia} {
    font-size: 28px;
    line-height: 90%;
    text-align: center;
  }
`
