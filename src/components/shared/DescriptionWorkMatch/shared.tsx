import styled from '@emotion/styled'

import { mobileMedia } from '@/styles/media'
import { getColorTheme } from '@/styles/themes'

export const Title = styled.div`
  font-weight: 500;
  font-size: 62px;
  line-height: 72px;
  letter-spacing: -0.04em;
  color: ${getColorTheme('sun')};

  ${mobileMedia} {
    font-size: 42px;
    line-height: 52px;
  }
`
export const SubTitle = styled.div`
  font-weight: 500;
  font-size: 28px;
  line-height: 36px;
  letter-spacing: -0.04em;
  color: ${getColorTheme('sun')};

  ${mobileMedia} {
    font-size: 20px;
    line-height: 24px;
  }
`
export const Paragraph = styled.div`
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
  color: ${getColorTheme('sun')};

  ${mobileMedia} {
    font-size: 16px;
    line-height: 24px;
  }
`
export const Wrapper = styled.div`
  max-width: 1020px;
  margin: 0 auto;
  padding: 0 16px;
`
