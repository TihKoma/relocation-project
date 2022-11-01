import styled from '@emotion/styled'

import { Contacts } from '@/components/shared/DescriptionWorkMatch/Contacts'
import { Header } from '@/components/shared/DescriptionWorkMatch/Header'
import { Main } from '@/components/shared/DescriptionWorkMatch/Main'
import { notMobileMedia } from '@/styles/media'
import { getColorTheme } from '@/styles/themes'

export const WhereEngine = () => {
  return (
    <Container>
      <Header />
      <Main />
      <Contacts />
    </Container>
  )
}

const Container = styled.div`
  width: 100%;
  height: 100%;

  overflow-y: auto;

  background: ${getColorTheme('earth')};

  ${notMobileMedia} {
    border-radius: 16px;
  }
`
