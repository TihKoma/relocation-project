import { VFC } from 'react'
import styled from '@emotion/styled'

type Props = { search: string; className?: string }
export const Placeholder: VFC<Props> = ({ search, className }) => {
  return (
    <Container className={className}>
      Nothing was found
      <Tip>
        Check if you entered the correct
        <br />
        query «{search}»
      </Tip>
    </Container>
  )
}

const Container = styled.div`
  font-size: 20px;
  line-height: 110%;
  text-align: center;
  letter-spacing: -0.05em;
  color: #000000;
`
const Tip = styled.div`
  margin-top: 8px;

  font-size: 16px;
  line-height: 140%;
  text-align: center;
  letter-spacing: -0.05em;
  color: #9ea9b2;
`
