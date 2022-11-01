import { VFC } from 'react'
import styled from '@emotion/styled'

import { ReactComponent as TipLocationIcon } from '@/images/tip-location.svg'

type Props = { className?: string }
export const Tip: VFC<Props> = ({ className }) => {
  return (
    <Container className={className}>
      <TipLocationIcon />
      <br />
      Search location
      <TipText>
        Enter the name of the place to share
        <br /> it with others
      </TipText>
    </Container>
  )
}

const Container = styled.div`
  font-size: 20px;
  line-height: 110%;
  text-align: center;
  letter-spacing: -0.05em;
  color: #000000;
  svg {
    margin-bottom: 16px;
  }
`
const TipText = styled.div`
  margin-top: 8px;

  font-size: 16px;
  line-height: 140%;
  text-align: center;
  letter-spacing: -0.05em;
  color: #9ea9b2;
`
