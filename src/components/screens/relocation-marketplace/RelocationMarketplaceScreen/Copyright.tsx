import styled from '@emotion/styled'

import { getColorTheme } from '@/styles/themes'

export const Copyright = () => {
  return <Container>© 2022 Nicity Inc</Container>
}

const Container = styled.div`
  text-align: center;
  font-style: normal;
  font-weight: 400;
  font-size: 1.4rem;
  line-height: 2.4rem;
  font-feature-settings: 'liga' off;
  color: ${getColorTheme('textDefaultSecondary')};
`
