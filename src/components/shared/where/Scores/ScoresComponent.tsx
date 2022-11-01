import { FC, useEffect, useRef, useState } from 'react'
import { keyframes } from '@emotion/css'
import styled from '@emotion/styled'

export type ScoreType = {
  id: string
  name: string
  value: number
  color: string
}

export type Props = {
  type: 'price' | 'time' | 'number'
  scores: ScoreType[]
}

export const ScoresComponent: FC<Props> = ({ scores, type }) => {
  const maxValue = scores.reduce((accumulator, current) => {
    return Math.max(accumulator, current.value)
  }, 0)
  const maxValueWidth = scores.reduce((accumulator, current) => {
    return Math.max(
      accumulator,
      current.value.toString().replace('.', '').length,
    )
  }, 0)
  const maxValueRef = useRef<HTMLDivElement>(null)
  const [, setMaxBarWidth] = useState(0)

  useEffect(() => {
    if (maxValueRef.current) {
      setMaxBarWidth(maxValueRef.current.clientWidth)
    }
  }, [])

  const getCounterWidth = (unit: string) => {
    return unit ? maxValueWidth + 1 : maxValueWidth
  }

  return (
    <Container>
      {scores.map(({ name, value, color }, index) => {
        const getUnit = (type: 'price' | 'time' | 'number') => {
          switch (type) {
            case 'price':
              return `k`
            case 'time':
              return `m`
            case 'number':
              return ``
          }
        }
        const unit = getUnit(type)
        const itemProps = value === maxValue ? { ref: maxValueRef } : {}
        const widthPercent = (value / maxValue) * 100

        return (
          <Score key={index}>
            <Location>{name}</Location>
            <BarWrapper counterWidth={getCounterWidth(unit)}>
              <Bar widthPercent={widthPercent} color={color} {...itemProps} />
              <Counter
                value={value}
                unit={unit}
                widthPercent={widthPercent}
                offset={getCounterWidth(unit)}
              />
            </BarWrapper>
          </Score>
        )
      })}
    </Container>
  )
}

const COUNTER_TIMER = 400

type CounterProps = {
  value: number
  unit: string
  widthPercent: number
  offset: number
}

const Counter: FC<CounterProps> = ({ value, unit, widthPercent, offset }) => {
  const [count, setCount] = useState(0)
  const increment = Math.floor((value - count) / 100)

  useEffect(() => {
    const timer = setTimeout(
      () =>
        setCount(count < value && increment > 0 ? count + increment : value),
      COUNTER_TIMER / value,
    )
    return () => clearTimeout(timer)
  }, [count, increment, value])

  return (
    <Value widthPercent={widthPercent} offset={offset}>
      {count}
      {unit}
    </Value>
  )
}

const load = keyframes`
  from {
    transform: translateX(-100%);
  }
  to {
    transform: translateX(0);
  }
`

const Container = styled.div`
  height: 100%;
  width: 100%;
  max-width: 100%;
`

const Score = styled.div`
  margin-bottom: 1.2rem;

  &:last-of-type {
    margin-bottom: 0;
  }
`

const Location = styled.div`
  font-weight: 400;
  font-size: 1.6rem;
  line-height: 2rem;
`

const BarWrapper = styled.div<{ counterWidth: number }>`
  display: grid;
  grid-template-columns: ${({ counterWidth }) =>
    counterWidth && `1fr ${counterWidth}rem`};
  align-items: center;

  position: relative;

  font-weight: 500;
  font-size: 1.8rem;
  line-height: 2.4rem;
`

const Bar = styled.div<{
  widthPercent: number
  color: string
}>`
  width: ${({ widthPercent }) => `${widthPercent}%`};
  height: 1.6rem;

  position: relative;
  overflow: hidden;

  border-radius: 1.2rem;

  &::before {
    width: 100%;
    height: 100%;

    content: '';

    position: absolute;
    left: 0;
    top: 0;

    background: ${({ color }) => color && `${color}`};
    border-radius: 1.2rem;

    animation: ${load} 0.5s linear;
  }
`

const Value = styled.div<{
  widthPercent: number
  offset: number
}>`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  left: ${({ widthPercent, offset }) =>
    `calc(((100% - ${offset}rem) * ${widthPercent} / 100) + 0.4rem)`};
`
