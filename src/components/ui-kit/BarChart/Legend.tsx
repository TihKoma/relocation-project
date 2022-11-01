import { FC } from 'react'
import styled from '@emotion/styled'

type Datum = {
  id: string
  label: string
  color: string
}
type Props = {
  data: Datum[]
}
export const Legend: FC<Props> = ({ data }) => {
  return (
    <Container>
      {data.map((item) => {
        return (
          <Item>
            <Circle color={item.color} />
            {item.label}
          </Item>
        )
      })}
    </Container>
  )
}

const Container = styled.div`
  display: grid;
  grid-auto-flow: column;
  justify-content: start;
  gap: 1.2rem;
  align-items: start;

  font-size: 1.4rem;
`
const Item = styled.div`
  display: grid;
  grid-auto-flow: column;
  gap: 0.4rem;
  align-items: baseline;
`
const Circle = styled.div<{ color: string }>`
  width: 1.2rem;
  height: 1.2rem;

  border-radius: 50%;
  background-color: ${(props) => props.color};
`
