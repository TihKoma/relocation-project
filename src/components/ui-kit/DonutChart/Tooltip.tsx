import { FC } from 'react'
import { useEffect, useRef, useState } from 'react'
import styled from '@emotion/styled'

import { RoundedTriangularIcon } from '@/images'
import { HOVER_TRANSITION_TIME } from '@/styles/const'
import { getColorTheme } from '@/styles/themes'

import type { Datum } from './types'

type Direction = 'right' | 'left'
type Props = {
  coordinates: [number, number] | null
  datum: Datum | null
  isVisible: boolean
  direction: Direction
  avatarSrc: string
}
export const Tooltip: FC<Props> = ({
  coordinates,
  datum,
  isVisible,
  direction,
  avatarSrc,
}) => {
  const [withTransformTransition, setWithTransformTransition] = useState(true)

  const timerId = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    if (timerId.current) {
      clearTimeout(timerId.current)
    }
    if (!isVisible) {
      timerId.current = setTimeout(() => {
        setWithTransformTransition(false)
        timerId.current = null
      }, 225)
    }
    if (isVisible) {
      timerId.current = setTimeout(() => {
        setWithTransformTransition(true)
        timerId.current = null
      }, 10)
    }
  }, [isVisible, datum])

  return (
    <Container
      x={coordinates?.[0] ?? 0}
      y={coordinates?.[1] ?? 0}
      isVisible={isVisible}
      withTransformTransition={withTransformTransition}
      direction={direction}
    >
      {direction === 'right' ? <RoundedTriangularLeft /> : null}
      {datum?.isSelected ? <Avatar src={avatarSrc} /> : null}
      {datum?.label}
      <b>{datum?.value && datum.value >= 1 ? datum?.value : '<1'}%</b>
      {direction === 'left' ? <RoundedTriangularRight /> : null}
    </Container>
  )
}

const Container = styled.div<{
  x: number
  y: number
  isVisible: boolean
  withTransformTransition: boolean
  direction: Direction
}>`
  padding: 0.4rem 0.8rem;

  position: absolute;
  top: 0;
  left: 0;

  display: grid;
  grid-auto-flow: column;
  gap: 0.4rem;
  align-items: center;

  background: ${getColorTheme('earth')};
  border-radius: 0.8rem;
  box-shadow: 0px 4px 16px 1px rgba(18, 21, 31, 0.08);
  opacity: ${(props) => (props.isVisible ? 1 : 0)};
  pointer-events: none;
  transform: translate(
    ${(props) =>
      props.direction === 'right'
        ? `${props.x + 6}px`
        : `calc(${props.x}px - 100% - 6px)`},
    calc(-50% + ${(props) => props.y}px)
  );
  transition: ${(props) =>
    props.withTransformTransition
      ? `transform ${225}ms, opacity ${HOVER_TRANSITION_TIME}`
      : `opacity ${225}ms`};

  font-size: 1.2rem;
  color: ${getColorTheme('sun')};

  & > b {
    font-weight: 500;
  }
`
const RoundedTriangularLeft = styled(RoundedTriangularIcon)`
  position: absolute;
  top: 50%;
  left: -6px;
  transform: translate(0.05rem, -50%);
`
const RoundedTriangularRight = styled(RoundedTriangularIcon)`
  position: absolute;
  top: 50%;
  right: -6px;
  transform: translate(-0.05rem, -50%) scaleX(-1);
`
const Avatar = styled.img`
  width: 2.4rem;
  height: 2.4rem;

  border-radius: 50%;
  border: 0.2rem solid ${getColorTheme('earth')};
  box-shadow: 0px 4px 16px 1px rgba(18, 21, 31, 0.08);
  object-fit: cover;
`
