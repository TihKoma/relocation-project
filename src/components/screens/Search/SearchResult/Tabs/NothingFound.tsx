import { FC } from 'react'
import styled from '@emotion/styled'

import { NothingFoundImg } from '@/images'
import { getColorTheme } from '@/styles/themes'

export const NothingFound: FC = () => {
  return (
    <Container>
      <NothingFoundImg />
      <Title>Nothing found</Title>
      <SubTitle>Try changing your request</SubTitle>
    </Container>
  )
}

const Container = styled.div`
  display: flex;

  flex-direction: column;
  justify-content: center;
  align-items: center;

  height: 100%;
`

const Title = styled.div`
  font-size: 2rem;
  line-height: 2.4rem;

  color: ${getColorTheme('sun1000')};
`
const SubTitle = styled.div`
  font-size: 1.6rem;
  line-height: 2.4rem;

  color: ${getColorTheme('sun500')};
`
