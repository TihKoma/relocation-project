import { VFC } from 'react'
import styled from '@emotion/styled'

import { TipLocationIcon as TipLocationIconBase } from '@/images'
import { notMobileMedia } from '@/styles/media'
import { getColorTheme } from '@/styles/themes'

type Props = {
  title: string
  tip?: string
  value?: string
}

export const Placeholder: VFC<Props> = ({ title, tip, value }) => {
  return (
    <Container>
      <TipLocationIcon />
      <Title>{title}</Title>
      {tip ? (
        <Tip>{tip}</Tip>
      ) : (
        <Tip>
          Check if you entered the correct
          <br /> query «{value}»
        </Tip>
      )}
    </Container>
  )
}

const Container = styled.div`
  padding: 0.8rem;

  display: flex;
  flex-direction: column;
  align-items: center;
`
const Title = styled.div`
  margin-top: 0.4rem;
  margin-bottom: 0.4rem;

  font-weight: 500;
  font-size: 1.6rem;
  line-height: 140%;
  text-align: center;
  letter-spacing: -0.05em;
  color: ${getColorTheme('sun1000')};
`
const Tip = styled.div`
  ${notMobileMedia} {
    br {
      display: none;
    }
  }
  font-size: 1.4rem;
  line-height: 2rem;
  text-align: center;
  color: #9ea9b2;
`
const TipLocationIcon = styled(TipLocationIconBase)`
  height: 8rem;
`
