import { FC, useEffect, useRef, useState } from 'react'
import styled from '@emotion/styled'
import { arrow, offset, shift, useFloating } from '@floating-ui/react-dom'
import { FloatingPortal } from '@floating-ui/react-dom-interactions'

import { TooltipArrowCentered } from '@/images'
import { HOVER_TRANSITION_TIME } from '@/styles/const'
import { getColorTheme } from '@/styles/themes'

import { Datum } from './types'

type Props = {
  referenceElement: SVGElement | null
  datum: Datum | null
  isVisible: boolean
}
export const Tooltip: FC<Props> = ({ referenceElement, datum, isVisible }) => {
  const arrowRef = useRef<HTMLDivElement>(null)
  const {
    reference,
    x,
    y,
    floating,
    strategy,
    middlewareData: { arrow: { x: arrowX, y: arrowY } = {} },
  } = useFloating({
    placement: 'right',
    middleware: [
      offset(9),
      shift({
        crossAxis: true,
      }),
      arrow({ element: arrowRef }),
    ],
  })

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

  useEffect(() => {
    if (referenceElement) {
      reference(referenceElement)
    }
  }, [reference, referenceElement])

  return (
    <FloatingPortal>
      <Container
        ref={floating}
        style={{
          position: strategy,
          transform: `translate(${x}px, ${y}px)`,
        }}
        isVisible={isVisible}
        withTransformTransition={withTransformTransition}
      >
        {datum ? (
          <>
            <Title>{datum.category.label}</Title>
            <Text>
              {datum.group.label}{' '}
              <b>{datum.value >= 1 ? datum.value : '<1'}%</b>
            </Text>
          </>
        ) : null}
        <ArrowWrapper
          ref={arrowRef}
          style={{
            transform: `translate(calc(${arrowX || 0}px - 100%), ${
              arrowY || 0
            }px)`,
            transition: datum && referenceElement ? 'transform 225ms' : '',
          }}
        >
          <TooltipArrowCentered />
        </ArrowWrapper>
      </Container>
    </FloatingPortal>
  )
}
const Container = styled.div<{
  withTransformTransition: boolean
  isVisible: boolean
}>`
  padding: 0.4rem 0.8rem;

  top: 0;
  left: 0;

  opacity: ${(props) => (props.isVisible ? 1 : 0)};
  transition: ${(props) =>
    props.withTransformTransition
      ? `transform ${225}ms, opacity ${HOVER_TRANSITION_TIME}`
      : `opacity ${225}ms`};
  background-color: ${getColorTheme('earth')};
  border-radius: 0.8rem;
  pointer-events: none;
  box-shadow: 0px 4px 16px 1px rgba(18, 21, 31, 0.08);
  z-index: 999;

  font-size: 1.2rem;
`
const Title = styled.div`
  color: ${getColorTheme('sun500')};
`
const Text = styled.div`
  & > b {
    font-weight: 500;
  }
`
const ArrowWrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
`
