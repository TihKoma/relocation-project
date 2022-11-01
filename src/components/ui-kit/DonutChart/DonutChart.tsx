import { FC, ReactNode, useRef } from 'react'
import styled from '@emotion/styled'

import useComponentSize from '@/modules/drilldown/hooks/useComponentSize'

import { Donut as DonutBase } from './Donut'
import { Legend as LegendBase } from './Legend'
import type { Data } from './types'

type Props = {
  maxOuterDiameter?: number
  data: Data
  avatarSrc: string
  title?: ReactNode
}

export const DonutChart: FC<Props> = ({
  data,
  avatarSrc,
  maxOuterDiameter = 200,
}) => {
  const chartWrapperRef = useRef(null)
  const size = useComponentSize(chartWrapperRef)

  const outerDiameter =
    Math.min(size.width, maxOuterDiameter) || maxOuterDiameter
  const innerDiameter = outerDiameter * 0.64

  return (
    <Container ref={chartWrapperRef}>
      <Donut
        outerDiameter={outerDiameter}
        innerDiameter={innerDiameter}
        data={data}
        avatarSrc={avatarSrc}
      />
      <Legend data={data} />
    </Container>
  )
}

const Container = styled.div`
  width: 100%;
  height: 100%;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;

  overflow: hidden;
`
const Legend = styled(LegendBase)`
  padding-top: 1.6rem;
`
const Donut = styled(DonutBase)`
  justify-self: center;
`
