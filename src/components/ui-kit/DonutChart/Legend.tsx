import { FC } from 'react'
import styled from '@emotion/styled'

import { getColorTheme } from '@/styles/themes'

import type { Datum } from './types'

type Props = {
  data: Datum[]
  className?: string
}
export const Legend: FC<Props> = ({ data, className }) => {
  const dataWithPercents = data.map((datum) => {
    return {
      ...datum,
      percent: datum.value >= 1 ? datum.value : '<1',
    }
  })

  return (
    <Container className={className}>
      {dataWithPercents.map((item) => {
        return (
          <Item background={item.color}>
            {item.label} <b>{item.percent}%</b>
          </Item>
        )
      })}
    </Container>
  )
}

const Container = styled.div`
  display: inline-flex;
  gap: 0.8rem;
  flex-wrap: wrap;
`
const Item = styled.div<{ background: string }>`
  padding: 0.2rem 0.8rem;

  border-radius: 999rem;
  background: ${(props) => props.background};

  font-size: 1.4rem;
  color: ${getColorTheme('sun')};

  & > b {
    font-weight: 500;
  }
`
