import { useCallback, useEffect, useRef, useState, VFC } from 'react'
import styled from '@emotion/styled'

type Value = number
type Props = {
  max: number
  step: number
  value: Value
  onChange: (value: Value) => void
}

export const Slider: VFC<Props> = ({
  max,
  step,
  value,
  onChange: onChangeBase,
}) => {
  const graberRef = useRef<HTMLDivElement>(null)
  const sliderRef = useRef<HTMLDivElement>(null)
  const filterRef = useRef<HTMLDivElement>(null)
  const isGrabRef = useRef(false)
  const [isGrab, setIsGrab] = useState(false)
  const valueRef = useRef<Value | null>(null)
  const onChange = (value: Value) => {
    onChangeBase(value)
    valueRef.current = value
  }

  const onChangeRef = useRef(onChange)
  onChangeRef.current = onChange

  const setByPrice = useCallback(
    (price: number) => {
      if (!(graberRef.current && sliderRef.current && filterRef.current)) {
        return
      }
      if (price === 0) {
        graberRef.current.style.left = '0'
        filterRef.current.style.width = '0'
        return
      }
      if (price === max) {
        const left =
          sliderRef.current.getBoundingClientRect().width -
          graberRef.current.getBoundingClientRect().width
        graberRef.current.style.left = `${left}px`
        filterRef.current.style.width = `${
          left + graberRef.current.getBoundingClientRect().width
        }px`
        return
      }
      const countStep = max / step - 1
      const widthStep =
        (sliderRef.current.getBoundingClientRect().width -
          graberRef.current.getBoundingClientRect().width * 2) /
        (countStep - 1)

      const numberStep = price / step - 1

      const left =
        graberRef.current.getBoundingClientRect().width / 2 +
        numberStep * widthStep
      graberRef.current.style.left = `${left}px`
      filterRef.current.style.width = `${
        left + graberRef.current.getBoundingClientRect().width
      }px`
    },
    [max, step],
  )
  useEffect(() => {
    if (valueRef.current === null || value !== valueRef.current) {
      setByPrice(value)
      valueRef.current = value
    }
  }, [value, setByPrice])

  useEffect(() => {
    const grab = (event: MouseEvent | TouchEvent) => {
      if (!(isGrabRef.current && graberRef.current && sliderRef.current)) {
        return
      }
      // @ts-ignore
      const clientX = event.clientX || event.touches[0].clientX
      const indentInPixel =
        clientX - sliderRef.current.getBoundingClientRect().left
      // left corner
      if (indentInPixel < graberRef.current.getBoundingClientRect().width / 2) {
        const newPrice = 0
        onChangeRef.current(newPrice)
        setByPrice(newPrice)
        return
      }
      // right corner
      if (
        indentInPixel >
        sliderRef.current.getBoundingClientRect().width -
          graberRef.current.getBoundingClientRect().width / 2
      ) {
        const newPrice = max
        onChangeRef.current(newPrice)
        setByPrice(newPrice)
        return
      }
      const countStep = max / step - 1
      const widthStep =
        (sliderRef.current.getBoundingClientRect().width -
          graberRef.current.getBoundingClientRect().width * 2) /
        (countStep - 1)
      const numberStep = Math.max(
        0,
        Math.min(
          countStep - 1,
          Math.floor(
            (indentInPixel - graberRef.current.getBoundingClientRect().width) /
              widthStep,
          ),
        ),
      )

      const newPrice = (numberStep + 1) * step
      setByPrice(newPrice)
      onChangeRef.current(newPrice)
    }
    const ungrab = () => {
      isGrabRef.current = false
      setIsGrab(false)
    }

    window.addEventListener('touchmove', grab)
    window.addEventListener('touchend', ungrab)
    window.addEventListener('mousemove', grab)
    window.addEventListener('mouseup', ungrab)
    return () => {
      window.removeEventListener('touchmove', grab)
      window.removeEventListener('touchend', ungrab)

      window.removeEventListener('mousemove', grab)
      window.removeEventListener('mouseup', ungrab)
    }
  }, [max, step, setByPrice])
  const upTouch = () => {
    isGrabRef.current = true
    setIsGrab(true)
  }
  return (
    <Container ref={sliderRef}>
      <Separator isFull />
      {Array(max / step - 3)
        .fill(undefined)
        .map((_, index, array) => (
          <Separator
            key={index}
            isFull={index === Math.round((array.length - 1) / 2)}
          />
        ))}
      <Separator isFull />
      <GraberContainer
        ref={graberRef}
        onTouchStart={upTouch}
        onMouseDown={upTouch}
      >
        <Graber isActive={isGrab} />
      </GraberContainer>
      <Filler ref={filterRef} />
    </Container>
  )
}

const HEIGHT_SLIDER = 40
const Container = styled.div`
  height: ${HEIGHT_SLIDER}px;
  padding: 0 40px;
  margin-bottom: 16px;

  position: relative;

  display: flex;
  justify-content: space-between;
  align-items: center;

  user-select: none;

  background: #ffffff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.08),
    0 3.78px 33.4221px rgba(0, 0, 0, 0.0503198);
  border-radius: 36px;
`
const GraberContainer = styled.div`
  height: 100%;
  width: ${HEIGHT_SLIDER}px;

  position: absolute;
  left: 0;
  top: 0;
`
const Graber = styled.div<{ isActive: boolean }>`
  height: 100%;
  width: 100%;

  position: absolute;
  left: 0;
  top: 0;

  z-index: 10;
  transition: transform 225ms, border-color 225ms;
  user-select: none;

  cursor: grab;
  background: #ffffff;
  border-radius: 50%;
  border: 4px solid #5d54e6;
  &:hover {
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.08),
      0 3.78px 33.4221px rgba(0, 0, 0, 0.06);
    border-color: transparent;
    transform: scale(1.2);
  }
  ${({ isActive }) =>
    isActive
      ? `
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.08),
      0 3.78px 33.4221px rgba(0, 0, 0, 0.0503198);
    border-color: transparent;
  `
      : ''}
`
const Filler = styled.div`
  width: 0;

  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;

  border-radius: 20px;

  background: #5d54e6;
`
const Separator = styled.div<{ isFull?: boolean }>`
  height: ${({ isFull }) => (isFull ? '100%' : '50%')};
  width: 1px;

  user-select: none;

  background: #e2e6ec;
`
